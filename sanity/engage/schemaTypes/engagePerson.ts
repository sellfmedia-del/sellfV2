import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'engagePerson',
  title: 'Konuşmacılar',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Ad Soyad', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'role_tr', title: 'Unvan (TR)', type: 'string'}),
    defineField({name: 'role_en', title: 'Role (EN)', type: 'string'}),
    defineField({name: 'bio_tr', title: 'Kısa Biyografi (TR)', type: 'text', rows: 4}),
    defineField({name: 'bio_en', title: 'Short Bio (EN)', type: 'text', rows: 4}),
    defineField({
      name: 'image',
      title: 'Fotoğraf',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'linkedinUrl', title: 'LinkedIn', type: 'url'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role_tr', media: 'image'},
  },
})
