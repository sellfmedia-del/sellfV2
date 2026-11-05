import Image from 'next/image'
import Link from 'next/link'
import type {NetworkPartner, PartnerFaq, PartnerLocale} from '@/lib/partners-types'
import {partnersCopy} from '@/data/PartnersContent'
import styles from './partners.module.css'

export function PartnerIcon({kind = 0}: {kind?: number}) {
  const paths = [
    <g key="cart"><path d="M3 4h3l3 13h11l3-10H7M10 21h.01M20 21h.01"/><path d="M12 4V1m-3 2 3-2 3 2"/></g>,
    <g key="link"><path d="m10 15 5-5m-6-1 3-3a5 5 0 0 1 7 7l-3 3M15 18l-3 3a5 5 0 0 1-7-7l3-3"/></g>,
    <g key="layers"><path d="m12 2 10 6-10 6L2 8l10-6Zm-10 12 10 6 10-6M2 19l10 6 10-6"/></g>,
    <g key="flag"><path d="M5 25V3m0 1c5-5 10 5 16 0v12c-6 5-11-5-16 0"/></g>,
    <g key="people"><circle cx="10" cy="8" r="4"/><path d="M2 24v-3a8 8 0 0 1 16 0v3M20 4a4 4 0 0 1 0 8m2 5a7 7 0 0 1 4 7"/></g>,
    <g key="tag"><path d="M3 3h11l11 11-11 11L3 14V3Z"/><circle cx="9" cy="9" r="1"/></g>,
  ]
  return <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind % paths.length]}</svg>
}

export function PartnerLogo({partner, compact = false}: {partner: NetworkPartner; compact?: boolean}) {
  if (partner.logo) return <span className={`${styles.uploadedLogo} ${compact ? styles.compactLogo : ''}`}><Image src={partner.logo} alt={partner.name} fill sizes={compact ? '140px' : '(max-width: 600px) 70vw, 300px'} className={styles.logoImage}/></span>
  if (!partner.demoMark) return <span className={styles.initialLogo}>{partner.name.slice(0, 2).toLocaleUpperCase()}</span>
  const marks = {
    atlas: <><path fill="#1f5f9f" d="M4 48 25 5h11L15 48Z"/><path fill="#6ea7d5" d="m28 5 22 43H37L22 19Z"/><path fill="#103f74" d="m23 31 14 5-7 12-15-6Z"/></>,
    rota: <><path fill="#1f5f9f" d="m4 39 29-29h9L13 39Zm14 9 29-29h9L27 48Z"/><path fill="#6ea7d5" d="M1 48 39 10h8L9 48Z"/></>,
    forma: <><path fill="#1f5f9f" d="m9 12 38-7-4 12-22 4v11H9Z"/><path fill="#6ea7d5" d="m9 31 24-4-3 12-9 2v12H9Z"/></>,
    nexa: <><path fill="#6ea7d5" d="m8 9 7-5 36 36-7 7Z"/><path fill="#1f5f9f" d="M8 17h10v32H8Zm33-9h10v25L41 23Z"/></>,
    pusula: <><path fill="#1f5f9f" d="m29 0 6 21 22 7-22 6-6 22-6-22L1 28l22-7Z"/><path fill="#6ea7d5" d="m29 8 3 18 17 2-17 3-3 18-3-18-17-3 17-2Z"/></>,
    kopru: <><path d="M4 43a25 25 0 0 1 50 0M10 43a19 19 0 0 1 38 0M16 43a13 13 0 0 1 26 0" stroke="#1f5f9f" fill="none" strokeWidth="3.6"/></>,
  }
  const [first, ...rest] = partner.name.split(' ')
  return <span className={`${styles.logoLockup} ${compact ? styles.logoCompact : ''}`} aria-label={partner.name}>
    <svg viewBox="0 0 58 58" aria-hidden="true">{marks[partner.demoMark]}</svg>
    <span><strong>{first.toLocaleUpperCase('tr-TR')}</strong><small>{rest.join(' ').toLocaleUpperCase('tr-TR')}</small></span>
  </span>
}

export function PartnerCard({partner, hasOffer = false, lang, small = false}: {partner: NetworkPartner; hasOffer?: boolean; lang: PartnerLocale; small?: boolean}) {
  const t = partnersCopy[lang]
  return <article className={`${styles.partnerCard} ${small ? styles.smallPartner : ''}`}>
    <Link href={`/${lang}/partners/${partner.slug}`} className={styles.logoPanel} aria-label={`${t.viewPartner}: ${partner.name}`}><PartnerLogo partner={partner}/></Link>
    <div className={styles.partnerCardCopy}>
      <p className={styles.categoryLabel}>{partner.categories.map((category) => t.categories[category]).filter(Boolean).join(' · ')}</p>
      <h3><Link href={`/${lang}/partners/${partner.slug}`}>{partner.name}</Link></h3>
      {partner.summary ? <p>{partner.summary}</p> : null}
      <div className={styles.cardBottom}><span className={hasOffer ? styles.offerBadge : styles.quietBadge}>{hasOffer ? (partner.demo ? t.exampleOfferAvailable : t.offerAvailable) : t.introAvailable}</span><Link href={`/${lang}/partners/${partner.slug}`} className={styles.textLink}>{t.viewPartner}<span aria-hidden="true">↗︎</span></Link></div>
    </div>
  </article>
}

export function PartnerFaqs({items, title}: {items: readonly PartnerFaq[]; title: string}) {
  if (!items.length) return null
  return <section className={styles.faqSection} id="faqs"><div className={styles.wrap}><div className={styles.faqLayout}><h2>{title}</h2><div className={styles.accordions}>{items.map((faq, index) => <details key={`${faq.question}-${index}`} open={index === 0}><summary>{faq.question}<span className={styles.faqPlus} aria-hidden="true"/></summary><p>{faq.answer}</p></details>)}</div></div></div></section>
}

export function PreviewNotice({lang}: {lang: PartnerLocale}) {
  return <div className={styles.previewNotice}>{partnersCopy[lang].preview}</div>
}
