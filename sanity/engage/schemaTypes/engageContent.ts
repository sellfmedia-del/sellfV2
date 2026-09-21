import {defineArrayMember, defineField, defineType} from 'sanity'

type EngageEditorialType = {
  name: 'engageShowcase' | 'engageInsight'
  title: string
  kindLabel: string
  defaultLayout: 'editorial' | 'metricFirst'
}

const localizedText = (name: string, title: string, rows = 3) => rows > 1
  ? [
      defineField({name: `${name}_tr`, title: `${title} (TR)`, type: 'text', rows}),
      defineField({name: `${name}_en`, title: `${title} (EN)`, type: 'text', rows}),
    ]
  : [
      defineField({name: `${name}_tr`, title: `${title} (TR)`, type: 'string'}),
      defineField({name: `${name}_en`, title: `${title} (EN)`, type: 'string'}),
    ]

const visualCaseScenes = [
  defineArrayMember({
    name: 'visualCaseTimeline',
    title: 'Kronoloji',
    type: 'object',
    fields: [
      ...localizedText('eyebrow', 'Üst Etiket', 1),
      ...localizedText('title', 'Başlık', 1),
      ...localizedText('description', 'Açıklama'),
      defineField({
        name: 'items',
        title: 'Adımlar',
        type: 'array',
        of: [defineArrayMember({
          type: 'object',
          fields: [
            ...localizedText('label', 'Etiket', 1),
            ...localizedText('detail', 'Kısa Açıklama', 1),
          ],
          preview: {select: {title: 'label_tr', subtitle: 'detail_tr'}},
        })],
      }),
    ],
    preview: {select: {title: 'title_tr'}, prepare: ({title}) => ({title: title || 'Kronoloji', subtitle: 'Visual Case · Kronoloji'})},
  }),
  defineArrayMember({
    name: 'visualCaseLevers',
    title: 'Müdahaleler / Kaldıraçlar',
    type: 'object',
    fields: [
      ...localizedText('eyebrow', 'Üst Etiket', 1),
      ...localizedText('title', 'Başlık', 1),
      ...localizedText('description', 'Açıklama'),
      defineField({
        name: 'items',
        title: 'Müdahaleler',
        type: 'array',
        validation: (Rule) => Rule.max(6),
        of: [defineArrayMember({
          type: 'object',
          fields: [
            ...localizedText('title', 'Başlık', 1),
            ...localizedText('description', 'Açıklama'),
            defineField({name: 'image', title: 'Görsel (İsteğe Bağlı)', type: 'image', options: {hotspot: true}}),
          ],
          preview: {select: {title: 'title_tr', media: 'image'}},
        })],
      }),
      defineField({name: 'featuredValue', title: 'Öne Çıkan Değer', type: 'string'}),
      ...localizedText('featuredLabel', 'Öne Çıkan Değer Açıklaması', 1),
      ...localizedText('featuredNote', 'Öne Çıkan Değer Notu'),
    ],
    preview: {select: {title: 'title_tr'}, prepare: ({title}) => ({title: title || 'Müdahaleler', subtitle: 'Visual Case · Kaldıraçlar'})},
  }),
  defineArrayMember({
    name: 'visualCaseMetricComparison',
    title: 'Karşılaştırmalı Metrikler',
    type: 'object',
    fields: [
      ...localizedText('eyebrow', 'Üst Etiket', 1),
      defineField({
        name: 'leftMetric', title: 'Sol Metrik', type: 'object', fields: [
          defineField({name: 'value', title: 'Değer', type: 'string', validation: (Rule) => Rule.required()}),
          ...localizedText('label', 'Etiket', 1),
          ...localizedText('note', 'Not', 1),
        ],
      }),
      defineField({
        name: 'rightMetric', title: 'Sağ Metrik', type: 'object', fields: [
          defineField({name: 'value', title: 'Değer', type: 'string', validation: (Rule) => Rule.required()}),
          ...localizedText('label', 'Etiket', 1),
          ...localizedText('note', 'Not', 1),
        ],
      }),
    ],
    preview: {select: {left: 'leftMetric.value', right: 'rightMetric.value'}, prepare: ({left, right}) => ({title: `${left || '—'}  ↔  ${right || '—'}`, subtitle: 'Visual Case · Metrik Karşılaştırması'})},
  }),
  defineArrayMember({
    name: 'visualCaseFramework',
    title: 'Çerçeve / 3 Sütun',
    type: 'object',
    fields: [
      ...localizedText('eyebrow', 'Üst Etiket', 1),
      ...localizedText('title', 'Başlık', 1),
      defineField({
        name: 'columns', title: 'Sütunlar', type: 'array', validation: (Rule) => Rule.min(2).max(4),
        of: [defineArrayMember({
          type: 'object', fields: [
            ...localizedText('title', 'Başlık', 1),
            ...localizedText('statement', 'Ana İfade'),
            ...localizedText('description', 'Açıklama'),
          ],
          preview: {select: {title: 'title_tr', subtitle: 'statement_tr'}},
        })],
      }),
    ],
    preview: {select: {title: 'title_tr'}, prepare: ({title}) => ({title: title || 'Çerçeve', subtitle: 'Visual Case · Çoklu Sütun'})},
  }),
  defineArrayMember({
    name: 'visualCaseFlow',
    title: 'Sistem Akışı',
    type: 'object',
    fields: [
      ...localizedText('eyebrow', 'Üst Etiket', 1),
      ...localizedText('title', 'Başlık', 1),
      ...localizedText('description', 'Açıklama'),
      defineField({
        name: 'steps', title: 'Akış Adımları', type: 'array', validation: (Rule) => Rule.min(2).max(5),
        of: [defineArrayMember({type: 'object', fields: [
          ...localizedText('title', 'Başlık', 1),
          ...localizedText('description', 'Açıklama'),
        ], preview: {select: {title: 'title_tr', subtitle: 'description_tr'}}})],
      }),
    ],
    preview: {select: {title: 'title_tr'}, prepare: ({title}) => ({title: title || 'Sistem Akışı', subtitle: 'Visual Case · Akış'})},
  }),
  defineArrayMember({
    name: 'visualCaseEvidence',
    title: 'Kanıt / İş Birimi',
    type: 'object',
    fields: [
      ...localizedText('eyebrow', 'Üst Etiket', 1),
      ...localizedText('title', 'Başlık', 1),
      ...localizedText('description', 'Açıklama'),
      defineField({name: 'image', title: 'Görsel (İsteğe Bağlı)', type: 'image', options: {hotspot: true}}),
      defineField({
        name: 'points', title: 'Kısa Çıkarımlar', type: 'array', of: [defineArrayMember({type: 'object', fields: [
          ...localizedText('title', 'Başlık', 1),
          ...localizedText('description', 'Açıklama', 1),
        ], preview: {select: {title: 'title_tr', subtitle: 'description_tr'}}})],
      }),
    ],
    preview: {select: {title: 'title_tr', media: 'image'}, prepare: ({title, media}) => ({title: title || 'Kanıt', subtitle: 'Visual Case · Kanıt', media})},
  }),
  defineArrayMember({
    name: 'visualCaseConclusion',
    title: 'Sonuç / Kapanış',
    type: 'object',
    fields: [
      ...localizedText('eyebrow', 'Üst Etiket', 1),
      ...localizedText('title', 'Ana Çıkarım', 1),
      ...localizedText('description', 'Açıklama'),
      ...localizedText('question', 'Kapanış Sorusu'),
    ],
    preview: {select: {title: 'title_tr'}, prepare: ({title}) => ({title: title || 'Sonuç', subtitle: 'Visual Case · Kapanış'})},
  }),
]

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
      defineField({name: 'externalUrl_tr', title: 'Harici İçerik Bağlantısı (TR)', description: 'Showcase mevcut bir blog yazısına yönlenecekse Türkçe bağlantıyı girin.', type: 'url', group: 'content', hidden: name !== 'engageShowcase'}),
      defineField({name: 'externalUrl_en', title: 'External Content URL (EN)', description: 'İngilizce blog veya harici içerik bağlantısı.', type: 'url', group: 'content', hidden: name !== 'engageShowcase'}),
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
          {title: 'Visual Case — native görsel sunum', value: 'visualCase'},
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
          {title: 'Visual Case — sahne bazlı sunum', value: 'visualCase'},
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
      defineField({
        name: 'visualCaseScenes',
        title: 'Visual Case Sahneleri',
        description: 'Sahneleri sürükleyerek sıralayın. Her sahne sitede native ve responsive bir bölüm olarak gösterilir.',
        type: 'array',
        group: 'format',
        hidden: ({document}) => document?.format !== 'visualCase' && document?.layoutPreset !== 'visualCase',
        of: visualCaseScenes,
        validation: (Rule) => Rule.custom((value, context) => {
          const document = context.document as {format?: string; layoutPreset?: string} | undefined
          if (document?.format === 'visualCase' || document?.layoutPreset === 'visualCase') {
            return Array.isArray(value) && value.length > 0 ? true : 'En az bir Visual Case sahnesi ekleyin.'
          }
          return true
        }),
      }),
      defineField({
        name: 'sources',
        title: 'Kaynaklar',
        type: 'array',
        group: 'format',
        hidden: ({document}) => document?.format !== 'visualCase' && document?.layoutPreset !== 'visualCase',
        of: [defineArrayMember({type: 'object', fields: [
          defineField({name: 'label', title: 'Kaynak Adı', type: 'string', validation: (Rule) => Rule.required()}),
          defineField({name: 'url', title: 'Bağlantı', type: 'url', validation: (Rule) => Rule.required()}),
        ], preview: {select: {title: 'label', subtitle: 'url'}}})],
      }),
      defineField({name: 'disclosure_tr', title: 'Bağımsız Analiz Notu (TR)', type: 'text', rows: 3, group: 'format', hidden: ({document}) => document?.format !== 'visualCase' && document?.layoutPreset !== 'visualCase'}),
      defineField({name: 'disclosure_en', title: 'Independent Analysis Note (EN)', type: 'text', rows: 3, group: 'format', hidden: ({document}) => document?.format !== 'visualCase' && document?.layoutPreset !== 'visualCase'}),
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
