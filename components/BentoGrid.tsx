"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

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
        shortDesc: "“₺62,99 maliyetle 222 lead.”",
        longDesc: "Tamamen reklam odaklı bir çalışma yürütüldü. Düşük edinim maliyetinde yüksek kaliteli lead akışı hedeflendi; reklam kurgusu ve hedefleme bu KPI etrafında optimize edildi. Tüm rezervasyon müsaitlikleri doldu.",
        metrics: ["₺62,99 Lead Maliyeti", "222 Toplam Lead", "1/24 ROI"],
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
      },
      gotradego: {
        tag: "SEO & ORGANİK BÜYÜME",
        shortDesc: "“4 ayda tıklamalarda %400, görünürlükte %1.100 artış.”",
        longDesc: "Teknik SEO, içerik mimarisi ve arama niyeti optimizasyonunun birlikte yürütüldüğü dört aylık çalışma, GoTradeGo'nun organik talep yakalama kapasitesini büyüttü.",
        metrics: ["+%400 Organik Tıklama", "+%1.100 Görüntülenme", "4 Ay"],
        schematicData: ["Teknik SEO", "İçerik Otoritesi", "Arama Talebi"]
      },
      monstera: {
        tag: "SAĞLIKTA SEO",
        shortDesc: "“3 ayda organik tıklamalarda %235 büyüme.”",
        longDesc: "Sağlık sektörünün yüksek güven gerektiren arama yapısına göre teknik altyapı, içerik ve sayfa optimizasyonları birlikte ele alındı; üç ay içinde hem tıklama hem görünürlük güçlü biçimde yükseldi.",
        metrics: ["+%235 Organik Tıklama", "+%845 Görüntülenme", "3 Ay"],
        schematicData: ["Teknik Sağlık SEO'su", "İçerik Optimizasyonu", "Organik Görünürlük"]
      },
      social2024: {
        tag: "SOSYAL MEDYA PERFORMANSI",
        shortDesc: "“2024 ortalamasında etkileşim %700 arttı.”",
        longDesc: "Markalar genelinde içerik stratejisi, format seçimi, yayın ritmi ve dağıtım optimizasyonu tek performans disiplini altında yönetildi; etkileşim ve siteye yönlenen trafik birlikte büyüdü.",
        metrics: ["+%700 İçerik Etkileşimi", "+%262 Link Tıklaması", "2024 Ortalaması"],
        schematicData: ["İçerik Stratejisi", "Format & Dağıtım", "Etkileşim Döngüsü"]
      },
      beautycommerce: {
        tag: "E-TİCARET & KOZMETİK",
        shortDesc: "“17,5 milyon TL ciroya uzanan performans.”",
        longDesc: "Kozmetik e-ticaret operasyonunda medya yatırımı, dönüşüm akışı ve ticari hedefler aynı ölçüm sistemi altında yönetildi; yıllık ciro, dönüşüm ve yatırım geri dönüşü birlikte büyütüldü.",
        metrics: ["17,5 Mn TL Yıllık Ciro", "+%300 Dönüşüm Oranı", "+%213 ROI Artışı"],
        schematicData: ["Medya Yatırımı", "Dönüşüm Akışı", "Kârlı Ölçekleme"]
      },
      asceinwest: {
        tag: "GAYRİMENKUL BÜYÜMESİ",
        shortDesc: "“2 projede 1.850 potansiyel alıcı.”",
        longDesc: "ASCE GYO ve Inwest Group için strateji, kreatif, medya ve lead akışı uçtan uca tek kurgu altında yönetildi; iki projede dijital erişim ve potansiyel alıcı talebi birlikte büyütüldü.",
        metrics: ["+%450 Dijital Erişim", "1.850 Potansiyel Alıcı", "2 Proje"],
        schematicData: ["Strateji & Kreatif", "Medya Dağıtımı", "Alıcı Talebi"]
      },
      schnitzel: {
        tag: "FRANCHISE BÜYÜME SİSTEMİ",
        shortDesc: "“3 ayda lokasyon ziyaretlerinde %57 artış.”",
        longDesc: "Franchise sistemi baştan kurgulandı; websiteye franchise talep motoru ve CRM takip entegrasyonu eklendi. Pazarlama operasyonu perakende marka iletişimi ve B2B franchising olarak ayrıştırılıp ayrı ayrı ölçüldü. Dijital kanallardan lokasyon içi müşteri deneyimine kadar entegre uygulamalar yürütüldü.",
        metrics: ["+%57 Lokasyon Ziyareti", "37 Yeni Sözleşme Süreci", "+%34 Pozitif Değerlendirme"],
        schematicData: ["Perakende Marka", "Franchise Talep Motoru", "CRM Takibi"]
      },
      sermandbarr: {
        tag: "DİJİTAL DENEYİM & DESTEK",
        shortDesc: "“Organik trafikte %117 büyüme.”",
        longDesc: "Website dinamik video ve render içerikleriyle baştan aşağı yenilendi; teknik ve içerik SEO iyileştirmeleri tamamlandı. Servis ve destek hattı tek numarada birleştirilerek router sistemi üzerinden yarı AI bot, yarı çağrı merkezi dinamiğine bağlandı.",
        metrics: ["+%117 Organik Trafik", "+3 Sıralama Pozisyonu", "-%27 Bounce Rate", "+%50 Destek Memnuniyeti"],
        schematicData: ["Yeni Website", "SEO Altyapısı", "AI Bot + Call Center"]
      },
      lealkaravan: {
        tag: "ENTEGRE BÜYÜME DANIŞMANLIĞI",
        shortDesc: "“Talep, kârlılık ve operasyon birlikte büyüdü.”",
        longDesc: "Pazar, rakip, fiyat aralığı, müşteri acı noktaları ve gelişim alanları kapsamlı biçimde araştırıldı. Yıllık bütçe planı; influencer pazarlama, içerik takvimi, prodüksiyon, sosyal medya ve reklam kurgularıyla tek büyüme sistemi altında birleştirildi. Bütçe, belirlenen temel gelir alanlarına göre optimize edildi.",
        metrics: ["+%34 Gelen Talep", "+%29 Kârlılık", "+%60 Operasyonel Verim", "+%300 Erişim & Etkileşim"],
        schematicData: ["Pazar Araştırması", "Gelir Alanları", "Bütçe Optimizasyonu"]
      },
      wyndhamgrand: {
        tag: "OTEL SOSYAL MEDYA BÜYÜMESİ",
        shortDesc: "“3 ayda 760+ rezervasyon talebi.”",
        longDesc: "Sosyal medya yönetimi ve influencer pazarlama tek bir plan altında toplandı. Dağınık ilerleyen bütçe, içerik üretimi ve yayın takvimi yeniden yapılandırılarak erişimden rezervasyon talebine uzanan ölçülebilir bir akış kuruldu.",
        metrics: ["+%23 Takipçi", "+%254 Erişim & Etkileşim", "760+ Rezervasyon Talebi", "3 Ay"],
        schematicData: ["İçerik Takvimi", "Influencer Dağıtımı", "Rezervasyon Talebi"]
      },
      softhotels: {
        tag: "OTEL CRM & OPERASYON",
        shortDesc: "“Ticket kapanma hızı ikiye katlandı.”",
        longDesc: "Otel yönetimi, ticket ve talep toplama platformu baştan tasarlandı. İş süreçleri ve sunucu bağlantıları yeniden kuruldu; CRM, muhasebe ve operasyon arayüzleri ortak yönetim panelinde birleştirildi. Böylece talep yanıtları ve ödeme onayları daha hızlı ve izlenebilir hale geldi.",
        metrics: ["-%45 İç Şikâyet", "+%100 Kapanma Hızı", "+%60 Tahmini Verimlilik", "+%200 Yanıt & Onay Hızı"],
        schematicData: ["Talep & Ticket", "CRM Yönetimi", "Muhasebe & Operasyon"]
      },
      nutralen: {
        tag: "ENTEGRE E-TİCARET BÜYÜMESİ",
        shortDesc: "“6 ayda ciroda %256 büyüme.”",
        longDesc: "E-ticaret ve pazaryeri yönetimi; dijital reklam, sosyal medya, influencer pazarlama ve ambalaj tasarımıyla entegre edildi. Tüm pazarlama kanalları ortak ticari hedefler ve ölçüm sistemi üzerinden yönetildi.",
        metrics: ["+%300 Sipariş / 3 Yeni İl", "+%450 Etkileşim", "+%256 Ciro", "1/4 ROI"],
        schematicData: ["Pazaryerleri", "Medya & Influencer", "Ambalaj & Marka"]
      },
      lionsdarwin: {
        tag: "SIFIRDAN MARKA KURULUMU",
        shortDesc: "“İlk ayda %5 pazar payı.”",
        longDesc: "Marka; kurumsal kimlik, ambalaj tasarımı, influencer pazarlama ve dijital assetlerle uçtan uca kuruldu. Lansmanla birlikte stok ve muhasebe yönetimleri otomasyona taşınarak marka iletişimi ile operasyon altyapısı aynı sistemde buluşturuldu.",
        metrics: ["%5 İlk Ay Pazar Payı", "1/1,65 İlk Ay ROI", "Stok & Muhasebe Otomasyonu"],
        schematicData: ["Kurumsal Kimlik", "Ambalaj Tasarımı", "Lansman & Otomasyon"]
      },
      farmhouse: {
        tag: "DİJİTAL TASARIM",
        shortDesc: "“Marka deneyimi için sade ve tutarlı bir tasarım dili.”",
        longDesc: "FarmHouse için markanın karakterini dijital ortama taşıyan tasarım çalışmaları üretildi. Görsel hiyerarşi, sayfa kompozisyonları ve temel dijital assetler ortak bir tasarım sistemi altında toplandı.",
        metrics: ["Görsel Kimlik", "Website Tasarımı", "Dijital Assetler"],
        schematicData: ["Tasarım Yönü", "Arayüz Sistemi", "Uygulama Seti"]
      },
      muratbey: {
        tag: "ÜRÜN KONUMLANDIRMA & SOSYAL",
        shortDesc: "“Her segmente ayrı ürün anlatısı.”",
        longDesc: "Ürün konumlandırması ve sosyal medya dili tamamen yenilendi. Reklam ve sosyal medya kreatifleri hedef kitle segmentlerine göre ayrıştırılarak her ürünün doğru mesaj, görsel dil ve kullanım bağlamıyla anlatılması sağlandı.",
        metrics: ["Yeni Ürün Konumlandırması", "Segment Bazlı Kreatif", "Yenilenen Sosyal Medya Dili"],
        schematicData: ["Hedef Segment", "Ürün Mesajı", "Kreatif Sistem"]
      },
      uko: {
        tag: "UÇTAN UCA DİJİTAL DÖNÜŞÜM",
        shortDesc: "“Muhasebeden e-ticarete tek yönetim sistemi.”",
        longDesc: "Manuel faturalama Logo otomasyonuna taşındı; ikas altyapısında website kuruldu. Muhasebe, stok, ödeme ve entegrasyonlar baştan yapılandırılarak özel ortak yönetim paneline bağlandı. Sosyal medya ve reklam kurguları bu dijital altyapıyla birlikte yürütüldü.",
        metrics: ["+%230 Google Görüntülenme", "+%47 Gelen Arama", "+%200 Muhasebe Verimi", "+%32 Ciro"],
        schematicData: ["ikas Website", "Logo & Stok", "Ödeme & Yönetim Paneli"]
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
        shortDesc: "“222 leads at ₺62.99 each.”",
        longDesc: "A fully ad-focused operation was carried out. High-quality lead flow at a low acquisition cost was targeted; the ad structure and targeting were optimized around this KPI. All booking availabilities were filled.",
        metrics: ["₺62.99 Cost per Lead", "222 Total Leads", "1/24 ROI"],
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
      },
      gotradego: {
        tag: "SEO & ORGANIC GROWTH",
        shortDesc: "“400% more clicks and 1,100% more visibility in 4 months.”",
        longDesc: "A four-month programme combining technical SEO, content architecture and search-intent optimisation expanded GoTradeGo's ability to capture organic demand.",
        metrics: ["+400% Organic Clicks", "+1,100% Impressions", "4 Months"],
        schematicData: ["Technical SEO", "Content Authority", "Search Demand"]
      },
      monstera: {
        tag: "HEALTHCARE SEO",
        shortDesc: "“235% growth in organic clicks in 3 months.”",
        longDesc: "Technical infrastructure, content and on-page optimisation were aligned with the healthcare sector's trust-sensitive search landscape; clicks and visibility grew strongly within three months.",
        metrics: ["+235% Organic Clicks", "+845% Impressions", "3 Months"],
        schematicData: ["Healthcare SEO", "Content Optimisation", "Organic Visibility"]
      },
      social2024: {
        tag: "SOCIAL MEDIA PERFORMANCE",
        shortDesc: "“700% higher engagement across the 2024 average.”",
        longDesc: "Across brands, content strategy, format selection, publishing cadence and distribution optimisation were managed as one performance discipline, growing both engagement and website traffic.",
        metrics: ["+700% Content Engagement", "+262% Link Clicks", "2024 Average"],
        schematicData: ["Content Strategy", "Format & Distribution", "Engagement Loop"]
      },
      beautycommerce: {
        tag: "E-COMMERCE & BEAUTY",
        shortDesc: "“Performance that reached ₺17.5M in annual revenue.”",
        longDesc: "For a beauty e-commerce operation, media investment, conversion flow and commercial targets were managed under one measurement system, growing revenue, conversion and return on investment together.",
        metrics: ["₺17.5M Annual Revenue", "+300% Conversion Rate", "+213% ROI Growth"],
        schematicData: ["Media Investment", "Conversion Flow", "Profitable Scale"]
      },
      asceinwest: {
        tag: "REAL ESTATE GROWTH",
        shortDesc: "“1,850 potential buyers across 2 projects.”",
        longDesc: "Strategy, creative, media and lead flow for ASCE GYO and Inwest Group were managed in one end-to-end system, growing digital reach and potential-buyer demand across two projects.",
        metrics: ["+450% Digital Reach", "1,850 Potential Buyers", "2 Projects"],
        schematicData: ["Strategy & Creative", "Media Distribution", "Buyer Demand"]
      },
      schnitzel: {
        tag: "FRANCHISE GROWTH SYSTEM",
        shortDesc: "“57% more location visits in 3 months.”",
        longDesc: "The franchise system was rebuilt, adding a franchise enquiry engine and CRM tracking to the website. Marketing was split into retail brand communication and B2B franchising, with each measured separately. Integrated applications extended from digital channels into the in-location customer experience.",
        metrics: ["+57% Location Visits", "37 New Contract Processes", "+34% Positive Reviews"],
        schematicData: ["Retail Brand", "Franchise Enquiries", "CRM Tracking"]
      },
      sermandbarr: {
        tag: "DIGITAL EXPERIENCE & SUPPORT",
        shortDesc: "“117% growth in organic traffic.”",
        longDesc: "The website was rebuilt around dynamic video and rendered content, supported by technical and content SEO improvements. Service and support were consolidated under one number and routed through a hybrid AI bot and call-centre workflow.",
        metrics: ["+117% Organic Traffic", "+3 Ranking Positions", "-27% Bounce Rate", "+50% Support Satisfaction"],
        schematicData: ["New Website", "SEO Foundation", "AI Bot + Call Centre"]
      },
      lealkaravan: {
        tag: "INTEGRATED GROWTH CONSULTING",
        shortDesc: "“Demand, profitability and operations grew together.”",
        longDesc: "The market, competitors, optimal price range, customer pain points and development opportunities were researched in depth. Annual budget planning brought influencer marketing, content, production, social media and advertising into one growth system, with investment directed towards the strongest revenue areas.",
        metrics: ["+34% Inbound Demand", "+29% Profitability", "+60% Operational Efficiency", "+300% Reach & Engagement"],
        schematicData: ["Market Research", "Revenue Areas", "Budget Optimisation"]
      },
      wyndhamgrand: {
        tag: "HOTEL SOCIAL GROWTH",
        shortDesc: "“760+ booking enquiries in 3 months.”",
        longDesc: "Social media management and influencer marketing were brought into one plan. Fragmented budgets, content production and publishing calendars were restructured into a measurable flow from reach to booking enquiry.",
        metrics: ["+23% Followers", "+254% Reach & Engagement", "760+ Booking Enquiries", "3 Months"],
        schematicData: ["Content Calendar", "Influencer Distribution", "Booking Demand"]
      },
      softhotels: {
        tag: "HOTEL CRM & OPERATIONS",
        shortDesc: "“Ticket resolution speed doubled.”",
        longDesc: "The hotel management, ticketing and request platform was redesigned from the ground up. Workflows and server connections were rebuilt, while CRM, accounting and operations interfaces were connected through one management panel, making responses and payment approvals faster and traceable.",
        metrics: ["-45% Internal Complaints", "+100% Resolution Speed", "+60% Est. Efficiency", "+200% Response & Approval Speed"],
        schematicData: ["Requests & Tickets", "CRM Management", "Accounting & Ops"]
      },
      nutralen: {
        tag: "INTEGRATED E-COMMERCE GROWTH",
        shortDesc: "“256% revenue growth in 6 months.”",
        longDesc: "E-commerce and marketplace management were integrated with digital advertising, social media, influencer marketing and packaging design. Every marketing channel was managed against shared commercial targets and one measurement system.",
        metrics: ["+300% Orders / 3 New Cities", "+450% Engagement", "+256% Revenue", "1/4 ROI"],
        schematicData: ["Marketplaces", "Media & Influencers", "Packaging & Brand"]
      },
      lionsdarwin: {
        tag: "BRAND BUILD FROM ZERO",
        shortDesc: "“5% market share in the first month.”",
        longDesc: "The brand was built end to end, spanning identity, packaging, influencer marketing and digital assets. Inventory and accounting were automated alongside launch, connecting the customer-facing brand with its operational foundation.",
        metrics: ["5% First-Month Share", "1/1.65 First-Month ROI", "Inventory & Accounting Automation"],
        schematicData: ["Brand Identity", "Packaging Design", "Launch & Automation"]
      },
      farmhouse: {
        tag: "DIGITAL DESIGN",
        shortDesc: "“A clear, consistent design language for the brand experience.”",
        longDesc: "Design work translated FarmHouse's character into a digital experience. Visual hierarchy, page compositions and core digital assets were brought together under one coherent design system.",
        metrics: ["Visual Identity", "Website Design", "Digital Assets"],
        schematicData: ["Design Direction", "Interface System", "Application Set"]
      },
      muratbey: {
        tag: "PRODUCT POSITIONING & SOCIAL",
        shortDesc: "“A distinct product story for every segment.”",
        longDesc: "Product positioning and the social media voice were completely renewed. Advertising and social creatives were differentiated by audience segment, giving each product the right message, visual language and usage context.",
        metrics: ["New Product Positioning", "Segmented Creative", "Renewed Social Voice"],
        schematicData: ["Audience Segment", "Product Message", "Creative System"]
      },
      uko: {
        tag: "END-TO-END DIGITAL TRANSFORMATION",
        shortDesc: "“One management system from accounting to e-commerce.”",
        longDesc: "Manual invoicing moved to Logo automation and a new website was built on ikas. Accounting, inventory, payments and integrations were rebuilt and connected to a custom shared panel, while social media and advertising ran alongside the new digital infrastructure.",
        metrics: ["+230% Google Views", "+47% Inbound Calls", "+200% Accounting Efficiency", "+32% Revenue"],
        schematicData: ["ikas Website", "Logo & Inventory", "Payments & Admin Panel"]
      }
    }
  }
};

// ===== 2. FERAH / AÇIK RENKLİ STRÜKTÜR KONFİGÜRASYONU (GÖRSEL VE LOGOLAR DAHİL) =====
interface GridConfig {
  id: "evepack" | "canias" | "iamlovein" | "qashe" | "goldium" | "fizyohol" | "elitehair" | "philips" | "colins" | "sfera" | "greymanner" | "ascegyo" | "gkc" | "gotradego" | "monstera" | "social2024" | "beautycommerce" | "asceinwest" | "schnitzel" | "sermandbarr" | "lealkaravan" | "wyndhamgrand" | "softhotels" | "nutralen" | "lionsdarwin" | "farmhouse" | "muratbey" | "uko";
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
  },
  {
    id: "gotradego",
    title: "GOTRADEGO",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "flow",
    logoUrl: null,
    bgImage: "https://gotradego.com/GTG_IMAGES/a281ed433cf8477aa08791887875c091.png"
  },
  {
    id: "monstera",
    title: "MONSTERA",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "funnel",
    logoUrl: null,
    bgImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "social2024",
    title: "2024 SOCIAL",
    tagColor: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "loop",
    logoUrl: null,
    bgImage: "https://images.unsplash.com/photo-1660824340595-abee9c790d85?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "beautycommerce",
    title: "BEAUTY E-COMMERCE",
    tagColor: "bg-rose-50 text-rose-700 border-rose-200",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "steps",
    logoUrl: null,
    bgImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "asceinwest",
    title: "INWEST",
    tagColor: "bg-orange-50 text-orange-700 border-orange-200",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "flow",
    logoUrl: null,
    bgImage: "https://ascezenith.com/en/images/galeri/dismekan/1.jpg"
  },
  {
    id: "schnitzel",
    title: "SCHNITZEL LANDMANN",
    tagColor: "bg-red-50 text-red-700 border-red-200",
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[240px]",
    schematicType: "dual",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logoscnitzel.png",
    bgImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "sermandbarr",
    title: "SERM & BARR",
    tagColor: "bg-slate-100 text-slate-700 border-slate-300",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "flow",
    logoUrl: null,
    bgImage: "https://i.ytimg.com/vi/ej5Yl-6b2Og/hqdefault.jpg"
  },
  {
    id: "lealkaravan",
    title: "LEAL KARAVAN / DETHLEFFS",
    tagColor: "bg-teal-50 text-teal-700 border-teal-200",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "steps",
    logoUrl: null,
    bgImage: "/images/showcases/leal-dethleffs.webp"
  },
  {
    id: "wyndhamgrand",
    title: "WYNDHAM GRAND",
    tagColor: "bg-sky-50 text-sky-700 border-sky-200",
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[240px]",
    schematicType: "funnel",
    logoUrl: null,
    bgImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "softhotels",
    title: "SOFT HOTELS",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "loop",
    logoUrl: null,
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "nutralen",
    title: "NUTRALEN",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "flow",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logonutralen.png",
    bgImage: "https://cdn.sellfmedia.workers.dev/portfolio/nutralen1.png"
  },
  {
    id: "lionsdarwin",
    title: "LIONS DARWIN",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[240px]",
    schematicType: "steps",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logolions.png",
    bgImage: "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj6.jpg"
  },
  {
    id: "farmhouse",
    title: "FARMHOUSE",
    tagColor: "bg-lime-50 text-lime-700 border-lime-200",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "matrix",
    logoUrl: null,
    bgImage: "https://cdn.sellfmedia.workers.dev/portfolio/farmhouse1.png"
  },
  {
    id: "muratbey",
    title: "MURATBEY",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    gridClass: "lg:col-span-1 lg:row-span-1 min-h-[240px]",
    schematicType: "dual",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logomuratbey.png",
    bgImage: "https://cdn.sellfmedia.workers.dev/portfolio/muratbey1.jpg"
  },
  {
    id: "uko",
    title: "UKO",
    tagColor: "bg-zinc-100 text-zinc-700 border-zinc-300",
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[240px]",
    schematicType: "flow",
    logoUrl: "https://cdn.sellfmedia.workers.dev/essentials/logouko.png",
    bgImage: "https://cdn.sellfmedia.workers.dev/portfolio/uko1.jpg"
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
                    <Image
                      src={config.bgImage}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 1023px) 100vw, 33vw"
                      className="object-cover object-center grayscale-[12%] transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-black/[.04]" />
                  </div>
                )}

                <div className="relative z-10 h-full min-h-[330px] md:min-h-[380px] p-5 md:p-6 flex flex-col justify-end">
                  <div className={`transition-all duration-500 ${config.bgImage ? 'pt-[45%]' : ''}`}>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-black/45">{itemText.tag}</span>
                      <span className="text-[9px] text-black/30">{"//"}{config.id.toUpperCase()}</span>
                    </div>

                    <div className="min-h-8 mb-3 flex items-center">
                      {config.logoUrl ? (
                        <img src={config.logoUrl} alt={config.title} className="max-h-7 max-w-[135px] object-contain object-left grayscale contrast-125" />
                      ) : (
                        <h3 className="text-xl md:text-2xl font-bold tracking-[-.04em] text-black">{config.title}</h3>
                      )}
                    </div>

                    <p className="text-sm text-black/58 leading-relaxed mb-4">{itemText.shortDesc}</p>

                    <button
                      type="button"
                      className="mb-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.14em] text-black/48 lg:hidden"
                      aria-expanded={isHovered}
                      aria-controls={`showcase-detail-${config.id}`}
                      onClick={() => setHoveredId((current) => current === config.id ? null : config.id)}
                    >
                      {currentLang === "tr" ? (isHovered ? "Detayı Gizle" : "Detayı Gör") : (isHovered ? "Hide Details" : "View Details")}
                      <span aria-hidden="true">{isHovered ? "−" : "+"}</span>
                    </button>

                    <div id={`showcase-detail-${config.id}`} className={`grid transition-all duration-500 ${isHovered ? 'grid-rows-[1fr] opacity-100 mb-5' : 'grid-rows-[0fr] opacity-0'}`}>
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
