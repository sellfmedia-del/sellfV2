"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { serviceData } from "@/data/ServiceData";

const dict = {
  tr: { expertise: "Uzmanlığımız", whatWeDo: "Genelde Ne ", whatWeDoSpan: "Yaparız...", processHeader: "Süreç & Metodoloji", deliverablesHeader: "Çıktılar", showcaseHeader: "Örnek Projeler" },
  en: { expertise: "Our Expertise", whatWeDo: "What we usually ", whatWeDoSpan: "Do...", processHeader: "Process & Framework", deliverablesHeader: "Deliverables", showcaseHeader: "Showcase" }
};

const services = [
  { id: "integrated-growth", title: { tr: "Entegre Büyüme Partnerliği", en: "Integrated Growth Partnership" }, icon: "https://cdn.sellfmedia.workers.dev/essentials/Integrated%20Growth%20Consulting.png" },
  { id: "digital-ads", title: { tr: "Dijital Reklam Yönetimi", en: "Digital Advertisement" }, icon: "https://cdn.sellfmedia.workers.dev/essentials/PPC.png" },
  { id: "social-media", title: { tr: "Sosyal Medya Yönetimi", en: "Social Media Management" }, icon: "https://cdn.sellfmedia.workers.dev/essentials/SM.png" },
  { id: "design", title: { tr: "Statik ve Motion Tasarım", en: "Static & Motion Design" }, icon: "https://cdn.sellfmedia.workers.dev/essentials/Design.png" },
  { id: "seo", title: { tr: "SEO (Arama Motoru Optimizasyonu)", en: "Search Engine Optimization" }, icon: "https://cdn.sellfmedia.workers.dev/essentials/SEO.png" },
  { id: "influencer", title: { tr: "Influencer Pazarlaması", en: "Influencer Marketing" }, icon: "https://cdn.sellfmedia.workers.dev/essentials/Influencer%20Marketing.png" },
  { id: "e-com", title: { tr: "E-Ticaret Operasyonları", en: "E-Commerce Operations" }, icon: "https://cdn.sellfmedia.workers.dev/essentials/E-Com.png" },
  { id: "productions", title: { tr: "Prodüksiyon", en: "Productions" }, icon: "https://cdn.sellfmedia.workers.dev/essentials/Production.png" },
];

export default function ServicesClient() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];
  const activeServiceData = serviceData.find((s) => s.id === selectedId);

  return (
    <main className="min-h-screen bg-[#f1f0ec] pt-28 md:pt-36 pb-20 md:pb-28">
      <section className="sellf-container">
        <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-16 items-end mb-12 md:mb-16">
          <div>
            <p className="sellf-kicker text-black/45 mb-5">{t.expertise}</p>
            <h1 className="sellf-display text-5xl md:text-7xl lg:text-8xl text-black">
              {t.whatWeDo}<span className="text-black/35">{t.whatWeDoSpan}</span>
            </h1>
          </div>
          <div className="hidden lg:block h-px bg-black/15 mb-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-black/15 bg-[#f8f7f3]">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              type="button"
              layoutId={service.id}
              onClick={() => setSelectedId(service.id)}
              className="group min-h-[260px] md:min-h-[300px] text-left border-r border-b border-black/15 p-6 flex flex-col justify-between hover:bg-white transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-[9px] uppercase tracking-[.18em] text-black/35">0{index + 1}</span>
                <span className="text-sm text-black/35 group-hover:text-black transition-colors">↗</span>
              </div>
              <div className="relative w-20 h-20 md:w-24 md:h-24 grayscale opacity-65 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 origin-left">
                <Image src={service.icon} alt={service.title[currentLang]} fill className="object-contain object-left" unoptimized />
              </div>
              <h2 className="text-lg md:text-xl font-semibold tracking-[-.035em] leading-tight max-w-[14ch]">{service.title[currentLang]}</h2>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="absolute inset-0 bg-black/75 backdrop-blur-md" />
            <motion.div layoutId={selectedId} className="relative w-full max-w-6xl max-h-[92dvh] overflow-y-auto bg-[#0b0d0d] text-white border border-white/10 shadow-2xl scrollbar-hide">
              <button type="button" onClick={() => setSelectedId(null)} className="sticky top-4 ml-auto mr-4 mt-4 z-20 h-10 w-10 rounded-full border border-white/15 bg-black/55 backdrop-blur flex items-center justify-center text-white/70 hover:text-white">×</button>
              <div className="px-6 pb-12 md:px-12 md:pb-16 lg:px-16 lg:pb-20">
                <p className="sellf-kicker text-white/35 mb-5">{t.expertise}</p>
                <h2 className="sellf-display text-4xl md:text-6xl max-w-[13ch] mb-12">{services.find((s) => s.id === selectedId)?.title[currentLang]}</h2>

                {activeServiceData && (
                  <div className="space-y-14 md:space-y-20">
                    <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 border-t border-white/12 pt-8">
                      <p className="text-xl md:text-3xl tracking-[-.035em] leading-tight">{activeServiceData.heroText[currentLang]}</p>
                      <p className="text-sm md:text-base leading-relaxed text-white/55">{activeServiceData.description[currentLang]}</p>
                    </div>

                    {activeServiceData.process?.length > 0 && (
                      <section>
                        <h3 className="sellf-kicker text-white/38 mb-6">{t.processHeader}</h3>
                        <div className="border-t border-white/12">
                          {activeServiceData.process.map((step, idx) => (
                            <div key={idx} className="grid grid-cols-[52px_1fr] md:grid-cols-[90px_1fr] gap-4 py-6 border-b border-white/12">
                              <span className="text-[10px] text-white/32">0{idx + 1}</span>
                              <div className="grid md:grid-cols-[.7fr_1.3fr] gap-3 md:gap-8">
                                <h4 className="font-semibold tracking-[-.02em]">{step.title[currentLang]}</h4>
                                <p className="text-sm leading-relaxed text-white/52">{step.description[currentLang]}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {activeServiceData.deliverables?.length > 0 && (
                      <section>
                        <h3 className="sellf-kicker text-white/38 mb-6">{t.deliverablesHeader}</h3>
                        <div className="grid sm:grid-cols-2 border-l border-t border-white/12">
                          {activeServiceData.deliverables.map((item, idx) => (
                            <div key={idx} className="border-r border-b border-white/12 p-5 text-sm text-white/72">{item[currentLang]}</div>
                          ))}
                        </div>
                      </section>
                    )}

                    {activeServiceData.showcaseLogos?.length > 0 && (
                      <section>
                        <h3 className="sellf-kicker text-white/38 mb-6">{t.showcaseHeader}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 border-l border-t border-white/12">
                          {activeServiceData.showcaseLogos.map((logo, idx) => (
                            <div key={idx} className="h-28 border-r border-b border-white/12 p-6 flex items-center justify-center">
                              <div className="relative w-full h-full brightness-0 invert opacity-60 hover:opacity-100 transition-opacity">
                                <Image src={logo} alt={`Showcase Logo ${idx + 1}`} fill className="object-contain" unoptimized />
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
