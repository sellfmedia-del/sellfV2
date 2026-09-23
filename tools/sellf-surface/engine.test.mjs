import test from 'node:test'
import assert from 'node:assert/strict'
import {auditSurface} from './engine.ts'

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
  assert.equal(result.confidence, 'medium')
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
