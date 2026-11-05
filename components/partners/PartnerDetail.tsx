import Image from 'next/image'
import Link from 'next/link'
import type {NetworkPartner, PartnerLocale, PartnersData} from '@/lib/partners-types'
import {partnersCopy} from '@/data/PartnersContent'
import {safePartnerUrl} from '@/lib/partners-utils'
import {PartnerCard, PartnerFaqs, PartnerIcon, PartnerLogo, PreviewNotice} from './PartnersUi'
import {PartnerRequestButton} from './PartnerRequests'
import styles from './partners.module.css'

export default function PartnerDetail({lang, partner, data}: {lang: PartnerLocale; partner: NetworkPartner; data: PartnersData}) {
  const t = partnersCopy[lang]
  const offers = data.campaigns.filter((offer) => offer.partnerId === partner._id)
  const website = safePartnerUrl(partner.website)
  const related = data.partners.filter((item) => item._id !== partner._id).sort((a, b) => Number(b.categories.some((category) => partner.categories.includes(category))) - Number(a.categories.some((category) => partner.categories.includes(category)))).slice(0, 2)
  const metadata = [[t.region, partner.region], [t.languages, partner.languages], [t.companySize, partner.companySize]].filter(([, value]) => value)
  const hasOverview = Boolean(partner.description || partner.audience?.length)
  const hasCollaboration = Boolean(partner.collaboration || partner.sellfContribution || partner.partnerContribution)
  const nav = [
    ...(hasOverview ? [[t.overview, '#overview']] : []),
    ...(partner.services?.length ? [[t.services, '#services']] : []),
    ...(hasCollaboration ? [[t.collaboration, '#collaboration']] : []),
    ...(offers.length ? [[t.advantage, '#advantages']] : []),
    ...(partner.faqs?.length ? [[t.faq, '#faqs']] : []),
  ]

  return <article className={`${styles.page} ${styles.detailPage}`}>
    {partner.demo ? <PreviewNotice lang={lang}/> : null}
    <section className={styles.detailHero}><div className={styles.wrap}><nav className={styles.breadcrumb} aria-label={lang === 'tr' ? 'Sayfa yolu' : 'Breadcrumb'}><Link href={`/${lang}/partners`}>{t.partners}</Link><span aria-hidden="true">/</span><span>{partner.name}</span></nav><div className={styles.detailHeroGrid}><div><div className={styles.detailIdentity}><div className={styles.detailLogo}><PartnerLogo partner={partner}/></div><div><p className={styles.eyebrow}>{partner.categories.map((category) => t.categories[category]).join(' & ')}</p><div className={styles.nameRow}><h1>{partner.name}</h1>{partner.demo ? <span className={styles.outlineBadge}>{t.examplePartner}</span> : null}</div>{partner.headline ? <p className={styles.detailHeadline}>{partner.headline}</p> : null}{partner.summary ? <p className={styles.detailSummary}>{partner.summary}</p> : null}<div className={styles.categoryChips}>{partner.categories.map((category) => <span key={category}>{t.categories[category]}</span>)}</div></div></div></div><div className={styles.detailVisual}>{partner.coverImage ? <Image src={partner.coverImage} alt={partner.name} fill priority sizes="(max-width: 800px) 90vw, 35vw" className={styles.coverImage}/> : <div className={styles.connectionIllustration} aria-hidden="true"><div className={styles.integrationTile}><PartnerIcon kind={1}/><i/><i/><i/></div><div className={styles.inventoryTile}><PartnerIcon kind={2}/><i/><i/><i/></div><div className={styles.storeTile}><PartnerIcon kind={0}/><div className={styles.bagIcon}><span/></div><i/><i/><b><PartnerIcon kind={0}/></b></div></div>}</div></div>{metadata.length ? <dl className={styles.partnerMetadata}>{metadata.map(([label, value], index) => <div key={label}><PartnerIcon kind={[5, 1, 4][index]}/><div><dt>{label}</dt><dd>{value}</dd></div></div>)}</dl> : null}</div></section>
    {nav.length ? <nav className={styles.sectionNav} aria-label={lang === 'tr' ? 'Partner bölümleri' : 'Partner sections'}><div className={styles.wrap}>{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div></nav> : null}
    <div className={`${styles.wrap} ${styles.detailColumns}`}>
      <div className={styles.detailMain}>
        {hasOverview ? <section id="overview" className={styles.detailBlock}><p className={styles.eyebrow}>{t.overview}</p>{partner.overviewTitle ? <h2>{partner.overviewTitle}</h2> : null}{partner.description ? <p className={styles.longText}>{partner.description}</p> : null}{partner.audience?.length ? <><h3 className={styles.audienceTitle}>{t.audience}</h3><ul className={styles.audienceList}>{partner.audience.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></> : null}</section> : null}
        {partner.services?.length ? <section id="services" className={styles.detailBlock}><h2>{t.servicesTitle}</h2><div className={styles.serviceGrid}>{partner.services.map((service, index) => <div key={`${service.title}-${index}`}><PartnerIcon kind={index}/><div><h3>{service.title}</h3>{service.description ? <p>{service.description}</p> : null}</div></div>)}</div></section> : null}
        {hasCollaboration ? <section id="collaboration" className={styles.detailBlock}><p className={styles.eyebrow}>SELLF × {partner.name.toLocaleUpperCase(lang === 'tr' ? 'tr-TR' : 'en-GB')}</p><h2>{partner.collaborationTitle || t.collaborationTitle}</h2>{partner.collaboration ? <p className={styles.longText}>{partner.collaboration}</p> : null}<div className={styles.contributionGrid}>{partner.sellfContribution ? <div><PartnerIcon kind={4}/><div><h3>{t.sellfContribution}</h3><p>{partner.sellfContribution}</p></div></div> : null}{partner.partnerContribution ? <div><PartnerIcon kind={2}/><div><h3>{t.partnerContribution}</h3><p>{partner.partnerContribution}</p></div></div> : null}</div></section> : null}
        <section className={styles.detailBlock}><h2>{t.journeyTitle}</h2><ol className={`${styles.steps} ${styles.detailSteps}`}>{t.journey.map((step, index) => <li key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>
      </div>
      <aside className={styles.detailSidebar} aria-label={t.advantage}><div id="advantages" className={styles.sidebarOffers}>{offers.map((offer) => {
        const redemption = safePartnerUrl(offer.redemptionUrl)
        const date = (value: string) => new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {dateStyle: 'medium', timeZone: 'Europe/Istanbul'}).format(new Date(value))
        const validity = offer.demo ? t.demoValidity : [offer.startAt ? date(offer.startAt) : '', offer.endAt ? date(offer.endAt) : ''].filter(Boolean).join(' — ') || ''
        return <section className={styles.detailOffer} key={offer._id} id={`offer-${offer._id}`}><p className={styles.eyebrow}>{t.exclusive}{offer.demo ? ` · ${t.exampleOffer}` : ''}</p><h2>{offer.title}</h2>{offer.summary ? <p>{offer.summary}</p> : null}<dl>{[[t.eligibility, offer.eligibility], [t.scope, offer.scope], [t.terms, offer.demo ? '' : offer.terms], [t.validity, validity]].filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><PartnerRequestButton partnerId={partner._id} campaignId={offer._id}>{t.offerIntro}</PartnerRequestButton>{redemption ? <a className={styles.textLink} href={redemption} target="_blank" rel="noopener noreferrer sponsored">{t.redeem} ↗</a> : null}{offer.demo ? <small>{t.demoOfferNotice}</small> : null}</section>
      })}</div><section className={styles.meetCard}><h2>{t.meetFirst}</h2><p>{t.meetSummary}</p><PartnerRequestButton partnerId={partner._id} className={styles.blackButton}>{t.introduce}</PartnerRequestButton>{website ? <a href={website} target="_blank" rel="noopener noreferrer" className={styles.textLink}>{t.website} ↗</a> : null}</section></aside>
    </div>
    {partner.faqs?.length ? <PartnerFaqs items={partner.faqs} title={t.partnerFaqTitle}/> : null}
    {related.length ? <section className={styles.related}><div className={styles.wrap}><h2>{t.relatedTitle}</h2><div className={styles.relatedGrid}>{related.map((item) => <PartnerCard key={item._id} partner={item} lang={lang} small/>)}</div></div></section> : null}
    <section className={styles.detailClosing}><div className={styles.wrap}><h2>{t.closingTitle}</h2><div><p>{t.closingSummary}</p><PartnerRequestButton partnerId={partner._id} className={styles.whiteButton}>{t.requestIntro}</PartnerRequestButton></div></div></section>
  </article>
}
