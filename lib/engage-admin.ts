import {client} from '@/sanity/lib/client'

export type AdminWebinar = {
  _id: string
  title: string
  slug: string
  startAt?: string
  endAt?: string
  registrationOpen?: boolean
  capacity?: number
}

export type WebinarRegistration = {
  id: string
  content_id: string
  content_slug: string
  full_name: string
  email: string
  language: 'tr' | 'en'
  status: 'registered' | 'cancelled'
  registered_at: string
}

const webinarQuery = `*[
  _type == "engageWebinar" &&
  defined(slug.current)
] | order(startAt desc) {
  _id,
  "title": coalesce(title_tr, title_en),
  "slug": slug.current,
  startAt,
  endAt,
  registrationOpen,
  capacity
}`

export async function getAdminWebinars(): Promise<AdminWebinar[]> {
  return client.fetch<AdminWebinar[]>(webinarQuery, {}, {cache: 'no-store'})
}

export async function getWebinarRegistrations(): Promise<WebinarRegistration[]> {
  const supabaseUrl = process.env.SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY

  if (!supabaseUrl || !secretKey) {
    throw new Error('Engage admin Supabase credentials are not configured.')
  }

  const params = new URLSearchParams({
    content_type: 'eq.webinar',
    select: 'id,content_id,content_slug,full_name,email,language,status,registered_at',
    order: 'registered_at.desc',
  })

  const response = await fetch(
    `${supabaseUrl}/rest/v1/engage_registrations?${params.toString()}`,
    {
      headers: {
        apikey: secretKey,
        Accept: 'application/json',
      },
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    console.error('Engage admin registration fetch failed', response.status)
    throw new Error('Webinar registrations could not be loaded.')
  }

  return response.json() as Promise<WebinarRegistration[]>
}
