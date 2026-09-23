import {parse, type ParserError} from 'parse5'
import type {RobotsAudit, SitemapAudit} from './types'

type HtmlNode = {
  nodeName?: string
  tagName?: string
  value?: string
  attrs?: Array<{name: string; value: string}>
  childNodes?: HtmlNode[]
}

const attr = (node: HtmlNode, name: string) => node.attrs?.find((item) => item.name === name)?.value || ''

function walk(node: HtmlNode, visit: (node: HtmlNode, ancestors: HtmlNode[]) => void, ancestors: HtmlNode[] = []) {
  visit(node, ancestors)
  for (const child of node.childNodes || []) walk(child, visit, [...ancestors, node])
}

function nodeText(node: HtmlNode): string {
  if (node.nodeName === '#text') return node.value || ''
  return (node.childNodes || []).map(nodeText).join(' ')
}

export function inspectHtml(html: string) {
  const parseErrors: ParserError[] = []
  const document = parse(html, {onParseError: (error) => parseErrors.push(error)}) as HtmlNode
  const ids = new Map<string, number>()
  const labelFors = new Set<string>()
  const fields: Array<{id: string; nestedInLabel: boolean; type: string}> = []
  const headingLevels: number[] = []
  let emptyLinks = 0
  let unnamedButtons = 0

  walk(document, (node, ancestors) => {
    const id = attr(node, 'id').trim()
    if (id) ids.set(id, (ids.get(id) || 0) + 1)
    if (node.tagName === 'label' && attr(node, 'for')) labelFors.add(attr(node, 'for'))
    if (['input', 'select', 'textarea'].includes(node.tagName || '')) {
      const type = attr(node, 'type').toLowerCase()
      if (!['hidden', 'submit', 'button', 'reset'].includes(type)) fields.push({id, type, nestedInLabel: ancestors.some((item) => item.tagName === 'label')})
    }
    if (node.tagName === 'a') {
      const href = attr(node, 'href').trim()
      const accessibleName = [nodeText(node), attr(node, 'aria-label'), attr(node, 'title')].join(' ').trim()
      if (!href || href === '#' || !accessibleName) emptyLinks += 1
    }
    if (node.tagName === 'button') {
      const accessibleName = [nodeText(node), attr(node, 'aria-label'), attr(node, 'title')].join(' ').trim()
      if (!accessibleName) unnamedButtons += 1
    }
    if (/^h[1-6]$/.test(node.tagName || '')) headingLevels.push(Number(node.tagName?.slice(1)))
  })

  let headingSkips = 0
  for (let index = 1; index < headingLevels.length; index += 1) if (headingLevels[index] - headingLevels[index - 1] > 1) headingSkips += 1
  const duplicateIds = [...ids.values()].reduce((sum, count) => sum + Math.max(0, count - 1), 0)
  const unlabeledFields = fields.filter((field) => !field.nestedInLabel && (!field.id || !labelFors.has(field.id))).length
  const htmlIssues = [...new Set(parseErrors
    .filter((error) => !['missing-doctype', 'non-conforming-doctype'].includes(error.code))
    .map((error) => error.code))].slice(0, 8)

  const jsonLdBlocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  let invalidJsonLd = 0
  const structuredDataTypes = new Set<string>()
  for (const block of jsonLdBlocks) {
    try {
      const data = JSON.parse(block[1].trim())
      const collect = (value: unknown) => {
        if (!value || typeof value !== 'object') return
        if (Array.isArray(value)) return value.forEach(collect)
        const record = value as Record<string, unknown>
        const type = record['@type']
        if (typeof type === 'string') structuredDataTypes.add(type)
        else if (Array.isArray(type)) type.filter((item): item is string => typeof item === 'string').forEach((item) => structuredDataTypes.add(item))
        if (Array.isArray(record['@graph'])) record['@graph'].forEach(collect)
      }
      collect(data)
    } catch { invalidJsonLd += 1 }
  }

  return {htmlIssues, duplicateIds, emptyLinks, unlabeledFields, unnamedButtons, headingSkips, invalidJsonLd, structuredDataTypes: [...structuredDataTypes]}
}

function robotsPathMatches(rule: string, pathname: string) {
  if (!rule) return false
  const escaped = rule.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\$$/, '$')
  try { return new RegExp(`^${escaped}`).test(pathname) } catch { return pathname.startsWith(rule) }
}

export function inspectRobots(text: string, url: URL, status: number): RobotsAudit {
  const audit: RobotsAudit = {url: new URL('/robots.txt', url.origin).toString(), exists: status === 200, accessible: status >= 200 && status < 400, blocksRequestedPath: false, blocksAll: false, syntaxIssues: [], sitemapUrls: []}
  if (status !== 200) return audit
  const lines = text.split(/\r?\n/)
  const groups: Array<{agents: string[]; rules: Array<{type: 'allow' | 'disallow'; path: string}>}> = []
  let current: (typeof groups)[number] | null = null
  let sawRule = false
  lines.forEach((raw, index) => {
    const line = raw.replace(/\s*#.*$/, '').trim()
    if (!line) return
    const separator = line.indexOf(':')
    if (separator < 1) { audit.syntaxIssues.push(`line-${index + 1}:missing-colon`); return }
    const directive = line.slice(0, separator).trim().toLowerCase()
    const value = line.slice(separator + 1).trim()
    if (directive === 'sitemap') {
      try { audit.sitemapUrls.push(new URL(value, url.origin).toString()) } catch { audit.syntaxIssues.push(`line-${index + 1}:invalid-sitemap`) }
      return
    }
    if (directive === 'user-agent') {
      if (!value) { audit.syntaxIssues.push(`line-${index + 1}:empty-user-agent`); return }
      if (!current || sawRule) { current = {agents: [], rules: []}; groups.push(current); sawRule = false }
      current.agents.push(value.toLowerCase())
      return
    }
    if (directive === 'allow' || directive === 'disallow') {
      if (!current) { audit.syntaxIssues.push(`line-${index + 1}:rule-without-agent`); return }
      current.rules.push({type: directive, path: value}); sawRule = true
    }
  })
  const group = groups.find((item) => item.agents.includes('sellfsurfaceaudit')) || groups.find((item) => item.agents.includes('*'))
  if (!group) return audit
  const matches = group.rules.filter((rule) => robotsPathMatches(rule.path, url.pathname)).sort((a, b) => b.path.length - a.path.length)
  audit.blocksRequestedPath = matches[0]?.type === 'disallow'
  audit.blocksAll = group.rules.some((rule) => rule.type === 'disallow' && rule.path === '/') && !group.rules.some((rule) => rule.type === 'allow' && rule.path === '/')
  audit.syntaxIssues = [...new Set(audit.syntaxIssues)].slice(0, 8)
  audit.sitemapUrls = [...new Set(audit.sitemapUrls)].slice(0, 4)
  return audit
}

export function inspectSitemap(text: string, sitemapUrl: URL, siteOrigin: string, status: number): SitemapAudit {
  const audit: SitemapAudit = {url: sitemapUrl.toString(), exists: status === 200, validXml: false, urlCount: 0, foreignUrlCount: 0, noIndexUrlCount: 0, errors: []}
  if (status !== 200) return audit
  const isSitemap = /<(?:urlset|sitemapindex)\b/i.test(text) && /<loc\b/i.test(text)
  audit.validXml = isSitemap && !/<parsererror\b/i.test(text)
  if (!audit.validXml) { audit.errors.push('invalid-sitemap-xml'); return audit }
  const locations = [...text.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)].map((match) => match[1].replace(/&amp;/g, '&').trim()).slice(0, 5000)
  audit.urlCount = locations.length
  audit.foreignUrlCount = locations.filter((item) => { try { return new URL(item).origin !== siteOrigin } catch { return true } }).length
  return audit
}
