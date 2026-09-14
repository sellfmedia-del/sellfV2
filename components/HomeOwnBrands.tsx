"use client";

import Link from "next/link";
import { useRef } from "react";
import { ownBrands } from "@/data/OwnBrands";

type Lang = "tr" | "en";

const copy = {
  tr: {
    eyebrow: "KENDİ MARKALARIMIZ",
    title1: "İnşa Ederiz,",
    title2: "Sahipleniriz,",
    title3: "Büyütürüz.",
    intro:
      "Sadece markalar için büyüme üretmiyoruz. Kendi yazılımlarımızı ve şirketlerimizi de inşa ediyor, işletiyor ve büyütüyoruz.",
    ecosystem: "SELLF EKOSİSTEMİ",
    ownBrands: "KENDİ MARKA",
    countries: "ÜLKEDE OPERASYON",
    discover: "Tüm Markalarımızı Keşfedin",
    footerNote: "FİKİRDEN ÖLÇEKLENEN GERÇEK ETKİYE",
    prev: "Önceki markalar",
    next: "Sonraki markalar",
  },
  en: {
    eyebrow: "OUR OWN BRANDS",
    title1: "We Build,",
    title2: "We Own,",
    title3: "We Grow.",
    intro:
      "We do not only create growth for brands. We also build, operate and grow our own software products and companies.",
    ecosystem: "SELLF ECOSYSTEM",
    ownBrands: "OWN BRANDS",
    countries: "COUNTRIES OF OPERATION",
    discover: "Explore All Our Brands",
    footerNote: "FROM IDEA TO SCALABLE REAL IMPACT",
    prev: "Previous brands",
    next: "Next brands",
  },
} as const;

export default function HomeOwnBrands({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.78, 300), behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#090b0b] text-white border-y border-white/[.07]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_38%_18%,rgba(255,255,255,.035),transparent_28%),radial-gradient(circle_at_82%_82%,rgba(76,116,99,.06),transparent_26%)]" />

      <div className="sellf-container relative px-5 py-16 md:px-10 md:py-20 xl:px-12 xl:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.3em] text-white/48">{t.eyebrow}</p>
            <h2 className="sellf-display mt-5 max-w-[8.6ch] text-[3.25rem] leading-[.92] tracking-[-.06em] sm:text-[4.3rem] xl:text-[5.35rem]">
              {t.title1}<br />
              {t.title2}<br />
              <span className="text-white/52">{t.title3}</span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-xl text-[15px] leading-[1.75] text-white/66 md:text-base">{t.intro}</p>
            <div className="mt-8 flex items-end justify-between gap-6 border-t border-white/[.12] pt-6">
              <span className="text-[9px] font-semibold uppercase tracking-[.26em] text-white/42">{t.ecosystem}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollTrack(-1)}
                  aria-label={t.prev}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/[.22] text-lg text-white/80 transition hover:border-white/45 hover:bg-white/[.05]"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrack(1)}
                  aria-label={t.next}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/[.22] text-lg text-white/80 transition hover:border-white/45 hover:bg-white/[.05]"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:grid xl:grid-cols-4 xl:overflow-visible"
        >
          {ownBrands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative min-h-[285px] min-w-[82vw] snap-start overflow-hidden rounded-[22px] border border-white/[.09] bg-[#101313] p-7 shadow-[0_20px_60px_rgba(0,0,0,.22)] transition duration-500 hover:-translate-y-1 hover:border-white/[.18] sm:min-w-[410px] xl:min-w-0"
            >
              <div
                className="pointer-events-none absolute inset-x-[-15%] bottom-[-40%] h-[72%] rounded-[50%] blur-2xl transition-transform duration-700 group-hover:scale-110"
                style={{ background: brand.accent }}
              />
              <div className="pointer-events-none absolute inset-x-[-12%] bottom-[-18%] h-[46%] rotate-[-8deg] rounded-[50%] border border-white/[.08] bg-white/[.018]" />

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-5">
                    <h3 className="text-[2rem] font-semibold tracking-[-.045em] text-white/95">{brand.name}</h3>
                    <span className="text-xl font-semibold tracking-[-.04em] text-white/72">{brand.mark}</span>
                  </div>
                  <p className="mt-6 max-w-[25ch] text-[15px] leading-[1.55] text-white/62">{brand.description[lang]}</p>
                </div>

                <div className="mt-10 flex items-end justify-between gap-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/[.32] text-lg text-white/86 transition group-hover:border-white/65 group-hover:bg-white/[.05] group-hover:translate-x-1">→</span>
                  <span className="text-[9px] uppercase tracking-[.18em] text-white/32">{brand.domain}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-white/[.09] pt-9 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-10 sm:gap-14">
            <div>
              <div className="text-[2rem] font-semibold tracking-[-.04em]">4</div>
              <div className="mt-2 text-[9px] uppercase tracking-[.24em] text-white/40">{t.ownBrands}</div>
            </div>
            <div className="h-14 w-px bg-white/[.13]" />
            <div>
              <div className="text-[2rem] font-semibold tracking-[-.04em]">13+</div>
              <div className="mt-2 text-[9px] uppercase tracking-[.24em] text-white/40">{t.countries}</div>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-9">
            <Link
              href={`/${lang}/brands`}
              className="group inline-flex w-fit items-center gap-5 rounded-full border border-white/[.26] px-6 py-3 text-[12px] font-semibold text-white/88 transition hover:border-white/50 hover:bg-white/[.04]"
            >
              {t.discover}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <span className="max-w-[190px] text-[9px] uppercase leading-[1.7] tracking-[.24em] text-white/34">{t.footerNote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
