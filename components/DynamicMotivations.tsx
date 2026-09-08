"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation"; // 1. Dil Radarı Eklendi

// Yardımcı Tip
type LocalizedString = { tr: string; en: string };

export default function DynamicMotivations() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // 2. Dil Seçimi
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";

  // 3. Veri Bloğu (İkiz Veri Formatı)
  const blocks: {
    id: number;
    align: string;
    title: LocalizedString;
    text: LocalizedString;
    image: string;
  }[] = [
    {
      id: 1,
      align: "right", // Sağa asılı
      title: { 
        tr: "Neden Buradasınız?", 
        en: "Why Are You Here?" 
      },
      text: { 
        tr: "Çünkü zamanınız ve emeğiniz paha biçilemez. İçi boş başarı hikayeleri ve gösterişli ama etkisiz tasarımlar sunan ajanslarla çalışmayı reddediyorsunuz. Size özel stratejiler inşa eden; karlılığınızı, sürdürülebilirliğinizi ve büyümenizi gerçekten önemseyen bir partner arıyorsunuz. Ve biz, kendi büyümemizin markalarımızın büyümesine sıkı sıkıya bağlı olduğunu çok iyi biliyoruz.", 
        en: "Because your time and effort are invaluable. You refuse to work with agencies that offer hollow success stories and flashy but ineffective designs. You are looking for a partner who builds tailored strategies and genuinely cares about your profitability, sustainability, and growth. And we know perfectly well that our growth is strictly tied to the growth of our brands." 
      },
      image: "https://cdn.sellfmedia.workers.dev/statics/IMG_1444_edited.jpg"
    },
    {
      id: 2,
      align: "left", // Sola asılı
      title: { 
        tr: "MİSYON VE VİZYONUMUZ", 
        en: "OUR MISSION & VISION" 
      },
      text: { 
        tr: "Sellf, 'az çoktur' (less is more) prensibiyle hareket eder. Modern pazarlamanın sansasyon ve gösteriş takıntısının ortasında, biz verimlilik ve sürdürülebilirliğe öncelik veriyoruz. Amacımız; veri odaklı pazarlama aracılığıyla sermaye, zaman ve efor israfını en aza indirmek, böylece marka değerini ve yatırım getirisini maksimize etmektir. Teknoloji, sanat ve ölçeklenebilir büyümenin kesiştiği o noktada; Sellf'in vizyonu parlar.", 
        en: "Sellf operates on the principle of 'less is more'. Amidst modern marketing's obsession with sensation and vanity, we prioritize efficiency and sustainability. Our objective is to minimize the waste of capital, time, and effort through data-driven marketing, thereby maximizing brand equity and return on investment. At the intersection of technology, art, and scalable growth, the vision of Sellf shines." 
      },
      image: "https://cdn.sellfmedia.workers.dev/statics/ekip_foto.jpg"
    }
  ];

  return (
    <section className="bg-[#f1f0ec] py-20 md:py-28 border-b border-black/10">
      <div className="sellf-container grid gap-4 lg:grid-cols-2">
        {blocks.map((block) => {
          const isHovered = hoveredId === block.id;
          return (
            <article
              key={block.id}
              onMouseEnter={() => setHoveredId(block.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative min-h-[470px] md:min-h-[560px] overflow-hidden border border-black/15 bg-[#dddcd7]"
            >
              <Image src={block.image} alt={block.title[currentLang]} fill className={`object-cover grayscale transition-all duration-700 ${isHovered ? 'scale-[1.02] opacity-70' : 'opacity-55'}`} unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />
              <div className="absolute inset-0 p-6 md:p-9 flex flex-col justify-between text-white">
                <div className="flex justify-between gap-4 text-[9px] uppercase tracking-[.2em] text-white/48"><span>0{block.id}</span><span>Sellf</span></div>
                <div>
                  <h2 className="sellf-display text-4xl md:text-6xl max-w-[11ch]">{block.title[currentLang]}</h2>
                  <div className={`grid transition-all duration-500 ${isHovered ? 'md:grid-rows-[1fr] md:opacity-100 md:mt-6' : 'md:grid-rows-[0fr] md:opacity-0 md:mt-0'} grid-rows-[1fr] opacity-100 mt-6`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl text-sm md:text-base leading-relaxed text-white/68">{block.text[currentLang]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}