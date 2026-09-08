"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
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

const ease = [0.22, 1, 0.36, 1] as const;

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

      <section className="home-hero relative bg-[#0b0d0d] text-white pt-24 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,.055),transparent_32%)]" />
        <div className="sellf-container relative grid lg:grid-cols-[.84fr_1.16fr]">
          <div className="min-h-[560px] md:min-h-[650px] px-5 py-16 md:px-10 md:py-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[.07]">
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

          <motion.button
            type="button"
            onClick={handleVideoClick}
            className="group relative min-h-[460px] md:min-h-[650px] overflow-hidden text-left"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.15, delay: 0.12, ease }}
          >
            <video
              ref={videoRef}
              src="https://cdn.sellfmedia.workers.dev/videos/website_main_video.mp4"
              poster="https://cdn.sellfmedia.workers.dev/statics/video-screnshot.png"
              autoPlay loop muted playsInline
              className="absolute inset-0 h-full w-full object-cover grayscale-[14%] contrast-[1.03] transition-transform duration-[1600ms] ease-out group-hover:scale-[1.022]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/16" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/28 to-transparent" />
            <motion.div
              className="absolute left-6 md:left-10 bottom-6 md:bottom-10 rounded-full border border-white/18 bg-black/22 backdrop-blur-xl px-4 py-2 text-[9px] uppercase tracking-[.18em] text-white/78 shadow-[0_10px_35px_rgba(0,0,0,.16)]"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25 }}
            >
              {t.videoBtn} ↗
            </motion.div>
          </motion.button>
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
