export type Locale = 'tr' | 'en'

export type BusinessModel = 'ecommerce' | 'b2b' | 'retail' | 'service' | 'marketplace' | 'real-estate'
export type Objective = 'sales' | 'profitability' | 'launch' | 'international' | 'digitalize' | 'brand'
export type Stage = 'idea' | 'early' | 'established' | 'scaling'
export type Readiness = 'yes' | 'partial' | 'no' | 'unknown'
export type TrafficState = 'low' | 'adequate' | 'unknown'
export type ConversionState = 'weak' | 'healthy' | 'unknown'

export type ProblemSignal =
  | 'low-demand'
  | 'low-conversion'
  | 'low-quality-leads'
  | 'low-close-rate'
  | 'margin-pressure'
  | 'fulfillment'
  | 'manual-process'
  | 'site-technical'
  | 'low-retention'
  | 'brand-unclear'
  | 'marketplace-complexity'

export type ClarificationId = 'shipping-meaning' | 'ads-outcome' | 'site-meaning'

export type NarrativeAssessment = {
  matchedPhrases: string[]
  suggestedSignals: ProblemSignal[]
  clarificationIds: ClarificationId[]
  confidence: 'none' | 'low' | 'medium' | 'high'
}

export type RouteInputs = {
  businessModel: BusinessModel
  objective: Objective
  stage: Stage
  signals: ProblemSignal[]
  offerReady: Readiness
  measurementReady: Readiness
  unitEconomicsReady: Readiness
  capacityReady: Readiness
  conversionPathReady: Readiness
  trafficState: TrafficState
  conversionState: ConversionState
}

export type ServiceId =
  | 'commercial-diagnosis'
  | 'offer-positioning'
  | 'measurement'
  | 'digital-foundation'
  | 'ecommerce-operations'
  | 'software-workflow'
  | 'conversion'
  | 'sales-funnel'
  | 'marketplace'
  | 'performance'
  | 'organic-growth'
  | 'retention'
  | 'international-growth'
  | 'brand-system'

export type RouteItem = {
  id: ServiceId
  phase: 1 | 2 | 3
  state: 'required' | 'next' | 'blocked'
  reasons: string[]
  blockers: string[]
}

export type RouteResult = {
  items: RouteItem[]
  excluded: ServiceId[]
  confidenceScore: number
  confidenceReasons: string[]
  diagnosis: string[]
}

