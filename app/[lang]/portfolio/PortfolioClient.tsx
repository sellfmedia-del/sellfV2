"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { portfolioData, PortfolioItem } from "@/data/portfolioData";
import PortfolioDetailOverlay from "@/components/PortfolioDetailOverlay";

type Category = "All" | "Samples" | "Designs" | "Content";

const dict = {
  tr: { label: "Portfolyo", heading: "Kanıtımız, ", headingSpan: "İşlerimizdir.", All: "Hepsi", Samples: "Marka Kitapları", Designs: "Tasarım & Kimlik", Content: "Estetik İçerik" },
  en: { label: "Portfolio", heading: "Our Proof, ", headingSpan: "Our Work.", All: "All", Samples: "Brandbooks", Designs: "Design & Identity", Content: "Aesthetic Content" }
};

export default function PortfolioClient() {
  const [filter, setFilter] = useState<Category>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];
  const displayItems = filter === "All" ? Object.values(portfolioData).flat() : portfolioData[filter as keyof typeof portfolioData];

  return (
    <main className="min-h-screen bg-[#f1f0ec] pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="sellf-container">
        <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-16 items-end mb-12">
          <div>
            <p className="sellf-kicker text-black/45 mb-5">{t.label}</p>
            <h1 className="sellf-display text-5xl md:text-7xl lg:text-8xl">{t.heading}<span className="text-black/35">{t.headingSpan}</span></h1>
          </div>
          <div className="hidden lg:block h-px bg-black/15 mb-2" />
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 border-y border-black/15 py-4 mb-8 md:mb-10">
          {(["All", "Samples", "Designs", "Content"] as Category[]).map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`text-[10px] font-semibold uppercase tracking-[.16em] transition-colors ${filter === cat ? "text-black" : "text-black/38 hover:text-black"}`}>
              {t[cat]} {filter === cat ? "•" : ""}
            </button>
          ))}
        </div>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {displayItems.map((item) => (
              <PortfolioCard key={item.id} item={item} currentLang={currentLang} onClick={() => setSelectedItem(item)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && <PortfolioDetailOverlay item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </main>
  );
}

function PortfolioCard({ item, onClick, currentLang }: { item: PortfolioItem; onClick: () => void; currentLang: "tr" | "en" }) {
  return (
    <motion.button
      type="button"
      layoutId={item.id}
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: .98 }}
      className="relative w-full text-left break-inside-avoid group overflow-hidden bg-[#deddd8] border border-black/10"
    >
      {item.type === "video" ? (
        <video src={item.url} muted loop autoPlay playsInline className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
      ) : (
        <Image src={item.url} alt={item.title[currentLang]} width={800} height={1200} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]" unoptimized />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-4 text-white">
        <h3 className="text-sm md:text-base font-semibold tracking-[-.02em]">{item.title[currentLang]}</h3>
        <span className="text-xs opacity-65">↗</span>
      </div>
    </motion.button>
  );
}
