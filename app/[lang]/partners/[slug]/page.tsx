import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getPartnersData} from '@/sanity/lib/partners'
import PartnerDetail from '@/components/partners/PartnerDetail'
import {PartnerRequestProvider} from '@/components/partners/PartnerRequests'

export const dynamic = 'force-dynamic'
type PageProps = {params: Promise<{lang: string; slug: string}>}
const base = 'https://www.sellfmedia.com'

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {lang, slug} = await params
  if (lang !== 'tr' && lang !== 'en') return {}
  const data = await getPartnersData(lang)
  const partner = data.partners.find((item) => item.slug === slug)
  if (!partner) return {robots: {index: false, follow: false}}
  const title = partner.seo?.title || `${partner.name} | Sellf Partner Network`
  const description = partner.seo?.description || partner.summary
  return {
    title, description, robots: partner.demo || partner.seo?.noIndex ? {index: false, follow: false} : undefined,
    alternates: {canonical: `${base}/${lang}/partners/${slug}`, languages: {tr: `${base}/tr/partners/${slug}`, en: `${base}/en/partners/${slug}`, 'x-default': `${base}/tr/partners/${slug}`}},
    openGraph: {title, description, url: `${base}/${lang}/partners/${slug}`, type: 'website', ...(partner.seo?.image || partner.coverImage || partner.logo ? {images: [partner.seo?.image || partner.coverImage || partner.logo!]} : {})},
  }
}

export default async function PartnerPage({params}: PageProps) {
  const {lang, slug} = await params
  if (lang !== 'tr' && lang !== 'en') notFound()
  const data = await getPartnersData(lang)
  const partner = data.partners.find((item) => item.slug === slug)
  if (!partner) notFound()
  return <PartnerRequestProvider lang={lang} partners={data.partners} campaigns={data.campaigns}><PartnerDetail lang={lang} partner={partner} data={data}/></PartnerRequestProvider>
}
