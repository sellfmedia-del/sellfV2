import test from 'node:test'
import assert from 'node:assert/strict'
import {assessMarketFit, calculatePrice, calculateSalesPlan, defaultCosts, derivePositioning, summarizeMarket} from './engine.ts'

const close = (actual, expected, tolerance = .01) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} ≠ ${expected}`)

test('target price is solved backwards through VAT, commission, returns and margin', () => {
  const input = {...defaultCosts, production: 200, packaging: 0, inboundLogistics: 0, outboundLogistics: 0, operations: 0, otherVariable: 0, returnHandling: 0, marketingPerOrder: 0, vatRate: 20, commissionRate: 10, paymentRate: 0, returnRate: 0, targetMargin: 20, plannedDiscountRate: 0}
  const result = calculatePrice(input)
  close(result.targetSalePrice, 352.94117647)
  close(result.breakEvenSalePrice, 272.72727272)
})

test('planned discount is grossed up into the recommended list price', () => {
  const result = calculatePrice({...defaultCosts, plannedDiscountRate: 20})
  assert.ok(result.recommendedListPrice > result.targetSalePrice)
  close(result.recommendedListPrice * .8, result.targetSalePrice)
})

test('high fees and margin can make a target mathematically impossible', () => {
  const result = calculatePrice({...defaultCosts, commissionRate: 80, targetMargin: 40})
  assert.equal(result.targetSalePrice, null)
  assert.ok(result.warnings.some((item) => item.includes('uygulanabilir')))
})

test('returns reduce recognized revenue and increase the required gross volume', () => {
  const scenario = {id: 'base', name: 'Base', listPrice: 1000, discountRate: 0, shippingCost: 0, commissionRate: 0, returnRate: 20, cac: 0, conversionRate: 2, unitsPerOrder: 1}
  const target = {targetType: 'units', targetValue: 100, existingCustomerShare: 0, repeatOrdersPerNewCustomer: 0, organicNewCustomerShare: 0, fixedPeriodCosts: 0, cacRangeLow: 0, cacRangeHigh: 0}
  const result = calculateSalesPlan({...defaultCosts, vatRate: 0, production: 0, packaging: 0, inboundLogistics: 0, outboundLogistics: 0, distribution: 0, operations: 0, otherVariable: 0, returnHandling: 0, marketingPerOrder: 0, paymentRate: 0}, target, scenario)
  close(result.requiredOrders, 125)
  close(result.requiredGrossUnits, 125)
  close(result.revenue, 100000)
})

test('repeat purchases reduce required new customers', () => {
  const scenario = {id: 'base', name: 'Base', listPrice: 1000, discountRate: 0, shippingCost: 0, commissionRate: 0, returnRate: 0, cac: 100, conversionRate: 2, unitsPerOrder: 1}
  const target = {targetType: 'units', targetValue: 100, existingCustomerShare: 20, repeatOrdersPerNewCustomer: 1, organicNewCustomerShare: 25, fixedPeriodCosts: 0, cacRangeLow: 80, cacRangeHigh: 120}
  const result = calculateSalesPlan(defaultCosts, target, scenario)
  close(result.requiredNewCustomers, 40)
  close(result.requiredPaidCustomers, 30)
  close(result.requiredVisits, 1500)
})

test('market summary uses quartiles and never invents data', () => {
  const empty = summarizeMarket([])
  assert.equal(empty.confidence, 'unavailable')
  assert.equal(empty.median, null)
  const summary = summarizeMarket([100, 200, 300, 400, 500].map((price, index) => ({title: `P${index}`, source: 'manual', price})), 450)
  assert.equal(summary.confidence, 'medium')
  assert.equal(summary.median, 300)
  assert.equal(summary.positioning, 'premium')
})

test('package quantity normalizes comparable unit prices', () => {
  const summary = summarizeMarket([
    {title: 'Single', source: 'manual', price: 100, packageQuantity: 1},
    {title: 'Triple', source: 'manual', price: 240, packageQuantity: 3},
    {title: 'Double', source: 'manual', price: 180, packageQuantity: 2},
  ])
  assert.equal(summary.minimum, 80)
  assert.equal(summary.maximum, 100)
})

test('market fit reports a gap when profitable price exceeds observed corridor', () => {
  const summary = summarizeMarket([100, 110, 120, 130, 140].map((price) => ({title: `${price}`, source: 'manual', price})))
  const assessment = assessMarketFit(summary, {...calculatePrice(defaultCosts), targetSalePrice: 200})
  assert.equal(assessment.status, 'gap')
  assert.ok(assessment.gap > 0)
})

test('positioning advice is derived from price tier, channel and repeated product language', () => {
  const evidence = [100, 120, 140, 160, 180].map((price, index) => ({title: `${index < 3 ? 'Doğal ' : ''}yüz temizleme jeli`, source: 'manual', price}))
  const advice = derivePositioning(evidence, summarizeMarket(evidence), 200, 'marketplace', 'tr')
  assert.equal(advice.position, 'premium')
  assert.equal(advice.territory, 'Kanıtlanabilir üstünlük')
  assert.ok(advice.commonTerms.includes('temizleme'))
})
