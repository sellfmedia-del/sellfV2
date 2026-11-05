export type PartnerLocale = 'tr' | 'en'
export const partnerCategories = ['ecommerce', 'logistics', 'technology', 'finance', 'design', 'international'] as const
export type PartnerCategory = (typeof partnerCategories)[number]
export type PartnerFaq = {question: string; answer: string}
export type PartnerSeo = {title?: string; description?: string; image?: string; noIndex?: boolean}
export type NetworkPartner = {
  _id: string
  name: string
  slug: string
  summary?: string
  headline?: string
  description?: string
  overviewTitle?: string
  categories: PartnerCategory[]
  logo?: string
  coverImage?: string
  website?: string
  region?: string
  languages?: string
  companySize?: string
  audience?: string[]
  services?: Array<{title: string; description?: string}>
  collaboration?: string
  collaborationTitle?: string
  sellfContribution?: string
  partnerContribution?: string
  faqs?: PartnerFaq[]
  featured?: boolean
  seo?: PartnerSeo
  updatedAt?: string
  // Only preview fixtures use these values; they are never published to Sanity.
  demoMark?: 'atlas' | 'rota' | 'forma' | 'nexa' | 'pusula' | 'kopru'
  demo?: boolean
}
export type PartnerCampaign = {
  _id: string
  partnerId: string
  title: string
  summary?: string
  eligibility?: string
  scope?: string
  terms?: string
  startAt?: string
  endAt?: string
  redemptionUrl?: string
  featured?: boolean
  active?: boolean
  demo?: boolean
}
export type PartnersSettings = {
  heroEyebrow?: string
  heroTitle?: string
  heroSummary?: string
  heroNote?: string
  advantagesTitle?: string
  advantagesSummary?: string
  directoryTitle?: string
  directorySummary?: string
  matchingTitle?: string
  matchingSummary?: string
  joinTitle?: string
  joinSummary?: string
  faqs?: PartnerFaq[]
  seo?: PartnerSeo
}
export type PartnersData = {
  settings: PartnersSettings | null
  partners: NetworkPartner[]
  campaigns: PartnerCampaign[]
  demo: boolean
}
