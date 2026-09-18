'use client'

import {useActionState} from 'react'
import {registerForEngage, type CalendarEvent, type RegistrationState} from './actions'
import styles from './detail.module.css'

type Props = {
  lang: 'tr' | 'en'
  section: 'webinars' | 'events'
  slug: string
  registrationOpen: boolean
}

const initialState: RegistrationState = {status: 'idle'}

function compactUtc(value: string) {
  return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function googleCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${compactUtc(event.startAt)}/${compactUtc(event.endAt)}`,
    details: event.description,
    location: event.location || '',
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

function outlookCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: event.title,
    startdt: event.startAt,
    enddt: event.endAt,
    body: event.description,
    location: event.location || '',
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`
}

function icsEscape(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

function downloadIcs(event: CalendarEvent) {
  const body = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Sellf Media//Sellf Engage//TR',
    'BEGIN:VEVENT', `UID:${crypto.randomUUID()}@sellfmedia.com`,
    `DTSTAMP:${compactUtc(new Date().toISOString())}`,
    `DTSTART:${compactUtc(event.startAt)}`, `DTEND:${compactUtc(event.endAt)}`,
    `SUMMARY:${icsEscape(event.title)}`, `DESCRIPTION:${icsEscape(event.description)}`,
    `LOCATION:${icsEscape(event.location || '')}`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([body], {type: 'text/calendar;charset=utf-8'}))
  const link = document.createElement('a')
  link.href = url
  link.download = 'sellf-engage.ics'
  link.click()
  URL.revokeObjectURL(url)
}

export default function RegistrationPanel({lang, section, slug, registrationOpen}: Props) {
  const [state, formAction, pending] = useActionState(registerForEngage, initialState)
  const tr = lang === 'tr'
  const completed = state.status === 'success'

  if (!registrationOpen) {
    return <aside className={styles.registrationPanel}><span>{tr ? 'KAYIT' : 'REGISTRATION'}</span><h2>{tr ? 'Kayıtlar kapalı.' : 'Registration is closed.'}</h2><p>{tr ? 'Yeni oturumları Sellf Engage ana sayfasından takip edebilirsiniz.' : 'Follow new sessions from the Sellf Engage homepage.'}</p></aside>
  }

  if (completed && state.calendar) {
    return <aside className={`${styles.registrationPanel} ${styles.registrationSuccess}`}>
      <span>{tr ? 'KAYIT TAMAMLANDI' : 'REGISTRATION COMPLETE'}</span>
      <h2>{tr ? 'Yeriniz ayrıldı.' : 'Your seat is reserved.'}</h2>
      <p>{tr ? 'Etkinliği takviminize ekleyebilirsiniz.' : 'Add the event to your calendar.'}</p>
      <div className={styles.calendarActions}>
        <a href={googleCalendarUrl(state.calendar)} target="_blank" rel="noreferrer">Google Calendar ↗</a>
        <a href={outlookCalendarUrl(state.calendar)} target="_blank" rel="noreferrer">Outlook ↗</a>
        <button type="button" onClick={() => downloadIcs(state.calendar!)}>Apple / ICS ↓</button>
      </div>
      {state.calendar.joinUrl && <a className={styles.joinButton} href={state.calendar.joinUrl} target="_blank" rel="noreferrer">{section === 'webinars' ? (tr ? 'Google Meet’e Katıl' : 'Join Google Meet') : (tr ? 'Etkinlik Bağlantısını Aç' : 'Open Event Link')} <span>↗</span></a>}
    </aside>
  }

  return <aside className={styles.registrationPanel}>
    <span>{section === 'webinars' ? (tr ? 'WEBİNARA KATIL' : 'JOIN THE WEBINAR') : (tr ? 'ETKİNLİĞE KATIL' : 'JOIN THE EVENT')}</span>
    <h2>{tr ? 'Yerini ayır.' : 'Reserve your seat.'}</h2>
    <p>{tr ? 'Kayıt sonrasında etkinliği takviminize ekleyebilirsiniz.' : 'After registering, you can add the event to your calendar.'}</p>
    <form action={formAction} className={styles.registrationForm}>
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="section" value={section} />
      <input type="hidden" name="slug" value={slug} />
      <label><span>{tr ? 'Ad Soyad' : 'Full name'}</span><input name="fullName" autoComplete="name" required minLength={2} maxLength={120} /></label>
      <label><span>{tr ? 'E-posta' : 'Email'}</span><input type="email" name="email" autoComplete="email" required maxLength={254} /></label>
      <label className={styles.honeypot} aria-hidden="true"><span>Website</span><input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
      <label className={styles.consent}><input type="checkbox" name="consent" required /><span>{tr ? 'Kayıt bilgilerimin bu etkinliğin organizasyonu amacıyla işlenmesini kabul ediyorum.' : 'I consent to my registration data being processed for organizing this event.'}</span></label>
      {(state.status === 'error' || state.status === 'duplicate') && <p className={styles.formError} role="alert">{state.message}</p>}
      <button type="submit" disabled={pending}>{pending ? (tr ? 'Kaydediliyor…' : 'Registering…') : (tr ? 'Kayıt Ol' : 'Register')} <span>→</span></button>
    </form>
  </aside>
}
