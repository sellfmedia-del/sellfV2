import type {Metadata} from 'next'
import SellfMarketFitTool from '@/tools/sellf-marketfit/SellfMarketFitTool'

type PageProps = {params: Promise<{lang: string}>}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {lang: rawLang} = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'
  const description = lang === 'tr'
    ? 'Pazar fiyat koridorunu görün, kârlı satış fiyatını hesaplayın ve satış hedefinizi canlı senaryolarla planlayın.'
    : 'See the market price corridor, calculate a profitable selling price and plan sales targets with live scenarios.'
  return {
    title: 'Sellf MarketFit | Pricing & Sales Planner', description,
    alternates: {canonical: `https://www.sellfmedia.com/${lang}/engage/tools/sellf-marketfit`, languages: {tr: 'https://www.sellfmedia.com/tr/engage/tools/sellf-marketfit', en: 'https://www.sellfmedia.com/en/engage/tools/sellf-marketfit'}},
  }
}

export default async function SellfMarketFitPage({params}: PageProps) {
  const {lang: rawLang} = await params
  return <SellfMarketFitTool lang={rawLang === 'en' ? 'en' : 'tr'} />
}
