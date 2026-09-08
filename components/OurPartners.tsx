"use client";

import Image from "next/image";
import { useParams } from "next/navigation"; // 1. Dil Radarı Eklendi

// Sözlük Eklendi
const dict = {
  tr: { title: "Partnerlerimiz" },
  en: { title: "Our Partners" }
};

export default function OurPartners() {
  // Dil Seçimi
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  const logos = [
    "https://cdn.sellfmedia.workers.dev/essentials/wixpartnerlogo.png",
    "https://cdn.sellfmedia.workers.dev/essentials/parkpaletpartnerlogo.png",
    "https://cdn.sellfmedia.workers.dev/essentials/metapartnerlogo.png",
    "https://cdn.sellfmedia.workers.dev/essentials/googlepartnerlogo.png",
    "https://cdn.sellfmedia.workers.dev/essentials/ikaspartnerlogo.png",
  ];

  // Kesintisiz akış için logoları birkaç kez çoğaltıyoruz ki ekranı tam kaplasın ve bitmesin
  const loopedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full bg-[#f1f0ec] py-10 md:py-14 overflow-hidden border-b border-black/10">
      
      {/* İnce Çizgili Minimalist Başlık */}
      <div className="sellf-container mb-8 flex items-center gap-6">
        <h4 className="sellf-kicker text-black/40 whitespace-nowrap">
          {t.title}
        </h4>
        <div className="h-px w-full bg-black/10"></div>
      </div>

      {/* Marquee Alanı (Soldan Sağa Akış) */}
      <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] transition-all">
        {loopedLogos.map((logo, index) => (
          <div
            key={index}
            className="w-[180px] md:w-[220px] h-20 flex-shrink-0 flex items-center justify-center px-6 border-r border-black/10"
          >
            {/* Logolar varsayılan olarak gri ve saydam. Hover olunca renklenir. */}
            <div className="relative h-9 md:h-11 w-full grayscale opacity-45 mix-blend-multiply transition-all duration-500 hover:grayscale-0 hover:opacity-100">
              <Image
                src={logo}
                alt={`Partner Logo ${index}`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>

      {/* Soldan Sağa (Reverse) animasyon için özel keyframe */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
      `}} />
    </div>
  );
}