"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

const dictionary = {
  tr: { topTitle: "Dönüştüren O Ekip", mainTitle1: "İşletmeleri Markalara,", mainTitle2: "Ve Markaları", highlight: "Başarı Hikayelerine.", scrollHint: "Nasıl Olduğunu Keşfet" },
  en: { topTitle: "The Team That Transforms", mainTitle1: "Businesses Into Brands,", mainTitle2: "And Brands Into", highlight: "Success Stories.", scrollHint: "Discover How" }
};

export default function AboutHero() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dictionary[currentLang];

  return (
    <section className="bg-[#0b0d0d] text-white pt-24 md:pt-28">
      <div className="sellf-container grid lg:grid-cols-[.9fr_1.1fr] border-x border-white/10">
        <div className="min-h-[520px] md:min-h-[620px] px-5 py-14 md:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
          <p className="sellf-kicker text-white/38">{t.topTitle}</p>
          <div>
            <h1 className="sellf-display text-5xl md:text-7xl lg:text-[5rem] max-w-[11ch]">{t.mainTitle1}</h1>
            <div className="my-7 h-11 w-11 border border-white/15 rounded-full flex items-center justify-center"><ArrowPathIcon className="h-5 w-5 text-white/65" /></div>
            <h2 className="sellf-display text-4xl md:text-6xl lg:text-[4.3rem] max-w-[11ch] text-white/62">{t.mainTitle2}<br/>{t.highlight}</h2>
          </div>
          <div className="text-[9px] uppercase tracking-[.22em] text-white/34">{t.scrollHint} ↓</div>
        </div>
        <div className="relative min-h-[440px] md:min-h-[620px] overflow-hidden">
          <video src="https://cdn.sellfmedia.workers.dev/videos/about_us_video.mp4" autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover grayscale-[20%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
        </div>
      </div>
    </section>
  );
}
