"use client";

import { useParams } from "next/navigation";

export default function VisionaryQuote() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const dict = {
    tr: {
      subtitle: "The Sellf Mentality",
      quote: "Sellf'te gerçek büyümeyi üç temel üzerine inşa ediyoruz: ",
      sustainability: "Sürdürülebilirlik",
      scalability: "Ölçeklenebilirlik",
      efficiency: "Verimlilik",
      quote2: ". Saf karlılığa odaklanmak için ajans ekosisteminin içi boş verilerini ve harcama bağımlılığını bir kenara bırakıyoruz. Bunu sağlayan strateji ve pazarlama bir gider değil; en güçlü ",
      investment: "yatırımınızdır",
      ceo: "Kurucu & CEO @ Sellf"
    },
    en: {
      subtitle: "The Sellf Mentality",
      quote: "At Sellf, we position true growth upon three pillars: ",
      sustainability: "Sustainability",
      scalability: "Scalability",
      efficiency: "Efficiency",
      quote2: ". We strip away the agency ecosystem's hollow data points and spending addiction to focus on pure profitability. The strategy and marketing that enable this are not an expense—they are your ",
      investment: "most powerful investment",
      ceo: "Founder & CEO @ Sellf"
    }
  };
  const t = dict[currentLang];

  return (
    <section className="home-visionary bg-[#0b0d0d] text-white border-b border-white/10">
      <div className="sellf-container grid lg:grid-cols-[1.15fr_.85fr] border-x border-white/10">
        <div className="px-5 md:px-10 py-16 md:py-24 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between min-h-[560px]">
          <p className="sellf-kicker text-white/38">{t.subtitle}</p>
          <blockquote className="text-2xl md:text-4xl xl:text-[2.8rem] leading-[1.24] tracking-[-.035em] font-medium max-w-3xl">
            “{t.quote}<span className="text-white/65">{t.sustainability}</span>, <span className="text-white/65">{t.scalability}</span>, ve <span className="text-white/65">{t.efficiency}</span>{t.quote2}<span className="border-b border-white/35">{t.investment}</span>.”
          </blockquote>
          <div className="pt-10 border-t border-white/10">
            <div className="text-sm font-semibold">Yiğit Konuk</div>
            <div className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/40">{t.ceo}</div>
          </div>
        </div>
        <div className="relative min-h-[430px] lg:min-h-[560px] overflow-hidden bg-black">
          <img src="https://cdn.sellfmedia.workers.dev/statics/Gemini_Generated_Image_19em0h19em0h19em.png" alt="Yiğit Konuk - Sellf Mentality" className="absolute inset-0 h-full w-full object-cover grayscale contrast-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
