"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

const dict = {
  tr: {
    subtitle: "Doğuş",
    title: "Yolculuğumuz.",
    boldIntro: "Sellf, üç kişinin emeği ve bir kişinin tavizsiz idealleriyle dövüldü.",
    history: "P&G, Unilever, Coca-Cola ve Hummel gibi kurumsal devlerin küresel operasyonlarına öncülük eden genç ekibimiz, sektörün karanlık yüzünden yorulmuştu. Tek bir emirle birleştik:",
    mission: "\"Boşa harcanan zaman, verimsizlik, anlamsız metrikler ve sıfır şeffaflıkla tanımlanan bir pazarlama sektörünü ortadan kaldırmak. Sürdürülebilir, güven temelli sistemler aracılığıyla gerçek büyümeyi ve ölçeklenmeyi inşa etmek.\"",
    smeSupport: "Agresif ölçeğimize rağmen kapılarımızı hiçbir zaman KOBİ'lere kapatmadık. Sektör dogmalarına dayanarak milyon dolarlık bütçeleri körü körüne yakmayı reddettik.",
    strongSupport: "Markalarımızın başarısını, bizzat kendilerinden daha şiddetli savunduk.",
    today: "Bugün büyümemizin büyüklüğü; vizyonumuzdan, şeffaflığımızdan ve temel ideallerimizden asla ödün vermememizin saf bir sonucudur."
  },
  en: {
    subtitle: "The Genesis",
    title: "Our Journey.",
    boldIntro: "Sellf was forged by the effort of three individuals and the uncompromising ideals of one.",
    history: "Having spearheaded global operations for corporate giants like P&G, Unilever, Coca-Cola, and Hummel, our young team grew exhausted by the industry's dark underbelly. We united with a singular directive:",
    mission: "\"To dismantle a marketing sector defined by wasted time, inefficiency, meaningless vanity metrics, and zero transparency. To engineer genuine growth and scale through sustainable, trust-based systems.\"",
    smeSupport: "Despite our aggressive scale, we never shut our doors to SMEs. We refused to blindly burn through million-dollar budgets based on industry dogmas.",
    strongSupport: "We championed our brands' success more fiercely than they did themselves.",
    today: "Today, the magnitude of our growth is purely the result of never compromising our vision, our transparency, and our core ideals."
  }
};

export default function OurJourney() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  return (
    <section className="bg-[#0b0d0d] text-white border-b border-white/10">
      <div className="sellf-container grid lg:grid-cols-[.75fr_1.25fr] border-x border-white/10">
        <div className="relative min-h-[520px] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
          <Image src="https://cdn.sellfmedia.workers.dev/statics/ourjourney.jpg" alt="Sellf Media Journey Background" fill className="object-cover grayscale opacity-65" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
            <p className="sellf-kicker text-white/45">{t.subtitle}</p>
            <h2 className="sellf-display text-5xl md:text-7xl max-w-[9ch]">{t.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-10 lg:p-14 xl:p-16">
          <p className="text-2xl md:text-4xl font-semibold tracking-[-.04em] leading-tight mb-10">{t.boldIntro}</p>
          <div className="space-y-8 text-sm md:text-base leading-relaxed text-white/58">
            <p>{t.history}</p>
            <blockquote className="border-y border-white/12 py-8 text-lg md:text-2xl text-white/85 tracking-[-.02em] leading-snug">{t.mission}</blockquote>
            <p>{t.smeSupport} <strong className="text-white font-semibold">{t.strongSupport}</strong></p>
            <p>{t.today}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
