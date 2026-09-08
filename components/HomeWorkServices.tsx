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
    <section className="home-work-services w-full bg-white border-b border-black/10">
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
          margin: 0 0 28px !important;
        }
        .home-work-services .home-work > .sellf-container > .grid:first-child .sellf-display {
          font-size: clamp(2.5rem, 4vw, 4.5rem) !important;
          line-height: .91 !important;
          max-width: 8ch;
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
          padding: 0 0 8px;
          scrollbar-width: none;
        }
        .home-work-services .home-work > .sellf-container > .grid:nth-child(2)::-webkit-scrollbar {
          display: none;
        }
        .home-work-services .home-work article {
          flex: 0 0 min(72vw, 248px) !important;
          width: min(72vw, 248px) !important;
          min-height: 365px !important;
          scroll-snap-align: start;
          border: 1px solid rgba(0,0,0,.10) !important;
          background: #fff !important;
          border-radius: 7px;
        }
        .home-work-services .home-work article > div:first-child {
          height: 47% !important;
        }
        .home-work-services .home-work article > .relative.z-10 {
          min-height: 365px !important;
          padding: 16px !important;
        }
        .home-work-services .home-work article .text-sm {
          font-size: 12px !important;
          line-height: 1.45 !important;
        }
        .home-work-services .home-work article img {
          max-height: 24px !important;
        }
        .home-work-services .home-work article .text-\\[11px\\] {
          font-size: 10px !important;
        }
        @media (min-width: 768px) {
          .home-work-services .home-work article {
            flex-basis: 246px !important;
            width: 246px !important;
          }
        }
      `}} />

      <div className="grid lg:grid-cols-2">
        <div className="min-w-0 px-5 py-14 sm:px-8 md:px-10 md:py-16 lg:border-r lg:border-black/10 xl:px-12 xl:py-20">
          <BentoGrid />
        </div>

        <div className="min-w-0 px-5 py-14 sm:px-8 md:px-10 md:py-16 xl:px-12 xl:py-20">
          <div className="mb-8 md:mb-10">
            <p className="sellf-kicker mb-4 text-black/42">{t.expertise}</p>
            <h2 className="sellf-display max-w-[11ch] text-[2.5rem] leading-[.92] text-black sm:text-5xl xl:text-[4.5rem]">
              {t.whatWeDo}<span className="text-black/40">{t.whatWeDoSpan}</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 border-l border-t border-black/10 xl:grid-cols-4">
            {serviceData.map((service, index) => (
              <article
                key={service.id}
                className="group flex min-h-[190px] flex-col border-r border-b border-black/10 bg-white p-4 transition-colors duration-300 hover:bg-black/[.018] md:min-h-[210px] md:p-5"
              >
                <div className="mb-8 flex items-start justify-between gap-3">
                  <div className="flex h-8 w-8 items-center justify-start md:h-9 md:w-9">
                    {serviceIcons[service.id] && (
                      <img
                        src={serviceIcons[service.id]}
                        alt={service.title[currentLang]}
                        className="max-h-full max-w-full object-contain object-left grayscale opacity-75 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                    )}
                  </div>
                  <span className="text-[9px] tracking-[.12em] text-black/25">0{index + 1}</span>
                </div>

                <div className="mt-auto">
                  <h3 className="mb-2 text-[13px] font-semibold leading-[1.18] tracking-[-.025em] text-black md:text-sm">
                    {service.title[currentLang]}
                  </h3>
                  <p className="line-clamp-3 text-[10px] leading-[1.45] text-black/48 md:text-[11px]">
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
