import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'engageSettings',
  title: 'Engage Sayfa Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'featuredItem',
      title: 'Hero İçeriği',
      description: 'Boş bırakılırsa en yakın tarihli öne çıkarılmış içerik kullanılır.',
      type: 'reference',
      to: [{type: 'engageWebinar'}, {type: 'engageEvent'}, {type: 'engageContent'}],
    }),
    defineField({name: 'heroEyebrow_tr', title: 'Hero Üst Etiket (TR)', type: 'string', initialValue: 'Sellf Engage'}),
    defineField({name: 'heroEyebrow_en', title: 'Hero Eyebrow (EN)', type: 'string', initialValue: 'Sellf Engage'}),
    defineField({name: 'webinarsTitle_tr', title: 'Webinarlar Başlığı (TR)', type: 'string', initialValue: 'Webinarlar'}),
    defineField({name: 'webinarsTitle_en', title: 'Webinars Title (EN)', type: 'string', initialValue: 'Webinars'}),
    defineField({name: 'eventsTitle_tr', title: 'Event Başlığı (TR)', type: 'string', initialValue: 'Eventler & Fuarlar'}),
    defineField({name: 'eventsTitle_en', title: 'Events Title (EN)', type: 'string', initialValue: 'Events & Exhibitions'}),
    defineField({name: 'contentTitle_tr', title: 'İçerik Başlığı (TR)', type: 'string', initialValue: 'Showcase & Insight'}),
    defineField({name: 'contentTitle_en', title: 'Content Title (EN)', type: 'string', initialValue: 'Showcases & Insights'}),
    defineField({name: 'toolsTitle_tr', title: 'Tools Başlığı (TR)', type: 'string', initialValue: 'Büyüme Toolları'}),
    defineField({name: 'toolsTitle_en', title: 'Tools Title (EN)', type: 'string', initialValue: 'Growth Tools'}),
  ],
  preview: {prepare: () => ({title: 'Sellf Engage Sayfa Ayarları'})},
})
