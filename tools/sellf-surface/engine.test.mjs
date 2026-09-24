import test from 'node:test'
import assert from 'node:assert/strict'
import {auditSurface} from './engine.ts'
import {inspectHtml, inspectRobots, inspectSitemap} from './inspectors.ts'

const page = (overrides = {}) => ({
  url: 'https://example.com/', status: 200, title: 'Example Growth Platform', description: 'A clear description of the offer, audience and business value that is long enough for a search result.', language: 'en', canonical: 'https://example.com/',
  h1Count: 1, h2Count: 4, wordCount: 650, forms: 1, formFields: 3, ctaCount: 4,
  internalLinks: ['https://example.com/contact', 'https://example.com/cases', 'https://example.com/privacy'], externalLinks: [], socialLinks: ['https://linkedin.com/company/example'],
  emails: ['hello@example.com'], phones: ['+90 555 111 22 33'], imageCount: 5, imagesWithoutAlt: 0,
  hasViewport: true, hasNoIndex: false, hasStructuredData: true, hasOpenGraph: true, hasTwitterCard: true,
  hasAnalytics: true, hasTagManager: true, hasAdPixel: true, hasConsentSignal: true, hasHreflang: true,
  hasPrivacyLink: true, hasContactLink: true, hasProofSignal: true, hasPricingSignal: true, hasThankYouSignal: true,
  ...overrides,
})

const asset = (overrides = {}) => ({
  id: 'asset-1', kind: 'website', requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', source: 'crawl',
  pages: [page()], evidenceText: '', fetchedAt: '2026-09-23T00:00:00.000Z', warnings: [], ...overrides,
})

test('a complete B2B surface receives a strong, evidence-based result', () => {
  const result = auditSurface([asset()], 'en', 'b2b', 'lead')
  assert.ok(result.score >= 90)
  assert.equal(result.confidence, 'high')
  assert.equal(result.priorities.length, 0)
  assert.notEqual(result.verdict.status, 'not-ready')
})

test('missing conversion and measurement create critical priorities', () => {
  const weak = asset({pages: [page({forms: 0, ctaCount: 0, hasContactLink: false, hasAnalytics: false, hasTagManager: false})]})
  const result = auditSurface([weak], 'tr', 'b2b', 'lead')
  assert.ok(result.priorities.some((item) => item.code === 'cta' && item.severity === 'critical'))
  assert.ok(result.priorities.some((item) => item.code === 'measurement' && item.severity === 'critical'))
  assert.equal(result.verdict.status, 'not-ready')
})

test('unavailable assets are verification notes and never fabricated failures', () => {
  const unavailable = asset({source: 'unavailable', pages: [], warnings: ['robots.txt'], evidenceText: ''})
  const result = auditSurface([unavailable], 'tr', 'b2b', 'lead')
  assert.equal(result.score, null)
  assert.equal(result.findings.length, 0)
  assert.equal(result.verdict.status, 'review')
  assert.ok(result.verificationNotes.some((item) => item.code === 'unavailable-asset-1'))
})

test('social evidence can be audited without an API', () => {
  const social = asset({kind: 'social', source: 'manual-evidence', pages: [], evidenceText: 'Sellf helps brands build measurable growth systems. Contact team@sellfmedia.com and discover our work at https://sellfmedia.com'})
  const result = auditSurface([social], 'en', 'service', 'lead')
  assert.ok(result.score !== null)
  assert.ok(!result.findings.some((item) => item.code === 'social-link'))
  assert.ok(!result.findings.some((item) => item.code === 'social-contact'))
})

test('ecommerce rules require an observable product or checkout path', () => {
  const noCommerce = asset({pages: [page({hasPricingSignal: false, internalLinks: ['https://example.com/about', 'https://example.com/contact']})]})
  const result = auditSurface([noCommerce], 'en', 'ecommerce', 'sale')
  assert.ok(result.findings.some((item) => item.code === 'commerce-path'))
})

test('landing pages with too many exits are flagged as unfocused', () => {
  const links = Array.from({length: 20}, (_, index) => `https://example.com/page-${index}`)
  const landing = asset({kind: 'landing', pages: [page({internalLinks: links})]})
  const result = auditSurface([landing], 'en', 'other', 'lead')
  assert.ok(result.findings.some((item) => item.code === 'landing-focus'))
})

test('cross-asset audit detects missing website-to-social connection', () => {
  const website = asset({pages: [page({socialLinks: []})]})
  const social = asset({id: 'asset-2', kind: 'social', requestedUrl: 'https://instagram.com/example', finalUrl: 'https://instagram.com/example', source: 'manual-evidence', pages: [], evidenceText: 'Contact us and learn more at https://example.com. Recent post summary and profile bio are included.'})
  const result = auditSurface([website, social], 'en', 'b2b', 'lead')
  assert.ok(result.findings.some((item) => item.code === 'social-connection'))
})

test('profile-only audits do not invent a missing website connection', () => {
  const youtube = asset({kind: 'youtube', evidenceText: 'Channel description with website https://example.com and recent videos.'})
  const business = asset({id: 'asset-2', kind: 'google-business', evidenceText: 'Business category, phone +90 212 000 00 00, hours, reviews and website https://example.com.'})
  const result = auditSurface([youtube, business], 'en', 'b2b', 'lead')
  assert.ok(!result.findings.some((item) => item.code === 'social-connection'))
})

test('repeated inner-page CTA gaps do not create a contradictory not-ready verdict', () => {
  const innerGap = page({url: 'https://example.com/about', ctaCount: 0})
  const result = auditSurface([asset({pages: [page(), innerGap, {...innerGap, url: 'https://example.com/services'}]})], 'tr', 'b2b', 'lead')
  assert.ok(result.score >= 80)
  assert.notEqual(result.verdict.status, 'not-ready')
  assert.ok(result.findings.filter((item) => item.code === 'cta').every((item) => item.severity === 'important'))
})

test('HTML parser exposes actionable syntax, accessibility and JSON-LD evidence', () => {
  const inspected = inspectHtml('<!doctype html><html><body><h1>Main</h1><h3>Skipped</h3><label for="name">Name</label><input id="name"><input id="name"><a href="#"></a><button></button><script type="application/ld+json">{"@type":}</script></body></html>')
  assert.equal(inspected.duplicateIds, 1)
  assert.equal(inspected.headingSkips, 1)
  assert.ok(inspected.emptyLinks >= 1)
  assert.equal(inspected.unnamedButtons, 1)
  assert.equal(inspected.invalidJsonLd, 1)
})

test('robots parser honors longest allow rule and reports malformed directives', () => {
  const robots = inspectRobots('User-agent: *\nDisallow: /private\nAllow: /private/public\nBroken line\nSitemap: https://example.com/sitemap.xml', new URL('https://example.com/private/public'), 200)
  assert.equal(robots.blocksRequestedPath, false)
  assert.equal(robots.sitemapUrls.length, 1)
  assert.ok(robots.syntaxIssues.some((item) => item.includes('missing-colon')))
})

test('sitemap parser detects foreign origins', () => {
  const sitemap = inspectSitemap('<?xml version="1.0"?><urlset><url><loc>https://example.com/a</loc></url><url><loc>https://other.test/b</loc></url></urlset>', new URL('https://example.com/sitemap.xml'), 'https://example.com', 200)
  assert.equal(sitemap.validXml, true)
  assert.equal(sitemap.urlCount, 2)
  assert.equal(sitemap.foreignUrlCount, 1)
})

test('email HTML uses an email-specific ruleset instead of website SEO rules', () => {
  const html = '<!doctype html><html><head><style>@media(max-width:600px){table{width:100%}}</style></head><body><a href="https://example.com/start?utm_source=newsletter">Get started</a><a href="https://example.com/unsubscribe">Unsubscribe</a></body></html>'
  const email = asset({kind: 'email', requestedUrl: '', finalUrl: '', source: 'uploaded-html', evidenceText: html, pages: [page({url: 'https://email.sellf-surface.local/', ctaCount: 1, emptyLinks: 0, htmlIssues: [], imageCount: 0})]})
  const result = auditSurface([email], 'en', 'other', 'lead')
  assert.ok(!result.findings.some((item) => item.code === 'canonical' || item.code === 'structured-data'))
  assert.ok(result.assetScores[0].score >= 90)
  assert.ok(result.pillars.assetHealth.score !== null)
  assert.equal(result.confidence, 'medium')
})

test('YouTube and Google Business receive their own observable rules', () => {
  const youtube = asset({id: 'yt', kind: 'youtube', requestedUrl: 'https://youtube.com/@example', finalUrl: 'https://youtube.com/@example', source: 'manual-evidence', pages: [], evidenceText: 'Example publishes a weekly webinar series and playlists for growth leaders. Learn more about our complete advisory offer and case studies at https://example.com. Latest video: 2026-09-20.'})
  const google = asset({id: 'gmb', kind: 'google-business', requestedUrl: 'https://maps.google.com/example', finalUrl: 'https://maps.google.com/example', source: 'manual-evidence', pages: [], evidenceText: 'Category: Growth consultancy. Website https://example.com. Phone +90 555 111 22 33. Opening hours Monday 09:00. Rating 4.8 reviews.'})
  const result = auditSurface([youtube, google], 'en', 'service', 'lead')
  assert.ok(!result.findings.some((item) => item.code === 'title' || item.code === 'canonical'))
  assert.equal(result.assetScores.length, 2)
  assert.ok(result.assetScores.every((item) => item.score !== null))
})
