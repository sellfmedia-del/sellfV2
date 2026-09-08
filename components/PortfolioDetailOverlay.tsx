"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { PortfolioItem } from "@/data/portfolioData";
import { XMarkIcon } from "@heroicons/react/24/outline";

const dict = {
  tr: { endOfProject: "Proje Sonu — Sellf Media" },
  en: { endOfProject: "End of Project — Sellf Media" }
};

interface Props {
  item: PortfolioItem;
  onClose: () => void;
}

export default function PortfolioDetailOverlay({ item, onClose }: Props) {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];
  const isVideo = (url: string) => url.match(/\.(mp4|webm|mov|ogg)$/i);
  const title = typeof item.title === "string" ? item.title : item.title[currentLang];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#f1f0ec] overflow-y-auto"
    >
      <div className="sticky top-0 z-50 bg-[#f1f0ec]/94 backdrop-blur-xl border-b border-black/10">
        <div className="sellf-container h-20 flex items-center justify-between gap-6">
          <h2 className="text-base md:text-xl font-semibold tracking-[-.035em] truncate">{title}</h2>
          <button type="button" onClick={onClose} className="h-10 w-10 shrink-0 rounded-full bg-[#0b0d0d] text-white flex items-center justify-center hover:scale-105 transition-transform" aria-label="Close">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="sellf-container py-8 md:py-12">
        <motion.div layoutId={item.id} className="w-full bg-[#deddd8] border border-black/10 overflow-hidden mb-4">
          {item.type === "video" ? (
            <video src={item.url} autoPlay loop controls className="w-full h-auto max-h-[82vh] object-contain bg-black" />
          ) : (
            <Image src={item.url} alt={title} width={1800} height={1200} className="w-full h-auto object-contain" priority unoptimized />
          )}
        </motion.div>

        {item.gallery && item.gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {item.gallery.map((mediaUrl, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.4) }}
                className="bg-[#deddd8] border border-black/10 overflow-hidden"
              >
                {isVideo(mediaUrl) ? (
                  <video src={mediaUrl} muted loop autoPlay playsInline className="w-full h-auto object-contain" />
                ) : (
                  <Image src={mediaUrl} alt={`${title} — ${index + 1}`} width={1200} height={900} className="w-full h-auto object-contain" unoptimized />
                )}
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-14 pt-6 border-t border-black/10 text-[9px] uppercase tracking-[.2em] text-black/35">{t.endOfProject}</div>
      </div>
    </motion.div>
  );
}
