'use client'

import {createContext, useContext, useEffect, useId, useRef, useState, type FormEvent, type ReactNode} from 'react'
import Link from 'next/link'
import type {NetworkPartner, PartnerCampaign, PartnerLocale} from '@/lib/partners-types'
import {partnersCopy} from '@/data/PartnersContent'
import styles from './partners.module.css'

type RequestSelection = {kind: 'intro' | 'join'; partnerId?: string; campaignId?: string}
const RequestContext = createContext<((selection: RequestSelection) => void) | null>(null)

export function PartnerRequestProvider({lang, partners, campaigns, children}: {lang: PartnerLocale; partners: NetworkPartner[]; campaigns: PartnerCampaign[]; children: ReactNode}) {
  const [selection, setSelection] = useState<RequestSelection | null>(null)
  return <RequestContext.Provider value={setSelection}>{children}{selection ? <RequestDialog key={`${selection.kind}-${selection.partnerId}-${selection.campaignId}`} selection={selection} lang={lang} partners={partners} campaigns={campaigns} onClose={() => setSelection(null)} onGeneral={() => setSelection({kind: 'intro'})}/> : null}</RequestContext.Provider>
}

export function PartnerRequestButton({children, kind = 'intro', partnerId, campaignId, className}: {children: ReactNode; kind?: 'intro' | 'join'; partnerId?: string; campaignId?: string; className?: string}) {
  const open = useContext(RequestContext)
  return <button type="button" className={className || styles.button} onClick={() => open?.({kind, partnerId, campaignId})}>{children}<span aria-hidden="true">↗</span></button>
}

function RequestDialog({selection, lang, partners, campaigns, onClose, onGeneral}: {selection: RequestSelection; lang: PartnerLocale; partners: NetworkPartner[]; campaigns: PartnerCampaign[]; onClose: () => void; onGeneral: () => void}) {
  const t = partnersCopy[lang]
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const partner = partners.find((item) => item._id === selection.partnerId)
  const campaign = campaigns.find((item) => item._id === selection.campaignId)
  const isDemo = Boolean(partner?.demo || campaign?.demo)

  useEffect(() => {
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {element?.close(); document.body.style.overflow = previousOverflow}
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending' || isDemo) return
    const form = event.currentTarget
    setStatus('sending')
    try {
      const response = await fetch('/api/partners/request', {method: 'POST', body: new FormData(form)})
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
    } catch { setStatus('error') }
  }

  return <dialog ref={dialog} className={styles.requestDialog} aria-labelledby={titleId} onCancel={onClose} onClick={(event) => {if (event.target === event.currentTarget) onClose()}}>
    <button type="button" className={styles.closeDialog} onClick={onClose} aria-label={t.close}>×</button>
    <p className={styles.eyebrow}>{selection.kind === 'join' ? 'SELLF REFERRAL PROGRAM' : t.eyebrow}</p>
    <h2 id={titleId}>{selection.kind === 'join' ? t.joinFormTitle : t.introFormTitle}</h2>
    {partner ? <p className={styles.selectedPartner}>{partner.name}{campaign ? ` · ${campaign.title}` : ''}</p> : null}
    {isDemo ? <div className={styles.demoMessage}><p>{t.demoForm}</p><button type="button" className={styles.button} onClick={onGeneral}>{t.generalRequest} →</button></div> : status === 'success' ? <div role="status" className={styles.successMessage}><p>{t.success}</p><button type="button" onClick={onClose} className={styles.button}>{t.close}</button></div> : <>
      <p className={styles.dialogSummary}>{t.formSummary}</p>
      <form className={styles.requestForm} onSubmit={submit}>
        <input type="hidden" name="kind" value={selection.kind}/><input type="hidden" name="lang" value={lang}/>
        {selection.partnerId ? <input type="hidden" name="partnerId" value={selection.partnerId}/> : null}
        {selection.campaignId ? <input type="hidden" name="campaignId" value={selection.campaignId}/> : null}
        <label className={styles.honeypot} aria-hidden="true">Website<input name="company_website" autoComplete="off" tabIndex={-1}/></label>
        <label>{t.name} *<input name="name" autoComplete="name" required maxLength={120}/></label>
        <label>{t.email} *<input name="email" type="email" autoComplete="email" required maxLength={320}/></label>
        <label>{t.company} *<input name="company" autoComplete="organization" required maxLength={180}/></label>
        <label>{t.phone}<input name="phone" type="tel" autoComplete="tel" maxLength={80}/></label>
        {selection.kind === 'join' ? <label className={styles.fullField}>{t.companyWebsite} *<input name="website" type="url" required placeholder="https://" maxLength={500}/></label> : !selection.partnerId && partners.some((item) => !item.demo) ? <label className={styles.fullField}>{t.partner}<select name="partnerId" defaultValue=""><option value="">{t.matchingOption}</option>{partners.filter((item) => !item.demo).map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}</select></label> : null}
        <label className={styles.fullField}>{selection.kind === 'join' ? t.expertise : t.need} *<textarea name="brief" required rows={4} maxLength={3000}/></label>
        <label className={styles.consent}><input type="checkbox" name="consent" value="yes" required/><span>{t.consent} <Link href={`/${lang}/privacy-policy`} target="_blank" rel="noopener noreferrer">{t.privacy} ↗</Link></span></label>
        <div className={styles.formActions}><button type="submit" className={styles.button} disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit}<span aria-hidden="true">→</span></button><p role="status" aria-live="polite">{status === 'error' ? t.error : ''}</p></div>
      </form>
    </>}
  </dialog>
}
