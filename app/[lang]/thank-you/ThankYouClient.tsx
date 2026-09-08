"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // 1. Dil Radarı Eklendi

// 2. Sayfa Sözlüğü
const dict = {
  tr: {
    titlePart1: "Başlatma ",
    titlePart2: "Tamamlandı.",
    p1: "Zamanınızın mutlak değerinin farkındayız. Verileriniz artık sistemimizde ve ekibimiz büyüme altyapınızı analiz etmeye başladı bile.",
    p2: "Size basma kalıp bir ajans sunumuyla dönmeyeceğiz. Operasyonlarınız için özel olarak tasarlanmış, ölçülebilir ve kusursuz bir mühendislik planı bekleyin.",
    p3: "Aramıza hoş geldiniz. Kısa süre içinde iletişime geçeceğiz.",
    btnText: "Ana Sayfaya Dön"
  },
  en: {
    titlePart1: "Initiation ",
    titlePart2: "Complete.",
    p1: "We recognize the absolute value of your time. Your data is now in our system, and our team has already begun analyzing your growth infrastructure.",
    p2: "We will not return to you with a boilerplate agency pitch. Expect a measurable, seamlessly integrated engineering plan designed specifically for your operations.",
    p3: "Welcome to the fold. We will be in touch shortly.",
    btnText: "Return to Home"
  }
};

export default function ThankYouClient() {
  const [isVisible, setIsVisible] = useState(false);

  // 3. Dil Seçimi
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full flex-grow min-h-[72vh] flex items-center justify-center bg-[#f1f0ec] px-6 relative pt-24">
      <div 
        className={`max-w-3xl w-full text-center transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Sellf estetiğine uygun endüstriyel ince bir çizgi */}
        <div className="w-12 h-px bg-black/30 mx-auto mb-10"></div>

        <h1 className="sellf-display text-5xl md:text-7xl text-black mb-8">
          {t.titlePart1}<span className="text-black/38">{t.titlePart2}</span>
        </h1>

        <div className="space-y-6 text-lg md:text-xl text-sellf-grey font-medium leading-relaxed mb-12">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p className="text-sellf-black font-bold pt-4">
            {t.p3}
          </p>
        </div>

        <Link 
          href={`/${currentLang}`} // Ana sayfaya dönerken dili koruyoruz
          className="sellf-btn-dark"
        >
          {t.btnText}
        </Link>
      </div>
    </div>
  );
}