import test from 'node:test'
import assert from 'node:assert/strict'
import {auditReport, detectMetrics, normalizeReportText} from './engine.ts'

const completeContext = {
  periodDefined: true,
  sourceDefined: true,
  comparisonIncluded: true,
  targetIncluded: true,
  segmented: true,
  actionsIncluded: true,
  ownersIncluded: true,
  visualHierarchy: true,
  labelsClear: true,
}

const audit = (overrides = {}) => auditReport({
  locale: 'tr',
  primaryArea: 'operations',
  secondaryAreas: [],
  purpose: 'monitoring',
  reportText: '',
  confirmedMetricIds: [],
  excludedMetricIds: [],
  readable: true,
  reviewComplete: false,
  context: completeContext,
  ...overrides,
})

test('normalization handles Turkish characters consistently', () => {
  assert.equal(normalizeReportText('Müşteri Edinme Maliyeti / Dönüşüm'), 'musteri edinme maliyeti donusum')
})

test('operations monitoring report never requires ROI', () => {
  const result = audit({reportText: 'OTIF, sevkiyat adedi, sevkiyat başına maliyet, teslimat süresi, kapasite kullanımı ve hasar oranı'})
  assert.equal(result.missingRequiredCount, 0)
  assert.ok(!result.metrics.some((item) => item.metric.id === 'investmentReturn'))
  assert.ok(!result.findings.some((item) => item.title.includes('geri dönüş')))
})

test('operations investment report treats investment return as contextual, not universally required', () => {
  const result = audit({purpose: 'investment', reportText: 'OTIF, sevkiyat adedi, sevkiyat başına maliyet, teslimat süresi, kapasite kullanımı ve hasar oranı'})
  const investmentReturn = result.metrics.find((item) => item.metric.id === 'investmentReturn')
  assert.equal(investmentReturn.required, false)
  assert.equal(investmentReturn.status, 'missing')
  assert.ok(result.findings.some((item) => item.code === 'contextual:operations:investmentReturn'))
  assert.ok(!result.findings.some((item) => item.code === 'missing:operations:investmentReturn'))
})

test('marketing investment audit recommends ROI only when the purpose makes it relevant', () => {
  const baseText = 'Pazarlama harcaması, atfedilen gelir, yeni müşteri, müşteri edinme maliyeti ve katkı marjı'
  const monitoring = audit({primaryArea: 'marketing', purpose: 'monitoring', reportText: baseText})
  const investment = audit({primaryArea: 'marketing', purpose: 'investment', reportText: baseText})
  assert.ok(!monitoring.metrics.some((item) => item.metric.id === 'roi'))
  assert.ok(investment.metrics.some((item) => item.metric.id === 'roi' && item.status === 'missing'))
  assert.equal(investment.missingRequiredCount, 0)
})

test('finance audit does not import unrelated marketing requirements', () => {
  const result = audit({primaryArea: 'finance', purpose: 'monitoring', reportText: 'Gelir, brüt kâr, operasyonel gider, EBITDA, nakit akışı ve bütçe sapması'})
  assert.equal(result.missingRequiredCount, 0)
  assert.ok(!result.metrics.some((item) => item.metric.id === 'cac'))
})

test('sales report recognizes the complete core pipeline set', () => {
  const result = audit({primaryArea: 'sales', purpose: 'monitoring', reportText: 'Pipeline değeri, aşama dönüşümü, kazanma oranı, satış döngüsü ve satış tahmini'})
  assert.equal(result.missingRequiredCount, 0)
})

test('commerce report recognizes net sales and order economics without finance-only metrics', () => {
  const result = audit({primaryArea: 'commerce', purpose: 'monitoring', reportText: 'Net ciro, sipariş, dönüşüm oranı, ortalama sepet, brüt marj, iade oranı ve stok bulunabilirliği'})
  assert.equal(result.missingRequiredCount, 0)
  assert.ok(!result.metrics.some((item) => item.metric.id === 'ebitda'))
})

test('project report recognizes progress, commercial and funding metrics', () => {
  const result = audit({primaryArea: 'project', purpose: 'monitoring', reportText: 'Fiziksel ilerleme, bütçe gerçekleşen, satış hızı, tahsilat, kalan stok ve finansman ihtiyacı'})
  assert.equal(result.missingRequiredCount, 0)
})

test('unreadable files produce verification state instead of false missing claims', () => {
  const result = audit({readable: false, reportText: ''})
  assert.equal(result.score, null)
  assert.equal(result.missingRequiredCount, 0)
  assert.ok(result.metrics.every((item) => item.status === 'unverified'))
  assert.equal(result.findings[0].code, 'verification-required')
})

test('manual review must be completed before unchecked metrics are treated as missing', () => {
  const pending = audit({readable: false, reportText: '', confirmedMetricIds: ['operations:otif']})
  const completed = audit({readable: false, reviewComplete: true, reportText: '', confirmedMetricIds: ['operations:otif']})
  assert.equal(pending.score, null)
  assert.ok(pending.metrics.some((item) => item.metric.id === 'volume' && item.status === 'unverified'))
  assert.ok(completed.metrics.some((item) => item.metric.id === 'volume' && item.status === 'missing'))
})

test('supporting-area required metrics remain contextual to the primary audit', () => {
  const result = audit({secondaryAreas: ['finance'], reportText: 'OTIF'})
  const financeMetrics = result.metrics.filter((item) => item.areaId === 'finance')
  assert.ok(financeMetrics.length > 0)
  assert.ok(financeMetrics.every((item) => item.required === false))
  assert.ok(!result.findings.some((item) => item.code.startsWith('missing:finance:')))
})

test('metric detection can be limited to selected areas', () => {
  const metrics = detectMetrics('CAC ve EBITDA raporu', ['finance'])
  assert.ok(metrics.includes('finance:ebitda'))
  assert.ok(!metrics.includes('marketing:cac'))
})
