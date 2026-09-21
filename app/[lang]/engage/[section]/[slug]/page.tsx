import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import {getEngageDetail, type EngageCard, type EngageLocale} from '@/sanity/lib/engage'
import RegistrationPanel from './RegistrationPanel'
import VisualCaseStudy from './VisualCaseStudy'
import styles from './detail.module.css'

export const dynamic = 'force-dynamic'

type DetailProps = {params: Promise<{lang: string; section: string; slug: string}>}

const sectionNames = {
  tr: {webinars: 'Webinar', events: 'Event', showcases: 'Showcase', insights: 'Insight', back: 'Sellf Engage’e Dön', watch: 'İzle', open: 'İçeriği Aç'},
  en: {webinars: 'Webinar', events: 'Event', showcases: 'Showcase', insights: 'Insight', back: 'Back to Sellf Engage', watch: 'Watch', open: 'Open Content'},
} as const

export async function generateMetadata({params}: DetailProps): Promise<Metadata> {
  const {lang: rawLang, section, slug} = await params
  const lang: EngageLocale = rawLang === 'en' ? 'en' : 'tr'
  const item = await getEngageDetail(section, slug, lang)
  if (!item) return {}
  const title = item.seo?.title || item.title

  return {
    title: /Sellf Engage/i.test(title) ? title : `${title} | Sellf Engage`,
    description: item.seo?.description || item.summary,
    robots: item.seo?.noIndex ? {index: false, follow: false} : undefined,
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/engage/${section}/${slug}`,
      languages: {
        tr: `https://www.sellfmedia.com/tr/engage/${section}/${slug}`,
        en: `https://www.sellfmedia.com/en/engage/${section}/${slug}`,
      },
    },
    openGraph: {
      title: item.seo?.title || item.title,
      description: item.seo?.description || item.summary,
      images: item.seo?.image || item.coverImage ? [item.seo?.image || item.coverImage || ''] : undefined,
    },
  }
}

function formatDate(value: string | undefined, lang: EngageLocale, precision: EngageCard['datePrecision'] = 'day') {
  if (!value) return ''
  if (precision === 'month') {
    return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
      month: 'long', year: 'numeric', timeZone: 'Europe/Istanbul',
    }).format(new Date(value))
  }
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Istanbul',
  }).format(new Date(value))
}

function safeVideoEmbed(url?: string) {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`
    if (parsed.hostname.endsWith('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }
  } catch {
    return null
  }
  return null
}

export default async function EngageDetailPage({params}: DetailProps) {
  const {lang: rawLang, section, slug} = await params
  const lang: EngageLocale = rawLang === 'en' ? 'en' : 'tr'
  const t = sectionNames[lang]
  const item = await getEngageDetail(section, slug, lang)
  if (!item || !(section in t)) notFound()

  const embed = safeVideoEmbed(item.recordingUrl || item.videoUrl || item.podcastUrl)
  const externalUrl = item.presentationUrl || (!embed ? item.podcastUrl : undefined) || item.externalUrl
  const registrationSection = section === 'webinars' || section === 'events' ? section : null
  const isVisualCase = item.format === 'visualCase' || item.layoutPreset === 'visualCase'

  return (
    <article className={styles.page}>
      <header className={`${styles.hero} ${isVisualCase ? styles.visualCaseHero : ''}`}>
        {item.coverImage && <Image src={item.coverImage} alt="" fill priority sizes="100vw" className={styles.heroImage} />}
        <div className={styles.heroShade} />
        <div className={`sellf-container ${styles.heroInner}`}>
          <Link href={`/${lang}/engage`} className={styles.back}>← {t.back}</Link>
          <div className={styles.heroCopy}>
            <span>{t[section as keyof typeof t] || 'Sellf Engage'}</span>
            <h1>{item.title}</h1>
            {item.summary && <p>{item.summary}</p>}
            {item.date && <time dateTime={item.date}>{formatDate(item.date, lang, item.datePrecision)}</time>}
          </div>
        </div>
      </header>

      {isVisualCase && item.visualCaseScenes?.length ? (
        <VisualCaseStudy scenes={item.visualCaseScenes} sources={item.sources} disclosure={item.disclosure} lang={lang} />
      ) : (
      <div className={`sellf-container ${styles.content}`}>
        {item.metrics && item.metrics.length > 0 && (
          <section className={styles.metrics} aria-label="Metrics">
            {item.metrics.map((metric) => <div key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}
          </section>
        )}

        {item.speakers && item.speakers.length > 0 && (
          <section className={styles.speakers}>
            {item.speakers.map((speaker) => (
              <div key={speaker._id}>
                {speaker.image && <Image src={speaker.image} alt={speaker.name} width={72} height={72} />}
                <p><strong>{speaker.name}</strong>{speaker.role && <span>{speaker.role}</span>}</p>
              </div>
            ))}
          </section>
        )}

        {registrationSection && (
          <RegistrationPanel
            lang={lang}
            section={registrationSection}
            slug={slug}
            registrationOpen={item.registrationOpen === true}
          />
        )}

        {embed && <div className={styles.video}><iframe src={embed} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>}

        {item.body && item.body.length > 0 && <div className={styles.prose}><PortableText value={item.body as never} /></div>}

        {item.carousel && item.carousel.length > 0 && (
          <div className={styles.carousel}>
            {item.carousel.map((slide, index) => (
              <figure key={`${slide.url}-${index}`}>
                <Image src={slide.url} alt={slide.caption || item.title} width={1200} height={1200} />
                {slide.caption && <figcaption>{slide.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {externalUrl && <a href={externalUrl} target="_blank" rel="noreferrer" className={styles.external}>{t.open}<span>↗</span></a>}
      </div>
      )}
    </article>
  )
}
