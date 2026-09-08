"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation"; // 1. Dil Radarı Eklendi

// Yardımcı Tip
type LocalizedString = { tr: string; en: string };

// ===== 1. SÜREÇ VERİ MERKEZİ (İkiz Veri Formatı) =====
const processSteps: { id: string; step: string; title: LocalizedString; desc: LocalizedString; isHere: boolean }[] = [
  {
    id: "step-0",
    step: "STEP 00",
    title: { tr: "Tanışma ve External BHS", en: "Intro & External BHS" },
    desc: {
      tr: "Markanızın mevcut durumunun ilk değerlendirmesi, temel hedeflerin uyumlandırılması ve External BHS (Marka Sağlık Skoru) ile öncelikli darboğazların belirlenmesi.",
      en: "Initial assessment of your brand's current state, alignment of core objectives, and preliminary bottleneck identification through our External BHS (Brand Health Score)."
    },
    isHere: true,
  },
  {
    id: "step-1",
    step: "STEP 01",
    title: { tr: "Onboarding: BHS, Marka & Ürün Zeka Kartları", en: "Onboarding: BHS, Brand & Product Intelligence Cards" },
    desc: {
      tr: "Markanızın finansal tablosu, operasyonel verimliliği ve funnel bütünlüğü BHS metodolojisiyle derinlemesine analiz edilir. Marka ve ürün zeka kartları oluşturulur.",
      en: "Your brand's financial structure, operational efficiency, and funnel integrity are deeply analyzed through the BHS methodology. Brand and product intelligence cards are created."
    },
    isHere: false,
  },
  {
    id: "step-2",
    step: "STEP 02",
    title: { tr: "Pazar İstihbaratı & Rakip Analizi", en: "Market Intelligence & Competitor Analysis" },
    desc: {
      tr: "SellfCompete altyapısıyla rakip verilerinin, sektör trendlerinin ve pazar açıklarının yapay zeka destekli analizi. Mutlak rekabet avantajınızın ortaya çıkarılması.",
      en: "AI-driven competitor data, industry trends, and market gap analysis powered by SellfCompete infrastructure. Uncovering your absolute competitive advantage."
    },
    isHere: false,
  },
  {
    id: "step-3",
    step: "STEP 03",
    title: { tr: "BHS Skoru & Başlangıç Röntgeni", en: "BHS Score & Baseline Scan" },
    desc: {
      tr: "Dijital varlık sağlığı, marka algısı ve rekabetçi pozisyon Sellf tarafından ölçülerek tam BHS skoru hesaplanır. Bu skor, büyümenizin başlangıç referans noktasıdır.",
      en: "Digital asset health, brand perception, and competitive position are measured by Sellf to calculate the complete BHS score. This score becomes the baseline reference point for your growth."
    },
    isHere: false,
  },
  {
    id: "step-4",
    step: "STEP 04",
    title: { tr: "Stratejik Plan (1 & 5 Yıllık)", en: "Strategic Plan (1 & 5 Year)" },
    desc: {
      tr: "Tüm veriler birleştirilerek fazlara, bütçe kırılımlarına ve öngörülen sonuçlara sahip 1 yıllık ve 5 yıllık büyüme planlamaları oluşturulur. Öncelik her zaman teknik altyapı iyileştirmesidir.",
      en: "All data is consolidated to build 1-year and 5-year growth plans with phases, budget breakdowns, and projected outcomes. Technical infrastructure improvements are always the first priority."
    },
    isHere: false,
  },
  {
    id: "step-5",
    step: "STEP 05",
    title: { tr: "Operasyon & Büyüme", en: "Operations & Growth" },
    desc: {
      tr: "Tüm dijital varlıklar, erişimler ve bağlantılar sağlanarak operasyona başlanır. Analiz, hassas hedefleme ve davranışsal değişimler tarafından yönlendirilen çok kanallı büyüme icrası.",
      en: "All digital assets, access credentials, and connections are secured before operations begin. Multi-channel growth execution driven by analytics, precise targeting, and behavioral shifts."
    },
    isHere: false,
  },
  {
    id: "step-6",
    step: "STEP 06",
    title: { tr: "RGI Ölçümü (3 Aylık & Yıllık)", en: "RGI Measurement (Quarterly & Annual)" },
    desc: {
      tr: "Başlangıç BHS skoru baz alınarak 3 aylık ve yıllık aralıklarla RGI (Gerçek Büyüme Endeksi) ölçülür. Büyümeniz sayısal olarak kanıtlanır, strateji sürekli kalibre edilir.",
      en: "RGI (Real Growth Index) is measured at 3-month and annual intervals based on the initial BHS score. Your growth is numerically proven and strategy is continuously calibrated."
    },
    isHere: false,
  },
];

// Sabit Metin Sözlüğü
const dict = {
  tr: {
    subtitle: "Sellf Mimarisi",
    mainTitle: "Öngörülebilir Büyüme İçin İnşa Edildi.",
    here: "Buradasınız",
    ready: "Büyüme Planı Hazır."
  },
  en: {
    subtitle: "The Sellf Architecture",
    mainTitle: "Engineered for Predictable Growth.",
    here: "You Are Here",
    ready: "Growth Blueprint Ready."
  }
};

export default function ProcessEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleNodes, setVisibleNodes] = useState<string[]>([]);

  // 2. Dil Seçimi
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrolled = (windowHeight / 1.8) - rect.top; 
      const totalHeight = rect.height;
      let percent = (scrolled / totalHeight) * 100;
      percent = Math.max(0, Math.min(100, percent));
      setScrollProgress(percent);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleNodes((prev) => 
              prev.includes(entry.target.id) ? prev : [...prev, entry.target.id]
            );
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" }
    );
    const nodes = document.querySelectorAll(".process-node");
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="home-process bg-[#f1f0ec] py-20 md:py-28 border-b border-black/10">
      <div className="sellf-container">
        <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-16 items-end mb-14 md:mb-20">
          <div>
            <p className="sellf-kicker text-black/45 mb-5">{t.subtitle}</p>
            <h3 className="sellf-display text-5xl md:text-7xl max-w-[11ch]">{t.mainTitle}</h3>
          </div>
          <div className="hidden lg:block h-px bg-black/15 mb-2" />
        </div>

        <div ref={containerRef} className="grid lg:grid-cols-[.85fr_1.15fr] border border-black/15 bg-[#f8f7f3]">
          <div className="relative min-h-[460px] border-b lg:border-b-0 lg:border-r border-black/15 overflow-hidden bg-[#d9d8d3]">
            <img src="https://cdn.sellfmedia.workers.dev/statics/IMG_1444_edited.jpg" alt="Sellf Texture" className="absolute inset-0 w-full h-full object-cover grayscale opacity-65" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <div className="h-px bg-white/30 mb-5" />
              <p className="text-[10px] uppercase tracking-[.2em] text-white/72">{t.ready}</p>
            </div>
          </div>

          <div className="divide-y divide-black/10">
            {processSteps.map((item, index) => {
              const isVisible = visibleNodes.includes(item.id);
              return (
                <div key={item.id} id={item.id} className={`process-node grid grid-cols-[62px_1fr] md:grid-cols-[86px_1fr] gap-2 p-5 md:p-7 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-1'}`}>
                  <div>
                    <span className="text-[9px] font-semibold tracking-[.16em] text-black/34">{item.step}</span>
                    {item.isHere && <span className="mt-3 block h-2 w-2 rounded-full bg-sellf-primary" aria-label={t.here} />}
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-semibold tracking-[-.035em] text-black mb-2">{item.title[currentLang]}</h4>
                    <p className="text-xs md:text-sm leading-relaxed text-black/55 max-w-2xl">{item.desc[currentLang]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}