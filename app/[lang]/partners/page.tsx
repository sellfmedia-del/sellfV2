import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getPartnersData} from '@/sanity/lib/partners'
import {partnersCopy} from '@/data/PartnersContent'
import PartnersHome from '@/components/partners/PartnersHome'
import {PartnerRequestProvider} from '@/components/partners/PartnerRequests'

export const dynamic = 'force-dynamic'
type PageProps = {params: Promise<{lang: string}>}
const base = 'https://www.sellfmedia.com'

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {lang} = await params
  if (lang !== 'tr' && lang !== 'en') return {}
  const data = await getPartnersData(lang)
  const t = partnersCopy[lang]
  const title = data.settings?.seo?.title || t.seoTitle
  const description = data.settings?.seo?.description || t.seoDescription
  return {
    title, description,
    robots: data.demo || data.settings?.seo?.noIndex ? {index: false, follow: false} : undefined,
    alternates: {canonical: `${base}/${lang}/partners`, languages: {tr: `${base}/tr/partners`, en: `${base}/en/partners`, 'x-default': `${base}/tr/partners`}},
    openGraph: {title, description, url: `${base}/${lang}/partners`, type: 'website', ...(data.settings?.seo?.image ? {images: [data.settings.seo.image]} : {})},
  }
}

export default async function PartnersPage({params}: PageProps) {
  const {lang} = await params
  if (lang !== 'tr' && lang !== 'en') notFound()
  const data = await getPartnersData(lang)
  return <PartnerRequestProvider lang={lang} partners={data.partners} campaigns={data.campaigns}><PartnersHome lang={lang} data={data}/></PartnerRequestProvider>
}
