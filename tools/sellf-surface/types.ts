export type Locale = 'tr' | 'en'
export type AssetKind = 'website' | 'landing' | 'social' | 'youtube' | 'google-business' | 'email'
export type BusinessModel = 'ecommerce' | 'b2b' | 'service' | 'retail' | 'saas' | 'other'
export type PrimaryGoal = 'lead' | 'sale' | 'trust' | 'awareness'
export type AuditDimension = 'discoverability' | 'conversion' | 'trust' | 'measurement' | 'technical' | 'consistency'
export type AuditPillar = 'assetHealth' | 'technicalHealth' | 'journeyConnectivity' | 'brandConsistency'
export type FindingSeverity = 'critical' | 'important' | 'improvement' | 'positive' | 'verification'

export type AssetInput = {
  id: string
  kind: AssetKind
  url: string
  evidenceText?: string
}

export type ScannedPage = {
  url: string
  status: number
  title: string
  description: string
  language: string
  canonical: string
  h1Count: number
  h2Count: number
  wordCount: number
  forms: number
  formFields: number
  ctaCount: number
  internalLinks: string[]
  externalLinks: string[]
  socialLinks: string[]
  emails: string[]
  phones: string[]
  imageCount: number
  imagesWithoutAlt: number
  hasViewport: boolean
  hasNoIndex: boolean
  hasStructuredData: boolean
  hasOpenGraph: boolean
  hasTwitterCard: boolean
  hasAnalytics: boolean
  hasTagManager: boolean
  hasAdPixel: boolean
  hasConsentSignal: boolean
  hasHreflang: boolean
  hasPrivacyLink: boolean
  hasContactLink: boolean
  hasProofSignal: boolean
  hasPricingSignal: boolean
  hasThankYouSignal: boolean
  responseTimeMs?: number
  responseBytes?: number
  redirectCount?: number
  contentType?: string
  securityHeaders?: {
    csp: boolean
    hsts: boolean
    contentTypeOptions: boolean
    referrerPolicy: boolean
  }
  htmlIssues?: string[]
  duplicateIds?: number
  emptyLinks?: number
  unlabeledFields?: number
  unnamedButtons?: number
  headingSkips?: number
  invalidJsonLd?: number
  structuredDataTypes?: string[]
  mixedContentCount?: number
  brokenInternalLinks?: Array<{url: string; status: number}>
  fetchError?: string
}

export type RobotsAudit = {
  url: string
  exists: boolean
  accessible: boolean
  blocksRequestedPath: boolean
  blocksAll: boolean
  syntaxIssues: string[]
  sitemapUrls: string[]
}

export type SitemapAudit = {
  url: string
  exists: boolean
  validXml: boolean
  urlCount: number
  foreignUrlCount: number
  noIndexUrlCount: number
  errors: string[]
}

export type ScannedAsset = {
  id: string
  kind: AssetKind
  requestedUrl: string
  finalUrl: string
  source: 'crawl' | 'public-page' | 'manual-evidence' | 'uploaded-html' | 'mixed' | 'unavailable'
  platform?: string
  pages: ScannedPage[]
  evidenceText: string
  fetchedAt: string
  warnings: string[]
  robots?: RobotsAudit
  sitemap?: SitemapAudit
}

export type SurfaceFinding = {
  code: string
  severity: FindingSeverity
  dimension: AuditDimension
  title: string
  detail: string
  evidence: string
  assetUrl?: string
  action?: string
}

export type DimensionScore = {
  score: number | null
  passedWeight: number
  applicableWeight: number
  verifiedChecks: number
  totalChecks: number
}

export type SurfaceAuditResult = {
  score: number | null
  confidence: 'high' | 'medium' | 'limited'
  scannedAssets: number
  requestedAssets: number
  scannedPages: number
  dimensions: Record<AuditDimension, DimensionScore>
  pillars: Record<AuditPillar, DimensionScore>
  assetScores: Array<{assetId: string; kind: AssetKind; score: number | null; verifiedChecks: number; findings: number}>
  findings: SurfaceFinding[]
  strengths: SurfaceFinding[]
  priorities: SurfaceFinding[]
  verificationNotes: SurfaceFinding[]
  verdict: {status: 'ready' | 'conditional' | 'not-ready' | 'review'; title: string; detail: string}
}

export type SurfaceAuditRequest = {
  locale: Locale
  businessModel: BusinessModel
  primaryGoal: PrimaryGoal
  assets: AssetInput[]
}

export type SurfaceAuditResponse = {
  assets: ScannedAsset[]
  result: SurfaceAuditResult
}
