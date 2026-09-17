import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'engageTool',
  title: 'Toollar',
  type: 'document',
  groups: [
    {name: 'content', title: 'İçerik', default: true},
    {name: 'runtime', title: 'Çalışma Biçimi'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title_tr', title: 'Başlık (TR)', type: 'string', group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'title_en', title: 'Title (EN)', description: 'İngilizce hazır değilse boş bırakılabilir.', type: 'string', group: 'content'}),
    defineField({name: 'slug', title: 'URL Uzantısı', type: 'slug', group: 'content', options: {source: 'title_tr', maxLength: 96}, validation: (Rule) => Rule.required()}),
    defineField({name: 'summary_tr', title: 'Özet (TR)', type: 'text', rows: 4, group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'summary_en', title: 'Summary (EN)', type: 'text', rows: 4, group: 'content'}),
    defineField({name: 'coverImage', title: 'Kapak Görseli', type: 'image', group: 'content', options: {hotspot: true}}),
    defineField({name: 'active', title: 'Yayında', type: 'boolean', group: 'content', initialValue: false}),
    defineField({name: 'order', title: 'Sıralama', type: 'number', group: 'content', initialValue: 100}),
    defineField({
      name: 'deliveryType',
      title: 'Tool Türü',
      type: 'string',
      group: 'runtime',
      options: {list: [
        {title: 'Sellf Native Tool', value: 'native'},
        {title: 'Güvenli Embed', value: 'embed'},
        {title: 'Harici Bağlantı', value: 'external'},
      ], layout: 'radio'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'toolKey', title: 'Native Component Anahtarı', type: 'string', group: 'runtime', description: 'Kod tarafındaki izinli component registry anahtarı.'}),
    defineField({name: 'embedUrl', title: 'Embed URL', type: 'url', group: 'runtime'}),
    defineField({name: 'externalUrl', title: 'Harici URL', type: 'url', group: 'runtime'}),
    defineField({name: 'config', title: 'Tool Ayarları', type: 'object', group: 'runtime', fields: [
      {name: 'accentColor', title: 'Accent Rengi', type: 'string'},
      {name: 'resultLabel_tr', title: 'Sonuç Etiketi (TR)', type: 'string'},
      {name: 'resultLabel_en', title: 'Result Label (EN)', type: 'string'},
    ]}),
    defineField({name: 'seo', title: 'SEO', type: 'engageSeo', group: 'seo'}),
  ],
  orderings: [{title: 'Manuel Sıra', name: 'manual', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title_tr', subtitle: 'deliveryType', media: 'coverImage'}},
})
