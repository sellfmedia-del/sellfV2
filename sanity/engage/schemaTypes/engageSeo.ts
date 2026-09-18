import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'engageSeo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'title_tr', title: 'SEO Başlığı (TR)', type: 'string'}),
    defineField({name: 'title_en', title: 'SEO Title (EN)', type: 'string'}),
    defineField({name: 'description_tr', title: 'SEO Açıklaması (TR)', type: 'text', rows: 3}),
    defineField({name: 'description_en', title: 'SEO Description (EN)', type: 'text', rows: 3}),
    defineField({
      name: 'image',
      title: 'Sosyal Paylaşım Görseli',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Arama motorlarından gizle',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
