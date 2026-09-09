import type { SolutionContent } from "@/data/SolutionContent";

export const solutionContentOverrides: Record<string, Partial<SolutionContent>> = {
  "integrated-consulting": {
    faq: [
      {
        question: { tr: "Entegre Danışmanlık ile klasik danışmanlık arasındaki fark nedir?", en: "How is Integrated Consulting different from traditional consulting?" },
        answer: { tr: "Klasik danışmanlık çoğunlukla analiz ve öneriyle sınırlıdır. Sellf Entegre Danışmanlık'ta strateji, operasyonların kurulması, ekip koordinasyonu, performans ölçümü ve sürekli optimizasyon aynı çalışma modelinin parçalarıdır.", en: "Traditional consulting often stops at analysis and recommendations. Sellf Integrated Consulting also covers execution, operational setup, team coordination, performance measurement and continuous optimization." }
      },
      {
        question: { tr: "BHS nedir?", en: "What is BHS?" },
        answer: { tr: "Brand Health Score, Sellf'in markanın mevcut durumunu ve büyüme kapasitesini finans, operasyon, ürün, fiyatlama, funnel, hedef kitle, pazar, rakipler ve veri altyapısı gibi alanlarda değerlendirdiği proprietary metodolojidir.", en: "Brand Health Score is Sellf's proprietary methodology for assessing current health and growth capacity across finance, operations, product, pricing, funnel, audiences, market positioning, competitors and data infrastructure." }
      },
      {
        question: { tr: "RGI nedir?", en: "What is RGI?" },
        answer: { tr: "Real Growth Index, kanal bazlı metriklerin ötesinde şirketin ticari, operasyonel ve marka tarafındaki gerçek büyümesini birlikte değerlendirmek için kullanılan Sellf ölçüm modelidir.", en: "Real Growth Index is Sellf's framework for evaluating real company growth beyond isolated channel metrics, including commercial, operational and brand impact." }
      },
      {
        question: { tr: "Sellf sonuç garantisi veriyor mu?", en: "Does Sellf guarantee results?" },
        answer: { tr: "Strateji kapsamında Taahhüt Edilen ve Öngörülen olmak üzere iki performans senaryosu oluşturulur. Taahhüt edilen performans sözleşme dönemi sonunda karşılanamazsa, ilgili sözleşme koşulları kapsamında toplam AHB üzerinden %10 geri ödeme mekanizması uygulanır.", en: "Sellf creates both a Committed and a Projected performance scenario. If the committed performance level is not reached by the end of the contractual period, a 10% reimbursement based on total AHB is applied subject to the relevant contractual terms." }
      },
      {
        question: { tr: "Mevcut ajanslarımız ve ekiplerimizle birlikte çalışabilir misiniz?", en: "Can Sellf work with our existing teams and agencies?" },
        answer: { tr: "Evet. Amaç mevcut ekipleri gereksiz yere değiştirmek değil; gerekli ekipleri ve partnerleri ortak büyüme stratejisi ve KPI mimarisi altında koordine etmektir.", en: "Yes. The objective is not necessarily to replace existing teams, but to coordinate them under the same growth strategy and KPI architecture." }
      }
    ]
  },
  "brand-strategy-branding": {
    seoTitle: { tr: "Marka Stratejisi, Kurumsal Kimlik ve Branding | Sellf Media", en: "Brand Strategy, Corporate Identity & Branding | Sellf Media" },
    metrics: [
      { value: { tr: "%50+", en: "50%+" }, label: { tr: "Impression bazlı pazar/görünürlük payı göstergelerinde yıllık ortalama artış", en: "Average annual increase in impression-based market / visibility-share indicators" } },
      { value: { tr: "%15", en: "15%" }, label: { tr: "Yıllık ortalama Brand Amplification artışı", en: "Average annual Brand Amplification increase" } },
      { value: { tr: "%9", en: "9%" }, label: { tr: "Yıllık ortalama advocacy artışı", en: "Average annual advocacy increase" } },
      { value: { tr: "7", en: "7" }, label: { tr: "2025'te oluşturulan brandbook ve tutarlı kurumsal kimlik sistemi", en: "New brandbooks and consistent corporate-identity systems created in 2025" } }
    ]
  },
  "performance-marketing": {
    metrics: [
      { value: { tr: "1,7", en: "1.7" }, label: { tr: "E-commerce markalarında marka başına ortalama ROI", en: "Average ROI per e-commerce brand" } },
      { value: { tr: "1,13", en: "1.13" }, label: { tr: "Genel marka portföyünde marka başına ortalama ROAS", en: "Average ROAS per brand across the wider portfolio" } },
      { value: { tr: "%7", en: "7%" }, label: { tr: "Yıllık ortalama medya harcaması düşüşü", en: "Average annual media-spend reduction" } },
      { value: { tr: "%20+", en: "20%+" }, label: { tr: "Yıllık ortalama CTR artışı", en: "Average annual CTR increase" } }
    ]
  },
  "growth-management-consulting": {
    metrics: [
      { value: { tr: "3×", en: "3×" }, label: { tr: "Yıllık ortalama verimlilik artışı", en: "Average annual efficiency improvement" } },
      { value: { tr: "17 Milyon TL", en: "TRY 17M" }, label: { tr: "Yıllık ortalama yönetim tasarrufu", en: "Average annual management savings" } },
      { value: { tr: "%4", en: "4%" }, label: { tr: "Marka başına ortalama FAVÖK artışı", en: "Average EBITDA increase per brand" } },
      { value: { tr: "%20", en: "20%" }, label: { tr: "Yönetim ve raporlama süreçlerinde ortalama hız kazanımı", en: "Average acceleration in management and reporting processes" } }
    ]
  },
  "offline-marketing-media": {
    metrics: [
      { value: { tr: "%3,56", en: "3.56%" }, label: { tr: "Yıllık açık hava görünürlük payı", en: "Annual Outdoor Visibility Share" } },
      { value: { tr: "$675K", en: "$675K" }, label: { tr: "Yıllık ortalama yönetilen açık hava medya bütçesi", en: "Average annual OOH media budget managed" } },
      { value: { tr: "23M", en: "23M" }, label: { tr: "Yıllık ortalama tahmini medya impression", en: "Average estimated annual media impressions" } },
      { value: { tr: "%12", en: "12%" }, label: { tr: "Offline medya ile ilişkilendirilen ortalama trafik artışı", en: "Average traffic lift associated with offline media" } }
    ]
  },
  "design-creative": {
    seoTitle: { tr: "Kreatif Ajans, Tasarım ve İçerik Üretimi | Sellf Media", en: "Creative Agency, Design & Content Production | Sellf Media" },
    statement: { tr: "İyi görünen değil, doğru çalışan kreatifler tasarlıyoruz.", en: "We create work that doesn't just look good. It works where it is used." },
    proofBrands: ["Evepack", "CANIAS", "Iamlovein", "Qashé", "Goldium", "Fizyohol", "Elite Hair", "Philips", "Colin's", "Sfera", "Grey Manner", "ASCE GYO", "GKC"],
    proofNotes: [
      { tr: "Bu solution için Sellf portfolio'sundaki çalışmaların tamamı proof olarak kullanılabilir. Tasarım tarafında case metninden çok mevcut Works görselleri ve videoları güçlü kanıt alanıdır.", en: "The full Sellf portfolio can serve as proof for this solution. For creative work, existing Works imagery and video are stronger evidence than unsupported case-detail claims." },
      { tr: "Branding kuralları koyar. Creative o kuralları yaşayan materyallere dönüştürür.", en: "Branding establishes the rules. Creative turns those rules into living brand assets." }
    ],
    cta: {
      title: { tr: "Markanız ne söylüyorsa, kreatifi de onu hissettirsin.", en: "Make every creative execution feel unmistakably like your brand." },
      description: { tr: "Sosyal medya, kampanya, video veya diğer kreatif ihtiyaçlarınızı Sellf ekibiyle değerlendirin.", en: "Schedule a conversation with the Sellf team to discuss your social, campaign, video or wider creative needs." },
      label: { tr: "Kreatif Projenizi Konuşalım →", en: "Discuss Your Creative Project →" }
    }
  },
  "pr-crisis-management": {
    seoTitle: { tr: "PR, İtibar ve Kriz İletişimi Yönetimi | Sellf Media", en: "PR, Reputation & Crisis Communications | Sellf Media" },
    proofBrands: ["Toys'R'Us Türkiye", "Dedeman Erzurum", "LVMH", "FUnodra"],
    proofNotes: [
      { tr: "Toys'R'Us Türkiye için pazara giriş iletişim kurgusu; Dedeman Erzurum için açılış ve lansman iletişimi; LVMH için villa projeleri kapsamında iletişim/PR; FUnodra için lansman iletişimi, seçilmiş gerçek engagement örnekleridir.", en: "Selected real engagements include Türkiye market-entry communications planning for Toys'R'Us, opening and launch communications for Dedeman Erzurum, communications/PR work related to LVMH villa projects, and launch communications for FUnodra." },
      { tr: "Sellf strategy, integration ve measurement katmanını yönetir; specialist media relations, press office ve PR execution gerektiğinde PR partnerimiz C-line delivery modeline dahil olur.", en: "Sellf leads strategy, integration and measurement; specialist media relations, press-office work and PR execution can be delivered with our PR partner C-line where required." },
      { tr: "Bu solution'da yeterince standartlaştırılmış benchmark datası olmadığı için yapay performans ortalamaları yayınlamıyoruz.", en: "We do not publish artificial performance averages for this solution because the available PR benchmark base is not sufficiently standardized." }
    ],
    faq: [
      { question: { tr: "Sellf bir PR ajansı mı?", en: "Is Sellf a PR agency?" }, answer: { tr: "Sellf PR & Kriz Yönetimi'ni daha geniş marka ve growth sistemi içinde yönetir. Strategy, positioning, measurement, integration ve kriz yapısı Sellf tarafından yönetilebilir; specialist media relations ve PR execution gereken projelerde PR partnerimiz C-line ile birlikte çalışılır.", en: "Sellf manages PR within a wider brand and growth system. Strategy, positioning, measurement, integration and crisis architecture can be led by Sellf, while specialist media-relations and PR execution can be supported by our PR partner C-line." } },
      { question: { tr: "C-line'ın projedeki rolü nedir?", en: "What role does C-line play?" }, answer: { tr: "Projenin ihtiyacına göre specialist PR, media relations, press office ve medya iletişimi taraflarında delivery modeline dahil olabilir.", en: "Depending on the engagement, C-line can support specialist PR, media relations, press-office operations and media communications." } },
      { question: { tr: "PR'ın başarısı nasıl ölçülür?", en: "How do you measure PR?" }, answer: { tr: "Media coverage ve estimated reach gibi klasik metriklerin yanında branded search, website traffic, referral traffic, sentiment, share of voice ve digital response sinyalleri değerlendirilebilir.", en: "Traditional coverage metrics can be combined with branded search, website traffic, referral traffic, sentiment, share of voice and digital-response signals." } },
      { question: { tr: "Kriz çıkmadan önce hazırlık yapılabilir mi?", en: "Can you prepare for a crisis before it happens?" }, answer: { tr: "Evet. Risk senaryoları, spokesperson yapısı, approval chains, response workflows ve monitoring sistemleri önceden hazırlanabilir.", en: "Yes. Risk scenarios, spokesperson systems, approval chains, response workflows and monitoring can be prepared in advance." } },
      { question: { tr: "Sellf custom social-listening aracı geliştirebilir mi?", en: "Can Sellf build a custom social-listening tool?" }, answer: { tr: "Evet. Standart araçlar yeterli değilse Digital Products & Software Development tarafıyla scraper, dashboard, alerting veya custom monitoring sistemi geliştirilebilir.", en: "Yes. If standard tools are insufficient, bespoke scraping, dashboards, alerting or monitoring systems can be developed through Digital Products & Software Development." } }
    ],
    cta: {
      title: { tr: "İletişim kriz başladığında başlamamalı.", en: "Communication shouldn't begin when the crisis does." },
      description: { tr: "İtibarınızı, yaklaşan lansmanınızı veya kriz hazırlığı ihtiyacınızı Sellf ekibiyle değerlendirin.", en: "Schedule a conversation with the Sellf team to discuss your reputation, upcoming launch or crisis-preparedness needs." },
      label: { tr: "PR & İtibar Görüşmesi Planla →", en: "Schedule a PR & Reputation Meeting →" }
    }
  },
  "seo-organic-growth": {
    seoTitle: { tr: "SEO ve Organik Büyüme Danışmanlığı | Sellf Media", en: "SEO & Organic Growth Consulting | Sellf Media" },
    statement: { tr: "Trafik satın almak yerine, dijital varlığınızın değerini büyütüyoruz.", en: "Instead of continuously buying traffic, we grow the value of your digital asset." },
    metrics: [
      { value: { tr: "%230", en: "230%" }, label: { tr: "Yıllık ortalama organik trafik artışı", en: "Average Annual Organic Traffic Growth" } },
      { value: { tr: "%78", en: "78%" }, label: { tr: "Ortalama ranking improvement", en: "Average Ranking Improvement" } },
      { value: { tr: "%35,6", en: "35.6%" }, label: { tr: "Ortalama organik revenue artışı", en: "Average Organic Revenue Growth" } },
      { value: { tr: "%154", en: "154%" }, label: { tr: "Ortalama keyword visibility artışı", en: "Average Keyword Visibility Growth" } }
    ],
    proofBrands: ["Sfera", "Monstera", "Gotradego", "Turkish International Investment Bank — TIIB", "Zühre Ana"],
    proofNotes: [
      { tr: "Spesifik marka sonuçlarını yalnızca doğrulanmış case data bulunduğunda markaya atfediyoruz; aggregate benchmark'lar Sellf'in geçmiş SEO çalışmalarının ortalamalarıdır.", en: "Brand-specific performance is attributed only where documented case data exists; the benchmark band represents historical averages across Sellf SEO engagements." },
      { tr: "GEO Sellf için yeni başlayan bir capability'dir; klasik SEO benchmark'ları GEO performansına atfedilmez.", en: "GEO is a newer Sellf capability; established SEO benchmarks are not attributed to GEO performance." }
    ],
    cta: {
      title: { tr: "Reklama para yatırmayı bıraktığınızda da bulunabilir olun.", en: "Stay discoverable even when you stop paying for every visit." },
      description: { tr: "Web sitenizin organik büyüme kapasitesini, teknik sağlığını ve search fırsatlarını Sellf ekibiyle değerlendirin.", en: "Schedule a conversation with the Sellf team to evaluate your website's organic growth potential, technical health and search opportunities." },
      label: { tr: "SEO Görüşmesi Planla →", en: "Schedule an SEO Growth Meeting →" }
    }
  },
  "conversion-funnel-optimization": {
    seoTitle: { tr: "CRO, Funnel ve Dönüşüm Optimizasyonu | Sellf Media", en: "CRO, Funnel & Conversion Optimization | Sellf Media" },
    statement: { tr: "Funnel optimizasyonu bir sayfayı değil, müşteri edinimi ekonomisini optimize etmektir.", en: "Funnel optimization is not page optimization. It is customer-acquisition economics optimization." },
    metrics: [
      { value: { tr: "1,7", en: "1.7" }, label: { tr: "Yıllık Ortalama ROI", en: "Average Annual ROI" } },
      { value: { tr: "%4", en: "4%" }, label: { tr: "Yıllık Ortalama Simetrik Funnel Genişlemesi", en: "Average Annual Symmetric Funnel Expansion" } },
      { value: { tr: "%210", en: "210%" }, label: { tr: "Yıllık Ortalama Asimetrik Funnel Genişlemesi", en: "Average Annual Asymmetric Funnel Expansion" } },
      { value: { tr: "%50+", en: "50%+" }, label: { tr: "Yıllık Ortalama Conversion Rate Artışı", en: "Average Annual Conversion Rate Increase" } },
      { value: { tr: "%12", en: "12%" }, label: { tr: "Lead-to-Sale Conversion Artışı", en: "Lead-to-Sale Conversion Increase" } },
      { value: { tr: "%20", en: "20%" }, label: { tr: "Yıllık Ortalama Checkout Dropout Düşüşü", en: "Average Annual Checkout Dropout Reduction" } }
    ],
    proofBrands: ["CANIAS", "Iamlovein", "NutralEN", "Kervan Gıda", "Philips", "MMA Global", "Evepack"],
    proofNotes: [
      { tr: "Sellf funnel'ı website ile sınırlamaz; Awareness → Intent → Consideration → Conversion → Retention → Advocacy yolculuğunu kanallar, CRM ve satış süreçleriyle birlikte haritalandırır.", en: "Sellf does not limit the funnel to the website; Awareness → Intent → Consideration → Conversion → Retention → Advocacy is mapped across channels, CRM and sales processes." },
      { tr: "Funnel'ı markaya uydururuz. Markayı hazır bir funnel şablonuna uydurmayız.", en: "We adapt the funnel to the brand. We do not force the brand into a prebuilt funnel template." }
    ],
    cta: {
      title: { tr: "Daha fazla trafik almadan önce, mevcut funnel'ın ne kadarını kaybettiğinizi bulun.", en: "Before buying more traffic, find out how much of your current funnel you're losing." },
      description: { tr: "Customer journey, conversion noktaları ve büyüme darboğazlarınızı Sellf ekibiyle değerlendirin.", en: "Schedule a conversation with the Sellf team to evaluate your customer journey, conversion points and growth bottlenecks." },
      label: { tr: "Funnel Optimizasyon Görüşmesi Planla →", en: "Schedule a Funnel Optimization Meeting →" }
    }
  },
  "ecommerce-growth": {
    seoTitle: { tr: "E-Ticaret ve Pazaryeri Yönetimi | Sellf Media", en: "E-Commerce & Marketplace Management | Sellf Media" },
    statement: { tr: "E-commerce'te asıl hedef daha fazla sipariş değil; daha güçlü bir ticaret ekonomisidir.", en: "The real objective of e-commerce is not simply more orders. It is a stronger commercial system." },
    metrics: [
      { value: { tr: "%8", en: "8%" }, label: { tr: "Ortalama FAVÖK artışı", en: "Average EBITDA Improvement" } },
      { value: { tr: "$1,15M", en: "$1.15M" }, label: { tr: "Marka başına ortalama yıllık e-ticaret cirosu", en: "Average Annual E-Commerce Revenue per Brand" } },
      { value: { tr: "%17", en: "17%" }, label: { tr: "Marka başına ortalama yıllık marketplace revenue artışı", en: "Average Annual Marketplace Revenue Growth per Brand" } },
      { value: { tr: "%30", en: "30%" }, label: { tr: "Marka başına ortalama LTV artışı", en: "Average LTV Improvement per Brand" } },
      { value: { tr: "1:4", en: "1:4" }, label: { tr: "Ortalama yıllık e-ticaret ROI", en: "Average Annual E-Commerce ROI" } }
    ],
    proofBrands: ["S'hevec", "Lions Darwin", "Zühre Ana", "Rollbab", "NutralEN", "Schnitzel Landmann", "LVMH", "Philips", "Farmhouse", "Argeron"],
    proofNotes: [
      { tr: "Bu liste en güçlü seçilmiş e-commerce referanslarını gösterir; marka bazında spesifik sonuçlar yalnızca doğrulanmış proje verisi olduğunda yayınlanır.", en: "This is a selected proof set of strong e-commerce references; brand-specific performance claims are published only where project data is documented." },
      { tr: "Sellf e-commerce'ü mağaza yönetimi değil, ürün → stok → fiyat → marketplace → trafik → conversion → CRM → retention → kârlılık zincirinin birlikte yönetildiği ticaret sistemi olarak ele alır.", en: "Sellf treats e-commerce as a commerce system connecting product → inventory → pricing → marketplace → traffic → conversion → CRM → retention → profitability, not simply store management." }
    ],
    cta: {
      title: { tr: "Online satışınızı değil, e-commerce ekonominizi büyütün.", en: "Grow your e-commerce economics, not simply your online sales." },
      description: { tr: "Mağazanızı, pazaryeri operasyonlarınızı, fiyatlamanızı, retention sisteminizi ve e-commerce kârlılığınızı Sellf ekibiyle değerlendirin.", en: "Schedule a conversation with the Sellf team to evaluate your store, marketplaces, pricing, retention and profitability." },
      label: { tr: "E-Ticaret Büyüme Görüşmesi Planla →", en: "Schedule an E-Commerce Growth Meeting →" }
    }
  }
};
