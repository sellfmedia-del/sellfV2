import type {Metadata} from 'next'
import Link from 'next/link'
import styles from './tools.module.css'

type ToolsPageProps = {params: Promise<{lang: string}>}

const copy = {
  tr: {
    eyebrow: 'SELLF ENGAGE / TOOL’LAR',
    title: 'Framework’leri yalnızca okumayın, işinizde kullanın.',
    description: 'İşinizi değerlendirmek, fırsatları görmek ve daha doğru kararlar almak için geliştirdiğimiz native araçlar.',
    back: 'Engage’e dön',
    soon: 'Geliştiriliyor',
    ready: 'Kullanıma hazır',
    note: 'Her araç Sellf tarafından native component olarak geliştirilecek ve kendi sayfasında kullanılabilecek.',
  },
  en: {
    eyebrow: 'SELLF ENGAGE / TOOLS',
    title: 'Don’t just read the framework. Use it.',
    description: 'Native tools designed to help you diagnose your business, identify opportunities and make better decisions.',
    back: 'Back to Engage',
    soon: 'In development',
    ready: 'Ready to use',
    note: 'Each tool will be built by Sellf as a native component and will be available on its own page.',
  },
} as const

const tools = [
  {title: 'Growth Simulator', tr: 'Sektörünüze özel değişkenlerle büyümenin finansal etkisini canlı olarak modelleyin.', en: 'Model the financial impact of growth with variables tailored to your sector.', slug: 'growth-simulator', ready: true},
  {title: 'Report Audit', tr: 'Raporunuzu alanına ve amacına uygun metriklerle değerlendirin.', en: 'Evaluate your report with metrics tailored to its area and purpose.', slug: 'report-audit', ready: true},
  {title: 'Growth Readiness Score', tr: 'Büyümeye ne kadar hazır olduğunuzu net biçimde değerlendirin.'},
  {title: 'Marketing Profitability Calculator', tr: 'Yatırım yapmadan önce gerçek kârlılık etkisini modelleyin.'},
  {title: 'SellfScale', tr: 'Büyüme sisteminizi uçtan uca haritalayın.'},
  {title: 'SellfCompete', tr: 'Pazardaki konumunuzu ve sıradaki hamlenizi görün.'},
] as const

export async function generateMetadata({params}: ToolsPageProps): Promise<Metadata> {
  const {lang: rawLang} = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'
  const t = copy[lang]
  return {
    title: `${lang === 'tr' ? 'Büyüme Araçları' : 'Growth Tools'} | Sellf Engage`,
    description: t.description,
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/engage/tools`,
      languages: {
        tr: 'https://www.sellfmedia.com/tr/engage/tools',
        en: 'https://www.sellfmedia.com/en/engage/tools',
      },
    },
  }
}

export default async function EngageToolsPage({params}: ToolsPageProps) {
  const {lang: rawLang} = await params
  const lang = rawLang === 'en' ? 'en' : 'tr'
  const t = copy[lang]

  return <main className={styles.page}>
    <header className={styles.hero}>
      <div className={styles.glow} />
      <div className={`sellf-container ${styles.heroInner}`}>
        <Link href={`/${lang}/engage`} className={styles.back}>← {t.back}</Link>
        <span>{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.description}</p>
      </div>
    </header>
    <section className={`sellf-container ${styles.content}`}>
      <p className={styles.note}>{t.note}</p>
      <div className={styles.grid}>
        {tools.map((tool, index) => {
          const body = <>
            <div className={styles.visual}><span>0{index + 1}</span><i /></div>
            <small>{'ready' in tool && tool.ready ? t.ready : t.soon}</small>
            <h2>{tool.title}</h2>
            <p>{lang === 'tr' ? tool.tr : 'en' in tool ? tool.en : tool.title === 'Growth Readiness Score' ? 'Assess how ready your organization is for growth.' : tool.title === 'Marketing Profitability Calculator' ? 'Model real profitability before you invest.' : tool.title === 'SellfScale' ? 'Map your growth system from end to end.' : 'See where you stand and where to move next.'}</p>
          </>
          return 'slug' in tool ? <Link href={`/${lang}/engage/tools/${tool.slug}`} className={styles.card} key={tool.title}>{body}</Link> : <article className={styles.card} key={tool.title}>{body}</article>
        })}
      </div>
    </section>
  </main>
}
