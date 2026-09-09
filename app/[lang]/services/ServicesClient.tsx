"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import SolutionHubIcon from "@/components/SolutionHubIcon";
import { solutionIndex } from "@/data/SolutionIndex";

const dict = {
  tr: {
    expertise: "Uzmanlığımız",
    whatWeDo: "Çözümlerimiz",
    whatWeDoSpan: "",
  },
  en: {
    expertise: "Our Expertise",
    whatWeDo: "Our ",
    whatWeDoSpan: "Solutions",
  },
};

export default function ServicesClient() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  return (
    <main className="min-h-screen bg-white pb-20 pt-28 md:pb-28 md:pt-36">
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1280px) {
          .solution-hub-grid {
            grid-template-columns: repeat(20, minmax(0, 1fr));
          }
          .solution-hub-card {
            grid-column: span 4 / span 4;
          }
          .solution-hub-card:nth-child(n + 11) {
            grid-column: span 5 / span 5;
          }
        }
      `}} />

      <section className="sellf-container">
        <div className="grid items-end gap-8 border-b border-black/[.07] pb-10 md:pb-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
          <div>
            <p className="sellf-kicker mb-5 text-black/38">{t.expertise}</p>
            <h1 className="sellf-display max-w-[10ch] text-[3.35rem] leading-[.9] tracking-[-.06em] text-black sm:text-6xl md:text-7xl lg:text-[5.4rem]">
              {t.whatWeDo}
              <span className="text-black/30">{t.whatWeDoSpan}</span>
            </h1>
          </div>
          <div className="hidden items-end justify-end pb-1 lg:flex">
            <div className="flex w-full max-w-sm items-center gap-4">
              <span className="h-px flex-1 bg-black/[.08]" />
              <span className="text-[9px] font-medium tracking-[.16em] text-black/25">
                01 — 14
              </span>
            </div>
          </div>
        </div>

        <div className="solution-hub-grid mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {solutionIndex.map((solution) => (
            <Link
              key={solution.slug}
              href={`/${currentLang}/services/${solution.slug}`}
              className="solution-hub-card group relative flex min-h-[300px] overflow-hidden rounded-[18px] border border-black/[.055] bg-[#f7f7f4] p-5 text-left shadow-[0_2px_12px_rgba(11,13,13,.018)] transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-[3px] hover:border-[#133B66]/20 hover:bg-white hover:shadow-[0_16px_38px_rgba(19,59,102,.09)] md:min-h-[330px] md:p-6"
            >
              <div className="flex w-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[9px] font-medium uppercase tracking-[.18em] text-black/25">
                    {String(solution.index).padStart(2, "0")}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#133B66]/15 bg-white/80 text-[12px] text-[#133B66]/45 shadow-[0_2px_8px_rgba(19,59,102,.04)] transition-all duration-300 group-hover:border-[#133B66] group-hover:bg-[#133B66] group-hover:text-white group-hover:shadow-[0_7px_18px_rgba(19,59,102,.22)]">
                    ↗
                  </span>
                </div>

                <div className="mt-7 flex h-[96px] items-center md:mt-8 md:h-[104px]">
                  <div className="origin-left opacity-90 transition-[opacity,transform,filter] duration-300 group-hover:scale-[1.055] group-hover:opacity-100 group-hover:drop-shadow-[0_9px_14px_rgba(47,107,255,.10)]">
                    <SolutionHubIcon slug={solution.slug} size={76} />
                  </div>
                </div>

                <div className="mt-auto pt-7">
                  <h2 className="max-w-[17ch] text-[1.08rem] font-semibold leading-[1.08] tracking-[-.04em] text-black md:text-[1.16rem]">
                    {solution.title[currentLang]}
                  </h2>
                  <p className="mt-3 line-clamp-3 max-w-[34ch] text-[10px] leading-[1.5] text-black/42 md:text-[10.5px]">
                    {solution.description[currentLang]}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
