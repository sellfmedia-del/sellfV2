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
  assert.equal(investment.narrative.verdict.status, 'conditional')
  assert.ok(investment.narrative.risks.some((item) => item.code === 'investment-economics-risk'))
  assert.ok(investment.narrative.actions.some((item) => item.code === 'investment-economics-action'))
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

test('complete reports receive a decision-ready five-part narrative', () => {
  const result = audit({reportText: 'OTIF, sevkiyat adedi, sevkiyat başına maliyet, teslimat süresi, kapasite kullanımı, hasar oranı ve hesaplama metodolojisi'})
  assert.equal(result.narrative.verdict.status, 'ready')
  assert.ok(result.narrative.strengths.length > 0)
  assert.ok(result.narrative.risks.length > 0)
  assert.ok(result.narrative.questions.length >= 3)
  assert.ok(result.narrative.actions.length > 0)
})

test('purpose-specific context gaps change the verdict and recommendations', () => {
  const reportText = 'OTIF, sevkiyat adedi, sevkiyat başına maliyet, teslimat süresi, kapasite kullanımı ve hasar oranı'
  const monitoring = audit({reportText})
  const diagnosis = audit({purpose: 'diagnosis', reportText, context: {...completeContext, segmented: false}})
  assert.equal(monitoring.narrative.verdict.status, 'ready')
  assert.equal(diagnosis.narrative.verdict.status, 'conditional')
  assert.ok(diagnosis.narrative.risks.some((item) => item.code === 'signal-risk:segmentation'))
  assert.notEqual(monitoring.narrative.questions[0].title, diagnosis.narrative.questions[0].title)
})

test('missing core metrics create a not-ready verdict and immediate actions', () => {
  const result = audit({primaryArea: 'finance', reportText: 'Gelir ve brüt kâr'})
  assert.equal(result.narrative.verdict.status, 'not-ready')
  assert.ok(result.narrative.risks.some((item) => item.code.startsWith('metric-risk:')))
  assert.ok(result.narrative.actions.some((item) => item.priority === 'now' && item.code.startsWith('metric-action:')))
})

test('every report area receives distinct management questions', () => {
  const reports = {
    marketing: 'Pazarlama harcaması, atfedilen gelir, yeni müşteri, müşteri edinme maliyeti ve katkı marjı',
    sales: 'Pipeline değeri, aşama dönüşümü, kazanma oranı, satış döngüsü ve satış tahmini',
    commerce: 'Net ciro, sipariş, dönüşüm oranı, ortalama sepet, brüt marj, iade oranı ve stok bulunabilirliği',
    finance: 'Gelir, brüt kâr, operasyonel gider, EBITDA, nakit akışı ve bütçe sapması',
    operations: 'OTIF, sevkiyat adedi, sevkiyat başına maliyet, teslimat süresi, kapasite kullanımı ve hasar oranı',
    project: 'Fiziksel ilerleme, bütçe gerçekleşen, satış hızı, tahsilat, kalan stok ve finansman ihtiyacı',
  }
  const areaQuestions = Object.entries(reports).map(([primaryArea, reportText]) => audit({primaryArea, reportText}).narrative.questions[1].title)
  assert.equal(new Set(areaQuestions).size, Object.keys(reports).length)
})

test('all six purposes produce a distinct decision lens', () => {
  const reportText = 'OTIF, sevkiyat adedi, sevkiyat başına maliyet, teslimat süresi, kapasite kullanımı, hasar oranı, SLA, backlog, rota verimliliği ve operasyon yatırımı geri dönüşü'
  const purposes = ['monitoring', 'diagnosis', 'allocation', 'forecast', 'investment', 'executive']
  const questions = purposes.map((purpose) => audit({purpose, reportText}).narrative.questions[0].title)
  assert.equal(new Set(questions).size, purposes.length)
})

test('unreadable files keep the narrative in review state without invented advice', () => {
  const result = audit({readable: false, reportText: ''})
  assert.equal(result.narrative.verdict.status, 'review')
  assert.deepEqual(result.narrative.strengths, [])
  assert.deepEqual(result.narrative.risks, [])
  assert.deepEqual(result.narrative.questions, [])
  assert.deepEqual(result.narrative.actions, [])
})

test('English audits localize every narrative section', () => {
  const result = audit({locale: 'en', reportText: 'OTIF, shipment volume, cost per shipment, delivery time, capacity utilization and damage rate'})
  assert.match(result.narrative.verdict.title, /report|decision/i)
  assert.ok(result.narrative.strengths.every((item) => !/[çğıöşü]/i.test(item.title)))
  assert.match(result.narrative.questions[0].detail, /performance monitoring/i)
})
