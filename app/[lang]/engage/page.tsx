import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {engageHref, getEngagePageData, type EngageCard, type EngageLocale} from '@/sanity/lib/engage'
import styles from './engage.module.css'

export const dynamic = 'force-dynamic'

const copy = {
  tr: {
    eyebrow: 'Sellf Engage',
    heroTitle: 'Bilginin izlendiği değil, işe dönüştüğü alan.',
    heroSummary: 'Webinarlar, sahadan içgörüler, gerçek büyüme örnekleri ve kullanıma hazır tool’lar.',
    explore: 'İçeriği İncele',
    register: 'Webinara Kayıt Ol',
    upcoming: 'Yaklaşan',
    past: 'Geçmiş & Kayıtlar',
    webinars: 'Webinarlar',
    events: 'Eventler & Fuarlar',
    content: 'Showcase & Insight',
    tools: 'Büyüme Toolları',
    all: 'Tümünü Gör',
    emptyUpcoming: 'Yaklaşan webinarlar çok yakında burada.',
    emptyPast: 'Webinar kayıtları yayınlandığında burada yer alacak.',
    emptyEvents: 'Yeni event ve fuar takvimi hazırlanıyor.',
    emptyContent: 'Yeni showcase ve insight içerikleri hazırlanıyor.',
    emptyTools: 'Yeni büyüme tool’ları hazırlanıyor.',
    eventLabels: {hosted: 'Sellf Event', sponsored: 'Sponsor', attended: 'Fuar', speaker: 'Konuşmacı'},
    tool: 'Tool',
    insight: 'Insight',
    showcase: 'Showcase',
  },
  en: {
    eyebrow: 'Sellf Engage',
    heroTitle: 'Where knowledge becomes something you can use.',
    heroSummary: 'Webinars, field insights, real growth work and practical tools built by Sellf.',
    explore: 'Explore Content',
    register: 'Register for Webinar',
    upcoming: 'Upcoming',
    past: 'Past & On-demand',
    webinars: 'Webinars',
    events: 'Events & Exhibitions',
    content: 'Showcases & Insights',
    tools: 'Growth Tools',
    all: 'View All',
    emptyUpcoming: 'Upcoming webinars will appear here soon.',
    emptyPast: 'Webinar recordings will appear here when published.',
    emptyEvents: 'The next event and exhibition calendar is in progress.',
    emptyContent: 'New showcases and insights are in progress.',
    emptyTools: 'New growth tools are in progress.',
    eventLabels: {hosted: 'Sellf Event', sponsored: 'Sponsor', attended: 'Exhibition', speaker: 'Speaker'},
    tool: 'Tool',
    insight: 'Insight',
    showcase: 'Showcase',
  },
} as const

type PageProps = {params: Promise<{lang: string}>}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {lang: rawLang} = await params
  const lang: EngageLocale = rawLang === 'en' ? 'en' : 'tr'
  const isEn = lang === 'en'

  return {
    title: isEn ? 'Sellf Engage | Webinars, Insights & Growth Tools' : 'Sellf Engage | Webinar, Insight ve Büyüme Toolları',
    description: isEn
      ? 'Explore Sellf webinars, events, showcases, insights and practical growth tools.'
      : 'Sellf webinarlarını, eventlerini, showcase ve insight içeriklerini ve büyüme tool’larını keşfedin.',
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/engage`,
      languages: {
        tr: 'https://www.sellfmedia.com/tr/engage',
        en: 'https://www.sellfmedia.com/en/engage',
        'x-default': 'https://www.sellfmedia.com/tr/engage',
      },
    },
  }
}

function formatDate(value: string | undefined, lang: EngageLocale) {
  if (!value) return ''
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Istanbul',
  }).format(new Date(value))
}

function itemLabel(item: EngageCard, lang: EngageLocale) {
  const t = copy[lang]
  if (item._type === 'engageWebinar') return t.webinars
  if (item._type === 'engageEvent') return item.eventType ? t.eventLabels[item.eventType] : t.events
  if (item._type === 'engageTool') return t.tool
  return item.contentType === 'showcase' ? t.showcase : t.insight
}

function EmptyCard({children}: {children: React.ReactNode}) {
  return <div className={styles.emptyCard}><span>+</span><p>{children}</p></div>
}

function ContentCard({item, lang, large = false}: {item: EngageCard; lang: EngageLocale; large?: boolean}) {
  return (
    <Link href={engageHref(lang, item)} className={`${styles.contentCard} ${large ? styles.contentCardLarge : ''}`}>
      <div className={styles.cardMedia}>
        {item.coverImage ? (
          <Image src={item.coverImage} alt={item.title} fill sizes={large ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, 33vw'} className={styles.cardImage} />
        ) : (
          <div className={styles.mediaFallback} />
        )}
        <div className={styles.mediaShade} />
        <span className={styles.cardLabel}>{itemLabel(item, lang)}</span>
      </div>
      <div className={styles.cardBody}>
        {item.date && <p className={styles.cardMeta}>{formatDate(item.date, lang)}</p>}
        <h3>{item.title}</h3>
        {item.summary && <p>{item.summary}</p>}
        <span className={styles.arrow}>↗</span>
      </div>
    </Link>
  )
}

function SectionHeading({eyebrow, title}: {eyebrow: string; title: string}) {
  return (
    <div className={styles.sectionHeading}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  )
}

export default async function EngagePage({params}: PageProps) {
  const {lang: rawLang} = await params
  const lang: EngageLocale = rawLang === 'en' ? 'en' : 'tr'
  const t = copy[lang]
  const data = await getEngagePageData(lang)
  const hero = data.featured

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        {hero?.coverImage && (
          <Image src={hero.coverImage} alt="" fill priority sizes="100vw" className={styles.heroImage} />
        )}
        <div className={styles.heroGlow} />
        <div className={`sellf-container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.heroEyebrow}>{data.settings?.heroEyebrow || t.eyebrow}</span>
            <h1>{hero?.title || t.heroTitle}</h1>
            <p>{hero?.summary || t.heroSummary}</p>
            {hero && (
              <Link href={engageHref(lang, hero)} className={styles.heroCta}>
                {hero._type === 'engageWebinar' ? t.register : t.explore}<span>↗</span>
              </Link>
            )}
          </div>
          <div className={styles.heroIndex} aria-hidden="true">
            <span>01</span><span>ENGAGE</span>
          </div>
        </div>
      </section>

      <section className={styles.section} id="webinars">
        <div className="sellf-container">
          <SectionHeading eyebrow="01" title={data.settings?.webinarsTitle || t.webinars} />
          <div className={styles.webinarColumns}>
            <div>
              <div className={styles.columnTitle}><span className={styles.statusDot} />{t.upcoming}</div>
              <div className={styles.stack}>
                {data.upcomingWebinars.length > 0
                  ? data.upcomingWebinars.slice(0, 3).map((item) => <ContentCard key={item._id} item={item} lang={lang} />)
                  : <EmptyCard>{t.emptyUpcoming}</EmptyCard>}
              </div>
            </div>
            <div>
              <div className={styles.columnTitle}><span className={`${styles.statusDot} ${styles.statusDotMuted}`} />{t.past}</div>
              <div className={styles.stack}>
                {data.pastWebinars.length > 0
                  ? data.pastWebinars.slice(0, 3).map((item) => <ContentCard key={item._id} item={item} lang={lang} />)
                  : <EmptyCard>{t.emptyPast}</EmptyCard>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`} id="events">
        <div className="sellf-container">
          <SectionHeading eyebrow="02" title={data.settings?.eventsTitle || t.events} />
          <div className={styles.threeGrid}>
            {data.events.length > 0
              ? data.events.slice(0, 6).map((item, index) => <ContentCard key={item._id} item={item} lang={lang} large={index === 0} />)
              : <EmptyCard>{t.emptyEvents}</EmptyCard>}
          </div>
        </div>
      </section>

      <section className={styles.section} id="insights">
        <div className="sellf-container">
          <SectionHeading eyebrow="03" title={data.settings?.contentTitle || t.content} />
          <div className={styles.contentGrid}>
            {data.content.length > 0
              ? data.content.slice(0, 8).map((item, index) => <ContentCard key={item._id} item={item} lang={lang} large={index === 0 || index === 5} />)
              : <EmptyCard>{t.emptyContent}</EmptyCard>}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.toolsSection}`} id="tools">
        <div className="sellf-container">
          <SectionHeading eyebrow="04" title={data.settings?.toolsTitle || t.tools} />
          <div className={styles.toolsGrid}>
            {data.tools.length > 0
              ? data.tools.map((item) => <ContentCard key={item._id} item={item} lang={lang} />)
              : <EmptyCard>{t.emptyTools}</EmptyCard>}
          </div>
        </div>
      </section>
    </div>
  )
}
