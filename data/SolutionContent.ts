export type SupportedSolutionLang = "tr" | "en";

export type LocalizedText = {
  tr: string;
  en: string;
};

export type SolutionMetric = {
  value: LocalizedText;
  label: LocalizedText;
  note?: LocalizedText;
};

export type SolutionApproachStep = {
  title: LocalizedText;
  body: LocalizedText;
};

export type SolutionFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type SolutionOperations = {
  A: string[];
  B: string[];
  C: string[];
};

export type SolutionContent = {
  seoTitle: LocalizedText;
  metaDescription: LocalizedText;
  statement: LocalizedText;
  overview: LocalizedText[];
  outcomeBullets: LocalizedText[];
  metrics: SolutionMetric[];
  metricNote: LocalizedText;
  audience: LocalizedText[];
  approachIntro: LocalizedText;
  approachSteps: SolutionApproachStep[];
  proofBrands: string[];
  proofNotes: LocalizedText[];
  operations: SolutionOperations;
  faq: SolutionFaq[];
  relatedSlugs: string[];
  cta: {
    title: LocalizedText;
    description: LocalizedText;
    label: LocalizedText;
  };
};

export const solutionContent: Record<string, SolutionContent> = {
  "integrated-consulting": {
    "seoTitle": {
      "tr": "Entegre Büyüme Danışmanlığı ve Strateji | Sellf Media",
      "en": "Integrated Growth Consulting & Strategy | Sellf Media"
    },
    "metaDescription": {
      "tr": "Finans, operasyon, pazarlama, lojistik ve veriyi tek büyüme planında birleştiren Sellf Entegre Danışmanlık ile 1, 2 ve 5 yıllık büyüme stratejinizi kurun.",
      "en": "Connect finance, operations, marketing, logistics and data through Sellf Integrated Consulting and build a measurable 1, 2 or 5-year growth strategy."
    },
    "statement": {
      "tr": "Stratejiyi yazıp teslim etmiyoruz. Stratejinin çalışmasından da sorumluluk alıyoruz.",
      "en": "We do not deliver a strategy and walk away. We take responsibility for making the strategy work."
    },
    "overview": [
      {
        "tr": "Entegre Danışmanlık; finans, operasyon, lojistik, pazarlama ve veri tarafındaki kararları tek bir büyüme sistemi içinde hizalayan, şirketin genel performansına bakan uçtan uca bir danışmanlık modelidir.",
        "en": "Integrated Consulting aligns financial, operational, logistics, marketing and data decisions inside one growth system, with responsibility focused on the performance of the business as a whole."
      },
      {
        "tr": "Sellf; öncelikli KPI'ları belirler, mevcut yapıyı Brand Health Score ile değerlendirir, bütçe ve sorumlulukları tanımlar ve 1, 2 ve 5 yıllık yol haritasını yalnızca bir strateji belgesi olarak değil, uygulanabilir bir işletim planı olarak kurgular.",
        "en": "Sellf defines priority KPIs, assesses the current structure through Brand Health Score, maps budgets and responsibilities, and turns the 1, 2 and 5-year roadmap into an executable operating plan rather than a strategy document that sits on a shelf."
      }
    ],
    "outcomeBullets": [
      {
        "tr": "Pazarlama, satış, operasyon ve finans kararlarını aynı büyüme hedeflerine bağlamak.",
        "en": "Align marketing, sales, operations and financial decisions around the same growth objectives."
      },
      {
        "tr": "Bütçe, kaynak ve önceliklerin şirket geneli ROI perspektifiyle yönetilmesini sağlamak.",
        "en": "Manage budgets, resources and priorities through a company-wide ROI perspective."
      },
      {
        "tr": "Haftalık, aylık ve dönemsel ölçüm sistemleriyle karar kalitesini ve görünürlüğü artırmak.",
        "en": "Improve decision quality and visibility through weekly, monthly and periodic measurement systems."
      }
    ],
    "metrics": [
      {
        "value": { "tr": "1,7", "en": "1.7" },
        "label": { "tr": "Ortalama ROI", "en": "Average ROI" }
      },
      {
        "value": { "tr": "$4,5M", "en": "$4.5M" },
        "label": { "tr": "Ortalama yıllık gelir artışı", "en": "Average annual revenue increase" }
      },
      {
        "value": { "tr": "%23", "en": "23%" },
        "label": { "tr": "Ortalama yıllık verimlilik artışı", "en": "Average annual efficiency increase" }
      },
      {
        "value": { "tr": "%4", "en": "4%" },
        "label": { "tr": "Ortalama RGI", "en": "Average RGI" }
      }
    ],
    "metricNote": {
      "tr": "Rakamlar geçmiş müşteri çalışmalarının ortalama sonuçlarıdır; garanti değildir ve sektör, bütçe, başlangıç seviyesi ile uygulama kapsamına göre değişir.",
      "en": "Figures are historical averages from client work, not guarantees, and vary by industry, budget, starting point and implementation scope."
    },
    "audience": [
      {
        "tr": "Orta ve büyük ölçekli, büyümesini tek bir strateji ve operasyon sistemi altında yönetmek isteyen şirketler.",
        "en": "Mid-sized and large companies that want to manage growth under one strategy and operating system."
      },
      {
        "tr": "Yeni pazara giren veya mevcut organizasyonunda koordinasyon, fiyatlama, funnel, ölçüm ya da bütçe verimliliği sorunu yaşayan markalar.",
        "en": "Brands entering new markets or facing coordination, pricing, funnel, measurement or budget-efficiency problems."
      },
      {
        "tr": "Birden fazla ajans, ekip veya kanal arasında parçalanmış büyüme süreçlerini tek karar mekanizmasında birleştirmek isteyen yönetimler.",
        "en": "Leadership teams that need to unify fragmented agencies, teams and channels under one decision system."
      }
    ],
    "approachIntro": {
      "tr": "Süreç danışmanlık raporuyla bitmez; ölçüm, uygulama koordinasyonu ve dönemsel yeniden planlama aynı modelin parçasıdır.",
      "en": "The process does not end with a consulting report; measurement, execution coordination and periodic replanning are part of the same model."
    },
    "approachSteps": [
      {
        "title": { "tr": "Önceliklendirme", "en": "Prioritization" },
        "body": { "tr": "Tanışma ve iş hedefleri üzerinden üç öncelikli KPI seçilir.", "en": "Three priority KPIs are selected through the initial business and growth review." }
      },
      {
        "title": { "tr": "Brand Health Score", "en": "Brand Health Score" },
        "body": { "tr": "Mevcut yapı, büyüme engelleri ve verimlilik açıkları BHS ile değerlendirilir.", "en": "The current system, growth constraints and efficiency gaps are assessed through BHS." }
      },
      {
        "title": { "tr": "Büyüme Mimarisi", "en": "Growth Architecture" },
        "body": { "tr": "Yaklaşık 3–4 haftalık çalışma ile bütçeler, sorumluluklar, always-on yapılar, takvim ve 1/2/5 yıllık yol haritası oluşturulur.", "en": "A roughly 3–4 week architecture phase defines budgets, ownership, always-on systems, calendars and the 1/2/5-year roadmap." }
      },
      {
        "title": { "tr": "Uygulama", "en": "Execution" },
        "body": { "tr": "Gerekli Sellf ekipleri, müşteri ekipleri ve partnerler aynı plan altında koordine edilir.", "en": "Relevant Sellf teams, client teams and partners are coordinated under the same plan." }
      },
      {
        "title": { "tr": "Ölçüm", "en": "Measurement" },
        "body": { "tr": "Haftalık çalışma ritmi ve aylık raporlama ile KPI'lar, bütçe ve uygulama performansı izlenir.", "en": "KPIs, budgets and execution performance are reviewed through weekly operating rhythms and monthly reporting." }
      },
      {
        "title": { "tr": "RGI İncelemesi", "en": "RGI Review" },
        "body": { "tr": "Üç aylık ve yıllık değerlendirmelerde Real Growth Index ile büyümenin kalitesi yeniden okunur.", "en": "Quarterly and annual reviews use the Real Growth Index to reassess the quality of growth." }
      }
    ],
    "proofBrands": ["Canias", "Iamlovein", "HeyNut", "Philips", "Sfera.ai", "Kervan Gıda"],
    "proofNotes": [
      {
        "tr": "Canias çalışmalarında prospect mapping, intent, paid media, outreach ve CRM geri-besleme döngüsü tek sistemde birleştirildi.",
        "en": "For Canias, prospect mapping, intent, paid media, outreach and CRM feedback loops were connected inside one system."
      },
      {
        "tr": "Iamlovein'in uluslararası genişlemesinde pazar, fulfillment, influencer/UGC ve geo-funnel adımları birlikte ele alındı.",
        "en": "Iamlovein's international expansion connected market setup, fulfillment, influencer/UGC and geo-funnel execution."
      },
      {
        "tr": "Philips çalışmasında dijital ve offline temas noktaları ölçüm ve ticari verimlilik perspektifiyle birlikte kurgulandı.",
        "en": "For Philips, digital and offline touchpoints were connected through a measurement and commercial-efficiency perspective."
      }
    ],
    "operations": {
      "A": ["Growth Strategy & Roadmapping", "Marketing Strategy", "Go-to-Market Strategy", "Marketing Operations", "Revenue Operations (RevOps)", "Marketing Automation", "Marketing Analytics & Dashboarding", "Market & Competitor Intelligence"],
      "B": ["Growth Audit & Growth Assessment", "Omnichannel Marketing Strategy", "Customer Journey Strategy", "Funnel Architecture", "CRM & Lifecycle Strategy", "MarTech Strategy", "Audience & Persona Strategy", "Value Proposition Strategy", "Experimentation & Growth Testing Strategy"],
      "C": ["Marketing Automation Strategy → Marketing Automation", "Measurement & Attribution Strategy → Marketing Attribution"]
    },
    "faq": [
      {
        "question": { "tr": "Entegre Danışmanlık ile Büyüme & Yönetim Danışmanlığı arasındaki fark nedir?", "en": "What is the difference between Integrated Consulting and Growth & Management Consulting?" },
        "answer": { "tr": "Entegre Danışmanlık şirketin büyüme sistemini geniş kapsamda ele alır ve uzun dönemli strateji ile operasyonu birlikte koordine eder. Büyüme & Yönetim Danışmanlığı ise fiyatlama, satış, kârlılık veya belirli bir yönetim problemi gibi daha spesifik bir ticari soruna odaklanır.", "en": "Integrated Consulting addresses the broader company growth system and connects long-term strategy with execution. Growth & Management Consulting focuses on a more specific commercial or management problem such as pricing, sales, profitability or a defined decision system." }
      },
      {
        "question": { "tr": "Brand Health Score ve RGI ne için kullanılıyor?", "en": "What are Brand Health Score and RGI used for?" },
        "answer": { "tr": "BHS mevcut yapıyı ve büyüme açıklarını başlangıçta okumak için, RGI ise Real Growth Index çerçevesinde büyümenin kalitesini dönemsel olarak değerlendirmek için kullanılır.", "en": "BHS is used to assess the starting structure and growth gaps, while RGI is used through the Real Growth Index framework to periodically evaluate the quality of growth." }
      },
      {
        "question": { "tr": "Bu hizmet hangi şirketler için daha uygundur?", "en": "Which companies are the best fit for this service?" },
        "answer": { "tr": "Tam kapsamlı model özellikle orta ve büyük ölçekli, birden fazla ekip veya fonksiyon arasında büyümeyi koordine etmek isteyen şirketlerde daha anlamlıdır.", "en": "The full-scope model is especially relevant for mid-sized and large companies that need to coordinate growth across multiple teams or business functions." }
      },
      {
        "question": { "tr": "Sonuçlar nasıl ölçülür?", "en": "How are results measured?" },
        "answer": { "tr": "Çalışma başında seçilen öncelikli KPI'lar, finansal sonuçlar, operasyonel verimlilik ve dönemsel RGI değerlendirmeleri birlikte izlenir.", "en": "Priority KPIs selected at the beginning are tracked alongside financial outcomes, operational efficiency and periodic RGI reviews." }
      }
    ],
    "relatedSlugs": ["growth-management-consulting", "performance-marketing", "conversion-funnel-optimization", "export-international-growth"],
    "cta": {
      "title": { "tr": "Büyüme sisteminizi birlikte tasarlayalım.", "en": "Let's design your growth system together." },
      "description": { "tr": "Şirketinizin büyüme mimarisini, önceliklerini ve ölçüm sistemini birlikte değerlendirelim.", "en": "Let's evaluate your growth architecture, priorities and measurement system together." },
      "label": { "tr": "Görüşme Planla →", "en": "Schedule a Meeting →" }
    }
  },
  "export-international-growth": {
    "seoTitle": { "tr": "İhracat ve Uluslararası Büyüme Danışmanlığı | Sellf Media", "en": "Export & International Growth Consulting | Sellf Media" },
    "metaDescription": { "tr": "Yeni ülke ve pazarlara girişinizi pazar araştırması, go-to-market, lojistik, finans, lokalizasyon ve büyüme stratejisiyle uçtan uca yönetin.", "en": "Enter and grow in new international markets with market research, go-to-market strategy, logistics, localization, finance and end-to-end execution." },
    "statement": { "tr": "Altyapıyı pazara girebilmek için, veriyi ise pazarda kazanabilmek için kullanıyoruz.", "en": "Infrastructure gets the business into the market. Data helps the brand win in it." },
    "overview": [
      { "tr": "İhracat & Uluslararası Büyüme; yeni bir ülkeye giriş kararını yalnızca pazar seçimi olarak değil, ticari, yasal, finansal, lojistik ve pazarlama bileşenleri olan bir işletim modeli olarak ele alır.", "en": "Export & International Growth treats entering a new country not simply as a market-selection exercise, but as an operating model combining commercial, legal, financial, logistics and marketing requirements." },
      { "tr": "Sellf hedef pazarı; fırsat büyüklüğü, rekabet, tüketici davranışı, kültür, ödeme altyapısı, partner yapısı ve go-to-market açısından analiz eder; gerekli uzman ve partnerleri aynı büyüme planı altında koordine eder.", "en": "Sellf evaluates the target market through opportunity size, competition, consumer behavior, culture, payment infrastructure, partner structure and go-to-market requirements, then coordinates the necessary specialists and partners under one growth plan." }
    ],
    "outcomeBullets": [
      { "tr": "Yanlış pazar veya yanlış giriş modeli riskini azaltmak.", "en": "Reduce the risk of choosing the wrong market or entry model." },
      { "tr": "Lokalizasyon, ticari altyapı ve pazarlama planını aynı zaman çizelgesinde kurmak.", "en": "Build localization, commercial infrastructure and marketing on the same timeline." },
      { "tr": "Pazara giriş sonrasında marka bilinirliği, satış ve pazar payını sistematik biçimde büyütmek.", "en": "Systematically grow awareness, sales and market share after market entry." }
    ],
    "metrics": [
      { "value": { "tr": "%7", "en": "7%" }, "label": { "tr": "Ortalama yıllık pazar payı artışı", "en": "Average annual market-share gain" } },
      { "value": { "tr": "%20", "en": "20%" }, "label": { "tr": "Ortalama yıllık marka bilinirliği artışı", "en": "Average annual brand-awareness increase" } },
      { "value": { "tr": "+$1,5M", "en": "+$1.5M" }, "label": { "tr": "Ortalama yıllık ek uluslararası gelir", "en": "Average annual additional international revenue" } },
      { "value": { "tr": "%10–15", "en": "10–15%" }, "label": { "tr": "Ortalama daha hızlı kurulum / GTM", "en": "Average faster setup / GTM" } }
    ],
    "metricNote": { "tr": "Geçmiş çalışma ortalamalarıdır; marka bilinirliği ölçüm yöntemi projeye göre değişebilir ve sonuçlar garanti değildir.", "en": "Historical averages only; brand-awareness measurement varies by project and results are not guaranteed." },
    "audience": [
      { "tr": "Yeni ülke veya bölgeye açılmayı planlayan markalar ve üreticiler.", "en": "Brands and manufacturers planning entry into a new country or region." },
      { "tr": "Hedef pazarı bilen ancak dokümantasyon, partner, lojistik, ödeme ya da GTM modelinde netliği olmayan şirketler.", "en": "Companies that know the target market but lack clarity on documentation, partners, logistics, payments or the go-to-market model." },
      { "tr": "Uluslararası büyümeyi yalnızca distribütör veya reklam kanalı üzerinden değil, bütüncül sistemle yönetmek isteyen şirketler.", "en": "Companies that want to manage international growth through an integrated system rather than relying only on distributors or advertising." }
    ],
    "approachIntro": { "tr": "Pazara girmeyi ve pazarda büyümeyi iki ayrı problem olarak ele alıyor, ancak tek plan içinde birbirine bağlıyoruz.", "en": "We treat entering the market and growing inside it as two distinct problems, connected through one plan." },
    "approachSteps": [
      { "title": { "tr": "Başlangıç Analizi", "en": "Initial Review" }, "body": { "tr": "İş modeli, hedefler, mevcut yetkinlikler ve pazara giriş hazırlığı değerlendirilir.", "en": "Business model, objectives, existing capabilities and market-entry readiness are reviewed." } },
      { "title": { "tr": "Pazar & Fırsat Analizi", "en": "Market & Opportunity Analysis" }, "body": { "tr": "Talep, rekabet, kültür, tüketici davranışı ve ülke önceliği değerlendirilir.", "en": "Demand, competition, culture, consumer behavior and country prioritization are evaluated." } },
      { "title": { "tr": "Altyapı & Risk", "en": "Infrastructure & Risk" }, "body": { "tr": "Yasal, finansal, ödeme, lojistik ve partner ihtiyaçları ilgili uzmanlarla planlanır.", "en": "Legal, financial, payment, logistics and partner requirements are planned with the relevant specialists." } },
      { "title": { "tr": "Go-to-Market", "en": "Go-to-Market" }, "body": { "tr": "Konumlandırma, lokalizasyon, kanal, bütçe, medya ve satış modeli kurgulanır.", "en": "Positioning, localization, channels, budget, media and the sales model are designed." } },
      { "title": { "tr": "Kurulum", "en": "Setup" }, "body": { "tr": "Gerekli ticari ve pazarlama altyapıları devreye alınır; taraflar koordine edilir.", "en": "Required commercial and marketing infrastructure is activated and stakeholders are coordinated." } },
      { "title": { "tr": "Büyüme & Optimizasyon", "en": "Growth & Optimization" }, "body": { "tr": "Satış, bilinirlik, pazar payı ve operasyon sonuçları izlenerek plan güncellenir.", "en": "Sales, awareness, market share and operational results are monitored and the plan is updated." } }
    ],
    "proofBrands": ["Iamlovein", "Grey Manner", "Aladdin Parfumeur", "Blackbörk"],
    "proofNotes": [
      { "tr": "Iamlovein'in Romanya, Bulgaristan ve Bosna genişlemesinde fulfillment, QR, influencer/UGC ve geo-funnel süreçleri birlikte yönetildi.", "en": "Iamlovein's Romania, Bulgaria and Bosnia expansion combined fulfillment, QR, influencer/UGC and geo-funnel execution." },
      { "tr": "Grey Manner çalışmalarında Bulgaristan, Bosna, Polonya ve Almanya için pazaryeri, lojistik, üretim ve yıllık büyüme planı birlikte ele alındı.", "en": "Grey Manner work across Bulgaria, Bosnia, Poland and Germany connected marketplaces, logistics, production and annual growth planning." }
    ],
    "operations": {
      "A": ["International Market Research", "Market Entry Strategy", "International Go-to-Market Strategy", "Localization & Transcreation", "International SEO", "Export Lead Generation", "Distributor & Business Partner Acquisition", "International Marketplace Expansion", "Cross-Border E-Commerce"],
      "B": ["Export Readiness Audit", "Country & Market Prioritization", "International Growth Strategy", "International Brand Positioning", "International Media Planning", "Cross-Border Performance Marketing", "International PR", "International Demand Generation", "Cross-Border Fulfillment & Logistics Strategy"],
      "C": ["International B2B Lead Generation → Export Lead Generation / B2B Lead Generation"]
    },
    "faq": [
      { "question": { "tr": "Sellf yeni pazardaki yasal ve finansal işlemleri doğrudan yürütüyor mu?", "en": "Does Sellf directly provide legal and financial services in the new market?" }, "answer": { "tr": "Sellf süreci büyüme ve işletim modeli açısından koordine eder; gerekli hukuk, finans, vergi veya yerel uzmanlıklar ilgili profesyoneller ve partnerlerle yürütülür.", "en": "Sellf coordinates the process from a growth and operating-model perspective; required legal, financial, tax or local specialist work is handled by the relevant professionals and partners." } },
      { "question": { "tr": "Hedef ülke belli değilse süreç başlayabilir mi?", "en": "Can the process start if the target country has not been selected?" }, "answer": { "tr": "Evet. Country & Market Prioritization ile ticari potansiyel, rekabet, operasyonel uygulanabilirlik ve marka uyumu karşılaştırılarak önceliklendirme yapılabilir.", "en": "Yes. Country & Market Prioritization can compare commercial potential, competition, operational feasibility and brand fit before selecting the market." } },
      { "question": { "tr": "Bu hizmet küçük şirketler için uygun mu?", "en": "Is this service suitable for small companies?" }, "answer": { "tr": "Kapsam projeye göre daraltılabilir; ancak tam uçtan uca uluslararası büyüme modeli, gerekli kurulum ve operasyon bütçesi nedeniyle genellikle yeterli yatırım kapasitesi olan şirketlerde daha anlamlıdır.", "en": "Scope can be reduced by project, but the full end-to-end international growth model is generally more suitable for companies with sufficient setup and operating investment capacity." } },
      { "question": { "tr": "Uluslararası büyüme sadece reklam yönetimini mi kapsar?", "en": "Is international growth mainly advertising management?" }, "answer": { "tr": "Hayır. Reklam yalnızca kanallardan biridir; pazar araştırması, lokalizasyon, GTM, partner ağı, ticari altyapı ve ölçüm sistemi aynı planın parçalarıdır.", "en": "No. Advertising is only one channel; market research, localization, GTM, partner structure, commercial infrastructure and measurement are part of the same plan." } }
    ],
    "relatedSlugs": ["integrated-consulting", "performance-marketing", "ecommerce-growth", "seo-organic-growth"],
    "cta": {
      "title": { "tr": "Yeni pazarınızı yalnızca seçmeyin. Doğru şekilde girin.", "en": "Don't just choose your next market. Enter it the right way." },
      "description": { "tr": "Hedef pazar, kurulum modeli ve büyüme potansiyelinizi birlikte değerlendirelim.", "en": "Let's evaluate your target market, setup model and growth potential together." },
      "label": { "tr": "Uluslararası Büyüme Görüşmesi Planla →", "en": "Schedule an International Growth Meeting →" }
    }
  },
  "b2b-marketing": {
    "seoTitle": { "tr": "B2B Pazarlama ve Lead Generation | Sellf Media", "en": "B2B Marketing & Lead Generation | Sellf Media" },
    "metaDescription": { "tr": "B2B lead generation, outbound, ABM, outreach, RevOps ve otomasyon süreçlerini tek sistemde birleştirerek kurumsal satışlarınızı ölçeklendirin.", "en": "Scale B2B revenue through lead generation, outbound, ABM, outreach, RevOps and sales automation built as one integrated growth system." },
    "statement": { "tr": "Lead satmıyoruz. Gelir üreten sistemi kuruyoruz.", "en": "We do not sell leads. We engineer the system that produces revenue." },
    "overview": [
      { "tr": "B2B Pazarlama, kurumsal müşteriye satış yapan şirketlerde pazarlama ile satış arasındaki boşluğu kapatan; hedef hesap, lead, outreach, nurturing, CRM ve revenue operations süreçlerini tek gelir sisteminde birleştiren çözümdür.", "en": "B2B Marketing closes the gap between marketing and sales for companies selling to other businesses by connecting target accounts, leads, outreach, nurturing, CRM and revenue operations inside one revenue system." },
      { "tr": "Sellf yalnızca yeni kanal eklemek yerine mevcut satış ekonomisini inceler; fuar, saha satış, paid media ve outbound gibi kanalların hangisinin gerçekten verimli olduğunu ölçer ve manuel süreçleri veri ile otomasyon üzerinden yeniden kurar.", "en": "Rather than simply adding channels, Sellf examines the existing sales economics, evaluates the efficiency of trade fairs, field sales, paid media and outbound, and rebuilds manual processes through data and automation." }
    ],
    "outcomeBullets": [
      { "tr": "Doğru şirket, sektör, unvan ve intent sinyallerine göre hedef hesap havuzu oluşturmak.", "en": "Build target-account pools based on the right company, industry, title and intent signals." },
      { "tr": "Lead'den sözleşmeye kadar satış funnel'ını ölçülebilir ve tekrar edilebilir hale getirmek.", "en": "Make the path from lead to contract measurable and repeatable." },
      { "tr": "Manuel satış eforunu azaltırken nitelikli fırsat ve sözleşme hacmini büyütmek.", "en": "Grow qualified opportunities and contract volume while reducing unnecessary manual sales effort." }
    ],
    "metrics": [
      { "value": { "tr": "%120", "en": "120%" }, "label": { "tr": "Ortalama yıllık sözleşme hacmi artışı", "en": "Average annual contract-volume increase" } },
      { "value": { "tr": "%34", "en": "34%" }, "label": { "tr": "Ortalama yıllık qualified lead artışı", "en": "Average annual qualified-lead increase" } },
      { "value": { "tr": "327", "en": "327" }, "label": { "tr": "Ortalama yıllık deal", "en": "Average annual deals" } },
      { "value": { "tr": "$4M+", "en": "$4M+" }, "label": { "tr": "Ortalama yıllık oluşturulan B2B gelir", "en": "Average annual B2B revenue generated" } }
    ],
    "metricNote": { "tr": "Tarihsel portföy ortalamalarıdır; satış döngüsü, ticket büyüklüğü, pazar ve uygulama kapsamına göre değişir ve garanti değildir.", "en": "Historical portfolio averages; outcomes vary by sales cycle, ticket size, market and scope and are not guaranteed." },
    "audience": [
      { "tr": "Kurumsal şirketlere ürün veya hizmet satan B2B markalar.", "en": "B2B brands selling products or services to organizations." },
      { "tr": "Lead üretimi ile satış ekibi arasında ölçüm veya takip kopukluğu yaşayan şirketler.", "en": "Companies with measurement or follow-up gaps between lead generation and sales." },
      { "tr": "Fuar, saha satış veya manuel outreach ağırlığını daha verimli ve otomasyon destekli modele taşımak isteyen ekipler.", "en": "Teams that want to move trade-fair, field-sales or manual-outreach-heavy acquisition toward a more efficient automation-supported model." }
    ],
    "approachIntro": { "tr": "B2B büyümeyi bir pazarlama kampanyası değil, satış ve pazarlamanın aynı veri modelinde çalıştığı gelir mühendisliği problemi olarak ele alıyoruz.", "en": "We treat B2B growth not as a marketing campaign, but as a revenue-engineering problem where sales and marketing work from the same data model." },
    "approachSteps": [
      { "title": { "tr": "BHS & Mevcut Durum", "en": "BHS & Current State" }, "body": { "tr": "Mevcut satış kanalları, maliyetler, funnel ve ölçüm açıkları incelenir.", "en": "Existing sales channels, costs, funnel and measurement gaps are reviewed." } },
      { "title": { "tr": "Hedef Hesap Modeli", "en": "Target Account Model" }, "body": { "tr": "Sektör, çalışan sayısı, unvan, coğrafya ve intent sinyalleriyle ideal hesap profili kurulur.", "en": "Ideal account profiles are built around industry, employee count, title, geography and intent signals." } },
      { "title": { "tr": "Funnel & Kanal Tasarımı", "en": "Funnel & Channel Design" }, "body": { "tr": "Outbound, email, paid media, etkinlik ve sales-touch noktaları aynı funnel içinde konumlandırılır.", "en": "Outbound, email, paid media, events and sales touches are positioned inside the same funnel." } },
      { "title": { "tr": "Otomasyon & CRM", "en": "Automation & CRM" }, "body": { "tr": "Lead akışı, nurturing, scoring ve satış takibi uygun araçlarla sistemleştirilir.", "en": "Lead flow, nurturing, scoring and sales follow-up are systemized with the appropriate tools." } },
      { "title": { "tr": "Quarterly Growth Model", "en": "Quarterly Growth Model" }, "body": { "tr": "Aylık operasyonlar üç aylık stratejik dönemler içinde test edilir ve yeniden önceliklendirilir.", "en": "Monthly operations are tested and reprioritized inside quarterly strategic cycles." } },
      { "title": { "tr": "Revenue Feedback Loop", "en": "Revenue Feedback Loop" }, "body": { "tr": "Audience → Lead → Qualified Lead → Opportunity → Proposal → Contract → Revenue zinciri üzerinden gerçek gelir sinyalleri pazarlamaya geri beslenir.", "en": "Real revenue signals are fed back into marketing through the Audience → Lead → Qualified Lead → Opportunity → Proposal → Contract → Revenue chain." } }
    ],
    "proofBrands": ["Canias", "CMS Makina", "ASCE GYO"],
    "proofNotes": [
      { "tr": "Canias'ta SellfScale prospect mapping, intent ve lookalike modellemesi; Apollo/Saleshandy outreach, programmatic/search ve CRM geri-beslemesiyle birleştirildi.", "en": "For Canias, SellfScale prospect mapping, intent and lookalike modeling were combined with Apollo/Saleshandy outreach, programmatic/search and CRM feedback." },
      { "tr": "Canias portföy kaydında %12 Display CTR, %27 mail click rate, +%230 lead artışı ve 1/8 ROI raporlandı.", "en": "The Canias portfolio record reports 12% Display CTR, 27% email click rate, +230% lead growth and 1/8 ROI." }
    ],
    "operations": {
      "A": ["B2B Demand Generation", "B2B Lead Generation", "Account-Based Marketing (ABM)", "Cold Email Outreach", "Outbound Marketing", "Email Marketing", "Lead Nurturing", "Marketing Automation", "Sales Funnel Optimization", "B2B SEO", "Revenue Operations (RevOps)", "LinkedIn Ads Management"],
      "B": ["B2B Marketing Strategy", "B2B Content Marketing", "CRM & Sales Pipeline Management", "Lead Scoring & Qualification", "Intent Data & Audience Building", "Sales Enablement", "Webinar Marketing", "Event Lead Generation", "B2B Landing Page Optimization"],
      "C": ["B2B Google Ads Management → Google Ads Management", "B2B Programmatic Advertising → Programmatic Advertising"]
    },
    "faq": [
      { "question": { "tr": "B2B Pazarlama sadece lead generation mı?", "en": "Is B2B Marketing only lead generation?" }, "answer": { "tr": "Hayır. Lead generation sistemin yalnızca bir bölümüdür; hedef hesap, outbound, nurturing, CRM, sales funnel, RevOps ve gelir ölçümü birlikte çalışır.", "en": "No. Lead generation is only one part of the system; target accounts, outbound, nurturing, CRM, the sales funnel, RevOps and revenue measurement work together." } },
      { "question": { "tr": "Mevcut satış ekibimizle birlikte çalışabilir misiniz?", "en": "Can you work with our existing sales team?" }, "answer": { "tr": "Evet. Modelin temel amacı pazarlama ve satış ekiplerini aynı funnel, veri ve KPI sistemi altında hizalamaktır.", "en": "Yes. A core objective is to align marketing and sales teams under the same funnel, data and KPI system." } },
      { "question": { "tr": "Hangi araçları kullanıyorsunuz?", "en": "Which tools do you use?" }, "answer": { "tr": "Tek bir araç setine bağlı değiliz. İhtiyaca göre Apollo, Saleshandy, Salesforce ve benzeri veri, outreach ve CRM sistemleri kullanılabilir.", "en": "We are not tied to one stack. Depending on requirements, systems such as Apollo, Saleshandy, Salesforce and other data, outreach and CRM tools may be used." } },
      { "question": { "tr": "Başarı hangi KPI'larla ölçülür?", "en": "Which KPIs measure success?" }, "answer": { "tr": "Qualified lead, fırsat, sözleşme hacmi, satış döngüsü, bütçe verimliliği, ROI ve B2B gelir/kârlılık birlikte izlenir.", "en": "Qualified leads, opportunities, contract volume, sales cycle, budget efficiency, ROI and B2B revenue/profitability are tracked together." } }
    ],
    "relatedSlugs": ["integrated-consulting", "performance-marketing", "conversion-funnel-optimization", "seo-organic-growth"],
    "cta": {
      "title": { "tr": "B2B satışınızı daha fazla manuel eforla değil, daha iyi bir sistemle büyütün.", "en": "Grow B2B sales through a better system, not more manual effort." },
      "description": { "tr": "Lead'den sözleşmeye kadar mevcut satış sisteminizdeki büyüme fırsatlarını birlikte değerlendirelim.", "en": "Let's evaluate the growth opportunities across your current system from lead to contract." },
      "label": { "tr": "B2B Büyüme Görüşmesi Planla →", "en": "Schedule a B2B Growth Meeting →" }
    }
  },
  "brand-strategy-branding": {
    "seoTitle": { "tr": "Marka Stratejisi ve Branding | Sellf Media", "en": "Brand Strategy & Branding | Sellf Media" },
    "metaDescription": { "tr": "Marka konumlandırmasından brandbook ve kurumsal kimliğe, ambalajdan marka iletişimine kadar tutarlı ve güçlü bir marka sistemi oluşturun.", "en": "Build a consistent brand system across positioning, brand voice, corporate identity, brandbook, packaging, campaigns and every customer touchpoint." },
    "statement": { "tr": "Her yeni temas noktası, markanın önceki yatırımını güçlendirmeli.", "en": "Every new touchpoint should strengthen the brand equity built before it." },
    "overview": [
      { "tr": "Marka Stratejisi & Branding; markanın nasıl göründüğünü değil yalnızca, neyi temsil ettiğini, nasıl konuştuğunu ve farklı temas noktalarında ne kadar tutarlı hissedildiğini yönetir.", "en": "Brand Strategy & Branding manages not only how a brand looks, but what it represents, how it speaks and how consistently it is experienced across touchpoints." },
      { "tr": "Yeni markalarda Brand Bootcamp ile misyon, vizyon, avantaj, marka kişiliği ve temsil sistemi kurulur; mevcut markalarda ise kurumsal kimlik ve brandbook güncelliği değerlendirilip gerekli yeniden konumlandırma veya rebranding adımları planlanır.", "en": "For new brands, Brand Bootcamp defines mission, vision, differentiation, personality and representation. Existing brands are reviewed for corporate-identity and brandbook relevance before any repositioning or rebranding work is planned." }
    ],
    "outcomeBullets": [
      { "tr": "Markanın sesini, görsel dilini ve karakterini bütün fiziksel ve dijital temas noktalarında tutarlı hale getirmek.", "en": "Create consistency in brand voice, visual language and character across physical and digital touchpoints." },
      { "tr": "Uzun vadede tanınırlık, hatırlanabilirlik, güven ve marka savunuculuğunu güçlendirmek.", "en": "Strengthen recognition, memorability, trust and advocacy over the long term." },
      { "tr": "Kampanya, ambalaj, ürün ve kurumsal materyallerin ortak bir marka sisteminden beslenmesini sağlamak.", "en": "Ensure campaigns, packaging, products and corporate materials are built from one shared brand system." }
    ],
    "metrics": [
      { "value": { "tr": "%15", "en": "15%" }, "label": { "tr": "Ortalama yıllık Brand Amplification artışı", "en": "Average annual Brand Amplification increase" } },
      { "value": { "tr": "%9", "en": "9%" }, "label": { "tr": "Ortalama yıllık advocacy artışı", "en": "Average annual advocacy increase" } },
      { "value": { "tr": "7", "en": "7" }, "label": { "tr": "2025'te tamamlanan brandbook & kurumsal kimlik", "en": "Brandbooks & consistent identities completed in 2025" } }
    ],
    "metricNote": { "tr": "Geçmiş çalışma sonuçlarıdır; ölçüm yaklaşımı ve sonuçlar marka, kategori ve proje kapsamına göre değişir ve garanti değildir.", "en": "Historical results only; measurement methods and outcomes vary by brand, category and project scope and are not guaranteed." },
    "audience": [
      { "tr": "Yeni bir marka kuran veya pazara yeniden konumlanmak isteyen B2C, D2C ve perakende markaları.", "en": "B2C, D2C and retail brands launching or repositioning in the market." },
      { "tr": "Kurumsal kimliği zaman içinde parçalanmış, farklı ekip ve kanallarda tutarlılık sorunu yaşayan markalar.", "en": "Brands whose identity has fragmented over time across teams and channels." },
      { "tr": "Güvenin ve kurumsal algının satış kararında kritik olduğu B2B şirketler.", "en": "B2B companies where trust and corporate perception materially affect buying decisions." }
    ],
    "approachIntro": { "tr": "Markayı tek bir logo veya kampanya olarak değil, yıllar içinde biriken ve her temasla güçlenmesi gereken bir sistem olarak ele alıyoruz.", "en": "We treat the brand not as a logo or campaign, but as a system that compounds over time and should become stronger with every touchpoint." },
    "approachSteps": [
      { "title": { "tr": "Brand Bootcamp / Audit", "en": "Brand Bootcamp / Audit" }, "body": { "tr": "Yeni markada marka temeli kurulur; mevcut markada konumlandırma, kimlik ve iletişim sistemi değerlendirilir.", "en": "New brands establish the foundation; existing brands are reviewed across positioning, identity and communication." } },
      { "title": { "tr": "Konumlandırma", "en": "Positioning" }, "body": { "tr": "Hedef kitle, rakip, değer önerisi ve marka karakteri üzerinden farklılaşma alanı tanımlanır.", "en": "Differentiation is defined through audience, competition, value proposition and brand character." } },
      { "title": { "tr": "Kimlik Sistemi", "en": "Identity System" }, "body": { "tr": "Görsel kimlik, kurumsal kimlik, verbal identity ve brandbook tek sistemde geliştirilir.", "en": "Visual identity, corporate identity, verbal identity and brandbook are developed as one system." } },
      { "title": { "tr": "Brand Amplification", "en": "Brand Amplification" }, "body": { "tr": "Marka kişiliği, sesi ve karakteri ambalajdan reklama kadar daha güçlü ve tutarlı hissedilecek şekilde yayılır.", "en": "Brand personality, voice and character are amplified consistently from packaging through advertising." } },
      { "title": { "tr": "Uygulama", "en": "Activation" }, "body": { "tr": "Kampanya, ürün, sosyal medya, satış ve kurumsal materyaller marka sistemiyle hizalanır.", "en": "Campaigns, products, social media, sales and corporate materials are aligned with the brand system." } },
      { "title": { "tr": "Tutarlılık", "en": "Consistency" }, "body": { "tr": "Yıllık planlama ve uygulama kontrolleriyle marka yatırımlarının birbirini güçlendirmesi sağlanır.", "en": "Annual planning and implementation reviews help each new brand investment reinforce what came before it." } }
    ],
    "proofBrands": ["NutralEN", "Qashé", "Lions Darwin", "Turkish International Investment Bank", "Guardian of Time", "Evepack"],
    "proofNotes": [
      { "tr": "Qashé çalışmasında brandbook, persona, konumlandırma, GTM ve kampanya takvimi aynı marka sistemi içinde ele alındı.", "en": "Qashé work connected brandbook, personas, positioning, GTM and campaign planning inside one brand system." },
      { "tr": "Evepack portföy çalışmasında marka ve satış temasları funnel, CRM ve operasyonel yapı ile birlikte değerlendirildi.", "en": "Evepack's portfolio work connected brand and sales touchpoints with funnel, CRM and operational structure." }
    ],
    "operations": {
      "A": ["Brand Positioning", "Naming", "Rebranding", "Visual Identity Design", "Corporate Identity", "Employer Branding"],
      "B": ["Brand Audit", "Brand Research", "Brand Architecture", "Logo Design", "Brand Guidelines / Brandbook", "Brand Messaging", "Verbal Identity & Tone of Voice", "Value Proposition Development", "Audience & Persona Development", "Packaging Branding", "Brand Launch Strategy", "Brand Experience Design"],
      "C": ["Brand Strategy → Marka Stratejisi & Branding", "Brand Refresh → Rebranding"]
    },
    "faq": [
      { "question": { "tr": "Brand Bootcamp nedir?", "en": "What is Brand Bootcamp?" }, "answer": { "tr": "Yeni bir markanın misyon, vizyon, farklılaşma, kişilik, hedef kitle ve temsil sistemini netleştirerek kurumsal kimlik ve brandbook üretimine temel oluşturan başlangıç çalışmasıdır.", "en": "It is the foundational process that defines a new brand's mission, vision, differentiation, personality, audience and representation before corporate identity and brandbook development." } },
      { "question": { "tr": "Sadece logo tasarımı yapıyor musunuz?", "en": "Do you only provide logo design?" }, "answer": { "tr": "Logo tasarımı kapsam içinde olabilir ancak marka stratejisi yalnızca logodan ibaret değildir; konumlandırma, kimlik, mesaj, ton, brandbook ve temas noktaları birlikte ele alınır.", "en": "Logo design can be part of the scope, but brand strategy is broader: positioning, identity, messaging, tone, brandbook and touchpoints are considered together." } },
      { "question": { "tr": "Mevcut brandbook'umuz varsa yeniden yapılması gerekir mi?", "en": "Do we need a new brandbook if we already have one?" }, "answer": { "tr": "Her zaman değil. Önce mevcut sistemin güncelliği, tutarlılığı ve iş hedefleriyle uyumu değerlendirilir; yalnızca gerekli alanlar revize edilebilir.", "en": "Not always. The existing system is first reviewed for relevance, consistency and alignment with business objectives; only the necessary areas may need revision." } },
      { "question": { "tr": "Brand Amplification neyi ifade ediyor?", "en": "What does Brand Amplification mean?" }, "answer": { "tr": "Sellf'in marka kimliği, ses, karakter ve kişiliğinin temas noktalarında ne kadar güçlü ve tutarlı hissedildiğini geliştirmek için kullandığı marka yaklaşımıdır.", "en": "It is Sellf's approach to strengthening how clearly and consistently a brand's identity, voice, character and personality are expressed across touchpoints." } }
    ],
    "relatedSlugs": ["design-creative", "performance-marketing", "integrated-consulting", "ecommerce-growth"],
    "cta": {
      "title": { "tr": "Markanızı yalnızca yeniden tasarlamayalım. Daha güçlü hale getirelim.", "en": "Don't just redesign your brand. Make it stronger." },
      "description": { "tr": "Konumlandırma, kimlik ve marka tutarlılığını birlikte değerlendirelim.", "en": "Let's evaluate your positioning, identity and brand consistency together." },
      "label": { "tr": "Marka Görüşmesi Planla →", "en": "Schedule a Brand Strategy Meeting →" }
    }
  },
  "performance-marketing": {
    "seoTitle": { "tr": "Performans Pazarlama ve Dijital Reklam Yönetimi | Sellf Media", "en": "Performance Marketing & Paid Media Management | Sellf Media" },
    "metaDescription": { "tr": "Google, Meta, TikTok, LinkedIn ve diğer performans kanallarını ROI, veri, attribution ve dönüşüm odaklı tek bir büyüme sistemi içinde yönetin.", "en": "Turn Google, Meta, TikTok, LinkedIn and other performance channels into one ROI-driven growth system built around data, attribution and conversion." },
    "statement": { "tr": "Reklam hesabı değil, yatırım portföyü yönetiyoruz.", "en": "We manage an investment portfolio, not simply an advertising account." },
    "overview": [
      { "tr": "Performans Pazarlama; dijital reklam ve ölçülebilir pazarlama yatırımlarını tıklama veya platform içi metriklerden öte, gerçek ticari sonuç ve ROI perspektifiyle yönetir.", "en": "Performance Marketing manages digital advertising and measurable marketing investment beyond clicks or in-platform metrics, using real commercial outcomes and ROI as the governing perspective." },
      { "tr": "Sellf önce veri sağlığını ve dönüşüm ölçümünü kontrol eder; ardından bütçe, audience, kreatif, kanal ve attribution kararlarını aynı finansal büyüme modeli içinde optimize eder.", "en": "Sellf first verifies data integrity and conversion measurement, then optimizes budget, audience, creative, channel and attribution decisions inside one financial-growth model." }
    ],
    "outcomeBullets": [
      { "tr": "Reklam bütçesinin gerçek ticari geri dönüşünü görünür hale getirmek.", "en": "Make the real commercial return of advertising spend visible." },
      { "tr": "Kanal, audience ve kreatif bütçelerini ROI ve marj perspektifiyle yeniden dağıtmak.", "en": "Reallocate channel, audience and creative budgets through ROI and margin economics." },
      { "tr": "Tracking, attribution ve data-integrity açıklarını gidererek daha güvenilir optimizasyon yapmak.", "en": "Improve optimization reliability by fixing tracking, attribution and data-integrity gaps." }
    ],
    "metrics": [
      { "value": { "tr": "1,7", "en": "1.7" }, "label": { "tr": "E-ticaret markalarında ortalama ROI", "en": "Average ROI for e-commerce brands" } },
      { "value": { "tr": "%7", "en": "7%" }, "label": { "tr": "Ortalama yıllık medya harcaması azalması", "en": "Average annual media-spend reduction" } },
      { "value": { "tr": "%20+", "en": "20%+" }, "label": { "tr": "Ortalama yıllık CTR artışı", "en": "Average annual CTR increase" } }
    ],
    "metricNote": { "tr": "Geçmiş portföy ortalamalarıdır; kanal, sektör, marj, attribution modeli ve başlangıç performansına göre değişir ve garanti değildir.", "en": "Historical portfolio averages; results vary by channel, industry, margin, attribution model and starting performance and are not guaranteed." },
    "audience": [
      { "tr": "E-ticaret, randevu, hospitality ve dönüşümü doğrudan ölçülebilen iş modelleri.", "en": "E-commerce, appointment, hospitality and other business models with directly measurable conversion." },
      { "tr": "Yüksek medya harcamasına rağmen gerçek ROI'sini net göremeyen şirketler.", "en": "Companies with meaningful media spend but limited visibility into true ROI." },
      { "tr": "Paid media, creative, tracking ve attribution'ı tek performans sistemi içinde yönetmek isteyen ekipler.", "en": "Teams that want paid media, creative, tracking and attribution managed as one performance system." }
    ],
    "approachIntro": { "tr": "İlk soru 'hangi platformda reklam verelim?' değil, 'hangi veriyle hangi ticari sonucu ölçeceğiz?' olur.", "en": "The first question is not 'which platform should we advertise on?' but 'which commercial outcome will we measure, and with what data?'" },
    "approachSteps": [
      { "title": { "tr": "Performance BHS", "en": "Performance BHS" }, "body": { "tr": "Dijital varlıklar, ölçüm sağlığı, arama/market görünürlüğü ve mevcut performans sistemi değerlendirilir.", "en": "Digital assets, measurement health, search/market visibility and the current performance system are assessed." } },
      { "title": { "tr": "Data Integrity First", "en": "Data Integrity First" }, "body": { "tr": "GA4, GTM, conversion tracking, server-side sinyaller ve attribution açıkları gerektiği ölçüde düzeltilir.", "en": "GA4, GTM, conversion tracking, server-side signals and attribution gaps are fixed as required." } },
      { "title": { "tr": "Finansal Model", "en": "Financial Model" }, "body": { "tr": "ROI, CAC/CPL, marj ve dönüşüm ekonomisi üzerinden bütçe sınırları belirlenir.", "en": "Budget thresholds are defined through ROI, CAC/CPL, margin and conversion economics." } },
      { "title": { "tr": "Kanal & Audience", "en": "Channel & Audience" }, "body": { "tr": "Google, Meta, TikTok, LinkedIn, programmatic ve diğer kanallar iş hedeflerine göre planlanır.", "en": "Google, Meta, TikTok, LinkedIn, programmatic and other channels are planned against business objectives." } },
      { "title": { "tr": "Kreatif & Feed", "en": "Creative & Feed" }, "body": { "tr": "Performance creative, product feed ve mesaj varyasyonları ölçüm sonuçlarına göre geliştirilir.", "en": "Performance creative, product feeds and message variations are developed using measured outcomes." } },
      { "title": { "tr": "Optimizasyon", "en": "Optimization" }, "body": { "tr": "Aylık plan, raporlama ve yakın müşteri iletişimiyle bütçe ve kanal dağılımı sürekli güncellenir.", "en": "Budgets and channel allocation are continuously updated through monthly planning, reporting and close client collaboration." } }
    ],
    "proofBrands": ["Fizyohol", "Canias", "NutralEN", "Shevec", "Bad Bear", "Evepack", "Sfera"],
    "proofNotes": [
      { "tr": "Fizyohol portföy kaydında 62 TL CAC, 222 kalifiye lead ve 1/24 ROI raporlandı.", "en": "The Fizyohol portfolio record reports TRY 62 CAC, 222 qualified leads and 1/24 ROI." },
      { "tr": "Canias portföy kaydında programmatic/search, outreach ve CRM sinyalleri birlikte optimize edildi; +%230 lead artışı raporlandı.", "en": "Canias combined programmatic/search, outreach and CRM signals; its portfolio record reports +230% lead growth." },
      { "tr": "Evepack çalışmasında tracking, funnel, CRM ve satış yapısı aynı büyüme sisteminde yeniden düzenlendi.", "en": "Evepack work restructured tracking, funnel, CRM and sales inside one growth system." }
    ],
    "operations": {
      "A": ["Google Ads Management", "Meta Ads Management", "TikTok Ads Management", "LinkedIn Ads Management", "Programmatic Advertising", "Media Planning & Buying", "Google Performance Max Management", "Google Shopping Ads Management", "YouTube Ads Management", "Performance Creative", "GA4 & Google Tag Manager Setup", "Server-Side Tracking", "Marketing Attribution", "Product Feed Management & Optimization", "Marketplace Advertising", "Retail Media Management"],
      "B": ["Display Advertising", "Remarketing & Retargeting", "Conversion Tracking", "Paid Media Audit", "Paid Media Strategy"],
      "C": ["Search Ads Management → Google Ads Management", "Paid Social Advertising → Meta / TikTok / LinkedIn Ads", "Marketplace & Retail Media Advertising → E-Commerce Growth"]
    },
    "faq": [
      { "question": { "tr": "ROI ile ROAS aynı şey mi?", "en": "Are ROI and ROAS the same thing?" }, "answer": { "tr": "Hayır. ROAS reklam harcamasına karşı reklam geliri oranına bakar; ROI ise maliyet, marj ve daha geniş ticari sonucu dikkate alır. Sellf performans yönetiminde mümkün olduğunda ROI perspektifini önceliklendirir.", "en": "No. ROAS compares advertising revenue with ad spend; ROI considers broader cost, margin and commercial return. Sellf prioritizes an ROI perspective wherever the data allows it." } },
      { "question": { "tr": "Sadece reklam hesabı optimizasyonu yapıyor musunuz?", "en": "Do you only optimize advertising accounts?" }, "answer": { "tr": "Hayır. Tracking, attribution, product feed, creative, landing page ve dönüşüm verileri gerektiğinde aynı performans sisteminin parçası olarak ele alınır.", "en": "No. Tracking, attribution, product feeds, creative, landing pages and conversion data are treated as part of the same performance system when relevant." } },
      { "question": { "tr": "Hangi platformları yönetiyorsunuz?", "en": "Which platforms do you manage?" }, "answer": { "tr": "Kapsam iş modeline göre değişir; Google, Meta, TikTok, LinkedIn, YouTube, programmatic, marketplace ve retail media dahil farklı kanallar kullanılabilir.", "en": "Scope varies by business model and can include Google, Meta, TikTok, LinkedIn, YouTube, programmatic, marketplace and retail-media channels." } },
      { "question": { "tr": "Tracking altyapısı bozuksa reklam yönetimine başlanır mı?", "en": "Can media management start if tracking is unreliable?" }, "answer": { "tr": "Önce kritik ölçüm açıkları belirlenir ve gerekiyorsa giderilir. Güvenilir veri olmadan sağlıklı performans optimizasyonu yapılamaz.", "en": "Critical measurement gaps are identified and fixed where necessary. Reliable performance optimization requires reliable data." } }
    ],
    "relatedSlugs": ["conversion-funnel-optimization", "ecommerce-growth", "design-creative", "b2b-marketing"],
    "cta": {
      "title": { "tr": "Pazarlamanızın ne kadar harcadığını değil, ne kadar geri döndürdüğünü konuşalım.", "en": "Let's talk about what your marketing returns, not just what it spends." },
      "description": { "tr": "Tracking, kanal, kreatif ve bütçe ekonominizi birlikte değerlendirelim.", "en": "Let's evaluate your tracking, channels, creative and budget economics together." },
      "label": { "tr": "Performans Görüşmesi Planla →", "en": "Schedule a Performance Meeting →" }
    }
  },
  "digital-products-software-development": {
    "seoTitle": { "tr": "Dijital Ürünler ve Yazılım Geliştirme | Sellf Media", "en": "Digital Products & Software Development | Sellf Media" },
    "metaDescription": { "tr": "Kurumsal web sitelerinden e-ticarete, özel yazılımdan otomasyon ve entegrasyonlara kadar ihtiyacınıza özel dijital ürünleri anahtar teslim geliştirin.", "en": "Build websites, e-commerce platforms, custom software, automations and integrations around your business requirements with end-to-end delivery." },
    "statement": { "tr": "Saat satmıyoruz. Çalışan çözüm teslim ediyoruz.", "en": "We do not sell hours. We deliver working solutions." },
    "overview": [
      { "tr": "Dijital Ürünler & Yazılım Geliştirme; kurumsal web sitelerinden e-ticaret altyapılarına, özel web uygulamalarından iş otomasyonlarına kadar işletmenin ihtiyaç duyduğu dijital çözümü probleme göre tasarlar ve geliştirir.", "en": "Digital Products & Software Development designs and builds the digital solution required by the business, from corporate websites and e-commerce infrastructure to custom web applications and workflow automation." },
      { "tr": "Teknoloji yığını baştan satılmaz. İhtiyaç, kapsam, entegrasyonlar, bakım beklentisi ve bütçe netleştirilir; ardından en uygun teknoloji ve teslim modeli seçilir.", "en": "The technology stack is not sold first. Requirements, scope, integrations, maintenance expectations and budget are clarified before selecting the technology and delivery model." }
    ],
    "outcomeBullets": [
      { "tr": "Manuel veya parçalı iş süreçlerini yazılımla daha hızlı ve hatasız hale getirmek.", "en": "Make manual or fragmented workflows faster and less error-prone through software." },
      { "tr": "Web, e-ticaret, CRM, API ve otomasyon ihtiyaçlarını tek proje kapsamı altında teslim etmek.", "en": "Deliver web, e-commerce, CRM, API and automation requirements under one project scope." },
      { "tr": "Proje sonrası bakım ve geliştirme ihtiyacını öngörerek sürdürülebilir dijital ürünler kurmak.", "en": "Build maintainable digital products with post-launch support and iteration in mind." }
    ],
    "metrics": [
      { "value": { "tr": "56", "en": "56" }, "label": { "tr": "Tamamlanan web sitesi", "en": "Websites completed" } },
      { "value": { "tr": "128", "en": "128" }, "label": { "tr": "Tamamlanan yazılım projesi", "en": "Software projects completed" } },
      { "value": { "tr": "3", "en": "3" }, "label": { "tr": "Geliştirilen uygulama", "en": "Applications developed" } }
    ],
    "metricNote": { "tr": "Proje kapsamları birbirinden farklı olduğu için tek bir evrensel performans benchmark'ı kullanılmaz; bu rakamlar teslimat geçmişini gösterir.", "en": "Because project scopes differ materially, there is no single universal performance benchmark; these figures represent delivery history." },
    "audience": [
      { "tr": "Yeni web sitesi, e-ticaret altyapısı veya özel yazılıma ihtiyaç duyan şirketler.", "en": "Companies that need a new website, e-commerce platform or custom software." },
      { "tr": "Manuel iş akışlarını otomasyon veya entegrasyonlarla azaltmak isteyen ekipler.", "en": "Teams that want to reduce manual workflows through automation or integrations." },
      { "tr": "İş ihtiyacına göre teknoloji seçilmesini ve proje sonrası bakım desteğini tek partnerden almak isteyen şirketler.", "en": "Companies that want technology selected around the business need and ongoing support from the same delivery partner." }
    ],
    "approachIntro": { "tr": "Bir yazılımın değeri kaç satır kod yazıldığıyla değil, çözdüğü problemin değeriyle ölçülür.", "en": "The value of software is not measured by how much code was written. It is measured by the value of the problem it eliminates." },
    "approachSteps": [
      { "title": { "tr": "İhtiyaç", "en": "Requirement" }, "body": { "tr": "İş problemi, kullanıcı, süreç ve başarı tanımı netleştirilir.", "en": "The business problem, users, workflow and definition of success are clarified." } },
      { "title": { "tr": "Kapsam", "en": "Scope" }, "body": { "tr": "Fonksiyonlar, entegrasyonlar, teslimatlar, bütçe ve proje sınırları belirlenir.", "en": "Features, integrations, deliverables, budget and project boundaries are defined." } },
      { "title": { "tr": "Mimari", "en": "Architecture" }, "body": { "tr": "İhtiyaca göre Shopify, WordPress, WooCommerce, ikas, özel stack veya API mimarisi seçilir.", "en": "Shopify, WordPress, WooCommerce, ikas, a custom stack or API architecture is selected based on requirements." } },
      { "title": { "tr": "Geliştirme", "en": "Development" }, "body": { "tr": "Ürün, arayüz, backend, entegrasyon ve otomasyon katmanları geliştirilir.", "en": "Product, interface, backend, integration and automation layers are developed." } },
      { "title": { "tr": "Test & Teslim", "en": "Test & Delivery" }, "body": { "tr": "Kritik akışlar test edilir, gerekli düzeltmeler yapılır ve sistem devreye alınır.", "en": "Critical flows are tested, required fixes are completed and the system is launched." } },
      { "title": { "tr": "Bakım", "en": "Maintenance" }, "body": { "tr": "İhtiyaca göre webmaster, teknik destek, bug fix ve devam eden geliştirme modeli sağlanır.", "en": "Webmaster support, technical maintenance, bug fixes and ongoing development can be provided as required." } }
    ],
    "proofBrands": ["NutralEN", "Qashé", "Lions Darwin", "Turkish International Investment Bank", "Evepack", "Canias", "P&G", "Zühre Ana", "ASCE GYO", "Rollbab", "GKC"],
    "proofNotes": [
      { "tr": "Projeler web sitesi, e-ticaret, özel yazılım, otomasyon, CRM ve entegrasyon gibi farklı dijital ihtiyaçları kapsar; her marka için aynı teslimat türü varsayılmaz.", "en": "Projects span websites, e-commerce, custom software, automation, CRM and integrations; the same delivery type should not be assumed for every listed brand." }
    ],
    "operations": {
      "A": ["Corporate Website Development", "E-Commerce Website Development", "Landing Page Development", "Web Application Development", "Custom Software Development", "CRM Integration", "API & Third-Party Integrations", "Workflow Automation", "AI Workflow Automation", "UI/UX Design"],
      "B": ["Custom Web Development", "Mobile Application Development", "Marketing Automation Development", "Marketplace Integrations", "Payment System Integrations", "Analytics & Tracking Infrastructure", "Business Intelligence Dashboards", "Website Maintenance & Optimization", "Domain Configuration", "DNS Setup & Troubleshooting", "Hosting Configuration", "Webmaster Services", "Website Technical Support", "Bug Fixes & Maintenance"],
      "C": ["Conversion-Focused Website Development → Landing Page Development + CRO", "Full-Stack Web Development → Corporate / Custom Web Development", "Internal Business Tools → Custom Software Development"]
    },
    "faq": [
      { "question": { "tr": "Hangi teknoloji stack'i kullanıyorsunuz?", "en": "Which technology stack do you use?" }, "answer": { "tr": "Tek bir stack'e bağlı değiliz. Shopify, WordPress, WooCommerce, ikas, custom web teknolojileri, API'ler, CRM, ödeme sistemleri, cloud ve automation araçları ihtiyaca göre seçilir.", "en": "We are not tied to one stack. Shopify, WordPress, WooCommerce, ikas, custom web technologies, APIs, CRM, payment systems, cloud and automation tools are selected according to the requirement." } },
      { "question": { "tr": "Saatlik yazılım hizmeti mi veriyorsunuz?", "en": "Do you primarily bill software work hourly?" }, "answer": { "tr": "Ana model proje ve çözüm bazlıdır; ihtiyaç ve kapsam netleştirilerek turnkey fiyatlama yapılır. Devam eden webmaster veya bakım işleri ayrı retainer modeliyle yürütülebilir.", "en": "The primary model is project and solution based, with scope-driven turnkey pricing. Ongoing webmaster or maintenance work can be structured separately as a retainer." } },
      { "question": { "tr": "Proje bittikten sonra destek veriyor musunuz?", "en": "Do you provide support after launch?" }, "answer": { "tr": "Evet. İhtiyaca göre bakım, bug fix, webmaster, teknik destek ve devam eden geliştirme kapsamları sağlanabilir.", "en": "Yes. Maintenance, bug fixes, webmaster support, technical support and ongoing development can be provided depending on the project." } },
      { "question": { "tr": "Sadece web sitesi mi geliştiriyorsunuz?", "en": "Do you only build websites?" }, "answer": { "tr": "Hayır. Web sitesi ve e-ticaretin yanında özel yazılım, web uygulaması, workflow automation, AI automation, CRM ve API entegrasyonları da kapsam içindedir.", "en": "No. In addition to websites and e-commerce, the scope includes custom software, web applications, workflow automation, AI automation, CRM and API integrations." } }
    ],
    "relatedSlugs": ["conversion-funnel-optimization", "ecommerce-growth", "design-creative", "integrated-consulting"],
    "cta": {
      "title": { "tr": "Manuel yaptığınız her şey manuel kalmak zorunda değil.", "en": "Not everything your team does manually has to stay manual." },
      "description": { "tr": "İhtiyacınızı, kapsamı ve doğru teslim modelini birlikte konuşalım.", "en": "Let's discuss the requirement, scope and right delivery model for your project." },
      "label": { "tr": "Projenizi Konuşalım →", "en": "Discuss Your Project →" }
    }
  },
  "growth-management-consulting": {
    "seoTitle": { "tr": "Büyüme ve Yönetim Danışmanlığı | Sellf Media", "en": "Growth & Management Consulting | Sellf Media" },
    "metaDescription": { "tr": "İş modeli, fiyatlama, satış, kârlılık, operasyonel verimlilik ve yönetim süreçlerinizi veri odaklı büyüme stratejileriyle yeniden yapılandırın.", "en": "Improve business models, pricing, sales, profitability, operational efficiency and management systems through data-driven growth consulting." },
    "statement": { "tr": "Her şirketin tüm yönetimini yeniden kurması gerekmez. Bazen tek bir kritik karar mekanizmasını düzeltmek yeterlidir.", "en": "Not every company needs its entire management system rebuilt. Sometimes fixing one critical decision mechanism is enough." },
    "overview": [
      { "tr": "Büyüme & Yönetim Danışmanlığı; fiyatlama, satış, iş modeli, kârlılık, operasyonel verimlilik veya dijital dönüşüm gibi belirli bir ticari ya da yönetim problemini teşhis edip uygulanabilir karar sistemine dönüştürür.", "en": "Growth & Management Consulting diagnoses a specific commercial or management problem—such as pricing, sales, business model, profitability, operational efficiency or digital transformation—and turns it into an executable decision system." },
      { "tr": "Entegre Danışmanlık şirketin tüm büyüme yönünü uzun vadeli ele alırken, bu çözüm tanımlı bir iş problemine daha odaklı ve proje bazlı müdahale eder.", "en": "While Integrated Consulting addresses the broader long-term direction of the company, this solution focuses more narrowly on a defined business problem and can be delivered as a project." }
    ],
    "outcomeBullets": [
      { "tr": "Gelir, maliyet, marj ve EBITDA arasındaki karar mekanizmasını daha görünür hale getirmek.", "en": "Make the decision chain across revenue, cost, margin and EBITDA more visible." },
      { "tr": "Yönetim raporlaması ve karar süreçlerinde gereksiz gecikme ve eforu azaltmak.", "en": "Reduce unnecessary delay and effort in management reporting and decision processes." },
      { "tr": "Spesifik bir ticari problemi analizden uygulamaya kadar ölçülebilir biçimde çözmek.", "en": "Solve a specific commercial problem from diagnosis through implementation with measurable outcomes." }
    ],
    "metrics": [
      { "value": { "tr": "17M TL", "en": "TRY 17M" }, "label": { "tr": "Ortalama yıllık yönetim tasarrufu", "en": "Average annual management savings" } },
      { "value": { "tr": "%4", "en": "4%" }, "label": { "tr": "Marka başına ortalama EBITDA/FAVÖK artışı", "en": "Average EBITDA increase per brand" } },
      { "value": { "tr": "%20", "en": "20%" }, "label": { "tr": "Yönetim ve raporlama süreçlerinde ortalama hızlanma", "en": "Average acceleration in management/reporting processes" } }
    ],
    "metricNote": { "tr": "Geçmiş müşteri çalışmaları üzerinden tarihsel ortalamalardır; kapsam, şirket büyüklüğü ve başlangıç yapısına göre değişir ve garanti değildir.", "en": "Historical averages from client work; outcomes vary by scope, company size and starting structure and are not guaranteed." },
    "audience": [
      { "tr": "Büyümesini sınırlayan belirli bir yönetim veya ticari problemi olan şirketler.", "en": "Companies with a defined management or commercial constraint limiting growth." },
      { "tr": "Fiyatlama, satış süreci, kârlılık, organizasyon veya karar raporlamasını yeniden tasarlamak isteyen yönetimler.", "en": "Leadership teams redesigning pricing, sales process, profitability, organization or decision reporting." },
      { "tr": "Tam kapsamlı entegre danışmanlık yerine belirli bir problemi proje bazlı çözmek isteyen işletmeler.", "en": "Businesses that need a project-based solution to a specific problem rather than full-scope integrated consulting." }
    ],
    "approachIntro": { "tr": "Başarının tanımı danışmanlık raporunun teslim edilmesi değil, iş sonucunun değişmesidir.", "en": "Success is not the delivery of a consulting report. It is a change in the business outcome." },
    "approachSteps": [
      { "title": { "tr": "Management-Focused BHS", "en": "Management-Focused BHS" }, "body": { "tr": "BHS sabit checklist olarak değil, fiyatlama, satış, dijital dönüşüm veya ilgili problem alanına göre uyarlanarak kullanılır.", "en": "BHS is not used as a fixed checklist; it is adapted to the actual problem such as pricing, sales or digital transformation." } },
      { "title": { "tr": "Diagnose", "en": "Diagnose" }, "body": { "tr": "Sorunun kök nedeni veri, süreç, finans ve organizasyon boyutlarıyla ayrıştırılır.", "en": "The root cause is separated across data, process, financial and organizational dimensions." } },
      { "title": { "tr": "Model", "en": "Model" }, "body": { "tr": "Alternatif karar ve ticari senaryolar sayısallaştırılır.", "en": "Alternative decision and commercial scenarios are modeled quantitatively." } },
      { "title": { "tr": "Prioritize", "en": "Prioritize" }, "body": { "tr": "Etki, maliyet, uygulanabilirlik ve zaman kriterleriyle aksiyonlar sıralanır.", "en": "Actions are ranked by impact, cost, feasibility and timing." } },
      { "title": { "tr": "Execute", "en": "Execute" }, "body": { "tr": "Karar sistemi gerçek operasyon içinde devreye alınır; gerektiğinde ilgili Sellf ekipleri uygulamaya dahil olur.", "en": "The decision system is implemented in the real operation, with relevant Sellf teams joining execution where required." } },
      { "title": { "tr": "Measure", "en": "Measure" }, "body": { "tr": "Revenue → Cost → Margin → EBITDA → Return zinciri ve probleme özel KPI'larla sonuç izlenir.", "en": "Results are tracked through the Revenue → Cost → Margin → EBITDA → Return chain and problem-specific KPIs." } }
    ],
    "proofBrands": ["Qashé", "Grey Manner", "GKC", "CANIAS", "ASCE GYO", "Philips", "MMA Global", "Turkish International Investment Bank"],
    "proofNotes": [
      { "tr": "Qashé portföy çalışmasında ürün kârlılığı, platform entegrasyonu, GTM ve kampanya takvimi aynı ticari model içinde ele alındı.", "en": "Qashé work connected product profitability, platform integration, GTM and campaign planning inside one commercial model." },
      { "tr": "Grey Manner portföy kaydında finansal danışmanlık, üretim, pazar ve lojistik kararları uluslararası büyüme planıyla birlikte ele alındı.", "en": "Grey Manner's portfolio record connects financial consulting, production, market and logistics decisions with the international growth plan." }
    ],
    "operations": {
      "A": ["Business Model Consulting", "Sales Strategy", "Pricing Strategy", "Market Feasibility Analysis", "Digital Transformation Consulting"],
      "B": ["Commercial Strategy", "Sales Process Design", "Profitability Analysis", "Financial Analysis", "Business Planning", "Operational Efficiency Consulting", "Organization & Team Structure", "KPI & Performance Management", "Marketing Organization Consulting", "Sales & Marketing Alignment", "New Business Development Strategy", "Management Reporting & Decision Systems"],
      "C": ["Business Growth Strategy → Büyüme & Yönetim Danışmanlığı"]
    },
    "faq": [
      { "question": { "tr": "Bu çözüm Entegre Danışmanlık'tan nasıl ayrılıyor?", "en": "How is this different from Integrated Consulting?" }, "answer": { "tr": "Entegre Danışmanlık şirketin geniş kapsamlı, uzun dönemli büyüme sistemini yönetir. Büyüme & Yönetim Danışmanlığı ise tanımlı bir fiyatlama, satış, kârlılık, operasyon veya yönetim problemine daha odaklı müdahale eder.", "en": "Integrated Consulting manages the broader long-term growth system. Growth & Management Consulting targets a defined pricing, sales, profitability, operational or management problem more narrowly." } },
      { "question": { "tr": "BHS burada da kullanılıyor mu?", "en": "Is BHS used in this solution?" }, "answer": { "tr": "Evet, ancak sabit bir checklist olarak değil. Management-Focused BHS probleme göre uyarlanır ve yalnızca ilgili yönetim alanlarını inceler.", "en": "Yes, but not as a fixed checklist. Management-Focused BHS is adapted to the problem and examines only the relevant management areas." } },
      { "question": { "tr": "Sadece strateji raporu mu teslim ediliyor?", "en": "Do you only deliver a strategy report?" }, "answer": { "tr": "Hayır. İhtiyaca göre karar modeli uygulamaya geçirilir, süreçler yeniden tasarlanır ve ilgili Sellf ekipleri execution'a dahil olabilir.", "en": "No. Depending on scope, the decision model is implemented, processes are redesigned and relevant Sellf teams can participate in execution." } },
      { "question": { "tr": "Finansal sonuçlar da kapsamda mı?", "en": "Are financial outcomes part of the scope?" }, "answer": { "tr": "Evet. Problemin doğasına göre gelir, maliyet, marj, EBITDA ve return göstergeleri danışmanlık modelinin parçası olabilir.", "en": "Yes. Depending on the problem, revenue, cost, margin, EBITDA and return metrics can be part of the consulting model." } }
    ],
    "relatedSlugs": ["integrated-consulting", "conversion-funnel-optimization", "b2b-marketing", "ecommerce-growth"],
    "cta": {
      "title": { "tr": "Büyüme probleminiz daha fazla satış değil, daha iyi yönetim olabilir.", "en": "Your growth constraint may not be sales. It may be the way the business is managed." },
      "description": { "tr": "Karar, verimlilik ve kârlılık darboğazınızı birlikte değerlendirelim.", "en": "Let's evaluate the decision, efficiency and profitability constraint in your business." },
      "label": { "tr": "Yönetim Görüşmesi Planla →", "en": "Schedule a Management Consulting Meeting →" }
    }
  },
  "offline-marketing-media": {
    "seoTitle": { "tr": "Offline Medya Planlama, OOH ve Marka Aktivasyonları | Sellf Media", "en": "Offline Media Planning, OOH & Brand Activation | Sellf Media" },
    "metaDescription": { "tr": "OOH, TV, etkinlik, brand activation ve offline medya yatırımlarınızı veri, ölçüm ve dijital attribution katmanlarıyla daha verimli yönetin.", "en": "Plan OOH, TV, events and offline media through a data-led approach that connects physical visibility with measurable digital signals." },
    "statement": { "tr": "Offline'ın doğasını değiştiremeyiz. Ama ne kadar kör yönetildiğini değiştirebiliriz.", "en": "We cannot change the nature of offline media. We can change how blindly it is managed." },
    "overview": [
      { "tr": "Offline Pazarlama & Medya; OOH, TV, etkinlik, brand activation ve fiziksel görünürlük yatırımlarını yalnızca erişim tahminleriyle değil, mümkün olan her yerde veri ve dijital response sinyalleriyle birlikte planlar.", "en": "Offline Marketing & Media plans OOH, TV, events, brand activation and physical visibility using not only estimated reach, but data and digital-response signals wherever measurement is possible." },
      { "tr": "Sellf offline'ı çoğu iş modelinde ana acquisition kanalı yerine tamamlayıcı veya prestij iletişimi olarak konumlandırır; belediye heat map'leri, elektronik/DSP bağlantılı envanter, QR, özel landing page, branded search ve geo-traffic gibi katmanlarla karar kalitesini artırmaya çalışır.", "en": "Sellf generally positions offline as a complementary or prestige communication layer rather than the primary acquisition channel, improving decision quality through municipal heat maps, electronic/DSP-enabled inventory, QR codes, dedicated landing pages, branded search and geo-traffic signals." }
    ],
    "outcomeBullets": [
      { "tr": "Lokasyon ve medya seçimlerini tahminden mümkün olduğunca veriye taşımak.", "en": "Move location and media selection from estimation toward data wherever possible." },
      { "tr": "Offline görünürlüğün dijital davranışa etkisini ölçebilecek sinyaller oluşturmak.", "en": "Create signals that can measure how offline visibility influences digital behavior." },
      { "tr": "Offline bütçeyi dijital ve diğer medya kanallarıyla tek iletişim planında dengelemek.", "en": "Balance offline investment with digital and other media channels inside one communication plan." }
    ],
    "metrics": [
      { "value": { "tr": "%3,56", "en": "3.56%" }, "label": { "tr": "Yıllık Outdoor Visibility Share", "en": "Annual Outdoor Visibility Share" } },
      { "value": { "tr": "$675K", "en": "$675K" }, "label": { "tr": "Ortalama yıllık yönetilen OOH medya bütçesi", "en": "Average annual OOH media budget managed" } },
      { "value": { "tr": "%12", "en": "12%" }, "label": { "tr": "Offline medya ile ilişkilendirilen ortalama trafik artışı", "en": "Average traffic lift associated with offline media" } }
    ],
    "metricNote": { "tr": "Geçmiş çalışma ortalamalarıdır. Offline attribution dijital kanallar kadar deterministik değildir; ilişkilendirme yöntemleri proje ve veri erişimine göre değişir ve sonuçlar garanti değildir.", "en": "Historical averages. Offline attribution is less deterministic than digital attribution; measurement methods vary by project and data availability and outcomes are not guaranteed." },
    "audience": [
      { "tr": "OOH, TV, etkinlik veya fiziksel marka görünürlüğüne yatırım yapan markalar.", "en": "Brands investing in OOH, TV, events or physical brand visibility." },
      { "tr": "Offline medya kararlarını daha fazla lokasyon, audience ve dijital response verisiyle desteklemek isteyen ekipler.", "en": "Teams that want offline media decisions supported by more location, audience and digital-response data." },
      { "tr": "Prestij, bilinirlik ve marka aktivasyonunu performans kanallarıyla daha tutarlı planlamak isteyen şirketler.", "en": "Companies that want prestige, awareness and brand activation planned more consistently with performance channels." }
    ],
    "approachIntro": { "tr": "Sistemimiz basit: Data → Location → Media → Measurement → Digital Response.", "en": "The system is simple: Data → Location → Media → Measurement → Digital Response." },
    "approachSteps": [
      { "title": { "tr": "Communication Objective", "en": "Communication Objective" }, "body": { "tr": "Offline yatırımın bilinirlik, prestij, lansman, trafik veya başka hangi amacı destekleyeceği netleştirilir.", "en": "The role of offline investment—awareness, prestige, launch, traffic or another objective—is defined first." } },
      { "title": { "tr": "Audience & Location Intelligence", "en": "Audience & Location Intelligence" }, "body": { "tr": "Hedef kitle, lokasyon, trafik, heat map ve erişilebilir diğer çevresel veriler birlikte değerlendirilir.", "en": "Audience, location, traffic, heat maps and other available environmental data are evaluated together." } },
      { "title": { "tr": "Static OOH vs. Data-Driven DOOH", "en": "Static OOH vs. Data-Driven DOOH" }, "body": { "tr": "Uygun olduğunda elektronik veya DSP bağlantılı envanter statik baskıya göre önceliklendirilebilir.", "en": "Where suitable, electronic or DSP-connected inventory can be prioritized over static print." } },
      { "title": { "tr": "Measurement Layer", "en": "Measurement Layer" }, "body": { "tr": "QR, landing page, branded search, direct traffic, geo traffic ve kampanya dönemi dönüşümleri için ölçüm katmanı kurulur.", "en": "Measurement layers are created for QR, landing pages, branded search, direct traffic, geo traffic and campaign-period conversion." } },
      { "title": { "tr": "Integrated Media Planning", "en": "Integrated Media Planning" }, "body": { "tr": "Offline bütçe dijital, PR, performans ve diğer iletişim kanallarıyla aynı medya planında dengelenir.", "en": "Offline investment is balanced with digital, PR, performance and other communication channels inside one media plan." } }
    ],
    "proofBrands": ["Gulf Air", "Goldium", "LVMH", "Renault", "ASCE GYO"],
    "proofNotes": [
      { "tr": "Her marka için aynı offline format veya sonuç varsayılmaz; sayfadaki proof listesi bu çözüm kapsamındaki geçmiş marka deneyimini gösterir.", "en": "The same offline format or outcome is not assumed for every brand; the proof list represents prior brand experience within this solution area." }
    ],
    "operations": {
      "A": ["Offline Media Planning & Buying", "TV Media Planning & Buying", "Outdoor / OOH Advertising", "Experiential Marketing", "Brand Activation", "Event Marketing", "Trade Fair Marketing"],
      "B": ["Digital Out-of-Home (DOOH)", "Radio Advertising", "Sponsorship Strategy & Management", "Retail & In-Store Marketing", "POSM / Point-of-Sale Marketing", "Offline Campaign Measurement", "Offline-to-Online Attribution"],
      "C": ["Offline Media Strategy → Offline Pazarlama & Medya", "Print Media Planning → Offline Media Planning", "Cinema Advertising → Offline Media Planning", "Guerrilla Marketing → Experiential Marketing / Brand Activation"]
    },
    "faq": [
      { "question": { "tr": "Offline medya tamamen ölçülebilir mi?", "en": "Can offline media be fully measured?" }, "answer": { "tr": "Hayır. Offline attribution doğası gereği dijital kadar deterministik değildir. Ama lokasyon verisi, QR, landing page, branded search, geo traffic ve kampanya dönemi sinyalleriyle ölçüm körlüğü azaltılabilir.", "en": "No. Offline attribution is inherently less deterministic than digital. But location data, QR, landing pages, branded search, geo traffic and campaign-period signals can reduce measurement blindness." } },
      { "question": { "tr": "Offline'ı ana satış kanalı olarak mı öneriyorsunuz?", "en": "Do you recommend offline as the primary sales channel?" },
        "answer": { "tr": "Genellikle hayır. İş modeline göre değişmekle birlikte Sellf offline medyayı çoğunlukla tamamlayıcı, bilinirlik veya prestij iletişimi olarak entegre medya planına dahil eder.", "en": "Generally no. Depending on the business model, Sellf usually uses offline as a complementary awareness or prestige layer within an integrated media plan." } },
      { "question": { "tr": "DOOH neden tercih edilebilir?", "en": "Why might DOOH be preferred?" }, "answer": { "tr": "Elektronik ve DSP bağlantılı envanter, uygun olduğunda zamanlama, lokasyon, satın alma ve ölçüm tarafında statik formatlardan daha esnek ve veri odaklı yönetim sağlayabilir.", "en": "Electronic and DSP-connected inventory can provide more flexible, data-led timing, location, buying and measurement than static formats where available." } },
      { "question": { "tr": "Offline ve dijital birlikte planlanabilir mi?", "en": "Can offline and digital be planned together?" }, "answer": { "tr": "Evet. Modelin temel amacı fiziksel görünürlüğü dijital response sinyalleri ve diğer medya yatırımlarıyla aynı iletişim planına bağlamaktır.", "en": "Yes. A core objective is to connect physical visibility with digital-response signals and other media investment inside one communication plan." } }
    ],
    "relatedSlugs": ["performance-marketing", "brand-strategy-branding", "pr-crisis-management", "project-management"],
    "cta": {
      "title": { "tr": "Offline görünürlüğünüzü yalnızca büyük değil, daha akıllı hale getirelim.", "en": "Make your offline visibility not only bigger, but smarter." },
      "description": { "tr": "Lokasyon, medya ve ölçüm modelinizi birlikte değerlendirelim.", "en": "Let's evaluate your location, media and measurement model together." },
      "label": { "tr": "Medya Görüşmesi Planla →", "en": "Schedule a Media Planning Meeting →" }
    }
  },
  "project-management": {
    "seoTitle": { "tr": "Pazarlama ve Dijital Proje Yönetimi | Sellf Media", "en": "Marketing & Digital Project Management | Sellf Media" },
    "metaDescription": { "tr": "Kampanya, website, e-ticaret, lansman ve dijital dönüşüm projelerinizi planlama, ekip koordinasyonu, bütçe ve teslim süreçleriyle uçtan uca yönetin.", "en": "Manage campaigns, websites, e-commerce, launches and digital transformation projects through structured planning, coordination and execution." },
    "statement": { "tr": "Projeyi takvimden değil, amacından yönetiyoruz.", "en": "We manage the project through its objective, not only its timeline." },
    "overview": [
      { "tr": "Proje Yönetimi; marka tarafından belirlenmiş bir kampanya, lansman, website, e-ticaret veya dijital dönüşüm projesinin kapsamını, ekiplerini, bütçesini ve teslim sürecini çalışır hale getiren koordinasyon katmanıdır.", "en": "Project Management is the coordination layer that turns a defined campaign, launch, website, e-commerce or digital-transformation initiative into a workable scope, team, budget and delivery process." },
      { "tr": "Sellf'in rolü genel lojistik, fiziksel proje veya inşaat yönetimi değildir. Kapsam pazarlama, dijital, kreatif, web, e-ticaret, lansman ve dönüşüm projeleriyle sınırlıdır; gereken uygulama yetkinlikleri Sellf'in diğer ekiplerinden veya dış partnerlerden koordine edilebilir.", "en": "Sellf does not provide general logistics, physical-project or construction management. Scope is limited to marketing, digital, creative, web, e-commerce, launch and transformation projects; required execution capabilities can be coordinated from Sellf teams or external partners." }
    ],
    "outcomeBullets": [
      { "tr": "Proje hedefini net kapsam, zaman çizelgesi, sorumluluk ve teslimatlara dönüştürmek.", "en": "Turn a project objective into clear scope, timeline, ownership and deliverables." },
      { "tr": "Müşteri ekipleri, Sellf ekipleri ve tedarikçiler arasındaki koordinasyon kaybını azaltmak.", "en": "Reduce coordination loss between client teams, Sellf teams and suppliers." },
      { "tr": "Karar, bütçe ve kaynakların projenin gerçek amacı üzerinden önceliklendirilmesini sağlamak.", "en": "Prioritize decisions, budget and resources through the real objective of the project." }
    ],
    "metrics": [
      { "value": { "tr": "17", "en": "17" }, "label": { "tr": "Üstlenilen / yönetilen proje", "en": "Projects undertaken / managed" } },
      { "value": { "tr": "6", "en": "6" }, "label": { "tr": "Proje yönetilen ülke", "en": "Countries with managed projects" } },
      { "value": { "tr": "%20–40", "en": "20–40%" }, "label": { "tr": "Gözlemlenen proje başına ortalama verimlilik iyileşme aralığı", "en": "Observed average efficiency-improvement range per project" } }
    ],
    "metricNote": { "tr": "%20–40 aralığı standartlaştırılmış tek bir ölçüm metodolojisiyle hesaplanmış benchmark değildir; geçmiş proje gözlemlerini ifade eder. Proje kapsamları ve KPI'lar değişir, sonuç garanti değildir.", "en": "The 20–40% range is not a benchmark calculated through one standardized methodology; it represents observations from prior projects. Scopes and KPIs vary and results are not guaranteed." },
    "audience": [
      { "tr": "Proje fikri hazır ancak execution planı, ekip koordinasyonu veya teslim yapısı net olmayan markalar.", "en": "Brands with a defined project idea but unclear execution, team coordination or delivery structure." },
      { "tr": "Kampanya, lansman, web, e-ticaret veya dijital dönüşüm projesini yürütecek iç proje kapasitesi sınırlı şirketler.", "en": "Companies with limited internal project capacity for campaigns, launches, web, e-commerce or digital transformation." },
      { "tr": "Sadece koordinasyon katmanı veya gerektiğinde koordinasyonla birlikte uygulama yetkinlikleri isteyen ekipler.", "en": "Teams that need either a coordination layer only or coordination plus execution capabilities where required." }
    ],
    "approachIntro": { "tr": "Amaç daha fazla toplantı yapmak değil; projenin gerçekten ilerlemesini sağlamaktır.", "en": "The goal is not more meetings. It is to make the project actually move forward." },
    "approachSteps": [
      { "title": { "tr": "Project Discovery", "en": "Project Discovery" }, "body": { "tr": "Projenin amacı, iş sonucu, mevcut kararlar ve kritik bağımlılıklar anlaşılır.", "en": "The project objective, business outcome, existing decisions and critical dependencies are understood." } },
      { "title": { "tr": "Scope & Planning", "en": "Scope & Planning" }, "body": { "tr": "Kapsam, teslimatlar, zaman çizelgesi, bütçe, kaynak ve sorumluluklar netleştirilir.", "en": "Scope, deliverables, timeline, budget, resources and ownership are defined." } },
      { "title": { "tr": "Team & Partner Coordination", "en": "Team & Partner Coordination" }, "body": { "tr": "Müşteri, Sellf ve ilgili vendor/partner ekipleri aynı execution planında hizalanır.", "en": "Client, Sellf and relevant vendor/partner teams are aligned inside one execution plan." } },
      { "title": { "tr": "Execution", "en": "Execution" }, "body": { "tr": "İhtiyaç halinde development, creative, performance, branding ve diğer ilgili Sellf ekipleri uygulamaya dahil edilir.", "en": "Development, creative, performance, branding and other relevant Sellf teams can join execution where needed." } },
      { "title": { "tr": "Monitoring & Resolution", "en": "Monitoring & Resolution" }, "body": { "tr": "Riskler, gecikmeler, karar blokajları ve kaynak sorunları projenin amacı üzerinden çözülür.", "en": "Risks, delays, decision blockers and resource issues are resolved through the project objective." } },
      { "title": { "tr": "Delivery", "en": "Delivery" }, "body": { "tr": "Teslimat kriterleri doğrulanır, proje kapatılır veya sonraki işletim aşamasına aktarılır.", "en": "Delivery criteria are confirmed and the project is either closed or transitioned into its next operating phase." } }
    ],
    "proofBrands": ["Himalaya Care", "Zühre Ana", "LVMH", "Guardian of Time"],
    "proofNotes": [
      { "tr": "Bu solution için ortak, standartlaştırılmış bir proprietary framework veya tek benchmark sistemi kullanılmıyor; yöntem projenin amacı ve ihtiyaçlarına göre kuruluyor.", "en": "This solution does not use one standardized proprietary framework or universal benchmark; the management model is built around the project's objective and requirements." }
    ],
    "operations": {
      "A": [],
      "B": ["Marketing Project Management", "Product Launch Management", "Brand Launch Management", "Website Project Management", "E-Commerce Project Management", "Digital Transformation Project Management", "International Expansion Project Management", "Marketing PMO"],
      "C": ["Integrated Campaign Management", "Event Project Management", "Production Project Management", "Creative Project Management", "Vendor & Supplier Management", "Cross-Functional Project Management", "Timeline, Budget & Resource Management"]
    },
    "faq": [
      { "question": { "tr": "Hangi tür projeleri yönetiyorsunuz?", "en": "What types of projects do you manage?" }, "answer": { "tr": "Pazarlama, kampanya, lansman, web sitesi, e-ticaret, kreatif ve dijital dönüşüm gibi Sellf'in uzmanlık alanlarıyla ilişkili projeler yönetilebilir.", "en": "Projects can include marketing, campaigns, launches, websites, e-commerce, creative and digital transformation within Sellf's areas of expertise." } },
      { "question": { "tr": "Lojistik veya fiziksel proje yönetimi yapıyor musunuz?", "en": "Do you provide logistics or physical-project management?" }, "answer": { "tr": "Genel lojistik, inşaat veya fiziksel proje yönetimi bu çözümün kapsamı değildir. Uluslararası bir projenin lojistik bağımlılığı varsa ilgili tarafların koordinasyonu yapılabilir, ancak genel lojistik operasyonu Sellf tarafından yürütülmez.", "en": "General logistics, construction and physical-project management are outside this solution. Where an international project has logistics dependencies, relevant stakeholders can be coordinated, but Sellf does not run the general logistics operation." } },
      { "question": { "tr": "Sadece proje koordinasyonu alabilir miyiz?", "en": "Can we use Sellf only for project coordination?" }, "answer": { "tr": "Evet. Sellf yalnızca proje yönetimi ve koordinasyon katmanı sağlayabilir; uygulama yetkinlikleri ihtiyaç varsa ayrıca devreye alınabilir.", "en": "Yes. Sellf can provide only the project-management and coordination layer; execution capabilities can be added separately when required." } },
      { "question": { "tr": "Entegre Danışmanlık'tan farkı nedir?", "en": "How is this different from Integrated Consulting?" }, "answer": { "tr": "Entegre Danışmanlık şirketin uzun dönemli büyüme yönünü ele alır. Proje Yönetimi ise tanımlı bir işi belirli bir zaman, kapsam ve teslim hedefi içinde hayata geçirmeye odaklanır.", "en": "Integrated Consulting addresses the company's long-term growth direction. Project Management focuses on delivering a defined initiative within a specific time, scope and delivery objective." } }
    ],
    "relatedSlugs": ["integrated-consulting", "digital-products-software-development", "design-creative", "offline-marketing-media"],
    "cta": {
      "title": { "tr": "Projenin fikri hazırsa, execution'ı belirsiz kalmasın.", "en": "If the idea is ready, execution shouldn't remain uncertain." },
      "description": { "tr": "Kapsam, ekip, zaman çizelgesi ve teslim modelini birlikte değerlendirelim.", "en": "Let's evaluate the scope, team, timeline and delivery model together." },
      "label": { "tr": "Projenizi Konuşalım →", "en": "Discuss Your Project →" }
    }
  },
  "design-creative": {
    "seoTitle": { "tr": "Tasarım, Kreatif ve İçerik Üretimi | Sellf Media", "en": "Design, Creative & Content Production | Sellf Media" },
    "metaDescription": { "tr": "Sosyal medya, video, motion, 3D, reklam kreatifi, web, ambalaj, fotoğraf ve tüm marka tasarımlarınızı yüksek kaliteli kreatif sistemlerle üretin.", "en": "Create social content, video, motion, 3D, advertising creative, web, packaging, photography and high-quality brand assets across every channel." },
    "statement": { "tr": "Kreatifin görevi yalnızca dikkat çekmek değil; kullanıldığı kanalda doğru işi yapmaktır.", "en": "Creative should not only attract attention; it should do the right job in the channel where it is used." },
    "overview": [
      { "tr": "Tasarım & Kreatif; sosyal medya içeriğinden performance creative'e, motion ve 3D'den web, ambalaj, video, ürün/fashion fotoğrafı ve UGC üretimine kadar markanın ihtiyaç duyduğu görsel ve içerik üretimlerini tek yaratıcı sistem altında toplar.", "en": "Design & Creative brings social content, performance creative, motion, 3D, web, packaging, video, product/fashion photography and UGC production together inside one creative system." },
      { "tr": "Amaç yalnızca estetik üretim yapmak değil; marka stratejisi, kanal gereksinimi, hedef kitle ve mümkün olan yerlerde performans geri-beslemesiyle kreatifin işlevini netleştirmektir.", "en": "The objective is not aesthetics alone. Brand strategy, channel requirements, audience context and—where measurable—performance feedback define what the creative needs to achieve." }
    ],
    "outcomeBullets": [
      { "tr": "Farklı kanallardaki kreatif üretimleri ortak bir marka ve art-direction standardında toplamak.", "en": "Unify creative production across channels under one brand and art-direction standard." },
      { "tr": "Performance, social, web ve e-ticaret için kanalın ihtiyacına göre format ve mesaj üretmek.", "en": "Produce format and messaging appropriate to performance, social, web and e-commerce channels." },
      { "tr": "Statik, motion, 3D, fotoğraf ve video üretimlerini birbirinden kopuk değil, aynı kampanya sistemi içinde planlamak.", "en": "Plan static, motion, 3D, photography and video as one campaign system rather than disconnected assets." }
    ],
    "metrics": [],
    "metricNote": { "tr": "Kreatif üretim türleri ve başarı kriterleri projeden projeye değiştiği için bu solution için tek, standartlaştırılmış sayısal benchmark yayınlanmıyor.", "en": "Creative formats and success criteria vary substantially by project, so no single standardized numerical benchmark is published for this solution." },
    "audience": [
      { "tr": "Sosyal medya ve always-on içerik üretimini daha tutarlı sistemle yönetmek isteyen markalar.", "en": "Brands that need a more consistent system for social and always-on content production." },
      { "tr": "Reklam kreatiflerinin yalnızca estetik değil, kanal ve dönüşüm bağlamında çalışmasını isteyen performance ekipleri.", "en": "Performance teams that need advertising creative to work within channel and conversion context, not aesthetics alone." },
      { "tr": "Video, motion, 3D, ürün/fashion fotoğrafı, web veya ambalaj üretimlerini tek kreatif partner altında toplamak isteyen şirketler.", "en": "Companies that want video, motion, 3D, product/fashion photography, web or packaging production coordinated by one creative partner." }
    ],
    "approachIntro": { "tr": "Kreatifi önce ne için üretildiği üzerinden tanımlar, sonra estetik ve üretim kararlarını o amaç etrafında kurarız.", "en": "We define creative through the job it needs to do first, then build aesthetic and production decisions around that objective." },
    "approachSteps": [
      { "title": { "tr": "Objective", "en": "Objective" }, "body": { "tr": "Kreatifin marka, kampanya, içerik veya dönüşüm içindeki görevi netleştirilir.", "en": "The role of the creative within brand, campaign, content or conversion is clarified." } },
      { "title": { "tr": "Brand & Channel Context", "en": "Brand & Channel Context" }, "body": { "tr": "Brandbook, hedef kitle, platform, format ve kullanım koşulları birlikte değerlendirilir.", "en": "Brandbook, audience, platform, format and usage context are considered together." } },
      { "title": { "tr": "Concept & Art Direction", "en": "Concept & Art Direction" }, "body": { "tr": "Kampanya fikri, görsel dil, mesaj ve üretim yönü belirlenir.", "en": "Campaign concept, visual language, message and production direction are defined." } },
      { "title": { "tr": "Production", "en": "Production" }, "body": { "tr": "Statik, motion, 3D, video, fotoğraf, UGC veya diğer gerekli formatlar üretilir.", "en": "Required static, motion, 3D, video, photography, UGC or other formats are produced." } },
      { "title": { "tr": "Adaptation", "en": "Adaptation" }, "body": { "tr": "Kreatifler platform, placement, ölçü ve kanal ihtiyaçlarına göre adapte edilir.", "en": "Creative is adapted to platform, placement, size and channel requirements." } },
      { "title": { "tr": "Feedback & Iteration", "en": "Feedback & Iteration" }, "body": { "tr": "Uygun projelerde performans ve kullanıcı geri-beslemesi sonraki kreatif iterasyonlara aktarılır.", "en": "Where measurable, performance and user feedback informs the next creative iterations." } }
    ],
    "proofBrands": ["Qashé", "Grey Manner", "Iamlovein", "GKC", "Philips"],
    "proofNotes": [
      { "tr": "Qashé portföy çalışmasında brandbook, persona ve kampanya takvimi; Grey Manner'da production ve brandbook; Iamlovein'de 50 micro/nano influencer ile UGC üretimi yer aldı.", "en": "Qashé work included brandbook, personas and campaign planning; Grey Manner included production and brandbook; Iamlovein included UGC production with 50 micro/nano influencers." },
      { "tr": "Philips çalışmasında dijital ve fiziksel temaslar içinde 3D printer tabanlı parkmeter aktivasyonu da yer aldı.", "en": "Philips work also included a 3D-printer-based parkmeter activation within its digital and physical touchpoint program." }
    ],
    "operations": {
      "A": ["Social Media Management", "Social Media Content Production", "Performance Creative", "Motion Design & Motion Graphics", "3D Design & Animation", "UI/UX Design", "Web Design", "Packaging Design", "Video Production", "Commercial Film Production", "Product Photography", "UGC Content Production"],
      "B": ["Creative Strategy", "Art Direction", "Campaign Creative Development", "Graphic Design", "Community Management", "E-Commerce Design", "Fashion & Catalog Photography", "Event Production", "Copywriting", "Post-Production"],
      "C": ["Creative Concept Development → Creative Strategy", "Key Visual Design → Campaign Creative / Graphic Design", "Static Design → Graphic Design", "2D Animation → Motion Design & Motion Graphics", "Social Media Content Design → Social Media Content Production", "Presentation & Corporate Design → Graphic Design / Corporate Identity", "Creative Copywriting → Copywriting", "Video Editing → Video Production / Post-Production"]
    },
    "faq": [
      { "question": { "tr": "Tasarım & Kreatif sadece sosyal medya tasarımı mı?", "en": "Is Design & Creative mainly social-media design?" }, "answer": { "tr": "Hayır. Sosyal medya kapsamın bir parçasıdır; motion, 3D, performance creative, web design, packaging, video, ticari film, ürün/fashion fotoğrafı ve UGC gibi farklı üretimler de yer alabilir.", "en": "No. Social is one part of the scope; motion, 3D, performance creative, web design, packaging, video, commercial film, product/fashion photography and UGC can also be included." } },
      { "question": { "tr": "Kreatif performans verisine göre optimize ediliyor mu?", "en": "Is creative optimized using performance data?" }, "answer": { "tr": "Ölçülebilir kanallarda evet. CTR, conversion ve diğer performans geri-beslemeleri yeni kreatif varyasyonlara aktarılabilir; ancak her kreatif işin başarısı tek bir performans metriğiyle tanımlanmaz.", "en": "Where the channel is measurable, yes. CTR, conversion and other performance feedback can inform new variations, although not every creative outcome should be reduced to one performance metric." } },
      { "question": { "tr": "Çekim ve prodüksiyon da yapıyor musunuz?", "en": "Do you also provide shoots and production?" },
        "answer": { "tr": "Evet. Proje ihtiyacına göre video, ticari film, ürün, fashion/catalog fotoğrafı, event production ve post-production süreçleri kapsama alınabilir.", "en": "Yes. Depending on the project, video, commercial film, product, fashion/catalog photography, event production and post-production can be included." } },
      { "question": { "tr": "Branding ile Tasarım & Kreatif arasındaki fark nedir?", "en": "What is the difference between Branding and Design & Creative?" }, "answer": { "tr": "Branding markanın konumlandırma, kimlik ve uzun vadeli marka sistemini kurar; Tasarım & Kreatif ise bu sistemin kampanya, içerik ve üretim çıktılarında hayata geçirilmesine odaklanır.", "en": "Branding builds positioning, identity and the long-term brand system; Design & Creative focuses on bringing that system to life through campaigns, content and production outputs." } }
    ],
    "relatedSlugs": ["brand-strategy-branding", "performance-marketing", "digital-products-software-development", "ecommerce-growth"],
    "cta": {
      "title": { "tr": "Kreatifi yalnızca güzel değil, işlevsel hale getirelim.", "en": "Let's make creative not only beautiful, but functional." },
      "description": { "tr": "Markanız, kanalınız ve üretim ihtiyacınız için doğru kreatif sistemi birlikte konuşalım.", "en": "Let's discuss the right creative system for your brand, channels and production needs." },
      "label": { "tr": "Kreatif Görüşmesi Planla →", "en": "Schedule a Creative Meeting →" }
    }
  },
  "pr-crisis-management": {
    "seoTitle": { "tr": "PR ve Kriz Yönetimi | Sellf Media", "en": "PR & Crisis Management | Sellf Media" },
    "metaDescription": { "tr": "Marka itibarı, lansman, medya ilişkileri ve kriz iletişimini strateji, ölçüm ve entegre pazarlama yaklaşımıyla yönetin.", "en": "Manage reputation, launches, media relations and crisis communication through integrated strategy, measurement and specialist PR execution." },
    "statement": { "tr": "PR'ı haber çıkarmak için değil, marka değerini yönetmek için kullanıyoruz.", "en": "We use PR to manage brand value, not simply to generate coverage." },
    "overview": [
      { "tr": "PR & Kriz Yönetimi; medya görünürlüğü, kurumsal iletişim, itibar, thought leadership, influencer relations ve kriz iletişimini markanın uzun vadeli güven ve algı sistemi içinde yönetir.", "en": "PR & Crisis Management manages media visibility, corporate communications, reputation, thought leadership, influencer relations and crisis communication inside the brand's long-term trust and perception system." },
      { "tr": "Amaç yalnızca basın görünürlüğü üretmek değildir. Mesaj, medya, sosyal listening ve marka stratejisi aynı iletişim çerçevesinde değerlendirilir; kriz durumlarında hız kadar doğruluk, yetki ve tutarlılık da yönetilir.", "en": "The objective is not simply generating press coverage. Messaging, media, social listening and brand strategy are considered in one communication framework; in crisis situations, accuracy, ownership and consistency matter alongside speed." }
    ],
    "outcomeBullets": [
      { "tr": "Markanın medya, sosyal ve kurumsal iletişim mesajlarını ortak bir itibar stratejisinde birleştirmek.", "en": "Unify media, social and corporate communication messages under one reputation strategy." },
      { "tr": "Potansiyel itibar ve kriz sinyallerini daha erken görünür hale getirmek.", "en": "Make potential reputation and crisis signals visible earlier." },
      { "tr": "Lansman, executive PR ve thought leadership çalışmalarını iş ve marka hedefleriyle hizalamak.", "en": "Align launches, executive PR and thought leadership with business and brand objectives." }
    ],
    "metrics": [],
    "metricNote": { "tr": "PR ve kriz çalışmalarının kapsamı, medya ortamı ve başarı kriterleri projeye göre değiştiği için bu solution için tek standart sayısal benchmark yayınlanmıyor.", "en": "PR and crisis scopes, media environments and success criteria vary by project, so no single standardized numerical benchmark is published for this solution." },
    "audience": [
      { "tr": "Kurumsal itibarını ve medya ilişkilerini daha sistematik yönetmek isteyen şirketler.", "en": "Companies that need a more systematic approach to corporate reputation and media relations." },
      { "tr": "Lansman, yönetici iletişimi veya thought leadership çalışması planlayan markalar.", "en": "Brands planning launches, executive communication or thought-leadership programs." },
      { "tr": "Kriz öncesi hazırlık, social listening ve kriz anında yapılandırılmış iletişim mekanizması isteyen ekipler.", "en": "Teams that need pre-crisis preparation, social listening and a structured communication mechanism during a crisis." }
    ],
    "approachIntro": { "tr": "İletişim ancak marka, risk ve iş hedefleriyle aynı çerçevede yönetildiğinde gerçek itibar değeri üretir.", "en": "Communication creates real reputation value only when it is managed in the same framework as brand, risk and business objectives." },
    "approachSteps": [
      { "title": { "tr": "Reputation Objective", "en": "Reputation Objective" }, "body": { "tr": "Markanın neyi güçlendirmek veya korumak istediği netleştirilir.", "en": "What the brand needs to strengthen or protect is clarified." } },
      { "title": { "tr": "Listening & Risk Map", "en": "Listening & Risk Map" }, "body": { "tr": "Medya, sosyal ve ilgili paydaş sinyalleri izlenerek potansiyel risk alanları tanımlanır.", "en": "Media, social and stakeholder signals are monitored to identify potential risk areas." } },
      { "title": { "tr": "Message Architecture", "en": "Message Architecture" }, "body": { "tr": "Ana mesaj, kanıt, ton, sözcü ve paydaş iletişim çerçevesi hazırlanır.", "en": "Core messages, evidence, tone, spokesperson and stakeholder communication framework are prepared." } },
      { "title": { "tr": "Media & Influence", "en": "Media & Influence" }, "body": { "tr": "Media relations, press office, influencer/KOL ve thought leadership çalışmaları plana göre yürütülür.", "en": "Media relations, press office, influencer/KOL and thought-leadership work are executed against the plan." } },
      { "title": { "tr": "Crisis Response", "en": "Crisis Response" }, "body": { "tr": "Kriz anında doğrulama, yetki, mesaj ve kanal akışı net bir karar yapısıyla yönetilir.", "en": "During a crisis, verification, ownership, messaging and channel flow are managed through a clear decision structure." } },
      { "title": { "tr": "Review", "en": "Review" }, "body": { "tr": "Medya, algı ve paydaş geri-beslemeleri incelenerek iletişim modeli güncellenir.", "en": "Media, perception and stakeholder feedback are reviewed to update the communication model." } }
    ],
    "proofBrands": [],
    "proofNotes": [],
    "operations": {
      "A": ["Media Relations", "Corporate Communications", "Brand Reputation Management", "Online Reputation Management", "Crisis Communication", "Social Listening", "Executive & Founder PR", "Thought Leadership", "Influencer Marketing"],
      "B": ["PR Strategy", "Press Office Management", "Press Release Management", "Reputation Monitoring", "Media Monitoring", "Product Launch PR", "Brand Launch PR", "Event PR", "Influencer Relations", "KOL Management"],
      "C": ["Crisis Management → Crisis Communication", "Crisis Preparedness & Response Planning → Crisis Communication", "Corporate Reputation Strategy → Brand Reputation Management"]
    },
    "faq": [
      { "question": { "tr": "PR hizmeti yalnızca basın bülteni ve haber çıkışı mı?", "en": "Is PR mainly press releases and coverage?" }, "answer": { "tr": "Hayır. Medya ilişkileri yalnızca bir parçadır; itibar yönetimi, corporate communications, social listening, executive PR, thought leadership ve kriz iletişimi de kapsam içinde olabilir.", "en": "No. Media relations are only one part; reputation management, corporate communications, social listening, executive PR, thought leadership and crisis communication can also be included." } },
      { "question": { "tr": "Kriz başlamadan önce çalışabilir miyiz?", "en": "Can we work together before a crisis occurs?" }, "answer": { "tr": "Evet. Risk mapping, social listening, mesaj mimarisi, sözcü ve response planı kriz öncesinde hazırlanabilir.", "en": "Yes. Risk mapping, social listening, message architecture, spokesperson structure and response planning can be prepared before a crisis." } },
      { "question": { "tr": "Online itibar da kapsamda mı?", "en": "Is online reputation included?" }, "answer": { "tr": "Evet. Online Reputation Management, social listening ve reputation monitoring ihtiyaç halinde medya ve kurumsal iletişim modeliyle birlikte ele alınır.", "en": "Yes. Online Reputation Management, social listening and reputation monitoring can be connected with media and corporate communications when required." } },
      { "question": { "tr": "Influencer Marketing neden PR altında da görünüyor?", "en": "Why does Influencer Marketing also appear under PR?" }, "answer": { "tr": "Influencer Marketing tek canonical operasyon olarak ele alınır; PR bağlamında influencer relations ve KOL yönetimi itibar ve iletişim hedefleriyle ilişkili olduğu için bu solution altında da görünür.", "en": "Influencer Marketing is treated as one canonical operation; in PR, influencer relations and KOL management also appear because they can support reputation and communication objectives." } }
    ],
    "relatedSlugs": ["brand-strategy-branding", "offline-marketing-media", "design-creative", "integrated-consulting"],
    "cta": {
      "title": { "tr": "İtibarınızı yalnızca görünürlükle değil, doğru mesaj ve doğru sistemle yönetin.", "en": "Manage reputation through the right message and system, not visibility alone." },
      "description": { "tr": "Marka itibarı, medya ve kriz iletişimi ihtiyacınızı birlikte değerlendirelim.", "en": "Let's evaluate your reputation, media and crisis-communication needs together." },
      "label": { "tr": "PR Görüşmesi Planla →", "en": "Schedule a PR Meeting →" }
    }
  },
  "seo-organic-growth": {
    "seoTitle": { "tr": "SEO ve Organik Büyüme Danışmanlığı | Sellf Media", "en": "SEO & Organic Growth Consulting | Sellf Media" },
    "metaDescription": { "tr": "Teknik SEO, içerik, site mimarisi, e-ticaret SEO, uluslararası SEO ve AI Search optimizasyonuyla sürdürülebilir organik büyüme oluşturun.", "en": "Build sustainable organic growth through technical SEO, content, site architecture, e-commerce SEO, international SEO and AI search optimization." },
    "statement": { "tr": "Organik büyüme, daha fazla içerik yayınlamak değil; dijital varlığın arama talebini daha iyi karşılamasını sağlamaktır.", "en": "Organic growth is not about publishing more content. It is about making the digital asset answer search demand better." },
    "overview": [
      { "tr": "SEO & Organik Büyüme; teknik altyapı, site mimarisi, içerik, otorite, internal linking ve arama niyetini birlikte optimize ederek sitenin uzun vadeli organik değerini büyütür.", "en": "SEO & Organic Growth increases the long-term organic value of a website by connecting technical infrastructure, site architecture, content, authority, internal linking and search intent." },
      { "tr": "Kapsam klasik Google SEO ile sınırlı değildir; e-ticaret, B2B, local, international, programmatic SEO ve AI Search / Generative Engine Optimization ihtiyaçları aynı arama görünürlüğü sistemi içinde değerlendirilebilir.", "en": "Scope is not limited to classic Google SEO; e-commerce, B2B, local, international, programmatic SEO and AI Search / Generative Engine Optimization can be addressed within the same search-visibility system." }
    ],
    "outcomeBullets": [
      { "tr": "Teknik ve mimari sorunları gidererek arama motorlarının siteyi daha doğru taramasını ve anlamasını sağlamak.", "en": "Remove technical and architectural barriers so search engines can crawl and understand the site more effectively." },
      { "tr": "Arama niyetine göre içerik ve landing page yapısını organik talebe bağlamak.", "en": "Connect content and landing-page architecture to organic demand through search intent." },
      { "tr": "Paid media dışında zamanla değer biriktiren, sürdürülebilir bir organik acquisition varlığı oluşturmak.", "en": "Build a sustainable acquisition asset that compounds over time beyond paid media." }
    ],
    "metrics": [],
    "metricNote": { "tr": "SEO performansı sektör, domain geçmişi, teknik yapı ve arama talebine göre büyük ölçüde değiştiği için tüm müşterileri kapsayan tek bir aggregate benchmark yayınlanmıyor.", "en": "SEO performance varies materially by industry, domain history, technical structure and search demand, so no single aggregate benchmark is published across all clients." },
    "audience": [
      { "tr": "Organik görünürlüğünü teknik ve içerik tarafında sistematik büyütmek isteyen markalar.", "en": "Brands that want systematic organic visibility growth across technical and content layers." },
      { "tr": "E-ticaret, B2B, local veya uluslararası arama talebinde rekabet eden şirketler.", "en": "Companies competing in e-commerce, B2B, local or international search demand." },
      { "tr": "Site migration, mimari değişim veya AI Search görünürlüğü gibi daha ileri SEO ihtiyaçları olan ekipler.", "en": "Teams with advanced SEO requirements such as migrations, architecture changes or AI Search visibility." }
    ],
    "approachIntro": { "tr": "Arama görünürlüğünü içerik departmanının değil, teknik altyapı, bilgi mimarisi, içerik ve otoritenin ortak çıktısı olarak yönetiyoruz.", "en": "We manage search visibility as the combined output of technical infrastructure, information architecture, content and authority—not as a content-department task alone." },
    "approachSteps": [
      { "title": { "tr": "SEO Audit", "en": "SEO Audit" }, "body": { "tr": "Teknik, içerik, indexation, authority ve organik rakip yapısı incelenir.", "en": "Technical, content, indexation, authority and organic-competitor factors are reviewed." } },
      { "title": { "tr": "Technical Foundation", "en": "Technical Foundation" }, "body": { "tr": "Crawlability, indexation, performance, structured data ve teknik engeller önceliklendirilir.", "en": "Crawlability, indexation, performance, structured data and technical barriers are prioritized." } },
      { "title": { "tr": "Architecture & Intent", "en": "Architecture & Intent" }, "body": { "tr": "Keyword/search intent, site architecture ve internal linking birbiriyle hizalanır.", "en": "Keyword/search intent, site architecture and internal linking are aligned." } },
      { "title": { "tr": "Content", "en": "Content" }, "body": { "tr": "Mevcut içerik optimize edilir ve talep boşluklarına göre yeni içerik/landing planı oluşturulur.", "en": "Existing content is optimized and new content/landing plans are built around demand gaps." } },
      { "title": { "tr": "Authority", "en": "Authority" }, "body": { "tr": "Digital PR, backlink ve topical authority ihtiyaçları organik rekabet bağlamında değerlendirilir.", "en": "Digital PR, backlink and topical-authority needs are evaluated in the context of organic competition." } },
      { "title": { "tr": "AI Search & Measurement", "en": "AI Search & Measurement" }, "body": { "tr": "GEO / AI Search görünürlüğü ve klasik organik KPI'lar birlikte izlenir; doğrulanabilir yapılandırılmış içerik ve entity sinyalleri güçlendirilir.", "en": "GEO / AI Search visibility and classic organic KPIs are monitored together, with stronger structured content and entity signals where appropriate." } }
    ],
    "proofBrands": ["Goldium", "Elitehair", "Qashé"],
    "proofNotes": [
      { "tr": "Goldium portföy çalışmasında SEO; e-ticaret, funnel ve tracking ile aynı büyüme sisteminde ele alındı.", "en": "Goldium's portfolio work connected SEO with e-commerce, funnel and tracking inside the same growth system." },
      { "tr": "Elitehair portföy kaydında %32 organik otorite metriği raporlandı.", "en": "Elitehair's portfolio record reports a 32% organic-authority metric." },
      { "tr": "Qashé portföy kaydında organik trafik metriği de takip edildi; exact reporting basis public copy'de ayrıca yorumlanmıyor.", "en": "Qashé's portfolio record also tracks an organic-traffic metric; the exact reporting basis is not further interpreted in public copy." }
    ],
    "operations": {
      "A": ["SEO Audit", "Technical SEO", "On-Page SEO", "Content SEO", "E-Commerce SEO", "B2B SEO", "Local SEO", "International SEO", "Digital PR & Link Building", "SEO Migration", "Website Architecture & Internal Linking", "Programmatic SEO", "AI Search & Generative Engine Optimization (GEO)"],
      "B": ["Keyword Research & Search Intent Strategy", "SEO Content Strategy", "Semantic SEO", "Multilingual SEO", "Backlink Strategy", "Organic Competitor Analysis", "Google Search Console Optimization"],
      "C": ["SEO Strategy → SEO & Organik Büyüme", "AI Search Optimization / GEO / AI Visibility & LLM Search → AI Search & Generative Engine Optimization (GEO)"]
    },
    "faq": [
      { "question": { "tr": "SEO ne kadar sürede sonuç verir?", "en": "How long does SEO take to produce results?" }, "answer": { "tr": "Tek bir sabit süre yoktur. Domain geçmişi, teknik borç, rekabet, içerik kapsamı ve arama talebi süreyi belirler. SEO genellikle paid media'dan daha yavaş başlar ancak zaman içinde biriken varlık değeri üretir.", "en": "There is no fixed timeline. Domain history, technical debt, competition, content scope and search demand all affect timing. SEO typically starts more slowly than paid media but can build compounding asset value over time." } },
      { "question": { "tr": "Teknik SEO ve içerik SEO birlikte mi yürütülüyor?", "en": "Do technical and content SEO run together?" }, "answer": { "tr": "İhtiyaca göre evet. Teknik temel, site mimarisi, arama niyeti ve içerik birbirini etkilediği için genellikle tek roadmap içinde önceliklendirilir.", "en": "Where needed, yes. Technical foundation, site architecture, search intent and content influence each other and are generally prioritized within one roadmap." } },
      { "question": { "tr": "AI Search / GEO hizmetiniz var mı?", "en": "Do you provide AI Search / GEO?" }, "answer": { "tr": "Evet. AI Search & Generative Engine Optimization (GEO), klasik SEO'nun yerine değil, arama görünürlüğü sisteminin genişleyen bir katmanı olarak ele alınır.", "en": "Yes. AI Search & Generative Engine Optimization (GEO) is treated not as a replacement for classic SEO, but as an expanding layer of search visibility." } },
      { "question": { "tr": "SEO'yu performans pazarlamadan ayrı mı yönetiyorsunuz?", "en": "Is SEO managed separately from performance marketing?" },
        "answer": { "tr": "Operasyonları ayrı uzmanlık alanları olabilir ancak arama talebi, landing page, conversion ve toplam acquisition ekonomisi gerektiğinde aynı büyüme perspektifiyle birlikte değerlendirilir.", "en": "They can be separate specialist operations, but search demand, landing pages, conversion and total acquisition economics are evaluated together when useful." } }
    ],
    "relatedSlugs": ["performance-marketing", "conversion-funnel-optimization", "ecommerce-growth", "b2b-marketing"],
    "cta": {
      "title": { "tr": "Organik trafiği bir kampanya değil, büyüyen bir dijital varlık haline getirelim.", "en": "Turn organic traffic into a growing digital asset, not a one-off campaign." },
      "description": { "tr": "Teknik yapı, içerik, arama talebi ve organik büyüme fırsatlarınızı birlikte değerlendirelim.", "en": "Let's evaluate your technical foundation, content, search demand and organic-growth opportunities together." },
      "label": { "tr": "SEO Görüşmesi Planla →", "en": "Schedule an SEO Meeting →" }
    }
  },
  "conversion-funnel-optimization": {
    "seoTitle": { "tr": "Dönüşüm Oranı ve Funnel Optimizasyonu | Sellf Media", "en": "Conversion Rate & Funnel Optimization | Sellf Media" },
    "metaDescription": { "tr": "Müşteri edinimi yolculuğunuzu uçtan uca haritalandırın; funnel, landing page, checkout, lead ve satış dönüşümlerini veriyle optimize edin.", "en": "Map your customer acquisition journey and optimize landing pages, checkout, leads, sales funnels and conversion through measurable data." },
    "statement": { "tr": "Daha fazla trafik her zaman daha fazla büyüme değildir. Önce mevcut talebin nerede kaybolduğunu bulmak gerekir.", "en": "More traffic does not always mean more growth. First, find where existing demand is being lost." },
    "overview": [
      { "tr": "Dönüşüm & Funnel Optimizasyonu; ziyaretçiden lead'e, lead'den satışa veya ürün görüntülemeden checkout'a kadar müşteri edinimi yolculuğundaki kayıpları veriye dayanarak bulur ve iyileştirir.", "en": "Conversion & Funnel Optimization identifies and improves loss points across the acquisition journey—from visitor to lead, lead to sale, or product view to checkout—using measurable data." },
      { "tr": "CRO yalnızca buton rengi veya tek landing page testi değildir. Tracking, funnel mimarisi, kullanıcı davranışı, mesaj, UX, form, checkout ve satış süreci aynı dönüşüm sistemi içinde değerlendirilebilir.", "en": "CRO is not simply a button-color or single landing-page test. Tracking, funnel architecture, user behavior, messaging, UX, forms, checkout and the sales process can all be evaluated inside the same conversion system." }
    ],
    "outcomeBullets": [
      { "tr": "Mevcut trafik ve talep içindeki en büyük dönüşüm kayıplarını görünür hale getirmek.", "en": "Make the largest conversion losses inside existing traffic and demand visible." },
      { "tr": "Landing page, form, checkout ve sales funnel adımlarını önceliklendirilmiş deneylerle iyileştirmek.", "en": "Improve landing pages, forms, checkout and sales-funnel steps through prioritized experiments." },
      { "tr": "Yeni trafik satın almadan önce mevcut acquisition yatırımının verimliliğini yükseltmek.", "en": "Increase the efficiency of existing acquisition investment before buying more traffic." }
    ],
    "metrics": [],
    "metricNote": { "tr": "Dönüşüm oranı başlangıç seviyesi, traffic mix, ürün, funnel uzunluğu ve iş modeline göre büyük ölçüde değişir; bu nedenle tüm projeler için tek aggregate benchmark yayınlanmıyor.", "en": "Conversion rates vary materially by starting point, traffic mix, product, funnel length and business model, so no single aggregate benchmark is published across all projects." },
    "audience": [
      { "tr": "Yeterli trafik veya lead'e rağmen satış/dönüşüm verimliliği düşük olan işletmeler.", "en": "Businesses with meaningful traffic or leads but weak sales/conversion efficiency." },
      { "tr": "E-ticarette cart, checkout veya product-page kayıplarını azaltmak isteyen markalar.", "en": "E-commerce brands that need to reduce product-page, cart or checkout loss." },
      { "tr": "B2B'de lead'den opportunity ve contract'a geçişi iyileştirmek isteyen satış ve pazarlama ekipleri.", "en": "B2B sales and marketing teams that need to improve lead-to-opportunity and contract conversion." }
    ],
    "approachIntro": { "tr": "Önce ölçümün doğru olduğundan emin olur, sonra funnel'ın en büyük ekonomik kaybını bulup deney sırasını buna göre kurarız.", "en": "We first verify measurement, then identify the largest economic loss in the funnel and prioritize experiments around it." },
    "approachSteps": [
      { "title": { "tr": "Measurement Integrity", "en": "Measurement Integrity" }, "body": { "tr": "Conversion event'leri, funnel adımları ve veri bütünlüğü doğrulanır.", "en": "Conversion events, funnel steps and data integrity are validated." } },
      { "title": { "tr": "Funnel Audit", "en": "Funnel Audit" }, "body": { "tr": "Journey baştan sona haritalanır ve kayıp oranları ekonomik etkiyle birlikte analiz edilir.", "en": "The journey is mapped end to end and loss rates are analyzed alongside economic impact." } },
      { "title": { "tr": "Behavior Analysis", "en": "Behavior Analysis" }, "body": { "tr": "Analytics, heatmap, session ve kullanıcı davranış sinyalleriyle nedenler araştırılır.", "en": "Analytics, heatmaps, sessions and user-behavior signals are used to investigate causes." } },
      { "title": { "tr": "Prioritization", "en": "Prioritization" }, "body": { "tr": "Etki, güven, geliştirme eforu ve potansiyel ticari değerle test backlog'u oluşturulur.", "en": "A testing backlog is built using impact, confidence, development effort and potential commercial value." } },
      { "title": { "tr": "Experimentation", "en": "Experimentation" }, "body": { "tr": "A/B test, landing, form, UX, copy veya checkout iyileştirmeleri uygulanır.", "en": "A/B tests and landing-page, form, UX, copy or checkout improvements are implemented." } },
      { "title": { "tr": "Rollout & Learning", "en": "Rollout & Learning" }, "body": { "tr": "Kazanan değişiklikler yayına alınır; sonuçlar sonraki test hipotezlerine geri beslenir.", "en": "Winning changes are rolled out and results are fed into the next testing hypotheses." } }
    ],
    "proofBrands": ["Evepack", "Goldium", "Canias", "Sfera.ai"],
    "proofNotes": [
      { "tr": "Evepack çalışmasında funnel, CRM, satış, tracking ve otomasyon birlikte yeniden yapılandırıldı; portföy kaydında %43 dönüş hızı düşüşü ve %123 operasyonel kârlılık metriği yer alıyor.", "en": "Evepack work restructured funnel, CRM, sales, tracking and automation together; its portfolio record includes a 43% reduction in turnaround time and a 123% operational-profitability metric." },
      { "tr": "Goldium çalışmasında e-ticaret, SEO, funnel ve tracking aynı büyüme sistemi içinde ele alındı.", "en": "Goldium work connected e-commerce, SEO, funnel and tracking inside the same growth system." },
      { "tr": "Canias ve Sfera çalışmalarında çok aşamalı B2B/B2C funnel yapıları satış ve growth sistemleriyle birlikte değerlendirildi.", "en": "Canias and Sfera work addressed multi-step B2B/B2C funnels alongside sales and growth systems." }
    ],
    "operations": {
      "A": ["Conversion Rate Optimization (CRO)", "Funnel Audit", "Sales Funnel Optimization", "Customer Journey Optimization", "Landing Page Optimization", "A/B Testing", "Checkout Optimization", "E-Commerce Conversion Optimization", "B2B Funnel Optimization", "Personalization Strategy"],
      "B": ["Funnel Strategy", "Funnel Architecture", "Lead Form Optimization", "Lead Generation Funnel Optimization", "UX Conversion Optimization", "Conversion Copywriting", "User Behavior Analysis", "Heatmap & Session Analysis", "Experimentation Program Management"],
      "C": ["Funnel Mapping → Funnel Audit / Funnel Strategy", "Multivariate Testing → A/B Testing", "Conversion Tracking → Performance Tracking", "Attribution & Funnel Measurement → Marketing Attribution"]
    },
    "faq": [
      { "question": { "tr": "CRO sadece landing page optimizasyonu mu?", "en": "Is CRO only landing-page optimization?" }, "answer": { "tr": "Hayır. Landing page yalnızca bir temas noktasıdır; funnel mimarisi, form, checkout, UX, copy, kullanıcı davranışı ve B2B satış adımları da dönüşüm sisteminin parçası olabilir.", "en": "No. Landing pages are only one touchpoint; funnel architecture, forms, checkout, UX, copy, user behavior and B2B sales steps can all be part of the conversion system." } },
      { "question": { "tr": "A/B test yapmak için ne kadar trafik gerekir?", "en": "How much traffic is required for A/B testing?" }, "answer": { "tr": "Gerekli hacim conversion rate, beklenen etki, güven seviyesi ve test yapısına göre değişir. Trafik yetersizse kontrollü test yerine kullanıcı davranışı ve öncelikli heuristic iyileştirmeler kullanılabilir.", "en": "Required volume depends on conversion rate, expected effect, confidence level and test design. If traffic is insufficient, behavior analysis and prioritized heuristic improvements may be more appropriate than formal controlled testing." } },
      { "question": { "tr": "Daha fazla reklam vermeden dönüşüm artabilir mi?", "en": "Can conversion improve without increasing ad spend?" }, "answer": { "tr": "Evet, amaç tam olarak mevcut talebin verimliliğini artırmaktır. Ancak sonuç büyüklüğü mevcut funnel, trafik kalitesi ve başlangıç seviyesine bağlıdır.", "en": "Yes. The objective is to improve the efficiency of existing demand. The magnitude of improvement depends on the current funnel, traffic quality and starting point." } },
      { "question": { "tr": "B2B funnel da optimize ediyor musunuz?", "en": "Do you optimize B2B funnels?" }, "answer": { "tr": "Evet. Lead form, qualification, opportunity, proposal ve contract aşamaları B2B conversion sistemi içinde analiz edilebilir.", "en": "Yes. Lead forms, qualification, opportunity, proposal and contract stages can be analyzed inside a B2B conversion system." } }
    ],
    "relatedSlugs": ["performance-marketing", "ecommerce-growth", "b2b-marketing", "digital-products-software-development"],
    "cta": {
      "title": { "tr": "Daha fazla trafik almadan önce, mevcut trafiğin ne kadarını geri kazanabileceğinizi görelim.", "en": "Before buying more traffic, let's see how much value can be recovered from the traffic you already have." },
      "description": { "tr": "Funnel, conversion ve kullanıcı davranışı darboğazlarınızı birlikte değerlendirelim.", "en": "Let's evaluate your funnel, conversion and user-behavior bottlenecks together." },
      "label": { "tr": "Dönüşüm Görüşmesi Planla →", "en": "Schedule a Conversion Meeting →" }
    }
  },
  "ecommerce-growth": {
    "seoTitle": { "tr": "E-Ticaret Büyüme ve Pazaryeri Yönetimi | Sellf Media", "en": "E-Commerce Growth & Marketplace Management | Sellf Media" },
    "metaDescription": { "tr": "E-ticaret operasyonu, pazaryeri yönetimi, stok, fiyatlama, CRM, retention, merchandising ve online mağaza süreçlerinizi uçtan uca büyütün.", "en": "Scale e-commerce through marketplace operations, inventory, pricing, CRM, retention, merchandising, integrations and profitable online growth." },
    "statement": { "tr": "E-ticaret büyümesi yalnızca daha fazla sipariş değil; daha sağlıklı marj, stok, retention ve kanal ekonomisi demektir.", "en": "E-commerce growth is not only more orders. It means healthier margin, inventory, retention and channel economics." },
    "overview": [
      { "tr": "E-Ticaret Büyüme Süreçleri; online mağaza, pazaryeri, stok, katalog, fiyatlama, merchandising, reklam, CRM, retention ve fulfillment bağımlılıklarını tek ticari büyüme sistemi içinde yönetir.", "en": "E-Commerce Growth connects online stores, marketplaces, inventory, catalog, pricing, merchandising, advertising, CRM, retention and fulfillment dependencies inside one commercial growth system." },
      { "tr": "Amaç yalnızca ciroyu büyütmek değildir. Ürün ekonomisi, kanal marjı, buy box, stok sağlığı, tekrar satın alma ve cross-border potansiyeli birlikte ele alınarak daha sürdürülebilir perakende sistemi kurulur.", "en": "The objective is not revenue alone. Product economics, channel margin, buy box, inventory health, repeat purchase and cross-border potential are considered together to build a more sustainable retail system." }
    ],
    "outcomeBullets": [
      { "tr": "Pazaryeri ve D2C kanallarını stok, fiyat ve marj verisiyle aynı ticari modelde yönetmek.", "en": "Manage marketplace and D2C channels using the same inventory, pricing and margin economics." },
      { "tr": "Product listing, feed, merchandising ve reklam süreçlerinin birbirini desteklemesini sağlamak.", "en": "Connect product listings, feeds, merchandising and advertising so they reinforce one another." },
      { "tr": "CRM, lifecycle, retention ve loyalty ile acquisition sonrası müşteri değerini büyütmek.", "en": "Increase post-acquisition customer value through CRM, lifecycle, retention and loyalty." }
    ],
    "metrics": [],
    "metricNote": { "tr": "E-ticaret performansı kategori, marj, stok yapısı, kanal mix'i ve pazar koşullarına göre değişir; bu nedenle bütün müşterileri kapsayan tek aggregate benchmark yayınlanmıyor.", "en": "E-commerce performance varies by category, margin, inventory structure, channel mix and market conditions, so no single aggregate benchmark is published across all clients." },
    "audience": [
      { "tr": "Trendyol, Amazon veya diğer pazaryerlerinde büyümek isteyen markalar.", "en": "Brands that want to grow on Trendyol, Amazon or other marketplaces." },
      { "tr": "D2C e-ticaret, marketplace, inventory ve pricing süreçleri arasında kopukluk yaşayan perakendeciler.", "en": "Retailers with fragmented D2C e-commerce, marketplace, inventory and pricing processes." },
      { "tr": "Yeni ülkeye cross-border e-commerce ile açılmayı veya retention ekonomisini geliştirmeyi planlayan şirketler.", "en": "Companies planning cross-border e-commerce expansion or stronger retention economics." }
    ],
    "approachIntro": { "tr": "E-ticaret kanalını reklam hesabı gibi değil, ürün, fiyat, stok, müşteri ve operasyon verilerinin birlikte çalıştığı perakende işletim sistemi olarak yönetiyoruz.", "en": "We manage e-commerce not like an advertising account, but as a retail operating system where product, pricing, inventory, customer and operations data work together." },
    "approachSteps": [
      { "title": { "tr": "Commercial Baseline", "en": "Commercial Baseline" }, "body": { "tr": "Ciro, marj, SKU, stok, kanal maliyeti, return ve mevcut e-ticaret ekonomisi analiz edilir.", "en": "Revenue, margin, SKU, inventory, channel cost, returns and current e-commerce economics are reviewed." } },
      { "title": { "tr": "Catalog & Marketplace", "en": "Catalog & Marketplace" }, "body": { "tr": "Katalog, listing, marketplace setup, SEO, feed ve platform görünürlüğü düzenlenir.", "en": "Catalog, listings, marketplace setup, SEO, feeds and platform visibility are structured." } },
      { "title": { "tr": "Pricing & Merchandising", "en": "Pricing & Merchandising" }, "body": { "tr": "Fiyatlama, kampanya, bundle, buy box ve ürün öncelikleri marj ve stokla birlikte planlanır.", "en": "Pricing, campaigns, bundles, buy box and product priorities are planned against margin and inventory." } },
      { "title": { "tr": "Acquisition", "en": "Acquisition" }, "body": { "tr": "Marketplace advertising, retail media, paid media ve product feed büyüme hedefleriyle hizalanır.", "en": "Marketplace advertising, retail media, paid media and product feeds are aligned with growth objectives." } },
      { "title": { "tr": "Retention", "en": "Retention" }, "body": { "tr": "CRM, lifecycle, segmentation, loyalty ve repeat-purchase fırsatları geliştirilir.", "en": "CRM, lifecycle, segmentation, loyalty and repeat-purchase opportunities are developed." } },
      { "title": { "tr": "Operations & Reporting", "en": "Operations & Reporting" }, "body": { "tr": "Stok, fulfillment bağımlılıkları, kanal performansı ve kârlılık düzenli raporlama ile izlenir.", "en": "Inventory, fulfillment dependencies, channel performance and profitability are monitored through regular reporting." } }
    ],
    "proofBrands": ["Goldium", "Iamlovein", "Grey Manner", "Qashé", "GKC"],
    "proofNotes": [
      { "tr": "Goldium portföy kaydında +%67 ciro, +%71 ROI ve 3,4M TL pazaryeri metriği raporlandı; çalışma e-ticaret, SEO, funnel, tracking ve influencer katmanlarını birleştirdi.", "en": "Goldium's portfolio record reports +67% revenue, +71% ROI and TRY 3.4M marketplace performance; the work connected e-commerce, SEO, funnel, tracking and influencer layers." },
      { "tr": "Iamlovein'in uluslararası genişlemesinde fulfillment ve online satış funnel'ı birlikte ele alındı; ilk hafta 1,3M TL gelir ve stokların tamamen tükenmesi portföy kaydında yer alıyor.", "en": "Iamlovein's international expansion connected fulfillment and the online sales funnel; its portfolio record reports TRY 1.3M in first-week revenue and complete stock sell-out." },
      { "tr": "Grey Manner, Qashé ve GKC çalışmalarında marketplace, ürün ekonomisi, pazar girişi veya e-ticaret altyapısı proje kapsamına göre ele alındı.", "en": "Grey Manner, Qashé and GKC work addressed marketplaces, product economics, market entry or e-commerce infrastructure depending on project scope." }
    ],
    "operations": {
      "A": ["E-Commerce Operations Management", "Marketplace Management", "Trendyol Management", "Amazon Marketplace Management", "Marketplace Advertising", "Retail Media Management", "Marketplace SEO", "Product Listing Optimization", "Product Feed Management & Optimization", "E-Commerce Merchandising", "Dynamic Pricing", "Buy Box Optimization", "E-Commerce Retention Marketing", "CRM & Lifecycle Marketing", "Loyalty Marketing", "Cross-Border E-Commerce", "Marketplace Expansion"],
      "B": ["Marketplace Store Setup", "Catalog Management", "Inventory & Stock Optimization", "Customer Segmentation", "Fulfillment & Logistics Coordination", "E-Commerce Analytics & Reporting"],
      "C": ["E-Commerce Growth Strategy → E-Ticaret Büyüme Süreçleri", "Pricing Strategy → Growth & Management Consulting", "E-Commerce Conversion Optimization / Checkout Optimization → Conversion & Funnel Optimization", "Email Marketing for E-Commerce → Email Marketing"]
    },
    "faq": [
      { "question": { "tr": "Trendyol yönetimi yapıyor musunuz?", "en": "Do you provide Trendyol management?" }, "answer": { "tr": "Evet. Trendyol Management, marketplace operasyonları, listing, SEO, advertising, pricing ve ilgili katalog süreçleri çözüm kapsamında yer alabilir.", "en": "Yes. Trendyol Management can include marketplace operations, listings, SEO, advertising, pricing and related catalog processes." } },
      { "question": { "tr": "E-ticaret büyümesi sadece reklam yönetimi mi?", "en": "Is e-commerce growth mainly advertising management?" }, "answer": { "tr": "Hayır. Reklam yalnızca acquisition katmanıdır. Stok, ürün, fiyatlama, merchandising, marketplace, CRM, retention ve kanal kârlılığı birlikte ele alınır.", "en": "No. Advertising is only the acquisition layer. Inventory, product, pricing, merchandising, marketplace, CRM, retention and channel profitability are managed together." } },
      { "question": { "tr": "Fulfillment ve lojistiği doğrudan siz mi yürütüyorsunuz?", "en": "Do you directly operate fulfillment and logistics?" }, "answer": { "tr": "E-ticaret operasyonundaki fulfillment ve lojistik bağımlılıklarını planlayabilir ve ilgili partnerleri koordine edebiliriz; genel fiziksel lojistik operasyonu ayrı uzman sağlayıcıların sorumluluğunda olabilir.", "en": "We can plan fulfillment and logistics dependencies inside the e-commerce operation and coordinate relevant partners; general physical logistics operations may remain with specialist providers." } },
      { "question": { "tr": "Cross-border e-commerce de kapsamda mı?", "en": "Is cross-border e-commerce included?" }, "answer": { "tr": "Evet. Cross-Border E-Commerce bu çözümün canonical operasyonlarından biridir ve uluslararası büyüme solution'ı altında da ilişkili yetkinlik olarak görünür.", "en": "Yes. Cross-Border E-Commerce is a canonical operation of this solution and also appears as a related capability under International Growth." } }
    ],
    "relatedSlugs": ["performance-marketing", "conversion-funnel-optimization", "export-international-growth", "digital-products-software-development"],
    "cta": {
      "title": { "tr": "E-ticareti yalnızca büyütmeyin. Daha sağlıklı büyütün.", "en": "Don't just grow e-commerce. Grow it with healthier economics." },
      "description": { "tr": "Marketplace, stok, fiyat, CRM ve kanal ekonominizi birlikte değerlendirelim.", "en": "Let's evaluate your marketplace, inventory, pricing, CRM and channel economics together." },
      "label": { "tr": "E-Ticaret Büyüme Görüşmesi Planla →", "en": "Schedule an E-Commerce Growth Meeting →" }
    }
  }
};

export function getSolutionContent(slug: string) {
  return solutionContent[slug];
}
