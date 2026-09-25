import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {engageHref, getEngagePageData, type EngageCard, type EngageLocale} from '@/sanity/lib/engage'
import styles from './engage.module.css'

export const dynamic = 'force-dynamic'

type PageProps = {params: Promise<{lang: string}>}
type DisplayItem = {id: string; title: string; summary?: string; image: string; href: string; label: string; meta?: string; author?: string}

const copy = {
  tr: {
    strap: 'Bilgi  /  İnsan  /  Tool  /  Daha güçlü bir yarın',
    heroTitle: 'Büyümenin ortak bir pratiğe dönüştüğü yer.',
    heroSummary: 'Büyümeyi inşa eden insanlar tarafından oluşturulan framework’ler, konuşmalar, tool’lar ve canlı deneyimler.',
    explore: 'Engage’i Keşfet', upcomingCta: 'Yaklaşanları Gör', reserve: 'Yerini Ayır', heroLabel: 'Öne Çıkan Webinar', heroQuestion: 'Daha iyi sorular. Daha cesur büyüme.',
    stats: [['100+', 'Uzman oturumu'], ['50+', 'Pratik tool'], ['10K+', 'Operatör & lider']],
    chooseEyebrow: 'Engage’i Keşfet', chooseTitle: 'Nasıl dahil olacağını seç.', chooseNote: 'Farklı formatlar. Ortak bir amaç. Gerçek dünyada büyüme.',
    formats: [
      ['İZLE', 'Podcast görünümlü Reels, YouTube bölümleri ve webinar kayıtları.', 'BÜYÜME KONUŞMALARI'],
      ['KATIL', 'Webinarlar, eventler ve özel oturumlar.', 'CANLI DENEYİMLER'],
      ['TOOL’LAR', 'Ölçüm araçları, hesaplayıcılar ve Sellf uygulamaları.', 'PRATİK TOOL’LAR'],
      ['OKU', 'Framework’ler, vakalar ve operatör notları.', 'OPERATÖR BİLGİSİ'],
    ],
    webinarEyebrow: 'Webinarlar', webinarTitle: 'Yaklaşan canlı yayınlar.', allWebinars: 'Tüm webinarlar', register: 'Kayıt Ol',
    eventEyebrow: 'Eventler & Fuarlar', eventTitle: 'Büyümenin konuşulduğu yerlerdeyiz.', allEvents: 'Tüm eventler',
    toolsEyebrow: 'Gerçek kararlar için tool’lar', toolsTitle: 'Framework’ü sadece okuma. Kullan.', toolsNote: 'Teşhis etmenize, planlamanıza ve daha akıllı büyüme kararları almanıza yardımcı olan interaktif tool’lar.', allTools: 'Tüm tool’lar',
    latestEyebrow: 'Showcase & Insight', latestTitle: 'En yeni & istediğin anda.', allContent: 'Tümü',
    closeEyebrow: 'Birlikte İnşa Edelim', closeTitle: 'Büyüme kapalı kapılar ardında gerçekleşmemeli.', closeSummary: 'Bir sonraki oturuma katılın, düşünce biçiminizi sınayın veya incelemeye değer bir problemi birlikte ele alalım.', attend: 'Bir Evente Katıl', work: 'Sellf ile Çalış',
  },
  en: {
    strap: 'Knowledge  /  People  /  Tools  /  A stronger tomorrow',
    heroTitle: 'Where Growth Becomes a Shared Practice.',
    heroSummary: 'Frameworks, conversations, tools and live experiences created by the people who build growth—not merely talk about it.',
    explore: 'Explore Engage', upcomingCta: 'View Upcoming Events', reserve: 'Reserve Your Seat', heroLabel: 'Featured Webinar', heroQuestion: 'Better questions. Braver growth.',
    stats: [['100+', 'Expert sessions'], ['50+', 'Practical tools'], ['10K+', 'Operators & leaders']],
    chooseEyebrow: 'Explore Engage', chooseTitle: 'Choose how you engage.', chooseNote: 'Different formats. A common purpose. Real-world growth.',
    formats: [
      ['WATCH', 'Podcast-style Reels, YouTube episodes and webinar recordings.', 'GROWTH CONVERSATIONS'],
      ['ATTEND', 'Webinars, events and private sessions.', 'LIVE EXPERIENCES'],
      ['TOOLS', 'Assessments, calculators and Sellf applications.', 'PRACTICAL TOOLS'],
      ['READ', 'Frameworks, case studies and operator notes.', 'OPERATOR KNOWLEDGE'],
    ],
    webinarEyebrow: 'Webinars', webinarTitle: 'Upcoming live.', allWebinars: 'View all webinars', register: 'Register',
    eventEyebrow: 'Events & Exhibitions', eventTitle: 'Where growth is being discussed.', allEvents: 'View all events',
    toolsEyebrow: 'Tools for real-world decisions', toolsTitle: 'Don’t just read the framework. Use it.', toolsNote: 'Interactive tools to help you diagnose, plan and make smarter growth decisions.', allTools: 'Explore all tools',
    latestEyebrow: 'Showcases & Insights', latestTitle: 'Latest & on demand.', allContent: 'All content',
    closeEyebrow: 'Let’s Build Together', closeTitle: 'Growth should not happen behind closed doors.', closeSummary: 'Join the next session, challenge the thinking or bring us a problem worth examining.', attend: 'Attend an Event', work: 'Work With Sellf',
  },
} as const

const images = {
  hero: '/images/about-team.webp', watch: 'https://cdn.sellfmedia.workers.dev/statics/video-screnshot.png', attend: '/images/about-team.webp', tools: '/framework/rgi/hero.webp', read: '/images/showcases/leal-dethleffs.webp', event: '/framework/rgi/output-exact.svg',
  one: '/images/framework/operating-model/growth.jpg', two: '/images/framework/operating-model/operations.jpg', three: '/images/framework/operating-model/integrated.jpg', showcase: '/images/showcases/leal-dethleffs.webp',
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {lang: rawLang} = await params
  const lang: EngageLocale = rawLang === 'en' ? 'en' : 'tr'
  const isEn = lang === 'en'
  const {settings} = await getEngagePageData(lang)
  const fallbackTitle = isEn ? 'Sellf Engage | Webinars, Insights & Growth Tools' : 'Sellf Engage | Webinar, Insight ve Büyüme Toolları'
  const fallbackDescription = isEn ? 'Explore Sellf webinars, events, showcases, insights and practical growth tools.' : 'Sellf webinarlarını, eventlerini, showcase ve insight içeriklerini ve büyüme tool’larını keşfedin.'
  return {
    title: settings?.seo?.title || fallbackTitle,
    description: settings?.seo?.description || fallbackDescription,
    robots: settings?.seo?.noIndex ? {index: false, follow: false} : undefined,
    openGraph: settings?.seo?.image ? {images: [{url: settings.seo.image}]} : undefined,
    alternates: {canonical: `https://www.sellfmedia.com/${lang}/engage`, languages: {tr: 'https://www.sellfmedia.com/tr/engage', en: 'https://www.sellfmedia.com/en/engage', 'x-default': 'https://www.sellfmedia.com/tr/engage'}},
  }
}

function formatDate(value: string | undefined, lang: EngageLocale, precision: EngageCard['datePrecision'] = 'day') {
  if (!value) return lang === 'tr' ? 'Yakında' : 'Coming soon'
  if (precision === 'month') {
    return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {month: 'long', year: 'numeric', timeZone: 'Europe/Istanbul'}).format(new Date(value))
  }
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul'}).format(new Date(value))
}

function fromCms(item: EngageCard, lang: EngageLocale, image: string, label: string): DisplayItem {
  return {id: item._id, title: item.title, summary: item.summary, image: item.coverImage || image, href: engageHref(lang, item), label, meta: formatDate(item.date, lang, item.datePrecision), author: item.author}
}

function ArrowLink({href, children, light = false}: {href: string; children: React.ReactNode; light?: boolean}) {
  return <Link href={href} className={`${styles.textLink} ${light ? styles.textLinkLight : ''}`}>{children}<span>→</span></Link>
}

function CardImage({src, alt, sizes}: {src: string; alt: string; sizes: string}) {
  return <Image src={src} alt={alt} fill sizes={sizes} className={styles.coverImage} />
}

function EventCard({item, featured = false, register}: {item: DisplayItem; featured?: boolean; register: string}) {
  return <Link href={item.href} className={`${styles.eventCard} ${featured ? styles.eventCardFeatured : ''}`}>
    <CardImage src={item.image} alt={item.title} sizes={featured ? '(max-width: 900px) 100vw, 52vw' : '(max-width: 900px) 100vw, 24vw'} /><div className={styles.eventShade} />
    <div className={styles.eventContent}><span className={styles.pill}>{item.label}</span><h3>{item.title}</h3><p className={styles.eventMeta}>▣&nbsp;&nbsp;{item.meta}</p><div className={styles.eventFooter}><div><span className={styles.avatarDot} />{item.author || 'Sellf Media'}</div><span className={styles.registerButton}>{register}<b>→</b></span></div></div>
  </Link>
}

function OperatorCard({item, index}: {item: DisplayItem; index: number}) {
  const media = index === 0 || index === 3
  return <Link href={item.href} className={`${styles.operatorCard} ${media ? styles.operatorCardMedia : ''}`}>
    {media && <CardImage src={item.image} alt={item.title} sizes="(max-width: 760px) 80vw, 28vw" />}<div className={styles.operatorShade} />
    <div className={styles.operatorContent}><span>{item.label}</span><h3>{item.title}</h3>{item.summary && <p>{item.summary}</p>}<small>{item.author || 'Sellf Media'}</small></div>{media && <i className={styles.playSmall}>▶</i>}
  </Link>
}

function ToolVisual({index}: {index: number}) {
  if (index === 0) return <div className={styles.barChart}>{[34, 50, 42, 68, 81].map((height, i) => <i key={height} style={{height: `${height}%`, opacity: .45 + i * .12}} />)}</div>
  if (index === 1) return <div className={styles.scoreRing}><strong>72</strong></div>
  if (index === 2) return <div className={styles.lineChart}><b>+42%</b></div>
  if (index === 3) return <div className={styles.nodes}>{[0, 1, 2, 3, 4, 5].map((node) => <i key={node} />)}</div>
  return <div className={styles.radar}><i /><i /><i /></div>
}

export default async function EngagePage({params}: PageProps) {
  const {lang: rawLang} = await params
  const lang: EngageLocale = rawLang === 'en' ? 'en' : 'tr'
  const data = await getEngagePageData(lang)
  const fallback = copy[lang]
  const settings = data.settings
  const cmsFormats = settings?.formats || []
  const t = {
    ...fallback,
    strap: settings?.heroEyebrow || fallback.strap,
    heroTitle: settings?.heroTitle || fallback.heroTitle,
    heroSummary: settings?.heroSummary || fallback.heroSummary,
    explore: settings?.heroExploreCta || fallback.explore,
    upcomingCta: settings?.heroUpcomingCta || fallback.upcomingCta,
    reserve: settings?.heroReserveCta || fallback.reserve,
    heroLabel: settings?.heroFeaturedLabel || fallback.heroLabel,
    heroQuestion: settings?.heroQuestion || fallback.heroQuestion,
    stats: settings?.stats?.length
      ? settings.stats.map((stat, index) => [stat.value || fallback.stats[index]?.[0] || '', stat.label || fallback.stats[index]?.[1] || ''] as const)
      : fallback.stats,
    chooseEyebrow: settings?.formatsEyebrow || fallback.chooseEyebrow,
    chooseTitle: settings?.formatsTitle || fallback.chooseTitle,
    chooseNote: settings?.formatsNote || fallback.chooseNote,
    formats: fallback.formats.map((format, index) => [
      cmsFormats[index]?.title || format[0],
      cmsFormats[index]?.description || format[1],
      cmsFormats[index]?.tag || format[2],
    ] as const),
    webinarEyebrow: settings?.webinarsEyebrow || fallback.webinarEyebrow,
    webinarTitle: settings?.webinarsTitle || fallback.webinarTitle,
    allWebinars: settings?.allWebinarsCta || fallback.allWebinars,
    register: settings?.registerCta || fallback.register,
    eventEyebrow: settings?.eventsEyebrow || fallback.eventEyebrow,
    eventTitle: settings?.eventsTitle || fallback.eventTitle,
    allEvents: settings?.allEventsCta || fallback.allEvents,
    toolsEyebrow: settings?.toolsEyebrow || fallback.toolsEyebrow,
    toolsTitle: settings?.toolsTitle || fallback.toolsTitle,
    toolsNote: settings?.toolsNote || fallback.toolsNote,
    allTools: settings?.allToolsCta || fallback.allTools,
    latestEyebrow: settings?.contentEyebrow || fallback.latestEyebrow,
    latestTitle: settings?.contentTitle || fallback.latestTitle,
    allContent: settings?.allContentCta || fallback.allContent,
    closeEyebrow: settings?.closingEyebrow || fallback.closeEyebrow,
    closeTitle: settings?.closingTitle || fallback.closeTitle,
    closeSummary: settings?.closingSummary || fallback.closeSummary,
    attend: settings?.closingAttendCta || fallback.attend,
    work: settings?.closingWorkCta || fallback.work,
  }

  const webinarSeeds: DisplayItem[] = [
    {id: 'w1', title: lang === 'tr' ? 'ROAS’ın Ötesi: Gerçek Katkıyı Ölçmek' : 'Beyond ROAS: Measuring Actual Contribution', image: images.event, href: '#webinars', label: lang === 'tr' ? 'Öne Çıkan' : 'Featured event', meta: '24 September · 15:00 GMT+3', author: 'Sellf Growth Team'},
    {id: 'w2', title: lang === 'tr' ? 'AI Görünürlüğü: Markaların Kaçırdığı Şey' : 'AI Visibility: What Brands Are Missing', image: images.one, href: '#webinars', label: 'Webinar', meta: '10 October · 15:00 GMT+3', author: 'Performance Lead'},
    {id: 'w3', title: lang === 'tr' ? 'Ölçeklenen Büyüme Sistemleri Kurmak' : 'Building Growth Systems That Scale', image: images.two, href: '#webinars', label: 'Webinar', meta: '7 November · 15:00 GMT+3', author: 'Sellf Media'},
  ]
  const webinarItems = data.upcomingWebinars.length ? data.upcomingWebinars.slice(0, 3).map((item, index) => fromCms(item, lang, [images.event, images.one, images.two][index], index === 0 ? t.heroLabel : 'Webinar')) : webinarSeeds

  const eventSeeds: DisplayItem[] = [
    {id: 'e1', title: lang === 'tr' ? 'İnşa Ettiğimiz Sistemlerin İçinde' : 'Inside the Systems We Build', summary: '“Good systems create freedom.”', image: images.one, href: '#events', label: 'DEVELOPER', author: 'Sellf Tech'},
    {id: 'e2', title: lang === 'tr' ? 'Attribution Problemi' : 'The Attribution Problem', summary: '“It’s more nuanced than last-click.”', image: images.three, href: '#events', label: 'PERFORMANCE LEAD', author: 'Sellf Growth'},
    {id: 'e3', title: lang === 'tr' ? 'Marka İçeriğini Değerli Kılan Şey' : 'What Makes Brand Content Travel', summary: '“Cultural context beats perfect production.”', image: images.two, href: '#events', label: 'SOCIAL LEAD', author: 'Sellf Social'},
    {id: 'e4', title: lang === 'tr' ? 'Bir Operasyon Modeli Olarak Büyüme' : 'Growth Is an Operating Model', summary: 'Büyüme, pazarlamadan daha derin bir bakış ister.', image: images.hero, href: '#events', label: 'FOUNDER', author: 'Sellf Media'},
  ]
  const eventItems = data.events.length ? data.events.slice(0, 4).map((item, index) => fromCms(item, lang, eventSeeds[index]?.image || images.hero, item.eventType || 'EVENT')) : eventSeeds

  const toolSeeds: DisplayItem[] = [
    {id: 't1', title: 'Growth Simulator', summary: lang === 'tr' ? 'Büyüme senaryonun ciro, EBITDA ve ROI etkisini canlı modelle.' : 'Model the revenue, EBITDA and ROI impact of your growth scenario.', image: images.tools, href: `/${lang}/engage/tools/growth-simulator`, label: 'SIMULATOR'},
    {id: 't2', title: 'Report Audit', summary: lang === 'tr' ? 'Raporunun doğru metriklerle doğru kararı destekleyip desteklemediğini gör.' : 'See whether your report supports the right decision with the right metrics.', image: images.tools, href: `/${lang}/engage/tools/report-audit`, label: 'AUDIT'},
    {id: 't3', title: 'Sellf Surface', summary: lang === 'tr' ? 'Dijital varlıklarındaki büyüme sızıntılarını kanıtlarıyla gör.' : 'Find evidence-backed growth leaks across your digital assets.', image: images.tools, href: `/${lang}/engage/tools/sellf-surface`, label: 'AUDIT ENGINE'},
    {id: 't4', title: 'Sellf MarketFit', summary: lang === 'tr' ? 'Pazar fiyatı, birim ekonomi ve satış hedefini tek kararda birleştir.' : 'Combine market pricing, unit economics and sales targets in one decision.', image: images.tools, href: `/${lang}/engage/tools/sellf-marketfit`, label: 'PRICING SYSTEM'},
    {id: 't5', title: 'Sellf Route', summary: lang === 'tr' ? 'İhtiyacın olan operasyonları doğru sırayla belirle.' : 'Identify the operations you need—in the right order.', image: images.tools, href: `/${lang}/engage/tools/sellf-route`, label: 'OPERATIONS SELECTOR'},
    {id: 't6', title: 'SellfScale', summary: lang === 'tr' ? 'Büyüme sistemini uçtan uca haritala.' : 'Map your growth system from end to end.', image: images.tools, href: '#tools', label: 'SELLF PRODUCT'},
    {id: 't7', title: 'SellfCompete', summary: lang === 'tr' ? 'Nerede olduğunu ve sıradaki hamleni gör.' : 'See where you stand and where to move next.', image: images.tools, href: '#tools', label: 'SELLF PRODUCT'},
  ]
  const remainingToolItems = data.tools.length
    ? data.tools.slice(0, 4).map((item, index) => fromCms(item, lang, images.tools, toolSeeds[index + 1]?.label || 'TOOL'))
    : toolSeeds.slice(1)
  const toolItems = [toolSeeds[0], ...remainingToolItems].slice(0, 5)

  const contentSeeds: DisplayItem[] = [
    {id: 'c1', title: 'Early Mover, or Just an Undefined Bet?', image: images.hero, href: '#latest', label: 'VIDEO', author: 'Sellf Media'},
    {id: 'c2', title: 'The Foundation Audit', image: images.read, href: '#latest', label: 'FRAMEWORK', author: 'Growth Strategy'},
    {id: 'c3', title: lang === 'tr' ? 'AI Görünürlüğü Aramayı Nasıl Değiştiriyor?' : 'Why AI Visibility Changes Search', image: images.tools, href: '#latest', label: 'WEBINAR', author: 'Performance Team'},
    {id: 'c4', title: 'Cracker Barrel: When Brand Change Breaks Trust', image: images.showcase, href: '#latest', label: 'CASE STUDY', author: 'Sellf Media'},
    {id: 'c5', title: 'Distribution Beats Perfection', image: images.watch, href: '#latest', label: 'OPERATOR NOTE', author: 'Social Team'},
    {id: 'c6', title: 'From Campaigns to Compounding', image: images.event, href: '#latest', label: 'VIDEO', author: 'Sellf Growth'},
  ]
  const contentItems = data.content.length ? data.content.slice(0, 6).map((item, index) => fromCms(item, lang, contentSeeds[index]?.image || images.hero, item.contentType || 'INSIGHT')) : contentSeeds

  const featured = data.featured
  const featuredTitle = featured?.title || (lang === 'tr' ? 'ROAS Neden Size Hikâyenin Tamamını Anlatmıyor?' : 'Why Your ROAS Is Lying to You')
  const featuredSummary = featured?.summary || (lang === 'tr' ? 'Ölçümün büyüme kararlarını nasıl değiştirdiğini birlikte inceleyelim.' : 'A closer look at how measurement changes growth decisions.')
  const featuredHref = featured ? engageHref(lang, featured) : '#webinars'
  const featuredImage = featured?.coverImage || images.hero
  const featuredMeta = formatDate(featured?.date, lang)

  return <div className={styles.page}>
    <section className={styles.hero}><div className={styles.heroOrb} /><div className={`sellf-container ${styles.heroGrid}`}>
      <div className={styles.heroCopy}><span className={styles.eyebrow}>{t.strap}</span><h1>{t.heroTitle}</h1><p>{t.heroSummary}</p><div className={styles.heroActions}><Link href="#formats" className={styles.primaryButton}>{t.explore}<span>→</span></Link><Link href="#webinars" className={styles.secondaryButton}>{t.upcomingCta}</Link></div><div className={styles.metrics}>{t.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
      <div className={styles.featureWrap}><Link href={featuredHref} className={styles.featureCard}><CardImage src={featuredImage} alt={featuredTitle} sizes="(max-width: 900px) 100vw, 52vw" /><div className={styles.featureShade} /><div className={styles.featureCopy}><span className={styles.featureLabel}>{t.heroLabel}</span><h2>{featuredTitle}</h2><p>{featuredSummary}</p><small>{featuredMeta}</small><span className={styles.primaryButton}>{t.reserve}<b>→</b></span></div><i className={styles.playButton}>▶</i><div className={styles.progress}><i /></div></Link><div className={styles.featureCaption}><span>{t.heroQuestion}</span><div>● ○ ○ ○ &nbsp; →</div></div></div>
    </div></section>

    <section className={`${styles.whiteSection} ${styles.curveTop}`} id="formats"><div className="sellf-container"><div className={styles.sectionIntro}><div><span className={styles.eyebrowDark}>{t.chooseEyebrow}</span><h2>{t.chooseTitle}</h2></div><p>{t.chooseNote}</p></div><div className={styles.formatGrid}>{t.formats.map(([title, description, tag], index) => { const formatImages = [images.watch, images.attend, images.tools, images.read]; const formatHrefs = [`/${lang}/engage/content?filter=insights`, `/${lang}/engage/webinars`, `/${lang}/engage/tools`, `/${lang}/engage/content`]; return <Link href={formatHrefs[index]} key={title} className={styles.formatCard}><div className={styles.formatHead}><h3>{title}<span> →</span></h3><i>→</i></div><p>{description}</p><div className={styles.formatMedia}><CardImage src={formatImages[index]} alt="" sizes="(max-width: 760px) 80vw, 25vw" /><span>{tag}</span></div></Link>})}</div></div></section>

    <section className={`${styles.darkSection} ${styles.curveDark}`} id="webinars"><div className="sellf-container"><div className={styles.darkHeading}><div><span>{t.webinarEyebrow}</span><h2>{t.webinarTitle}</h2></div><ArrowLink href={`/${lang}/engage/webinars`} light>{t.allWebinars}</ArrowLink></div><div className={styles.eventGrid}>{webinarItems.map((item, index) => <EventCard key={item.id} item={item} featured={index === 0} register={t.register} />)}</div></div></section>

    <section className={`${styles.whiteSection} ${styles.eventsSection}`} id="events"><div className="sellf-container"><div className={styles.lightHeading}><div><span>{t.eventEyebrow}</span><h2>{t.eventTitle}</h2></div><ArrowLink href={`/${lang}/engage/events`}>{t.allEvents}</ArrowLink></div><div className={styles.operatorGrid}>{eventItems.map((item, index) => <OperatorCard key={item.id} item={item} index={index} />)}</div></div></section>

    <section className={`${styles.toolsSection} ${styles.curveBlue}`} id="tools"><div className="sellf-container"><div className={styles.toolsHeading}><div><span>{t.toolsEyebrow}</span><h2>{t.toolsTitle}</h2></div><p>{t.toolsNote}</p><ArrowLink href={`/${lang}/engage/tools`} light>{t.allTools}</ArrowLink></div><div className={styles.toolsGrid}>{toolItems.map((item, index) => <Link href={item.href.startsWith('/') ? item.href : `/${lang}/engage/tools`} key={item.id} className={styles.toolCard}><h3>{item.title}<span>→</span></h3><ToolVisual index={index} /><p>{item.summary}</p></Link>)}</div></div></section>

    <section className={`${styles.whiteSection} ${styles.latestSection}`} id="latest"><div className="sellf-container"><div className={styles.latestHeading}><div><span>{t.latestEyebrow}</span><h2>{t.latestTitle}</h2></div><Link href={`/${lang}/engage/content`} className={styles.filterPill}>{t.allContent}<span aria-hidden="true"> →</span></Link></div><div className={styles.latestGrid}>{contentItems.map((item) => <Link href={item.href} key={item.id} className={styles.latestCard}><div className={styles.latestMedia}><CardImage src={item.image} alt={item.title} sizes="(max-width: 760px) 80vw, 17vw" /><span>{item.label}</span></div><h3>{item.title}</h3><p><span className={styles.avatarDot} />{item.author}</p></Link>)}</div></div></section>

    <section className={`${styles.closing} ${styles.curveClosing}`}><CardImage src={images.hero} alt="" sizes="100vw" /><div className={styles.closingShade} /><div className={`sellf-container ${styles.closingInner}`}><span>{t.closeEyebrow}</span><h2>{t.closeTitle}</h2><p>{t.closeSummary}</p><div><Link href="#webinars" className={styles.primaryButton}>{t.attend}<span>→</span></Link><Link href={`/${lang}/contact`} className={styles.secondaryButton}>{t.work}<span>→</span></Link></div><footer className={styles.engageFooter}><strong>sellf.</strong><nav><Link href={`/${lang}/services`}>Services</Link><Link href={`/${lang}/portfolio`}>Work</Link><Link href={`/${lang}/about`}>About</Link><Link href={`/${lang}/engage`}>Engage</Link></nav><small>© 2026 Sellf Media</small></footer></div></section>
  </div>
}
