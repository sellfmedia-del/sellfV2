import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Kategoriler',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kategori Adı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama (Opsiyonel)',
      type: 'text',
    }),
  ],
})