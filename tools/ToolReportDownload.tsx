'use client'

import {FormEvent, useEffect, useId, useRef, useState} from 'react'
import {persistToolRun, type ToolRun} from './analytics'
import {createReportHtml, reportFileName} from './report-download'
import styles from './tool-report-download.module.css'

type Props = ToolRun & {title: string}

const copy = {
  tr: {
    button: 'Raporu indir', kicker: 'ÜCRETSİZ RAPOR', title: 'Sonucunuzu kaydedin', intro: 'Raporu indirmek için bilgilerinizi girin. Analiz sonucu ekranda ücretsiz kalmaya devam eder.',
    fullName: 'Ad soyad', email: 'İş e-postası', company: 'Firma adı', privacy: 'Gizlilik Politikası’nı okudum; raporun hazırlanması ve talebimin kaydedilmesi için verilerimin işlenmesini kabul ediyorum.', marketing: 'Sellf’ten ürün, içerik ve hizmetlerle ilgili iletişim almak istiyorum. (İsteğe bağlı)', submit: 'Bilgilerimi kaydet ve indir', working: 'Rapor hazırlanıyor…', close: 'Kapat', error: 'Rapor hazırlanamadı. Lütfen bilgilerinizi kontrol edip tekrar deneyin.', format: 'HTML raporu indirilir; tarayıcınızdan PDF olarak da kaydedebilirsiniz.', required: 'Zorunlu alan',
  },
  en: {
    button: 'Download report', kicker: 'FREE REPORT', title: 'Save your result', intro: 'Enter your details to download the report. Your full result remains freely available on screen.',
    fullName: 'Full name', email: 'Work email', company: 'Company name', privacy: 'I have read the Privacy Policy and consent to processing my data to prepare the report and record my request.', marketing: 'I would like to receive updates about Sellf products, content and services. (Optional)', submit: 'Save my details and download', working: 'Preparing report…', close: 'Close', error: 'The report could not be prepared. Check your details and try again.', format: 'Downloads as HTML; you can also save it as PDF from your browser.', required: 'Required field',
  },
} as const

export default function ToolReportDownload({title, ...run}: Props) {
  const t = copy[run.language]
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const dialogTitle = useId()
  const firstField = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstField.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape' && !busy) setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', closeOnEscape) }
  }, [open, busy])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const data = new FormData(event.currentTarget)
    const fullName = String(data.get('fullName') || '').trim()
    const email = String(data.get('email') || '').trim()
    const companyName = String(data.get('companyName') || '').trim()
    try {
      const clientRunId = await persistToolRun(run)
      const response = await fetch('/api/engage/tool-leads', {method: 'POST', headers: {'content-type': 'application/json'}, cache: 'no-store', body: JSON.stringify({clientRunId, tool: run.tool, language: run.language, sourcePath: window.location.pathname, fullName, email, companyName, privacyAccepted: data.get('privacyAccepted') === 'on', marketingConsent: data.get('marketingConsent') === 'on'})})
      if (!response.ok) throw new Error('lead_persistence_failed')
      const html = createReportHtml({...run, title}, {fullName, companyName})
      const url = URL.createObjectURL(new Blob([html], {type: 'text/html;charset=utf-8'}))
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = reportFileName(run.tool, companyName)
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1_000)
      setOpen(false)
    } catch {
      setError(t.error)
    } finally {
      setBusy(false)
    }
  }

  return <>
    <section className={styles.downloadCard}><div><span>{t.kicker}</span><h2>{title}</h2><p>{t.format}</p></div><button type="button" onClick={() => setOpen(true)}>{t.button} <b>↓</b></button></section>
    {open && <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget && !busy) setOpen(false) }}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={dialogTitle}>
        <button className={styles.close} type="button" aria-label={t.close} onClick={() => setOpen(false)} disabled={busy}>×</button>
        <span>{t.kicker}</span><h2 id={dialogTitle}>{t.title}</h2><p>{t.intro}</p>
        <form onSubmit={submit}>
          <label>{t.fullName}<input ref={firstField} name="fullName" autoComplete="name" minLength={2} maxLength={120} required /><small>{t.required}</small></label>
          <label>{t.email}<input name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} required /><small>{t.required}</small></label>
          <label>{t.company}<input name="companyName" autoComplete="organization" minLength={2} maxLength={160} required /><small>{t.required}</small></label>
          <label className={styles.check}><input name="privacyAccepted" type="checkbox" required /><span><a href={`/${run.language}/privacy-policy`} target="_blank" rel="noreferrer">{t.privacy}</a></span></label>
          <label className={styles.check}><input name="marketingConsent" type="checkbox" /><span>{t.marketing}</span></label>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button className={styles.submit} type="submit" disabled={busy}>{busy ? t.working : t.submit}</button>
        </form>
      </section>
    </div>}
  </>
}
