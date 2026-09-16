import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'engageWebinar',
  title: 'Webinarlar',
  type: 'document',
  groups: [
    {name: 'content', title: 'İçerik', default: true},
    {name: 'schedule', title: 'Tarih & Kayıt'},
    {name: 'media', title: 'Medya'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title_tr', title: 'Başlık (TR)', type: 'string', group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'title_en', title: 'Title (EN)', type: 'string', group: 'content', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'URL Uzantısı',
      type: 'slug',
      group: 'content',
      options: {source: 'title_en', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'summary_tr', title: 'Özet (TR)', type: 'text', rows: 4, group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'summary_en', title: 'Summary (EN)', type: 'text', rows: 4, group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'body_tr', title: 'Detay (TR)', type: 'array', of: [{type: 'block'}], group: 'content'}),
    defineField({name: 'body_en', title: 'Details (EN)', type: 'array', of: [{type: 'block'}], group: 'content'}),
    defineField({
      name: 'speakers',
      title: 'Konuşmacılar',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'engagePerson'}]}],
      group: 'content',
    }),
    defineField({name: 'startAt', title: 'Başlangıç', type: 'datetime', group: 'schedule', validation: (Rule) => Rule.required()}),
    defineField({name: 'endAt', title: 'Bitiş', type: 'datetime', group: 'schedule', validation: (Rule) => Rule.required()}),
    defineField({name: 'timezone', title: 'Saat Dilimi', type: 'string', group: 'schedule', initialValue: 'Europe/Istanbul'}),
    defineField({name: 'registrationOpen', title: 'Kayıt Açık', type: 'boolean', group: 'schedule', initialValue: true}),
    defineField({name: 'capacity', title: 'Kontenjan', type: 'number', group: 'schedule', validation: (Rule) => Rule.integer().positive()}),
    defineField({
      name: 'meetUrl',
      title: 'Google Meet Bağlantısı',
      description: 'Yalnızca başarılı kayıt sonrasında takvim bağlantısına eklenir.',
      type: 'url',
      group: 'schedule',
    }),
    defineField({name: 'featured', title: 'Öne Çıkar', type: 'boolean', group: 'content', initialValue: false}),
    defineField({
      name: 'coverImage',
      title: 'Kapak Görseli',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'recordingUrl', title: 'YouTube / Video Bağlantısı', type: 'url', group: 'media'}),
    defineField({name: 'seo', title: 'SEO', type: 'engageSeo', group: 'seo'}),
  ],
  orderings: [{title: 'Tarih: Yeni → Eski', name: 'dateDesc', by: [{field: 'startAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title_tr', subtitle: 'startAt', media: 'coverImage'},
    prepare({title, subtitle, media}) {
      return {title, subtitle: subtitle ? new Date(subtitle).toLocaleString('tr-TR') : 'Tarih yok', media}
    },
  },
})
