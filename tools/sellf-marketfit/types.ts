export type Locale = 'tr' | 'en'
export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP'
export type SalesChannel = 'marketplace' | 'own-site' | 'store' | 'wholesale' | 'distributor'
export type Marketplace = 'trendyol' | 'hepsiburada' | 'amazon-tr' | 'n11' | 'other'

export type CostInputs = {
  production: number
  packaging: number
  inboundLogistics: number
  outboundLogistics: number
  distribution: number
  operations: number
  otherVariable: number
  returnHandling: number
  marketingPerOrder: number
  vatRate: number
  commissionRate: number
  paymentRate: number
  returnRate: number
  returnLossRate: number
  targetMargin: number
  plannedDiscountRate: number
}

export type PriceResult = {
  landedCost: number
  expectedNonMarketingCost: number
  breakEvenSalePrice: number | null
  targetSalePrice: number | null
  recommendedListPrice: number | null
  netRevenue: number
  contribution: number
  contributionMargin: number
  maxDiscountRate: number | null
  allowedCac: number
  viable: boolean
  warnings: string[]
}

export type ScenarioInputs = {
  id: string
  name: string
  listPrice: number
  discountRate: number
  shippingCost: number
  commissionRate: number
  returnRate: number
  cac: number
  conversionRate: number
  unitsPerOrder: number
}

export type SalesTargetInputs = {
  targetType: 'units' | 'revenue'
  targetValue: number
  existingCustomerShare: number
  repeatOrdersPerNewCustomer: number
  organicNewCustomerShare: number
  fixedPeriodCosts: number
  cacRangeLow: number
  cacRangeHigh: number
}

export type SalesPlanResult = {
  salePrice: number
  requiredOrders: number
  requiredGrossUnits: number
  requiredNewCustomers: number
  requiredPaidCustomers: number
  requiredVisits: number | null
  revenue: number
  marketingBudgetLow: number
  marketingBudgetHigh: number
  expectedMarketingBudget: number
  breakEvenMarketingBudget: number
  estimatedProfit: number
  profitAfterHighBudget: number
  feasible: boolean
  warnings: string[]
}

export type MarketEvidence = {
  title: string
  url?: string
  source: string
  price: number
  listPrice?: number
  rating?: number
  reviewCount?: number
  freeShipping?: boolean
  packageQuantity?: number
  unitLabel?: string
}

export type MarketSummary = {
  evidenceCount: number
  confidence: 'unavailable' | 'low' | 'medium' | 'high'
  minimum: number | null
  maximum: number | null
  median: number | null
  lowerQuartile: number | null
  upperQuartile: number | null
  suggestedLow: number | null
  suggestedHigh: number | null
  discountPrevalence: number | null
  freeShippingPrevalence: number | null
  positioning: 'unknown' | 'budget' | 'mid-market' | 'premium'
  observations: string[]
}

export type MarketScanRequest = {
  category: string
  productType: string
  productUrl?: string
  competitorUrls?: string[]
  channel: SalesChannel
  marketplace?: Marketplace
  currency: Currency
  manualEvidence?: string
}

export type MarketScanResult = {
  evidence: MarketEvidence[]
  currentProduct?: MarketEvidence
  summary: MarketSummary
  discovery: {
    attempted: boolean
    sourceUrl?: string
    status: 'completed' | 'partial' | 'unavailable'
    note: string
  }
}
