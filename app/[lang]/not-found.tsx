"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation'; // 1. Dil Radarı Eklendi

// 2. Sözlük Eklendi
const dict = {
  tr: {
    status: "Durum 404",
    h1Part1: "Aradığınız şey burada değil,",
    h1Part2: "muhtemelen gelecekte.",
    quote: "\"Kaybolmadınız, sadece hızımıza yetişemediniz.\"",
    backHome: "Ana Sayfaya Dön",
    whyHere: "Neden buradasınız?",
    reasons: [
      "Link bozuk olabilir.",
      "Yazım yanlışı yapmış olabilirsiniz.",
      "Biz bu sayfayı çoktan SellfScale ile optimize edip kaldırdık."
    ],
    timeWaste: "Vaktinizi boşa harcamayalım.",
    expertise: "Uzmanlık",
    growthServices: "Büyüme Hizmetleri",
    cases: "Vakalar",
    portfolio: "Portfolyo Özetleri"
  },
  en: {
    status: "Status 404",
    h1Part1: "What you seek is not here,",
    h1Part2: "probably in the future.",
    quote: "\"You are not lost, you just couldn't keep up with our speed.\"",
    backHome: "Return Home",
    whyHere: "Why are you here?",
    reasons: [
      "The link might be broken.",
      "There might be a typo.",
      "We already optimized and removed this page with SellfScale."
    ],
    timeWaste: "Let's not waste your time.",
    expertise: "Expertise",
    growthServices: "Growth Services",
    cases: "Cases",
    portfolio: "Portfolio Highlights"
  }
};

export default function NotFound() {
  // 3. Dil Seçimi
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];
  const langPrefix = `/${currentLang}`;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black font-sans">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-50 blur-[15px]"
        >
          <source src="https://res.cloudinary.com/dimiddzif/video/upload/f_auto,q_auto/v1772712625/Horozlu_Prestijli_Adam%C4%B1n_Daveti_r7ttcx.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Bento Grid İçerik Katmanı */}
      <div className="relative z-10 grid h-screen w-full grid-cols-1 md:grid-cols-10 gap-2 p-2">
        
        {/* SOL ÜST (%60) */}
        <div className="md:col-span-6 flex flex-col justify-end p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 group overflow-hidden">
          <span className="text-zinc-400 text-sm font-bold uppercase tracking-[0.4em] mb-4">{t.status}</span>
          <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
            {t.h1Part1} <br />
            <span className="text-zinc-500 italic">{t.h1Part2}</span>
          </h1>
        </div>

        {/* SAĞ ÜST (%40) */}
        <div className="md:col-span-4 flex flex-col justify-between p-8 md:p-12 rounded-3xl bg-zinc-950 border border-white/5">
          <p className="text-xl md:text-2xl font-medium text-white leading-snug">
            {t.quote}
          </p>
          <Link 
            href={langPrefix} 
            className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-5 text-black font-bold transition-all hover:pr-12 active:scale-95"
          >
            {t.backHome}
            <span className="absolute right-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">→</span>
          </Link>
        </div>

        {/* SOL ALT (%40) */}
        <div className="md:col-span-4 p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
          <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">{t.whyHere}</h3>
          <ul className="space-y-6">
            {t.reasons.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-zinc-400 font-medium">
                <span className="text-white/20 font-mono">0{i+1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* SAĞ ALT (%60) */}
        <div className="md:col-span-6 p-8 md:p-12 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/5 flex flex-col justify-between">
          <h3 className="text-2xl font-bold text-white mb-6">{t.timeWaste}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Link href={`${langPrefix}/services`} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300">
              <div className="text-xs uppercase tracking-widest mb-2 opacity-60">{t.expertise}</div>
              <div className="font-bold">{t.growthServices}</div>
            </Link>
            <Link href={`${langPrefix}/portfolio`} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all duration-300">
              <div className="text-xs uppercase tracking-widest mb-2 opacity-60">{t.cases}</div>
              <div className="font-bold">{t.portfolio}</div>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-8">
            <div className="flex gap-4">
               <div className="h-2 w-2 rounded-full bg-[#4fbfa0] animate-pulse" />
               <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest underline underline-offset-4 cursor-pointer">sellfmedia.com</span>
            </div>
            <span className="text-zinc-600 font-mono text-xs">©2026 Sellf Media</span>
          </div>
        </div>

      </div>
    </main>
  )
}