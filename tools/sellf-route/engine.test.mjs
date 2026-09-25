import test from 'node:test'
import assert from 'node:assert/strict'
import {analyzeNarrative, buildRoute} from './engine.ts'

const base = {
  businessModel: 'ecommerce', objective: 'sales', stage: 'established', signals: [],
  offerReady: 'yes', measurementReady: 'yes', unitEconomicsReady: 'yes', capacityReady: 'yes', conversionPathReady: 'yes',
  trafficState: 'adequate', conversionState: 'healthy',
}

test('ambiguous shipping language never becomes an automatic logistics diagnosis', () => {
  const result = analyzeNarrative('Bir tane düzgün kargo çıkışımız bile yok.')
  assert.ok(result.clarificationIds.includes('shipping-meaning'))
  assert.ok(!result.suggestedSignals.includes('fulfillment'))
})

test('explicit order fulfilment evidence can be suggested safely', () => {
  const result = analyzeNarrative('Sipariş geliyor ama depoda hazırlayamıyoruz, kargo etiketleri manuel ve gecikiyor.')
  assert.ok(result.suggestedSignals.includes('fulfillment'))
  assert.ok(result.suggestedSignals.includes('manual-process'))
  assert.ok(!result.clarificationIds.includes('shipping-meaning'))
})

test('advertising complaints open clarification instead of selecting media services', () => {
  const result = analyzeNarrative('Reklama para harcıyoruz ama sonuç alamıyoruz.')
  assert.ok(result.clarificationIds.includes('ads-outcome'))
  assert.equal(result.suggestedSignals.length, 0)
})

test('ads are blocked until commercial, offer, measurement, path and capacity foundations exist', () => {
  const result = buildRoute({...base, offerReady: 'no', measurementReady: 'no', unitEconomicsReady: 'unknown', capacityReady: 'partial', conversionPathReady: 'no', trafficState: 'low'})
  const ads = result.items.find((item) => item.id === 'performance')
  assert.equal(ads.state, 'blocked')
  assert.deepEqual(ads.blockers, ['unit-economics', 'offer', 'measurement', 'conversion-path', 'capacity'])
  assert.ok(result.items.findIndex((item) => item.id === 'commercial-diagnosis') < result.items.findIndex((item) => item.id === 'performance'))
})

test('a fulfilment problem routes operations before workflow software and acquisition', () => {
  const result = buildRoute({...base, signals: ['fulfillment', 'manual-process'], capacityReady: 'no'})
  const ops = result.items.find((item) => item.id === 'ecommerce-operations')
  const software = result.items.find((item) => item.id === 'software-workflow')
  const ads = result.items.find((item) => item.id === 'performance')
  assert.equal(ops.phase, 1)
  assert.equal(software.phase, 2)
  assert.equal(ads.state, 'blocked')
  assert.ok(ads.blockers.includes('capacity'))
})

test('B2B closing problems select sales funnel work, not ecommerce operations', () => {
  const result = buildRoute({...base, businessModel: 'b2b', signals: ['low-close-rate'], objective: 'profitability'})
  assert.ok(result.items.some((item) => item.id === 'sales-funnel'))
  assert.ok(!result.items.some((item) => item.id === 'ecommerce-operations'))
})

test('complete inputs produce a high-confidence route', () => {
  const result = buildRoute({...base, signals: ['low-conversion'], conversionState: 'weak'})
  assert.ok(result.confidenceScore >= 90)
  assert.equal(result.items.find((item) => item.id === 'conversion').state, 'required')
})
