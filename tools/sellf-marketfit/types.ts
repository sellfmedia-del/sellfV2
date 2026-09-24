export type Locale = 'tr' | 'en'
export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP'
export type SalesChannel = 'marketplace' | 'own-site' | 'store' | 'b2b'
export type Marketplace = 'trendyol' | 'hepsiburada' | 'amazon-tr' | 'n11' | 'other'
export type StoreFormat = 'own-store' | 'chain' | 'department-store' | 'pop-up'
export type B2BModel = 'wholesale' | 'distributor' | 'dealer' | 'corporate'

export type ChannelEconomics = {
  channel: SalesChannel
  monthlyFixedCost: number
  expectedMonthlyUnits: number
  tradeMarginRate: number
  paymentTermDays: number
  annualFinancingRate: number
  minimumOrderUnits: number
}

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
  netRevenueAfterFees: number
  channelCostPerOrder: number
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
  unitAmount?: number
  unitLabel?: string
  observedAt?: string
}

export type MarketSummary = {
  evidenceCount: number
  comparableCount: number
  excludedCount: number
  confidence: 'unavailable' | 'low' | 'medium' | 'high'
  confidenceScore: number
  confidenceReasons: string[]
  comparisonUnit: string | null
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
  storeFormat?: StoreFormat
  b2bModel?: B2BModel
  marketArea?: string
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
