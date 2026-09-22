import type {NumericInputs, SectorId} from './engine'

type Localized = {tr: string; en: string}
export type FieldConfig = {
  key: string
  label: Localized
  min: number
  max: number
  step: number
  unit: 'currency' | 'percent' | 'number' | 'months'
  advanced?: boolean
}

export type SectorConfig = {
  id: SectorId
  name: Localized
  description: Localized
  fields: FieldConfig[]
  baseline: NumericInputs
  scenario: NumericInputs
}

const l = (tr: string, en: string): Localized => ({tr, en})
const f = (key: string, tr: string, en: string, min: number, max: number, step: number, unit: FieldConfig['unit'], advanced = false): FieldConfig => ({key, label: l(tr, en), min, max, step, unit, advanced})

export const sectors: SectorConfig[] = [
  {
    id: 'ecommerce', name: l('E-ticaret', 'E-commerce'),
    description: l('Trafikten net siparişe, iadeden EBITDA’ya kadar ticaret ekonomisi.', 'Commerce economics from traffic and returns through EBITDA.'),
    fields: [
      f('adSpend', 'Reklam bütçesi', 'Ad spend', 0, 5000000, 25000, 'currency'), f('cpc', 'Ortalama CPC', 'Average CPC', 0.1, 100, .1, 'currency'),
      f('paidConversion', 'Ücretli dönüşüm', 'Paid conversion', .1, 15, .1, 'percent'), f('organicVisits', 'Organik ziyaret', 'Organic visits', 0, 500000, 1000, 'number'),
      f('organicConversion', 'Organik dönüşüm', 'Organic conversion', .1, 15, .1, 'percent'), f('aov', 'Ortalama sepet', 'Average order value', 50, 10000, 25, 'currency'),
      f('returnRate', 'İade oranı', 'Return rate', 0, 50, .5, 'percent'), f('cogsRate', 'Ürün maliyeti oranı', 'COGS rate', 5, 90, .5, 'percent'),
      f('commissionRate', 'Komisyon oranı', 'Commission rate', 0, 30, .5, 'percent', true), f('logisticsPerOrder', 'Sipariş başı lojistik', 'Logistics per order', 0, 1000, 5, 'currency', true),
      f('marketingOps', 'Pazarlama operasyonu', 'Marketing operations', 0, 2000000, 10000, 'currency', true), f('payroll', 'Personel', 'Payroll', 0, 5000000, 25000, 'currency', true),
      f('warehouse', 'Depo / kira', 'Warehouse / rent', 0, 2000000, 10000, 'currency', true), f('tech', 'Teknoloji', 'Technology', 0, 1000000, 5000, 'currency', true), f('otherFixed', 'Diğer sabit giderler', 'Other fixed costs', 0, 2000000, 10000, 'currency', true),
    ],
    baseline: {adSpend: 1000000, cpc: 10, paidConversion: 4, organicVisits: 60000, organicConversion: 3, aov: 900, returnRate: 3, cogsRate: 50, commissionRate: 2, logisticsPerOrder: 35, marketingOps: 250000, payroll: 650000, warehouse: 180000, tech: 90000, otherFixed: 140000},
    scenario: {adSpend: 1300000, cpc: 9.5, paidConversion: 4.2, organicVisits: 75000, organicConversion: 3.2, aov: 950, returnRate: 2.5, cogsRate: 48.5, commissionRate: 2, logisticsPerOrder: 34, marketingOps: 300000, payroll: 700000, warehouse: 200000, tech: 110000, otherFixed: 150000},
  },
  {
    id: 'b2b', name: l('B2B', 'B2B'), description: l('Lead’den kazanılan işe; satış döngüsü, kapasite ve backlog ile.', 'From leads to won business, with sales-cycle, capacity and backlog constraints.'),
    fields: [
      f('marketingSpend', 'Pazarlama bütçesi', 'Marketing spend', 0, 3000000, 25000, 'currency'), f('cpl', 'Lead maliyeti', 'Cost per lead', 10, 10000, 10, 'currency'),
      f('nonPaidLeads', 'Ücretsiz / referans lead', 'Non-paid / referral leads', 0, 2000, 5, 'number'), f('qualificationRate', 'Kalifikasyon oranı', 'Qualification rate', 1, 100, 1, 'percent'),
      f('proposalRate', 'Teklif oranı', 'Proposal rate', 1, 100, 1, 'percent'), f('winRate', 'Kazanma oranı', 'Win rate', 1, 100, 1, 'percent'),
      f('averageDeal', 'Ortalama sözleşme', 'Average contract', 10000, 5000000, 10000, 'currency'), f('deliveryCapacity', 'Dönemsel teslimat kapasitesi', 'Delivery capacity', 1, 200, 1, 'number'),
      f('deliveryCostRate', 'Teslimat maliyeti oranı', 'Delivery cost rate', 1, 90, 1, 'percent', true), f('salesCycleMonths', 'Satış döngüsü', 'Sales cycle', 1, 24, 1, 'months', true),
      f('salesPayroll', 'Satış ekibi gideri', 'Sales payroll', 0, 3000000, 10000, 'currency', true), f('deliveryPayroll', 'Teslimat ekibi gideri', 'Delivery payroll', 0, 5000000, 25000, 'currency', true),
      f('marketingOps', 'Pazarlama operasyonu', 'Marketing operations', 0, 1000000, 10000, 'currency', true), f('tech', 'Teknoloji', 'Technology', 0, 1000000, 5000, 'currency', true), f('otherFixed', 'Diğer sabit giderler', 'Other fixed costs', 0, 2000000, 10000, 'currency', true),
    ],
    baseline: {marketingSpend: 740000, cpl: 3000, nonPaidLeads: 73, qualificationRate: 40, proposalRate: 40, winRate: 30, averageDeal: 370000, deliveryCapacity: 18, deliveryCostRate: 45, salesCycleMonths: 4, salesPayroll: 500000, deliveryPayroll: 1050000, marketingOps: 200000, tech: 120000, otherFixed: 180000},
    scenario: {marketingSpend: 1000000, cpl: 2800, nonPaidLeads: 64, qualificationRate: 43, proposalRate: 45, winRate: 32, averageDeal: 380000, deliveryCapacity: 22, deliveryCostRate: 42, salesCycleMonths: 3, salesPayroll: 600000, deliveryPayroll: 1200000, marketingOps: 250000, tech: 150000, otherFixed: 200000},
  },
  {
    id: 'retail', name: l('Mağazacılık', 'Retail'), description: l('Mağaza trafiği, stok bulunabilirliği ve şube ekonomisi.', 'Store traffic, stock availability and branch economics.'),
    fields: [
      f('storeCount', 'Mağaza sayısı', 'Store count', 1, 200, 1, 'number'), f('footfallPerStore', 'Mağaza başı ziyaret', 'Footfall per store', 100, 100000, 100, 'number'),
      f('conversionRate', 'Mağaza dönüşümü', 'Store conversion', 1, 80, .5, 'percent'), f('stockAvailability', 'Stok bulunabilirliği', 'Stock availability', 40, 100, .5, 'percent'),
      f('returnRate', 'İade oranı', 'Return rate', 0, 40, .5, 'percent'), f('aov', 'Ortalama sepet', 'Average basket', 50, 20000, 50, 'currency'),
      f('marketingSpend', 'Pazarlama bütçesi', 'Marketing spend', 0, 5000000, 25000, 'currency'), f('cogsRate', 'Ürün maliyeti oranı', 'COGS rate', 5, 90, .5, 'percent'),
      f('shrinkageRate', 'Kayıp / fire oranı', 'Shrinkage rate', 0, 15, .1, 'percent', true), f('commissionRate', 'Ödeme komisyonu', 'Payment commission', 0, 10, .1, 'percent', true),
      f('transactionCost', 'İşlem başı operasyon', 'Operations per transaction', 0, 500, 1, 'currency', true), f('rentPerStore', 'Mağaza başı kira', 'Rent per store', 0, 2000000, 10000, 'currency', true),
      f('staffPerStore', 'Mağaza başı personel', 'Staff per store', 0, 2000000, 10000, 'currency', true), f('utilitiesPerStore', 'Mağaza başı genel gider', 'Utilities per store', 0, 500000, 5000, 'currency', true),
      f('otherStoreCost', 'Diğer mağaza gideri', 'Other store costs', 0, 500000, 5000, 'currency', true), f('centralPayroll', 'Merkez ekip', 'Central payroll', 0, 5000000, 25000, 'currency', true),
      f('marketingOps', 'Pazarlama operasyonu', 'Marketing operations', 0, 1000000, 10000, 'currency', true), f('tech', 'Teknoloji', 'Technology', 0, 1000000, 5000, 'currency', true),
      f('otherCentral', 'Diğer merkez gideri', 'Other central costs', 0, 2000000, 10000, 'currency', true), f('attributedVisits', 'Pazarlamaya atfedilen ziyaret', 'Attributed visits', 0, 500000, 1000, 'number', true),
      f('attributedConversion', 'Atfedilen ziyaret dönüşümü', 'Attributed conversion', 1, 80, .5, 'percent', true), f('newStoreCapex', 'Yeni mağaza CAPEX’i', 'New-store CAPEX', 0, 50000000, 100000, 'currency', true),
    ],
    baseline: {storeCount: 10, footfallPerStore: 18000, conversionRate: 19, stockAvailability: 94, returnRate: 3, aov: 900, marketingSpend: 1200000, cogsRate: 50, shrinkageRate: 1.2, commissionRate: 1.8, transactionCost: 15, rentPerStore: 250000, staffPerStore: 320000, utilitiesPerStore: 60000, otherStoreCost: 30000, centralPayroll: 700000, marketingOps: 250000, tech: 150000, otherCentral: 200000, attributedVisits: 30000, attributedConversion: 20, newStoreCapex: 4000000},
    scenario: {storeCount: 12, footfallPerStore: 19500, conversionRate: 20, stockAvailability: 96, returnRate: 2.5, aov: 950, marketingSpend: 1600000, cogsRate: 48.5, shrinkageRate: 1, commissionRate: 1.8, transactionCost: 16, rentPerStore: 255000, staffPerStore: 330000, utilitiesPerStore: 62000, otherStoreCost: 32000, centralPayroll: 800000, marketingOps: 300000, tech: 190000, otherCentral: 230000, attributedVisits: 42000, attributedConversion: 21, newStoreCapex: 4000000},
  },
  {
    id: 'realEstate', name: l('İnşaat & gayrimenkul', 'Construction & real estate'), description: l('Proje geliştirici modeli: satış değeri, maliyet, finansman ve proje kârlılığı.', 'Developer model: sales value, costs, financing and project profitability.'),
    fields: [
      f('sellableArea', 'Satılabilir alan', 'Sellable area', 100, 100000, 100, 'number'), f('pricePerSqm', 'Satış fiyatı / m²', 'Sales price / sqm', 1000, 500000, 1000, 'currency'),
      f('discountRate', 'Ortalama iskonto', 'Average discount', 0, 40, .5, 'percent'), f('constructionCostPerSqm', 'İnşaat maliyeti / m²', 'Construction cost / sqm', 500, 300000, 500, 'currency'),
      f('contingencyRate', 'Beklenmeyen gider payı', 'Contingency rate', 0, 40, .5, 'percent'), f('marketingSpend', 'Pazarlama bütçesi', 'Marketing spend', 0, 50000000, 100000, 'currency'),
      f('financeCost', 'Finansman maliyeti', 'Finance cost', 0, 500000000, 1000000, 'currency'), f('landCost', 'Arsa maliyeti', 'Land cost', 0, 1000000000, 1000000, 'currency', true),
      f('softCosts', 'Proje, ruhsat ve danışmanlık', 'Soft costs', 0, 200000000, 500000, 'currency', true), f('salesCommissionRate', 'Satış komisyonu', 'Sales commission', 0, 15, .25, 'percent', true),
      f('overhead', 'Genel yönetim', 'Overhead', 0, 200000000, 500000, 'currency', true), f('growthInitiative', 'Ek büyüme yatırımı', 'Additional growth investment', 0, 100000000, 500000, 'currency', true),
      f('marketingAttributedRevenue', 'Pazarlamaya atfedilen satış', 'Marketing-attributed sales', 0, 1000000000, 1000000, 'currency', true),
    ],
    baseline: {sellableArea: 12000, pricePerSqm: 45000, discountRate: 0, constructionCostPerSqm: 20000, contingencyRate: 12, marketingSpend: 9000000, financeCost: 32000000, landCost: 100000000, softCosts: 18000000, salesCommissionRate: 3, overhead: 24000000, growthInitiative: 0, marketingAttributedRevenue: 90000000},
    scenario: {sellableArea: 12000, pricePerSqm: 48000, discountRate: 0, constructionCostPerSqm: 19500, contingencyRate: 10, marketingSpend: 12000000, financeCost: 24000000, landCost: 100000000, softCosts: 18000000, salesCommissionRate: 3, overhead: 24000000, growthInitiative: 3000000, marketingAttributedRevenue: 125000000},
  },
]

export const getSector = (id: SectorId) => sectors.find((sector) => sector.id === id) ?? sectors[0]
