export type OperationLang = "tr" | "en";

export type OperationLocalizedText = {
  tr: string;
  en: string;
};

export type OperationCard = {
  title: OperationLocalizedText;
  body: OperationLocalizedText;
};

export type OperationFaq = {
  question: OperationLocalizedText;
  answer: OperationLocalizedText;
};

export type OperationEvidence = {
  title: OperationLocalizedText;
  body: OperationLocalizedText;
};

export type OperationContent = {
  slug: string;
  label: OperationLocalizedText;
  primaryParent: string;
  seoTitle: OperationLocalizedText;
  metaDescription: OperationLocalizedText;
  heroTitle: OperationLocalizedText;
  heroDescription: OperationLocalizedText;
  queryThemes: OperationLocalizedText[];
  snapshot: {
    what: OperationLocalizedText;
    whoFor: OperationLocalizedText;
    manages: OperationLocalizedText;
    outcome: OperationLocalizedText;
  };
  problems: OperationCard[];
  scope: OperationCard[];
  process: OperationCard[];
  evidence: OperationEvidence[];
  decisions: OperationFaq[];
  faq: OperationFaq[];
  relatedSlugs: string[];
  cta: {
    title: OperationLocalizedText;
    description: OperationLocalizedText;
    label: OperationLocalizedText;
  };
};

const googleAdsManagement: OperationContent = {
  slug: "google-ads-management",
  label: {
    tr: "Google Ads Yönetimi",
    en: "Google Ads Management",
  },
  primaryParent: "performance-marketing",
  seoTitle: {
    tr: "Google Ads Yönetimi ve Google Reklam Ajansı | Sellf Media",
    en: "Google Ads Management & PPC Agency | Sellf Media",
  },
  metaDescription: {
    tr: "Search, Performance Max, Shopping ve YouTube kampanyalarını dönüşüm verisi, bütçe kontrolü ve sürekli optimizasyonla yöneten Google Ads hizmeti.",
    en: "Google Ads management across Search, Performance Max, Shopping and YouTube, built around conversion data, budget control and continuous optimization.",
  },
  heroTitle: {
    tr: "Google Ads Yönetimi",
    en: "Google Ads Management",
  },
  heroDescription: {
    tr: "Search, Performance Max, Shopping ve gerektiğinde YouTube/Display kampanyalarını tek tek reklam metriklerine değil; nitelikli talep, dönüşüm ve ticari sonuca göre yönetiyoruz.",
    en: "We manage Search, Performance Max, Shopping and, where relevant, YouTube or Display around qualified demand, conversion quality and commercial outcomes rather than isolated ad metrics.",
  },
  queryThemes: [
    { tr: "Google Ads yönetimi", en: "Google Ads management" },
    { tr: "Google reklam ajansı", en: "Google Ads agency" },
    { tr: "Performance Max yönetimi", en: "Performance Max management" },
    { tr: "Google Shopping reklamları", en: "Google Shopping ads management" },
  ],
  snapshot: {
    what: {
      tr: "Google Ads yönetimi; hesabın ve dönüşüm ölçümünün denetlenmesi, kampanya mimarisinin kurulması, Search/PMax/Shopping gibi kampanyaların yürütülmesi ve bütçenin gerçek iş hedeflerine göre sürekli optimize edilmesidir.",
      en: "Google Ads management covers account and conversion-measurement review, campaign architecture, execution across formats such as Search, PMax and Shopping, and ongoing budget optimization against real business goals.",
    },
    whoFor: {
      tr: "Google üzerinden satış, lead, teklif talebi veya mağaza trafiği üretmek isteyen; ancak harcama ile ticari sonuç arasındaki ilişkiyi daha net görmek isteyen şirketler için uygundur.",
      en: "It is designed for companies using Google to generate sales, leads, enquiries or store demand and that need a clearer relationship between media spend and commercial results.",
    },
    manages: {
      tr: "Hesap denetimi, kampanya yapısı, anahtar kelime ve search term yönetimi, bütçe/teklif stratejisi, kreatif girdiler, Merchant Center ve feed koordinasyonu, conversion tracking ve performans raporlaması kapsamın parçası olabilir.",
      en: "Scope can include account audits, campaign structure, keyword and search-term management, budgets and bidding, creative inputs, Merchant Center and feed coordination, conversion tracking and performance reporting.",
    },
    outcome: {
      tr: "Amaç daha fazla tıklama almak değil; israfı azaltmak, doğru talebi yakalamak, dönüşüm kalitesini görünür hale getirmek ve ölçeklenebilir bir paid-search sistemi kurmaktır.",
      en: "The goal is not simply more clicks. It is to reduce waste, capture the right demand, make conversion quality visible and build a paid-search system that can scale responsibly.",
    },
  },
  problems: [
    {
      title: { tr: "Harcama var, nitelikli dönüşüm yok", en: "Spend is rising, qualified conversions are not" },
      body: { tr: "Tıklamalar artarken satış, lead kalitesi veya gelir aynı hızda büyümüyor olabilir. Kampanya hedefleri ve conversion sinyalleri yeniden okunur.", en: "Clicks may be growing while sales, lead quality or revenue do not. Campaign goals and conversion signals are reviewed together." },
    },
    {
      title: { tr: "Brand ve non-brand talep birbirine karışıyor", en: "Brand and non-brand demand are blurred" },
      body: { tr: "Markayı zaten arayan kullanıcılarla yeni talebi aynı performans havuzunda değerlendirmek gerçek incremental büyümeyi saklayabilir.", en: "Combining people already searching for the brand with new demand can hide the true incremental contribution of paid search." },
    },
    {
      title: { tr: "PMax çalışıyor ama nedenini açıklamak zor", en: "PMax is running, but the why is unclear" },
      body: { tr: "Performance Max; hedefler, asset grupları, feed, audience sinyalleri ve conversion kalitesi birlikte okunmadan yalnızca ROAS ekranından yönetilmez.", en: "Performance Max should not be managed from one ROAS number alone; goals, asset groups, feeds, audience signals and conversion quality need to be read together." },
    },
    {
      title: { tr: "Conversion tracking güvenilir değil", en: "Conversion tracking cannot be trusted" },
      body: { tr: "Eksik, tekrarlanan veya ticari değeri farklı aksiyonların aynı hedef gibi sayılması bidding sistemini yanlış sinyallerle besleyebilir.", en: "Missing, duplicated or commercially unequal actions treated as the same goal can feed bidding systems with poor signals." },
    },
    {
      title: { tr: "Shopping ve ürün feed'i performansı sınırlıyor", en: "Shopping performance is constrained by the product feed" },
      body: { tr: "Başlık, kategori, ürün verisi, stok ve Merchant Center sorunları reklam optimizasyonundan önce çözülmesi gereken performans engelleri olabilir.", en: "Titles, categories, product data, stock signals and Merchant Center issues can become performance constraints before media optimization even begins." },
    },
    {
      title: { tr: "Bütçe doğru kampanyaya gitmiyor", en: "Budget is not reaching the right campaigns" },
      body: { tr: "Bütçe dağılımı; marj, satış değeri, lead kalitesi, talep seviyesi ve büyüme hedefleriyle birlikte değerlendirilir.", en: "Budget allocation is evaluated against margin, sales value, lead quality, demand levels and growth priorities." },
    },
  ],
  scope: [
    {
      title: { tr: "Search Ads", en: "Search Ads" },
      body: { tr: "Yüksek niyetli aramalar, keyword yapısı, match type, search terms, negatif kelimeler ve reklam mesajları üzerinden yönetilir.", en: "High-intent queries are managed through keyword structure, match types, search terms, negatives and ad messaging." },
    },
    {
      title: { tr: "Performance Max", en: "Performance Max" },
      body: { tr: "PMax kampanyaları hedef, feed, asset group, audience signal, bütçe ve conversion value yapısıyla birlikte kurgulanır.", en: "PMax is structured around goals, feeds, asset groups, audience signals, budgets and conversion value." },
    },
    {
      title: { tr: "Google Shopping & Merchant Center", en: "Google Shopping & Merchant Center" },
      body: { tr: "E-ticarette ürün kataloğu, Merchant Center, feed sağlığı ve Shopping/PMax ürün yapısı performans sistemiyle bağlanır.", en: "For e-commerce, product catalogs, Merchant Center, feed health and Shopping or PMax product structure are connected to the performance system." },
    },
    {
      title: { tr: "YouTube & Display", en: "YouTube & Display" },
      body: { tr: "Talep yaratma, remarketing veya belirli funnel aşamalarında anlamlıysa YouTube ve Display kampanyaları plana dahil edilir.", en: "YouTube and Display are included where they make sense for demand generation, remarketing or defined funnel stages." },
    },
    {
      title: { tr: "Dönüşüm Ölçümü", en: "Conversion Measurement" },
      body: { tr: "Google Ads conversion actions, GA4/GTM ve gerektiğinde server-side tracking yapısı bidding kararlarını besleyecek şekilde kontrol edilir.", en: "Google Ads conversion actions, GA4/GTM and, where relevant, server-side tracking are reviewed so bidding decisions use meaningful signals." },
    },
    {
      title: { tr: "Bidding & Budget", en: "Bidding & Budget" },
      body: { tr: "CPA, ROAS veya conversion value hedefleri iş modeline göre belirlenir; bütçe değişiklikleri ölçüm ve talep kapasitesiyle birlikte yönetilir.", en: "CPA, ROAS or conversion-value goals are selected around the business model, while budget changes are managed against measurement quality and demand capacity." },
    },
    {
      title: { tr: "Search Term & Negative Yönetimi", en: "Search Term & Negative Management" },
      body: { tr: "Gerçek kullanıcı sorguları düzenli olarak analiz edilir; alakasız veya düşük değerli talebin bütçe tüketmesi sınırlandırılır.", en: "Real user queries are reviewed regularly so irrelevant or low-value demand does not consume disproportionate budget." },
    },
    {
      title: { tr: "Landing Page & Funnel Geri Bildirimi", en: "Landing Page & Funnel Feedback" },
      body: { tr: "Sorun reklam hesabının dışında ise landing page, form, checkout veya teklif akışındaki sürtünme ilgili Sellf operasyonlarına geri beslenir.", en: "When the constraint sits outside the ad account, friction in landing pages, forms, checkout or offer flows is fed into the relevant Sellf operations." },
    },
  ],
  process: [
    {
      title: { tr: "Account & Demand Audit", en: "Account & Demand Audit" },
      body: { tr: "Mevcut kampanyalar, search terms, bütçeler, bidding, landing page'ler ve talep yapısı birlikte incelenir.", en: "Existing campaigns, search terms, budgets, bidding, landing pages and demand patterns are reviewed together." },
    },
    {
      title: { tr: "Measurement Verification", en: "Measurement Verification" },
      body: { tr: "Hangi conversion'ın gerçekten değerli olduğu, tracking'in doğru çalışıp çalışmadığı ve hangi sinyallerin bidding'e girdiği doğrulanır.", en: "We verify which conversions actually matter, whether tracking is reliable and which signals are being used for bidding." },
    },
    {
      title: { tr: "Campaign Architecture", en: "Campaign Architecture" },
      body: { tr: "Brand/non-brand, ürün grupları, coğrafya, funnel ve hedef tipine göre kampanya mimarisi oluşturulur veya sadeleştirilir.", en: "Campaign architecture is built or simplified around brand versus non-brand demand, product groups, geography, funnel stage and objective." },
    },
    {
      title: { tr: "Build & Launch", en: "Build & Launch" },
      body: { tr: "Keyword, audience, feed, asset, reklam metni, bütçe ve bidding katmanları kontrollü biçimde devreye alınır.", en: "Keywords, audiences, feeds, assets, ad copy, budgets and bidding layers are launched in a controlled structure." },
    },
    {
      title: { tr: "Optimization Rhythm", en: "Optimization Rhythm" },
      body: { tr: "Search term kalitesi, budget pacing, conversion mix, creative/feed performansı ve kampanya sinyalleri düzenli olarak optimize edilir.", en: "Search-term quality, budget pacing, conversion mix, creative or feed performance and campaign signals are optimized on a recurring rhythm." },
    },
    {
      title: { tr: "Commercial Review & Scale", en: "Commercial Review & Scale" },
      body: { tr: "Sonuçlar yalnızca platform metrikleriyle değil, lead kalitesi, satış değeri ve iş hedefleriyle birlikte okunarak ölçekleme kararı verilir.", en: "Scaling decisions are made by reading platform metrics alongside lead quality, sales value and wider business goals." },
    },
  ],
  evidence: [
    {
      title: { tr: "Fizyohol", en: "Fizyohol" },
      body: { tr: "Fizyohol performans çalışmasında paid acquisition, landing page ve conversion yapısı birlikte ele alındı. Portföy kaydındaki sonuçlar daha geniş funnel çalışmasının çıktılarıdır; yalnızca Google Ads'e atfedilmez.", en: "Fizyohol's performance work connected paid acquisition, landing pages and conversion architecture. Portfolio outcomes belong to the broader funnel engagement and are not presented as Google Ads-only results." },
    },
    {
      title: { tr: "Canias", en: "Canias" },
      body: { tr: "Canias'ta search/programmatic, outreach ve CRM geri-besleme sinyalleri aynı B2B revenue sistemi içinde değerlendirildi; kanal performansı yalnız başına değil satış sonucu üzerinden okundu.", en: "For Canias, search and programmatic media, outreach and CRM feedback signals were evaluated inside one B2B revenue system rather than judging channels in isolation." },
    },
    {
      title: { tr: "Evepack", en: "Evepack" },
      body: { tr: "Evepack çalışmasında tracking, funnel, CRM ve satış yapısının birlikte yeniden düzenlenmesi paid-media kararlarının daha doğru ticari sinyallerle alınmasını destekledi.", en: "Evepack's work connected tracking, funnel, CRM and sales architecture so paid-media decisions could use stronger commercial signals." },
    },
  ],
  decisions: [
    {
      question: { tr: "Google Ads'i içeride yönetmek mi, ajansla çalışmak mı?", en: "In-house Google Ads management or an agency?" },
      answer: { tr: "İç ekipte yeterli medya, measurement ve optimizasyon kapasitesi varsa yönetim içeride kalabilir. Ajans modeli; uzmanlık açığı, ölçekleme ihtiyacı veya reklam hesabının CRM, feed ve funnel gibi başka sistemlerle birlikte yönetilmesi gerektiğinde daha anlamlı hale gelir.", en: "In-house can work when the team has enough media, measurement and optimization capability. An agency becomes more useful when specialist capacity is missing, scaling is needed or the ad account must be connected with CRM, feeds and the wider funnel." },
    },
    {
      question: { tr: "Performance Max her hesap için doğru mu?", en: "Is Performance Max right for every account?" },
      answer: { tr: "Hayır. PMax güçlü bir campaign type olabilir ancak hedef kalitesi, conversion tracking, asset/feed yapısı ve yeterli veri olmadan otomasyon tek başına strateji değildir. Search, Shopping veya diğer kampanya tipleriyle rolü hesaba göre belirlenir.", en: "No. PMax can be powerful, but automation is not a strategy by itself. Its role depends on conversion quality, measurement, assets or feeds, available data and how it complements Search, Shopping or other campaign types." },
    },
    {
      question: { tr: "Google Ads sorunu aslında landing page sorunuysa ne olur?", en: "What if the Google Ads problem is actually the landing page?" },
      answer: { tr: "Reklam optimizasyonuyla çözülemeyen friction ayrı tutulmaz. Mesaj eşleşmesi, sayfa hızı, form, teklif veya checkout kaynaklı sorunlar Conversion & Funnel Optimization veya ilgili dijital ürün operasyonlarına bağlanır.", en: "Friction that cannot be fixed inside the ad account is not ignored. Messaging, page speed, forms, offers or checkout issues are connected to Conversion & Funnel Optimization or the relevant digital-product operation." },
    },
    {
      question: { tr: "Google Ads performansı hangi KPI ile değerlendirilir?", en: "Which KPI should Google Ads be judged on?" },
      answer: { tr: "Tek bir evrensel KPI yoktur. E-ticarette ROAS ve contribution economics; lead generation'da CPA, lead kalitesi ve satışa dönüşüm; farklı modellerde conversion value veya gelir sinyalleri birlikte değerlendirilebilir.", en: "There is no universal KPI. E-commerce may emphasize ROAS and contribution economics; lead generation may require CPA, lead quality and sales conversion; other models may prioritize conversion value or revenue signals." },
    },
  ],
  faq: [
    {
      question: { tr: "Google Ads yönetimi hangi kampanya türlerini kapsıyor?", en: "Which campaign types are included in Google Ads management?" },
      answer: { tr: "İhtiyaca göre Search, Performance Max, Shopping, YouTube, Display ve remarketing kampanyaları yönetilebilir. Her hesapta bütün kampanya türlerini açmak yerine iş hedefi ve talep yapısına uygun kombinasyon seçilir.", en: "Depending on the account, management can include Search, Performance Max, Shopping, YouTube, Display and remarketing. We do not open every campaign type by default; the mix follows the business objective and demand structure." },
    },
    {
      question: { tr: "Google Ads conversion tracking kurulumunu da yapıyor musunuz?", en: "Do you also set up Google Ads conversion tracking?" },
      answer: { tr: "Evet, ihtiyaç varsa Google Ads conversion actions, GA4/GTM ve ilgili ölçüm altyapısı kapsamın parçası olabilir. Amaç bidding sistemine yalnızca anlamlı ve doğrulanmış conversion sinyalleri göndermektir.", en: "Yes. Where needed, Google Ads conversion actions, GA4/GTM and related measurement infrastructure can be part of the scope so bidding systems receive meaningful, verified conversion signals." },
    },
    {
      question: { tr: "Performance Max ve Google Shopping yönetimi dahil mi?", en: "Are Performance Max and Google Shopping included?" },
      answer: { tr: "E-ticaret veya ürün kataloğu olan hesaplarda PMax, Shopping, Merchant Center ve ürün feed'i birlikte değerlendirilebilir. Feed'in kendisi daha kapsamlı operasyon gerektiriyorsa Product Feed Management & Optimization ile bağlanır.", en: "For e-commerce or catalog businesses, PMax, Shopping, Merchant Center and product feeds can be managed as one system. If the feed requires deeper operational work, it connects to Product Feed Management & Optimization." },
    },
    {
      question: { tr: "Google Ads optimizasyonu ne sıklıkta yapılır?", en: "How often is Google Ads optimized?" },
      answer: { tr: "Sabit bir 'her gün değişiklik' kuralı yerine hesabın veri hacmine ve öğrenme dönemine uygun ritim kullanılır. Search terms, bütçe, pacing, conversion mix, asset/feed performansı ve ticari sonuçlar düzenli olarak gözden geçirilir.", en: "Rather than forcing daily changes, the optimization rhythm follows data volume and learning periods. Search terms, budgets, pacing, conversion mix, asset or feed performance and commercial outcomes are reviewed regularly." },
    },
    {
      question: { tr: "Sadece lead sayısını mı optimize ediyorsunuz?", en: "Do you optimize only for lead volume?" },
      answer: { tr: "Hayır. Mümkün olduğunda lead'in niteliği, opportunity veya satışa dönüşümü gibi CRM sinyalleri de değerlendirilir. Daha fazla form doldurulması tek başına daha iyi performans anlamına gelmez.", en: "No. Where possible, CRM signals such as lead quality, opportunities and downstream sales are considered. More form submissions do not automatically mean better performance." },
    },
    {
      question: { tr: "Mevcut Google Ads hesabıyla çalışabilir misiniz?", en: "Can you work with an existing Google Ads account?" },
      answer: { tr: "Evet. Mevcut hesap önce audit edilir; işe yarayan yapı korunur, ölçüm ve kampanya mimarisindeki sorunlar önceliklendirilir. Sırf yeniden kurmak için çalışan kampanyalar sıfırlanmaz.", en: "Yes. Existing accounts are audited first. Working structures are preserved, while measurement and architecture issues are prioritized rather than rebuilding campaigns simply for the sake of starting over." },
    },
  ],
  relatedSlugs: [
    "marketing-attribution",
    "performance-creative",
    "google-performance-max-management",
    "google-shopping-ads-management",
    "landing-page-development",
    "ab-testing",
  ],
  cta: {
    title: {
      tr: "Google Ads hesabınızı reklam ekranından değil, büyüme sistemi olarak inceleyelim.",
      en: "Review your Google Ads account as a growth system, not just an ad dashboard.",
    },
    description: {
      tr: "Kampanya yapısı, ölçüm, bütçe ve conversion kalitesinin birlikte nasıl çalıştığını Sellf ekibiyle değerlendirin.",
      en: "Review how campaign architecture, measurement, budget and conversion quality work together with the Sellf team.",
    },
    label: {
      tr: "Google Ads Görüşmesi Planla →",
      en: "Schedule a Google Ads Review →",
    },
  },
};

export const operationContent: Record<string, OperationContent> = {
  [googleAdsManagement.slug]: googleAdsManagement,
};

export const operationSlugs = Object.keys(operationContent);

export function getOperationContent(slug: string): OperationContent | undefined {
  return operationContent[slug];
}
