import Link from "next/link";
import SolutionCta from "@/components/SolutionCta";
import SolutionIcon from "@/components/SolutionIcon";
import SolutionProofMark from "@/components/SolutionProofMark";
import { getSolutionIndexItem, type SolutionIndexItem } from "@/data/SolutionIndex";
import type { SolutionContent, SupportedSolutionLang } from "@/data/SolutionContent";

type Props = {
  lang: SupportedSolutionLang;
  solution: SolutionIndexItem;
  content: SolutionContent;
};

const copy = {
  tr: {
    services: "Çözümlerimiz",
    overview: "Çözümün Kapsamı",
    outcomes: "İş Sonuçları",
    audience: "Kimler İçin",
    approach: "Yaklaşımımız",
    proof: "Deneyim & Referans",
    operations: "Operasyonlar",
    coreOps: "Ana Operasyonlar",
    extendedOps: "Destekleyici Operasyonlar",
    embeddedOps: "Entegre Yetkinlikler",
    faq: "Sık Sorulan Sorular",
    related: "İlgili Çözümler",
    back: "Tüm Çözümler",
  },
  en: {
    services: "Our Solutions",
    overview: "Solution Overview",
    outcomes: "Business Outcomes",
    audience: "Who It's For",
    approach: "Our Approach",
    proof: "Proof & Experience",
    operations: "Operations",
    coreOps: "Core Operations",
    extendedOps: "Extended Capabilities",
    embeddedOps: "Integrated Capabilities",
    faq: "Frequently Asked Questions",
    related: "Related Solutions",
    back: "All Solutions",
  },
} as const;

function localized<T extends { tr: string; en: string }>(
  value: T,
  lang: SupportedSolutionLang,
) {
  return value[lang];
}

export default function SolutionDetail({ lang, solution, content }: Props) {
  const t = copy[lang];
  const related = content.relatedSlugs
    .map((slug) => getSolutionIndexItem(slug))
    .filter((item): item is SolutionIndexItem => Boolean(item));

  const operationGroups = [
    { key: "A", label: t.coreOps, items: content.operations.A },
    { key: "B", label: t.extendedOps, items: content.operations.B },
    { key: "C", label: t.embeddedOps, items: content.operations.C },
  ].filter((group) => group.items.length > 0);

  return (
    <article className="min-h-screen bg-[#f1f0ec] text-[#0b0d0d]">
      <header className="relative overflow-hidden bg-[#0b0d0d] text-white">
        <div className="pointer-events-none absolute bottom-[-.18em] right-[-.02em] select-none text-[32vw] font-semibold leading-none tracking-[-.085em] text-white/[.018] lg:text-[26vw]">
          {String(solution.index).padStart(2, "0")}
        </div>

        <div className="sellf-container relative pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-28">
          <div className="flex items-center justify-between gap-8 border-b border-white/10 pb-5">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-[9px] font-semibold uppercase tracking-[.16em] text-white/38"
            >
              <Link href={`/${lang}/services`} className="transition-colors duration-300 hover:text-white">
                {t.services}
              </Link>
              <span aria-hidden="true" className="text-[#6ea7d5]">/</span>
              <span className="text-white/68">{solution.title[lang]}</span>
            </nav>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[.2em] text-white/28 sm:block">
              {String(solution.index).padStart(2, "0")} / 14
            </span>
          </div>

          <div className="grid gap-14 pb-12 pt-14 md:pt-20 lg:grid-cols-[1.35fr_.65fr] lg:items-start lg:gap-16 lg:pb-20">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 text-[#6ea7d5]">
                  <SolutionIcon slug={solution.slug} size={21} />
                </span>
                <p className="sellf-kicker text-white/34">{solution.title[lang]}</p>
              </div>
              <h1 className="sellf-display max-w-[11.5ch] text-[3.35rem] leading-[.9] tracking-[-.065em] sm:text-6xl md:text-[5.1rem] lg:text-[6.5rem] xl:text-[7.25rem]">
                {solution.heroTitle[lang]}
              </h1>
            </div>

            <div className="lg:pt-20">
              <div className="h-[2px] w-12 bg-[#1f5f9f]" />
              <p className="mt-7 max-w-[38rem] text-sm leading-7 text-white/58 md:text-[15px] md:leading-8">
                {solution.description[lang]}
              </p>
            </div>
          </div>

          <div className="grid border-t border-white/10 pt-8 lg:grid-cols-[1.35fr_.65fr] lg:gap-16">
            <p className="max-w-[26ch] text-xl font-medium leading-[1.22] tracking-[-.04em] text-white/92 md:text-2xl lg:col-start-2">
              {localized(content.statement, lang)}
            </p>
          </div>
        </div>
      </header>

      <section className="bg-[#fbfaf7]">
        <div className="sellf-container py-20 md:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.28fr_.72fr] lg:gap-20">
            <div className="flex items-start gap-4">
              <span className="mt-[6px] h-2 w-2 rounded-full bg-[#1f5f9f]" />
              <p className="sellf-kicker text-black/42">{t.overview}</p>
            </div>
            <div className="max-w-[950px]">
              {content.overview.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0
                    ? "max-w-[31ch] text-[2rem] font-medium leading-[1.16] tracking-[-.048em] text-black md:text-[2.75rem] lg:text-[3.2rem]"
                    : "mt-9 max-w-[56rem] border-l border-black/12 pl-6 text-sm leading-8 text-black/54 md:mt-12 md:pl-8 md:text-base"}
                >
                  {localized(paragraph, lang)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/[.08] bg-[#f1f0ec]">
        <div className="sellf-container py-20 md:py-28 lg:py-32">
          <div className="mb-14 flex items-end justify-between gap-8 border-b border-black/10 pb-5 md:mb-20">
            <div className="flex items-center gap-4">
              <span className="h-2 w-2 rounded-full bg-[#1f5f9f]" />
              <p className="sellf-kicker text-black/42">{t.outcomes}</p>
            </div>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[.16em] text-black/28 md:block">Sellf / Measurable Growth</span>
          </div>

          <div className="grid border-t border-black/10 md:grid-cols-3">
            {content.outcomeBullets.map((item, index) => (
              <div
                key={index}
                className="group min-h-[230px] border-b border-black/10 py-7 md:min-h-[300px] md:border-r md:px-7 md:py-8 first:md:pl-0 last:md:border-r-0 last:md:pr-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[.18em] text-black/28">0{index + 1}</span>
                  <span className="h-px w-7 bg-black/16 transition-all duration-500 group-hover:w-12 group-hover:bg-[#1f5f9f]" />
                </div>
                <p className="mt-20 max-w-[24ch] text-lg font-medium leading-[1.35] tracking-[-.035em] text-black/76 md:mt-28 md:text-xl">
                  {localized(item, lang)}
                </p>
              </div>
            ))}
          </div>

          {content.metrics.length > 0 && (
            <div className="mt-16 bg-[#0b0d0d] text-white md:mt-24">
              <div className={`grid ${content.metrics.length >= 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"}`}>
                {content.metrics.map((item, index) => (
                  <div key={index} className="min-h-[200px] border-b border-white/10 p-6 md:min-h-[235px] md:border-b-0 md:border-r md:p-8 last:border-r-0">
                    <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#6ea7d5]">0{index + 1}</span>
                    <p className="sellf-display mt-10 text-[3.15rem] tracking-[-.065em] md:text-[4.25rem]">{localized(item.value, lang)}</p>
                    <p className="mt-4 max-w-[26ch] text-[11px] leading-5 text-white/48">{localized(item.label, lang)}</p>
                    {item.note && <p className="mt-2 max-w-[28ch] text-[9px] leading-4 text-white/28">{localized(item.note, lang)}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="mt-5 max-w-3xl text-[9px] leading-5 text-black/34">{localized(content.metricNote, lang)}</p>
        </div>
      </section>

      <section className="bg-[#fbfaf7]">
        <div className="sellf-container py-20 md:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.28fr_.72fr] lg:gap-20">
            <div className="flex items-start gap-4">
              <span className="mt-[6px] h-2 w-2 rounded-full bg-[#1f5f9f]" />
              <p className="sellf-kicker text-black/42">{t.audience}</p>
            </div>
            <div className="border-t border-black/10">
              {content.audience.map((item, index) => (
                <div key={index} className="group grid gap-5 border-b border-black/10 py-8 md:grid-cols-[80px_1fr_32px] md:items-start md:py-10">
                  <span className="text-[10px] font-semibold tracking-[.16em] text-black/25">0{index + 1}</span>
                  <p className="max-w-[42rem] text-lg font-medium leading-[1.45] tracking-[-.035em] text-black/72 md:text-xl">{localized(item, lang)}</p>
                  <span className="hidden text-xl font-light text-black/16 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1f5f9f] md:block">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/[.08] bg-[#f1f0ec]">
        <div className="sellf-container py-20 md:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.28fr_.72fr] lg:gap-20">
            <div>
              <div className="flex items-start gap-4">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-[#1f5f9f]" />
                <p className="sellf-kicker text-black/42">{t.approach}</p>
              </div>
            </div>
            <div>
              <p className="max-w-[34ch] text-[1.75rem] font-medium leading-[1.22] tracking-[-.045em] text-black md:text-[2.3rem]">{localized(content.approachIntro, lang)}</p>
              <div className="mt-14 border-t border-black/12 md:mt-20">
                {content.approachSteps.map((item, index) => (
                  <div key={index} className="group grid gap-5 border-b border-black/12 py-8 md:grid-cols-[82px_.7fr_1.3fr] md:gap-8 md:py-10">
                    <span className="text-[10px] font-semibold tracking-[.17em] text-[#1f5f9f]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="text-base font-semibold leading-6 tracking-[-.03em] text-black md:text-lg">{localized(item.title, lang)}</h3>
                    <p className="max-w-[40rem] text-sm leading-7 text-black/48 transition-colors duration-300 group-hover:text-black/66">{localized(item.body, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {(content.proofBrands.length > 0 || content.proofNotes.length > 0) && (
        <section className="bg-[#0b0d0d] text-white">
          <div className="sellf-container py-20 md:py-28 lg:py-32">
            <div className="mb-14 flex items-end justify-between gap-8 border-b border-white/10 pb-5 md:mb-20">
              <div className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-[#6ea7d5]" />
                <p className="sellf-kicker text-white/38">{t.proof}</p>
              </div>
              <span className="hidden text-[9px] font-semibold uppercase tracking-[.16em] text-white/24 md:block">Selected experience</span>
            </div>

            {content.proofBrands.length > 0 && (
              <div className="grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {content.proofBrands.map((brand) => (
                  <div key={brand} className="group flex min-h-[138px] items-center justify-center border-b border-r border-white/10 px-6 py-8 transition-colors duration-500 hover:bg-white/[.035] md:min-h-[162px]">
                    <SolutionProofMark brand={brand} />
                  </div>
                ))}
              </div>
            )}

            {content.proofNotes.length > 0 && (
              <div className="mt-14 grid gap-0 border-t border-white/10 md:mt-20 md:grid-cols-3">
                {content.proofNotes.map((note, index) => (
                  <div key={index} className="border-b border-white/10 py-7 md:border-b-0 md:border-r md:px-7 first:md:pl-0 last:md:border-r-0 last:md:pr-0">
                    <span className="mb-6 block text-[9px] font-semibold tracking-[.16em] text-[#6ea7d5]">0{index + 1}</span>
                    <p className="max-w-[33rem] text-xs leading-6 text-white/44">{localized(note, lang)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="bg-[#fbfaf7]">
        <div className="sellf-container py-20 md:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.28fr_.72fr] lg:gap-20">
            <div className="flex items-start gap-4">
              <span className="mt-[6px] h-2 w-2 rounded-full bg-[#1f5f9f]" />
              <p className="sellf-kicker text-black/42">{t.operations}</p>
            </div>
            <div className="space-y-16">
              {operationGroups.map((group) => (
                <div key={group.key}>
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-black/35">{group.label}</p>
                    <span className="text-[9px] font-semibold tracking-[.14em] text-black/22">{String(group.items.length).padStart(2, "0")}</span>
                  </div>
                  <div className="grid border-t border-black/12 md:grid-cols-2">
                    {group.items.map((operation, index) => (
                      <div key={`${group.key}-${operation}`} className="group flex min-h-[82px] items-center gap-5 border-b border-black/12 py-5 md:min-h-[94px] md:pr-6 odd:md:border-r even:md:pl-6">
                        <span className="w-7 shrink-0 text-[9px] font-semibold tracking-[.14em] text-black/22">{String(index + 1).padStart(2, "0")}</span>
                        <span className="text-sm font-medium leading-6 tracking-[-.025em] text-black/66 transition-colors duration-300 group-hover:text-black">{operation}</span>
                        <span className="ml-auto text-base text-black/14 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1f5f9f]">↗</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/[.08] bg-[#f1f0ec]">
        <div className="sellf-container py-20 md:py-28 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.28fr_.72fr] lg:gap-20">
            <div className="flex items-start gap-4">
              <span className="mt-[6px] h-2 w-2 rounded-full bg-[#1f5f9f]" />
              <p className="sellf-kicker text-black/42">{t.faq}</p>
            </div>
            <div className="border-t border-black/12">
              {content.faq.map((item, index) => (
                <details key={index} className="group border-b border-black/12">
                  <summary className="grid cursor-pointer list-none grid-cols-[36px_1fr_28px] gap-4 py-7 text-left [&::-webkit-details-marker]:hidden md:grid-cols-[62px_1fr_30px] md:py-9">
                    <span className="pt-1 text-[9px] font-semibold tracking-[.14em] text-[#1f5f9f]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="max-w-[45rem] text-base font-semibold leading-7 tracking-[-.03em] text-black md:text-lg">{localized(item.question, lang)}</span>
                    <span aria-hidden="true" className="text-right text-xl font-light text-black/28 transition-transform duration-300 group-open:rotate-45 group-open:text-[#1f5f9f]">+</span>
                  </summary>
                  <p className="max-w-[46rem] pb-9 pl-[52px] pr-8 text-sm leading-7 text-black/50 md:pl-[78px]">{localized(item.answer, lang)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[#fbfaf7]">
          <div className="sellf-container py-20 md:py-28 lg:py-32">
            <div className="flex items-end justify-between gap-8 border-b border-black/12 pb-5">
              <div className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-[#1f5f9f]" />
                <p className="sellf-kicker text-black/42">{t.related}</p>
              </div>
              <Link href={`/${lang}/services`} className="text-[9px] font-semibold uppercase tracking-[.15em] text-black/34 transition-colors hover:text-black">{t.back} ↗</Link>
            </div>

            <div className="grid border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.slug} href={`/${lang}/services/${item.slug}`} className="group flex min-h-[260px] flex-col border-b border-r border-black/10 p-6 transition-colors duration-400 hover:bg-[#f1f0ec] md:min-h-[310px] md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold tracking-[.16em] text-black/24">{String(item.index).padStart(2, "0")}</span>
                    <span className="text-lg font-light text-black/18 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1f5f9f]">↗</span>
                  </div>
                  <div className="mt-auto pt-16">
                    <h3 className="max-w-[14ch] text-xl font-semibold leading-[1.06] tracking-[-.045em] text-black md:text-2xl">{item.title[lang]}</h3>
                    <p className="mt-5 line-clamp-3 max-w-[28ch] text-[10px] leading-5 text-black/40">{item.description[lang]}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#1f5f9f] text-white">
        <div className="sellf-container py-20 md:py-28 lg:py-32">
          <div className="border-b border-white/20 pb-5">
            <p className="sellf-kicker text-white/52">{solution.title[lang]}</p>
          </div>
          <div className="grid gap-12 pt-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end lg:gap-20 lg:pt-14">
            <h2 className="sellf-display max-w-[12ch] text-[3rem] leading-[.93] tracking-[-.06em] md:text-[4.7rem] lg:text-[5.5rem]">{localized(content.cta.title, lang)}</h2>
            <div>
              <p className="mb-8 max-w-lg text-sm leading-7 text-white/70">{localized(content.cta.description, lang)}</p>
              <SolutionCta label={localized(content.cta.label, lang)} />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
