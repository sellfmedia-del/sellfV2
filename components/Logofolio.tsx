"use client";

import { useParams } from "next/navigation";

type LocalizedString = { tr: string; en: string };

const services: { id: number; text: LocalizedString }[] = [
  { id: 1, text: { tr: "Entegre Pazarlama", en: "Integrated Marketing" } },
  { id: 2, text: { tr: "Influencer Pazarlaması", en: "Influencer Marketing" } },
  { id: 3, text: { tr: "PR ve Kriz Yönetimi", en: "PR & Crisis Management" } },
  { id: 4, text: { tr: "Sosyal Medya Yönetimi", en: "Social Media Management" } },
  { id: 5, text: { tr: "Statik ve Motion Tasarım", en: "Static & Motion Design" } },
  { id: 6, text: { tr: "Arama Motoru Optimizasyonu", en: "Search Engine Optimization" } },
  { id: 7, text: { tr: "Dijital Reklamcılık", en: "Digital Advertising" } },
  { id: 8, text: { tr: "Lojistik Yönetimi", en: "Logistics Management" } },
  { id: 9, text: { tr: "Sipariş Karşılama (Fulfillment)", en: "Fulfillment" } },
  { id: 10, text: { tr: "Full-Stack Geliştirme", en: "Full-Stack Development" } },
  { id: 11, text: { tr: "E-Ticaret Yönetimi", en: "E-Commerce Management" } },
  { id: 12, text: { tr: "Markalaşma", en: "Branding" } },
  { id: 13, text: { tr: "Finansal Danışmanlık", en: "Financial Consulting" } },
];

const marqueeRow1 = [
  "https://cdn.sellfmedia.workers.dev/essentials/logoaretias.png", "https://cdn.sellfmedia.workers.dev/essentials/logoasce.png", "https://cdn.sellfmedia.workers.dev/essentials/logocms.png", "https://cdn.sellfmedia.workers.dev/essentials/logocominify.png", "https://cdn.sellfmedia.workers.dev/essentials/logodaysinn.png", "https://cdn.sellfmedia.workers.dev/essentials/logoeternal.png", "https://cdn.sellfmedia.workers.dev/essentials/logoevepack.png", "https://cdn.sellfmedia.workers.dev/essentials/logogkc.png"
];
const marqueeRow2 = [
  "https://cdn.sellfmedia.workers.dev/essentials/18.png", "https://cdn.sellfmedia.workers.dev/essentials/logogoldium.png", "https://cdn.sellfmedia.workers.dev/essentials/logogrey.png", "https://cdn.sellfmedia.workers.dev/essentials/logolions.png", "https://cdn.sellfmedia.workers.dev/essentials/logolvmh.png", "https://cdn.sellfmedia.workers.dev/essentials/logomuratbey.png", "https://cdn.sellfmedia.workers.dev/essentials/logonarpos.png", "https://cdn.sellfmedia.workers.dev/essentials/logonutralen.png", "https://cdn.sellfmedia.workers.dev/essentials/logoshevec.png"
];
const marqueeRow3 = [
  "https://cdn.sellfmedia.workers.dev/essentials/logophilips.png", "https://cdn.sellfmedia.workers.dev/essentials/logophysio.png", "https://cdn.sellfmedia.workers.dev/essentials/logoqashe.png ", "https://cdn.sellfmedia.workers.dev/essentials/logorollbab.png", "https://cdn.sellfmedia.workers.dev/essentials/logoscnitzel.png", "https://cdn.sellfmedia.workers.dev/essentials/logosfera.png", "https://cdn.sellfmedia.workers.dev/essentials/logouko.png", "https://cdn.sellfmedia.workers.dev/essentials/logozuhre.png"
];

function LogoRow({ logos, reverse = false, duration = 34 }: { logos: string[]; reverse?: boolean; duration?: number }) {
  return (
    <div className="overflow-hidden border-t border-black/10">
      <div className={`flex w-max ${reverse ? 'sellf-marquee-r' : 'sellf-marquee-l'}`} style={{ animationDuration: `${duration}s` }}>
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="w-[180px] md:w-[240px] h-24 md:h-28 flex items-center justify-center px-7 border-r border-black/10">
            <img src={logo.trim()} alt={`Brand Logo ${i + 1}`} className="max-w-full max-h-12 md:max-h-14 object-contain grayscale opacity-55 hover:opacity-100 hover:grayscale-0 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Logofolio() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";

  return (
    <section className="home-logos bg-[#f1f0ec] border-b border-black/10 py-20 md:py-24 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sellfMarqueeL { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes sellfMarqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .sellf-marquee-l { animation: sellfMarqueeL 34s linear infinite; }
        .sellf-marquee-r { animation: sellfMarqueeR 36s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .sellf-marquee-l,.sellf-marquee-r { animation: none; } }
      `}} />
      <div className="sellf-container mb-10">
        <div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-black/48">
            {services.map((item) => <span key={item.id}>{item.text[currentLang]}</span>)}
          </div>
        </div>
      </div>
      <div className="border-b border-black/10">
        <LogoRow logos={marqueeRow1} />
        <LogoRow logos={marqueeRow2} reverse duration={37} />
        <LogoRow logos={marqueeRow3} duration={41} />
      </div>
    </section>
  );
}
