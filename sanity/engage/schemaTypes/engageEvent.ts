import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'engageEvent',
  title: 'Event & Fuarlar',
  type: 'document',
  groups: [
    {name: 'content', title: 'İçerik', default: true},
    {name: 'details', title: 'Etkinlik Bilgileri'},
    {name: 'media', title: 'Medya'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title_tr', title: 'Başlık (TR)', type: 'string', group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'title_en', title: 'Title (EN)', type: 'string', group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'URL Uzantısı', type: 'slug', group: 'content', options: {source: 'title_en', maxLength: 96}, validation: (Rule) => Rule.required()}),
    defineField({name: 'summary_tr', title: 'Özet (TR)', type: 'text', rows: 4, group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'summary_en', title: 'Summary (EN)', type: 'text', rows: 4, group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'body_tr', title: 'Detay (TR)', type: 'array', of: [{type: 'block'}], group: 'content'}),
    defineField({name: 'body_en', title: 'Details (EN)', type: 'array', of: [{type: 'block'}], group: 'content'}),
    defineField({
      name: 'eventType',
      title: 'Etkinlik Türü',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Sellf Etkinliği', value: 'hosted'},
          {title: 'Sponsor', value: 'sponsored'},
          {title: 'Katılımcı / Fuar', value: 'attended'},
          {title: 'Konuşmacı', value: 'speaker'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'startAt', title: 'Başlangıç', type: 'datetime', group: 'details', validation: (Rule) => Rule.required()}),
    defineField({name: 'endAt', title: 'Bitiş', type: 'datetime', group: 'details'}),
    defineField({name: 'location_tr', title: 'Konum (TR)', type: 'string', group: 'details'}),
    defineField({name: 'location_en', title: 'Location (EN)', type: 'string', group: 'details'}),
    defineField({name: 'externalUrl', title: 'Etkinlik Bağlantısı', type: 'url', group: 'details'}),
    defineField({name: 'featured', title: 'Öne Çıkar', type: 'boolean', group: 'content', initialValue: false}),
    defineField({name: 'coverImage', title: 'Kapak Görseli', type: 'image', group: 'media', options: {hotspot: true}, validation: (Rule) => Rule.required()}),
    defineField({
      name: 'gallery',
      title: 'Galeri',
      type: 'array',
      group: 'media',
      of: [{type: 'image', options: {hotspot: true}, fields: [{name: 'alt_tr', title: 'Alt metin (TR)', type: 'string'}, {name: 'alt_en', title: 'Alt text (EN)', type: 'string'}]}],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'engageSeo', group: 'seo'}),
  ],
  orderings: [{title: 'Tarih: Yeni → Eski', name: 'dateDesc', by: [{field: 'startAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title_tr', subtitle: 'eventType', media: 'coverImage'},
  },
})
