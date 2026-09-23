import type {Metadata} from 'next'
import SellfSurfaceTool from '@/tools/sellf-surface/SellfSurfaceTool'

type PageProps = {params: Promise<{lang: string}>}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {lang: rawLang} = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'
  const description = lang === 'tr'
    ? 'Website, landing page ve sosyal profillerinizi birlikte tarayın; dönüşüm, ölçüm, güven ve tutarlılık sorunlarını kanıtlarıyla görün.'
    : 'Scan websites, landing pages and social profiles together; identify conversion, measurement, trust and consistency issues with evidence.'
  return {
    title: 'Sellf Surface | Digital Growth Audit',
    description,
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/engage/tools/sellf-surface`,
      languages: {
        tr: 'https://www.sellfmedia.com/tr/engage/tools/sellf-surface',
        en: 'https://www.sellfmedia.com/en/engage/tools/sellf-surface',
      },
    },
  }
}

export default async function SellfSurfacePage({params}: PageProps) {
  const {lang: rawLang} = await params
  return <SellfSurfaceTool lang={rawLang === 'en' ? 'en' : 'tr'} />
}
