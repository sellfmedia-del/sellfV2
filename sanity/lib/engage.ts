import {client} from './client'

export type EngageLocale = 'tr' | 'en'

export type EngageCard = {
  _id: string
  _type: 'engageWebinar' | 'engageEvent' | 'engageShowcase' | 'engageInsight'
  title: string
  summary?: string
  slug: string
  coverImage?: string
  date?: string
  endAt?: string
  location?: string
  contentType?: 'showcase' | 'insight'
  format?: 'article' | 'video' | 'motion' | 'podcast' | 'carousel' | 'presentation'
  layoutPreset?: 'editorial' | 'mediaFirst' | 'metricFirst'
  cardStyle?: 'standard' | 'wide' | 'featured'
  eventType?: 'hosted' | 'sponsored' | 'attended' | 'speaker'
  externalUrl?: string
  featured?: boolean
  registrationOpen?: boolean
  capacity?: number
}

export type EngageSettings = {
  heroEyebrow?: string
  webinarsTitle?: string
  eventsTitle?: string
  contentTitle?: string
  toolsTitle?: string
  featuredItem?: EngageCard
}

export type EngagePageData = {
  settings: EngageSettings | null
  upcomingWebinars: EngageCard[]
  pastWebinars: EngageCard[]
  events: EngageCard[]
  content: EngageCard[]
  tools: EngageCard[]
  featured: EngageCard | null
}

export type EngageDetail = EngageCard & {
  body?: unknown[]
  recordingUrl?: string
  videoUrl?: string
  podcastUrl?: string
  presentationUrl?: string
  meetUrl?: string
  carousel?: Array<{url: string; caption?: string}>
  metrics?: Array<{value: string; label: string}>
  speakers?: Array<{_id: string; name: string; role?: string; image?: string}>
  seo?: {title?: string; description?: string; image?: string; noIndex?: boolean}
}

const localizedProjection = `
  _id,
  _type,
  "title": select($lang == "en" => coalesce(title_en, title_tr), title_tr),
  "summary": select($lang == "en" => coalesce(summary_en, summary_tr), summary_tr),
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  "date": coalesce(startAt, publishedAt, _createdAt),
  endAt,
  "location": select($lang == "en" => coalesce(location_en, location_tr), location_tr),
  "contentType": select(_type == "engageShowcase" => "showcase", _type == "engageInsight" => "insight"),
  format,
  layoutPreset,
  cardStyle,
  eventType,
  externalUrl,
  featured,
  registrationOpen,
  capacity
`

const pageQuery = `{
  "settings": *[_type == "engageSettings" && _id == "engageSettings"][0] {
    "heroEyebrow": select($lang == "en" => coalesce(heroEyebrow_en, heroEyebrow_tr), heroEyebrow_tr),
    "webinarsTitle": select($lang == "en" => coalesce(webinarsTitle_en, webinarsTitle_tr), webinarsTitle_tr),
    "eventsTitle": select($lang == "en" => coalesce(eventsTitle_en, eventsTitle_tr), eventsTitle_tr),
    "contentTitle": select($lang == "en" => coalesce(contentTitle_en, contentTitle_tr), contentTitle_tr),
    "toolsTitle": select($lang == "en" => coalesce(toolsTitle_en, toolsTitle_tr), toolsTitle_tr),
    "featuredItem": featuredItem->{${localizedProjection}}
  },
  "upcomingWebinars": *[_type == "engageWebinar" && defined(slug.current) && startAt >= now()] | order(startAt asc) [0...8] {${localizedProjection}},
  "pastWebinars": *[_type == "engageWebinar" && defined(slug.current) && startAt < now()] | order(startAt desc) [0...8] {${localizedProjection}},
  "events": *[_type == "engageEvent" && defined(slug.current)] | order(startAt desc) [0...12] {${localizedProjection}},
  "content": *[_type in ["engageShowcase", "engageInsight"] && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) [0...16] {${localizedProjection}},
  "tools": []
}`

function firstFeatured(data: Omit<EngagePageData, 'featured'>): EngageCard | null {
  if (data.settings?.featuredItem) return data.settings.featuredItem

  const candidates = [
    ...data.upcomingWebinars,
    ...data.events.filter((item) => item.featured),
    ...data.content.filter((item) => item.featured),
  ]

  return candidates[0] ?? data.events[0] ?? data.content[0] ?? data.pastWebinars[0] ?? null
}

export async function getEngagePageData(lang: EngageLocale): Promise<EngagePageData> {
  try {
    const data = await client.fetch<Omit<EngagePageData, 'featured'>>(
      pageQuery,
      {lang},
      {cache: 'no-store'},
    )

    return {...data, featured: firstFeatured(data)}
  } catch (error) {
    console.error('Sellf Engage content fetch failed', error)
    return {
      settings: null,
      upcomingWebinars: [],
      pastWebinars: [],
      events: [],
      content: [],
      tools: [],
      featured: null,
    }
  }
}

export function engageHref(lang: EngageLocale, item: EngageCard): string {
  if (item._type === 'engageWebinar') return `/${lang}/engage/webinars/${item.slug}`
  if (item._type === 'engageEvent') return `/${lang}/engage/events/${item.slug}`
  if (item._type === 'engageShowcase') return `/${lang}/engage/showcases/${item.slug}`
  return `/${lang}/engage/insights/${item.slug}`
}

const sectionTypeMap = {
  webinars: 'engageWebinar',
  events: 'engageEvent',
  showcases: 'engageShowcase',
  insights: 'engageInsight',
} as const

export type EngageSection = keyof typeof sectionTypeMap

export async function getEngageDetail(
  section: string,
  slug: string,
  lang: EngageLocale,
): Promise<EngageDetail | null> {
  if (!(section in sectionTypeMap)) return null
  const validSection = section as EngageSection
  const type = sectionTypeMap[validSection]
  const query = `*[
    _type == $type &&
    slug.current == $slug
  ][0] {
    ${localizedProjection},
    "body": select($lang == "en" => coalesce(body_en, body_tr), body_tr),
    recordingUrl,
    videoUrl,
    podcastUrl,
    presentationUrl,
    meetUrl,
    "carousel": carousel[]{"url": asset->url, "caption": select($lang == "en" => coalesce(caption_en, caption_tr), caption_tr)},
    "metrics": metrics[]{value, "label": select($lang == "en" => coalesce(label_en, label_tr), label_tr)},
    "speakers": speakers[]->{_id, name, "role": select($lang == "en" => coalesce(role_en, role_tr), role_tr), "image": image.asset->url},
    "seo": {
      "title": select($lang == "en" => coalesce(seo.title_en, seo.title_tr), seo.title_tr),
      "description": select($lang == "en" => coalesce(seo.description_en, seo.description_tr), seo.description_tr),
      "image": seo.image.asset->url,
      "noIndex": seo.noIndex
    }
  }`

  try {
    return await client.fetch<EngageDetail | null>(
      query,
      {type, slug, lang},
      {cache: 'no-store'},
    )
  } catch (error) {
    console.error('Sellf Engage detail fetch failed', error)
    return null
  }
}
