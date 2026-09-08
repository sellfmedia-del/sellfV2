"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation"; // 1. Dil Radarı Eklendi
import { getCalApi } from "@calcom/embed-react";

// YENİ: GA4 Olay Tetikleyicisi
import { sendGAEvent } from '@next/third-parties/google';

// Mesaj Sözlüğü
const dict = {
  tr: {
    default: "Hemen bizimle bir toplantı planlayabilirsiniz!",
    msg1: "Sizin projeniz de burada yer alabilir!",
    msg2: "Daha fazla detay için bir görüşme ayarlayalım",
    msg3: "Hangi birini anlatsak?",
    msg4: "Şu ana kadar herhangi bir sorunuz var mı?",
    msg5: "Prensipleri olan bir ajans mı?",
    msg6: "Evet, o gördüğünüz reklam muhtemelen bizdik",
    msg7: "Hemen bizimle bir toplantı planlayabilirsiniz!"
  },
  en: {
    default: "you can book a meeting with us right away!",
    msg1: "your project can be here as well!",
    msg2: "let's set up a meeting for more detail",
    msg3: "which one to tell?",
    msg4: "do you have any questions so far?",
    msg5: "an agency with principles?",
    msg6: "yeah, that ad you saw was probably us",
    msg7: "you can book a meeting with us right away!"
  }
};

export default function StickyLogo() {
  // Dil Seçimi
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  const [message, setMessage] = useState(t.default);

  // Cal.com Entegrasyonu
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"sellf-introduction"});
      cal("ui", {
        "theme": "dark",
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

  // Kaydırma Takibi: Hassas Algoritma
  useEffect(() => {
    const handleScroll = () => {
      const mappings = [
        { selector: '.home-hero', msg: t.msg1 }, // Hero
        { selector: '.home-work', msg: t.msg2 }, // Bento
        { selector: '.home-ecosystem', msg: t.msg3 }, // Ecosystem
        { selector: '.home-process', msg: t.msg4 }, // Process
        { selector: '.home-visionary', msg: t.msg5 }, // Visionary
        { selector: '.home-logos', msg: t.msg6 }, // Logofolio
        { selector: '.home-cta', msg: t.msg7 }, // CTA
      ];

      const viewMid = window.innerHeight / 2;
      let detectedMsg = mappings[0].msg;

      for (let i = mappings.length - 1; i >= 0; i--) {
        const item = mappings[i];
        const el = document.querySelector(item.selector);
        
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewMid && rect.bottom >= viewMid) {
            detectedMsg = item.msg;
            break;
          }
        }
      }
      setMessage(detectedMsg);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentLang, t]); // currentLang değiştikçe algoritmayı yenile

  // BÜYÜME MÜHENDİSLİĞİ: Toplantı niyeti sinyali (cal.com ile entegre tıklama)
  const handleMeetingIntent = () => {
    sendGAEvent('event', 'meeting_booked', { source: 'sticky_logo' });
  };

  return (
    // Z-INDEX DÜŞÜRÜLDÜ: z-[9999] yerine z-[9980] yapıldı
    <div className="fixed bottom-[82px] md:bottom-[92px] right-4 md:right-7 z-[9980] flex flex-col items-end gap-2 pointer-events-none">
      {/* Konuşma Baloncuğu */}
      <div 
        className="bg-[#0b0d0d]/94 backdrop-blur-xl text-white/72 px-4 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,.22)] text-[10px] md:text-xs font-medium max-w-[210px] text-right border border-white/12 pointer-events-auto transition-all duration-300"
        style={{ opacity: message ? 1 : 0 }}
      >
        {message}
      </div>

      {/* Şeffaf 3D Logo Butonu */}
      <button
        onClick={handleMeetingIntent} // Tıklama ölçümü buraya eklendi
        data-cal-namespace="sellf-introduction"
        data-cal-link="sellf-media-in7uaw/sellf-introduction"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
        className="pointer-events-auto h-12 w-12 rounded-full bg-[#0b0d0d] border border-white/15 overflow-hidden flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 outline-none shadow-[0_10px_35px_rgba(0,0,0,.25)]"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <Image
          src="https://cdn.sellfmedia.workers.dev/statics/fun-3d-cartoon-illustration-chicken-superhero.png"
          alt="Sellf Logo"
          width={52}
          height={52}
          className="object-contain grayscale"
          unoptimized
        />
      </button>
    </div>
  );
}