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
  datePrecision?: 'day' | 'month'
  endAt?: string
  timezone?: string
  location?: string
  contentType?: 'showcase' | 'insight'
  format?: 'article' | 'video' | 'motion' | 'podcast' | 'carousel' | 'presentation'
  layoutPreset?: 'editorial' | 'mediaFirst' | 'metricFirst'
  cardStyle?: 'standard' | 'wide' | 'featured'
  eventType?: 'hosted' | 'sponsored' | 'attended' | 'speaker'
  externalUrl?: string
  author?: string
  featured?: boolean
  registrationOpen?: boolean
  capacity?: number
}

export type EngageSettings = {
  heroEyebrow?: string
  heroTitle?: string
  heroSummary?: string
  heroExploreCta?: string
  heroUpcomingCta?: string
  heroReserveCta?: string
  heroFeaturedLabel?: string
  heroQuestion?: string
  stats?: Array<{value?: string; label?: string}>
  formatsEyebrow?: string
  formatsTitle?: string
  formatsNote?: string
  formats?: Array<{title?: string; description?: string; tag?: string}>
  webinarsEyebrow?: string
  webinarsTitle?: string
  allWebinarsCta?: string
  registerCta?: string
  eventsEyebrow?: string
  eventsTitle?: string
  allEventsCta?: string
  toolsEyebrow?: string
  contentTitle?: string
  contentEyebrow?: string
  allContentCta?: string
  toolsTitle?: string
  toolsNote?: string
  allToolsCta?: string
  closingEyebrow?: string
  closingTitle?: string
  closingSummary?: string
  closingAttendCta?: string
  closingWorkCta?: string
  seo?: {title?: string; description?: string; image?: string; noIndex?: boolean}
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

export type EngageArchiveSection = 'webinars' | 'events' | 'content'
export type EngageArchiveFilter = 'all' | 'upcoming' | 'past' | 'showcases' | 'insights' | 'videos'

export type EngageArchiveData = {
  items: EngageCard[]
  total: number
}

export const ENGAGE_ARCHIVE_PAGE_SIZE = 12

const localizedProjection = `
  _id,
  _type,
  "title": select($lang == "en" => coalesce(title_en, title_tr), title_tr),
  "summary": select($lang == "en" => coalesce(summary_en, summary_tr), summary_tr),
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  "date": coalesce(startAt, publishedAt, _createdAt),
  datePrecision,
  endAt,
  timezone,
  "location": select($lang == "en" => coalesce(location_en, location_tr), location_tr),
  "contentType": select(_type == "engageShowcase" => "showcase", _type == "engageInsight" => "insight"),
  format,
  layoutPreset,
  cardStyle,
  eventType,
  "externalUrl": select(
    $lang == "en" => coalesce(externalUrl_en, externalUrl_tr, externalUrl),
    coalesce(externalUrl_tr, externalUrl_en, externalUrl)
  ),
  "author": select(
    _type == "engageWebinar" && count(speakers) > 0 => array::join(speakers[]->name, " & "),
    "Sellf Media"
  ),
  featured,
  registrationOpen,
  capacity
`

const pageQuery = `{
  "settings": *[_type == "engageSettings" && _id == "engageSettings"][0] {
    "heroEyebrow": select($lang == "en" => coalesce(heroEyebrow_en, heroEyebrow_tr), heroEyebrow_tr),
    "heroTitle": select($lang == "en" => coalesce(heroTitle_en, heroTitle_tr), heroTitle_tr),
    "heroSummary": select($lang == "en" => coalesce(heroSummary_en, heroSummary_tr), heroSummary_tr),
    "heroExploreCta": select($lang == "en" => coalesce(heroExploreCta_en, heroExploreCta_tr), heroExploreCta_tr),
    "heroUpcomingCta": select($lang == "en" => coalesce(heroUpcomingCta_en, heroUpcomingCta_tr), heroUpcomingCta_tr),
    "heroReserveCta": select($lang == "en" => coalesce(heroReserveCta_en, heroReserveCta_tr), heroReserveCta_tr),
    "heroFeaturedLabel": select($lang == "en" => coalesce(heroFeaturedLabel_en, heroFeaturedLabel_tr), heroFeaturedLabel_tr),
    "heroQuestion": select($lang == "en" => coalesce(heroQuestion_en, heroQuestion_tr), heroQuestion_tr),
    "stats": stats[]{value, "label": select($lang == "en" => coalesce(label_en, label_tr), label_tr)},
    "formatsEyebrow": select($lang == "en" => coalesce(formatsEyebrow_en, formatsEyebrow_tr), formatsEyebrow_tr),
    "formatsTitle": select($lang == "en" => coalesce(formatsTitle_en, formatsTitle_tr), formatsTitle_tr),
    "formatsNote": select($lang == "en" => coalesce(formatsNote_en, formatsNote_tr), formatsNote_tr),
    "formats": [formatWatch, formatAttend, formatTools, formatRead]{
      "title": select($lang == "en" => coalesce(title_en, title_tr), title_tr),
      "description": select($lang == "en" => coalesce(description_en, description_tr), description_tr),
      "tag": select($lang == "en" => coalesce(tag_en, tag_tr), tag_tr)
    },
    "webinarsEyebrow": select($lang == "en" => coalesce(webinarsEyebrow_en, webinarsEyebrow_tr), webinarsEyebrow_tr),
    "webinarsTitle": select($lang == "en" => coalesce(webinarsTitle_en, webinarsTitle_tr), webinarsTitle_tr),
    "allWebinarsCta": select($lang == "en" => coalesce(allWebinarsCta_en, allWebinarsCta_tr), allWebinarsCta_tr),
    "registerCta": select($lang == "en" => coalesce(registerCta_en, registerCta_tr), registerCta_tr),
    "eventsEyebrow": select($lang == "en" => coalesce(eventsEyebrow_en, eventsEyebrow_tr), eventsEyebrow_tr),
    "eventsTitle": select($lang == "en" => coalesce(eventsTitle_en, eventsTitle_tr), eventsTitle_tr),
    "allEventsCta": select($lang == "en" => coalesce(allEventsCta_en, allEventsCta_tr), allEventsCta_tr),
    "toolsEyebrow": select($lang == "en" => coalesce(toolsEyebrow_en, toolsEyebrow_tr), toolsEyebrow_tr),
    "contentTitle": select($lang == "en" => coalesce(contentTitle_en, contentTitle_tr), contentTitle_tr),
    "contentEyebrow": select($lang == "en" => coalesce(contentEyebrow_en, contentEyebrow_tr), contentEyebrow_tr),
    "allContentCta": select($lang == "en" => coalesce(allContentCta_en, allContentCta_tr), allContentCta_tr),
    "toolsTitle": select($lang == "en" => coalesce(toolsTitle_en, toolsTitle_tr), toolsTitle_tr),
    "toolsNote": select($lang == "en" => coalesce(toolsNote_en, toolsNote_tr), toolsNote_tr),
    "allToolsCta": select($lang == "en" => coalesce(allToolsCta_en, allToolsCta_tr), allToolsCta_tr),
    "closingEyebrow": select($lang == "en" => coalesce(closingEyebrow_en, closingEyebrow_tr), closingEyebrow_tr),
    "closingTitle": select($lang == "en" => coalesce(closingTitle_en, closingTitle_tr), closingTitle_tr),
    "closingSummary": select($lang == "en" => coalesce(closingSummary_en, closingSummary_tr), closingSummary_tr),
    "closingAttendCta": select($lang == "en" => coalesce(closingAttendCta_en, closingAttendCta_tr), closingAttendCta_tr),
    "closingWorkCta": select($lang == "en" => coalesce(closingWorkCta_en, closingWorkCta_tr), closingWorkCta_tr),
    "seo": {
      "title": select($lang == "en" => coalesce(seo.title_en, seo.title_tr), seo.title_tr),
      "description": select($lang == "en" => coalesce(seo.description_en, seo.description_tr), seo.description_tr),
      "image": seo.image.asset->url,
      "noIndex": seo.noIndex
    },
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

export async function getEngageArchive(
  section: EngageArchiveSection,
  lang: EngageLocale,
  page = 1,
  filter: EngageArchiveFilter = 'all',
): Promise<EngageArchiveData> {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1
  const start = (safePage - 1) * ENGAGE_ARCHIVE_PAGE_SIZE
  const end = start + ENGAGE_ARCHIVE_PAGE_SIZE

  let condition = ''
  let order = '_createdAt desc'

  if (section === 'webinars') {
    condition = '_type == "engageWebinar" && defined(slug.current)'
    if (filter === 'upcoming') condition += ' && startAt >= now()'
    if (filter === 'past') condition += ' && startAt < now()'
    order = filter === 'upcoming' ? 'startAt asc' : 'startAt desc'
  } else if (section === 'events') {
    condition = '_type == "engageEvent" && defined(slug.current)'
    if (filter === 'upcoming') condition += ' && startAt >= now()'
    if (filter === 'past') condition += ' && startAt < now()'
    order = filter === 'upcoming' ? 'startAt asc' : 'startAt desc'
  } else {
    condition = '_type in ["engageShowcase", "engageInsight"] && defined(slug.current) && publishedAt <= now()'
    if (filter === 'showcases') condition += ' && _type == "engageShowcase"'
    if (filter === 'insights') condition += ' && _type == "engageInsight" && !(format in ["video", "motion", "podcast"])'
    if (filter === 'videos') condition += ' && _type == "engageInsight" && format in ["video", "motion", "podcast"]'
    order = 'publishedAt desc'
  }

  const query = `{
    "total": count(*[${condition}]),
    "items": *[${condition}] | order(${order}) [${start}...${end}] {${localizedProjection}}
  }`

  try {
    return await client.fetch<EngageArchiveData>(query, {lang}, {cache: 'no-store'})
  } catch (error) {
    console.error('Sellf Engage archive fetch failed', error)
    return {items: [], total: 0}
  }
}

export function engageHref(lang: EngageLocale, item: EngageCard): string {
  if (item.externalUrl) return item.externalUrl
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
