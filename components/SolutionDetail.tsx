import Link from "next/link";
import SolutionCta from "@/components/SolutionCta";
import SolutionHubIcon from "@/components/SolutionHubIcon";
import SolutionProofLogo from "@/components/SolutionProofLogo";
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

function localized<T extends { tr: string; en: string }>(value: T, lang: SupportedSolutionLang) {
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
    <article className="solution-a min-h-screen overflow-hidden bg-white text-[#0b0d0d]">
      <style dangerouslySetInnerHTML={{ __html: `
        .solution-a .data-grid {
          background-image: linear-gradient(rgba(91,138,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(91,138,255,.08) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(to bottom, black, transparent 92%);
        }
        .solution-a .signal-line { background: linear-gradient(90deg, transparent, #5b8aff 28%, #153f93 72%, transparent); }
        .solution-a .metric-card:hover .metric-orbit { transform: rotate(22deg) scale(1.08); opacity: .8; }
        .solution-a .approach-row:hover .approach-index { background:#5b8aff; color:white; border-color:#5b8aff; }
        .solution-a .operation-row:hover .operation-arrow { transform: translate(2px,-2px); background:#153f93; color:#fff; border-color:#153f93; }
        .solution-a .proof-logo img { filter: grayscale(1) contrast(.75); opacity:.72; transition:filter .35s ease, opacity .35s ease, transform .35s ease; }
        .solution-a .proof-logo:hover img { filter: grayscale(0); opacity:1; transform:scale(1.04); }
      `}} />

      <header className="relative isolate overflow-hidden bg-[#090b12] text-white">
        <div className="data-grid absolute inset-0 opacity-70" />
        <div className="absolute -right-24 top-24 h-[420px] w-[420px] rounded-full bg-[#153f93]/35 blur-[130px]" />
        <div className="absolute left-[46%] top-[30%] h-[220px] w-[220px] rounded-full bg-[#5b8aff]/15 blur-[90px]" />
        <div className="sellf-container relative pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-28">
          <nav aria-label="Breadcrumb" className="mb-12 flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[.13em] text-white/36 md:mb-16">
            <Link href={`/${lang}/services`} className="transition-colors hover:text-white">{t.services}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/72">{solution.title[lang]}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)] lg:items-end lg:gap-16">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-[74px] w-[74px] items-center justify-center rounded-[22px] border border-white/10 bg-white/[.045] shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_18px_70px_rgba(0,0,0,.22)] backdrop-blur-sm">
                  <SolutionHubIcon slug={solution.slug} size={48} />
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#7ea2ff]">{String(solution.index).padStart(2, "0")} / 14</p>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[.16em] text-white/38">{solution.title[lang]}</p>
                </div>
              </div>

              <h1 className="sellf-display max-w-[11.5ch] text-[clamp(3.4rem,7.1vw,7rem)] leading-[.88] tracking-[-.065em] text-white">
                {solution.heroTitle[lang]}
              </h1>
            </div>

            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[.045] p-7 shadow-[0_30px_100px_rgba(0,0,0,.28)] backdrop-blur-md md:p-8">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[80px] border-b border-l border-[#5b8aff]/20 bg-[#153f93]/10" />
              <p className="relative max-w-[42rem] text-sm leading-7 text-white/58 md:text-[15px]">{solution.description[lang]}</p>
              <div className="signal-line my-7 h-px w-full opacity-75" />
              <p className="relative max-w-[36rem] text-xl font-medium leading-[1.25] tracking-[-.035em] text-white md:text-2xl">{localized(content.statement, lang)}</p>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#5b8aff] shadow-[0_0_18px_rgba(91,138,255,.95)]" />
                <span className="text-[9px] font-semibold uppercase tracking-[.2em] text-white/30">Sellf Media</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-white">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#153f93]/10 to-transparent" />
        <div className="sellf-container py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[.34fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="sellf-kicker text-black/36">01 — {t.overview}</p>
            </div>
            <div className="max-w-5xl space-y-8">
              {content.overview.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "max-w-[31ch] text-[clamp(1.9rem,3.3vw,3.4rem)] font-medium leading-[1.08] tracking-[-.052em] text-black" : "max-w-3xl text-base leading-8 text-black/52 md:text-lg md:leading-9"}>
                  {localized(paragraph, lang)}
                </p>
              ))}
              <div className="mt-8 h-px w-full bg-gradient-to-r from-[#153f93]/40 via-black/[.08] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f3f6fb]">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#5b8aff]/8 blur-3xl" />
        <div className="sellf-container relative py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[.34fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start"><p className="sellf-kicker text-black/36">02 — {t.outcomes}</p></div>
            <div>
              <div className="grid gap-4 md:grid-cols-3">
                {content.outcomeBullets.map((item, index) => (
                  <div key={index} className="group relative min-h-[210px] overflow-hidden rounded-[24px] border border-[#153f93]/10 bg-white p-7 shadow-[0_14px_44px_rgba(16,35,75,.045)] transition duration-300 hover:-translate-y-1 hover:border-[#153f93]/20 hover:shadow-[0_22px_60px_rgba(16,35,75,.09)]">
                    <div className="mb-12 flex items-center justify-between">
                      <span className="text-[9px] font-semibold tracking-[.18em] text-[#153f93]/38">0{index + 1}</span>
                      <span className="h-2 w-2 rounded-full bg-[#5b8aff]/70 transition-transform duration-300 group-hover:scale-[1.6]" />
                    </div>
                    <p className="max-w-[25ch] text-base font-semibold leading-6 tracking-[-.025em] text-black/74">{localized(item, lang)}</p>
                  </div>
                ))}
              </div>

              {content.metrics.length > 0 && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {content.metrics.map((item, index) => (
                    <div key={index} className="metric-card relative min-h-[190px] overflow-hidden rounded-[24px] bg-[#0b1220] p-6 text-white">
                      <div className="metric-orbit absolute -right-9 -top-9 h-28 w-28 rounded-full border border-[#5b8aff]/24 transition duration-500"><div className="absolute inset-4 rounded-full border border-[#5b8aff]/14" /></div>
                      <p className="sellf-display relative text-[2.65rem] leading-none tracking-[-.06em] text-white md:text-5xl">{localized(item.value, lang)}</p>
                      <p className="relative mt-5 max-w-[22ch] text-[11px] leading-5 text-white/52">{localized(item.label, lang)}</p>
                      {item.note && <p className="relative mt-2 text-[9px] leading-4 text-white/28">{localized(item.note, lang)}</p>}
                      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#5b8aff] via-[#153f93] to-transparent opacity-75" />
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-5 max-w-3xl text-[10px] leading-5 text-black/34">{localized(content.metricNote, lang)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="sellf-container py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[.34fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start"><p className="sellf-kicker text-black/36">03 — {t.audience}</p></div>
            <div className="grid gap-4 md:grid-cols-3">
              {content.audience.map((item, index) => (
                <div key={index} className="min-h-[220px] rounded-[24px] border border-black/[.07] bg-[#fafafa] p-7 transition duration-300 hover:border-[#153f93]/18 hover:bg-white hover:shadow-[0_20px_55px_rgba(15,31,64,.06)]">
                  <span className="mb-12 flex h-9 w-9 items-center justify-center rounded-full border border-[#153f93]/12 bg-white text-[9px] font-semibold text-[#153f93]">0{index + 1}</span>
                  <p className="text-base leading-7 tracking-[-.025em] text-black/67 md:text-lg">{localized(item, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0b1220] text-white">
        <div className="data-grid absolute inset-0 opacity-30" />
        <div className="sellf-container relative py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[.34fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start"><p className="sellf-kicker text-white/35">04 — {t.approach}</p></div>
            <div>
              <p className="mb-10 max-w-3xl text-2xl font-medium leading-[1.25] tracking-[-.045em] text-white md:text-4xl">{localized(content.approachIntro, lang)}</p>
              <div className="relative">
                <div className="absolute bottom-0 left-[22px] top-0 w-px bg-gradient-to-b from-[#5b8aff] via-white/10 to-transparent md:left-[26px]" />
                {content.approachSteps.map((item, index) => (
                  <div key={index} className="approach-row relative grid gap-5 border-b border-white/[.08] py-7 pl-[70px] md:grid-cols-[.7fr_1.3fr] md:gap-10 md:pl-[86px]">
                    <span className="approach-index absolute left-0 top-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0b1220] text-[9px] font-semibold tracking-[.1em] text-white/45 transition duration-300 md:h-[52px] md:w-[52px]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="text-base font-semibold tracking-[-.03em] text-white md:text-lg">{localized(item.title, lang)}</h3>
                    <p className="max-w-2xl text-sm leading-7 text-white/48">{localized(item.body, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {(content.proofBrands.length > 0 || content.proofNotes.length > 0) && (
        <section className="bg-[#eef2f8]">
          <div className="sellf-container py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[.34fr_1fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start"><p className="sellf-kicker text-black/36">05 — {t.proof}</p></div>
              <div>
                {content.proofBrands.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {content.proofBrands.map((brand) => (
                      <div key={brand} className="proof-logo flex min-h-[132px] items-center justify-center rounded-[22px] border border-black/[.06] bg-white px-6 shadow-[0_12px_34px_rgba(15,31,64,.035)]">
                        <SolutionProofLogo brand={brand} className="text-black/70" />
                      </div>
                    ))}
                  </div>
                )}
                {content.proofNotes.length > 0 && (
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {content.proofNotes.map((note, index) => (
                      <div key={index} className="rounded-[20px] border border-[#153f93]/10 bg-white p-6">
                        <span className="mb-4 block text-[9px] font-semibold tracking-[.16em] text-[#153f93]/42">PROOF / {String(index + 1).padStart(2, "0")}</span>
                        <p className="text-sm leading-7 text-black/52">{localized(note, lang)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="sellf-container py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[.34fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start"><p className="sellf-kicker text-black/36">06 — {t.operations}</p></div>
            <div className="space-y-10">
              {operationGroups.map((group) => (
                <div key={group.key}>
                  <div className="mb-4 flex items-center gap-4"><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#153f93]/60">{group.label}</p><span className="h-px flex-1 bg-black/[.06]" /></div>
                  <div className="overflow-hidden rounded-[20px] border border-black/[.07]">
                    {group.items.map((operation, index) => (
                      <div key={`${group.key}-${operation}`} className="operation-row group grid grid-cols-[44px_1fr_38px] items-center gap-3 border-b border-black/[.06] bg-white px-5 py-4 last:border-b-0 transition-colors hover:bg-[#f4f7fb] md:grid-cols-[58px_1fr_42px] md:px-6 md:py-5">
                        <span className="text-[9px] font-medium tracking-[.13em] text-black/24">{String(index + 1).padStart(2, "0")}</span>
                        <span className="text-sm font-semibold tracking-[-.025em] text-black/68 md:text-[15px]">{operation}</span>
                        <span className="operation-arrow flex h-8 w-8 items-center justify-center rounded-full border border-black/[.08] text-[11px] text-black/26 transition duration-300">↗</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f3]">
        <div className="sellf-container py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[.34fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start"><p className="sellf-kicker text-black/36">07 — {t.faq}</p></div>
            <div className="overflow-hidden rounded-[24px] border border-black/[.07] bg-white px-6 md:px-8">
              {content.faq.map((item, index) => (
                <details key={index} className="group border-b border-black/[.07] last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-7 text-left [&::-webkit-details-marker]:hidden">
                    <span className="max-w-3xl text-base font-semibold leading-6 tracking-[-.028em] text-black md:text-lg">{localized(item.question, lang)}</span>
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[.08] text-lg font-light text-[#153f93] transition duration-300 group-open:rotate-45 group-open:bg-[#153f93] group-open:text-white">+</span>
                  </summary>
                  <p className="max-w-3xl pb-7 pr-10 text-sm leading-7 text-black/50">{localized(item.answer, lang)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white">
          <div className="sellf-container py-20 md:py-28">
            <div className="flex items-end justify-between gap-8 border-b border-black/[.08] pb-7">
              <p className="sellf-kicker text-black/36">08 — {t.related}</p>
              <Link href={`/${lang}/services`} className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#153f93] transition-opacity hover:opacity-65">{t.back} ↗</Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.slug} href={`/${lang}/services/${item.slug}`} className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-[24px] border border-black/[.065] bg-[#f8f9fb] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#153f93]/18 hover:bg-white hover:shadow-[0_22px_60px_rgba(15,31,64,.07)]">
                  <div className="flex items-start justify-between gap-4"><span className="text-[9px] font-semibold tracking-[.16em] text-black/24">{String(item.index).padStart(2, "0")}</span><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#153f93] text-[11px] text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span></div>
                  <div className="mt-auto pt-12"><h3 className="max-w-[16ch] text-xl font-semibold leading-[1.05] tracking-[-.045em]">{item.title[lang]}</h3><p className="mt-3 line-clamp-3 text-[10px] leading-5 text-black/40">{item.description[lang]}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-[#08101d] text-white">
        <div className="data-grid absolute inset-0 opacity-25" />
        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#153f93]/35 blur-[120px]" />
        <div className="sellf-container relative py-20 md:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div><p className="sellf-kicker mb-6 text-[#7ea2ff]">{solution.title[lang]}</p><h2 className="sellf-display max-w-[13ch] text-[clamp(2.8rem,5vw,5.5rem)] leading-[.94] tracking-[-.06em]">{localized(content.cta.title, lang)}</h2></div>
            <div className="rounded-[24px] border border-white/10 bg-white/[.04] p-7 backdrop-blur-sm"><p className="mb-8 max-w-lg text-sm leading-7 text-white/50">{localized(content.cta.description, lang)}</p><SolutionCta label={localized(content.cta.label, lang)} /></div>
          </div>
        </div>
      </section>
    </article>
  );
}
