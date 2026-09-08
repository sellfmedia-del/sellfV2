"use client";

import { useParams } from "next/navigation";

type LocalizedString = { tr: string; en: string };

const ecosystemData: { id: string; name: LocalizedString; logoUrl: string; href: string }[] = [
  { id: "sellfscale", name: { tr: "SELLFSCALE", en: "SELLFSCALE" }, logoUrl: "https://cdn.sellfmedia.workers.dev/statics/sellfscalelogo.png", href: "https://sellfscale.com" },
  { id: "sellfcompete", name: { tr: "SELLFCOMPETE", en: "SELLFCOMPETE" }, logoUrl: "https://cdn.sellfmedia.workers.dev/statics/sellfcompetelogo.png", href: "https://sellfcompete.com" },
  { id: "otopart", name: { tr: "OTOPART TR", en: "OTOPART TR" }, logoUrl: "https://cdn.sellfmedia.workers.dev/statics/otopartlogo.png", href: "https://otoparttr.com" },
];

const dict = {
  tr: { t1: "İnşa Ederiz. ", t2: "Sahipleniriz. ", t3: "Ölçekleriz.", visit: "Siteye Git →" },
  en: { t1: "We Build. ", t2: "We Own. ", t3: "We Scale.", visit: "Visit Site →" },
};

export default function Ecosystem() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  return (
    <section className="home-ecosystem bg-[#0b0d0d] text-white border-b border-white/10 py-20 md:py-28">
      <div className="sellf-container">
        <div className="mb-12">
          <h2 className="sellf-display text-4xl md:text-6xl lg:text-7xl max-w-5xl">
            <span>{t.t1}</span><span className="text-white/62">{t.t2}</span><span>{t.t3}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 border-l border-t border-white/12">
          {ecosystemData.map((brand) => (
            <a key={brand.id} href={brand.href} target="_blank" rel="noopener noreferrer" className="group min-h-[250px] border-r border-b border-white/12 p-7 flex flex-col justify-between hover:bg-white/[.035] transition-colors">
              <div className="text-[9px] uppercase tracking-[.2em] text-white/32">{brand.name[currentLang]}</div>
              <div className="h-24 flex items-center justify-center px-5">
                <img src={brand.logoUrl} alt={brand.name[currentLang]} className="max-w-full max-h-full object-contain grayscale brightness-[2] opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[10px] font-semibold text-white/48 group-hover:text-white transition-colors">{t.visit}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
