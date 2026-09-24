import 'server-only'

import {lookup} from 'node:dns/promises'
import {isIP} from 'node:net'
import {summarizeMarket} from './engine'
import type {MarketEvidence, Marketplace, MarketScanRequest, MarketScanResult} from './types'

const MAX_BYTES = 1_500_000
const USER_AGENT = 'SellfMarketFit/1.0 (+https://www.sellfmedia.com/engage)'

function isPrivateIp(address: string) {
  const value = address.toLowerCase()
  if (isIP(value) === 4) {
    const [a, b] = value.split('.').map(Number)
    return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224
  }
  if (isIP(value) === 6) return value === '::' || value === '::1' || value.startsWith('fc') || value.startsWith('fd') || /^fe[89ab]/.test(value)
  return true
}

function normalizeUrl(raw: string) {
  const url = new URL(/^https?:\/\//i.test(raw.trim()) ? raw.trim() : `https://${raw.trim()}`)
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('invalid_url')
  url.hash = ''
  return url
}

async function assertPublic(url: URL) {
  const host = url.hostname.toLowerCase()
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) throw new Error('private_host')
  if (isIP(host)) {
    if (isPrivateIp(host)) throw new Error('private_host')
    return
  }
  const records = await lookup(host, {all: true, verbatim: true})
  if (!records.length || records.some((record) => isPrivateIp(record.address))) throw new Error('private_host')
}

async function readLimited(response: Response) {
  const declared = Number(response.headers.get('content-length') || 0)
  if (declared > MAX_BYTES) throw new Error('too_large')
  if (!response.body) return ''
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let size = 0
  let text = ''
  while (true) {
    const {done, value} = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_BYTES) {
      await reader.cancel()
      throw new Error('too_large')
    }
    text += decoder.decode(value, {stream: true})
  }
  return text + decoder.decode()
}

async function safeFetch(initial: URL) {
  let current = new URL(initial)
  for (let redirect = 0; redirect <= 4; redirect += 1) {
    await assertPublic(current)
    const response = await fetch(current, {redirect: 'manual', cache: 'no-store', signal: AbortSignal.timeout(9000), headers: {'user-agent': USER_AGENT, accept: 'text/html,application/xhtml+xml'}})
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location')
      if (!location) throw new Error('invalid_redirect')
      current = new URL(location, current)
      continue
    }
    if (!response.ok) throw new Error(`http_${response.status}`)
    return {html: await readLimited(response), finalUrl: current.toString()}
  }
  throw new Error('too_many_redirects')
}

function text(value: unknown) {
  return typeof value === 'string' ? value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : ''
}

function number(value: unknown) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (typeof value !== 'string') return 0
  let normalized = value.replace(/[^\d,.-]/g, '')
  if (normalized.includes(',') && normalized.includes('.')) normalized = normalized.lastIndexOf(',') > normalized.lastIndexOf('.') ? normalized.replace(/\./g, '').replace(',', '.') : normalized.replace(/,/g, '')
  else if (/^\-?\d{1,3}(?:[.,]\d{3})+$/.test(normalized)) normalized = normalized.replace(/[.,]/g, '')
  else if (normalized.includes(',')) normalized = normalized.replace(',', '.')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

function walkJson(value: unknown, source: string, baseUrl: string, output: MarketEvidence[]) {
  if (Array.isArray(value)) {
    value.forEach((item) => walkJson(item, source, baseUrl, output))
    return
  }
  if (!value || typeof value !== 'object') return
  const item = value as Record<string, unknown>
  const type = Array.isArray(item['@type']) ? item['@type'] : [item['@type']]
  if (type.some((candidate) => String(candidate).toLowerCase() === 'product')) {
    const offersRaw = Array.isArray(item.offers) ? item.offers[0] : item.offers
    const offer = offersRaw && typeof offersRaw === 'object' ? offersRaw as Record<string, unknown> : {}
    const aggregate = item.aggregateRating && typeof item.aggregateRating === 'object' ? item.aggregateRating as Record<string, unknown> : {}
    const price = number(offer.price || offer.lowPrice || item.price)
    const sizeText = text(item.size || item.weight)
    const sizeMatch = sizeText.match(/([\d.,]+)\s*(kg|g|gr|l|lt|ml|adet|piece|pcs)/i)
    if (price > 0) output.push({
      title: text(item.name) || 'Ürün', url: text(item.url || offer.url) || baseUrl, source, price,
      listPrice: number(offer.highPrice) || undefined, rating: number(aggregate.ratingValue) || undefined,
      reviewCount: number(aggregate.reviewCount || aggregate.ratingCount) || undefined,
      freeShipping: /free|ücretsiz/i.test(JSON.stringify(offer.shippingDetails || '')) || undefined,
      unitAmount: sizeMatch ? number(sizeMatch[1]) : undefined,
      unitLabel: sizeMatch?.[2],
    })
  }
  Object.values(item).forEach((child) => {
    if (child && typeof child === 'object') walkJson(child, source, baseUrl, output)
  })
}

export function extractProducts(html: string, source: string, url: string) {
  const output: MarketEvidence[] = []
  const scripts = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || []
  for (const script of scripts) {
    const raw = script.replace(/^<script\b[^>]*>/i, '').replace(/<\/script>$/i, '').trim()
    try { walkJson(JSON.parse(raw), source, url, output) } catch {}
  }
  if (!output.length) {
    const title = text(html.match(/<meta\b[^>]*(?:property|name)=["'](?:og:title|twitter:title)["'][^>]*content=["']([^"']+)/i)?.[1] || html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1])
    const price = number(html.match(/<meta\b[^>]*(?:property|name|itemprop)=["'](?:product:price:amount|price)["'][^>]*content=["']([^"']+)/i)?.[1])
    if (price > 0) output.push({title: title || 'Ürün', url, source, price})
  }
  const unique = new Map<string, MarketEvidence>()
  for (const item of output) unique.set(`${item.title.toLowerCase()}|${item.price}`, item)
  return [...unique.values()]
}

export function parseManualEvidence(value: string): MarketEvidence[] {
  return value.split(/\r?\n/).flatMap((line, index) => {
    const parts = line.split(/[|;\t]/).map((part) => part.trim())
    if (parts.length < 2) return []
    const price = number(parts[1])
    if (price <= 0) return []
    return [{
      title: parts[0] || `Ürün ${index + 1}`, source: 'manual', price,
      listPrice: number(parts[2]) || undefined, rating: number(parts[3]) || undefined,
      reviewCount: number(parts[4]) || undefined,
      freeShipping: parts[5] ? /evet|yes|free|ücretsiz|1/i.test(parts[5]) : undefined,
      packageQuantity: number(parts[6]) || undefined,
      unitAmount: number(parts[7]) || undefined,
      unitLabel: parts[8] || undefined,
      observedAt: /^\d{4}-\d{2}-\d{2}$/.test(parts[9] || '') ? parts[9] : undefined,
    }]
  })
}

function discoveryUrl(marketplace: Marketplace | undefined, query: string) {
  const q = encodeURIComponent(query.trim())
  if (marketplace === 'trendyol') return `https://www.trendyol.com/sr?q=${q}`
  if (marketplace === 'hepsiburada') return `https://www.hepsiburada.com/ara?q=${q}`
  if (marketplace === 'amazon-tr') return `https://www.amazon.com.tr/s?k=${q}`
  if (marketplace === 'n11') return `https://www.n11.com/arama?q=${q}`
  return undefined
}

async function scanOne(raw: string, source: string) {
  try {
    const url = normalizeUrl(raw)
    const fetched = await safeFetch(url)
    return extractProducts(fetched.html, source, fetched.finalUrl)
  } catch { return [] }
}

export async function scanMarket(request: MarketScanRequest): Promise<MarketScanResult> {
  const evidence = parseManualEvidence(request.manualEvidence || '')
  let currentProduct: MarketEvidence | undefined
  if (request.productUrl) {
    const productItems = await scanOne(request.productUrl, 'product-url')
    currentProduct = productItems[0]
  }
  const competitors = (request.competitorUrls || []).slice(0, 8)
  const batches = await Promise.all(competitors.map((url) => scanOne(url, 'competitor-url')))
  evidence.push(...batches.flat())
  const searchUrl = request.channel === 'marketplace' ? discoveryUrl(request.marketplace, `${request.category} ${request.productType}`) : undefined
  let discovered: MarketEvidence[] = []
  if (searchUrl) discovered = await scanOne(searchUrl, request.marketplace || 'marketplace-search')
  evidence.push(...discovered)
  const unique = [...new Map(evidence.map((item) => [`${item.title.toLowerCase()}|${item.price}`, item])).values()]
  const summary = summarizeMarket(unique)
  const automaticCount = batches.flat().length + discovered.length + (currentProduct ? 1 : 0)
  const unavailableNotes: Record<MarketScanRequest['channel'], string> = {
    marketplace: 'Pazaryeri herkese açık ürün verisi sunmadı. Rakip linkleri veya manuel fiyat satırları ekleyin.',
    'own-site': 'Rakip sitelerden doğrulanabilir ürün verisi alınamadı. Doğrudan ürün linkleri veya manuel fiyat satırları ekleyin.',
    store: 'Fiziksel mağaza ve raf fiyatları otomatik taranamaz. Mağaza, bölge ve tarih içeren manuel raf kanıtları ekleyin.',
    b2b: 'B2B fiyatları çoğunlukla herkese açık değildir. Teklif, fiyat listesi veya bayi görüşmelerinden doğrulanmış satırlar ekleyin.',
  }
  const successNotes: Record<MarketScanRequest['channel'], string> = {
    marketplace: 'Herkese açık pazaryeri verileri ve kullanıcı kanıtları birlikte değerlendirildi.',
    'own-site': 'Rakip ürün sayfaları ve kullanıcı kanıtları birlikte değerlendirildi.',
    store: 'Girilen raf fiyatları mağaza ve bölge bağlamında değerlendirildi.',
    b2b: 'Girilen B2B teklif ve fiyat listesi kanıtları kanal bağlamında değerlendirildi.',
  }
  return {
    evidence: unique.slice(0, 40), currentProduct, summary,
    discovery: {
      attempted: Boolean(searchUrl || request.productUrl || competitors.length || evidence.length), sourceUrl: searchUrl,
      status: unique.length >= 5 ? 'completed' : unique.length > 0 ? 'partial' : 'unavailable',
      note: automaticCount > 0 || evidence.length > 0 ? successNotes[request.channel] : unavailableNotes[request.channel],
    },
  }
}
