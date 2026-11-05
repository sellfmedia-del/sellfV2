'use client'

import {useState} from 'react'
import Link from 'next/link'
import type {PartnerCategory, PartnerLocale, PartnersData} from '@/lib/partners-types'
import {partnerCategories} from '@/lib/partners-types'
import {normalizePartnerSearch} from '@/lib/partners-utils'
import {partnersCopy} from '@/data/PartnersContent'
import {PartnerCard, PartnerFaqs, PartnerIcon, PartnerLogo, PreviewNotice} from './PartnersUi'
import {PartnerRequestButton} from './PartnerRequests'
import styles from './partners.module.css'

export default function PartnersHome({lang, data}: {lang: PartnerLocale; data: PartnersData}) {
  const t = partnersCopy[lang]
  const s = data.settings
  const [category, setCategory] = useState<PartnerCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const normalized = normalizePartnerSearch(search)
  const visiblePartners = data.partners.filter((partner) => (category === 'all' || partner.categories.includes(category)) && normalizePartnerSearch([partner.name, partner.summary, ...partner.categories.map((item) => t.categories[item]), ...(partner.services || []).map((item) => item.title)].filter(Boolean).join(' ')).includes(normalized))
  const featuredPartners = data.partners.filter((partner) => partner.featured).slice(0, 6)
  const heroPartners = featuredPartners.length ? featuredPartners : data.partners.slice(0, 6)
  const offers = data.campaigns.filter((offer) => offer.featured !== false).slice(0, 3)
  const partnersWithOffers = new Set(data.campaigns.map((offer) => offer.partnerId))

  return <div className={styles.page}>
    {data.demo ? <PreviewNotice lang={lang}/> : null}
    <section className={styles.hero}><div className={`${styles.wrap} ${styles.heroGrid}`}>
      <div className={styles.heroCopy}><p className={styles.eyebrow}>{s?.heroEyebrow || t.eyebrow}</p><h1>{s?.heroTitle || t.heroTitle}</h1><p className={styles.heroSummary}>{s?.heroSummary || t.heroSummary}</p><div className={styles.heroActions}><a href="#partners" className={styles.button}>{t.explore}<span aria-hidden="true">↗︎</span></a><PartnerRequestButton className={styles.quietButton}>{t.introduce}</PartnerRequestButton></div><p className={styles.heroNote}>{s?.heroNote || t.heroNote}</p></div>
      <div className={styles.heroVisual}><div className={styles.floatingLogos}>{heroPartners.map((partner) => <Link key={partner._id} href={`/${lang}/partners/${partner.slug}`} className={styles.floatingLogo} aria-label={`${t.viewPartner}: ${partner.name}`}><PartnerLogo partner={partner} compact/></Link>)}{!heroPartners.length ? <div className={styles.emptyHero}><PartnerIcon kind={4}/><span>{t.emptyTitle}</span></div> : null}</div><p>{t.heroCaption}</p></div>
    </div></section>

    {offers.length ? <section className={styles.offersSection} aria-labelledby="advantages-title"><div className={styles.wrap}><div className={styles.sectionHeading}><h2 id="advantages-title">{s?.advantagesTitle || t.advantagesTitle}</h2><p>{s?.advantagesSummary || t.advantagesSummary}</p></div><div className={styles.offersGrid}>{offers.map((offer) => {
      const partner = data.partners.find((item) => item._id === offer.partnerId)!
      return <article className={styles.offerCard} key={offer._id}><div className={styles.offerCardTop}><PartnerLogo partner={partner} compact/><span>{offer.demo ? t.exampleOffer : t.exclusive}</span></div><h3>{offer.title}</h3>{offer.summary ? <p>{offer.summary}</p> : null}<Link href={`/${lang}/partners/${partner.slug}#offer-${offer._id}`} className={styles.textLink}>{t.conditions}<span aria-hidden="true">↗︎</span></Link></article>
    })}</div></div></section> : null}

    <section className={styles.directory} id="partners" aria-labelledby="directory-title"><div className={styles.wrap}><div className={styles.sectionHeading}><h2 id="directory-title">{s?.directoryTitle || t.directoryTitle}</h2><p>{s?.directorySummary || t.directorySummary}</p></div>
      {data.partners.length ? <><div className={styles.searchRow}><label className={styles.selectLabel}><span className={styles.srOnly}>{t.allCategories}</span><select value={category} onChange={(event) => setCategory(event.target.value as PartnerCategory | 'all')}><option value="all">{t.allCategories}</option>{partnerCategories.map((item) => <option key={item} value={item}>{t.categories[item]}</option>)}</select></label><label className={styles.searchLabel}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><span className={styles.srOnly}>{t.search}</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.search}/></label></div><div className={styles.filtersRow}><div className={styles.filterChips} role="group" aria-label={t.allCategories}><button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')}>{t.all}</button>{partnerCategories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{t.categories[item]}</button>)}</div><p aria-live="polite">{visiblePartners.length} {data.demo ? t.exampleCount : t.partnerCount}</p></div><div className={styles.partnerGrid}>{visiblePartners.map((partner) => <PartnerCard partner={partner} hasOffer={partnersWithOffers.has(partner._id)} lang={lang} key={partner._id}/>)}</div>{!visiblePartners.length ? <div className={styles.emptyState}><p>{t.noResults}</p><button type="button" className={styles.textLink} onClick={() => {setCategory('all'); setSearch('')}}>{t.reset} →</button></div> : null}</> : <div className={styles.emptyState}><h3>{t.emptyTitle}</h3><p>{t.emptySummary}</p><PartnerRequestButton>{t.shareNeed}</PartnerRequestButton></div>}
      {data.demo ? <p className={styles.demoFootnote}>{t.demoFootnote}</p> : null}
    </div></section>

    <section className={styles.matching}><div className={`${styles.wrap} ${styles.matchingGrid}`}><div><h2>{s?.matchingTitle || t.matchingTitle}</h2><p>{s?.matchingSummary || t.matchingSummary}</p><PartnerRequestButton>{t.shareNeed}</PartnerRequestButton></div><ol className={styles.steps}>{t.steps.map((step, index) => <li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></div></section>
    <section className={styles.joinSection}><div className={`${styles.wrap} ${styles.joinGrid}`}><div><p className={styles.eyebrow}>REFERRAL PROGRAM</p><h2>{s?.joinTitle || t.joinTitle}</h2><p>{s?.joinSummary || t.joinSummary}</p><PartnerRequestButton kind="join" className={styles.whiteButton}>{t.join}</PartnerRequestButton></div><div className={styles.pillars}>{t.pillars.map((pillar, index) => <div key={pillar.title}><PartnerIcon kind={[4, 2, 5][index]}/><div><h3>{pillar.title}</h3><p>{pillar.description}</p></div></div>)}</div></div></section>
    <PartnerFaqs items={s?.faqs?.length ? s.faqs : t.faqs} title={t.faqTitle}/>
  </div>
}
