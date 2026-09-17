'use server'

import {getEngageDetail, type EngageLocale} from '@/sanity/lib/engage'

export type CalendarEvent = {
  title: string
  description: string
  startAt: string
  endAt: string
  location?: string
  joinUrl?: string
}

export type RegistrationState = {
  status: 'idle' | 'success' | 'duplicate' | 'error'
  message?: string
  calendar?: CalendarEvent
}

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://gxngmqewskhrbxqmnpps.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_kx_Ctdj_XmKGuCc7ae3I1w_6E-Mdeh4'

function field(formData: FormData, name: string) {
  return String(formData.get(name) || '').trim()
}

export async function registerForEngage(
  _previous: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const lang: EngageLocale = field(formData, 'lang') === 'en' ? 'en' : 'tr'
  const section = field(formData, 'section')
  const slug = field(formData, 'slug')
  const fullName = field(formData, 'fullName').replace(/\s+/g, ' ')
  const email = field(formData, 'email').toLowerCase()
  const consent = formData.get('consent') === 'on'
  const honeypot = field(formData, 'companyWebsite')
  const genericError = lang === 'tr' ? 'Kayıt şu anda tamamlanamadı. Lütfen tekrar deneyin.' : 'Registration could not be completed. Please try again.'

  if (honeypot) return {status: 'success'}
  if (!['webinars', 'events'].includes(section) || !slug) return {status: 'error', message: genericError}
  if (fullName.length < 2 || fullName.length > 120) {
    return {status: 'error', message: lang === 'tr' ? 'Lütfen adınızı ve soyadınızı girin.' : 'Please enter your full name.'}
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return {status: 'error', message: lang === 'tr' ? 'Geçerli bir e-posta adresi girin.' : 'Please enter a valid email address.'}
  }
  if (!consent) {
    return {status: 'error', message: lang === 'tr' ? 'Kayıt için veri işleme onayı gereklidir.' : 'Consent is required to register.'}
  }

  const item = await getEngageDetail(section, slug, lang)
  if (!item || !item.date || item.registrationOpen !== true) {
    return {status: 'error', message: lang === 'tr' ? 'Bu içerik için kayıt şu anda kapalı.' : 'Registration is currently closed for this item.'}
  }

  const closingTime = item.endAt || item.date
  if (new Date(closingTime).getTime() < Date.now()) {
    return {status: 'error', message: lang === 'tr' ? 'Bu etkinliğin kayıt süresi sona erdi.' : 'Registration for this event has ended.'}
  }

  const response = await fetch(`${SUPABASE_URL}/functions/v1/register-engage`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contentId: item._id,
      contentType: section === 'webinars' ? 'webinar' : 'event',
      contentSlug: slug,
      fullName,
      email,
      language: lang,
      consent: true,
    }),
    cache: 'no-store',
  })

  const result = await response.json().catch(() => null) as {status?: string; calendar?: CalendarEvent} | null
  if (response.ok && result?.status === 'registered' && result.calendar) return {status: 'success', calendar: result.calendar}
  if (result?.status === 'duplicate') return {status: 'duplicate', message: lang === 'tr' ? 'Bu e-posta adresiyle daha önce kayıt yapılmış.' : 'This email address is already registered.'}
  if (result?.status === 'full') return {status: 'error', message: lang === 'tr' ? 'Bu etkinliğin kontenjanı doldu.' : 'This event has reached capacity.'}
  if (result?.status === 'closed') return {status: 'error', message: lang === 'tr' ? 'Bu içerik için kayıt şu anda kapalı.' : 'Registration is currently closed for this item.'}

  console.error('Engage registration failed', response.status, result?.status)
  return {status: 'error', message: genericError}
}
