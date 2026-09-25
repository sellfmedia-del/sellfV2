import type {Metadata} from 'next'
import SellfRouteTool from '@/tools/sellf-route/SellfRouteTool'

export async function generateMetadata({params}: {params: Promise<{lang: string}>}): Promise<Metadata> {
  const {lang: rawLang} = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'
  const title = lang === 'tr' ? 'Sellf Route | Operasyon Seçici' : 'Sellf Route | Growth Operations Selector'
  const description = lang === 'tr' ? 'İşletmeniz için gerekli reklam, e-ticaret, yazılım, growth ve danışmanlık operasyonlarını doğru sırayla belirleyin.' : 'Identify the advertising, ecommerce, software, growth and consulting operations your business needs—in the right order.'
  return {title, description, alternates: {canonical: `https://www.sellfmedia.com/${lang}/engage/tools/sellf-route`, languages: {tr: 'https://www.sellfmedia.com/tr/engage/tools/sellf-route', en: 'https://www.sellfmedia.com/en/engage/tools/sellf-route'}}}
}

export default async function SellfRoutePage({params}: {params: Promise<{lang: string}>}) {
  const {lang: rawLang} = await params
  return <SellfRouteTool lang={rawLang === 'en' ? 'en' : 'tr'} />
}
