import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog & Haberler',
  type: 'document',
  fields: [
    // TÜRKÇE BAŞLIK
    defineField({
      name: 'title_tr',
      title: 'Başlık (TR)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // İNGİLİZCE BAŞLIK
    defineField({
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Uzantısı (Slug)',
      type: 'slug',
      options: {
        source: 'title_en', // İngilizce başlıktan otomatik üretilir
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Kategoriler',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Kapak Görseli Linki (ImageKit / Cloudflare)',
      type: 'url',
      description: 'ImageKit, Cloudflare veya herhangi bir CDN servisinden aldığınız tam linki (https://...) buraya yapıştırın.',
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https'],
        allowRelative: false, // Bağıntılı (relative) değil, tam URL olmasını zorunlu kılar
      }),
    }),
    // TÜRKÇE İÇERİK
    defineField({
      name: 'content_tr',
      title: 'İçerik (TR)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    // İNGİLİZCE İÇERİK
    defineField({
      name: 'content_en',
      title: 'Content (EN)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})