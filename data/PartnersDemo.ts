import type {NetworkPartner, PartnerCampaign, PartnerLocale, PartnersData} from '@/lib/partners-types'

// Illustration fixtures are available only on development/preview deployments.
// They are not written to Sanity and are never used on Vercel production.
export function getPartnersDemo(lang: PartnerLocale): PartnersData {
  const en = lang === 'en'
  const partners: NetworkPartner[] = [
    {
      _id: 'demo-atlas', slug: 'atlas-commerce', name: 'Atlas Commerce', demoMark: 'atlas', categories: ['ecommerce'],
      headline: en ? 'Your e-commerce infrastructure,\nready for growth.' : 'E-ticaret altyapınız,\nbüyümenize hazır olsun.',
      summary: en ? 'Store infrastructure, integrations and sales operations.' : 'Mağaza altyapısı, entegrasyon ve satış operasyonları.',
      overviewTitle: en ? 'One view of your infrastructure\nand operations.' : 'Altyapıdan operasyonunuza\naynı çerçeveden bakın.',
      description: en ? 'Atlas Commerce is an example partner profile for online store setup, systems integration and sales operations. The aim is to consider technical requirements and business goals in the same plan.' : 'Atlas Commerce; online mağaza kurulumu, sistem entegrasyonları ve satış operasyonları için kurgulanmış örnek partner profilidir. Amaç, teknik ihtiyaçları iş hedefleriyle aynı planda değerlendirmektir.',
      audience: en ? ['Brands launching a new online store', 'Teams connecting inventory, orders and accounting', 'Companies improving their e-commerce operations'] : ['Yeni bir online mağaza kurmak isteyen markalar', 'Stok, sipariş ve muhasebe akışını birleştirmek isteyen ekipler', 'Mevcut e-ticaret operasyonunu geliştirmek isteyen şirketler'],
      services: en ? [
        {title: 'Store infrastructure', description: 'A setup and migration plan for your needs.'}, {title: 'Systems integration', description: 'Connect inventory, orders and accounting.'},
        {title: 'Operations design', description: 'Clarify your team’s daily workflows.'}, {title: 'Technical roadmap', description: 'A development plan based on priorities.'},
      ] : [
        {title: 'Mağaza altyapısı', description: 'İhtiyaca uygun kurulum ve geçiş planı.'}, {title: 'Sistem entegrasyonları', description: 'Stok, sipariş ve muhasebe bağlantıları.'},
        {title: 'Operasyon tasarımı', description: 'Ekiplerin günlük iş akışlarını netleştirme.'}, {title: 'Teknik yol haritası', description: 'Önceliklere göre geliştirme planı.'},
      ],
      collaborationTitle: en ? 'Strategy and infrastructure.\nOne shared goal.' : 'Strateji ve altyapı\naynı hedefe çalışsın.',
      faqs: en ? [
        {question: 'What does the free analysis cover?', answer: 'An initial conversation and a brief needs assessment. Implementation, setup and development are scoped separately. This is illustrative campaign content.'},
        {question: 'Can I apply for an existing store?', answer: 'The example scope includes both new projects and improvements to existing stores.'},
        {question: 'What happens after an introduction request?', answer: 'For real partners, Sellf reviews the request and coordinates the first introduction. This profile is an example and does not accept requests.'},
      ] : [
        {question: 'Ücretsiz analiz neleri kapsıyor?', answer: 'Bir ön görüşme ve kısa ihtiyaç değerlendirmesi içerir. Uygulama, kurulum veya geliştirme çalışmaları ayrıca kapsamlandırılır. Bu metin örnek kampanya içeriğidir.'},
        {question: 'Mevcut mağazam için de başvurabilir miyim?', answer: 'Örnek kapsam hem yeni projeleri hem mevcut mağazaların geliştirilmesini içerir.'},
        {question: 'Tanıştırma talebinden sonra ne olur?', answer: 'Gerçek partnerlerde Sellf talebi değerlendirir ve ilk tanışmayı koordine eder. Bu profil temsilidir ve talep kabul etmez.'},
      ],
    },
    {
      _id: 'demo-rota', slug: 'rota-lojistik', name: 'Rota Lojistik', demoMark: 'rota', categories: ['logistics'],
      headline: en ? 'Let your operations\nkeep up with demand.' : 'Talebiniz büyürken\noperasyonunuz hazır olsun.',
      summary: en ? 'Warehousing, order preparation and cross-border delivery.' : 'Depolama, sipariş hazırlama ve sınır ötesi teslimat.',
      description: en ? 'An illustrative partner for warehousing, order preparation and shipping operations.' : 'Depolama, sipariş hazırlama ve gönderi operasyonları için hazırlanmış örnek partner profili.',
      audience: en ? ['E-commerce brands', 'Teams planning cross-border deliveries'] : ['E-ticaret markaları', 'Sınır ötesi teslimat planlayan ekipler'],
      services: en ? [{title: 'Warehousing', description: 'Plan inventory and warehouse workflows.'}, {title: 'Order operations', description: 'Evaluate preparation and delivery requirements.'}] : [{title: 'Depolama', description: 'Stok ve depo akışlarının planlanması.'}, {title: 'Sipariş operasyonları', description: 'Hazırlama ve teslimat ihtiyaçlarının değerlendirilmesi.'}],
    },
    {
      _id: 'demo-forma', slug: 'forma-studio', name: 'Forma Studio', demoMark: 'forma', categories: ['design'],
      headline: en ? 'A consistent identity\nfor your brand.' : 'Markanızın her temasında\ntutarlı bir kimlik.',
      summary: en ? 'Brand identity, packaging and creative production.' : 'Marka kimliği, ambalaj ve yaratıcı üretim.',
      description: en ? 'An illustrative partner profile for brand identity and creative design.' : 'Marka kimliği ve yaratıcı tasarım alanlarını göstermek için hazırlanmış örnek partner profili.',
      audience: en ? ['New brands', 'Companies refreshing their visual identity'] : ['Yeni markalar', 'Görsel kimliğini yenileyen şirketler'],
      services: en ? [{title: 'Brand identity', description: 'A consistent visual language.'}, {title: 'Packaging', description: 'Design aligned with product and audience.'}] : [{title: 'Marka kimliği', description: 'Tutarlı bir görsel dil.'}, {title: 'Ambalaj', description: 'Ürün ve hedef kitleyle uyumlu tasarım.'}],
    },
    {
      _id: 'demo-nexa', slug: 'nexa-teknoloji', name: 'Nexa Teknoloji', demoMark: 'nexa', categories: ['technology'],
      headline: en ? 'Connect your systems.\nSimplify your work.' : 'Sistemlerinizi bağlayın.\nİşinizi kolaylaştırın.',
      summary: en ? 'Software, integrations and automation for business processes.' : 'İş süreçleri için yazılım, entegrasyon ve otomasyon.',
      description: en ? 'An illustrative partner profile for software and workflow automation.' : 'Yazılım ve iş akışı otomasyonu için kurgulanmış örnek partner profili.',
      audience: en ? ['Teams with manual workflows', 'Companies connecting different systems'] : ['Manuel süreçlerle çalışan ekipler', 'Farklı sistemleri bağlamak isteyen şirketler'],
      services: en ? [{title: 'Workflow automation', description: 'Evaluate repetitive tasks.'}, {title: 'Integrations', description: 'Plan data flow between systems.'}] : [{title: 'İş akışı otomasyonu', description: 'Tekrarlanan işlerin değerlendirilmesi.'}, {title: 'Entegrasyon', description: 'Sistemler arasında veri akışının planlanması.'}],
    },
    {
      _id: 'demo-pusula', slug: 'pusula-finans', name: 'Pusula Finans', demoMark: 'pusula', categories: ['finance'],
      headline: en ? 'Bring financial clarity\nto your growth plans.' : 'Büyüme planınıza\nfinansal netlik katın.',
      summary: en ? 'Financial planning and growth budget consulting.' : 'Finansal planlama ve büyüme bütçesi danışmanlığı.',
      description: en ? 'An illustrative partner profile for financial planning and budgeting.' : 'Finansal planlama ve bütçeleme uzmanlığını göstermek için hazırlanmış örnek partner profili.',
      audience: en ? ['Growing businesses', 'Teams planning budgets'] : ['Büyüyen işletmeler', 'Bütçe planlayan ekipler'],
      services: en ? [{title: 'Budget planning', description: 'Explore scenarios around business goals.'}, {title: 'Cash flow', description: 'Evaluate operational funding needs.'}] : [{title: 'Bütçe planlama', description: 'İş hedefleri için senaryoların değerlendirilmesi.'}, {title: 'Nakit akışı', description: 'Operasyonel finansman ihtiyacının incelenmesi.'}],
    },
    {
      _id: 'demo-kopru', slug: 'kopru-global', name: 'Köprü Global', demoMark: 'kopru', categories: ['international'],
      headline: en ? 'Local connections\nfor your next market.' : 'Yeni pazarınızda\nyerel bağlantılar kurun.',
      summary: en ? 'Market entry and local business connections.' : 'Yeni pazarlara giriş ve yerel iş bağlantıları.',
      description: en ? 'An illustrative partner profile for market entry and local business connections.' : 'Yeni pazarlara giriş ve yerel iş bağlantıları için hazırlanmış örnek partner profili.',
      audience: en ? ['Companies exploring exports', 'Brands entering new markets'] : ['İhracatı değerlendiren şirketler', 'Yeni pazarlara açılan markalar'],
      services: en ? [{title: 'Market entry', description: 'Identify local requirements and priorities.'}, {title: 'Business connections', description: 'Evaluate suitable local partners.'}] : [{title: 'Pazara giriş', description: 'Yerel ihtiyaç ve önceliklerin belirlenmesi.'}, {title: 'İş bağlantıları', description: 'Uygun yerel partnerlerin değerlendirilmesi.'}],
    },
  ].map((partner) => ({
    ...partner, demo: true, featured: true,
    region: en ? 'Türkiye · Remote collaboration' : 'Türkiye · Uzaktan çalışma',
    languages: en ? 'Turkish · English' : 'Türkçe · İngilizce', companySize: en ? 'SMEs · Growing brands' : 'KOBİ · Büyüyen markalar',
    collaboration: en ? 'In this proposed collaboration model, Sellf clarifies growth priorities and the partner evaluates the relevant specialist scope. After an introduction, the parties agree on project scope and working terms.' : 'Önerilen iş birliği modelinde Sellf büyüme önceliklerini netleştirir; partner, ilgili uzmanlık kapsamını değerlendirir. Tanıştırma sonrasında proje kapsamı ve çalışma koşulları taraflar arasında belirlenir.',
    sellfContribution: en ? 'Growth goals · Prioritisation · Matching needs' : 'Büyüme hedefi · Önceliklendirme · Talep eşleştirme',
    partnerContribution: en ? 'Specialist evaluation · Delivery scope · Project proposal' : 'Uzmanlık değerlendirmesi · Uygulama kapsamı · Proje teklifi',
  })) as NetworkPartner[]

  const campaigns: PartnerCampaign[] = [
    {_id: 'demo-atlas-offer', partnerId: 'demo-atlas', title: en ? 'Free infrastructure analysis' : 'Ücretsiz altyapı analizi', summary: en ? 'An initial assessment for your e-commerce systems.' : 'E-ticaret sisteminiz için başlangıç değerlendirmesi.', eligibility: en ? 'Brands starting a new project or improving an existing system.' : 'Yeni projeye başlayacak veya mevcut sistemini geliştirmek isteyen markalar.', scope: en ? 'An initial meeting and a brief needs assessment.' : 'Bir ön görüşme ve kısa ihtiyaç değerlendirmesi.'},
    {_id: 'demo-rota-offer', partnerId: 'demo-rota', title: en ? '15% off initial setup' : 'İlk kurulumda %15 avantaj', summary: en ? 'An illustrative offer for new fulfillment projects.' : 'Yeni fulfillment projelerine özel örnek teklif.', eligibility: en ? 'Brands considering a new fulfillment project.' : 'Yeni fulfillment projesi değerlendiren markalar.', scope: en ? 'The initial setup scope, to be agreed with the partner.' : 'Partnerle belirlenecek ilk kurulum kapsamı.'},
    {_id: 'demo-nexa-offer', partnerId: 'demo-nexa', title: en ? 'A 30-day pilot' : '30 günlük pilot çalışma', summary: en ? 'Explore your automation needs together.' : 'Otomasyon ihtiyacınızı birlikte test edin.', eligibility: en ? 'Companies evaluating workflow automation.' : 'İş akışı otomasyonu değerlendiren şirketler.', scope: en ? 'A limited pilot with a mutually agreed scope.' : 'Karşılıklı belirlenecek sınırlı bir pilot çalışma.'},
  ].map((campaign) => ({...campaign, active: true, featured: true, demo: true, terms: en ? 'Illustrative offer only; no real commercial commitment.' : 'Bu avantaj temsilidir; gerçek bir ticari taahhüt içermez.'}))
  return {settings: null, partners, campaigns, demo: true}
}
