export type LocalizedString = {
  tr: string;
  en: string;
};

export type ProcessStep = {
  title: LocalizedString;
  description: LocalizedString;
};

export type ServiceDetail = {
  id: string;
  title: LocalizedString; 
  heroText: LocalizedString;
  description: LocalizedString;
  process: ProcessStep[];
  deliverables: LocalizedString[]; 
  showcaseLogos: string[];
};

export const serviceData: ServiceDetail[] = [
  {
    id: "integrated-growth",
    title: {
      tr: "Entegre Büyüme Partnerliği",
      en: "Integrated Growth Partnership"
    },
    heroText: {
      tr: "Temel büyüme hedeflerinizi (Gelir, Marka Bilinirliği, Hacim, Kârlılık) merkeze alarak; veri odaklı stratejilerle marka ve operasyon mimarinizi kapsamlı bir şekilde inşa ediyor, dönüşüm ve ölçeklenme süreçlerinizi stratejik planlama ile aktif olarak yönetiyor ve denetliyoruz.",
      en: "Centering your core growth targets (Revenue, Brand Awareness, Volume, Profitability), we comprehensively engineer your brand and operational architectures with data-driven strategies, actively managing and auditing your conversion and scaling processes through strategic planning."
    },
    description: {
      tr: "Bu hizmet geleneksel danışmanlığın ötesine geçer; optimizasyon, denetim, raporlama ve operasyonel ekip yönetimini kapsayan kesintisiz bir döngü sunar:",
      en: "This service transcends conventional consulting; it encompasses a continuous cycle of optimization, auditing, reporting, and operational team management:"
    },
    process: [
      {
        title: {
          tr: "Yıllık ve Yarı Yıllık Stratejik Planlama",
          en: "Annual and Biannual Strategic Planning"
        },
        description: {
          tr: "Sellf reaktif çalışmaz. Biz zaman veya efor değil, sistem ve verimlilik satarız. Titiz bir hazırlık ve planlama ile ekip yapılarından lojistik operasyonlara, finansal yönetimden huni (funnel) mimarilerine kadar tüm süreçleriniz detaylıca haritalandırılır. Nihayetinde markaya kesin bir gelir taahhüdü sunulur.",
          en: "Sellf does not operate reactively. We do not sell time or effort; we architect systems and efficiency. Through meticulous preparation and planning, all your pipelines—from team structures and logistical operations to financial management and funnel architectures—are mapped out in detail. Ultimately, a definitive revenue commitment is provided to the brand."
        }
      },
      {
        title: {
          tr: "Veri Analizi ve Pazar İstihbaratı",
          en: "Data Analysis & Market Intelligence"
        },
        description: {
          tr: "Rakipleriniz, pazar segmentleri, ürün grupları, finansal verimlilik ve SWOT analizleri; veri odaklı kıyaslamalar ve gerçek zamanlı metrikler kullanılarak yürütülür. Marka; kesin konumu, güvenlik açıkları ve ölçeklenme fırsatları hakkında eşsiz bir netlik kazanır.",
          en: "Your competitors, market segments, product groups, financial efficiency, and SWOT analyses are executed utilizing data-driven benchmarks and real-time metrics. The brand gains unprecedented clarity regarding its exact positioning, vulnerabilities, and scaling opportunities."
        }
      },
      {
        title: {
          tr: "A/B Testleri ve Optimizasyon",
          en: "A/B Testing & Optimization"
        },
        description: {
          tr: "Titiz kreatif ve hedef kitle varyasyonları aracılığıyla en yüksek getirili kombinasyonların belirlenmesi. Sellf asla tahminlere güvenmez; verileri çözerek ve maksimum verimliliği engelleyen sürtünme noktalarını ortadan kaldırarak sürekli ileriye taşırız.",
          en: "Determining the highest-yielding combinations through rigorous creative and target audience variations. Sellf never relies on guesswork; we continuously drive forward by decoding data and eliminating friction points that hinder maximum efficiency."
        }
      }
    ],
    deliverables: [
      { tr: "Özel POC (Müşteri Yöneticisi)", en: "Dedicated POC (Account Manager)" },
      { tr: "Yarı Yıllık Raporlama ve Yıllık Stratejik Planlama", en: "Biannual Reporting & Annual Strategic Planning" },
      { tr: "Stratejik Değerlendirme Toplantıları", en: "Strategic Evaluation Meetings" },
      { tr: "Kesintisiz Takip ve Değerlendirme", en: "Continuous Tracking & Assessment" },
      { tr: "Kurulum ve Entegrasyon Yönetimi", en: "Setup & Integration Management" },
      { tr: "Teknik Altyapı Tedariği", en: "Technical Infrastructure Provision" }
    ],
    showcaseLogos: [
      "https://cdn.sellfmedia.workers.dev/essentials/logoaretias.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoasce.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logocms.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logocominify.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logodaysinn.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoeternal.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoevepack.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logogkc.png"
    ]
  },
  {
    id: "digital-ads",
    title: {
      tr: "Dijital Reklam Yönetimi",
      en: "Digital Advertisement"
    },
    heroText: {
      tr: "Doğrudan büyüme metriklerinize (ROAS, CPA, CPL) odaklanarak; reklam bütçenizi pasif bir 'gider' kaleminden, son derece 'ölçeklenebilir bir yatırıma' dönüştürmek için veri odaklı stratejiler uyguluyoruz.",
      en: "Focusing squarely on your growth metrics (ROAS, CPA, CPL), we deploy data-driven strategies to transform your advertising budget from a passive 'expense' into a highly 'scalable investment'."
    },
    description: {
      tr: "Bu hizmet, yalnızca reklam setlerini başlatmanın çok ötesine geçer; titiz ve sürekli bir optimizasyon döngüsü içerir:",
      en: "This service goes far beyond merely launching ad sets; it involves a rigorous, continuous optimization cycle:"
    },
    process: [
      {
        title: {
          tr: "Tam Döngü Kampanya Yönetimi",
          en: "Full-Cycle Campaign Management"
        },
        description: {
          tr: "Google Ads, Meta Ads (Instagram/Facebook), TikTok ve LinkedIn ağlarında stratejik kampanya kurulumları, teklif optimizasyonları ve günlük izleme.",
          en: "Strategic campaign setups, bidding optimizations, and daily monitoring across Google Ads, Meta Ads (Instagram/Facebook), TikTok, and LinkedIn networks."
        }
      },
      {
        title: {
          tr: "Gelişmiş Veri Takibi",
          en: "Advanced Data Tracking"
        },
        description: {
          tr: "Kusursuz dönüşüm izleme kurulumları, Sunucu Taraflı (Server-Side) Pixel/API entegrasyonları ve derinlemesine rakip reklam istihbaratı.",
          en: "Flawless conversion tracking setups, Server-Side Pixel/API integrations, and deep-dive competitor ad intelligence."
        }
      },
      {
        title: {
          tr: "İteratif A/B Testleri",
          en: "Iterative A/B Testing"
        },
        description: {
          tr: "Kreatif varlıkları, reklam metinlerini ve hedef kitle matrislerini sürekli test ederek en yüksek getirili reklam yapılarını belirleme.",
          en: "Identifying the highest-yielding ad structures by continuously testing creative assets, ad copies, and target audience matrices."
        }
      }
    ],
    deliverables: [
      { tr: "Özel POC (Müşteri Yöneticisi)", en: "Dedicated POC (Account Manager)" },
      { tr: "Aylık Raporlama ve Stratejik Planlama", en: "Monthly Reporting & Strategic Planning" },
      { tr: "Stratejik Değerlendirme Toplantıları", en: "Strategic Evaluation Meetings" }
    ],
    showcaseLogos: [
      "https://cdn.sellfmedia.workers.dev/essentials/18.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logogoldium.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logogrey.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logolions.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logolvmh.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logomuratbey.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logonarpos.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logonutralen.png"
    ]
  },
  {
    id: "social-media",
    title: {
      tr: "Sosyal Medya Yönetimi",
      en: "Social Media Management"
    },
    heroText: {
      tr: "Sosyal medyayı sadece bir 'paylaşım panosu' olarak değil; markanızın dijital yüzü, topluluk merkezi ve en dinamik satış kanalı olarak konumlandırıyoruz. Özgün kreatif içerikler ve etkileşim odaklı stratejiler kullanarak takipçilerinizi sadık marka elçilerine dönüştürüyoruz.",
      en: "We position social media not just as a 'posting board', but as the digital face, community hub, and most dynamic sales channel of your brand. By utilizing original creative content and engagement-driven strategies, we turn your followers into loyal brand ambassadors."
    },
    description: {
      tr: "Sosyal medya operasyonlarımız, üst düzey estetik varlığı veri odaklı performansla kusursuz bir şekilde harmanlar:",
      en: "Our social media operations seamlessly blend high-end aesthetic presence with data-driven performance:"
    },
    process: [
      {
        title: {
          tr: "Stratejik İçerik Planlama ve Kreatif Üretim",
          en: "Strategic Content Planning & Creative Production"
        },
        description: {
          tr: "Marka kimliğinizle uyumlu bir görsel dil oluşturma, yüksek etkili video odaklı (Reels/TikTok) içerikler üretme ve küresel trendleri marka anlatınıza hızla entegre etme.",
          en: "Establishing a visual language aligned with your brand identity, producing high-impact video-centric (Reels/TikTok) content, and rapidly integrating global trends into your brand narrative."
        }
      },
      {
        title: {
          tr: "Topluluk Yönetimi ve Etkileşim",
          en: "Community Management & Engagement"
        },
        description: {
          tr: "Takipçi etkileşimlerini maksimize etme, yorumları ve direkt mesajları markanın ses tonuna (tone of voice) uygun olarak yönetme ve son derece aktif bir topluluk inşa etme.",
          en: "Maximizing follower interactions, managing comments and direct messages in alignment with the brand's tone of voice, and architecting a highly active community."
        }
      },
      {
        title: {
          tr: "Algoritma Tabanlı Optimizasyon",
          en: "Algorithm-Based Optimization"
        },
        description: {
          tr: "Instagram, LinkedIn, TikTok ve Facebook'un spesifik algoritmik dinamiklerine göre uyarlanmış platforma özgü içerik dağıtımı ve kesintisiz rakip takibi.",
          en: "Executing platform-native content distribution tailored to the specific algorithmic dynamics of Instagram, LinkedIn, TikTok, and Facebook, alongside continuous competitor monitoring."
        }
      }
    ],
    deliverables: [
      { tr: "Özel POC (Müşteri Yöneticisi)", en: "Dedicated POC (Account Manager)" },
      { tr: "Aylık Raporlama ve Stratejik Planlama", en: "Monthly Reporting & Strategic Planning" },
      { tr: "Stratejik Değerlendirme Toplantıları", en: "Strategic Evaluation Meetings" }
    ],
    showcaseLogos: [
      "https://cdn.sellfmedia.workers.dev/essentials/logophilips.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logophysio.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoqashe.png ",
  "https://cdn.sellfmedia.workers.dev/essentials/logorollbab.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoscnitzel.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logosfera.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logouko.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logozuhre.png"
    ]
  },
  {
    id: "design",
    title: {
      tr: "Statik ve Motion Tasarım",
      en: "Static & Motion Design"
    },
    heroText: {
      tr: "Tasarımı yalnızca estetik bir süsleme olarak değil, markanızın mesajını hedef kitleye maksimum hız ve etkiyle ulaştırmak için tasarlanmış stratejik bir silah olarak kullanıyoruz. Statik görsellerin güvenilir yapısını, motion (hareketli) tasarımların dikkat çekici dinamizmiyle birleştirerek dijital görsel standartlarınızı en üst seviyeye taşıyoruz.",
      en: "We deploy design not merely as an aesthetic embellishment, but as a strategic weapon engineered to deliver your brand's message to the target audience with maximum velocity and impact. By combining the trustworthy structure of static visuals with the attention-grabbing dynamism of motion designs, we elevate your digital visual standards to the highest echelon."
    },
    description: {
      tr: "Tasarım ekibimiz, marka kimliğinizin tüm platformlarda tutarlı ve çarpıcı bir şekilde sergilenmesini sağlamak için şu çerçeveyi yönetir:",
      en: "Our design team governs the following framework to ensure your brand's identity is displayed consistently and strikingly across all platforms:"
    },
    process: [
      {
        title: {
          tr: "Statik Tasarım ve Kurumsal Kimlik Sistemleri",
          en: "Static Design & Corporate Identity Systems"
        },
        description: {
          tr: "Sosyal medya mimarileri, reklam banner'ları, web UI öğeleri ve premium basılı materyaller için marka yönergeleriyle (brandbook) %100 uyumlu yüksek kaliteli görseller üretme.",
          en: "Producing high-fidelity visuals that are 100% compliant with brand guidelines for social media architectures, ad banners, web UI elements, and premium printed materials."
        }
      },
      {
        title: {
          tr: "Hareketli Grafikler (Motion) ve 2D/3D Animasyon",
          en: "Motion Graphics & 2D/3D Animation"
        },
        description: {
          tr: "Görüntüleme ve elde tutma (retention) oranlarını büyük ölçüde katlayan hareketli grafikler, şık logo animasyonları, açıklayıcı videolar ve etkileşim optimize edilmiş hikaye/reels tasarımları mühendisliği.",
          en: "Engineering motion graphics, sleek logo animations, explainer videos, and engagement-optimized story/reels designs that drastically multiply view and retention rates."
        }
      },
      {
        title: {
          tr: "Kreatif Konsept Geliştirme",
          en: "Creative Concept Development"
        },
        description: {
          tr: "Makro-kampanya dönemleri için güçlü ana görseller (Key Visuals) geliştirme ve markanızın dijital vitrinini rekabetten ayıran benzersiz, tanınabilir bir tasarım dili inşa etme.",
          en: "Developing robust key visuals (KV) for macro-campaign periods and building a unique, recognizable design language that separates your brand's digital storefront from the competition."
        }
      }
    ],
    deliverables: [
      { tr: "Özel POC (Müşteri Yöneticisi)", en: "Dedicated POC (Account Manager)" },
      { tr: "Aylık Raporlama ve Stratejik Planlama", en: "Monthly Reporting & Strategic Planning" },
      { tr: "Stratejik Değerlendirme Toplantıları", en: "Strategic Evaluation Meetings" }
    ],
    showcaseLogos: [
      "https://cdn.sellfmedia.workers.dev/essentials/logoaretias.png",
      "https://cdn.sellfmedia.workers.dev/essentials/logoasce.png",
      "https://cdn.sellfmedia.workers.dev/essentials/logocms.png",
      "https://cdn.sellfmedia.workers.dev/essentials/logocominify.png",
      "https://cdn.sellfmedia.workers.dev/essentials/logodaysinn.png",
      "https://cdn.sellfmedia.workers.dev/essentials/logoeternal.png"
    ]
  },
  {
    id: "influencer",
    title: {
      tr: "Influencer Pazarlaması",
      en: "Influencer Marketing"
    },
    heroText: {
      tr: "Influencer Pazarlamasını yüzeysel bir tanıtım taktiği olarak değil; markanızın hikayesini otantik topluluklara yayınlamak ve sarsılmaz bir güven inşa etmek için tasarlanmış sağlam bir büyüme kaldıracı olarak konumlandırıyoruz.",
      en: "We position Influencer Marketing not as a superficial promotional tactic, but as a robust growth lever engineered to broadcast your brand's story to authentic communities and forge unshakeable trust."
    },
    description: {
      tr: "Influencer ekosisteminin organik erişimini, veri destekli stratejik planlama ve yaratıcı kurulumlarla sentezliyoruz. Kampanyalarınızın kusursuz ve performans odaklı ilerlemesini sağlamak için şu süreçleri yönetiyoruz:",
      en: "We synthesize the organic reach of the influencer ecosystem with data-backed strategic planning and creative setups. We manage the following processes to ensure your campaigns progress flawlessly and are driven by performance:"
    },
    process: [
      {
        title: {
          tr: "Veri Odaklı Influencer Seçimi ve Brief Yönetimi",
          en: "Data-Driven Influencer Sourcing & Brief Management"
        },
        description: {
          tr: "Hedef kitle demografisi, niş ilgi alanları ve etkileşim kalitesi marka değerlerinizle mükemmel şekilde örtüşen Kilit Fikir Önderlerini (KOL'ler) belirleme ve titiz bir profesyonel brief yönetimi.",
          en: "Identifying Key Opinion Leaders (KOLs) whose audience demographics, niche interests, and engagement quality perfectly overlap with your brand values, accompanied by meticulous professional brief management."
        }
      },
      {
        title: {
          tr: "Kreatif Uygulama ve İçerik Denetimi",
          en: "Creative Execution & Content Auditing"
        },
        description: {
          tr: "Gerçek kullanıcı merakını tetiklemek için standart tanıtımların ötesine geçen hikaye, reels ve uzun formatlı video yapıları tasarlama; yayın öncesi içerikleri marka standartlarınıza göre sıkı bir şekilde denetleme.",
          en: "Architecting story, reels, and long-form video structures that transcend standard promotions to trigger genuine user curiosity; rigorously auditing pre-release content against your brand standards."
        }
      },
      {
        title: {
          tr: "Uçtan Uca Operasyon ve İlişki Yönetimi",
          en: "End-to-End Operations & Relationship Management"
        },
        description: {
          tr: "Sözleşme müzakerelerinden ürün lojistiğine, yayın zaman çizelgelerinden kriz yönetimine kadar tüm operasyonel yükü üstlenerek; içerik üreticileri ile markanız arasındaki nihai profesyonel köprü olma.",
          en: "Absorbing all operational friction—from contract negotiations and product logistics to broadcasting timelines and crisis mitigation—acting as the ultimate professional bridge between creators and your brand."
        }
      }
    ],
    deliverables: [
      { tr: "Özel POC (Müşteri Yöneticisi)", en: "Dedicated POC (Account Manager)" },
      { tr: "Aylık Performans ve ROI Raporlaması", en: "Monthly Performance & ROI Reporting" },
      { tr: "Stratejik Optimizasyon Toplantıları", en: "Strategic Optimization Meetings" }
    ],
    showcaseLogos: [
      "https://ik.imagekit.io/u05ccie5m/4_qtm8lg.png",
      "https://ik.imagekit.io/u05ccie5m/12_oz02t9.png",
      "https://ik.imagekit.io/u05ccie5m/9_fu5yr6.png",
      "https://ik.imagekit.io/u05ccie5m/10_ajfnbn.png",
      "https://ik.imagekit.io/u05ccie5m/25_nhk1fy.png",
      "https://ik.imagekit.io/u05ccie5m/1_wf3dv4.png"
    ]
  },
  {
    id: "seo",
    title: {
      tr: "Arama Motoru Optimizasyonu (SEO)",
      en: "Search Engine Optimization"
    },
    heroText: {
      tr: "Markanızın dijital ekosistemdeki kalıcı hakimiyetini inşa etmek için SEO'yu izole bir 'anahtar kelime' görevi olarak değil, bütünsel ve teknik bir pazar payı edinme stratejisi olarak ele alıyoruz.",
      en: "To architect your brand's permanent dominance in the digital ecosystem, we treat SEO not as an isolated 'keyword' task, but as a holistic, technical market-share acquisition strategy."
    },
    description: {
      tr: "SEO operasyonlarımız, markanızı arama algoritmalarının zirvesine taşımak için tasarlanmış üç tavizsiz temel üzerine inşa edilmiştir:",
      en: "Our SEO operations are constructed upon three uncompromising pillars designed to propel your brand to the apex of search algorithms:"
    },
    process: [
      {
        title: {
          tr: "Teknik SEO ve UX Denetimi",
          en: "Technical SEO & UX Auditing"
        },
        description: {
          tr: "Hem Google botları hem de son kullanıcılar için kusursuz bir yolculuk tasarlamak amacıyla site hızı darboğazlarını (Önemli Web Verileri), taranabilirlik hatalarını ve dizine ekleme anormalliklerini sistematik olarak çözme.",
          en: "Systematically resolving site speed bottlenecks (Core Web Vitals), crawlability errors, and indexing anomalies to engineer a flawless journey for both Google bots and end-users."
        }
      },
      {
        title: {
          tr: "Stratejik İçerik ve Semantik Mimari",
          en: "Strategic Content & Semantic Architecture"
        },
        description: {
          tr: "Sadece trafiği değil, dönüşüme hazır, yüksek niyetli (high-intent) kullanıcıları hedefleyen semantik içerik haritalarını devreye sokmak için makro sektör trendlerini ve rakip zayıflıklarını analiz etme.",
          en: "Analyzing macro-industry trends and competitor vulnerabilities to deploy semantic content maps that target not merely traffic, but high-intent users ready to convert."
        }
      },
      {
        title: {
          tr: "Domain Otoritesi ve Backlink Yönetimi",
          en: "Domain Authority & Backlink Management"
        },
        description: {
          tr: "Markanızın dijital prestijini katlamak ve domain otoritenizi rekabet ortamının kalıcı olarak üstüne çıkarmak için yüksek güvene sahip, bağlamsal backlink varlıkları edinme.",
          en: "Acquiring high-trust, contextual backlink assets to compound your brand's digital prestige, permanently elevating your domain authority above the competitive landscape."
        }
      }
    ],
    deliverables: [
      { tr: "Özel POC (Müşteri Yöneticisi)", en: "Dedicated POC (Account Manager)" },
      { tr: "Aylık Raporlama ve Stratejik Planlama", en: "Monthly Reporting & Strategic Planning" },
      { tr: "Stratejik Değerlendirme Toplantıları", en: "Strategic Evaluation Meetings" }
    ],
    showcaseLogos: [
  "https://cdn.sellfmedia.workers.dev/sellfsunum/logoinwest.png",    
  "https://cdn.sellfmedia.workers.dev/essentials/18.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logogoldium.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logogrey.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logolions.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logolvmh.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logomuratbey.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logonarpos.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logonutralen.png"
    ]
  },
  {
    id: "e-com",
    title: {
      tr: "E-Ticaret Operasyonları",
      en: "E-Commerce Operations"
    },
    heroText: {
      tr: "Pazaryeri yönetimini sıradan bir ürün listeleme işi olarak değil; dev platformlarda (Trendyol, Hepsiburada, Amazon vb.) satış hacmini ve 'Buy Box' rekabetini domine etmek için algoritmik gücünüzü maksimize etme sanatı olarak görüyoruz.",
      en: "We perceive marketplace management not as mundane product listing, but as the high-stakes art of maximizing your algorithmic leverage on giant platforms (Trendyol, Hepsiburada, Amazon) to dominate sales volume and the 'Buy Box' competition."
    },
    description: {
      tr: "Markanızı 'En Çok Satanlar' seviyesine yükseltmek için algoritmik stok ve fiyat dengelerini koruyor, karmaşık lojistik ve operasyonel yapıları en yüksek verimlilik için optimize ediyoruz:",
      en: "We streamline complex logistical and operational frameworks for peak efficiency, maintaining algorithmic stock and price equilibriums to elevate your brand to the 'Top Seller' tier:"
    },
    process: [
      {
        title: {
          tr: "Mağaza Kurulumu ve Ürün Entegrasyon Mimarisi",
          en: "Store Setup & Product Integration Architecture"
        },
        description: {
          tr: "Tüm pazaryerlerinde premium kurumsal mağaza kimlikleri oluşturma, ürünleri hiper optimize edilmiş, SEO uyumlu başlık ve açıklamalarla konumlandırma ve kusursuz kategori eşleştirmesi yapma.",
          en: "Constructing premium corporate store identities across all marketplaces, deploying products with hyper-optimized, SEO-driven titles and descriptions, and executing flawless category mapping."
        }
      },
      {
        title: {
          tr: "Algoritma Hakimiyeti ve Reklam Yönetimi",
          en: "Algorithm Mastery & Ad Management"
        },
        description: {
          tr: "Platform içi reklam algoritmalarını (Sponsorlu Ürünler/Mağazalar) yönetme, kelime odaklı sıralama kampanyaları yürütme ve Black Friday gibi yoğun dönemler için agresif, yüksek getirili giriş stratejileri uygulama.",
          en: "Governing in-platform advertising algorithms (Sponsored Products/Stores), executing keyword-focused ranking campaigns, and deploying aggressive, high-yield entry strategies for peak periods like Black Friday."
        }
      },
      {
        title: {
          tr: "Dinamik Fiyatlandırma ve Stok Gözetimi",
          en: "Dynamic Pricing & Stock Surveillance"
        },
        description: {
          tr: "Gerçek zamanlı rakip takibine dayalı dinamik fiyatlandırma algoritmaları kurma, stok hızını izleme ve üst düzey mağaza puanlarını korumak için operasyonel hataları (geciken kargo vb.) minimize etme.",
          en: "Deploying dynamic pricing algorithms based on real-time competitor tracking, monitoring stock velocity, and minimizing operational errors (such as delayed shipping) to safeguard top-tier store ratings."
        }
      }
    ],
    deliverables: [
      { tr: "Özel POC (Müşteri Yöneticisi)", en: "Dedicated POC (Account Manager)" },
      { tr: "Aylık Raporlama ve Stratejik Planlama", en: "Monthly Reporting & Strategic Planning" },
      { tr: "Stratejik Değerlendirme Toplantıları", en: "Strategic Evaluation Meetings" }
    ],
    showcaseLogos: [
      "https://cdn.sellfmedia.workers.dev/essentials/logonutralen.png",
      "https://cdn.sellfmedia.workers.dev/essentials/logolions.png",
      "https://cdn.sellfmedia.workers.dev/essentials/logogoldium.png",
      "https://cdn.sellfmedia.workers.dev/essentials/logogrey.png",
      "https://cdn.sellfmedia.workers.dev/essentials/logozuhre.pngg"
    ]
  },
  {
    id: "productions",
    title: {
      tr: "Prodüksiyon",
      en: "Productions"
    },
    heroText: {
      tr: "Teknik kusursuzluğu üst düzey yaratıcı vizyonla birleştirerek markanızın evrenini dijital ekranlara yansıtıyoruz. Yüksek prodüksiyon kalitesini stratejik kurgu teknikleriyle harmanlayarak prestiji katlayan ve doğrudan dönüşüm sağlayan 'premium' video içerikleri üretiyoruz.",
      en: "Fusing technical perfection with high-end creative vision, we project your brand's universe onto digital screens. We engineer 'premium' video content that exponentially boosts prestige and drives hard conversions by harmonizing high production quality with strategic editing techniques."
    },
    description: {
      tr: "Prodüksiyon birimimiz, fikir aşamasından nihai çıktıya (render) kadar sürecin her milimetresini denetler ve kesinlikle 'Loft' estetiği ile yüksek endüstri standartları çerçevesinde çalışır:",
      en: "Our production unit oversees every millimeter of the process—from ideation protocols to final rendering—operating strictly within 'Loft' aesthetics and high industry standards:"
    },
    process: [
      {
        title: {
          tr: "Kreatif Konsept ve Senaryo Mühendisliği",
          en: "Creative Concepting & Script Engineering"
        },
        description: {
          tr: "Marka mesajınızı hedef kitlenin zihnine kazıyacak özgün anlatı yapıları tasarlama, prodüksiyon öncesi planlama (storyboard) süreçlerini yürütme ve izleyiciyi anında yakalayan keskin reklam metinleri yazma.",
          en: "Architecting original narrative structures that embed your brand message into the target audience's psyche, executing pre-production planning (storyboard), and writing razor-sharp ad copy that hooks the viewer instantly."
        }
      },
      {
        title: {
          tr: "Sinematik Çekim ve Teknik İcra",
          en: "Cinematic Filming & Technical Execution"
        },
        description: {
          tr: "Markanızın profesyonelliğinin her karede hissedilmesini sağlamak için; son teknoloji görüntüleme sistemleri, sinematik ışık tasarımı ve yüksek kaliteli ses kaydı ile stüdyo veya dış mekan çekimlerini yönetme.",
          en: "Commanding studio or outdoor shoots with state-of-the-art imaging systems, cinematic lighting design, and high-fidelity audio capture to ensure your brand's professionalism is felt in every frame."
        }
      },
      {
        title: {
          tr: "Post-Prodüksiyon ve Kurgu Sanatı",
          en: "Post-Production & The Art of Editing"
        },
        description: {
          tr: "Ham görüntüleri profesyonel renk düzenlemesi (color grading), sürükleyici ses tasarımı ve hiper dinamik kurgu teknikleriyle işleyerek; hem sosyal algoritmalar (Reels/TikTok) hem de geleneksel yayın organları için %100 format optimizasyonu sağlama.",
          en: "Processing raw footage through professional color grading, immersive sound design, and hyper-dynamic editing techniques, ensuring 100% format optimization for both social algorithms (Reels/TikTok) and traditional broadcasting mediums."
        }
      }
    ],
    deliverables: [
      { tr: "Özel POC (Müşteri Yöneticisi)", en: "Dedicated POC (Account Manager)" },
      { tr: "Yayın Öncesi Onay ve Revizyon Döngüleri", en: "Pre-Broadcast Approval & Revision Cycles" },
      { tr: "Projeye Özel Zaman Çizelgesi Planlaması", en: "Project-Based Timeline Mapping" }
    ],
    showcaseLogos: [] 
  }
];