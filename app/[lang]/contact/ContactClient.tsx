"use client";

import { useParams } from "next/navigation";

const dict = {
  tr: {
    kicker: "Küresel Merkez",
    title: "Büyümenizi \nTasarlayalım.",
    desc: "İster operasyonlarınızı ölçeklendirmek ister pazardaki varlığınızı yeniden tanımlamak isteyin, ekibimiz göreve hazır.",
    whatsappTitle: "WhatsApp",
    emailTitle: "E-posta Gönderin",
    officeTitle: "Genel Merkez",
    location: "İstanbul, Türkiye"
  },
  en: {
    kicker: "Global Headquarters",
    title: "Let's Engineer \nYour Growth.",
    desc: "Whether you are looking to scale your operations or redefine your market presence, our team is ready to deploy.",
    whatsappTitle: "WhatsApp",
    emailTitle: "Email Us",
    officeTitle: "Headquarters",
    location: "Istanbul, Turkey"
  }
};

export default function ContactClient() {
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  const cards = [
    { title: t.whatsappTitle, value: "+90 535 013 16 78", href: "https://wa.me/905350131678", external: true, mark: "01" },
    { title: t.emailTitle, value: "team@sellfmedia.com", href: "mailto:team@sellfmedia.com", external: false, mark: "02" },
    { title: t.officeTitle, value: t.location, href: "https://share.google/6RbD4yrxAQ1WxM4E8", external: true, mark: "03" },
  ];

  return (
    <main className="bg-[#0b0d0d] text-white pt-24 md:pt-28 min-h-screen">
      <div className="sellf-container grid lg:grid-cols-[.9fr_1.1fr] border-x border-white/10">
        <section className="min-h-[610px] p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
          <p className="sellf-kicker text-white/38">{t.kicker}</p>
          <div>
            <h1 className="sellf-display text-5xl md:text-7xl lg:text-[5.4rem] whitespace-pre-line max-w-[10ch]">{t.title}</h1>
            <p className="mt-8 max-w-md text-sm md:text-base leading-relaxed text-white/58">{t.desc}</p>
          </div>
        </section>

        <section className="relative min-h-[500px] lg:min-h-[610px] overflow-hidden bg-black">
          <img src="https://ik.imagekit.io/u05ccie5m/PHOTO-2024-02-17-18-12-56_rivsmc.jpg" alt="Sellf Media Team" className="absolute inset-0 h-full w-full object-cover grayscale contrast-105 opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        </section>
      </div>

      <div className="sellf-container grid md:grid-cols-3 border-l border-t border-white/10">
        {cards.map((card) => (
          <a key={card.mark} href={card.href} target={card.external ? "_blank" : undefined} rel={card.external ? "noopener noreferrer" : undefined} className="group min-h-[220px] p-6 md:p-8 border-r border-b border-white/10 flex flex-col justify-between hover:bg-white/[.035] transition-colors">
            <div className="flex justify-between items-start"><span className="text-[9px] text-white/30">{card.mark}</span><span className="text-white/35 group-hover:text-white transition-colors">↗</span></div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-[-.04em]">{card.title}</h2>
              <p className="mt-2 text-xs md:text-sm text-white/48">{card.value}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
