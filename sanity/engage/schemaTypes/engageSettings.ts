import {defineArrayMember, defineField, defineType} from 'sanity'

const localizedString = (name: string, titleTr: string, titleEn: string) => [
  defineField({name: `${name}_tr`, title: `${titleTr} (TR)`, type: 'string'}),
  defineField({name: `${name}_en`, title: `${titleEn} (EN)`, type: 'string'}),
]

const localizedText = (name: string, titleTr: string, titleEn: string) => [
  defineField({name: `${name}_tr`, title: `${titleTr} (TR)`, type: 'text', rows: 3}),
  defineField({name: `${name}_en`, title: `${titleEn} (EN)`, type: 'text', rows: 3}),
]

const formatField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      ...localizedString('title', 'Başlık', 'Title'),
      ...localizedText('description', 'Açıklama', 'Description'),
      ...localizedString('tag', 'Görsel etiketi', 'Visual tag'),
    ],
  })

export default defineType({
  name: 'engageSettings',
  title: 'Engage Sayfa Ayarları',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'formats', title: 'Formatlar'},
    {name: 'sections', title: 'Bölümler'},
    {name: 'closing', title: 'Kapanış'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'featuredItem',
      title: 'Hero İçeriği',
      description: 'Boş bırakılırsa en yakın tarihli öne çıkarılmış içerik kullanılır.',
      type: 'reference',
      group: 'hero',
      to: [{type: 'engageWebinar'}, {type: 'engageEvent'}, {type: 'engageShowcase'}, {type: 'engageInsight'}],
    }),
    ...localizedString('heroEyebrow', 'Hero üst etiketi', 'Hero eyebrow').map((field) => ({...field, group: 'hero'})),
    ...localizedString('heroTitle', 'Hero başlığı', 'Hero title').map((field) => ({...field, group: 'hero'})),
    ...localizedText('heroSummary', 'Hero açıklaması', 'Hero description').map((field) => ({...field, group: 'hero'})),
    ...localizedString('heroExploreCta', 'Keşfet CTA', 'Explore CTA').map((field) => ({...field, group: 'hero'})),
    ...localizedString('heroUpcomingCta', 'Yaklaşanlar CTA', 'Upcoming CTA').map((field) => ({...field, group: 'hero'})),
    ...localizedString('heroReserveCta', 'Rezervasyon CTA', 'Reserve CTA').map((field) => ({...field, group: 'hero'})),
    ...localizedString('heroFeaturedLabel', 'Öne çıkan etiketi', 'Featured label').map((field) => ({...field, group: 'hero'})),
    ...localizedString('heroQuestion', 'Hero alt mesajı', 'Hero footer message').map((field) => ({...field, group: 'hero'})),
    defineField({
      name: 'stats', title: 'Hero İstatistikleri', type: 'array', group: 'hero', validation: (rule) => rule.max(3),
      of: [defineArrayMember({type: 'object', fields: [defineField({name: 'value', title: 'Değer', type: 'string'}), ...localizedString('label', 'Etiket', 'Label')], preview: {select: {title: 'value', subtitle: 'label_tr'}}})],
    }),
    ...localizedString('formatsEyebrow', 'Formatlar üst etiketi', 'Formats eyebrow').map((field) => ({...field, group: 'formats'})),
    ...localizedString('formatsTitle', 'Formatlar başlığı', 'Formats title').map((field) => ({...field, group: 'formats'})),
    ...localizedText('formatsNote', 'Formatlar açıklaması', 'Formats note').map((field) => ({...field, group: 'formats'})),
    {...formatField('formatWatch', 'İzle Kartı'), group: 'formats'},
    {...formatField('formatAttend', 'Katıl Kartı'), group: 'formats'},
    {...formatField('formatTools', 'Tool’lar Kartı'), group: 'formats'},
    {...formatField('formatRead', 'Oku Kartı'), group: 'formats'},
    ...localizedString('webinarsEyebrow', 'Webinar üst etiketi', 'Webinars eyebrow').map((field) => ({...field, group: 'sections'})),
    ...localizedString('webinarsTitle', 'Webinar başlığı', 'Webinars title').map((field) => ({...field, group: 'sections'})),
    ...localizedString('allWebinarsCta', 'Tüm webinarlar CTA', 'All webinars CTA').map((field) => ({...field, group: 'sections'})),
    ...localizedString('registerCta', 'Kayıt CTA', 'Register CTA').map((field) => ({...field, group: 'sections'})),
    ...localizedString('eventsEyebrow', 'Event üst etiketi', 'Events eyebrow').map((field) => ({...field, group: 'sections'})),
    ...localizedString('eventsTitle', 'Event başlığı', 'Events title').map((field) => ({...field, group: 'sections'})),
    ...localizedString('allEventsCta', 'Tüm eventler CTA', 'All events CTA').map((field) => ({...field, group: 'sections'})),
    ...localizedString('toolsEyebrow', 'Tool üst etiketi', 'Tools eyebrow').map((field) => ({...field, group: 'sections'})),
    ...localizedString('toolsTitle', 'Tool başlığı', 'Tools title').map((field) => ({...field, group: 'sections'})),
    ...localizedText('toolsNote', 'Tool açıklaması', 'Tools note').map((field) => ({...field, group: 'sections'})),
    ...localizedString('allToolsCta', 'Tüm tool’lar CTA', 'All tools CTA').map((field) => ({...field, group: 'sections'})),
    ...localizedString('contentEyebrow', 'İçerik üst etiketi', 'Content eyebrow').map((field) => ({...field, group: 'sections'})),
    ...localizedString('contentTitle', 'İçerik başlığı', 'Content title').map((field) => ({...field, group: 'sections'})),
    ...localizedString('allContentCta', 'Tüm içerikler CTA', 'All content CTA').map((field) => ({...field, group: 'sections'})),
    ...localizedString('closingEyebrow', 'Kapanış üst etiketi', 'Closing eyebrow').map((field) => ({...field, group: 'closing'})),
    ...localizedString('closingTitle', 'Kapanış başlığı', 'Closing title').map((field) => ({...field, group: 'closing'})),
    ...localizedText('closingSummary', 'Kapanış açıklaması', 'Closing description').map((field) => ({...field, group: 'closing'})),
    ...localizedString('closingAttendCta', 'Event CTA', 'Event CTA').map((field) => ({...field, group: 'closing'})),
    ...localizedString('closingWorkCta', 'İletişim CTA', 'Contact CTA').map((field) => ({...field, group: 'closing'})),
    defineField({name: 'seo', title: 'Engage SEO', type: 'engageSeo', group: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Sellf Engage Sayfa Ayarları'})},
})
