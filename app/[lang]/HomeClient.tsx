"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import BentoGrid from "@/components/BentoGrid";
import Ecosystem from "@/components/Ecosystem";
import ProcessEngine from "@/components/ProcessEngine";
import VisionaryQuote from "@/components/VisionaryQuote";
import Logofolio from "@/components/Logofolio";
import CallToAction from "@/components/CallToAction";

const dict = {
  tr: {
    videoBtn: "Sesi Aç & Tam Ekran İzle",
    scrollHint: "Aşağı Kaydır",
    heroTitle: "Büyüme, Veriyle",
    heroHighlight: "İnşa Edildi.",
    heroDesc: "Sellf bir Ajans değildir. Sellf; sürdürülebilirlik, verimlilik ve ölçülebilir büyüme için partnerinizdir."
  },
  en: {
    videoBtn: "Sound On & Watch Fullscreen",
    scrollHint: "Scroll Down",
    heroTitle: "Growth, Engineered by",
    heroHighlight: "Data.",
    heroDesc: "Sellf is not an Agency. Sellf is your partner for sustainability, efficiency and measurable growth."
  }
};

export default function HomeClient() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.controls = false;
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.controls = true;
    if (video.requestFullscreen) video.requestFullscreen();
    else if ((video as any).webkitRequestFullscreen) (video as any).webkitRequestFullscreen();
  };

  return (
    <div className="w-full bg-sellf-surface overflow-hidden">
      <link rel="preload" href="https://res.cloudinary.com/doal5qa8c/image/upload/f_auto,q_auto/v1777887416/Screenshot_2026-05-04_at_12.36.49_PM_ehtznc.png" as="image" fetchPriority="high" />

      <section className="home-hero bg-[#0b0d0d] text-white pt-24 md:pt-28">
        <div className="sellf-container grid lg:grid-cols-[.85fr_1.15fr] border-x border-white/10">
          <div className="min-h-[560px] md:min-h-[650px] px-5 py-16 md:px-10 md:py-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <div>
              <h1 className="sellf-display text-[3.55rem] sm:text-7xl xl:text-[6.4rem] max-w-[8ch]">
                {t.heroTitle}<br/><span className="text-white/62">{t.heroHighlight}</span>
              </h1>
              <p className="mt-8 max-w-md text-sm md:text-base leading-relaxed text-white/67">{t.heroDesc}</p>
            </div>
            <div className="pt-12 flex items-end justify-between gap-6 text-[9px] uppercase tracking-[.24em] text-white/35">
              <span>{t.scrollHint}</span>
            </div>
          </div>

          <button type="button" onClick={handleVideoClick} className="group relative min-h-[460px] md:min-h-[650px] overflow-hidden text-left">
            <video
              ref={videoRef}
              src="https://cdn.sellfmedia.workers.dev/videos/website_main_video.mp4"
              poster="https://cdn.sellfmedia.workers.dev/statics/video-screnshot.png"
              autoPlay loop muted playsInline
              className="absolute inset-0 h-full w-full object-cover grayscale-[20%] contrast-[1.04] transition-transform duration-[1200ms] group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-black/20" />
            <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10 rounded-full border border-white/25 bg-black/25 backdrop-blur-md px-4 py-2 text-[9px] uppercase tracking-[.2em] text-white/80">
              {t.videoBtn} ↗
            </div>
          </button>
        </div>
      </section>

      <BentoGrid />
      <Ecosystem />
      <ProcessEngine />
      <VisionaryQuote />
      <Logofolio />
      <CallToAction />
    </div>
  );
}
