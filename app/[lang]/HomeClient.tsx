"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import BentoGrid from "@/components/BentoGrid";
import Ecosystem from "@/components/Ecosystem";
import ProcessEngine from "@/components/ProcessEngine";
import VisionaryQuote from "@/components/VisionaryQuote";
import HomeLogoStrips from "@/components/HomeLogoStrips";
import CallToAction from "@/components/CallToAction";

const dict = {
  tr: {
    videoBtn: "Sesi Aç & Tam Ekran İzle",
    scrollHint: "Aşağı Kaydır",
    heroTitle: "Büyüme, Veriyle",
    heroHighlight: "İnşa Edildi.",
    heroDesc: "Sellf bir Ajans değildir. Sellf; sürdürülebilirlik, verimlilik ve ölçülebilir büyüme için partnerinizdir.",
    seeWork: "İşlerimizi Gör",
    trusted: "Global ekiplerin güvendiği büyüme partneri",
    stats: [
      { value: "+230%", label: "Ortalama Lead Artışı" },
      { value: "1:24", label: "ROI (Reklam Harcaması)" },
      { value: "$12M", label: "Üretilen Brüt Kâr" },
      { value: "700%", label: "En Yüksek ROI" },
    ],
  },
  en: {
    videoBtn: "Sound On & Watch Fullscreen",
    scrollHint: "Scroll Down",
    heroTitle: "Growth, Engineered by",
    heroHighlight: "Data.",
    heroDesc: "Sellf is not an Agency. Sellf is your partner for sustainability, efficiency and measurable growth.",
    seeWork: "See Our Work",
    trusted: "Trusted by ambitious teams around the world",
    stats: [
      { value: "+230%", label: "Average Lead Growth" },
      { value: "1:24", label: "ROI (Ad Spend)" },
      { value: "$12M", label: "Generated Gross Profit" },
      { value: "700%", label: "Highest ROI Achieved" },
    ],
  }
};

const trustMarks = [
  { src: "https://cdn.sellfmedia.workers.dev/essentials/logoasce.png", alt: "ASCE GYO" },
  { src: "https://cdn.sellfmedia.workers.dev/essentials/logofundora.png", alt: "Fundora" },
  { src: "https://cdn.sellfmedia.workers.dev/essentials/logoinwest.png", alt: "Inwest Group" },
  { src: "https://cdn.sellfmedia.workers.dev/essentials/logoqashe.png", alt: "Qashe" },
];

const ease = [0.22, 1, 0.36, 1] as const;
const heroVideo = "https://cdn.sellfmedia.workers.dev/videos/website_main_video.mp4";

export default function HomeClient() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoExpanded, setVideoExpanded] = useState(false);

  const ensureVideoPlaying = () => {
    const video = videoRef.current;
    if (!video || document.fullscreenElement) return;
    video.muted = true;
    video.defaultMuted = true;
    video.controls = false;
    void video.play().catch(() => undefined);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.load();
      void video.play().catch(() => undefined);
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.controls = false;
        void videoRef.current.play().catch(() => undefined);
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
    void video.play().catch(() => undefined);
    if (video.requestFullscreen) video.requestFullscreen();
    else if ((video as any).webkitRequestFullscreen) (video as any).webkitRequestFullscreen();
  };

  return (
    <div className="w-full bg-sellf-surface overflow-hidden">
      <link rel="preload" href={heroVideo} as="video" type="video/mp4" />
      <link rel="preload" href="https://res.cloudinary.com/doal5qa8c/image/upload/f_auto,q_auto/v1777887416/Screenshot_2026-05-04_at_12.36.49_PM_ehtznc.png" as="image" fetchPriority="high" />

      <section className="home-hero relative bg-[#0b0d0d] text-white pt-24 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,.055),transparent_32%)]" />

        <div className="sellf-container relative grid lg:grid-cols-[.84fr_1.16fr] overflow-hidden">
          <div className="relative z-0 min-h-[560px] md:min-h-[650px] px-5 py-16 md:px-10 md:py-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[.07]">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <motion.h1
                className="sellf-display text-[3.4rem] sm:text-7xl xl:text-[6.15rem] max-w-[8.4ch]"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.08, ease }}
              >
                {t.heroTitle}<br/><span className="text-white/58">{t.heroHighlight}</span>
              </motion.h1>

              <motion.p
                className="mt-9 max-w-[31rem] text-sm md:text-[15px] leading-[1.75] text-white/64"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.22, ease }}
              >
                {t.heroDesc}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col gap-6"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.34, ease }}
              >
                <a
                  href={`/${currentLang}/portfolio`}
                  className="group inline-flex w-fit items-center gap-2 text-[11px] font-semibold text-white/88 underline decoration-white/35 underline-offset-4 transition-colors hover:text-white"
                >
                  {t.seeWork}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2.5">
                    {trustMarks.map((mark, index) => (
                      <div
                        key={mark.alt}
                        className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-white/35 bg-white p-1 shadow-[0_4px_14px_rgba(0,0,0,.18)]"
                        style={{ zIndex: trustMarks.length - index }}
                      >
                        <img src={mark.src} alt={mark.alt} className="h-full w-full object-contain grayscale" />
                      </div>
                    ))}
                  </div>
                  <p className="max-w-[180px] text-[9px] font-semibold uppercase leading-[1.45] tracking-[.18em] text-white/50">
                    {t.trusted}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="pt-12 flex items-end justify-between gap-6 text-[9px] uppercase tracking-[.22em] text-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span>{t.scrollHint}</span>
            </motion.div>
          </div>

          <div className="min-h-[460px] md:min-h-[650px]" aria-hidden="true" />

          <motion.button
            type="button"
            onMouseEnter={() => setVideoExpanded(true)}
            onMouseLeave={() => setVideoExpanded(false)}
            onClick={handleVideoClick}
            className={`group z-20 w-full min-h-[460px] md:min-h-[650px] overflow-hidden text-left will-change-[width] lg:absolute lg:inset-y-0 lg:right-0 transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${videoExpanded ? "lg:w-full" : "lg:w-[58%]"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            <video
              ref={videoRef}
              src={heroVideo}
              poster="https://cdn.sellfmedia.workers.dev/statics/video-screnshot.png"
              preload="auto"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={ensureVideoPlaying}
              onCanPlay={ensureVideoPlaying}
              className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${videoExpanded ? "scale-[1.012] grayscale-0 contrast-[1.05]" : "scale-100 grayscale-[14%] contrast-[1.03]"}`}
            />

            <div className={`absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/16 transition-opacity duration-500 ${videoExpanded ? "opacity-45" : "opacity-100"}`} />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/32 to-transparent" />

            <motion.div
              className="absolute left-6 md:left-10 bottom-6 md:bottom-10 rounded-full border border-white/18 bg-black/22 backdrop-blur-xl px-4 py-2 text-[9px] uppercase tracking-[.18em] text-white/78 shadow-[0_10px_35px_rgba(0,0,0,.16)]"
              animate={{ opacity: videoExpanded ? 0.94 : 0.78, y: videoExpanded ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {t.videoBtn} ↗
            </motion.div>
          </motion.button>
        </div>
      </section>

      <HomeLogoStrips />

      <section className="bg-[#101313] text-white border-y border-white/[.08]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {t.stats.map((stat, index) => (
            <div
              key={stat.value}
              className={`relative flex min-h-[118px] flex-col items-center justify-center px-4 py-6 text-center ${index > 0 ? "lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:h-12 lg:before:w-px lg:before:-translate-y-1/2 lg:before:bg-white/[.18]" : ""}`}
            >
              <div className="text-[2rem] md:text-[2.35rem] font-semibold tracking-[-.045em] leading-none">{stat.value}</div>
              <div className="mt-2 text-[10px] md:text-[11px] text-white/58">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <BentoGrid />
      <Ecosystem />
      <ProcessEngine />
      <VisionaryQuote />
      <CallToAction />
    </div>
  );
}
