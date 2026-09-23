import test from 'node:test'
import assert from 'node:assert/strict'
import {calculateScenario, compareScenarios} from './engine.ts'

const closeTo = (actual, expected, tolerance = 0.01) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `expected ${actual} to be within ${tolerance} of ${expected}`)
}

const b2bBaseline = {
  marketingSpend: 300000, cpl: 1500, nonPaidLeads: 120, qualificationRate: 35,
  proposalRate: 55, winRate: 25, averageDeal: 400000, deliveryCapacity: 18,
  revenueRecognitionRate: 60, existingRevenue: 2000000, deliveryCostRate: 45,
  salesCommissionRate: 0, salesCycleMonths: 3, salesPayroll: 500000,
  deliveryPayroll: 1050000, marketingOps: 200000, tech: 120000,
  otherFixed: 180000, growthInvestment: 0,
}

const b2bScenario = {
  ...b2bBaseline, marketingSpend: 450000, qualificationRate: 38, proposalRate: 58,
  winRate: 27, averageDeal: 430000, deliveryCapacity: 22, salesPayroll: 600000,
  deliveryPayroll: 1200000, marketingOps: 250000, tech: 150000, otherFixed: 200000,
  growthInvestment: 500000,
}

test('B2B recognizes only the period share and includes existing-customer revenue', () => {
  const result = compareScenarios('b2b', b2bBaseline, b2bScenario)
  closeTo(result.baseline.revenue, 5696000)
  closeTo(result.scenario.revenue, 7676000)
  closeTo(result.baseline.roas, 7.7)
  closeTo(result.baseline.volume, 15.4)
  closeTo(result.scenario.volume, 22)
  closeTo(result.scenario.secondary.find((item) => item.label === 'Kapasite üstü backlog').value, 2.99336)
})

test('retail reference scenario remains exact', () => {
  const baseline = {storeCount: 10, footfallPerStore: 18000, conversionRate: 19, stockAvailability: 94, returnRate: 3, aov: 900, marketingSpend: 1200000, cogsRate: 50, shrinkageRate: 1.2, commissionRate: 1.8, transactionCost: 15, rentPerStore: 250000, staffPerStore: 320000, utilitiesPerStore: 60000, otherStoreCost: 30000, centralPayroll: 700000, marketingOps: 250000, tech: 150000, otherCentral: 200000, attributedVisits: 30000, attributedConversion: 20, newStoreCapex: 4000000}
  const scenario = {...baseline, storeCount: 12, footfallPerStore: 19500, conversionRate: 20, stockAvailability: 96, returnRate: 2.5, aov: 950, marketingSpend: 1600000, cogsRate: 48.5, shrinkageRate: 1, transactionCost: 16, rentPerStore: 255000, staffPerStore: 330000, utilitiesPerStore: 62000, otherStoreCost: 32000, centralPayroll: 800000, marketingOps: 300000, tech: 190000, otherCentral: 230000, attributedVisits: 42000, attributedConversion: 21}
  const result = compareScenarios('retail', baseline, scenario)
  closeTo(result.baseline.revenue, 28065204)
  closeTo(result.baseline.ebitda, 3622892.48)
  closeTo(result.scenario.revenue, 41614560)
  closeTo(result.scenario.ebitda, 8297413.92)
})

test('real-estate reference scenario remains exact and discounted break-even is grossed up', () => {
  const baseline = {sellableArea: 12000, pricePerSqm: 45000, discountRate: 0, constructionCostPerSqm: 20000, contingencyRate: 12, marketingSpend: 9000000, financeCost: 32000000, landCost: 100000000, softCosts: 18000000, salesCommissionRate: 3, overhead: 24000000, growthInitiative: 0, marketingAttributedRevenue: 90000000}
  const scenario = {...baseline, pricePerSqm: 48000, constructionCostPerSqm: 19500, contingencyRate: 10, marketingSpend: 12000000, financeCost: 24000000, growthInitiative: 3000000, marketingAttributedRevenue: 125000000}
  const result = compareScenarios('realEstate', baseline, scenario)
  closeTo(result.baseline.ebitda, 104000000)
  closeTo(result.scenario.ebitda, 144320000)
  closeTo(result.scenario.secondary.find((item) => item.label === 'Başabaş satış fiyatı / m²').value, 37973.333333)

  const discounted = calculateScenario('realEstate', {...baseline, discountRate: 10})
  const breakEvenPrice = discounted.secondary.find((item) => item.label === 'Başabaş satış fiyatı / m²').value
  closeTo(breakEvenPrice, discounted.breakEvenRevenue / (12000 * 0.9))
})

test('invalid inputs cannot produce negative revenue, orders or expenses', () => {
  const result = calculateScenario('ecommerce', {adSpend: -100000, cpc: -10, paidConversion: 200, organicVisits: -5, organicConversion: 200, aov: -50, returnRate: -10, cogsRate: -5, commissionRate: -2, logisticsPerOrder: -30, marketingOps: -1, payroll: -1, warehouse: -1, tech: -1, otherFixed: -1})
  assert.ok(result.revenue >= 0)
  assert.ok(result.expenses >= 0)
  assert.ok(result.volume >= 0)
  assert.equal(result.roas, null)
})

test('non-positive unit contribution has no false break-even', () => {
  const result = calculateScenario('ecommerce', {adSpend: 100000, cpc: 10, paidConversion: 4, organicVisits: 0, organicConversion: 1, aov: 50, returnRate: 0, cogsRate: 90, commissionRate: 30, logisticsPerOrder: 1000, marketingOps: 0, payroll: 0, warehouse: 0, tech: 0, otherFixed: 0})
  assert.equal(result.breakEvenRevenue, null)
  assert.ok(result.warnings.some((warning) => warning.includes('başabaş mümkün değil')))
})

test('Growth ROI denominator includes incremental operating and one-off investment', () => {
  const result = compareScenarios('b2b', b2bBaseline, b2bScenario)
  assert.equal(result.growthInvestment, 1000000)
})
