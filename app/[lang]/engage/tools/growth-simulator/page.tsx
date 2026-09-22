import type {Metadata} from 'next'
import GrowthSimulatorTool from '@/tools/growth-simulator/GrowthSimulatorTool'

type PageProps = {params: Promise<{lang: string}>}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {lang: rawLang} = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'
  const title = lang === 'tr' ? 'Growth Simulator | Sellf Engage' : 'Growth Simulator | Sellf Engage'
  const description = lang === 'tr'
    ? 'Sektörünüze özel değişkenlerle büyüme senaryonuzun ciro, gider, EBITDA, ROI ve finansal sağlık etkisini simüle edin.'
    : 'Simulate revenue, expenses, EBITDA, ROI and financial health with variables tailored to your business model.'
  return {title, description, alternates: {canonical: `https://www.sellfmedia.com/${lang}/engage/tools/growth-simulator`, languages: {tr: 'https://www.sellfmedia.com/tr/engage/tools/growth-simulator', en: 'https://www.sellfmedia.com/en/engage/tools/growth-simulator'}}}
}

export default async function GrowthSimulatorPage({params}: PageProps) {
  const {lang: rawLang} = await params
  return <GrowthSimulatorTool lang={rawLang === 'en' ? 'en' : 'tr'} />
}
