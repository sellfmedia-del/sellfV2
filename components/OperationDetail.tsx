import Link from "next/link";
import SolutionCta from "@/components/SolutionCta";
import SolutionHubIcon from "@/components/SolutionHubIcon";
import { getSolutionIndexItem } from "@/data/SolutionIndex";
import { getOperationContent, type OperationContent, type OperationLang, type OperationLocalizedText } from "@/data/OperationContent";

const labels = {
  tr: {
    services: "Çözümlerimiz",
    quickAnswer: "Hızlı Cevap",
    what: "Bu hizmet nedir?",
    whoFor: "Kimler için?",
    manages: "Neyi yönetiyoruz?",
    outcome: "Ana sonuç",
    problems: "Ne Zaman İhtiyaç Duyulur?",
    scope: "Operasyon Kapsamı",
    process: "Nasıl Çalışıyoruz?",
    evidence: "İlgili Deneyim",
    decisions: "Karar Vermeden Önce",
    faq: "Sık Sorulan Sorular",
    related: "İlgili Operasyonlar",
    parent: "Bağlı Olduğu Çözüm",
    searchIntent: "Arama Niyeti",
    future: "Yakında",
  },
  en: {
    services: "Our Solutions",
    quickAnswer: "Quick Answer",
    what: "What is this service?",
    whoFor: "Who is it for?",
    manages: "What do we manage?",
    outcome: "Primary outcome",
    problems: "When Do You Need It?",
    scope: "Operational Scope",
    process: "How We Work",
    evidence: "Relevant Experience",
    decisions: "Before You Decide",
    faq: "Frequently Asked Questions",
    related: "Related Operations",
    parent: "Parent Solution",
    searchIntent: "Search Intent",
    future: "Coming soon",
  },
} as const;

function localized(value: OperationLocalizedText, lang: OperationLang) {
  return value[lang];
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function OperationDetail({ lang, content }: { lang: OperationLang; content: OperationContent }) {
  const t = labels[lang];
  const parent = getSolutionIndexItem(content.primaryParent);
  const related = content.relatedSlugs.map((slug) => ({
    slug,
    content: getOperationContent(slug),
  }));

  const snapshot = [
    { label: t.what, body: content.snapshot.what },
    { label: t.whoFor, body: content.snapshot.whoFor },
    { label: t.manages, body: content.snapshot.manages },
    { label: t.outcome, body: content.snapshot.outcome },
  ];

  return (
    <article className="overflow-hidden bg-[#f5f4f0] text-[#0b0d0d]">
      <header className="relative overflow-hidden bg-[#0b0d0d] text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-[12rem] top-[7rem] h-[34rem] w-[34rem] rounded-full border border-white/[.04]" />
          <div className="absolute -right-[5rem] top-[13rem] h-[22rem] w-[22rem] rounded-full border border-white/[.04]" />
          <div className="absolute bottom-[-14rem] left-[20%] h-[27rem] w-[27rem] rounded-full bg-white/[.014] blur-[100px]" />
        </div>

        <div className="sellf-container relative pb-20 pt-28 md:pb-24 md:pt-36 lg:pb-28 lg:pt-40">
          <nav aria-label="Breadcrumb" className="mb-12 flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[.12em] text-white/38 md:mb-16">
            <Link href={`/${lang}/services`} className="transition-colors hover:text-white">{t.services}</Link>
            {parent && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={`/${lang}/services/${parent.slug}`} className="transition-colors hover:text-white">{parent.title[lang]}</Link>
              </>
            )}
            <span aria-hidden="true">/</span>
            <span className="text-white/72">{content.label[lang]}</span>
          </nav>

          <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-16 xl:gap-24">
            <div>
              <div className="mb-6 flex items-center gap-4">
                {parent && <SolutionHubIcon slug={parent.slug} size={48} />}
                <span className="text-[9px] font-semibold uppercase tracking-[.22em] text-white/28">Operation / Service</span>
              </div>
              <p className="sellf-kicker mb-5 text-white/36">{content.label[lang]}</p>
              <h1 className="sellf-display max-w-[11ch] text-[3.4rem] leading-[.94] tracking-[-.058em] sm:text-[4.2rem] md:text-[4.85rem] lg:text-[5.5rem] xl:text-[6.1rem]">
                {content.heroTitle[lang]}
              </h1>
              <p className="mt-8 max-w-xl text-[15px] leading-8 text-white/58 md:text-base md:leading-8">
                {content.heroDescription[lang]}
              </p>
            </div>

            <div className="lg:pb-1">
              <div className="rounded-[22px] border border-white/[.075] bg-white/[.024] p-5 shadow-[0_24px_70px_rgba(0,0,0,.13)] backdrop-blur-sm md:p-6">
                <div className="mb-6 flex items-center justify-between gap-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-white/32">{t.searchIntent}</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-white/46" />
                </div>
                <div className="space-y-2">
                  {content.queryThemes.map((query, index) => (
                    <div key={index} className="flex min-h-[54px] items-center justify-between gap-5 rounded-[14px] border border-white/[.045] bg-white/[.022] px-4 py-3.5">
                      <span className="text-[13px] font-medium tracking-[-.015em] text-white/72">{localized(query, lang)}</span>
                      <span className="text-[9px] tabular-nums text-white/22">0{index + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[8px] font-semibold uppercase tracking-[.13em] text-white/24">
                  <span className="rounded-full border border-white/[.06] px-2 py-2">Demand</span>
                  <span className="rounded-full border border-white/[.06] px-2 py-2">Conversion</span>
                  <span className="rounded-full border border-white/[.06] px-2 py-2">Revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="sellf-container py-20 md:py-24 lg:py-28">
        <div className="mb-12 grid gap-8 lg:grid-cols-[.3fr_1fr] lg:gap-24">
          <p className="sellf-kicker text-black/34">{t.quickAnswer}</p>
          <p className="max-w-4xl text-[1.8rem] font-medium leading-[1.2] tracking-[-.04em] md:text-[2.65rem] md:leading-[1.12]">
            {localized(content.snapshot.what, lang)}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {snapshot.map((item, index) => (
            <div key={item.label} className="flex min-h-[235px] flex-col rounded-[18px] border border-black/[.055] bg-white/90 p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="max-w-[16ch] text-[9px] font-semibold uppercase tracking-[.16em] text-black/32">{item.label}</p>
                <span className="text-[9px] font-semibold text-black/18">0{index + 1}</span>
              </div>
              <p className="mt-auto pt-12 text-[13px] leading-6 text-black/54">{localized(item.body, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div><p className="sellf-kicker text-black/34">{t.problems}</p></div>
            <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
              {content.problems.map((item, index) => (
                <div key={index} className="border-t border-black/[.085] pt-5">
                  <div className="mb-7 flex items-center justify-between gap-5">
                    <span className="text-[9px] font-semibold tracking-[.17em] text-black/22">0{index + 1}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-black/16" />
                  </div>
                  <h2 className="max-w-[24ch] text-xl font-medium leading-[1.18] tracking-[-.035em] md:text-[1.4rem]">{localized(item.title, lang)}</h2>
                  <p className="mt-4 max-w-[44ch] text-[13px] leading-6 text-black/46">{localized(item.body, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0d0d] py-20 text-white md:py-24 lg:py-28">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div><p className="sellf-kicker text-white/34">{t.scope}</p></div>
            <div>
              <p className="max-w-4xl text-[1.8rem] font-medium leading-[1.2] tracking-[-.04em] text-white/90 md:text-[2.65rem] md:leading-[1.12]">
                {lang === "tr" ? "Google Ads hesabını tek bir kampanya ekranı değil, birbirine bağlı talep ve ölçüm sistemi olarak yönetiyoruz." : "We manage Google Ads as a connected demand and measurement system, not as a collection of isolated campaigns."}
              </p>
              <div className="mt-14 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 md:mt-16">
                {content.scope.map((item, index) => (
                  <div key={index} className="flex min-h-[210px] flex-col rounded-[18px] border border-white/[.065] bg-white/[.02] p-5">
                    <span className="mb-9 text-[8px] font-semibold tracking-[.2em] text-white/20">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-auto text-[17px] font-medium leading-[1.15] tracking-[-.03em] text-white/88">{localized(item.title, lang)}</h3>
                    <p className="mt-3 text-[11px] leading-[1.55rem] text-white/40">{localized(item.body, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sellf-container py-20 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
          <div><p className="sellf-kicker text-black/34">{t.process}</p></div>
          <div>
            {content.process.map((item, index) => (
              <div key={index} className="grid gap-5 border-t border-black/[.085] py-7 md:grid-cols-[64px_.7fr_1.3fr] md:items-start md:py-8">
                <span className="text-[10px] font-semibold tracking-[.15em] text-black/20">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-[17px] font-medium leading-[1.2] tracking-[-.03em]">{localized(item.title, lang)}</h3>
                <p className="max-w-2xl text-[13px] leading-6 text-black/46">{localized(item.body, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe7] py-20 md:py-24 lg:py-28">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div><p className="sellf-kicker text-black/34">{t.evidence}</p></div>
            <div>
              <p className="max-w-4xl text-[1.8rem] font-medium leading-[1.2] tracking-[-.04em] md:text-[2.65rem] md:leading-[1.12]">
                {lang === "tr" ? "Kanıtı kanala uydurmuyoruz. İlgili deneyimi, gerçekten yürütüldüğü daha geniş sistemin bağlamıyla birlikte gösteriyoruz." : "We do not force proof into a channel claim. Relevant experience is shown in the context of the wider system in which the work actually happened."}
              </p>
              <div className="mt-12 grid gap-3 md:grid-cols-3 md:mt-14">
                {content.evidence.map((item) => (
                  <div key={item.title[lang]} className="flex min-h-[245px] flex-col rounded-[18px] border border-black/[.045] bg-white/90 p-6">
                    <span className="mb-10 block h-1.5 w-1.5 rounded-full bg-black/44" />
                    <h3 className="mt-auto text-lg font-medium tracking-[-.035em]">{localized(item.title, lang)}</h3>
                    <p className="mt-4 text-[13px] leading-6 text-black/46">{localized(item.body, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div><p className="sellf-kicker text-black/34">{t.decisions}</p></div>
            <div className="grid gap-3 md:grid-cols-2">
              {content.decisions.map((item, index) => (
                <div key={index} className="rounded-[18px] border border-black/[.05] bg-[#f5f4f0] p-6 md:p-7">
                  <span className="mb-8 block text-[8px] font-semibold tracking-[.17em] text-black/20">Q{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="max-w-[26ch] text-lg font-medium leading-[1.2] tracking-[-.035em]">{localized(item.question, lang)}</h3>
                  <p className="mt-4 max-w-[46ch] text-[13px] leading-6 text-black/48">{localized(item.answer, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sellf-container py-20 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
          <div><p className="sellf-kicker text-black/34">{t.faq}</p></div>
          <div className="grid gap-2.5">
            {content.faq.map((item, index) => (
              <details key={index} className="group rounded-[16px] border border-black/[.05] bg-white/92 px-6 py-1 md:px-7">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="max-w-3xl text-[17px] font-medium leading-7 tracking-[-.025em] text-black/80">{localized(item.question, lang)}</span>
                  <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1f0ec] text-base font-light text-black/34 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-6 pr-12 text-[13px] leading-6 text-black/46">{localized(item.answer, lang)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="sellf-container">
          <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
            {parent && (
              <Link href={`/${lang}/services/${parent.slug}`} className="group flex min-h-[270px] flex-col rounded-[20px] bg-[#0b0d0d] p-6 text-white transition-transform duration-300 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-5">
                  <SolutionHubIcon slug={parent.slug} size={46} />
                  <span className="text-white/34 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><Arrow /></span>
                </div>
                <div className="mt-auto pt-12">
                  <p className="mb-3 text-[8px] font-semibold uppercase tracking-[.18em] text-white/26">{t.parent}</p>
                  <h2 className="max-w-[15ch] text-[1.35rem] font-medium leading-[1.08] tracking-[-.04em]">{parent.title[lang]}</h2>
                </div>
              </Link>
            )}

            <div className="rounded-[20px] border border-black/[.045] bg-[#f5f4f0] p-6 md:p-7">
              <p className="mb-7 text-[8px] font-semibold uppercase tracking-[.18em] text-black/26">{t.related}</p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {related.map((item) => item.content ? (
                  <Link key={item.slug} href={`/${lang}/services/${item.slug}`} className="group flex min-h-[80px] items-center justify-between gap-5 rounded-[14px] border border-black/[.045] bg-white/90 px-5 py-4">
                    <span className="text-[13px] font-medium tracking-[-.02em]">{item.content.label[lang]}</span>
                    <span className="text-black/26 transition-transform group-hover:translate-x-1"><Arrow /></span>
                  </Link>
                ) : (
                  <div key={item.slug} className="flex min-h-[80px] items-center justify-between gap-5 rounded-[14px] border border-black/[.035] bg-white/65 px-5 py-4">
                    <span className="text-[13px] font-medium tracking-[-.02em] text-black/56">{item.slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")}</span>
                    <span className="text-[8px] font-semibold uppercase tracking-[.13em] text-black/20">{t.future}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#111313] py-20 text-white md:py-24 lg:py-28">
        <div className="pointer-events-none absolute -right-20 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-white/[.055]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-4 top-1/2 h-[17rem] w-[17rem] -translate-y-1/2 rounded-full border border-white/[.055]" aria-hidden="true" />
        <div className="sellf-container relative">
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div>
              <p className="sellf-kicker mb-5 text-white/34">{content.label[lang]}</p>
              <h2 className="sellf-display max-w-[13ch] text-[2.9rem] leading-[.97] tracking-[-.055em] md:text-[4rem] lg:text-[4.7rem]">{content.cta.title[lang]}</h2>
            </div>
            <div>
              <p className="mb-8 max-w-lg text-[15px] leading-7 text-white/54">{content.cta.description[lang]}</p>
              <SolutionCta label={content.cta.label[lang]} />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
