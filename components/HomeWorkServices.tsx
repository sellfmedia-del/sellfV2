"use client";

import { useParams } from "next/navigation";
import BentoGrid from "@/components/BentoGrid";
import { serviceData } from "@/data/ServiceData";

const dict = {
  tr: {
    expertise: "Uzmanlığımız",
    whatWeDo: "Genelde Ne ",
    whatWeDoSpan: "Yaparız...",
  },
  en: {
    expertise: "Our Expertise",
    whatWeDo: "What we usually ",
    whatWeDoSpan: "Do...",
  },
};

const serviceIcons: Record<string, string> = {
  "integrated-growth": "https://cdn.sellfmedia.workers.dev/essentials/Integrated%20Growth%20Consulting.png",
  "digital-ads": "https://cdn.sellfmedia.workers.dev/essentials/PPC.png",
  "social-media": "https://cdn.sellfmedia.workers.dev/essentials/SM.png",
  design: "https://cdn.sellfmedia.workers.dev/essentials/Design.png",
  seo: "https://cdn.sellfmedia.workers.dev/essentials/SEO.png",
  influencer: "https://cdn.sellfmedia.workers.dev/essentials/Influencer%20Marketing.png",
  "e-com": "https://cdn.sellfmedia.workers.dev/essentials/E-Com.png",
  productions: "https://cdn.sellfmedia.workers.dev/essentials/Production.png",
};

export default function HomeWorkServices() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  return (
    <section className="home-work-services w-full border-b border-black/10 bg-white">
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
          display: block !important;
          margin: 0 0 22px !important;
          padding-top: 18px;
        }
        .home-work-services .home-work > .sellf-container > .grid:first-child .sellf-display {
          font-size: clamp(2.15rem, 3vw, 3.25rem) !important;
          line-height: .93 !important;
          max-width: 8.3ch;
          letter-spacing: -.055em;
        }
        .home-work-services .home-work > .sellf-container > .grid:first-child > div:last-child {
          display: none !important;
        }
        .home-work-services .home-work > .sellf-container > .grid:nth-child(2) {
          display: flex !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          scroll-snap-type: x proximity;
          border: 0 !important;
          gap: 8px;
          padding: 0 0 3px;
          scrollbar-width: none;
          align-items: stretch;
        }
        .home-work-services .home-work > .sellf-container > .grid:nth-child(2)::-webkit-scrollbar {
          display: none;
        }
        .home-work-services .home-work article {
          flex: 0 0 min(78vw, 238px) !important;
          width: min(78vw, 238px) !important;
          min-height: 322px !important;
          scroll-snap-align: start;
          border: 1px solid rgba(0,0,0,.095) !important;
          background: #fff !important;
          border-radius: 5px;
          box-shadow: none !important;
        }
        .home-work-services .home-work article > div:first-child {
          height: 46% !important;
        }
        .home-work-services .home-work article > .relative.z-10 {
          min-height: 322px !important;
          padding: 13px !important;
        }
        .home-work-services .home-work article .text-sm {
          font-size: 11px !important;
          line-height: 1.4 !important;
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
        @media (min-width: 768px) {
          .home-work-services .home-work article {
            flex-basis: 228px !important;
            width: 228px !important;
          }
        }
        @media (min-width: 1024px) {
          .home-work-services .home-work article {
            flex-basis: calc((100% - 16px) / 3) !important;
            width: calc((100% - 16px) / 3) !important;
            min-width: 0 !important;
          }
        }
      `}} />

      <div className="grid lg:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)]">
        <div className="min-w-0 px-5 py-11 sm:px-8 md:px-9 md:py-12 lg:border-r lg:border-black/10 lg:px-10 lg:py-14 xl:px-12 xl:py-16">
          <BentoGrid />
        </div>

        <div className="min-w-0 px-5 py-11 sm:px-8 md:px-9 md:py-12 lg:px-8 lg:py-14 xl:px-10 xl:py-16">
          <div className="mb-6 md:mb-7">
            <p className="sellf-kicker mb-3 text-black/42">{t.expertise}</p>
            <h2 className="sellf-display max-w-[10.5ch] text-[2.2rem] leading-[.93] tracking-[-.055em] text-black sm:text-[2.55rem] xl:text-[2.85rem]">
              {t.whatWeDo}<span className="text-black/38">{t.whatWeDoSpan}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 border-l border-t border-black/10 lg:grid-cols-4">
            {serviceData.map((service, index) => (
              <article
                key={service.id}
                className="group flex min-h-[166px] flex-col border-r border-b border-black/10 bg-white p-3.5 transition-colors duration-300 hover:bg-black/[.018] xl:min-h-[178px] xl:p-4"
              >
                <div className="mb-5 flex items-start justify-between gap-2">
                  <div className="flex h-6 w-6 items-center justify-start xl:h-7 xl:w-7">
                    {serviceIcons[service.id] && (
                      <img
                        src={serviceIcons[service.id]}
                        alt={service.title[currentLang]}
                        className="max-h-full max-w-full object-contain object-left grayscale opacity-72 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                    )}
                  </div>
                  <span className="text-[8px] tracking-[.12em] text-black/22">0{index + 1}</span>
                </div>

                <div className="mt-auto">
                  <h3 className="mb-2 text-[11px] font-semibold leading-[1.16] tracking-[-.025em] text-black xl:text-[12px]">
                    {service.title[currentLang]}
                  </h3>
                  <p className="line-clamp-3 text-[9px] leading-[1.42] text-black/44 xl:text-[9.5px]">
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
