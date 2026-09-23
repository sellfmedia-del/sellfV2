import type {Metadata} from 'next'
import ReportAuditTool from '@/tools/report-audit/ReportAuditTool'

type PageProps = {params: Promise<{lang: string}>}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {lang: rawLang} = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'
  const description = lang === 'tr'
    ? 'Raporunuzu alanına ve amacına uygun metriklerle değerlendirin; kritik eksikleri, bağlam sorunlarını ve karar verme sınırlarını görün.'
    : 'Evaluate your report with metrics relevant to its area and purpose; identify critical gaps, context issues and decision-making limits.'
  return {
    title: 'Report Audit | Sellf Engage',
    description,
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/engage/tools/report-audit`,
      languages: {
        tr: 'https://www.sellfmedia.com/tr/engage/tools/report-audit',
        en: 'https://www.sellfmedia.com/en/engage/tools/report-audit',
      },
    },
  }
}

export default async function ReportAuditPage({params}: PageProps) {
  const {lang: rawLang} = await params
  return <ReportAuditTool lang={rawLang === 'en' ? 'en' : 'tr'} />
}

