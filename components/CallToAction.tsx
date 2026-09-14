"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { getCalApi } from "@calcom/embed-react";
import { sendGAEvent } from "@next/third-parties/google";

const dictionary = {
  tr: {
    kicker: "BRAND AUDIT",
    headlinePart1: "Markanızın",
    headlinePart2: "Büyüme Potansiyelini",
    headlinePart3: "Birlikte Keşfedelim.",
    description:
      "15 dakikalık ücretsiz bir tanışma görüşmesinde markanızı, mevcut stratejinizi ve büyüme fırsatlarınızı birlikte değerlendirelim.",
    benefits: ["Mevcut Durum Analizi", "Büyüme Fırsatları", "Stratejik Öneriler", "Sonraki Adımlar"],
    button: "Toplantı Planla",
    duration: "15 Dakika · Ücretsiz Görüşme",
    quote: "Doğru sorular, daha büyük fırsatların kapısını açar.",
    signature: "SELLF MEDIA",
    sideNote: "DAHA BÜYÜK\nMARKALAR\nDAHA İYİ\nBİR YARIN",
    bottomNote: "BÜYÜME\nMÜHENDİSLİK İŞİDİR.",
  },
  en: {
    kicker: "BRAND AUDIT",
    headlinePart1: "Discover Your Brand's",
    headlinePart2: "Growth Potential",
    headlinePart3: "Together.",
    description:
      "In a complimentary 15-minute introduction call, we'll review your brand, current strategy and the growth opportunities ahead.",
    benefits: ["Current-State Analysis", "Growth Opportunities", "Strategic Recommendations", "Next Steps"],
    button: "Book a Meeting",
    duration: "15 Minutes · Complimentary Call",
    quote: "The right questions open the door to bigger opportunities.",
    signature: "SELLF MEDIA",
    sideNote: "BIGGER\nBRANDS\nBETTER\nTOMORROW",
    bottomNote: "GROWTH IS\nENGINEERING.",
  },
} as const;

const icons = [
  <svg key="chart" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 19V9m5 10V5m5 14v-7m5 7V3" strokeLinecap="round" /></svg>,
  <svg key="target" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2.5" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3" strokeLinecap="round" /></svg>,
  <svg key="layers" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m12 3 8 4-8 4-8-4 8-4Z" /><path d="m4 12 8 4 8-4M4 17l8 4 8-4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  <svg key="calendar" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M7 3v4m10-4v4M3.5 9.5h17" strokeLinecap="round" /></svg>,
];

export default function CallToAction() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dictionary[currentLang];

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "sellf-introduction" });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const handleMeetingIntent = () => {
    sendGAEvent("event", "meeting_booked", { source: "brand_audit" });
  };

  return (
    <section className="home-cta relative overflow-hidden bg-[#090b0b] text-white border-y border-white/[.08]">
      <div className="sellf-container grid lg:grid-cols-[1.08fr_.92fr] min-h-[680px] lg:min-h-[720px]">
        <div className="relative z-10 flex flex-col justify-between px-5 py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 lg:border-r lg:border-white/[.08]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.34em] text-white/48">{t.kicker}</p>

            <h2 className="sellf-display mt-7 max-w-[11.5ch] text-[3rem] leading-[.94] tracking-[-.055em] sm:text-[4rem] lg:text-[4.6rem] xl:text-[5.15rem]">
              {t.headlinePart1}<br />
              {t.headlinePart2}<br />
              <span className="text-white/55">{t.headlinePart3}</span>
            </h2>

            <p className="mt-8 max-w-[42rem] text-sm leading-7 text-white/60 md:text-[15px]">
              {t.description}
            </p>

            <div className="mt-11 grid grid-cols-2 gap-y-8 border-y border-white/[.09] py-7 sm:grid-cols-4 sm:gap-y-0">
              {t.benefits.map((benefit, index) => (
                <div key={benefit} className={`pr-4 ${index > 0 ? "sm:border-l sm:border-white/[.1] sm:pl-5" : ""}`}>
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-white/[.13] bg-white/[.03] text-white/78">
                    {icons[index]}
                  </div>
                  <p className="mt-4 max-w-[8rem] text-[12px] leading-5 text-white/72">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleMeetingIntent}
              data-cal-namespace="sellf-introduction"
              data-cal-link="sellf-media-in7uaw/sellf-introduction"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
              className="group inline-flex w-fit items-center gap-8 rounded-full bg-[#f7f6f2] px-7 py-4 text-[12px] font-semibold text-[#101212] shadow-[0_14px_38px_rgba(0,0,0,.22)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.button}
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            <div className="flex items-center gap-3 text-[11px] leading-5 text-white/54">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/[.12] text-white/72">
                {icons[3]}
              </span>
              <span>{t.duration}</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden lg:min-h-full">
          <img
            src="https://cdn.sellfmedia.workers.dev/statics/IMG_1444_edited.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#090b0b_0%,rgba(9,11,11,.72)_10%,rgba(9,11,11,.18)_43%,rgba(9,11,11,.45)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,11,11,.75)_0%,transparent_42%,rgba(9,11,11,.22)_100%)]" />

          <p className="absolute right-7 top-9 whitespace-pre-line text-[9px] font-semibold uppercase leading-[1.75] tracking-[.28em] text-white/45 md:right-10 md:top-12">
            {t.sideNote}
          </p>

          <div className="absolute bottom-10 left-5 w-[min(19rem,calc(100%-2.5rem))] rounded-[24px] border border-white/[.14] bg-[#111313]/78 p-6 shadow-[0_22px_55px_rgba(0,0,0,.3)] backdrop-blur-xl md:bottom-12 md:left-10">
            <div className="flex -space-x-2">
              {["logoasce.png", "logofundora.png", "logoinwest.png"].map((logo) => (
                <div key={logo} className="grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-white/20 bg-white p-1">
                  <img src={`https://cdn.sellfmedia.workers.dev/essentials/${logo}`} alt="" className="h-full w-full object-contain grayscale" />
                </div>
              ))}
              <span className="grid h-8 min-w-8 place-items-center rounded-full border border-white/15 bg-[#171919] px-2 text-[9px] text-white/72">+200</span>
            </div>
            <p className="mt-5 max-w-[14rem] text-[14px] leading-6 text-white/78">“{t.quote}”</p>
            <div className="mt-5 h-px w-9 bg-white/22" />
            <p className="mt-4 text-[8px] font-semibold uppercase tracking-[.28em] text-white/42">{t.signature}</p>
          </div>

          <p className="absolute bottom-9 right-7 whitespace-pre-line text-right text-[8px] font-semibold uppercase leading-[1.7] tracking-[.3em] text-white/38 md:bottom-11 md:right-10">
            {t.bottomNote}
          </p>
        </div>
      </div>
    </section>
  );
}
