"use client";

import { useParams } from "next/navigation";
import { sendGAEvent } from '@next/third-parties/google';

const dictionary = {
  tr: {
    kicker: "Son Adım",
    headlinePart1: "Tahmin Etmeyi Bırakın.",
    headlinePart2: "Ölçeklenmeye Başlayın.",
    valProp1: "Ücretsiz 15 dakikalık bir",
    valPropStrong: "Büyüme Denetimi",
    valProp2: "planlayın. SellfScale motoruyla güçlendirilmiş markanızın gerçek büyüme hızını keşfedin.",
    btnText: "Ücretsiz Denetiminizi Talep Edin"
  },
  en: {
    kicker: "The Final Step",
    headlinePart1: "Stop Guessing.",
    headlinePart2: "Start Scaling.",
    valProp1: "Book a complimentary 15-minute",
    valPropStrong: "Growth Audit",
    valProp2: ". Discover your brand's true growth velocity powered by the SellfScale engine.",
    btnText: "Claim Your Free Audit"
  }
};

export default function CallToAction() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dictionary[currentLang];

  const handleTallyClick = () => {
    sendGAEvent('event', 'tally_form_click', { source: 'footer_cta' });
  };

  return (
    <section className="home-cta relative overflow-hidden bg-[#0b0d0d] text-white py-16 md:py-24">
      <div className="absolute inset-0 opacity-30">
        <img src="https://cdn.sellfmedia.workers.dev/statics/IMG_1444_edited.jpg" alt="" className="w-full h-full object-cover grayscale" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d0d] via-[#0b0d0d]/95 to-[#0b0d0d]/55" />
      <div className="sellf-container relative z-10 grid lg:grid-cols-[1.2fr_.8fr] gap-10 items-end">
        <div>
          <p className="sellf-kicker text-white/40 mb-6">{t.kicker}</p>
          <h2 className="sellf-display text-5xl md:text-7xl max-w-[12ch]">{t.headlinePart1}<br/><span className="text-white/60">{t.headlinePart2}</span></h2>
        </div>
        <div className="lg:pb-2">
          <p className="text-sm leading-relaxed text-white/60 max-w-md mb-7">{t.valProp1} <strong className="text-white font-semibold">{t.valPropStrong}</strong>{t.valProp2}</p>
          <a
            href="https://tally.so/r/44xE1o"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleTallyClick}
            className="sellf-btn-light"
          >
            {t.btnText} <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
