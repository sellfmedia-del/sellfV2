"use client";

import Image from "next/image";
import { useParams } from "next/navigation"; // 1. Dil Radarı Eklendi

// Yardımcı Tip
type LocalizedString = { tr: string; en: string };

export default function Testimonials() {
  // 2. Dil Seçimi
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";

  // Sabit Metin Sözlüğü
  const dict = {
    tr: { subtitle: "Bizi en iyi tanıyanlardan dinleyin" },
    en: { subtitle: "Hear from the ones who know us best" }
  };

  const testimonials: {
    id: number;
    text: LocalizedString;
    author: string;
    company: LocalizedString;
    logos: string[];
  }[] = [
    {
      id: 1,
      text: {
        tr: "Sellf'in bakış açısı sadece hizmet sunmanın çok ötesinde. İşin neredeyse her aşamasına entegre oluyorlar ve yarattıkları büyümenin basit sosyal medya veya reklam metriklerinin ötesine geçmesi gerektiğinin tamamen bilincindeler.",
        en: "Sellf's perspective extends far beyond mere service delivery. They integrate into almost every aspect of the business, fully aware that the growth they generate must transcend simple social media or advertising metrics."
      },
      author: "Abdülkadir K.",
      company: { tr: "Sanko & ASCE GYO", en: "Sanko & ASCE GYO" },
      logos: ["https://cdn.sellfmedia.workers.dev/essentials/logoasce.png"],
    },
    {
      id: 2,
      text: {
        tr: "Sistemli ve son derece programlı yaklaşımları başarılarının temelidir. Kampanya mimarilerinden detaylı bütçe planlamasına kadar yıllık yol haritalarımızı inşa ettiler. Her adımda kesintisiz iletişim kurarak gelir ve kar marjlarını doğru tahmin ettiler ve bu projeksiyonları tutarlı bir şekilde gerçekleştirdiler.",
        en: "Their systematic and highly programmed approach is the root of their success. From campaign architectures to granular budget planning, they engineered our annual roadmaps. They maintained seamless communication at every step, accurately forecasting revenue and profit margins, and consistently delivering on those projections."
      },
      author: "Cenk Ç.",
      company: { tr: "Gülsoylar & Fundora", en: "Gülsoylar & Fundora" },
      logos: [
        "https://cdn.sellfmedia.workers.dev/essentials/logofundora.png",
      ],
    },
    {
      id: 3,
      text: {
        tr: "Marka kimliğini derinlemesine anlayan ve gerçek bir kavrayış olmadan hareket etmeyi reddeden veri odaklı bir ekip. Dışarıdan alınan bir hizmet gibi değil; kendi iç ekibinizin bir parçası gibi çalışıyorlar.",
        en: "A data-driven team that deeply understands brand identity and refuses to act without true comprehension. They do not feel like an outsourced service; they operate as an extension of your own internal team."
      },
      author: "Murat Y.",
      company: { tr: "Inwest Group", en: "Inwest Group" },
      logos: ["https://cdn.sellfmedia.workers.dev/essentials/logoinwest.png"],
    },
    {
      id: 4,
      text: {
        tr: "Markamızın başlangıcından itibaren; marka kitabı oluşturma, iş ortaklıkları, kurumsal kimlik ve hatta lojistik ve muhasebe entegrasyonları dahil olmak üzere her operasyonel katmanda büyüme rotamızı yönettiler. Ortak oldukları markaları gerçekten sahiplenen, son derece uzmanlaşmış bir ekip.",
        en: "From our brand's inception, they steered our growth trajectory across every operational layer—including brandbook creation, partnerships, corporate identity, and even logistics and accounting integrations. A highly specialized team that takes genuine ownership of the brands they partner with."
      },
      author: "Ümit B.",
      company: { tr: "Qashe & Zühre Ana", en: "Qashe & Zühre Ana" },
      logos: ["https://cdn.sellfmedia.workers.dev/essentials/logozuhre.png"],
    },
    {
      id: 5,
      text: {
        tr: "Henüz bir anlaşma imzalamadan önce bile stratejik danışmanlıklarını alıyorduk. Gerçek büyümeyi inşa etmek için geleneksel ticari ilişkilerin ötesine geçen bir destek sağlıyorlar. Vizyonlarının en nihayetinde küresel ölçekte pazarlama paradigmasını yeniden şekillendirmesini umuyoruz.",
        en: "We were receiving their strategic counsel even before signing an agreement. They provide support that transcends conventional commercial relationships to engineer true growth. We hope their vision ultimately reshapes the marketing paradigm on a global scale."
      },
      author: "Cemile Hanım",
      company: { tr: "Trio", en: "Trio" },
      logos: ["https://cdn.sellfmedia.workers.dev/essentials/logotrio.png"],
    },
    {
      id: 6,
      text: {
        tr: "Büyüme yolculuğunuzu en az kendimizinki kadar ilgi ve hayranlıkla izledik. Zamanla Sellf, kaliteli hizmet sunan bir ekipten; büyümenin gerçek mekaniklerini anlayan, geleneksel pazarlamanın kapsamının çok ötesindeki süreçleri ve ekipleri yönetebilen kapsamlı bir sisteme dönüştü.",
        en: "We have watched your growth journey with as much interest and admiration as our own. Over time, Sellf has evolved from a team delivering quality service into a comprehensive system that understands the true mechanics of growth, capable of managing processes and teams far beyond the scope of traditional marketing."
      },
      author: "Zeynep Hanım",
      company: { tr: "Renault", en: "Renault" },
      logos: ["https://cdn.sellfmedia.workers.dev/essentials/logorenaul.png"],
    },
  ];

  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-[#f1f0ec] py-20 md:py-28 border-b border-black/10 overflow-hidden">
      <div className="sellf-container mb-10 md:mb-14">
        <div className="flex items-end justify-between gap-8 border-b border-black/15 pb-5">
          <h4 className="sellf-kicker text-black/45">{dict[currentLang].subtitle}</h4>
        </div>
      </div>

      <div className="flex w-max sellf-testimonials-marquee hover:[animation-play-state:paused]">
        {loopedTestimonials.map((item, index) => (
          <article key={`${item.id}-${index}`} className="w-[88vw] sm:w-[520px] lg:w-[600px] flex-shrink-0 border-r border-black/12 px-6 md:px-9 min-h-[330px] flex flex-col justify-between">
            <p className="text-lg md:text-2xl font-medium leading-[1.45] tracking-[-.025em] text-black/82">“{item.text[currentLang]}”</p>
            <div className="mt-10 pt-5 border-t border-black/12 flex items-end justify-between gap-6">
              <div>
                <div className="text-sm font-semibold">{item.author}</div>
                <div className="mt-1 text-[9px] uppercase tracking-[.16em] text-black/42">{item.company[currentLang]}</div>
              </div>
              {item.logos.length > 0 && (
                <div className="flex gap-3 items-center">
                  {item.logos.map((logo, logoIndex) => (
                    <div key={logoIndex} className="relative h-10 w-24 grayscale opacity-55 mix-blend-multiply">
                      <Image src={logo} alt={`${item.company[currentLang]} logo`} fill className="object-contain object-right-bottom" unoptimized />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sellfTestimonials { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .sellf-testimonials-marquee { animation: sellfTestimonials 86s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .sellf-testimonials-marquee { animation: none; } }
      `}} />
    </section>
  );
}