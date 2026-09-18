import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound, redirect} from 'next/navigation'
import {
  ENGAGE_ARCHIVE_PAGE_SIZE,
  engageHref,
  getEngageArchive,
  type EngageArchiveFilter,
  type EngageArchiveSection,
  type EngageCard,
  type EngageLocale,
} from '@/sanity/lib/engage'
import styles from './archive.module.css'

export const dynamic = 'force-dynamic'

type ArchiveProps = {
  params: Promise<{lang: string; section: string}>
  searchParams: Promise<{filter?: string; page?: string}>
}

const content = {
  tr: {
    webinars: {eyebrow: 'SELLF ENGAGE / WEBINARLAR', title: 'Tüm webinarlar.', description: 'Yaklaşan canlı yayınları ve geçmiş webinar kayıtlarını tek yerde keşfedin.'},
    events: {eyebrow: 'SELLF ENGAGE / EVENTLER', title: 'Eventler & fuarlar.', description: 'Düzenlediğimiz, katıldığımız ve desteklediğimiz buluşmaların tamamı.'},
    content: {eyebrow: 'SELLF ENGAGE / İÇERİKLER', title: 'Showcase & Insight.', description: 'Gerçek işlerden öğrenilenler, doğrulanmış framework’ler ve ekibimizin notları.'},
    back: 'Engage’e dön', all: 'Tümü', upcoming: 'Yaklaşan', past: 'Geçmiş', showcases: 'Showcase', insights: 'Insight', empty: 'Bu filtrede henüz içerik yok.', previous: 'Önceki', next: 'Sonraki', page: 'Sayfa', webinar: 'Webinar', event: 'Event', showcase: 'Showcase', insight: 'Insight', comingSoon: 'Yakında', open: 'İncele',
  },
  en: {
    webinars: {eyebrow: 'SELLF ENGAGE / WEBINARS', title: 'All webinars.', description: 'Explore upcoming live sessions and past webinar recordings in one place.'},
    events: {eyebrow: 'SELLF ENGAGE / EVENTS', title: 'Events & exhibitions.', description: 'Every gathering we host, attend or support.'},
    content: {eyebrow: 'SELLF ENGAGE / CONTENT', title: 'Showcases & Insights.', description: 'Lessons from real work, validated frameworks and notes from our team.'},
    back: 'Back to Engage', all: 'All', upcoming: 'Upcoming', past: 'Past', showcases: 'Showcases', insights: 'Insights', empty: 'There is no content in this filter yet.', previous: 'Previous', next: 'Next', page: 'Page', webinar: 'Webinar', event: 'Event', showcase: 'Showcase', insight: 'Insight', comingSoon: 'Coming soon', open: 'Explore',
  },
} as const

const validSections: EngageArchiveSection[] = ['webinars', 'events', 'content']

function isSection(value: string): value is EngageArchiveSection {
  return validSections.includes(value as EngageArchiveSection)
}

function validFilter(section: EngageArchiveSection, value?: string): EngageArchiveFilter {
  const allowed = section === 'content' ? ['all', 'showcases', 'insights'] : ['all', 'upcoming', 'past']
  return allowed.includes(value || '') ? value as EngageArchiveFilter : 'all'
}

function labelFor(item: EngageCard, lang: EngageLocale) {
  const t = content[lang]
  if (item._type === 'engageWebinar') return t.webinar
  if (item._type === 'engageEvent') return t.event
  if (item._type === 'engageShowcase') return t.showcase
  return t.insight
}

function formatDate(value: string | undefined, lang: EngageLocale) {
  if (!value) return content[lang].comingSoon
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
    ...(value.includes('T') ? {hour: '2-digit', minute: '2-digit'} : {}),
    timeZone: 'Europe/Istanbul',
  }).format(new Date(value))
}

function archiveHref(lang: EngageLocale, section: EngageArchiveSection, filter: EngageArchiveFilter, page = 1) {
  const query = new URLSearchParams()
  if (filter !== 'all') query.set('filter', filter)
  if (page > 1) query.set('page', String(page))
  const suffix = query.toString()
  return `/${lang}/engage/${section}${suffix ? `?${suffix}` : ''}`
}

export async function generateMetadata({params}: ArchiveProps): Promise<Metadata> {
  const {lang: rawLang, section} = await params
  if (!isSection(section)) return {}
  const lang: EngageLocale = rawLang === 'en' ? 'en' : 'tr'
  const copy = content[lang][section]
  return {
    title: `${copy.title} | Sellf Engage`,
    description: copy.description,
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/engage/${section}`,
      languages: {
        tr: `https://www.sellfmedia.com/tr/engage/${section}`,
        en: `https://www.sellfmedia.com/en/engage/${section}`,
      },
    },
  }
}

export default async function EngageArchivePage({params, searchParams}: ArchiveProps) {
  const [{lang: rawLang, section: rawSection}, query] = await Promise.all([params, searchParams])
  if (!isSection(rawSection)) notFound()
  const section = rawSection
  const lang: EngageLocale = rawLang === 'en' ? 'en' : 'tr'
  const t = content[lang]
  const copy = t[section]
  const filter = validFilter(section, query.filter)
  const requestedPage = Math.max(1, Number.parseInt(query.page || '1', 10) || 1)
  const data = await getEngageArchive(section, lang, requestedPage, filter)
  const pageCount = Math.max(1, Math.ceil(data.total / ENGAGE_ARCHIVE_PAGE_SIZE))
  if (requestedPage > pageCount && data.total > 0) redirect(archiveHref(lang, section, filter, pageCount))

  const filters: EngageArchiveFilter[] = section === 'content'
    ? ['all', 'showcases', 'insights']
    : ['all', 'upcoming', 'past']

  return <main className={styles.page}>
    <header className={styles.hero}>
      <div className={styles.orb} />
      <div className={`sellf-container ${styles.heroInner}`}>
        <Link href={`/${lang}/engage`} className={styles.back}>← {t.back}</Link>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
      </div>
    </header>

    <section className={`sellf-container ${styles.archive}`}>
      <nav className={styles.filters} aria-label={lang === 'tr' ? 'İçerik filtreleri' : 'Content filters'}>
        {filters.map((item) => <Link key={item} href={archiveHref(lang, section, item)} className={item === filter ? styles.activeFilter : ''}>{t[item]}</Link>)}
      </nav>

      {data.items.length > 0 ? <div className={styles.grid}>
        {data.items.map((item) => <Link href={engageHref(lang, item)} key={item._id} className={styles.card}>
          <div className={styles.media}>
            {item.coverImage ? <Image src={item.coverImage} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /> : <div className={styles.placeholder}>sellf.</div>}
            <div className={styles.shade} />
            <span>{labelFor(item, lang)}</span>
          </div>
          <div className={styles.cardCopy}>
            <time dateTime={item.date}>{formatDate(item.date, lang)}</time>
            <h2>{item.title}</h2>
            {item.summary && <p>{item.summary}</p>}
            <strong>{t.open}<b>→</b></strong>
          </div>
        </Link>)}
      </div> : <p className={styles.empty}>{t.empty}</p>}

      {pageCount > 1 && <nav className={styles.pagination} aria-label={lang === 'tr' ? 'Sayfalama' : 'Pagination'}>
        {requestedPage > 1 ? <Link href={archiveHref(lang, section, filter, requestedPage - 1)}>← {t.previous}</Link> : <span>← {t.previous}</span>}
        <p>{t.page} <strong>{requestedPage}</strong> / {pageCount}</p>
        {requestedPage < pageCount ? <Link href={archiveHref(lang, section, filter, requestedPage + 1)}>{t.next} →</Link> : <span>{t.next} →</span>}
      </nav>}
    </section>
  </main>
}
