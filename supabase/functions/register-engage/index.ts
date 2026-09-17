import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import {createClient} from 'npm:@supabase/supabase-js@2.95.0'

type RegistrationRequest = {
  contentId?: string
  contentType?: 'webinar' | 'event'
  contentSlug?: string
  fullName?: string
  email?: string
  language?: 'tr' | 'en'
  consent?: boolean
}

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'},
})

Deno.serve(async (request: Request) => {
  if (request.method !== 'POST') return json({status: 'method_not_allowed'}, 405)
  if (Number(request.headers.get('content-length') || 0) > 8192) return json({status: 'invalid'}, 413)

  const publishableKeys = Object.values(JSON.parse(Deno.env.get('SUPABASE_PUBLISHABLE_KEYS') || '{}'))
  if (!publishableKeys.includes(request.headers.get('apikey') || '')) return json({status: 'unauthorized'}, 401)

  const payload = await request.json().catch(() => null) as RegistrationRequest | null
  if (!payload) return json({status: 'invalid'}, 400)

  const fullName = String(payload.fullName || '').trim().replace(/\s+/g, ' ')
  const email = String(payload.email || '').trim().toLowerCase()
  const language = payload.language === 'en' ? 'en' : 'tr'
  const expectedSanityType = payload.contentType === 'webinar' ? 'engageWebinar' : payload.contentType === 'event' ? 'engageEvent' : null

  if (!expectedSanityType || !payload.contentId || !payload.contentSlug || !payload.consent || fullName.length < 2 || fullName.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({status: 'invalid'}, 400)
  }

  const query = `*[_id == $id && _type == $type][0]{_id,_type,"slug":slug.current,title_tr,title_en,summary_tr,summary_en,startAt,endAt,registrationOpen,capacity,meetUrl,externalUrl,location_tr,location_en}`
  const sanityParams = new URLSearchParams({query, '$id': JSON.stringify(payload.contentId), '$type': JSON.stringify(expectedSanityType)})
  const sanityResponse = await fetch(`https://qozgfxrm.api.sanity.io/v2026-09-01/data/query/production?${sanityParams}`, {headers: {Accept: 'application/json'}})
  if (!sanityResponse.ok) return json({status: 'content_unavailable'}, 503)
  const {result: item} = await sanityResponse.json()

  if (!item || item.slug !== payload.contentSlug || item.registrationOpen !== true || !item.startAt) {
    return json({status: 'closed'}, 409)
  }
  if (new Date(item.endAt || item.startAt).getTime() < Date.now()) return json({status: 'closed'}, 409)

  const secretKeys = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}')
  const adminKey = secretKeys.default || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  if (!adminKey || !supabaseUrl) return json({status: 'configuration_error'}, 500)

  const supabase = createClient(supabaseUrl, adminKey, {
    auth: {persistSession: false, autoRefreshToken: false, detectSessionInUrl: false},
  })
  const {data: registrationStatus, error} = await supabase.rpc('register_engage_attendee', {
    p_content_id: item._id,
    p_content_type: payload.contentType,
    p_content_slug: payload.contentSlug,
    p_full_name: fullName,
    p_email: email,
    p_language: language,
    p_consent: true,
    p_capacity: item.capacity || null,
  })

  if (error) {
    console.error('register_engage_attendee failed', error.code)
    return json({status: 'database_error'}, 500)
  }
  if (registrationStatus !== 'registered') return json({status: registrationStatus}, registrationStatus === 'invalid' ? 400 : 409)

  const title = language === 'en' ? (item.title_en || item.title_tr) : item.title_tr
  const description = language === 'en' ? (item.summary_en || item.summary_tr) : item.summary_tr
  const location = payload.contentType === 'webinar'
    ? item.meetUrl
    : language === 'en' ? (item.location_en || item.location_tr) : item.location_tr

  return json({
    status: 'registered',
    calendar: {
      title,
      description: description || 'Sellf Engage',
      startAt: item.startAt,
      endAt: item.endAt || new Date(new Date(item.startAt).getTime() + 60 * 60 * 1000).toISOString(),
      location,
      joinUrl: payload.contentType === 'webinar' ? item.meetUrl : item.externalUrl,
    },
  })
})
