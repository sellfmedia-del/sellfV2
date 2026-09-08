"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import HomeWorkServices from "@/components/HomeWorkServices";
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
const heroVideo = "https://player.vimeo.com/video/1225074289?h=0f91056daa&background=1&autoplay=1&loop=1&muted=1&autopause=0&playsinline=1&preload=auto&controls=0&title=0&byline=0&portrait=0";

export default function HomeClient() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];
  const videoRef = useRef<HTMLIFrameElement>(null);
  const videoContainerRef = useRef<HTMLButtonElement>(null);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoFrameStyle, setVideoFrameStyle] = useState({ width: "100%", height: "100%" });

  const sendVimeoCommand = (method: string, value?: unknown) => {
    const player = videoRef.current?.contentWindow;
    if (!player) return;
    player.postMessage(value === undefined ? { method } : { method, value }, "https://player.vimeo.com");
  };

  const ensureVideoPlaying = () => {
    const fullscreenElement = document.fullscreenElement || (document as any).webkitFullscreenElement;
    if (fullscreenElement === videoContainerRef.current) return;
    sendVimeoCommand("setMuted", true);
    sendVimeoCommand("play");
  };

  const handleVideoMouseEnter = () => {
    setVideoExpanded(true);
    if (!isFullscreen) {
      sendVimeoCommand("setMuted", true);
      sendVimeoCommand("play");
    }
  };

  useEffect(() => {
    const updateVideoCover = () => {
      const container = videoContainerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;

      const videoAspect = 16 / 9;
      const containerAspect = width / height;

      if (containerAspect > videoAspect) {
        setVideoFrameStyle({ width: "100%", height: `${(containerAspect / videoAspect) * 100}%` });
      } else {
        setVideoFrameStyle({ width: `${(videoAspect / containerAspect) * 100}%`, height: "100%" });
      }
    };

    updateVideoCover();
    const resizeObserver = new ResizeObserver(updateVideoCover);
    if (videoContainerRef.current) resizeObserver.observe(videoContainerRef.current);

    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || (document as any).webkitFullscreenElement;
      const fullscreen = fullscreenElement === videoContainerRef.current;
      setIsFullscreen(fullscreen);

      if (fullscreen) {
        sendVimeoCommand("setMuted", false);
        sendVimeoCommand("setVolume", 1);
        sendVimeoCommand("play");
      } else {
        sendVimeoCommand("setMuted", true);
        sendVimeoCommand("play");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      resizeObserver.disconnect();
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    const container = videoContainerRef.current;
    if (!video || !container) return;

    sendVimeoCommand("setMuted", false);
    sendVimeoCommand("setVolume", 1);
    sendVimeoCommand("play");

    if (container.requestFullscreen) container.requestFullscreen();
    else if ((container as any).webkitRequestFullscreen) (container as any).webkitRequestFullscreen();
  };

  return (
    <div className="w-full bg-sellf-surface overflow-hidden">
      <link rel="preconnect" href="https://player.vimeo.com" />
      <link rel="preconnect" href="https://i.vimeocdn.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://f.vimeocdn.com" crossOrigin="anonymous" />
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
            ref={videoContainerRef}
            type="button"
            onMouseEnter={handleVideoMouseEnter}
            onMouseLeave={() => setVideoExpanded(false)}
            onClick={handleVideoClick}
            className={`group z-20 w-full min-h-[460px] md:min-h-[650px] overflow-hidden bg-black text-left will-change-[width] lg:absolute lg:inset-y-0 lg:right-0 transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${videoExpanded ? "lg:w-full" : "lg:w-[58%]"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
          >
            <img
              src="https://cdn.sellfmedia.workers.dev/statics/video-screnshot.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <iframe
              ref={videoRef}
              src={heroVideo}
              title="Sellf Media showreel"
              loading="eager"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={ensureVideoPlaying}
              style={videoFrameStyle}
              className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0 transition-[transform,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${isFullscreen ? "scale-100 grayscale-0 contrast-[1.05]" : videoExpanded ? "scale-[1.012] grayscale-0 contrast-[1.05]" : "scale-100 grayscale-[14%] contrast-[1.03]"}`}
            />

            <div className={`absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/16 transition-opacity duration-500 ${isFullscreen ? "opacity-0" : videoExpanded ? "opacity-45" : "opacity-100"}`} />
            <div className={`absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/32 to-transparent transition-opacity duration-300 ${isFullscreen ? "opacity-0" : "opacity-100"}`} />

            <motion.div
              className={`absolute left-6 md:left-10 bottom-6 md:bottom-10 rounded-full border border-white/18 bg-black/22 backdrop-blur-xl px-4 py-2 text-[9px] uppercase tracking-[.18em] text-white/78 shadow-[0_10px_35px_rgba(0,0,0,.16)] ${isFullscreen ? "pointer-events-none" : ""}`}
              animate={{ opacity: isFullscreen ? 0 : videoExpanded ? 0.94 : 0.78, y: videoExpanded && !isFullscreen ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {t.videoBtn} ↗
            </motion.div>
          </motion.button>
        </div>
      </section>

      <section className="bg-[#0c0e0e] text-white border-y border-white/[.08]">
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

      <HomeLogoStrips />

      <HomeWorkServices />
      <Ecosystem />
      <ProcessEngine />
      <VisionaryQuote />
      <CallToAction />
    </div>
  );
}
