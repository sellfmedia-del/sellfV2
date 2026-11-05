import 'server-only'
import {cache} from 'react'
import {client} from './client'
import {getPartnersDemo} from '@/data/PartnersDemo'
import {isCampaignActive} from '@/lib/partners-utils'
import type {PartnerLocale, PartnersData} from '@/lib/partners-types'

const partnersClient = client.withConfig({useCdn: false, perspective: 'published'})
const localize = (name: string) => `"${name}": select($lang == "en" => coalesce(${name}_en, ${name}_tr), ${name}_tr)`
const seo = `"seo": {${localize('title').replaceAll('title_', 'seo.title_')}, ${localize('description').replaceAll('description_', 'seo.description_')}, "image": seo.image.asset->url, "noIndex": seo.noIndex}`
const faq = `"faqs": faqs[]{${localize('question')}, ${localize('answer')}}`

export const partnersQuery = `{
  "settings": *[_type == "partnersSettings" && _id == "partnersSettings"][0]{
    ${['heroEyebrow', 'heroTitle', 'heroSummary', 'heroNote', 'advantagesTitle', 'advantagesSummary', 'directoryTitle', 'directorySummary', 'matchingTitle', 'matchingSummary', 'joinTitle', 'joinSummary'].map(localize).join(',')},
    ${faq}, ${seo}
  },
  "partners": *[_type == "networkPartner" && active != false && defined(slug.current)] | order(coalesce(order, 9999) asc, name asc){
    _id, name, "slug": slug.current, "categories": coalesce(categories, []),
    ${['summary', 'headline', 'overviewTitle', 'description', 'region', 'languages', 'companySize', 'collaboration', 'collaborationTitle', 'sellfContribution', 'partnerContribution'].map(localize).join(',')},
    "logo": logo.asset->url, "coverImage": coverImage.asset->url, website, featured,
    "audience": select($lang == "en" => coalesce(audience_en, audience_tr), audience_tr),
    "services": services[]{${localize('title')}, ${localize('description')}},
    ${faq}, ${seo}, "updatedAt": coalesce(_updatedAt, _createdAt)
  },
  "campaigns": *[_type == "partnerCampaign" && active != false && partner->active != false && defined(partner->slug.current)
    && (!defined(startAt) || startAt <= now()) && (!defined(endAt) || endAt > now())] | order(coalesce(order, 9999) asc, _createdAt desc){
    _id, "partnerId": partner._ref, ${['title', 'summary', 'eligibility', 'scope', 'terms'].map(localize).join(',')},
    startAt, endAt, redemptionUrl, featured, active
  }
}`

export const getPartnersData = cache(async (lang: PartnerLocale): Promise<PartnersData> => {
  let data: Omit<PartnersData, 'demo'>
  try {
    data = await partnersClient.fetch(partnersQuery, {lang}, {cache: 'no-store'})
  } catch (error) {
    console.error('Partner Network content fetch failed', error)
    // Do not disguise an outage as an empty directory on production.
    throw error
  }
  if (!data.partners.length && (process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development')) {
    return {...getPartnersDemo(lang), settings: data.settings}
  }
  const partnerIds = new Set(data.partners.map((partner) => partner._id))
  return {...data, campaigns: data.campaigns.filter((campaign) => partnerIds.has(campaign.partnerId) && isCampaignActive(campaign)), demo: false}
})
