import Link from "next/link";
import SolutionCta from "@/components/SolutionCta";
import SolutionHubIcon from "@/components/SolutionHubIcon";
import { getSolutionIndexItem, type SolutionIndexItem } from "@/data/SolutionIndex";
import type { SolutionContent, SupportedSolutionLang } from "@/data/SolutionContent";

type Props = {
  lang: SupportedSolutionLang;
  solution: SolutionIndexItem;
  content: SolutionContent;
};

const labels = {
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

const proofLogos: Record<string, string | null> = {
  Fizyohol: "https://cdn.sellfmedia.workers.dev/essentials/logophysio.png",
  Canias: null,
  NutralEN: "https://cdn.sellfmedia.workers.dev/essentials/logonutralen.png",
  Shevec: "https://cdn.sellfmedia.workers.dev/essentials/logoshevec.png",
  "S'hevec": "https://cdn.sellfmedia.workers.dev/essentials/logoshevec.png",
  "Bad Bear": null,
  Evepack: "https://cdn.sellfmedia.workers.dev/essentials/logoevepack.png",
  Sfera: "https://cdn.sellfmedia.workers.dev/essentials/logosfera.png",
  "Sfera.ai": "https://cdn.sellfmedia.workers.dev/essentials/logosfera.png",
};

// Solution-specific visuals are painted by the existing route-level CSS map.
// Keep the fallback <img> nodes network-free so they do not trigger three hidden
// CDN downloads underneath those CSS backgrounds.
const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const visualAssets = {
  primary: transparentPixel,
  secondary: transparentPixel,
  tertiary: transparentPixel,
};

function localized<T extends { tr: string; en: string }>(value: T, lang: SupportedSolutionLang) {
  return value[lang];
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function SolutionDetailPerformancePreview({ lang, solution, content }: Props) {
  const t = labels[lang];
  const related = content.relatedSlugs
    .map((slug) => getSolutionIndexItem(slug))
    .filter((item): item is SolutionIndexItem => Boolean(item));

  const operationGroups = [
    { key: "A", label: t.coreOps, items: content.operations.A },
    { key: "B", label: t.extendedOps, items: content.operations.B },
    { key: "C", label: t.embeddedOps, items: content.operations.C },
  ].filter((group) => group.items.length > 0);

  return (
    <article className="overflow-hidden bg-[#f1f0ec] text-[#0b0d0d]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes solutionFloatD { 0%,100% { transform: translate3d(0,0,0) rotate(-3deg); } 50% { transform: translate3d(0,-12px,0) rotate(-1deg); } }
        @keyframes solutionDriftD { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(14px,-8px,0); } }
        .solution-d-float { animation: solutionFloatD 9s ease-in-out infinite; }
        .solution-d-drift { animation: solutionDriftD 11s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .solution-d-float,.solution-d-drift { animation: none; } }
      `}} />

      <header className="relative overflow-hidden bg-[#0b0d0d] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-[8vw] top-[7rem] h-[26rem] w-[26rem] rounded-full bg-[#1f5f9f]/18 blur-[110px] md:h-[40rem] md:w-[40rem]" />
          <div className="absolute bottom-[-12rem] left-[18%] h-[22rem] w-[22rem] rounded-full bg-[#6ea7d5]/10 blur-[120px]" />
        </div>

        <div className="sellf-container relative pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-28 lg:pt-40">
          <nav aria-label="Breadcrumb" className="mb-16 flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[.12em] text-white/38 md:mb-24">
            <Link href={`/${lang}/services`} className="transition-colors hover:text-white">{t.services}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/72">{solution.title[lang]}</span>
          </nav>

          <div className="grid gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-14 xl:gap-20">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <SolutionHubIcon slug={solution.slug} size={58} />
                <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/32">{String(solution.index).padStart(2, "0")} / 14</span>
              </div>
              <p className="sellf-kicker mb-6 text-white/36">{solution.title[lang]}</p>
              <h1 className="sellf-display max-w-[11ch] text-[3.8rem] leading-[.9] tracking-[-.065em] sm:text-7xl md:text-[5.6rem] lg:text-[6.5rem] xl:text-[7.15rem]">
                {solution.heroTitle[lang]}
              </h1>
              <p className="mt-9 max-w-2xl text-base leading-8 text-white/56 md:text-lg md:leading-9">
                {solution.description[lang]}
              </p>
            </div>

            <div className="relative min-h-[420px] md:min-h-[520px] lg:min-h-[590px]">
              <div className="solution-d-drift absolute right-0 top-0 h-[76%] w-[88%] overflow-hidden rounded-[30px] bg-[#171a1a] shadow-[0_40px_100px_rgba(0,0,0,.28)]">
                <img src={visualAssets.primary} alt="" className="h-full w-full object-cover object-left-top opacity-90 saturate-[.82]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0d0d]/55 via-transparent to-[#1f5f9f]/12" />
              </div>
              <div className="solution-d-float absolute bottom-0 left-0 w-[68%] rounded-[28px] bg-[#f1f0ec] p-6 text-[#0b0d0d] shadow-[0_28px_70px_rgba(0,0,0,.22)] md:p-8">
                <p className="max-w-[24ch] text-xl font-semibold leading-[1.18] tracking-[-.045em] md:text-2xl">{localized(content.statement, lang)}</p>
                <div className="mt-8 h-1.5 w-16 rounded-full bg-[#1f5f9f]" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="sellf-container py-20 md:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
          <div>
            <p className="sellf-kicker text-black/36">{t.overview}</p>
          </div>
          <div className="max-w-5xl">
            {content.overview.map((paragraph, index) => (
              <p key={index} className={index === 0
                ? "max-w-[31ch] text-3xl font-medium leading-[1.2] tracking-[-.045em] md:text-5xl md:leading-[1.12]"
                : "mt-9 max-w-3xl text-base leading-8 text-black/54 md:mt-12 md:text-lg md:leading-9"}
              >
                {localized(paragraph, lang)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-32 lg:py-40">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div>
              <p className="sellf-kicker text-black/36">{t.outcomes}</p>
            </div>
            <div>
              <div className="grid gap-12 md:grid-cols-3 md:gap-8 xl:gap-14">
                {content.outcomeBullets.map((item, index) => (
                  <div key={index} className="min-h-[220px]">
                    <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf1ff] text-[#133b66]">
                      <span className="text-sm font-semibold">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="max-w-[25ch] text-lg font-semibold leading-7 tracking-[-.035em] text-black/78 md:text-xl">{localized(item, lang)}</p>
                  </div>
                ))}
              </div>

              {content.metrics.length > 0 && (
                <div className="mt-16 grid gap-y-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8 md:mt-24">
                  {content.metrics.map((item, index) => (
                    <div key={index} className="pr-5">
                      <p className="sellf-display text-5xl tracking-[-.06em] md:text-6xl">{localized(item.value, lang)}</p>
                      <p className="mt-4 max-w-[20ch] text-xs font-medium leading-5 text-black/45">{localized(item.label, lang)}</p>
                      {item.note && <p className="mt-2 text-[10px] leading-4 text-black/28">{localized(item.note, lang)}</p>}
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-10 max-w-3xl text-[10px] leading-5 text-black/30">{localized(content.metricNote, lang)}</p>
            </div>
          </div>

          <div className="mt-20 grid gap-4 md:mt-32 md:grid-cols-[1.1fr_.9fr] md:gap-5">
            <figure className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-[#111] md:min-h-[620px]">
              <img src={visualAssets.secondary} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </figure>
            <figure className="relative min-h-[420px] overflow-hidden rounded-[28px] bg-[#111] md:mt-20 md:min-h-[540px]">
              <img src={visualAssets.tertiary} alt="" className="h-full w-full object-cover object-left-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f5f9f]/18 via-transparent to-transparent" />
            </figure>
          </div>
        </div>
      </section>

      <section className="sellf-container py-20 md:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
          <div>
            <p className="sellf-kicker text-black/36">{t.audience}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {content.audience.map((item, index) => (
              <div key={index} className="flex min-h-[310px] flex-col rounded-[26px] bg-white p-7 shadow-[0_18px_55px_rgba(10,12,12,.045)] md:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f0ec]">
                    <SolutionHubIcon slug={solution.slug} size={36} />
                  </div>
                  <span className="text-[10px] font-semibold tracking-[.18em] text-black/24">0{index + 1}</span>
                </div>
                <p className="mt-auto pt-14 text-lg font-medium leading-8 tracking-[-.035em] text-black/70 md:text-xl">{localized(item, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0d0d] py-20 text-white md:py-32 lg:py-40">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div>
              <p className="sellf-kicker text-white/36">{t.approach}</p>
            </div>
            <div>
              <p className="max-w-4xl text-3xl font-medium leading-[1.2] tracking-[-.045em] text-white/92 md:text-5xl md:leading-[1.12]">{localized(content.approachIntro, lang)}</p>

              <div className="mt-16 grid gap-x-14 gap-y-16 md:mt-24 md:grid-cols-2 xl:grid-cols-3">
                {content.approachSteps.map((item, index) => (
                  <div key={index} className="relative min-h-[220px] pr-4">
                    <div className="mb-9 flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-[#0b0d0d]">{String(index + 1).padStart(2, "0")}</span>
                      <span className="h-[1px] flex-1 bg-white/10" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-[-.03em] text-white md:text-xl">{localized(item.title, lang)}</h3>
                    <p className="mt-4 max-w-[34ch] text-sm leading-7 text-white/46">{localized(item.body, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {(content.proofBrands.length > 0 || content.proofNotes.length > 0) && (
        <section className="bg-white py-20 md:py-32 lg:py-40">
          <div className="sellf-container">
            <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
              <div>
                <p className="sellf-kicker text-black/36">{t.proof}</p>
              </div>
              <div>
                <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {content.proofBrands.map((brand) => {
                    const logo = proofLogos[brand];
                    return (
                      <div key={brand} className="flex min-h-[128px] items-center justify-center rounded-[22px] bg-[#f7f6f2] px-8 py-7">
                        {logo ? (
                          <img src={logo} alt={`${brand} logo`} className="max-h-12 max-w-[76%] object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100" />
                        ) : (
                          <span className="text-xl font-semibold tracking-[-.045em] text-black/64">{brand}</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {content.proofNotes.length > 0 && (
                  <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-14">
                    {content.proofNotes.map((note, index) => (
                      <div key={index} className="max-w-xl">
                        <span className="mb-5 block h-2 w-2 rounded-full bg-[#1f5f9f]" />
                        <p className="text-sm leading-7 text-black/50">{localized(note, lang)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="sellf-container py-20 md:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
          <div>
            <p className="sellf-kicker text-black/36">{t.operations}</p>
          </div>
          <div className="space-y-16">
            {operationGroups.map((group) => (
              <div key={group.key}>
                <div className="mb-8 flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#133b66] text-[11px] font-semibold text-white">{group.key}</span>
                  <p className="text-xs font-semibold uppercase tracking-[.18em] text-black/38">{group.label}</p>
                </div>
                <div className="grid gap-x-10 gap-y-3 md:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((operation) => (
                    <div key={`${group.key}-${operation}`} className="group flex min-h-[72px] items-center justify-between gap-5 rounded-[18px] bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(10,12,12,.055)]">
                      <span className="text-sm font-medium leading-5 tracking-[-.02em] text-black/68">{operation}</span>
                      <span className="text-[#1f5f9f]/38 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#1f5f9f]">→</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e9eef4] py-20 md:py-32 lg:py-40">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div>
              <p className="sellf-kicker text-black/36">{t.faq}</p>
            </div>
            <div className="grid gap-4">
              {content.faq.map((item, index) => (
                <details key={index} className="group rounded-[24px] bg-white px-6 py-2 shadow-[0_12px_30px_rgba(10,12,12,.035)] md:px-8">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <span className="max-w-3xl text-lg font-semibold leading-7 tracking-[-.03em] text-black/82 md:text-xl">{localized(item.question, lang)}</span>
                    <span aria-hidden="true" className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f0ec] text-lg font-light text-black/38 transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pb-7 pr-12 text-sm leading-7 text-black/48">{localized(item.answer, lang)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-20 md:py-32 lg:py-40">
          <div className="sellf-container">
            <div className="mb-14 flex items-end justify-between gap-8">
              <p className="sellf-kicker text-black/36">{t.related}</p>
              <Link href={`/${lang}/services`} className="text-[10px] font-semibold uppercase tracking-[.12em] text-black/35 transition-colors hover:text-black">{t.back} <Arrow /></Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.slug} href={`/${lang}/services/${item.slug}`} className="group flex min-h-[310px] flex-col rounded-[26px] bg-[#f1f0ec] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(10,12,12,.07)]">
                  <div className="flex items-start justify-between gap-5">
                    <SolutionHubIcon slug={item.slug} size={54} />
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs text-[#133b66] transition-all group-hover:bg-[#133b66] group-hover:text-white"><Arrow /></span>
                  </div>
                  <div className="mt-auto pt-14">
                    <span className="mb-3 block text-[9px] font-semibold tracking-[.18em] text-black/24">{String(item.index).padStart(2, "0")}</span>
                    <h3 className="max-w-[15ch] text-xl font-semibold leading-[1.08] tracking-[-.04em]">{item.title[lang]}</h3>
                    <p className="mt-4 line-clamp-3 text-[11px] leading-5 text-black/42">{item.description[lang]}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-[#133b66] py-20 text-white md:py-32 lg:py-40">
        <div className="pointer-events-none absolute -right-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-white/10" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-10 top-1/2 h-[18rem] w-[18rem] -translate-y-1/2 rounded-full border border-white/10" aria-hidden="true" />
        <div className="sellf-container relative">
          <div className="grid items-end gap-12 lg:grid-cols-[1.18fr_.82fr] lg:gap-20">
            <div>
              <p className="sellf-kicker mb-6 text-white/40">{solution.title[lang]}</p>
              <h2 className="sellf-display max-w-[13ch] text-5xl leading-[.94] tracking-[-.06em] md:text-7xl lg:text-[5.5rem]">{localized(content.cta.title, lang)}</h2>
            </div>
            <div>
              <p className="mb-8 max-w-lg text-base leading-8 text-white/58">{localized(content.cta.description, lang)}</p>
              <SolutionCta label={localized(content.cta.label, lang)} />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
