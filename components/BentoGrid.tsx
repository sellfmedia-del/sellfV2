"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

// ===== 1. SÖZLÜK MİMARİSİ (DICTIONARY) =====
const dictionary = {
  tr: {
    mainTitle1: "KANITIMIZ,",
    mainTitle2: "İŞLERİMİZDİR.",
    items: {
      evepack: {
        tag: "FUNNEL REYAPILANDIRMA",
        shortDesc: "“Bütçe yanıyordu. Sonuç gelmiyordu.”",
        longDesc: "Satış ekibi yeniden yapılandırıldı; her funnel aşamasına ayrı gruplar atandı. Funnel kurgusu intent sinyalleri ve geçmiş CRM verisi baz alınarak baştan inşa edildi. Takip mekanizmaları için yazılımlar kuruldu, otomatize CRM ile sürekli geliştirme döngüsü oluşturuldu. Reklam kurguları çeşitlendirildi, reklam kreatifi ile hedef kitle uyumu sağlandı. Ürün–Hedef Kitle–Funnel aşaması intent haritalaması ve Değer Önerisi sistematiği kuruldu.",
        metrics: ["1/3 ROI", "%43 Dönüş Hızı Düşüşü", "%123 Operasyonel Karlılık"],
        schematicData: ["Intent Verisi", "CRM Segmenti", "Kreatif Uyumu", "Otomasyon"]
      },
      canias: {
        tag: "B2B GROWTH & OUTREACH",
        shortDesc: "“Sektör ortalamasının 150 katı.”",
        longDesc: "SellfScale ile potansiyel müşteri havuzu haritalandı, intent sinyali listeleri oluşturuldu ve buradan lookalike audiencelar türetildi. Apollo.io and Saleshandy üzerinden bulk mail outreach kurgusu, programmatic ve search kampanyasıyla eş zamanlı çalıştırıldı. CRM veriyi reklamı, reklamı maili, maili CRM'i besledi — döngü kapatıldı. Satış ekibi yeniden yapılandırılarak her funnel aşamasına bağlandı.",
        metrics: ["%12 Display CTR", "%27 Mail Click Rate", "+%230 Lead Artışı", "1/8 ROI"],
        schematicData: ["CRM Verisi", "Programmatic Reklam", "Outreach Mail"]
      },
      iamlovein: {
        tag: "GLOBAL VIRAL MARKETING",
        shortDesc: "“Doymuş pazardan çıkış. 1 ayda %700 ROI.”",
        longDesc: "Marka, Türkiye'deki yüksek rekabet ve daralan marjlardan çıkarılarak Romanya, Bulgaristan ve Bosna-Hersek'e fulfillment altyapısıyla taşındı. Bükreş sokaklarına QR kodlu fiziksel ürün yerleştirmeleri yapıldı; 50 mikro/nano-influencer'ın UGC içerikleriyle Threads, X ve TikTok'ta organik viral döngüye dönüştürüldü. Konum tabanlı funnel mimarisi ve lansman indirimleriyle etkileşim doğrudan kârlılığa yönlendirildi.",
        metrics: ["1.3M TL İlk Hafta", "%700 ROI", "Stok Tamamen Tükendi"],
        schematicData: ["Fulfillment Göçü", "QR Gerilla", "UGC Viral Döngü"]
      },
      qashe: {
        tag: "BRANDING & GO-TO-MARKET",
        shortDesc: "“Sıfırdan marka, sıfırdan strateji.”",
        longDesc: "Markanın tüm kimliği, brandbook'u ve hedef kitle personaları baştan oluşturuldu. Pazar girişi, platform entegrasyonları, ürün karlılık hesaplamaları ve kampanya takvimi çıkarıldı. Strateji planlaması tamamlanarak operasyona geçildi.",
        metrics: ["%1.3 Organik Trafik", "1/2 ROI", "+%32 Karlılık Artışı"],
        schematicData: ["Brandbook & Kimlik", "Karlılık Analizi", "Lansman Modeli"]
      },
      goldium: {
        tag: "E-COMMERCE & SEO",
        shortDesc: "“Markalama, e-ticaret ve viral işbirliği.”",
        longDesc: "Markalama ve e-ticaret süreçleri yenilendi. Funnel ve veri takibi mekanizmaları neredeyse baştan inşa edildi, eski ürün linkleri ve yönlendirmeleri tamamen düzenlendi. Teknik SEO iyileştirmeleri yapıldı. Ebru Severtürk işbirliği ve Altın Bereket Günü gibi viral çalışmalar büyümeyi hızlandırdı.",
        metrics: ["+%67 Ciro Artışı", "+%71 ROI Artışı", "3.4M TL Pazaryeri"],
        schematicData: ["Teknik SEO", "Funnel Yenileme", "Ebru Severtürk", "Viral Gün"]
      },
      fizyohol: {
        tag: "PERFORMANCE MARKETING",
        shortDesc: "“62 TL'ye 222 randevu.”",
        longDesc: "Tamamen reklam odaklı bir çalışma yürütüldü. Düşük edinim maliyetinde yüksek kaliteli lead akışı hedeflendi; reklam kurgusu ve hedefleme bu KPI etrafında optimize edildi. Tüm rezervasyon müsaitlikleri doldu.",
        metrics: ["62 TL CAC", "222 Kalifiye Lead", "1/24 ROI"],
        schematicData: ["Düşük CAC Reklamı", "Lead Kalifikasyonu", "Müsaitlik Dolumu"]
      },
      elitehair: {
        tag: "CROSS-BORDER MARKETING",
        shortDesc: "“İki pazar, tek çerçeve.”",
        longDesc: "Yurt dışındaki mevcut baz kitlesinin Türkiye bağlantıları veri kurulumlarıyla sağlandı. Lookalike audiencelar ve persona oluşturuldu. Vergi ve maliyet avantajları değer önerisi olarak yurt dışına, Dr. Balwi güveni ve benzeri unsurlar Türkiye'ye ayrı ayrı pazarlandı.",
        metrics: ["%72 Doluluk Oranı", "%32 Organik Otorite", "1/5 ROI"],
        schematicData: ["Global: Maliyet", "TR: Dr. Balwi Güveni"]
      },
      philips: {
        tag: "OMNICHANNEL PERFORMANCE",
        shortDesc: "“Dijitali aştık, offlina çıktık.”",
        longDesc: "Search ve Merchant Center odaklı dijital performans çalışmasına ek olarak parkmetrelerde mini 3D printer uygulaması ve sağlık sektörü affiliate işbirlikleriyle pasif + aktif pazarlama katmanları kuruldu. Funnel kurgusu hem offline hem dijitalde maksimum veri takibini hedefleyecek şekilde senkronize edildi.",
        metrics: ["+%100 Verimlilik", "+%32 ROI Artışı", "12M$ Yıllık Brüt Kar"],
        schematicData: ["Dijital: Performance", "Offline: 3D Parkmetre"]
      },
      colins: {
        tag: "REGIONAL STRATEGY",
        shortDesc: "“Kuzey Afrika'ya açılım stratejisi.”",
        longDesc: "Fas, Cezayir ve Mısır pazarları için ayrı kurgu yapıldı. Yeni pazaryerleri oluşturuldu; sosyoekonomik koşullar ve konumlandırma gözetilerek güvenilir marka temsilciler seçildi. Isı haritaları, projeksiyon ve yerel verilere dayalı offline konumlandırma, online funnel yönetimiyle birleştirildi.",
        metrics: ["Strateji Aşaması", "Isı Harita Proj.", "Yerel Veri Modeli"],
        schematicData: ["Afrika Dağılımı", "Offline Yerleşim", "Online Yönetim"]
      },
      sfera: {
        tag: "TWO-SIDED MARKETPLACE",
        shortDesc: "“İki tarafı aynı anda büyütmek.”",
        longDesc: "İşletme ve kullanıcı tarafını buluşturan bu app'ta iki taraflı pazarlama yürütüldü. Kategori, ürün ve işletme akslarında bölünmüş kurgu izlendi. Her funnel için ayrı yatırım geri dönüşü ve KPI belirlenerek RGI öncelikli strateji uygulandı.",
        metrics: ["RGI Öncelikli", "Çift Yönlü Funnel", "İşletme & Kullanıcı"],
        schematicData: ["B2B: İşletme", "B2C: Kullanıcı"]
      },
      greymanner: {
        tag: "EUROPEAN EXPANSION",
        shortDesc: "“4 ülke, tek çatı altında.”",
        longDesc: "Bulgaristan, Bosna-Hersek, Polonya ve Almanya için ayrı pazar stratejileri oluşturuldu. Prodüksiyon, brandbook, finansal danışmanlık ve pazar bazlı stratejik planlama yapıldı. Pazaryeri entegrasyonları ve lojistik altyapı kurularak yıllık strateji kapsamında opere edildi.",
        metrics: ["1/3 Ort. ROI", "%56 Karlılık Oranı", "7M TL+ Ciro"],
        schematicData: ["4 Ülke Stratejisi", "Lojistik Altyapı", "Yıllık Operasyon"]
      },
      ascegyo: {
        tag: "INTEGRATED REAL ESTATE",
        shortDesc: "“Gayrimenkulde 1'e 21 ROI.”",
        longDesc: "TV, dijital reklam ve sosyal medyada entegre kurgu, doğrudan satış hedefiyle yürütüldü. Her funnel aşaması için ayrı manuel takip mekanizmaları oluşturuldu, dijital reklamlarda veri takibi mükemmelleştirildi.",
        metrics: ["1/21 ROI Başarısı", "Aylık Ort. 7 Satış", "Veri Takibi"],
        schematicData: ["TV & Dijital Reklam", "Manuel Takip", "Anlık Optimizasyon"]
      },
      gkc: {
        tag: "INFRASTRUCTURE & ROADMAP",
        shortDesc: "“Fransa'ya doğru kurgu, yanlış zamanlama.”",
        longDesc: "Fransa e-ticaret pazarı için brandbook, logo ve konumlandırma çalışmaları tamamlandı. Pazaryeri altyapısı kuruldu, doğru platform ve hedef kitle eşleştirmesi yapıldı. Lansman öncesi hazırlık aşaması tamamlanmış olmakla birlikte bütçe uyumsuzluğu ve tedarik yetersizliği nedeniyle operasyon aşamasına geçilemedi ve süreç sonlandırıldı.",
        metrics: ["Brandbook Hazır", "Altyapı Tamam", "Süreç Durduruldu"],
        schematicData: ["Fransa Konumlandırma", "Pazaryeri Kurulumu", "Stratejik Durdurma ✖"]
      }
    }
  },
  en: {
    mainTitle1: "THE PROOF IS IN",
    mainTitle2: "OUR WORK.",
    items: {
      evepack: {
        tag: "FUNNEL RECONSTRUCTION",
        shortDesc: "“The budget was burning. No results were coming.”",
        longDesc: "The sales team was restructured; separate groups were assigned to each funnel stage. The funnel structure was rebuilt based on intent signals and historical CRM data. Software was installed for tracking mechanisms, creating a continuous improvement loop with automated CRM. Ad structures were diversified, ensuring alignment between ad creative and target audience.",
        metrics: ["1/3 ROI", "43% Conversion Speed Drop", "123% Operational Profitability"],
        schematicData: ["Intent Data", "CRM Segment", "Creative Sync", "Automation"]
      },
      canias: {
        tag: "B2B GROWTH & OUTREACH",
        shortDesc: "“150 times the sector average.”",
        longDesc: "The potential customer pool was mapped with SellfScale, intent signal lists were created, and lookalike audiences were derived from there. Bulk mail outreach setup via Apollo.io and Saleshandy was run simultaneously with programmatic and search campaigns.",
        metrics: ["12% Display CTR", "27% Mail Click Rate", "+230% Lead Increase", "1/8 ROI"],
        schematicData: ["CRM Data", "Programmatic Ads", "Outreach Mail"]
      },
      iamlovein: {
        tag: "GLOBAL VIRAL MARKETING",
        shortDesc: "“Exit from saturated market. 700% ROI in 1 month.”",
        longDesc: "The brand was extracted from high competition and shrinking margins in Turkey and moved to Romania, Bulgaria, and Bosnia-Herzegovina with a fulfillment infrastructure. Physical product placements with QR codes were made on Bucharest streets; turned into an organic viral loop on Threads, X and TikTok with UGC content from 50 micro/nano-influencers.",
        metrics: ["1.3M TL First Week", "700% ROI", "Stock Completely Empty"],
        schematicData: ["Fulfillment Move", "QR Gerilla", "UGC Viral Loop"]
      },
      qashe: {
        tag: "BRANDING & GO-TO-MARKET",
        shortDesc: "“Brand from scratch, strategy from scratch.”",
        longDesc: "The brand's entire identity, brandbook, and target audience personas were created from scratch. Market entry, platform integrations, product profitability calculations, and campaign calendar were prepared. Strategy planning was completed and transitioned to operations.",
        metrics: ["1.3% Organic Traffic", "1/2 ROI", "+32% Profitability Boost"],
        schematicData: ["Brandbook & Identity", "Profit Analysis", "Launch Model"]
      },
      goldium: {
        tag: "E-COMMERCE & SEO",
        shortDesc: "“Branding, e-commerce, and viral collaboration.”",
        longDesc: "Branding and e-commerce processes were renewed. Funnel and data tracking mechanisms were built almost from scratch, old product links and redirects were fully reorganized. Technical SEO improvements were made.",
        metrics: ["+67% Revenue Increase", "+71% ROI Increase", "3.4M TL Marketplace"],
        schematicData: ["Technical SEO", "Funnel Renewal", "Ebru Severtürk", "Viral Day"]
      },
      fizyohol: {
        tag: "PERFORMANCE MARKETING",
        shortDesc: "“222 appointments for 62 TL each.”",
        longDesc: "A fully ad-focused operation was carried out. High-quality lead flow at a low acquisition cost was targeted; the ad structure and targeting were optimized around this KPI. All booking availabilities were filled.",
        metrics: ["62 TL CAC", "222 Qualified Leads", "1/24 ROI"],
        schematicData: ["Low CAC Ad Setup", "Lead Qualification", "Bookings Full"]
      },
      elitehair: {
        tag: "CROSS-BORDER MARKETING",
        shortDesc: "“Two markets, one framework.”",
        longDesc: "The Turkish connections of the existing base audience abroad were established through data setups. Lookalike audiences and personas were created. Tax and cost advantages were marketed abroad as value propositions, while Dr. Balwi trust and similar elements were marketed to Turkey separately.",
        metrics: ["72% Occupancy Rate", "32% Organic Authority", "1/5 ROI"],
        schematicData: ["Global: Cost Edge", "TR: Dr. Balwi Trust"]
      },
      philips: {
        tag: "OMNICHANNEL PERFORMANCE",
        shortDesc: "“We surpassed digital, went offline.”",
        longDesc: "In addition to digital performance work focused on Search and Merchant Center, passive + active marketing layers were established with mini 3D printer applications in parking meters and healthcare affiliate partnerships.",
        metrics: ["+100% Efficiency", "+32% ROI Boost", "$12M Gross Profit Inc."],
        schematicData: ["Digital: Performance", "Offline: 3D Parking Unit"]
      },
      colins: {
        tag: "REGIONAL STRATEGY",
        shortDesc: "“Expansion strategy into North Africa.”",
        longDesc: "Separate frameworks were designed for Moroccan, Algerian, and Egyptian markets. New marketplaces were established; reliable brand representatives were chosen considering socioeconomic conditions and positioning.",
        metrics: ["Strategy & Proposal", "Heatmap Projection", "Local Data Matrix"],
        schematicData: ["Africa Distribution", "Offline Setup", "Online Sync Flow"]
      },
      sfera: {
        tag: "TWO-SIDED MARKETPLACE",
        shortDesc: "“Growing both sides simultaneously.”",
        longDesc: "Two-sided marketing was conducted in this app that brings business and user sides together. A split structure was followed across category, product, and business axes. An RGI-priority strategy was applied by defining a separate return on investment and KPI for each funnel.",
        metrics: ["RGI Priority Framework", "Two-Sided Funnel", "Merchant & User Growth"],
        schematicData: ["B2B: Merchant Flow", "B2C: User Flow Scale"]
      },
      greymanner: {
        tag: "EUROPEAN EXPANSION",
        shortDesc: "“4 countries under one roof.”",
        longDesc: "Separate market strategies were created for Bulgaria, Bosnia-Herzegovina, Poland, and Germany. Production, brandbook, financial consulting, and market-based strategic planning were executed. Marketplace integrations and logistics infrastructure were established.",
        metrics: ["Country Avg. 1/3 ROI", "56% Profit Margin", "7M TL+ Revenue"],
        schematicData: ["4 Country Strategy", "Logistics Infra", "Annual Operations"]
      },
      ascegyo: {
        tag: "INTEGRATED REAL ESTATE",
        shortDesc: "“1 to 21 ROI in real estate.”",
        longDesc: "An integrated setup on TV, digital advertising, and social media was executed with a direct sales target. Separate manual tracking mechanisms were created for each funnel stage, and data tracking in digital ads was perfected.",
        metrics: ["1/21 Total ROI Edge", "7 Avg. Monthly Sales", "Data Tracking Perfect"],
        schematicData: ["TV & Digital Ads", "Manual Tracking", "Real-time Funnel Opt"]
      },
      gkc: {
        tag: "INFRASTRUCTURE & ROADMAP",
        shortDesc: "“Right setup for France, wrong timing.”",
        longDesc: "Brandbook, logo, and positioning work for the French e-commerce market were completed. Marketplace infrastructure was set up, right platform and target audience matching was done. Operational phase could not be started due to budget mismatch and supply insufficiency.",
        metrics: ["Brandbook Finished", "Infra Core Ready", "Process Suspended"],
        schematicData: ["France Positioning", "Marketplace Setup", "Strategic Stop Pivot ✖"]
      }
    }
  }
};

// ===== 2. FERAH / AÇIK RENKLİ STRÜKTÜR KONFİGÜRASYONU (GÖRSEL VE LOGOLAR DAHİL) =====
interface GridConfig {
  id: "evepack" | "canias" | "iamlovein" | "qashe" | "goldium" | "fizyohol" | "elitehair" | "philips" | "colins" | "sfera" | "greymanner" | "ascegyo" | "gkc";
  title: string;
  tagColor: string;
  gridClass: string;
  schematicType: "funnel" | "loop" | "matrix" | "steps" | "flow" | "dual";
  logoUrl: string | null;
  bgImage: string | null;
}

const gridLayoutData: GridConfig[] = [
  { 
    id: "evepack", 
    title: "EVEPACK", 
    tagColor: "bg-red-50 text-red-600 border-red-200", 
    gridClass: "lg:col-span-2 lg:row-span-2 min-h-[460px]", 
    schematicType: "funnel",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logoevepack.png",
    bgImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80" // Ambalaj Mockup Teması
  },
  { 
    id: "canias", 
    title: "CANIAS ERP", 
    tagColor: "bg-blue-50 text-blue-600 border-blue-200", 
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[240px]", 
    schematicType: "loop",
    logoUrl: null, // Logo yok, düz yazı basılacak
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80" // Kurumsal Veri/ERP Teması
  },
  { 
    id: "iamlovein", 
    title: "İAMLOVEİN", 
    tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200", 
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]", 
    schematicType: "steps",
    logoUrl: null, // Düz yazı logosu
    bgImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80" // Bikini & Yaz Giyim Teması
  },
  { 
    id: "qashe", 
    title: "QASHÉ", 
    tagColor: "bg-purple-50 text-purple-600 border-purple-200", 
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]", 
    schematicType: "matrix",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logoqashe.png",
    bgImage: "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_9.jpg"
  },
  { 
    id: "goldium", 
    title: "GOLDİUM", 
    tagColor: "bg-amber-50 text-amber-600 border-amber-200", 
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[240px]", 
    schematicType: "flow",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logogoldium.png",
    bgImage: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1000&q=80" // Altın & Kuyumculuk Teması
  },
  { 
    id: "fizyohol", 
    title: "FİZYOHOL", 
    tagColor: "bg-cyan-50 text-cyan-600 border-cyan-200", 
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]", 
    schematicType: "funnel",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logophysio.png",
    bgImage: "https://cdn.sellfmedia.workers.dev/portfolio/fizyowebsite1.png"
  },
  { 
    id: "elitehair", 
    title: "ELİTEHAİR", 
    tagColor: "bg-indigo-50 text-indigo-600 border-indigo-200", 
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]", 
    schematicType: "dual",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/elithairlogo.png",
    bgImage: "https://cdn.sellfmedia.workers.dev/essentials/Screenshot%202026-06-29%20at%209.35.36%20PM.png"
  },
  { 
    id: "philips", 
    title: "PHİLİPS NAM", 
    tagColor: "bg-sky-50 text-sky-600 border-sky-200", 
    gridClass: "lg:col-span-2 lg:row-span-2 min-h-[460px]", 
    schematicType: "dual",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logophilips.png",
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80" // Sağlık Cihazları Teması
  },
  { 
    id: "colins", 
    title: "COLİN'S", 
    tagColor: "bg-zinc-100 text-zinc-700 border-zinc-300", 
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]", 
    schematicType: "matrix",
    logoUrl: null, // Logo yok
    bgImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80" // Casual Giyim Teması
  },
  { 
    id: "sfera", 
    title: "SFERA", 
    tagColor: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200", 
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]", 
    schematicType: "dual",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logosfera.png",
    bgImage: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1000&q=80" // Mobil Uygulama Teması
  },
  { 
    id: "greymanner", 
    title: "GREY MANNER", 
    tagColor: "bg-violet-50 text-violet-600 border-violet-200", 
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[240px]", 
    schematicType: "steps",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logogrey.png",
    bgImage: "https://cdn.sellfmedia.workers.dev/portfolio/grey1.png"
  },
  { 
    id: "ascegyo", 
    title: "ASCE GYO", 
    tagColor: "bg-orange-50 text-orange-600 border-orange-200", 
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[240px]", 
    schematicType: "flow",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logoasce.png",
    bgImage: "https://cdn.sellfmedia.workers.dev/portfolio/asce%204.jpg"
  },
  { 
    id: "gkc", 
    title: "GKC", 
    tagColor: "bg-stone-100 text-stone-700 border-stone-300", 
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[240px]", 
    schematicType: "steps",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logogkc.png",
    bgImage: "https://cdn.sellfmedia.workers.dev/portfolio/gkc1.jpg"
  }
];

// ===== 3. LIGHT THEME İNFOGRAFİK / ŞEMATİK MOTORU =====
const SchematicVisual = ({ type, data }: { type: string; data: string[] }) => {
  if (type === "funnel") {
    return (
      <div className="flex flex-col gap-1 w-full max-w-[150px] font-mono text-[9px]">
        {data.map((step, idx) => (
          <div 
            key={idx} 
            className="bg-black/[0.03] text-zinc-800 py-1 px-2 border border-black/10 text-center tracking-wider uppercase font-bold rounded"
            style={{ width: `${100 - idx * 12}%`, margin: "0 auto" }}
          >
            {step}
          </div>
        ))}
      </div>
    );
  }

  if (type === "loop") {
    return (
      <div className="flex flex-col items-center justify-center gap-1 font-mono text-[9px] text-zinc-800 w-full">
        {data.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="bg-black/[0.03] border border-black/10 px-2 py-1 font-bold tracking-wide uppercase rounded">
              {step}
            </div>
            {idx < data.length - 1 && <span className="text-zinc-400 text-[10px] my-0.5">▼</span>}
          </div>
        ))}
      </div>
    );
  }

  if (type === "dual") {
    return (
      <div className="flex flex-col gap-1.5 font-mono text-[9px] w-full">
        {data.map((side, idx) => (
          <div key={idx} className="border-l-2 border-zinc-400 bg-black/[0.02] p-1.5 text-zinc-800 font-medium uppercase tracking-tight rounded-r">
            {side}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 font-mono text-[9px] text-zinc-700 w-full px-2">
      {data.map((step, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          <span className="text-zinc-400 font-bold">[{idx + 1}]</span>
          <span className="tracking-wide uppercase truncate font-medium">{step}</span>
        </div>
      ))}
    </div>
  );
};

// ===== 4. ANA BENTO GRID BİLEŞENİ =====
export default function BentoGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dictionary[currentLang];

  return (
    <section className="home-work w-full bg-[#f1f0ec] py-20 md:py-28 border-b border-black/10">
      <div className="sellf-container">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] mb-12 md:mb-16 items-end">
          <div>
            <h2 className="sellf-display text-5xl md:text-7xl text-black">
              {t.mainTitle1}<br />{t.mainTitle2}
            </h2>
          </div>
          <div className="hidden lg:block h-px bg-black/15 mb-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-black/15">
          {gridLayoutData.map((config) => {
            const itemText = t.items[config.id];
            const isHovered = hoveredId === config.id;

            return (
              <article
                key={config.id}
                onMouseEnter={() => setHoveredId(config.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative min-h-[330px] md:min-h-[380px] border-r border-b border-black/15 overflow-hidden bg-[#f8f7f3] transition-all duration-500 ${config.gridClass.includes('col-span-2') ? 'lg:col-span-2' : 'lg:col-span-1'}`}
              >
                {config.bgImage && (
                  <div className="absolute inset-x-0 top-0 h-[44%] overflow-hidden bg-[#e4e2dd]">
                    <div
                      className="absolute inset-0 bg-cover bg-center grayscale-[12%] transition-transform duration-700 group-hover:scale-[1.035]"
                      style={{ backgroundImage: `url("${config.bgImage}")` }}
                    />
                    <div className="absolute inset-0 bg-black/[.04]" />
                  </div>
                )}

                <div className="relative z-10 h-full min-h-[330px] md:min-h-[380px] p-5 md:p-6 flex flex-col justify-end">
                  <div className={`transition-all duration-500 ${config.bgImage ? 'pt-[45%]' : ''}`}>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-black/45">{itemText.tag}</span>
                      <span className="text-[9px] text-black/30">//{config.id.toUpperCase()}</span>
                    </div>

                    <div className="min-h-8 mb-3 flex items-center">
                      {config.logoUrl ? (
                        <img src={config.logoUrl} alt={config.title} className="max-h-7 max-w-[135px] object-contain object-left grayscale contrast-125" />
                      ) : (
                        <h3 className="text-xl md:text-2xl font-bold tracking-[-.04em] text-black">{config.title}</h3>
                      )}
                    </div>

                    <p className="text-sm text-black/58 leading-relaxed mb-4">{itemText.shortDesc}</p>

                    <div className={`grid transition-all duration-500 ${isHovered ? 'grid-rows-[1fr] opacity-100 mb-5' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="pt-4 border-t border-black/10 space-y-4">
                          <div className="bg-black/[.025] border border-black/10 p-3 min-h-[84px] flex items-center justify-center">
                            <SchematicVisual type={config.schematicType} data={itemText.schematicData} />
                          </div>
                          <p className="text-xs leading-relaxed text-black/55">{itemText.longDesc}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black/10 flex flex-wrap gap-x-4 gap-y-1.5">
                      {itemText.metrics.map((metric, idx) => (
                        <span key={idx} className="text-[11px] font-bold tracking-tight text-black">{metric}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}