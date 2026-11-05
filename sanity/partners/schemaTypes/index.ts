import {defineArrayMember, defineField, defineType, type SchemaTypeDefinition} from 'sanity'

const localized = (name: string, title: string, text = false, required = false) =>
  (['tr', 'en'] as const).map((lang) => defineField({
    name: `${name}_${lang}`, title: `${title} (${lang.toUpperCase()})`,
    type: text ? 'text' : 'string', ...(text ? {rows: 3} : {}),
    validation: (rule) => required ? rule.required() : rule,
  }))

const faqs = () => defineField({
  name: 'faqs', title: 'Sık Sorulan Sorular', type: 'array',
  of: [defineArrayMember({
    name: 'partnerFaq', type: 'object',
    fields: [...localized('question', 'Soru', false, true), ...localized('answer', 'Yanıt', true, true)],
    preview: {select: {title: 'question_tr'}},
  })],
})

const partnerSeo = defineType({
  name: 'partnerSeo', title: 'SEO', type: 'object', fields: [
    ...localized('title', 'SEO Başlığı'), ...localized('description', 'SEO Açıklaması', true),
    defineField({name: 'image', title: 'Sosyal Paylaşım Görseli', type: 'image', options: {hotspot: true}}),
    defineField({name: 'noIndex', title: 'Arama motorlarından gizle', type: 'boolean', initialValue: false}),
  ],
})

const networkPartner = defineType({
  name: 'networkPartner', title: 'Partner', type: 'document',
  description: 'Her partner, web sitesindeki ortak TR/EN detay sayfası şablonunda gösterilir. Boş isteğe bağlı bölümler gizlenir.',
  groups: [
    {name: 'profile', title: '01 · Profil', default: true},
    {name: 'expertise', title: '02 · Uzmanlık & Uygunluk'},
    {name: 'collaboration', title: '03 · Sellf ile İş Birliği'},
    {name: 'faq', title: '04 · Sık Sorulanlar'},
    {name: 'publish', title: '05 · Yayın & SEO'},
  ],
  fields: [
    defineField({name: 'name', title: 'Firma Adı', type: 'string', group: 'profile', validation: (rule) => rule.required().max(120)}),
    defineField({name: 'slug', title: 'Sayfa Adresi', description: 'Her iki dilde aynı adres kullanılır: /tr/partners/adres ve /en/partners/adres.', type: 'slug', group: 'profile', options: {source: 'name', maxLength: 96}, validation: (rule) => rule.required()}),
    defineField({name: 'logo', title: 'Logo', description: 'Şeffaf veya açık zeminli yatay logo önerilir.', type: 'image', group: 'profile', validation: (rule) => rule.required()}),
    defineField({name: 'coverImage', title: 'Detay Sayfası Görseli (isteğe bağlı)', type: 'image', options: {hotspot: true}, group: 'profile'}),
    ...localized('headline', 'Detay Sayfası Ana Mesajı', true, true).map((f) => ({...f, group: 'profile'})),
    ...localized('summary', 'Kart / Kısa Tanıtım', true, true).map((f) => ({...f, group: 'profile'})),
    ...localized('overviewTitle', 'Genel Bakış Bölüm Başlığı', true).map((f) => ({...f, group: 'profile'})),
    ...localized('description', 'Firma Tanıtımı', true).map((f) => ({...f, group: 'profile'})),
    defineField({name: 'website', title: 'Web Sitesi', type: 'url', group: 'profile', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
    defineField({name: 'categories', title: 'Uzmanlık Alanları', type: 'array', group: 'expertise',
      of: [{type: 'string'}], options: {list: [
        {title: 'E-ticaret', value: 'ecommerce'}, {title: 'Lojistik', value: 'logistics'},
        {title: 'Teknoloji', value: 'technology'}, {title: 'Finans', value: 'finance'},
        {title: 'Marka & Tasarım', value: 'design'}, {title: 'Uluslararası Büyüme', value: 'international'},
      ]}, validation: (rule) => rule.required().min(1).unique(),
    }),
    ...['region', 'languages', 'companySize'].flatMap((name, index) => localized(name, ['Hizmet Bölgesi', 'Çalışma Dilleri', 'Uygun Şirket Büyüklükleri'][index]).map((f) => ({...f, group: 'expertise'}))),
    ...(['tr', 'en'] as const).map((lang) => defineField({name: `audience_${lang}`, title: `Kimler İçin Uygun? (${lang.toUpperCase()})`, type: 'array', group: 'expertise', of: [{type: 'string'}]})),
    defineField({name: 'services', title: 'Hizmetler', type: 'array', group: 'expertise', of: [defineArrayMember({
      type: 'object', name: 'partnerService', fields: [...localized('title', 'Başlık', false, true), ...localized('description', 'Açıklama', true)],
      preview: {select: {title: 'title_tr'}},
    })]}),
    ...localized('collaborationTitle', 'İş Birliği Bölüm Başlığı', true).map((f) => ({...f, group: 'collaboration'})),
    ...localized('collaboration', 'Sellf ile İş Birliği', true).map((f) => ({...f, group: 'collaboration'})),
    ...localized('sellfContribution', 'Sellf’in Katkısı', true).map((f) => ({...f, group: 'collaboration'})),
    ...localized('partnerContribution', 'Partnerin Katkısı', true).map((f) => ({...f, group: 'collaboration'})),
    {...faqs(), group: 'faq'},
    defineField({name: 'active', title: 'Web Sitesinde Göster', type: 'boolean', group: 'publish', initialValue: true}),
    defineField({name: 'featured', title: 'Hero Logo Vitrininde Göster', type: 'boolean', group: 'publish', initialValue: false}),
    defineField({name: 'order', title: 'Sıralama', type: 'number', group: 'publish', validation: (rule) => rule.integer().min(0)}),
    defineField({name: 'seo', title: 'SEO', type: 'partnerSeo', group: 'publish'}),
  ],
  initialValue: {active: true, featured: false},
  orderings: [{title: 'Yayın Sırası', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}, {field: 'name', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'summary_tr', media: 'logo'}},
})

const partnerCampaign = defineType({
  name: 'partnerCampaign', title: 'Partner Kampanyası', type: 'document',
  fields: [
    defineField({name: 'partner', title: 'İlgili Partner', type: 'reference', to: [{type: 'networkPartner'}], validation: (rule) => rule.required()}),
    ...localized('title', 'Avantaj Başlığı', false, true), ...localized('summary', 'Kısa Açıklama', true, true),
    ...localized('eligibility', 'Kimler Yararlanabilir?', true, true), ...localized('scope', 'Kapsam', true),
    ...localized('terms', 'Koşullar', true, true),
    defineField({name: 'startAt', title: 'Başlangıç (isteğe bağlı)', type: 'datetime'}),
    defineField({name: 'endAt', title: 'Bitiş (isteğe bağlı)', description: 'Bitiş anından itibaren kampanya otomatik gizlenir. Süresiz kampanya için boş bırakın.', type: 'datetime', validation: (rule) => rule.custom((value, context) => {
      const start = context.document?.startAt
      return value && typeof start === 'string' && Date.parse(value) <= Date.parse(start) ? 'Bitiş, başlangıçtan sonra olmalıdır.' : true
    })}),
    defineField({name: 'redemptionUrl', title: 'Kampanya Dış Bağlantısı (isteğe bağlı)', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
    defineField({name: 'active', title: 'Aktif', type: 'boolean', initialValue: true}),
    defineField({name: 'featured', title: 'Ana Sayfa Avantaj Vitrininde Göster', type: 'boolean', initialValue: true}),
    defineField({name: 'order', title: 'Sıralama', type: 'number', validation: (rule) => rule.integer().min(0)}),
  ], initialValue: {active: true, featured: true},
  preview: {select: {title: 'title_tr', subtitle: 'partner.name', media: 'partner.logo'}},
})

const partnersSettings = defineType({
  name: 'partnersSettings', title: 'Partner Ağı Sayfa Ayarları', type: 'document',
  fields: [
    ...localized('heroEyebrow', 'Hero Üst Etiketi'), ...localized('heroTitle', 'Hero Başlığı', true),
    ...localized('heroSummary', 'Hero Açıklaması', true), ...localized('heroNote', 'Hero Alt Mesajı'),
    ...localized('advantagesTitle', 'Avantajlar Başlığı'), ...localized('advantagesSummary', 'Avantajlar Açıklaması', true),
    ...localized('directoryTitle', 'Partnerler Başlığı'), ...localized('directorySummary', 'Partnerler Açıklaması', true),
    ...localized('matchingTitle', 'Tanıştırma Başlığı', true), ...localized('matchingSummary', 'Tanıştırma Açıklaması', true),
    ...localized('joinTitle', 'Partner Katılım Başlığı', true), ...localized('joinSummary', 'Partner Katılım Açıklaması', true),
    faqs(), defineField({name: 'seo', title: 'SEO', type: 'partnerSeo'}),
  ], preview: {prepare: () => ({title: 'Sellf Partner Ağı Sayfa Ayarları'})},
})

export const partnersSchema: {types: SchemaTypeDefinition[]} = {types: [partnerSeo, networkPartner, partnerCampaign, partnersSettings]}
