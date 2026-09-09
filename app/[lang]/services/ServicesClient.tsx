"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { serviceData } from "@/data/ServiceData";

const dict = {
  tr: { expertise: "Uzmanlığımız", whatWeDo: "Çözümlerimiz", whatWeDoSpan: "", processHeader: "Süreç & Metodoloji", deliverablesHeader: "Çıktılar", showcaseHeader: "Örnek Projeler" },
  en: { expertise: "Our Expertise", whatWeDo: "Our ", whatWeDoSpan: "Solutions", processHeader: "Process & Framework", deliverablesHeader: "Deliverables", showcaseHeader: "Showcase" }
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
    <main className="min-h-screen bg-white pb-20 pt-28 md:pb-28 md:pt-36">
      <section className="sellf-container">
        <div className="grid items-end gap-8 border-b border-black/[.07] pb-10 md:pb-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
          <div>
            <p className="sellf-kicker mb-5 text-black/38">{t.expertise}</p>
            <h1 className="sellf-display max-w-[10ch] text-[3.35rem] leading-[.9] tracking-[-.06em] text-black sm:text-6xl md:text-7xl lg:text-[5.4rem]">
              {t.whatWeDo}<span className="text-black/30">{t.whatWeDoSpan}</span>
            </h1>
          </div>
          <div className="hidden lg:flex items-end justify-end pb-1">
            <div className="flex w-full max-w-sm items-center gap-4">
              <span className="h-px flex-1 bg-black/[.08]" />
              <span className="text-[9px] font-medium tracking-[.16em] text-black/25">01 — 08</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const detail = serviceData.find((item) => item.id === service.id);

            return (
              <motion.button
                key={service.id}
                type="button"
                layoutId={service.id}
                onClick={() => setSelectedId(service.id)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex min-h-[300px] overflow-hidden rounded-[18px] border border-black/[.055] bg-[#f7f7f4] p-5 text-left shadow-[0_2px_12px_rgba(11,13,13,.018)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-black/[.10] hover:bg-white hover:shadow-[0_16px_38px_rgba(11,13,13,.065)] md:min-h-[330px] md:p-6"
              >
                <div className="flex w-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[9px] font-medium uppercase tracking-[.18em] text-black/25">0{index + 1}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[.07] bg-white/75 text-[12px] text-black/35 transition-all duration-300 group-hover:border-black/15 group-hover:bg-black group-hover:text-white">↗</span>
                  </div>

                  <div className="mt-8 flex h-[86px] items-center md:mt-10 md:h-[94px]">
                    <div className="relative h-16 w-20 origin-left grayscale opacity-80 transition-[filter,opacity,transform] duration-300 group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:opacity-100 md:h-[72px] md:w-24">
                      <Image src={service.icon} alt={service.title[currentLang]} fill className="object-contain object-left" unoptimized />
                    </div>
                  </div>

                  <div className="mt-auto pt-8">
                    <h2 className="max-w-[15ch] text-[1.08rem] font-semibold leading-[1.08] tracking-[-.04em] text-black md:text-[1.2rem]">
                      {service.title[currentLang]}
                    </h2>
                    {detail && (
                      <p className="mt-3 line-clamp-3 max-w-[30ch] text-[10px] leading-[1.5] text-black/42 md:text-[11px]">
                        {detail.heroText[currentLang]}
                      </p>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
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
