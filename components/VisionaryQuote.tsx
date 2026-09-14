"use client";

import { useParams } from "next/navigation";
import { founderQuoteImage1 } from "../data/founderQuoteImage1";
import { founderQuoteImage2 } from "../data/founderQuoteImage2";
import { founderQuoteImage3 } from "../data/founderQuoteImage3";
import { founderQuoteImage4 } from "../data/founderQuoteImage4";

const founderQuoteImage = `data:image/webp;base64,${founderQuoteImage1}${founderQuoteImage2}${founderQuoteImage3}${founderQuoteImage4}`;

export default function VisionaryQuote() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";

  const dict = {
    tr: {
      subtitle: "The Sellf Mentality",
      quoteLines: [
        "“Sellf'te gerçek büyümeyi",
        "üç temel üzerine inşa ediyoruz:",
        "Sürdürülebilirlik,",
        "Ölçeklenebilirlik ve Verimlilik.”",
      ],
      quote2:
        "Saf karlılığa odaklanmak için ajans ekosisteminin içi boş verilerini ve harcama bağımlılığını bir kenara bırakıyoruz. Bunu sağlayan strateji ve pazarlama bir gider değil; en güçlü yatırımınızdır.",
      ceo: "Kurucu & CEO @ Sellf",
      pillars: [
        ["Sürdürülebilirlik", "Daha güçlü bir yarın için."],
        ["Ölçeklenebilirlik", "Daha büyük bir yarın için."],
        ["Verimlilik", "Daha akıllı bir yarın için."],
      ],
    },
    en: {
      subtitle: "The Sellf Mentality",
      quoteLines: [
        "“At Sellf, we position true",
        "growth upon three pillars:",
        "Sustainability, Scalability,",
        "and Efficiency.”",
      ],
      quote2:
        "We strip away the agency ecosystem's hollow data points and spending addiction to focus on pure profitability. The strategy and marketing that enable this are not an expense—they are your most powerful investment.",
      ceo: "Founder & CEO @ Sellf",
      pillars: [
        ["Sustainability", "For a stronger tomorrow."],
        ["Scalability", "For a larger tomorrow."],
        ["Efficiency", "For a smarter tomorrow."],
      ],
    },
  } as const;

  const t = dict[currentLang];
  const quoteSize =
    currentLang === "tr"
      ? "text-[clamp(2.22rem,2.82vw,2.72rem)] xl:text-[2.9rem]"
      : "text-[clamp(2.55rem,3.18vw,3.18rem)] xl:text-[3.35rem]";

  return (
    <section className="home-visionary overflow-hidden border-y border-black/[.06] bg-[#f8f8f6] text-[#101111]">
      <div className="sellf-container lg:grid lg:aspect-[1774/847] lg:grid-cols-[54.397%_45.603%]">
        <div className="flex min-h-[650px] flex-col justify-between px-6 py-14 sm:px-8 md:px-12 lg:min-h-0 lg:pb-[7.8%] lg:pl-[10.36%] lg:pr-[4.97%] lg:pt-[6.3%]">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[.36em] text-black/38">
              {t.subtitle}
            </p>

            <blockquote
              className={`mt-8 font-medium leading-[1.04] tracking-[-.052em] text-black ${quoteSize}`}
            >
              <span className="block whitespace-nowrap">{t.quoteLines[0]}</span>
              <span className="block whitespace-nowrap">{t.quoteLines[1]}</span>
              <span className="block whitespace-nowrap text-black/48">{t.quoteLines[2]}</span>
              <span className="block whitespace-nowrap text-black/48">{t.quoteLines[3]}</span>
            </blockquote>

            <p className="mt-7 max-w-[40rem] text-[12px] leading-[1.58] text-black/58 md:text-[13px]">
              {t.quote2}
            </p>

            <div className="mt-7 flex items-center gap-5">
              <span className="h-px w-10 shrink-0 bg-black/28" />
              <div>
                <div className="text-[13px] font-semibold tracking-[-.01em]">Yiğit Konuk</div>
                <div className="mt-1 text-[8px] uppercase tracking-[.25em] text-black/38">{t.ceo}</div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0">
            {t.pillars.map(([pillar, note], index) => (
              <div
                key={pillar}
                className={`${index > 0 ? "sm:border-l sm:border-black/[.16] sm:pl-8" : ""} sm:pr-7`}
              >
                <div className="text-[8px] font-medium tracking-[.18em] text-black/34">0{index + 1}</div>
                <div className="mt-2 text-[9px] font-semibold uppercase tracking-[.23em] text-black/76">
                  {pillar}
                </div>
                <div className="mt-2 text-[9px] tracking-[.09em] text-black/36">{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[560px] border-t border-black/[.06] lg:min-h-0 lg:border-l lg:border-t-0">
          <img
            src={founderQuoteImage}
            alt="Yiğit Konuk - Sellf Mentality"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
