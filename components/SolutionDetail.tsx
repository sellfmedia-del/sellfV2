import Link from "next/link";
import SolutionCta from "@/components/SolutionCta";
import SolutionIcon from "@/components/SolutionIcon";
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
    <article className="min-h-screen bg-white text-black">
      <header className="bg-[#0b0d0d] text-white">
        <div className="sellf-container pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-28">
          <nav
            aria-label="Breadcrumb"
            className="mb-12 flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[.11em] text-white/40 md:mb-16"
          >
            <Link href={`/${lang}/services`} className="transition-colors hover:text-white">
              {t.services}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/70">{solution.title[lang]}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,.85fr)] lg:items-end lg:gap-20">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/80">
                  <SolutionIcon slug={solution.slug} size={25} />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[.18em] text-white/35">
                  {String(solution.index).padStart(2, "0")} / 14
                </span>
              </div>

              <p className="sellf-kicker mb-5 text-white/38">{solution.title[lang]}</p>
              <h1 className="sellf-display max-w-[12ch] text-[3.2rem] leading-[.92] tracking-[-.06em] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                {solution.heroTitle[lang]}
              </h1>
            </div>

            <div className="border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="max-w-[42rem] text-sm leading-7 text-white/60 md:text-base">
                {solution.description[lang]}
              </p>
              <p className="mt-8 max-w-[38rem] text-lg font-medium leading-snug tracking-[-.03em] text-white/92 md:text-xl">
                {localized(content.statement, lang)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="sellf-container py-16 md:py-24">
        <div className="grid gap-10 border-b border-black/[.08] pb-16 md:pb-24 lg:grid-cols-[.38fr_1fr] lg:gap-20">
          <div><p className="sellf-kicker text-black/38">{t.overview}</p></div>
          <div className="max-w-4xl space-y-6">
            {content.overview.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0
                  ? "text-2xl font-medium leading-[1.25] tracking-[-.04em] text-black md:text-3xl"
                  : "max-w-3xl text-base leading-8 text-black/55"}
              >
                {localized(paragraph, lang)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="sellf-container pb-16 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-[.38fr_1fr] lg:gap-20">
          <div><p className="sellf-kicker text-black/38">{t.outcomes}</p></div>
          <div>
            <div className="grid gap-px overflow-hidden rounded-[18px] border border-black/[.07] bg-black/[.07] md:grid-cols-3">
              {content.outcomeBullets.map((item, index) => (
                <div key={index} className="bg-[#f7f7f4] p-6 md:min-h-[180px] md:p-7">
                  <span className="mb-8 block text-[9px] font-medium tracking-[.18em] text-black/25">0{index + 1}</span>
                  <p className="text-sm font-medium leading-6 tracking-[-.02em] text-black/72">{localized(item, lang)}</p>
                </div>
              ))}
            </div>

            {content.metrics.length > 0 && (
              <div className="mt-10 grid gap-8 border-y border-black/[.08] py-9 sm:grid-cols-2 xl:grid-cols-4">
                {content.metrics.map((item, index) => (
                  <div key={index}>
                    <p className="sellf-display text-3xl tracking-[-.05em] md:text-4xl">{localized(item.value, lang)}</p>
                    <p className="mt-2 max-w-[22ch] text-[11px] leading-5 text-black/45">{localized(item.label, lang)}</p>
                    {item.note && <p className="mt-2 text-[9px] leading-4 text-black/30">{localized(item.note, lang)}</p>}
                  </div>
                ))}
              </div>
            )}

            <p className="mt-5 max-w-3xl text-[10px] leading-5 text-black/35">{localized(content.metricNote, lang)}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f4]">
        <div className="sellf-container py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[.38fr_1fr] lg:gap-20">
            <div><p className="sellf-kicker text-black/38">{t.audience}</p></div>
            <div className="border-t border-black/[.08]">
              {content.audience.map((item, index) => (
                <div key={index} className="grid grid-cols-[46px_1fr] gap-3 border-b border-black/[.08] py-6 md:grid-cols-[76px_1fr]">
                  <span className="pt-1 text-[9px] font-medium tracking-[.16em] text-black/25">0{index + 1}</span>
                  <p className="max-w-3xl text-base leading-7 tracking-[-.02em] text-black/70 md:text-lg">{localized(item, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sellf-container py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[.38fr_1fr] lg:gap-20">
          <div><p className="sellf-kicker text-black/38">{t.approach}</p></div>
          <div>
            <p className="mb-10 max-w-3xl text-xl font-medium leading-[1.45] tracking-[-.035em] text-black md:text-2xl">{localized(content.approachIntro, lang)}</p>
            <div className="border-t border-black/[.08]">
              {content.approachSteps.map((item, index) => (
                <div key={index} className="grid gap-4 border-b border-black/[.08] py-7 md:grid-cols-[64px_.7fr_1.3fr] md:gap-8">
                  <span className="text-[9px] font-medium tracking-[.16em] text-black/25">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="text-sm font-semibold tracking-[-.025em] text-black md:text-base">{localized(item.title, lang)}</h3>
                  <p className="max-w-2xl text-sm leading-7 text-black/52">{localized(item.body, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {(content.proofBrands.length > 0 || content.proofNotes.length > 0) && (
        <section className="bg-[#0b0d0d] text-white">
          <div className="sellf-container py-16 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[.38fr_1fr] lg:gap-20">
              <div><p className="sellf-kicker text-white/38">{t.proof}</p></div>
              <div>
                {content.proofBrands.length > 0 && (
                  <div className="grid grid-cols-2 border-l border-t border-white/12 sm:grid-cols-3">
                    {content.proofBrands.map((brand) => (
                      <div key={brand} className="flex min-h-[96px] items-center border-b border-r border-white/12 p-5 text-sm font-semibold tracking-[-.02em] text-white/72 md:min-h-[112px] md:p-6">{brand}</div>
                    ))}
                  </div>
                )}
                {content.proofNotes.length > 0 && (
                  <div className="mt-8 space-y-3">
                    {content.proofNotes.map((note, index) => (
                      <p key={index} className="max-w-3xl text-xs leading-6 text-white/42">{localized(note, lang)}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="sellf-container py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[.38fr_1fr] lg:gap-20">
          <div><p className="sellf-kicker text-black/38">{t.operations}</p></div>
          <div className="space-y-10">
            {operationGroups.map((group) => (
              <div key={group.key}>
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.16em] text-black/32">{group.label}</p>
                <div className="border-t border-black/[.08]">
                  {group.items.map((operation, index) => (
                    <div key={`${group.key}-${operation}`} className="grid grid-cols-[42px_1fr] gap-3 border-b border-black/[.08] py-4 md:grid-cols-[64px_1fr]">
                      <span className="pt-[2px] text-[9px] text-black/22">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-medium tracking-[-.02em] text-black/68">{operation}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f4]">
        <div className="sellf-container py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[.38fr_1fr] lg:gap-20">
            <div><p className="sellf-kicker text-black/38">{t.faq}</p></div>
            <div className="border-t border-black/[.08]">
              {content.faq.map((item, index) => (
                <details key={index} className="group border-b border-black/[.08]">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <span className="max-w-3xl text-base font-semibold leading-6 tracking-[-.025em] text-black md:text-lg">{localized(item.question, lang)}</span>
                    <span aria-hidden="true" className="mt-0.5 text-xl font-light text-black/30 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pb-7 pr-10 text-sm leading-7 text-black/52">{localized(item.answer, lang)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="sellf-container py-16 md:py-24">
          <div className="flex items-end justify-between gap-8 border-b border-black/[.08] pb-7">
            <p className="sellf-kicker text-black/38">{t.related}</p>
            <Link href={`/${lang}/services`} className="text-[10px] font-semibold uppercase tracking-[.12em] text-black/35 transition-colors hover:text-black">{t.back} ↗</Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link key={item.slug} href={`/${lang}/services/${item.slug}`} className="group flex min-h-[210px] flex-col rounded-[18px] border border-black/[.06] bg-[#f7f7f4] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-black/[.11] hover:bg-white hover:shadow-[0_16px_38px_rgba(11,13,13,.06)]">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[9px] font-medium tracking-[.16em] text-black/24">{String(item.index).padStart(2, "0")}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/[.08] text-[11px] text-black/30 transition-all group-hover:bg-black group-hover:text-white">↗</span>
                </div>
                <div className="mt-auto pt-10">
                  <h3 className="max-w-[16ch] text-lg font-semibold leading-[1.08] tracking-[-.04em]">{item.title[lang]}</h3>
                  <p className="mt-3 line-clamp-3 text-[10px] leading-5 text-black/42">{item.description[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-[#0b0d0d] text-white">
        <div className="sellf-container py-16 md:py-24">
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div>
              <p className="sellf-kicker mb-5 text-white/35">{solution.title[lang]}</p>
              <h2 className="sellf-display max-w-[14ch] text-4xl leading-[.98] tracking-[-.055em] md:text-6xl">{localized(content.cta.title, lang)}</h2>
            </div>
            <div>
              <p className="mb-7 max-w-lg text-sm leading-7 text-white/50">{localized(content.cta.description, lang)}</p>
              <SolutionCta label={localized(content.cta.label, lang)} />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
