import {defineArrayMember, defineField, defineType} from 'sanity'

type EngageEditorialType = {
  name: 'engageShowcase' | 'engageInsight'
  title: string
  kindLabel: string
  defaultLayout: 'editorial' | 'metricFirst'
}

function createEditorialType({name, title, kindLabel, defaultLayout}: EngageEditorialType) {
  return defineType({
    name,
    title,
    type: 'document',
    groups: [
      {name: 'content', title: 'İçerik', default: true},
      {name: 'format', title: 'Format & Görünüm'},
      {name: 'seo', title: 'SEO'},
    ],
    fields: [
      defineField({name: 'title_tr', title: 'Başlık (TR)', type: 'string', group: 'content', validation: (Rule) => Rule.required()}),
      defineField({name: 'title_en', title: 'Title (EN)', description: 'İngilizce hazır değilse boş bırakılabilir; sitede Türkçe içerik kullanılır.', type: 'string', group: 'content'}),
      defineField({name: 'slug', title: 'URL Uzantısı', type: 'slug', group: 'content', options: {source: 'title_tr', maxLength: 96}, validation: (Rule) => Rule.required()}),
      defineField({name: 'summary_tr', title: 'Özet (TR)', type: 'text', rows: 4, group: 'content', validation: (Rule) => Rule.required()}),
      defineField({name: 'summary_en', title: 'Summary (EN)', type: 'text', rows: 4, group: 'content'}),
      defineField({name: 'publishedAt', title: 'Yayın Tarihi', type: 'datetime', group: 'content', validation: (Rule) => Rule.required()}),
      defineField({name: 'featured', title: 'Öne Çıkar', type: 'boolean', group: 'content', initialValue: false}),
      defineField({name: 'clientName', title: 'Marka / Müşteri', type: 'string', group: 'content', hidden: name !== 'engageShowcase'}),
      defineField({
        name: 'metrics',
        title: 'Sonuç Metrikleri',
        type: 'array',
        group: 'content',
        of: [defineArrayMember({type: 'object', fields: [
          defineField({name: 'value', title: 'Değer', type: 'string', validation: (Rule) => Rule.required()}),
          defineField({name: 'label_tr', title: 'Açıklama (TR)', type: 'string', validation: (Rule) => Rule.required()}),
          defineField({name: 'label_en', title: 'Label (EN)', type: 'string'}),
        ], preview: {select: {title: 'value', subtitle: 'label_tr'}}})],
      }),
      defineField({
        name: 'format',
        title: 'İçerik Formatı',
        type: 'string',
        group: 'format',
        options: {list: [
          {title: 'Blog / Makale', value: 'article'},
          {title: 'Video', value: 'video'},
          {title: 'Motion / 2D Video', value: 'motion'},
          {title: 'Podcast', value: 'podcast'},
          {title: 'Carousel', value: 'carousel'},
          {title: 'Sunum / PDF', value: 'presentation'},
        ]},
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'layoutPreset',
        title: 'Detay Sayfası Preseti',
        description: 'İçeriğin detay sayfasındaki görsel hiyerarşisini belirler.',
        type: 'string',
        group: 'format',
        options: {list: [
          {title: 'Editorial — metin odaklı', value: 'editorial'},
          {title: 'Media-first — video / görsel odaklı', value: 'mediaFirst'},
          {title: 'Metric-first — sonuç ve metrik odaklı', value: 'metricFirst'},
        ], layout: 'radio'},
        initialValue: defaultLayout,
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'cardStyle',
        title: 'Liste Kartı Görünümü',
        type: 'string',
        group: 'format',
        options: {list: [
          {title: 'Standart kart', value: 'standard'},
          {title: 'Yatay geniş kart', value: 'wide'},
          {title: 'Öne çıkan kart', value: 'featured'},
        ], layout: 'radio'},
        initialValue: 'standard',
        validation: (Rule) => Rule.required(),
      }),
      defineField({name: 'coverImage', title: 'Kapak Görseli', type: 'image', group: 'format', options: {hotspot: true}, validation: (Rule) => Rule.required()}),
      defineField({name: 'body_tr', title: 'İçerik (TR)', type: 'array', of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}], group: 'format'}),
      defineField({name: 'body_en', title: 'Content (EN)', type: 'array', of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}], group: 'format'}),
      defineField({name: 'videoUrl', title: 'YouTube / Video Bağlantısı', type: 'url', group: 'format', hidden: ({document}) => !['video', 'motion'].includes(document?.format as string)}),
      defineField({name: 'podcastUrl', title: 'Podcast Bağlantısı', description: 'YouTube, Spotify veya tercih edilen yayın platformu bağlantısı.', type: 'url', group: 'format', hidden: ({document}) => document?.format !== 'podcast'}),
      defineField({name: 'presentationUrl', title: 'Sunum / PDF Bağlantısı', type: 'url', group: 'format', hidden: ({document}) => document?.format !== 'presentation'}),
      defineField({
        name: 'carousel',
        title: 'Carousel Görselleri',
        type: 'array',
        group: 'format',
        hidden: ({document}) => document?.format !== 'carousel',
        of: [{type: 'image', options: {hotspot: true}, fields: [
          {name: 'caption_tr', title: 'Açıklama (TR)', type: 'string'},
          {name: 'caption_en', title: 'Caption (EN)', type: 'string'},
        ]}],
      }),
      defineField({name: 'seo', title: 'SEO', type: 'engageSeo', group: 'seo'}),
    ],
    orderings: [{title: 'Yayın: Yeni → Eski', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
    preview: {
      select: {title: 'title_tr', format: 'format', layout: 'layoutPreset', media: 'coverImage'},
      prepare({title: previewTitle, format, layout, media}) {
        return {title: previewTitle, subtitle: `${kindLabel} · ${format || 'format yok'} · ${layout || 'preset yok'}`, media}
      },
    },
  })
}

export const engageShowcase = createEditorialType({
  name: 'engageShowcase',
  title: 'Showcase',
  kindLabel: 'Showcase',
  defaultLayout: 'metricFirst',
})

export const engageInsight = createEditorialType({
  name: 'engageInsight',
  title: 'Insight',
  kindLabel: 'Insight',
  defaultLayout: 'editorial',
})
