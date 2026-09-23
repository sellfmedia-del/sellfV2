import 'server-only'

import {lookup} from 'node:dns/promises'
import {isIP} from 'node:net'
import type {AssetInput, ScannedAsset, ScannedPage} from './types'
import {inspectHtml, inspectRobots, inspectSitemap} from './inspectors'

const MAX_RESPONSE_BYTES = 1_250_000
const USER_AGENT = 'SellfSurfaceAudit/1.0 (+https://www.sellfmedia.com/engage)'
const socialHosts = ['instagram.com', 'linkedin.com', 'tiktok.com', 'facebook.com', 'x.com', 'twitter.com', 'youtube.com']

function isPrivateIp(address: string) {
  const value = address.toLowerCase()
  if (isIP(value) === 4) {
    const [a, b] = value.split('.').map(Number)
    return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224
  }
  if (isIP(value) === 6) {
    return value === '::' || value === '::1' || value.startsWith('fc') || value.startsWith('fd') || value.startsWith('fe8') || value.startsWith('fe9') || value.startsWith('fea') || value.startsWith('feb') || value.startsWith('::ffff:127.') || value.startsWith('::ffff:10.') || value.startsWith('::ffff:192.168.')
  }
  return true
}

function normalizeUrl(raw: string) {
  const value = raw.trim()
  const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('unsupported_protocol')
  if (url.username || url.password) throw new Error('credentials_not_allowed')
  url.hash = ''
  return url
}

async function assertPublicUrl(url: URL) {
  const hostname = url.hostname.toLowerCase()
  if (hostname === 'localhost' || hostname.endsWith('.local') || hostname.endsWith('.internal')) throw new Error('private_host')
  if (isIP(hostname)) {
    if (isPrivateIp(hostname)) throw new Error('private_host')
    return
  }
  const records = await lookup(hostname, {all: true, verbatim: true})
  if (!records.length || records.some((record) => isPrivateIp(record.address))) throw new Error('private_host')
}

async function readLimitedText(response: Response) {
  const declared = Number(response.headers.get('content-length') || 0)
  if (declared > MAX_RESPONSE_BYTES) throw new Error('response_too_large')
  if (!response.body) return {text: '', size: 0}
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let size = 0
  let output = ''
  while (true) {
    const {done, value} = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_RESPONSE_BYTES) {
      await reader.cancel()
      throw new Error('response_too_large')
    }
    output += decoder.decode(value, {stream: true})
  }
  return {text: output + decoder.decode(), size}
}

async function safeFetch(initial: URL, timeoutMs = 8000) {
  let current = new URL(initial)
  const startedAt = performance.now()
  for (let redirect = 0; redirect <= 4; redirect += 1) {
    await assertPublicUrl(current)
    const response = await fetch(current, {
      redirect: 'manual',
      headers: {'user-agent': USER_AGENT, accept: 'text/html,application/xhtml+xml,application/xml;q=0.8,text/xml;q=0.8,text/plain;q=0.6'},
      signal: AbortSignal.timeout(timeoutMs),
      cache: 'no-store',
    })
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location')
      if (!location) throw new Error('invalid_redirect')
      current = new URL(location, current)
      continue
    }
    const contentType = response.headers.get('content-type')?.toLowerCase() || ''
    if (response.ok && !contentType.includes('text/html') && !contentType.includes('text/plain') && !contentType.includes('application/xhtml') && !contentType.includes('application/xml') && !contentType.includes('text/xml')) throw new Error('unsupported_content')
    const body = await readLimitedText(response)
    return {response, finalUrl: current, text: body.text, responseBytes: body.size, responseTimeMs: Math.round(performance.now() - startedAt), redirectCount: redirect}
  }
  throw new Error('too_many_redirects')
}

async function probeStatus(initial: URL) {
  let current = new URL(initial)
  for (let redirect = 0; redirect <= 3; redirect += 1) {
    await assertPublicUrl(current)
    const response = await fetch(current, {redirect: 'manual', headers: {'user-agent': USER_AGENT, accept: 'text/html,*/*;q=0.5', range: 'bytes=0-1024'}, signal: AbortSignal.timeout(5000), cache: 'no-store'})
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location')
      await response.body?.cancel()
      if (!location) return response.status
      current = new URL(location, current)
      continue
    }
    await response.body?.cancel()
    return response.status
  }
  return 310
}

function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
}

function stripHtml(html: string) {
  return decodeEntities(html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function getAttribute(tag: string, name: string) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'))
  return decodeEntities(match?.[1] ?? match?.[2] ?? match?.[3] ?? '')
}

function metaContent(html: string, name: string, attribute = 'name') {
  const tags = html.match(/<meta\b[^>]*>/gi) || []
  const tag = tags.find((item) => getAttribute(item, attribute).toLowerCase() === name.toLowerCase())
  return tag ? getAttribute(tag, 'content') : ''
}

function linkHref(html: string, rel: string) {
  const tags = html.match(/<link\b[^>]*>/gi) || []
  const tag = tags.find((item) => getAttribute(item, 'rel').toLowerCase().split(/\s+/).includes(rel))
  return tag ? getAttribute(tag, 'href') : ''
}

function unique<T>(items: T[]) {
  return [...new Set(items)]
}

function extractLinks(html: string, baseUrl: URL) {
  const hrefs = (html.match(/<(?:a|area)\b[^>]*>/gi) || []).map((tag) => getAttribute(tag, 'href')).filter(Boolean)
  const internal: string[] = []
  const external: string[] = []
  const social: string[] = []
  for (const href of hrefs) {
    if (/^(mailto:|tel:|javascript:)/i.test(href)) continue
    try {
      const url = new URL(href, baseUrl)
      if (!['http:', 'https:'].includes(url.protocol)) continue
      url.hash = ''
      const value = url.toString()
      if (url.origin === baseUrl.origin) internal.push(value)
      else external.push(value)
      if (socialHosts.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))) social.push(value)
    } catch {}
  }
  return {internal: unique(internal), external: unique(external), social: unique(social)}
}

export function extractPage(html: string, url: string, status = 200, transport?: {responseTimeMs?: number; responseBytes?: number; redirectCount?: number; headers?: Headers}): ScannedPage {
  const base = new URL(url)
  const visibleText = stripHtml(html)
  const lower = visibleText.toLowerCase()
  const links = extractLinks(html, base)
  const title = stripHtml(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '')
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || ''
  const h1Count = (html.match(/<h1\b/gi) || []).length
  const h2Count = (html.match(/<h2\b/gi) || []).length
  const forms = (html.match(/<form\b/gi) || []).length
  const formFields = (html.match(/<(?:input|select|textarea)\b/gi) || []).length
  const images = html.match(/<img\b[^>]*>/gi) || []
  const imagesWithoutAlt = images.filter((tag) => !getAttribute(tag, 'alt').trim()).length
  const emails = unique([...(html.match(/mailto:([^"'\s?>]+)/gi) || []).map((item) => item.slice(7)), ...(visibleText.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi) || [])])
  const phones = unique([...(html.match(/tel:([^"'\s?>]+)/gi) || []).map((item) => decodeURIComponent(item.slice(4))), ...(visibleText.match(/(?:\+?\d[\d\s().-]{8,}\d)/g) || [])]).slice(0, 8)
  const ctaPattern = /(teklif|başvur|kayıt|satın al|sepete ekle|randevu|iletişim|demo|hemen başla|incele|keşfet|fiyat al|quote|apply|register|buy|add to cart|book|contact|start now|get started|learn more|discover)/gi
  const ctaCount = (visibleText.match(ctaPattern) || []).length
  const scriptText = html.toLowerCase()
  const inspection = inspectHtml(html)
  const securityHeaders = transport?.headers ? {
    csp: Boolean(transport.headers.get('content-security-policy')),
    hsts: Boolean(transport.headers.get('strict-transport-security')),
    contentTypeOptions: transport.headers.get('x-content-type-options')?.toLowerCase() === 'nosniff',
    referrerPolicy: Boolean(transport.headers.get('referrer-policy')),
  } : undefined
  return {
    url, status, title,
    description: metaContent(html, 'description'),
    language: getAttribute(htmlTag, 'lang'),
    canonical: linkHref(html, 'canonical'),
    h1Count, h2Count,
    wordCount: visibleText ? visibleText.split(/\s+/).length : 0,
    forms, formFields, ctaCount,
    internalLinks: links.internal, externalLinks: links.external, socialLinks: links.social,
    emails, phones,
    imageCount: images.length, imagesWithoutAlt,
    hasViewport: Boolean(metaContent(html, 'viewport')),
    hasNoIndex: /\bnoindex\b/i.test(metaContent(html, 'robots')),
    hasStructuredData: /<script\b[^>]*type=["']application\/ld\+json["']/i.test(html),
    hasOpenGraph: Boolean(metaContent(html, 'og:title', 'property') || metaContent(html, 'og:image', 'property')),
    hasTwitterCard: Boolean(metaContent(html, 'twitter:card')),
    hasAnalytics: /googletagmanager\.com\/gtag|google-analytics\.com|gtag\s*\(|plausible\.io|matomo|clarity\.ms/i.test(scriptText),
    hasTagManager: /googletagmanager\.com\/gtm|\bgtm-[a-z0-9]+/i.test(scriptText),
    hasAdPixel: /connect\.facebook\.net|fbq\s*\(|linkedin\.com\/insight|analytics\.tiktok\.com|snaptr\s*\(/i.test(scriptText),
    hasConsentSignal: /cookiebot|onetrust|cookieyes|consentmanager|iubenda|kvkk|çerez|cookie consent/i.test(scriptText),
    hasHreflang: /<link\b[^>]*hreflang=/i.test(html),
    hasPrivacyLink: links.internal.some((item) => /privacy|gizlilik|kvkk|cookie|çerez/i.test(item)) || /gizlilik politikası|privacy policy|kvkk/i.test(lower),
    hasContactLink: /mailto:|tel:|whatsapp/i.test(html) || links.internal.some((item) => /contact|iletisim|iletişim|randevu|booking|checkout|sepet/i.test(item)),
    hasProofSignal: /müşteri|referans|başarı hikay|vaka analiz|yorumlar|değerlendirme|testimonial|case stud|clients?|reviews?|trusted by|success stor/i.test(lower),
    hasPricingSignal: /fiyat|paket|ücret|price|pricing|plans?\b/i.test(lower),
    hasThankYouSignal: links.internal.some((item) => /thank-you|thankyou|tesekkur|teşekkür/i.test(item)),
    responseTimeMs: transport?.responseTimeMs,
    responseBytes: transport?.responseBytes,
    redirectCount: transport?.redirectCount,
    contentType: transport?.headers?.get('content-type') || undefined,
    securityHeaders,
    ...inspection,
    mixedContentCount: base.protocol === 'https:' ? (html.match(/(?:src=["']http:\/\/|url\(["']?http:\/\/)/gi) || []).length : 0,
  }
}

async function scanRobots(url: URL) {
  try {
    const robotsUrl = new URL('/robots.txt', url.origin)
    const {response, text} = await safeFetch(robotsUrl, 4000)
    return inspectRobots(text, url, response.status)
  } catch {
    return inspectRobots('', url, 0)
  }
}

async function scanSitemap(url: URL, candidates: string[]) {
  const sitemapUrl = new URL(candidates[0] || '/sitemap.xml', url.origin)
  try {
    const {response, text} = await safeFetch(sitemapUrl, 5000)
    return inspectSitemap(text, sitemapUrl, url.origin, response.status)
  } catch {
    return inspectSitemap('', sitemapUrl, url.origin, 0)
  }
}

function prioritizedLinks(page: ScannedPage, origin: string) {
  const scored = page.internalLinks
    .filter((item) => new URL(item).origin === origin)
    .filter((item) => !/\.(?:jpg|jpeg|png|gif|svg|webp|pdf|zip|xml)$/i.test(new URL(item).pathname))
    .map((item) => ({item, score: /contact|iletisim|about|hakkimizda|service|hizmet|product|urun|case|referans|success|pricing|fiyat|privacy|gizlilik/i.test(item) ? 2 : 1}))
    .sort((a, b) => b.score - a.score)
  return unique(scored.map(({item}) => item))
}

async function scanWebAsset(input: AssetInput): Promise<ScannedAsset> {
  const requested = normalizeUrl(input.url)
  const fetchedAt = new Date().toISOString()
  const robots = await scanRobots(requested)
  const sitemapPromise = input.kind === 'website' ? scanSitemap(requested, robots.sitemapUrls) : Promise.resolve(undefined)
  if (robots.blocksRequestedPath) return {id: input.id, kind: input.kind, requestedUrl: requested.toString(), finalUrl: requested.toString(), source: 'unavailable', pages: [], evidenceText: input.evidenceText || '', fetchedAt, warnings: ['robots.txt taramaya izin vermiyor'], robots, sitemap: await sitemapPromise}
  const first = await safeFetch(requested)
  const firstPage = extractPage(first.text, first.finalUrl.toString(), first.response.status, {...first, headers: first.response.headers})
  if (first.response.ok) {
    const probeTargets = firstPage.internalLinks.filter((item) => item !== first.finalUrl.toString()).slice(0, 8)
    const probed = await Promise.all(probeTargets.map(async (item) => {
      try { return {url: item, status: await probeStatus(new URL(item))} } catch { return {url: item, status: 0} }
    }))
    firstPage.brokenInternalLinks = probed.filter((item) => item.status === 0 || item.status >= 400)
  }
  const pages = [firstPage]
  if (input.kind === 'website' && first.response.ok) {
    const candidates = prioritizedLinks(firstPage, first.finalUrl.origin).filter((item) => item !== first.finalUrl.toString()).slice(0, 4)
    const additional = await Promise.all(candidates.map(async (candidate) => {
      try {
        const result = await safeFetch(new URL(candidate), 6500)
        return extractPage(result.text, result.finalUrl.toString(), result.response.status, {...result, headers: result.response.headers})
      } catch (error) {
        return {url: candidate, status: 0, title: '', description: '', language: '', canonical: '', h1Count: 0, h2Count: 0, wordCount: 0, forms: 0, formFields: 0, ctaCount: 0, internalLinks: [], externalLinks: [], socialLinks: [], emails: [], phones: [], imageCount: 0, imagesWithoutAlt: 0, hasViewport: false, hasNoIndex: false, hasStructuredData: false, hasOpenGraph: false, hasTwitterCard: false, hasAnalytics: false, hasTagManager: false, hasAdPixel: false, hasConsentSignal: false, hasHreflang: false, hasPrivacyLink: false, hasContactLink: false, hasProofSignal: false, hasPricingSignal: false, hasThankYouSignal: false, fetchError: error instanceof Error ? error.message : 'fetch_failed'} satisfies ScannedPage
      }
    }))
    pages.push(...additional)
  }
  return {id: input.id, kind: input.kind, requestedUrl: requested.toString(), finalUrl: first.finalUrl.toString(), source: 'crawl', pages, evidenceText: input.evidenceText || '', fetchedAt, warnings: [], robots, sitemap: await sitemapPromise}
}

function detectPlatform(url: URL) {
  return socialHosts.find((host) => url.hostname === host || url.hostname.endsWith(`.${host}`)) || url.hostname
}

async function scanPublicProfileAsset(input: AssetInput): Promise<ScannedAsset> {
  const requested = normalizeUrl(input.url)
  const fetchedAt = new Date().toISOString()
  const manual = (input.evidenceText || '').trim()
  try {
    const result = await safeFetch(requested, 6500)
    const page = extractPage(result.text, result.finalUrl.toString(), result.response.status, {...result, headers: result.response.headers})
    const publicText = stripHtml(result.text).slice(0, 12_000)
    const usablePublicText = publicText.length > 120 ? publicText : ''
    const evidenceText = [manual, usablePublicText].filter(Boolean).join('\n')
    return {id: input.id, kind: input.kind, requestedUrl: requested.toString(), finalUrl: result.finalUrl.toString(), source: manual && usablePublicText ? 'mixed' : manual ? 'manual-evidence' : usablePublicText ? 'public-page' : 'unavailable', platform: detectPlatform(requested), pages: usablePublicText ? [page] : [], evidenceText, fetchedAt, warnings: usablePublicText ? [] : ['Platform okunabilir profil verisi döndürmedi']}
  } catch (error) {
    return {id: input.id, kind: input.kind, requestedUrl: requested.toString(), finalUrl: requested.toString(), source: manual ? 'manual-evidence' : 'unavailable', platform: detectPlatform(requested), pages: [], evidenceText: manual, fetchedAt, warnings: [error instanceof Error ? error.message : 'fetch_failed']}
  }
}

function scanEmailAsset(input: AssetInput): ScannedAsset {
  const html = (input.evidenceText || '').trim()
  const fetchedAt = new Date().toISOString()
  if (!html) return {id: input.id, kind: 'email', requestedUrl: '', finalUrl: '', source: 'unavailable', pages: [], evidenceText: '', fetchedAt, warnings: ['HTML içeriği eklenmedi']}
  const page = extractPage(html, 'https://email.sellf-surface.local/', 200)
  return {id: input.id, kind: 'email', requestedUrl: '', finalUrl: '', source: 'uploaded-html', pages: [page], evidenceText: html.slice(0, 100_000), fetchedAt, warnings: []}
}

export async function scanAsset(input: AssetInput): Promise<ScannedAsset> {
  try {
    if (input.kind === 'email') return scanEmailAsset(input)
    if (input.kind === 'social' || input.kind === 'youtube' || input.kind === 'google-business') return await scanPublicProfileAsset(input)
    return await scanWebAsset(input)
  } catch (error) {
    let requestedUrl = input.url
    try { requestedUrl = normalizeUrl(input.url).toString() } catch {}
    return {id: input.id, kind: input.kind, requestedUrl, finalUrl: requestedUrl, source: input.evidenceText?.trim() ? 'manual-evidence' : 'unavailable', pages: [], evidenceText: input.evidenceText || '', fetchedAt: new Date().toISOString(), warnings: [error instanceof Error ? error.message : 'scan_failed']}
  }
}
