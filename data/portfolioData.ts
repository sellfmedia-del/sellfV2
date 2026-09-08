export type LocalizedString = {
  tr: string;
  en: string;
};

export type PortfolioItem = {
  id: string;
  title: LocalizedString;
  type: "image" | "video";
  url: string; 
  gallery?: string[]; 
};

export const portfolioData: Record<"Samples" | "Designs" | "Content", PortfolioItem[]> = {
  
  "Samples": [
    {
      id: "brandbook-qashe",
      title: { tr: "Qashe Cosmetic", en: "Qashe Cosmetic" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/qashe%201.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/qashe%202.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/qashe%203.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/qashe%204.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/qashe%205.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/qashe%206.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/qashe%207.jpg",
      ]
    },
    {
      id: "brandbook-asce",
      title: { tr: "ASCE GYO", en: "ASCE GYO" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/asce 1.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 3.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 5.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 6.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 7.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 8.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 9.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 10.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 11.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 12.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 15.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 17.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/asce 16.jpg"      ]
    },
     {
      id: "brandbook-nutralen",
      title: { tr: "NutraleN", en: "NutraleN" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/NutraleN-logo-final.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/NutraleN-logo-final-beyaz.png"
      ]
    },
    {
      id: "brandbook-goldium",
      title: { tr: "Goldium", en: "Goldium" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/logo.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/mockup.jpg"
      ]
    },
     {
      id: "brandbook-GKC",
      title: { tr: "Gökçe", en: "Gökçe" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/GOKCE LOGO-SON-02.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/GOKCE LOGO-SON-01.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/GOKCE LOGO-SON-beyaz.png"
      ]
    },
    {
      id: "brandbook-grey-manner",
      title: { tr: "Grey Manner", en: "Grey Manner" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/1.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/10.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/11.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/12.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/3.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/5.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/6.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/7.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/8.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/9.jpg"
      ]
    },
    {
      id: "brandbook-blackbörg",
      title: { tr: "Blackbörg PR ve Büyüme Kurgusu", en: "Blackbörg PR & Growth Architecture" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/blackbork1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/blackbork2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/blackbork3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/blackbork4.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/blackbork5.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/blackbork6.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/blackbork7.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/blackbork8.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/blackbork9.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/blackbork10.png"
      ]
    },
    {
      id: "brandbook-dedeman",
      title: { tr: "Dedeman PR ve Lansman Kurgusu", en: "Dedeman PR & Launch Architecture" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/2_Giris-ve-Amac.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/dedeman1.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/dedeman2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/dedeman3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/dedeman4.png"
      ]
    },
    {
      id: "brandbook-fundora",
      title: { tr: "Fundora Büyüme ve Lansman Kurgusu", en: "Fundora Growth & Launch Architecture" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/fundora1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/fundora2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/fundora3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/fundora4.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/fundora5.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/fundora6.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/fundora7.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/fundora8.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/fundora9.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/fundora10.png"
      ]
    },
    {
      id: "brandbook-kervan-gida",
      title: { tr: "Kervan Gıda Kriz Yönetimi ve Büyüme Kurgusu", en: "Kervan Gıda Crisis Management & Growth Architecture" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/kervan1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/kervan2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/kervan3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/kervan4.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/kervan5.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/kervan6.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/kervan7.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/kervan8.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/kervan9.png"
      ]
    },
    {
      id: "brandbook-toyrus",
      title: { tr: "ToysRUs Ülke Çapında Giriş ve Büyüme Stratejisi", en: "ToysRUs Countrywide Entry and Growth Strategy" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/toys1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/toys2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/toys3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/toys4.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/toys5.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/toys6.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/toys7.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/toys8.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/toys9.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/toys10.png"       
      ]
    }
  ],

  "Designs": [
    {
      id: "design-1",
      title: { tr: "Ambalaj Tasarımları", en: "Packaging Designs" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/Screenshot%202025-12-25%20at%2010.39.30%E2%80%AFAM.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/Screenshot%202025-12-25%20at%2010.40.00%E2%80%AFAM.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/Screenshot%202025-12-25%20at%2010.39.47%E2%80%AFAM.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/Screenshot%202025-12-25%20at%2010.40.17%E2%80%AFAM.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/Screenshot%202025-12-25%20at%2010.40.28%E2%80%AFAM.png"
      ]
    },
    {
      id: "design-2",
      title: { tr: "NutraleN Ürün Tasarımları", en: "NutraleN Product Designs" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/insta-cilt-nbak%C4%B1m-mockup.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/A-Prutix-Jel-mockup.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/deo-for-man-mockup.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/femilen-intimate-gel.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/femilen-intimate-spray.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/flagelen.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/heel_and_elbow-mockup.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/L-CARNI%CC%87TI%CC%87NE.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/lip_balm.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/mommylen.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/mouth-wash.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/pigmentolen.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/propolis-massage-cream-mockup.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/propolis-mouth-spray-mockup.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/PROPOLI%CC%87S.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/Protective-Body-Milk-mockup.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/Soothing-cream-mockup.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/Squalen-Jel-mockup.jpg"
      ]
    },
     {
      id: "design-3",
      title: { tr: "Lions Darwin Ürün Tasarımları", en: "Lions Darwin Product Designs" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj6.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj7.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj8.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj9.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj10.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj11.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj12.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj13.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj14.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj15.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj16.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj17.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/lionsambalaj18.jpg"
      ]
    },
    {
      id: "design-4",
      title: { tr: "Fizyohol Web Sitesi Tasarımları", en: "Fizyohol Website Designs" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/fizyowebsite1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/fizyowebsite2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/fizyowebsite3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/fizyowebsite4.png"
      ]
    },
    {
      id: "design-5",
      title: { tr: "TIIB Web Sitesi Tasarımları", en: "TIIB Website Designs" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/tiib1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/tiib2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/tiib3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/tiib4.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/tiib5.png"
      ]
    },
    {
      id: "design-6",
      title: { tr: "LD Web Sitesi Tasarımları", en: "LD Website Designs" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/ld1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/ld2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/ld3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/ld4.png"
      ]
    },
     {
      id: "design-7",
      title: { tr: "NutraleN Web Sitesi Tasarımları", en: "NutraleN Website Designs" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/nutralen1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen4.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen5.png"
      ]
    },
     {
      id: "design-8",
      title: { tr: "FarmHouse Web Sitesi Tasarımları", en: "FarmHouse Website Designs" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/farmhouse1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/farmhouse2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/farmhouse3.png"
      ]
    },
     {
      id: "design-9",
      title: { tr: "FizyoHol Web Sitesi Tasarımları", en: "FizyoHol Website Designs" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/Screenshot_2026-02-27_at_5.57.07_PM_t2frc6.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/Screenshot_2026-02-27_at_5.57.20_PM_ne9hun.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/Screenshot_2026-02-27_at_5.57.28_PM_fdd6hv.png"
      ]
    },
     {
      id: "design-10",
      title: { tr: "Argeron Web Sitesi Tasarımları", en: "Argeron Website Designs" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/argeron1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/argeron2.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/argeron3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/argeron4.png"
      ]
    }
  ],

  "Content": [
    {
      id: "content-1",
      title: { tr: "UMU Resmi Kampanya Videosu", en: "UMU Official Campaign Video" },
      type: "video", 
      url: "https://cdn.sellfmedia.workers.dev/portfolio/umu-official_2oJLs2EL.mp4"
    },
    {
      id: "content-2",
      title: { tr: "Days By Wyndham İçerikleri", en: "Days By Wyndham Contents" },
      type: "video",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/daysby1.mp4",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/daysby2.mp4",
        "https://cdn.sellfmedia.workers.dev/portfolio/daysby3.mp4",
        "https://cdn.sellfmedia.workers.dev/portfolio/daysby4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/daysby5.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/daysby6.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/daysby7.jpg"
      ]
    },
     {
      id: "content-3",
      title: { tr: "LVMH Moda Çekimi", en: "LVMH Fashion Shot" },
      type: "video",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/lvmh-shoot_NUXe0Qbi.mp4"
    },
    {
      id: "content-4",
      title: { tr: "Aretias Sigorta Gönderileri", en: "Aretias Sigorta Posts" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/aretiaspost%202-100.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/aretiaspost%203-100.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/aretiaspost%204-100.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/aretiaspost%205-100.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/aretiaspost%207-100.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/aretiaspost%208-100.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/aretiaspost%209-100.jpg"
      ]
    },
     {
      id: "content-5",
      title: { tr: "Otopart Giriş Çekimi", en: "otopart Entry Shot" },
      type: "video",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/otopart-shoot_zg7ZAYUw.mp4"
    },
     {
      id: "content-6",
      title: { tr: "Monstera İçerik Videosu", en: "Monstera Content Video" },
      type: "video",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/monstera-shoot_IZUUfoVA.mp4"
    },
    {
      id: "content-7",
      title: { tr: "Qashe Reels Gönderileri", en: "Qashe Reel Posts" },
      type: "video",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/qashevid1.mp4",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/qashevid2.mp4",
        "https://cdn.sellfmedia.workers.dev/portfolio/qashevid3.mp4",
        "https://cdn.sellfmedia.workers.dev/portfolio/qashevid4.mp4"
      ]
    },
     {
      id: "content-8",
      title: { tr: "Volvo - Kafa Dergisi Çekimi", en: "Volvo - Kafa Magazine Shoot" },
      type: "video",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/volvo-kafa-dergisi-720p_9dsCwe7l.mp4"
    },
    {
      id: "content-9",
      title: { tr: "Qashe Instagram Gönderileri", en: "Qashe Instagram Posts" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_5.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_12.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_QASHE_I%CC%87c%CC%A7erik_1n.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_QASHE_I%CC%87c%CC%A7erik_3.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_12_2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_3.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_9_.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_8.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_7.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/1080x1350_6.png"
      ]
    },
     {
      id: "content-10",
      title: { tr: "Stilevs Ürün Çekimi", en: "Stilevs Product Shooting" },
      type: "video",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/Stilevs_21_Kas%C4%B1m_23_2.2.mp4"
    },
        {
      id: "content-11",
      title: { tr: "ASCE GYO İçerikleri", en: "ASCE GYO Contents" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/ascepostASCE%20S%CC%A7UBAT%202026%20GRID%20.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/ascepost2.1.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/ascepost2.2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/ascepost3.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/ascepost7.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/ascepost4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/ascepost5.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/ascepost1.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/ascepost10.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/ascepost11.jpg"
      ]
    },
        {
      id: "content-12",
      title: { tr: "Cominify İçerikleri", en: "Cominify Contents" },
      type: "video",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/cominify1.mp4",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/cominify2.mp4",
        "https://cdn.sellfmedia.workers.dev/portfolio/cominify3.mp4",
        "https://cdn.sellfmedia.workers.dev/portfolio/cominify4.mp4",
        "https://cdn.sellfmedia.workers.dev/portfolio/cominify5.mp4",
        "https://cdn.sellfmedia.workers.dev/portfolio/cominify6.mp4",
        "https://cdn.sellfmedia.workers.dev/portfolio/cominify7.mp4"
      ]
    },
        {
      id: "content-13",
      title: { tr: "GKC İçerikleri", en: "GKC Contents" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/gkc1.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/gkc2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/gkc3.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/gkc4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/gkc5.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/gkc6.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/gkc7.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/gkc8.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/gkc9.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/gkc10.jpg"
      ]
    },
   {
      id: "content-14",
      title: { tr: "NutraleN İçerikleri", en: "NutraleN Contents" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/nutralen1.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen3.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen5.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen6.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen7.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen8.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen9.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nutralen10.jpg"
      ]
    },
     {
      id: "content-15",
      title: { tr: "Grey Manner İçerikleri", en: "Grey manner Contents" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/grey1.png",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/grey2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey3.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey5.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey6.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey7.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey8.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey9.png",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey10.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey11.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey12.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey13.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/grey14.jpg"
      ]
    },
    {
      id: "content-16",
      title: { tr: "Muratbey ve Danet İçerikleri", en: "Muratbey and Danet Contents" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/muratbey1.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/muratbey2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/muratbey3.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/muratbey4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/muratbey5.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/muratbey6.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/muratbey7.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/muratbey8.jpg"
      ]
    },
    {
      id: "content-17",
      title: { tr: "NNB İçerikleri", en: "NNB Contents" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/nnb1.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/nnb2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nnb3.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nnb4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nnb5.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/nnb6.jpg"
      ]
    },
     {
      id: "content-18",
      title: { tr: "UKO İçerikleri", en: "UKO Contents" },
      type: "image",
      url: "https://cdn.sellfmedia.workers.dev/portfolio/uko1.jpg",
      gallery: [
        "https://cdn.sellfmedia.workers.dev/portfolio/uko2.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/uko3.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/uko4.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/uko5.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/uko6.jpg",
        "https://cdn.sellfmedia.workers.dev/portfolio/uko7.jpg"
      ]
    }
  ]
};