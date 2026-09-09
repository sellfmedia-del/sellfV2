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
    <article className="solution-b min-h-screen overflow-hidden bg-[#f7f8fb] text-[#09101e]">
      <style dangerouslySetInnerHTML={{ __html: `
        .solution-b .hero-mesh {
          background-image: radial-gradient(circle at 20% 20%, rgba(91,138,255,.28), transparent 31%), radial-gradient(circle at 78% 22%, rgba(21,63,147,.23), transparent 30%), linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size:auto,auto,36px 36px,36px 36px;
        }
        .solution-b .pulse { animation: solutionPulse 4.8s ease-in-out infinite; }
        @keyframes solutionPulse { 0%,100%{transform:scale(.96);opacity:.45} 50%{transform:scale(1.08);opacity:.9} }
        .solution-b .proof-logo img { filter:grayscale(1) brightness(.25); opacity:.68; transition:.35s ease; }
        .solution-b .proof-logo:hover img { filter:grayscale(0); opacity:1; transform:scale(1.045); }
        .solution-b .operation-chip:hover .operation-dot { transform:scale(1.5); background:#5b8aff; box-shadow:0 0 18px rgba(91,138,255,.45); }
      `}} />

      <header className="relative isolate overflow-hidden bg-[#07101e] text-white">
        <div className="hero-mesh absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#6d97ff]/40 to-transparent" />
        <div className="sellf-container relative pb-16 pt-28 md:pb-24 md:pt-36 lg:pb-28">
          <nav aria-label="Breadcrumb" className="mb-12 flex items-center gap-2 text-[10px] font-medium tracking-[.13em] text-white/38 md:mb-16">
            <Link href={`/${lang}/services`} className="transition-colors hover:text-white">{t.services}</Link><span>/</span><span className="text-white/72">{solution.title[lang]}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.22fr_.78fr] lg:items-stretch lg:gap-8">
            <div className="relative flex min-h-[560px] flex-col justify-between overflow-hidden rounded-[30px] border border-white/[.08] bg-white/[.035] p-7 shadow-[0_36px_110px_rgba(0,0,0,.27)] backdrop-blur-sm md:p-10 lg:min-h-[620px]">
              <div className="absolute right-[-70px] top-[-55px] h-[300px] w-[300px] rounded-full border border-[#5b8aff]/22"><div className="pulse absolute inset-[54px] rounded-full border border-[#5b8aff]/22" /><div className="absolute inset-[108px] rounded-full bg-[#5b8aff]/20 blur-xl" /></div>
              <div className="relative flex items-center justify-between gap-6">
                <div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/[.055] ring-1 ring-white/10"><SolutionHubIcon slug={solution.slug} size={42} /></div><div><p className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#82a6ff]">{String(solution.index).padStart(2, "0")} / 14</p><p className="mt-2 text-[10px] uppercase tracking-[.15em] text-white/40">{solution.title[lang]}</p></div></div>
                <span className="hidden h-10 w-10 rounded-full border border-white/10 md:block" />
              </div>
              <div className="relative pt-16"><h1 className="sellf-display max-w-[10ch] text-[clamp(3.5rem,7vw,7.2rem)] leading-[.87] tracking-[-.068em]">{solution.heroTitle[lang]}</h1></div>
              <div className="relative mt-12 flex items-center gap-4"><span className="h-px w-20 bg-gradient-to-r from-[#6d97ff] to-transparent" /><span className="text-[9px] uppercase tracking-[.2em] text-white/30">Sellf Media</span></div>
            </div>

            <div className="grid gap-4 lg:grid-rows-[1fr_auto]">
              <div className="rounded-[30px] bg-[#e9effd] p-7 text-[#09101e] md:p-9">
                <span className="mb-10 block text-[9px] font-semibold uppercase tracking-[.2em] text-[#153f93]/50">{solution.title[lang]}</span>
                <p className="text-[15px] leading-7 text-black/58 md:text-base">{solution.description[lang]}</p>
              </div>
              <div className="relative overflow-hidden rounded-[30px] bg-[#17428f] p-7 text-white md:p-9">
                <div className="absolute -bottom-16 -right-12 h-52 w-52 rounded-full border border-white/10" />
                <p className="relative text-[1.65rem] font-medium leading-[1.12] tracking-[-.045em] md:text-[2rem]">{localized(content.statement, lang)}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white">
        <div className="sellf-container py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
            <div><div className="inline-flex items-center gap-3 rounded-full border border-black/[.07] px-4 py-2"><span className="h-2 w-2 rounded-full bg-[#153f93]" /><span className="text-[9px] font-semibold uppercase tracking-[.17em] text-black/40">01 — {t.overview}</span></div></div>
            <div className="max-w-5xl">
              {content.overview.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "max-w-[30ch] text-[clamp(2rem,3.5vw,3.6rem)] font-medium leading-[1.06] tracking-[-.055em]" : "mt-8 max-w-3xl text-base leading-8 text-black/50 md:text-lg md:leading-9"}>{localized(paragraph, lang)}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0c1730] text-white">
        <div className="sellf-container py-20 md:py-28">
          <div className="mb-12 flex items-end justify-between gap-8 border-b border-white/[.08] pb-6"><p className="sellf-kicker text-white/38">02 — {t.outcomes}</p><div className="hidden items-center gap-2 md:flex"><span className="h-2 w-2 rounded-full bg-[#6d97ff]" /><span className="h-2 w-2 rounded-full bg-[#6d97ff]/50" /><span className="h-2 w-2 rounded-full bg-[#6d97ff]/20" /></div></div>
          <div className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
            <div className="grid gap-4">
              {content.outcomeBullets.map((item, index) => (
                <div key={index} className="grid grid-cols-[48px_1fr] gap-5 rounded-[24px] border border-white/[.08] bg-white/[.035] p-6 transition hover:bg-white/[.055]"><span className="text-[9px] font-semibold tracking-[.16em] text-[#7ea2ff]">0{index + 1}</span><p className="text-base font-medium leading-7 tracking-[-.025em] text-white/72">{localized(item, lang)}</p></div>
              ))}
            </div>
            {content.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {content.metrics.map((item, index) => (
                  <div key={index} className={`relative min-h-[205px] overflow-hidden rounded-[24px] p-6 ${index === 0 ? "col-span-2 bg-[#5b8aff] text-[#07101e]" : "bg-white text-[#07101e]"}`}>
                    <span className={`absolute right-5 top-5 text-[9px] font-semibold tracking-[.17em] ${index === 0 ? "text-[#07101e]/35" : "text-[#153f93]/35"}`}>M{String(index + 1).padStart(2, "0")}</span>
                    <p className="sellf-display text-[3.25rem] leading-none tracking-[-.07em] md:text-6xl">{localized(item.value, lang)}</p>
                    <p className="mt-6 max-w-[25ch] text-[11px] leading-5 opacity-55">{localized(item.label, lang)}</p>
                    {item.note && <p className="mt-2 text-[9px] leading-4 opacity-35">{localized(item.note, lang)}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="mt-5 max-w-3xl text-[10px] leading-5 text-white/28">{localized(content.metricNote, lang)}</p>
        </div>
      </section>

      <section className="bg-[#f7f8fb]">
        <div className="sellf-container py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
            <div><p className="sellf-kicker text-black/36">03 — {t.audience}</p></div>
            <div className="grid gap-3">
              {content.audience.map((item, index) => (
                <div key={index} className="group grid grid-cols-[64px_1fr] items-center rounded-[22px] border border-black/[.06] bg-white p-5 transition duration-300 hover:border-[#5b8aff]/30 hover:shadow-[0_18px_48px_rgba(21,63,147,.07)] md:grid-cols-[90px_1fr] md:p-6"><span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#e8efff] text-[9px] font-semibold text-[#153f93] transition group-hover:bg-[#153f93] group-hover:text-white">0{index + 1}</span><p className="max-w-3xl text-base leading-7 tracking-[-.025em] text-black/65 md:text-lg">{localized(item, lang)}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="sellf-container py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start"><p className="sellf-kicker text-black/36">04 — {t.approach}</p></div>
            <div>
              <p className="max-w-3xl text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.12] tracking-[-.048em]">{localized(content.approachIntro, lang)}</p>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {content.approachSteps.map((item, index) => (
                  <div key={index} className={`relative min-h-[250px] overflow-hidden rounded-[26px] border p-7 ${index % 3 === 0 ? "border-[#153f93]/10 bg-[#edf2fc]" : "border-black/[.06] bg-[#fafafa]"}`}>
                    <div className="mb-12 flex items-center justify-between"><span className="text-[9px] font-semibold tracking-[.17em] text-[#153f93]/50">{String(index + 1).padStart(2, "0")}</span><span className="h-8 w-8 rounded-full border border-[#153f93]/10" /></div>
                    <h3 className="text-lg font-semibold tracking-[-.035em]">{localized(item.title, lang)}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-black/48">{localized(item.body, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {(content.proofBrands.length > 0 || content.proofNotes.length > 0) && (
        <section className="bg-[#e9eef7]">
          <div className="sellf-container py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
              <div><p className="sellf-kicker text-black/36">05 — {t.proof}</p></div>
              <div>
                {content.proofBrands.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {content.proofBrands.map((brand) => (
                      <div key={brand} className="proof-logo flex min-h-[145px] items-center justify-center rounded-[24px] bg-white px-6 shadow-[0_12px_36px_rgba(15,31,64,.045)] ring-1 ring-black/[.04]"><SolutionProofLogo brand={brand} className="text-[#09101e]/75" /></div>
                    ))}
                  </div>
                )}
                {content.proofNotes.length > 0 && (
                  <div className="mt-4 grid gap-4 lg:grid-cols-3">
                    {content.proofNotes.map((note, index) => (
                      <div key={index} className="rounded-[22px] bg-[#153f93] p-6 text-white"><span className="mb-5 block text-[9px] font-semibold tracking-[.16em] text-[#a8bdff]">0{index + 1}</span><p className="text-sm leading-7 text-white/70">{localized(note, lang)}</p></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#07101e] text-white">
        <div className="sellf-container py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start"><p className="sellf-kicker text-white/35">06 — {t.operations}</p></div>
            <div className="space-y-10">
              {operationGroups.map((group) => (
                <div key={group.key}>
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[.17em] text-[#86a8ff]">{group.label}</p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {group.items.map((operation, index) => (
                      <div key={`${group.key}-${operation}`} className="operation-chip flex min-h-[68px] items-center justify-between gap-4 rounded-[18px] border border-white/[.08] bg-white/[.035] px-5 py-4 transition hover:border-[#5b8aff]/30 hover:bg-white/[.055]"><div className="flex items-center gap-4"><span className="operation-dot h-2 w-2 shrink-0 rounded-full bg-white/18 transition duration-300" /><span className="text-sm font-medium tracking-[-.02em] text-white/68">{operation}</span></div><span className="text-[10px] text-white/20">{String(index + 1).padStart(2, "0")}</span></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="sellf-container py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
            <div><p className="sellf-kicker text-black/36">07 — {t.faq}</p></div>
            <div className="space-y-3">
              {content.faq.map((item, index) => (
                <details key={index} className="group rounded-[20px] border border-black/[.065] bg-[#fafafa] px-6 transition open:bg-white open:shadow-[0_18px_50px_rgba(15,31,64,.05)] md:px-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden"><span className="max-w-3xl text-base font-semibold tracking-[-.028em] md:text-lg">{localized(item.question, lang)}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8efff] text-lg font-light text-[#153f93] transition duration-300 group-open:rotate-45 group-open:bg-[#153f93] group-open:text-white">+</span></summary>
                  <p className="max-w-3xl pb-7 pr-10 text-sm leading-7 text-black/48">{localized(item.answer, lang)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[#f2f5fa]">
          <div className="sellf-container py-20 md:py-28">
            <div className="mb-5 flex items-end justify-between gap-8"><p className="sellf-kicker text-black/36">08 — {t.related}</p><Link href={`/${lang}/services`} className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#153f93]">{t.back} ↗</Link></div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.slug} href={`/${lang}/services/${item.slug}`} className="group flex min-h-[250px] flex-col rounded-[26px] border border-black/[.05] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#5b8aff]/25 hover:shadow-[0_22px_60px_rgba(15,31,64,.08)]">
                  <div className="flex items-start justify-between"><span className="text-[9px] font-semibold tracking-[.17em] text-black/24">{String(item.index).padStart(2, "0")}</span><span className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-[#e8efff] text-[11px] text-[#153f93] transition group-hover:bg-[#153f93] group-hover:text-white">↗</span></div>
                  <div className="mt-auto"><h3 className="max-w-[16ch] text-xl font-semibold leading-[1.05] tracking-[-.045em]">{item.title[lang]}</h3><p className="mt-3 line-clamp-3 text-[10px] leading-5 text-black/40">{item.description[lang]}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-[#5b8aff] text-[#07101e]">
        <div className="absolute right-[-10%] top-[-40%] h-[520px] w-[520px] rounded-full border border-[#07101e]/10" />
        <div className="absolute right-[4%] top-[-20%] h-[330px] w-[330px] rounded-full border border-[#07101e]/10" />
        <div className="sellf-container relative py-20 md:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div><p className="sellf-kicker mb-6 text-[#07101e]/45">{solution.title[lang]}</p><h2 className="sellf-display max-w-[13ch] text-[clamp(2.9rem,5.2vw,5.6rem)] leading-[.93] tracking-[-.06em]">{localized(content.cta.title, lang)}</h2></div>
            <div className="rounded-[26px] bg-[#07101e] p-7 text-white shadow-[0_24px_70px_rgba(7,16,30,.2)]"><p className="mb-8 max-w-lg text-sm leading-7 text-white/52">{localized(content.cta.description, lang)}</p><SolutionCta label={localized(content.cta.label, lang)} /></div>
          </div>
        </div>
      </section>
    </article>
  );
}
