"use client";

import { useParams } from "next/navigation";

const dict = {
  tr: {
    eyebrow: "SELLF BÜYÜME SİSTEMİ",
    headline: "İçgörüden etkiye.",
    intro: "Gerçek büyümeyi anlamak, ölçmek ve hayata geçirmek için tek bir sistem.",
    navStep: "Step by Step Metodolojisi",
    navMeasure: "BHS & RGI",
    navOperating: "Büyüme & Operasyon Modeli",
    leftEyebrow: "ÖNEMLİ OLANI ÖLÇ",
    leftTitleA: "Büyüme,",
    leftTitleB: "ölçülür.",
    leftDesc: "Önce nerede olduğunuzu netleştirir, ardından gerçek büyümeyi kendi ölçüm sistemimizle takip ederiz.",
    leftCta: "BHS & RGI'ı İncele",
    bhsLabel: "BHS",
    bhsDesc: "Markanın mevcut sağlık durumunu ve başlangıç noktasını belirler.",
    rgiLabel: "RGI",
    rgiDesc: "Gerçek büyümeyi 3 aylık ve yıllık periyotlarda ölçer.",
    dataLabel: "Veriye dayalı",
    dataDesc: "Tahmini azaltır. İşe yarayana odaklanır.",
    baseline: "BAŞLANGIÇ",
    realGrowth: "GERÇEK BÜYÜME",
    diagnose: "TEŞHİS",
    diagnoseDesc: "Neredeyiz",
    execute: "UYGULAMA",
    executeDesc: "Büyümeyi ne yönlendiriyor",
    measure: "ÖLÇÜM",
    measureDesc: "Gerçek sonuçlar",
    leftFooter: "VERİ NETLİK YARATIR. NETLİK BÜYÜME YARATIR.",
    rightEyebrow: "İKİ EKİP. TEK BÜYÜME SİSTEMİ.",
    rightTitleA: "Büyüme, yönetilir",
    rightTitleB: "ve hayata geçirilir.",
    rightDesc: "Strateji ve uygulama aynı büyüme sistemi içinde birlikte çalışır — daha hızlı, daha akıllı ve daha verimli.",
    rightCta: "Çalışma Modelimizi İncele",
    growthTeam: "Büyüme Ekibi",
    growthCount: "11 Danışman",
    growthSub: "Yön. Strateji. Denetim.",
    growthItems: [
      "BHS'i ölçer, RGI'ı takip eder",
      "Strateji ve yol haritasını belirler",
      "Pazar ve rakip araştırmasını yönetir",
      "Uygulama ve performansı denetler",
      "Süreci Step by Step metodolojisiyle hizalar",
    ],
    opsTeam: "Operasyon Ekibi",
    opsCount: "23 Operasyon",
    opsSub: "Uygulama. Yürütme. Sonuç.",
    opsItems: [
      "Performans pazarlama",
      "Kreatif ve tasarım",
      "SEO ve içerik",
      "Yazılım ve geliştirme",
      "E-ticaret, CRM ve daha fazlası",
    ],
    modeGrowth: "Büyüme + Operasyon",
    modeGrowthDesc: "Marka hedefi belirler. Direksiyona Sellf geçer.",
    modeOps: "Yalnızca Operasyon",
    modeOpsDesc: "Marka yönlendirir. Sellf uygular.",
    rightFooter: "FARKLI UZMANLIKLAR. DAHA GÜÇLÜ BİR BÜYÜME MOTORU.",
  },
  en: {
    eyebrow: "SELLF OPERATING SYSTEM",
    headline: "From insight to impact.",
    intro: "A complete growth system to understand, measure and execute real growth.",
    navStep: "Step by Step Methodology",
    navMeasure: "BHS & RGI",
    navOperating: "Growth & Operations",
    leftEyebrow: "MEASURE WHAT MATTERS",
    leftTitleA: "Growth,",
    leftTitleB: "measured.",
    leftDesc: "We start with a clear picture of where you are, then measure real growth with a proprietary system.",
    leftCta: "Explore BHS & RGI",
    bhsLabel: "BHS",
    bhsDesc: "Understand your current brand health and define the baseline.",
    rgiLabel: "RGI",
    rgiDesc: "Measure real growth quarterly and annually.",
    dataLabel: "Data-driven",
    dataDesc: "Remove guesses. Focus on what works.",
    baseline: "BASELINE",
    realGrowth: "REAL GROWTH",
    diagnose: "DIAGNOSE",
    diagnoseDesc: "Where you are",
    execute: "EXECUTE",
    executeDesc: "What drives growth",
    measure: "MEASURE",
    measureDesc: "Real results",
    leftFooter: "DATA CREATES CLARITY. CLARITY CREATES GROWTH.",
    rightEyebrow: "TWO TEAMS. ONE GROWTH SYSTEM.",
    rightTitleA: "Growth, directed",
    rightTitleB: "and executed.",
    rightDesc: "Strategy and execution working together to grow your business — faster, smarter and more efficiently.",
    rightCta: "Explore Our Operating Model",
    growthTeam: "Growth Team",
    growthCount: "11 Consultants",
    growthSub: "Direction. Strategy. Governance.",
    growthItems: [
      "Measure BHS, track RGI",
      "Define strategy and roadmap",
      "Lead market & competitor research",
      "Oversee execution and performance",
      "Keep the journey aligned with Step by Step",
    ],
    opsTeam: "Operations Team",
    opsCount: "23 Operations",
    opsSub: "Execution. Implementation. Results.",
    opsItems: [
      "Performance marketing",
      "Creative & design",
      "SEO & content",
      "Software & development",
      "E-commerce, CRM and more",
    ],
    modeGrowth: "Growth + Operations",
    modeGrowthDesc: "You define the destination. Sellf drives.",
    modeOps: "Operations Only",
    modeOpsDesc: "You lead. Sellf executes.",
    rightFooter: "DIFFERENT EXPERTISE. A STRONGER GROWTH ENGINE.",
  },
};

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-[11px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
    >
      {children}
      <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}

function MetricIcon({ type }: { type: "bhs" | "rgi" | "data" }) {
  if (type === "bhs") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
        <path d="M5 25.5h22M8 23V15m5 8V10m5 13v-6m5 6V6" stroke="currentColor" strokeWidth="1.35" />
        <path d="m8 17 5-5 5 3 5-7" stroke="currentColor" strokeWidth="1.35" />
      </svg>
    );
  }

  if (type === "rgi") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
        <path d="m5 23 7-8 5 4 9-11" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20 8h6v6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 27h22" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
      <path d="m16 5 11 6-11 6L5 11l11-6Z" stroke="currentColor" strokeWidth="1.35" />
      <path d="m5 16 11 6 11-6M5 21l11 6 11-6" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

function TeamIcon({ type }: { type: "growth" | "ops" }) {
  if (type === "growth") {
    return (
      <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
        <circle cx="14" cy="11" r="5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.5 29c.7-6.2 4.1-9.2 9.5-9.2s8.8 3 9.5 9.2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="24.5" cy="13" r="3.7" stroke="currentColor" strokeWidth="1.2" />
        <path d="M23.5 20.5c4.6.1 7.2 2.8 7.8 7.4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 36" className="h-9 w-9" fill="none" aria-hidden="true">
      <path d="m18 4.5 11 6.2v14.6L18 31.5 7 25.3V10.7L18 4.5Z" stroke="currentColor" strokeWidth="1.35" />
      <path d="m7 10.7 11 6.1 11-6.1M18 16.8v14.7" stroke="currentColor" strokeWidth="1.35" />
    </svg>
  );
}

export default function HomeOperatingSystem() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  return (
    <section className="relative overflow-hidden bg-[#0a0c0c] text-white border-y border-white/[.08]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes operatingPulse {
          0%,100% { transform: scale(1); opacity: .86; }
          50% { transform: scale(1.025); opacity: 1; }
        }
        .operating-orb { animation: operatingPulse 8s ease-in-out infinite; }
        .operating-orb-r { animation-delay: -3s; }
        @media (prefers-reduced-motion: reduce) {
          .operating-orb, .operating-orb-r { animation: none; }
        }
      `}} />

      <div className="relative border-b border-white/[.09]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-[42%] top-[-36%] h-[190%] w-[16%] rotate-[10deg] bg-[linear-gradient(180deg,rgba(183,163,142,.18),rgba(112,97,81,.05)_52%,transparent_88%)] blur-2xl" />
          <div className="absolute right-[10%] top-0 h-full w-[32%] bg-[radial-gradient(circle_at_45%_0%,rgba(255,255,255,.04),transparent_58%)]" />
        </div>

        <div className="relative grid gap-8 px-5 py-10 sm:px-8 md:px-10 md:py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:px-12 xl:px-16">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.28em] text-white/58">{t.eyebrow}</p>
            <h2 className="sellf-display mt-3 text-[2.7rem] leading-[.95] tracking-[-.055em] sm:text-[3.4rem] lg:text-[4.2rem] xl:text-[4.8rem]">
              {t.headline}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 md:text-[15px]">{t.intro}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end" aria-label="Sellf framework navigation">
            <a href={`/${currentLang}/framework/step-by-step`} className="group inline-flex items-center gap-2 border-b border-white/28 pb-1 text-[10px] text-white/72 transition-colors hover:text-white">
              {t.navStep}<span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href={`/${currentLang}/framework/growth-measurement`} className="group inline-flex items-center gap-2 border-b border-white/12 pb-1 text-[10px] text-white/58 transition-colors hover:text-white">
              {t.navMeasure}<span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href={`/${currentLang}/framework/operating-model`} className="group inline-flex items-center gap-2 border-b border-white/12 pb-1 text-[10px] text-white/58 transition-colors hover:text-white">
              {t.navOperating}<span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </nav>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="relative border-b border-white/[.09] px-5 py-10 sm:px-8 md:px-10 md:py-12 lg:border-b-0 lg:border-r lg:px-12 lg:py-14 xl:px-16 xl:py-16">
          <div className="grid gap-10 xl:grid-cols-[.86fr_1.14fr] xl:gap-8">
            <div className="relative z-10">
              <p className="text-[9px] font-semibold uppercase tracking-[.26em] text-white/52">{t.leftEyebrow}</p>
              <h3 className="sellf-display mt-3 text-[2.8rem] leading-[.93] tracking-[-.06em] sm:text-[3.4rem] xl:text-[4rem]">
                {t.leftTitleA}<br/><span className="text-[#c8bdb3]">{t.leftTitleB}</span>
              </h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/62">{t.leftDesc}</p>
              <div className="mt-6"><ArrowLink href={`/${currentLang}/framework/growth-measurement`}>{t.leftCta}</ArrowLink></div>

              <div className="mt-10 space-y-6">
                {[
                  ["bhs", t.bhsLabel, t.bhsDesc],
                  ["rgi", t.rgiLabel, t.rgiDesc],
                  ["data", t.dataLabel, t.dataDesc],
                ].map(([type, label, desc]) => (
                  <div key={label} className="grid grid-cols-[42px_1fr] gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-[8px] border border-white/[.14] text-white/82"><MetricIcon type={type as "bhs" | "rgi" | "data"} /></div>
                    <div>
                      <div className="text-[12px] font-semibold text-white/92">{label}</div>
                      <p className="mt-1 max-w-[18rem] text-[11px] leading-[1.55] text-white/48">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[390px]">
              <div className="pointer-events-none absolute left-1/2 top-[42%] h-[230px] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(170,147,121,.13),rgba(91,78,65,.05)_42%,transparent_72%)] blur-2xl" />
              <div className="pointer-events-none absolute left-[5%] right-[5%] top-[42%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.13)_20%,rgba(205,187,168,.22)_50%,rgba(255,255,255,.13)_80%,transparent)]" />
              <div className="absolute left-1/2 top-[42%] grid w-full max-w-[360px] -translate-x-1/2 -translate-y-1/2 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-1 sm:gap-3">
                <div className="operating-orb relative aspect-square w-full max-w-[138px] justify-self-end rounded-full border border-white/[.18] bg-[radial-gradient(circle_at_35%_26%,rgba(255,255,255,.22),rgba(71,69,64,.36)_25%,rgba(5,7,7,.94)_72%)] shadow-[inset_-22px_-28px_48px_rgba(0,0,0,.6),0_22px_45px_rgba(0,0,0,.45)]">
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center"><div className="text-2xl font-medium tracking-[-.06em] sm:text-3xl">BHS</div><div className="mt-2 text-[7px] font-semibold tracking-[.24em] text-white/50 sm:text-[8px]">{t.baseline}</div></div>
                  </div>
                </div>
                <span className="text-xl text-white/50 sm:text-2xl">→</span>
                <div className="operating-orb operating-orb-r relative aspect-square w-full max-w-[138px] justify-self-start rounded-full border border-[#cdbba8]/30 bg-[radial-gradient(circle_at_35%_26%,rgba(255,255,255,.28),rgba(132,113,92,.30)_30%,rgba(9,10,9,.96)_74%)] shadow-[inset_-22px_-28px_48px_rgba(0,0,0,.62),0_22px_45px_rgba(0,0,0,.45)]">
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center"><div className="text-2xl font-medium tracking-[-.06em] sm:text-3xl">RGI</div><div className="mt-2 text-[7px] font-semibold tracking-[.24em] text-white/50 sm:text-[8px]">{t.realGrowth}</div></div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-7 grid grid-cols-3 gap-3 border-t border-white/[.10] pt-5 text-center">
                {[
                  [t.diagnose, t.diagnoseDesc],
                  [t.execute, t.executeDesc],
                  [t.measure, t.measureDesc],
                ].map(([title, desc]) => (
                  <div key={title}>
                    <div className="text-[8px] font-semibold tracking-[.18em] text-white/78">{title}</div>
                    <div className="mt-1 text-[9px] leading-[1.45] text-white/38">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/[.12] pt-4 text-[8px] font-semibold uppercase tracking-[.24em] text-white/38">{t.leftFooter}</div>
        </div>

        <div className="relative overflow-hidden px-5 py-10 sm:px-8 md:px-10 md:py-12 lg:px-12 lg:py-14 xl:px-16 xl:py-16">
          <div className="pointer-events-none absolute right-0 top-0 h-[310px] w-[54%] opacity-42">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=82"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover grayscale contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0c0c_0%,rgba(10,12,12,.48)_40%,rgba(10,12,12,.18)_100%)]" />
            <div className="absolute inset-0 bg-black/18" />
          </div>

          <div className="relative z-10 max-w-[38rem]">
            <p className="text-[9px] font-semibold uppercase tracking-[.26em] text-white/52">{t.rightEyebrow}</p>
            <h3 className="sellf-display mt-3 text-[2.8rem] leading-[.93] tracking-[-.06em] sm:text-[3.4rem] xl:text-[4rem]">
              {t.rightTitleA}<br/>{t.rightTitleB}
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/62">{t.rightDesc}</p>
            <div className="mt-6"><ArrowLink href={`/${currentLang}/framework/operating-model`}>{t.rightCta}</ArrowLink></div>
          </div>

          <div className="relative z-10 mt-10 grid gap-3 md:grid-cols-2">
            {[
              { icon: "growth" as const, title: t.growthTeam, count: t.growthCount, sub: t.growthSub, items: t.growthItems },
              { icon: "ops" as const, title: t.opsTeam, count: t.opsCount, sub: t.opsSub, items: t.opsItems },
            ].map((team) => (
              <div key={team.title} className="rounded-[9px] border border-white/[.10] bg-black/18 p-5 backdrop-blur-[2px]">
                <div className="flex items-start gap-3 border-b border-white/[.09] pb-4">
                  <div className="text-white/85"><TeamIcon type={team.icon} /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-[15px] font-semibold tracking-[-.025em] text-white/92">{team.title}</h4>
                      <span className="shrink-0 text-[8px] text-white/42">{team.count}</span>
                    </div>
                    <p className="mt-1 text-[10px] text-white/48">{team.sub}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {team.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[10px] leading-[1.5] text-white/58"><span className="mt-[1px] text-white/74">✓</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-3 grid gap-3 md:grid-cols-2">
            <div className="border-t border-white/[.10] pt-4">
              <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/66">{t.modeGrowth}</div>
              <p className="mt-1.5 text-[10px] leading-[1.55] text-white/42">{t.modeGrowthDesc}</p>
            </div>
            <div className="border-t border-white/[.10] pt-4">
              <div className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/66">{t.modeOps}</div>
              <p className="mt-1.5 text-[10px] leading-[1.55] text-white/42">{t.modeOpsDesc}</p>
            </div>
          </div>

          <div className="relative z-10 mt-10 border-t border-white/[.12] pt-4 text-[8px] font-semibold uppercase tracking-[.24em] text-white/38">{t.rightFooter}</div>
        </div>
      </div>
    </section>
  );
}
