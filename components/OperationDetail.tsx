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
    <article className="overflow-hidden bg-[#f1f0ec] text-[#0b0d0d]">
      <header className="relative overflow-hidden bg-[#0b0d0d] text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-[14rem] top-[5rem] h-[38rem] w-[38rem] rounded-full border border-white/[.055]" />
          <div className="absolute -right-[7rem] top-[12rem] h-[25rem] w-[25rem] rounded-full border border-white/[.055]" />
          <div className="absolute bottom-[-15rem] left-[18%] h-[30rem] w-[30rem] rounded-full bg-white/[.018] blur-[90px]" />
        </div>

        <div className="sellf-container relative pb-20 pt-28 md:pb-28 md:pt-36 lg:pb-32 lg:pt-40">
          <nav aria-label="Breadcrumb" className="mb-14 flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[.12em] text-white/38 md:mb-20">
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

          <div className="grid gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-16 xl:gap-24">
            <div>
              <div className="mb-7 flex items-center gap-4">
                {parent && <SolutionHubIcon slug={parent.slug} size={56} />}
                <span className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/32">Operation / Service</span>
              </div>
              <p className="sellf-kicker mb-6 text-white/38">{content.label[lang]}</p>
              <h1 className="sellf-display max-w-[10ch] text-[3.75rem] leading-[.9] tracking-[-.065em] sm:text-7xl md:text-[5.45rem] lg:text-[6.35rem] xl:text-[7rem]">
                {content.heroTitle[lang]}
              </h1>
              <p className="mt-9 max-w-2xl text-base leading-8 text-white/58 md:text-lg md:leading-9">
                {content.heroDescription[lang]}
              </p>
            </div>

            <div className="lg:pb-2">
              <div className="rounded-[30px] border border-white/10 bg-white/[.035] p-5 shadow-[0_34px_100px_rgba(0,0,0,.22)] backdrop-blur-sm md:p-7">
                <div className="mb-7 flex items-center justify-between gap-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[.19em] text-white/34">{t.searchIntent}</p>
                  <span className="h-2 w-2 rounded-full bg-white/55" />
                </div>
                <div className="space-y-2.5">
                  {content.queryThemes.map((query, index) => (
                    <div key={index} className="flex min-h-[64px] items-center justify-between gap-5 rounded-[18px] bg-white/[.055] px-5 py-4">
                      <span className="text-sm font-medium tracking-[-.02em] text-white/78">{localized(query, lang)}</span>
                      <span className="text-[10px] tabular-nums text-white/24">0{index + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 grid grid-cols-3 gap-2 text-center text-[9px] font-semibold uppercase tracking-[.12em] text-white/28">
                  <span className="rounded-full border border-white/8 px-2 py-2.5">Demand</span>
                  <span className="rounded-full border border-white/8 px-2 py-2.5">Conversion</span>
                  <span className="rounded-full border border-white/8 px-2 py-2.5">Revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="sellf-container py-20 md:py-28 lg:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[.3fr_1fr] lg:gap-24">
          <p className="sellf-kicker text-black/36">{t.quickAnswer}</p>
          <p className="max-w-4xl text-3xl font-medium leading-[1.17] tracking-[-.045em] md:text-5xl md:leading-[1.1]">
            {localized(content.snapshot.what, lang)}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {snapshot.map((item, index) => (
            <div key={item.label} className="flex min-h-[300px] flex-col rounded-[25px] bg-white p-7 shadow-[0_16px_45px_rgba(10,12,12,.035)]">
              <div className="flex items-start justify-between gap-4">
                <p className="max-w-[16ch] text-[10px] font-semibold uppercase tracking-[.15em] text-black/34">{item.label}</p>
                <span className="text-[10px] font-semibold text-black/20">0{index + 1}</span>
              </div>
              <p className="mt-auto pt-16 text-sm leading-7 text-black/58">{localized(item.body, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-32">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div><p className="sellf-kicker text-black/36">{t.problems}</p></div>
            <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
              {content.problems.map((item, index) => (
                <div key={index} className="border-t border-black/10 pt-6">
                  <div className="mb-8 flex items-center justify-between gap-5">
                    <span className="text-[10px] font-semibold tracking-[.16em] text-black/24">0{index + 1}</span>
                    <span className="h-2 w-2 rounded-full bg-black/18" />
                  </div>
                  <h2 className="max-w-[24ch] text-xl font-semibold leading-[1.15] tracking-[-.04em] md:text-2xl">{localized(item.title, lang)}</h2>
                  <p className="mt-5 max-w-[44ch] text-sm leading-7 text-black/48">{localized(item.body, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0d0d] py-20 text-white md:py-28 lg:py-32">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div><p className="sellf-kicker text-white/36">{t.scope}</p></div>
            <div>
              <p className="max-w-4xl text-3xl font-medium leading-[1.17] tracking-[-.045em] text-white/92 md:text-5xl md:leading-[1.1]">
                {lang === "tr" ? "Google Ads hesabını tek bir kampanya ekranı değil, birbirine bağlı talep ve ölçüm sistemi olarak yönetiyoruz." : "We manage Google Ads as a connected demand and measurement system, not as a collection of isolated campaigns."}
              </p>
              <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 md:mt-20">
                {content.scope.map((item, index) => (
                  <div key={index} className="flex min-h-[260px] flex-col rounded-[23px] border border-white/8 bg-white/[.035] p-6">
                    <span className="mb-12 text-[9px] font-semibold tracking-[.18em] text-white/22">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-auto text-lg font-semibold leading-[1.1] tracking-[-.035em] text-white/90">{localized(item.title, lang)}</h3>
                    <p className="mt-4 text-xs leading-6 text-white/42">{localized(item.body, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sellf-container py-20 md:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
          <div><p className="sellf-kicker text-black/36">{t.process}</p></div>
          <div className="space-y-4">
            {content.process.map((item, index) => (
              <div key={index} className="grid gap-6 rounded-[24px] bg-white px-6 py-7 md:grid-cols-[72px_.7fr_1.3fr] md:items-start md:px-8 md:py-9">
                <span className="text-[11px] font-semibold tracking-[.14em] text-black/24">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold leading-[1.15] tracking-[-.035em]">{localized(item.title, lang)}</h3>
                <p className="max-w-2xl text-sm leading-7 text-black/48">{localized(item.body, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8e7e3] py-20 md:py-28 lg:py-32">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div><p className="sellf-kicker text-black/36">{t.evidence}</p></div>
            <div>
              <p className="max-w-4xl text-3xl font-medium leading-[1.17] tracking-[-.045em] md:text-5xl md:leading-[1.1]">
                {lang === "tr" ? "Kanıtı kanala uydurmuyoruz. İlgili deneyimi, gerçekten yürütüldüğü daha geniş sistemin bağlamıyla birlikte gösteriyoruz." : "We do not force proof into a channel claim. Relevant experience is shown in the context of the wider system in which the work actually happened."}
              </p>
              <div className="mt-14 grid gap-4 md:grid-cols-3 md:mt-18">
                {content.evidence.map((item) => (
                  <div key={item.title[lang]} className="flex min-h-[300px] flex-col rounded-[24px] bg-white p-7">
                    <span className="mb-14 block h-2 w-2 rounded-full bg-black/55" />
                    <h3 className="mt-auto text-xl font-semibold tracking-[-.04em]">{localized(item.title, lang)}</h3>
                    <p className="mt-5 text-sm leading-7 text-black/48">{localized(item.body, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-32">
        <div className="sellf-container">
          <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
            <div><p className="sellf-kicker text-black/36">{t.decisions}</p></div>
            <div className="grid gap-4 md:grid-cols-2">
              {content.decisions.map((item, index) => (
                <div key={index} className="rounded-[24px] bg-[#f1f0ec] p-7 md:p-8">
                  <span className="mb-10 block text-[9px] font-semibold tracking-[.16em] text-black/22">Q{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="max-w-[26ch] text-xl font-semibold leading-[1.15] tracking-[-.04em]">{localized(item.question, lang)}</h3>
                  <p className="mt-5 max-w-[46ch] text-sm leading-7 text-black/50">{localized(item.answer, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sellf-container py-20 md:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.3fr_1fr] lg:gap-24">
          <div><p className="sellf-kicker text-black/36">{t.faq}</p></div>
          <div className="grid gap-3">
            {content.faq.map((item, index) => (
              <details key={index} className="group rounded-[23px] bg-white px-6 py-2 shadow-[0_10px_28px_rgba(10,12,12,.025)] md:px-8">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="max-w-3xl text-lg font-semibold leading-7 tracking-[-.03em] text-black/82">{localized(item.question, lang)}</span>
                  <span aria-hidden="true" className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f0ec] text-lg font-light text-black/38 transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-7 pr-12 text-sm leading-7 text-black/48">{localized(item.answer, lang)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28 lg:py-32">
        <div className="sellf-container">
          <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
            {parent && (
              <Link href={`/${lang}/services/${parent.slug}`} className="group flex min-h-[310px] flex-col rounded-[26px] bg-[#0b0d0d] p-7 text-white transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between gap-5">
                  <SolutionHubIcon slug={parent.slug} size={52} />
                  <span className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><Arrow /></span>
                </div>
                <div className="mt-auto pt-14">
                  <p className="mb-4 text-[9px] font-semibold uppercase tracking-[.17em] text-white/28">{t.parent}</p>
                  <h2 className="max-w-[15ch] text-2xl font-semibold leading-[1.05] tracking-[-.045em]">{parent.title[lang]}</h2>
                </div>
              </Link>
            )}

            <div className="rounded-[26px] bg-[#f1f0ec] p-7 md:p-8">
              <p className="mb-8 text-[9px] font-semibold uppercase tracking-[.17em] text-black/28">{t.related}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((item) => item.content ? (
                  <Link key={item.slug} href={`/${lang}/services/${item.slug}`} className="group flex min-h-[92px] items-center justify-between gap-5 rounded-[18px] bg-white px-5 py-4">
                    <span className="text-sm font-semibold tracking-[-.025em]">{item.content.label[lang]}</span>
                    <span className="text-black/30 transition-transform group-hover:translate-x-1"><Arrow /></span>
                  </Link>
                ) : (
                  <div key={item.slug} className="flex min-h-[92px] items-center justify-between gap-5 rounded-[18px] bg-white/70 px-5 py-4">
                    <span className="text-sm font-semibold tracking-[-.025em] text-black/58">{item.slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")}</span>
                    <span className="text-[9px] font-semibold uppercase tracking-[.12em] text-black/22">{t.future}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#111313] py-20 text-white md:py-28 lg:py-32">
        <div className="pointer-events-none absolute -right-20 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border border-white/8" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-4 top-1/2 h-[18rem] w-[18rem] -translate-y-1/2 rounded-full border border-white/8" aria-hidden="true" />
        <div className="sellf-container relative">
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div>
              <p className="sellf-kicker mb-6 text-white/36">{content.label[lang]}</p>
              <h2 className="sellf-display max-w-[13ch] text-5xl leading-[.94] tracking-[-.06em] md:text-7xl lg:text-[5.3rem]">{content.cta.title[lang]}</h2>
            </div>
            <div>
              <p className="mb-8 max-w-lg text-base leading-8 text-white/56">{content.cta.description[lang]}</p>
              <SolutionCta label={content.cta.label[lang]} />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
