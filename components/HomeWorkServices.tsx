"use client";

import { useParams } from "next/navigation";
import BentoGrid from "@/components/BentoGrid";
import { serviceData } from "@/data/ServiceData";

const dict = {
  tr: {
    expertise: "Uzmanlığımız",
    worksKicker: "Seçili İşler",
    worksTitle: "İŞLER",
    operations: "Operasyonlarımız.",
  },
  en: {
    expertise: "Our Expertise",
    worksKicker: "Selected Works",
    worksTitle: "WORKS",
    operations: "Our Operations.",
  },
};

function ServiceIcon({ id }: { id: string }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "integrated-growth":
      return (
        <svg {...common}>
          <path d="M5 25V15M11 25V10M17 25V17M23 25V6" />
          <path d="M4 27h24" />
          <path d="m5 12 6-5 6 5 8-7" />
        </svg>
      );
    case "digital-ads":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="10" />
          <circle cx="16" cy="16" r="4" />
          <path d="M24 8l4-4M24 8h4V4" />
        </svg>
      );
    case "social-media":
      return (
        <svg {...common}>
          <circle cx="8" cy="10" r="3" />
          <circle cx="24" cy="8" r="3" />
          <circle cx="22" cy="24" r="3" />
          <path d="m11 11 10-2M10 13l10 9M24 11l-1 10" />
        </svg>
      );
    case "design":
      return (
        <svg {...common}>
          <rect x="5" y="6" width="13" height="13" rx="2" />
          <rect x="14" y="13" width="13" height="13" rx="2" />
          <path d="m8 23 12-12" />
        </svg>
      );
    case "seo":
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="8" />
          <path d="m20 20 7 7" />
          <path d="M10 14h8M14 10v8" />
        </svg>
      );
    case "influencer":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="4" />
          <path d="M4 25c1-5 4-8 7-8s6 3 7 8" />
          <path d="M21 9h6M24 6v6M20 18c4 0 7 2 8 6" />
        </svg>
      );
    case "e-com":
      return (
        <svg {...common}>
          <path d="M7 12h18l-2 14H9L7 12Z" />
          <path d="M12 12V9a4 4 0 0 1 8 0v3" />
          <path d="M12 18h8" />
        </svg>
      );
    case "productions":
      return (
        <svg {...common}>
          <rect x="4" y="7" width="24" height="18" rx="3" />
          <path d="m13 12 8 4-8 4v-8Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="10" />
          <path d="M10 16h12M16 10v12" />
        </svg>
      );
  }
}

export default function HomeWorkServices() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  return (
    <section className="home-work-services w-full border-b border-black/[.06] bg-white">
      <style dangerouslySetInnerHTML={{ __html: `
        .home-work-services .home-work {
          background: transparent !important;
          padding: 0 !important;
          border: 0 !important;
        }
        .home-work-services .home-work > .sellf-container {
          width: 100% !important;
          max-width: none !important;
          padding: 0 !important;
        }
        .home-work-services .home-work > .sellf-container > .grid:first-child {
          display: none !important;
        }
        .home-work-services .home-work > .sellf-container > .grid:nth-child(2) {
          display: flex !important;
          overflow-x: auto !important;
          overflow-y: visible !important;
          scroll-snap-type: x proximity;
          border: 0 !important;
          gap: 10px;
          padding: 0 0 6px;
          scrollbar-width: none;
          align-items: flex-start !important;
        }
        .home-work-services .home-work > .sellf-container > .grid:nth-child(2)::-webkit-scrollbar {
          display: none;
        }
        .home-work-services .home-work article {
          flex: 0 0 min(80vw, 240px) !important;
          width: min(80vw, 240px) !important;
          min-height: 326px !important;
          scroll-snap-align: start;
          border: 1px solid rgba(11,13,13,.075) !important;
          background: #fff !important;
          border-radius: 12px !important;
          box-shadow: 0 3px 14px rgba(11,13,13,.025) !important;
          overflow: hidden !important;
          transition: flex-basis 520ms cubic-bezier(.22,1,.36,1), width 520ms cubic-bezier(.22,1,.36,1), box-shadow 350ms ease, border-color 350ms ease !important;
        }
        .home-work-services .home-work article > div:first-child {
          height: 154px !important;
          border-radius: 11px 11px 0 0;
        }
        .home-work-services .home-work article > div:first-child > div:first-child {
          background-size: cover !important;
          background-position: center !important;
        }
        .home-work-services .home-work article:nth-child(1) > div:first-child > div:first-child {
          background-image: url("https://unsplash.com/photos/fDFrmPe1sOA/download?force=true&w=1200") !important;
          background-position: center 45% !important;
        }
        .home-work-services .home-work article:nth-child(2) > div:first-child > div:first-child {
          background-image: url("https://unsplash.com/photos/eiur1LM3KLw/download?force=true&w=1200") !important;
          background-position: center !important;
        }
        .home-work-services .home-work article:nth-child(3) > div:first-child > div:first-child {
          background-image: url("https://unsplash.com/photos/PKMvkg7vnUo/download?force=true&w=1200") !important;
          background-position: center 32% !important;
        }
        .home-work-services .home-work article:nth-child(4) > div:first-child > div:first-child {
          background-image: url("https://unsplash.com/photos/W-7k72ThEr0/download?force=true&w=1200") !important;
          background-position: center !important;
        }
        .home-work-services .home-work article:nth-child(6) > div:first-child > div:first-child {
          background-image: url("https://unsplash.com/photos/KCLuRlZxITU/download?force=true&w=1200") !important;
          background-position: center 38% !important;
        }
        .home-work-services .home-work article:nth-child(7) > div:first-child > div:first-child {
          background-image: url("https://unsplash.com/photos/j6XRT3kA_64/download?force=true&w=1200") !important;
          background-position: center 35% !important;
        }
        .home-work-services .home-work article:nth-child(8) > div:first-child > div:first-child {
          background-image: url("https://unsplash.com/photos/pwcKF7L4-no/download?force=true&w=1200") !important;
          background-position: center !important;
        }
        .home-work-services .home-work article:nth-child(9) > div:first-child > div:first-child {
          background-image: url("https://unsplash.com/photos/EtOMMg1nSR8/download?force=true&w=1200") !important;
          background-position: center 52% !important;
        }
        .home-work-services .home-work article:nth-child(10) > div:first-child > div:first-child {
          background-image: url("https://unsplash.com/photos/9e9PD9blAto/download?force=true&w=1200") !important;
          background-position: center !important;
        }
        .home-work-services .home-work article:nth-child(12) > div:first-child > div:first-child {
          background-image: url("https://unsplash.com/photos/Sc5RKXLBjGg/download?force=true&w=1200") !important;
          background-position: center !important;
        }
        .home-work-services .home-work article > .relative.z-10 {
          height: auto !important;
          min-height: 326px !important;
          padding: 168px 14px 14px !important;
          justify-content: flex-start !important;
        }
        .home-work-services .home-work article > .relative.z-10 > div {
          padding-top: 0 !important;
        }
        .home-work-services .home-work article .text-sm {
          font-size: 11px !important;
          line-height: 1.42 !important;
        }
        .home-work-services .home-work article img {
          max-height: 21px !important;
          max-width: 112px !important;
        }
        .home-work-services .home-work article .text-\\[9px\\] {
          font-size: 8px !important;
        }
        .home-work-services .home-work article .text-\\[11px\\] {
          font-size: 9px !important;
        }
        .home-work-services .home-work article:hover {
          border-color: rgba(11,13,13,.13) !important;
          box-shadow: 0 14px 36px rgba(11,13,13,.07) !important;
          z-index: 2;
        }
        @media (min-width: 768px) {
          .home-work-services .home-work article {
            flex-basis: 230px !important;
            width: 230px !important;
          }
        }
        @media (min-width: 1024px) {
          .home-work-services .home-work article {
            flex-basis: calc((100% - 20px) / 3) !important;
            width: calc((100% - 20px) / 3) !important;
            min-width: 0 !important;
          }
        }
        @media (min-width: 1024px) and (hover: hover) {
          .home-work-services .home-work article:hover {
            flex-basis: calc(((100% - 20px) / 3) * 1.32) !important;
            width: calc(((100% - 20px) / 3) * 1.32) !important;
          }
        }
      `}} />

      <div className="grid lg:grid-cols-[minmax(0,1.42fr)_minmax(0,1fr)]">
        <div className="min-w-0 px-5 py-11 sm:px-8 md:px-9 md:py-12 lg:border-r lg:border-black/[.045] lg:px-10 lg:py-14 xl:px-12 xl:py-16">
          <div className="mb-6 md:mb-7">
            <p className="sellf-kicker mb-3 text-black/38">{t.worksKicker}</p>
            <h2 className="sellf-display whitespace-pre-line max-w-[10ch] text-[2.2rem] leading-[.94] tracking-[-.055em] text-black sm:text-[2.55rem] xl:text-[3.15rem]">
              {t.worksTitle}
            </h2>
          </div>
          <BentoGrid />
        </div>

        <div className="min-w-0 px-5 py-11 sm:px-8 md:px-9 md:py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">
          <div className="mb-7 md:mb-8">
            <p className="sellf-kicker mb-3 text-black/38">{t.expertise}</p>
            <h2 className="sellf-display max-w-[10.5ch] text-[2.2rem] leading-[.94] tracking-[-.055em] text-black sm:text-[2.55rem] xl:text-[2.9rem]">
              {t.operations}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 xl:gap-3">
            {serviceData.map((service, index) => (
              <article
                key={service.id}
                className="group flex min-h-[158px] flex-col rounded-[10px] border border-black/[.045] bg-white p-3.5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-black/[.09] hover:shadow-[0_10px_26px_rgba(11,13,13,.055)] xl:min-h-[172px] xl:p-4"
              >
                <div className="mb-5 flex items-start justify-between gap-2">
                  <div className="text-black transition-transform duration-300 group-hover:scale-[1.08]">
                    <ServiceIcon id={service.id} />
                  </div>
                  <span className="text-[8px] font-medium tracking-[.14em] text-black/18">0{index + 1}</span>
                </div>

                <div className="mt-auto">
                  <h3 className="mb-2 text-[11px] font-semibold leading-[1.14] tracking-[-.03em] text-black xl:text-[12px]">
                    {service.title[currentLang]}
                  </h3>
                  <p className="line-clamp-3 text-[9px] leading-[1.45] text-black/40 xl:text-[9.5px]">
                    {service.heroText[currentLang]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
