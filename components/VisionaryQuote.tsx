"use client";

import { useParams } from "next/navigation";

export default function VisionaryQuote() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";

  const dict = {
    tr: {
      subtitle: "The Sellf Mentality",
      quote: "Sellf'te gerçek büyümeyi üç temel üzerine inşa ediyoruz:",
      sustainability: "Sürdürülebilirlik",
      scalability: "Ölçeklenebilirlik",
      efficiency: "Verimlilik",
      joiner: "ve",
      quote2:
        "Saf karlılığa odaklanmak için ajans ekosisteminin içi boş verilerini ve harcama bağımlılığını bir kenara bırakıyoruz. Bunu sağlayan strateji ve pazarlama bir gider değil; en güçlü yatırımınızdır.",
      ceo: "Kurucu & CEO @ Sellf",
      pillarNotes: ["Daha güçlü bir yarın için.", "Daha büyük bir yarın için.", "Daha akıllı bir yarın için."],
    },
    en: {
      subtitle: "The Sellf Mentality",
      quote: "At Sellf, we position true growth upon three pillars:",
      sustainability: "Sustainability",
      scalability: "Scalability",
      efficiency: "Efficiency",
      joiner: "and",
      quote2:
        "We strip away the agency ecosystem's hollow data points and spending addiction to focus on pure profitability. The strategy and marketing that enable this are not an expense—they are your most powerful investment.",
      ceo: "Founder & CEO @ Sellf",
      pillarNotes: ["For a stronger tomorrow.", "For a larger tomorrow.", "For a smarter tomorrow."],
    },
  } as const;

  const t = dict[currentLang];
  const pillars = [t.sustainability, t.scalability, t.efficiency];

  return (
    <section className="home-visionary overflow-hidden border-y border-black/[.06] bg-[#f7f7f5] text-[#111]">
      <div className="sellf-container lg:grid lg:aspect-[1774/847] lg:grid-cols-[56.82%_43.18%]">
        <div className="flex min-h-[650px] flex-col justify-between px-6 py-14 sm:px-8 md:px-12 lg:min-h-0 lg:px-[9.8%] lg:py-[8.5%]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.34em] text-black/38">
              {t.subtitle}
            </p>

            <blockquote className="mt-9 max-w-[14.2ch] text-[clamp(2.7rem,3.55vw,4.3rem)] font-medium leading-[1.045] tracking-[-.052em] text-black">
              “{t.quote}{" "}
              <span className="text-black/48">{t.sustainability}</span>,{" "}
              <span className="text-black/48">{t.scalability}</span>{" "}
              <span className="text-black/42">{t.joiner}</span>{" "}
              <span className="text-black/48">{t.efficiency}</span>.”
            </blockquote>

            <p className="mt-8 max-w-[46rem] text-[13px] leading-[1.65] text-black/58 md:text-[14px] lg:max-w-[44rem]">
              {t.quote2}
            </p>

            <div className="mt-8 flex items-center gap-5">
              <span className="h-px w-10 bg-black/30" />
              <div>
                <div className="text-[14px] font-semibold tracking-[-.01em]">Yiğit Konuk</div>
                <div className="mt-1 text-[9px] uppercase tracking-[.22em] text-black/38">{t.ceo}</div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0">
            {pillars.map((pillar, index) => (
              <div
                key={pillar}
                className={`${index > 0 ? "sm:border-l sm:border-black/[.15] sm:pl-8" : ""} sm:pr-8`}
              >
                <div className="text-[9px] font-medium tracking-[.18em] text-black/32">0{index + 1}</div>
                <div className="mt-2.5 text-[10px] font-semibold uppercase tracking-[.22em] text-black/76">
                  {pillar}
                </div>
                <div className="mt-2 text-[10px] tracking-[.08em] text-black/34">
                  {t.pillarNotes[index]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[560px] border-t border-black/[.06] lg:min-h-0 lg:border-l lg:border-t-0">
          <img
            src="/images/founder-quote-right.webp"
            alt="Yiğit Konuk - Sellf Mentality"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
