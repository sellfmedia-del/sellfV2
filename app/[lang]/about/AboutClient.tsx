"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { founderQuoteImage1 } from "@/data/founderQuoteImage1";
import { founderQuoteImage2 } from "@/data/founderQuoteImage2";
import { founderQuoteImage3 } from "@/data/founderQuoteImage3";
import { founderQuoteImage4 } from "@/data/founderQuoteImage4";

const founderImage =
  "data:image/webp;base64," +
  founderQuoteImage1 +
  founderQuoteImage2 +
  founderQuoteImage3 +
  founderQuoteImage4;

const copy = {
  tr: {
    hero: {
      kicker: "Hakkımızda",
      title: "Sellf, pazarlamanın daha iyi görünmesi için değil, şirketlerin gerçekten büyümesi için kuruldu.",
      body:
        "Pazarlamanın gösterişli kampanyalardan, iyi hazırlanmış sunumlardan ve ticari karşılığı olmayan metriklerden ibaret olmadığına inanıyoruz. Bizim için pazarlama; finans ve insan kaynağıyla birlikte bir şirketin geleceğini belirleyen temel güçlerden biridir.",
      statement:
        "Büyümeyi şansa, yoruma veya gösteriye bırakmıyoruz. Onu bir sistem olarak kuruyoruz.",
      discover: "Keşfet",
      sideTop: "Ideas to profitability",
      sideBottom: ["Brands", "People", "Profit"],
      imageAlt: "Yiğit Konuk, Sellf Media Kurucusu ve CEO'su",
    },
    manifesto: {
      kicker: "Bir itirazdan doğdu",
      title: "Başarı gibi sunulan içi boş sonuçları reddediyoruz.",
      paragraphs: [
        "Sellf, Yiğit Konuk tarafından kuruldu. Kurumsal şirketlerde yöneticilik yapan ve ardından ajansların içinde çalışan Yiğit Konuk, pazarlama sektörünün hem müşteri hem de hizmet sağlayıcı tarafını yakından gözlemledi.",
        "Yüksek retainer bedelleri, iyi iş çıkarılmış gibi görünmek için hazırlanan raporlar, şirketin ticari performansına hiçbir katkı sağlamadığı halde başarı olarak sunulan metrikler ve arkasında kalıcı bir büyüme sistemi bırakmayan kampanyalar… Bu deneyimler Sellf'in kuruluş nedenini belirledi.",
        "Biz bir markanın bütçesini harcamayı, reklam platformlarında olumlu rakamlar göstermeyi veya geçici bir görünürlük yaratmayı tek başına başarı olarak kabul etmiyoruz.",
      ],
      statement:
        "İyi görünen sonuçlar değil, şirketi gerçekten ilerleten sonuçlar üretiyoruz.",
      imageAlt: "Sellf Media ekibi birlikte çalışırken",
    },
    team: {
      kicker: "Kurucu ekip",
      title: "Farklı disiplinlerden gelen, aynı büyüme problemine bakan bir ekip.",
      body:
        "Sellf'in kurucu ekibi; NMQ, McKinsey, WPP ve Eti dahil olmak üzere çok sayıda ulusal ve global şirkette deneyim kazanmış profesyonellerden oluşuyor. Yönetim danışmanlığının stratejik disiplini, global ajansların iletişim yetkinliği ve kurumsal şirketlerin operasyonel gerçekliği aynı yapı içinde buluşuyor.",
      credentials: [
        ["NMQ", "Strateji & Marka"],
        ["McKinsey", "Yönetim Danışmanlığı"],
        ["WPP", "Global İletişim"],
        ["Eti", "Kurumsal Operasyon"],
      ],
    },
    thesis: {
      kicker: "Bizim büyüme tezimiz",
      title: "Veriye dayanmayan hedef yalnızca hayaldir.",
      body:
        "Bir hedefin stratejiye dönüşebilmesi için gerçek verilere, finansal hesaplamalara, pazar bilgisine ve uygulanabilir bir yol haritasına dayanması gerekir. Bunlar olmadan hazırlanan plan strateji değil; yalnızca gerçekleşmesi istenen bir sonuçtur.",
      statement:
        "Strateji olmadan yapılan pazarlama, yalnızca şov ve israftır.",
      pillars: [
        ["01", "Pazar Payı", "Rekabet gücünün gerçek ölçüsü."],
        ["02", "Kârlılık", "Büyümenin ticari karşılığı."],
        ["03", "Verimli Büyüme", "Daha akıllı ve kalıcı ilerleme."],
      ],
      rail: ["Veri", "Strateji", "Uygulama", "Sonuç"],
    },
    operating: {
      kicker: "Büyüme sistemimiz",
      title: "İki ekip. Tek büyüme sistemi.",
      body:
        "Geleneksel yapılarda e-ticaret, marka, reklam ve satış farklı hedeflere bakar. Sellf'in Growth ve Operasyon ayrımı, bu parçalanmış yapıyı aynı ticari amaç altında birleştirir.",
      growth: {
        title: "Growth",
        sub: "Strateji · Yön · Denetim",
        items: ["Hedefleri netleştirir", "Pazarı ve veriyi analiz eder", "Yol haritasını kurar"],
      },
      operations: {
        title: "Operasyon",
        sub: "Uygulama · Hareket · Sonuç",
        items: ["Stratejiyi hayata geçirir", "Kanalları birlikte yönetir", "Performansı sürekli geliştirir"],
      },
      bridge: "Ortak veri · Ortak hedef",
      cta: "Growth & Operasyon Modelini İncele",
    },
    standards: {
      kicker: "BHS & RGI",
      title: "Pazarlamanın ortak dili.",
      body:
        "Pazarlamada başarı herkes tarafından farklı tanımlanıyor. BHS ve RGI, bu belirsizliğe verdiğimiz ilk sistematik cevaptır.",
      bhs: {
        name: "BHS",
        label: "Başlangıç Sağlığı",
        desc:
          "Markanın pazarlama, satış, veri, strateji ve operasyon altyapısındaki başlangıç noktasını belirler.",
        question: "Nereden başlıyoruz?",
        cta: "BHS'yi İncele",
      },
      rgi: {
        name: "RGI",
        label: "Gerçek Büyüme",
        desc:
          "Elde edilen büyümenin kârlılık, verimlilik, sürdürülebilirlik ve ölçeklenebilirlik üzerindeki etkisini ölçer.",
        question: "Gerçekten büyüyor muyuz?",
        cta: "RGI'ı İncele",
      },
    },
    vision: {
      kicker: "Daha büyük bir perspektif",
      title: "Pazarlamanın global standardını oluşturmak istiyoruz.",
      paragraphs: [
        "Finans, bankacılık, lojistik, üretim ve kalite yönetimi gibi alanlarda ortak kabul gören kurallar, performans kriterleri ve denetim mekanizmaları bulunur. Pazarlama ise henüz aynı olgunluk seviyesine ulaşmış değil.",
        "Sellf'in uzun vadeli vizyonu bu boşluğu doldurmaktır. Pazarlama faaliyetlerinin nasıl ölçülmesi, değerlendirilmesi ve denetlenmesi gerektiğini belirleyen; metodolojisi farklı şirketler ve uzmanlar tarafından uygulanabilen global bir standart kurumu olmayı hedefliyoruz.",
      ],
      points: ["Daha açık", "Daha adil", "Daha ölçülebilir", "Daha etkili"],
      statement:
        "Bir standardın gerçek gücü, bütün bir ekosistemin onu kullanmaya başlamasıyla ortaya çıkar.",
    },
    step: {
      kicker: "Büyümenin bilgisini açmak",
      title: "Adım adım, kalıcı büyümeye.",
      body:
        "Step by Step metodolojisini, girişimlerin ve yeni ekosistem oyuncularının doğru adımları doğru sırayla atabilmesi için geliştirdik. Amacımız onları yanlış önceliklerden, gereksiz yatırımlardan ve maliyetli büyüme hatalarından korumak.",
      steps: [
        ["01", "Analiz Et", "Başlangıç noktasını netleştir."],
        ["02", "Strateji Belirle", "Doğru yolu ve öncelikleri tanımla."],
        ["03", "Uygula", "Stratejiyi disiplinle hayata geçir."],
        ["04", "Ölç ve Geliştir", "İşe yarayan sistemi sürekli güçlendir."],
      ],
      cta: "Step by Step'i İncele",
      bookTitle: "Başarı Orijinal Değildir.",
      bookBody:
        "Başarı yalnızca istisnai yeteneklere veya şansa ait değildir. Doğru sistemler incelendiğinde anlaşılabilir, öğretilebilir ve yeniden üretilebilir.",
    },
    awards: {
      kicker: "Ödüller ve tanınırlık",
      title: "Ödüller amacımız değil. Doğru yolda olduğumuzun işaretleri.",
      body:
        "Sellf ve Yiğit Konuk'a verilen ödüller; Research International ve Birleşik Krallık merkezli Key Awards tarafından gerçekleştirilen değerlendirmeler sonucunda belirlendi.",
      items: [
        ["2026", "Sellf", "Best Growth Marketing & Sales Performance Consultancy 2026 — Türkiye"],
        ["2024", "Yiğit Konuk", "Middle East CEO of the Year 2024"],
        ["—", "Yiğit Konuk", "Best Digital Marketing Business Leader"],
        ["2023", "Yiğit Konuk", "Global Startup Awards Association · Founder of the Year Adayı"],
      ],
      sources: "Research International · Key Awards (UK) · Global Startup Awards Association",
    },
    closing: {
      kicker: "Nereye gidiyoruz?",
      title:
        "Bugün büyüme sistemlerini kuruyoruz. Yarın, pazarlamanın nasıl ölçüleceğini belirlemek istiyoruz.",
      body:
        "Pazarlamayı yoruma dayalı ve parçalanmış bir hizmet alanı olmaktan çıkararak ortak kriterleri, güvenilir ölçüm sistemleri ve denetlenebilir standartları bulunan global bir iş disiplinine dönüştürmek istiyoruz.",
      line1: "Pazarlama daha fazlasını hak ediyor.",
      line2: "Şirketler daha iyisini hak ediyor.",
      statement: "Biz de bunu inşa ediyoruz.",
      primary: "Çalışma Modelimiz",
      secondary: "Bizimle Tanışın",
      side: "Aynı soru. Daha büyük bir cevap.",
    },
  },
  en: {
    hero: {
      kicker: "About Us",
      title: "Sellf was built not to make marketing look better, but to make companies truly grow.",
      body:
        "We believe marketing is more than striking campaigns, polished presentations and metrics with no commercial meaning. Alongside finance and people, marketing is one of the forces that define a company's future.",
      statement:
        "We do not leave growth to chance, opinion or spectacle. We build it as a system.",
      discover: "Discover",
      sideTop: "Ideas to profitability",
      sideBottom: ["Brands", "People", "Profit"],
      imageAlt: "Yiğit Konuk, Founder and CEO of Sellf Media",
    },
    manifesto: {
      kicker: "Born from an objection",
      title: "We reject hollow outcomes presented as success.",
      paragraphs: [
        "Sellf was founded by Yiğit Konuk. After serving in management roles in corporate companies and working inside agencies, he saw the marketing industry from both the client and service-provider sides.",
        "High retainers, reports designed to make work look successful, metrics celebrated despite adding nothing to commercial performance, and campaigns that created temporary movement without leaving a lasting growth system behind — these experiences defined why Sellf had to exist.",
        "We do not consider spending a brand's budget, producing positive platform numbers or creating temporary visibility to be success on their own.",
      ],
      statement:
        "We produce outcomes that move the company forward, not outcomes that merely look good.",
      imageAlt: "The Sellf Media team working together",
    },
    team: {
      kicker: "Founding Team",
      title: "Different disciplines. One growth problem.",
      body:
        "Sellf's founding team brings experience from national and global companies including NMQ, McKinsey, WPP and Eti. The strategic discipline of management consulting, the communication capability of global agencies and the operational reality of corporate companies meet in one structure.",
      credentials: [
        ["NMQ", "Strategy & Brand"],
        ["McKinsey", "Management Consulting"],
        ["WPP", "Global Communications"],
        ["Eti", "Corporate Operations"],
      ],
    },
    thesis: {
      kicker: "Our growth thesis",
      title: "A goal without data is only a dream.",
      body:
        "For a goal to become strategy, it must be grounded in real data, financial calculations, market knowledge and an executable roadmap. Without them, a plan is not a strategy; it is only a desired outcome.",
      statement:
        "Marketing without strategy is only spectacle and waste.",
      pillars: [
        ["01", "Market Share", "The real measure of competitive strength."],
        ["02", "Profitability", "The commercial value of growth."],
        ["03", "Efficient Growth", "Smarter and more durable progress."],
      ],
      rail: ["Data", "Strategy", "Execution", "Outcome"],
    },
    operating: {
      kicker: "Our growth system",
      title: "Two teams. One growth system.",
      body:
        "In conventional structures, e-commerce, brand, advertising and sales pursue different goals. Sellf's Growth and Operations model unites this fragmented structure around one commercial objective.",
      growth: {
        title: "Growth",
        sub: "Strategy · Direction · Governance",
        items: ["Clarifies objectives", "Analyses market and data", "Builds the roadmap"],
      },
      operations: {
        title: "Operations",
        sub: "Execution · Movement · Outcome",
        items: ["Brings strategy to life", "Runs channels together", "Continuously improves performance"],
      },
      bridge: "Shared data · Shared objective",
      cta: "Explore Growth & Operations",
    },
    standards: {
      kicker: "BHS & RGI",
      title: "A shared language for marketing.",
      body:
        "Success in marketing is defined differently by everyone. BHS and RGI are our first systematic answer to that ambiguity.",
      bhs: {
        name: "BHS",
        label: "Baseline Health",
        desc:
          "Defines the brand's starting point across marketing, sales, data, strategy and operational infrastructure.",
        question: "Where do we begin?",
        cta: "Explore BHS",
      },
      rgi: {
        name: "RGI",
        label: "Real Growth",
        desc:
          "Measures how growth contributes to profitability, efficiency, sustainability and scalability.",
        question: "Are we truly growing?",
        cta: "Explore RGI",
      },
    },
    vision: {
      kicker: "A larger perspective",
      title: "We want to build the global standard for marketing.",
      paragraphs: [
        "Finance, banking, logistics, manufacturing and quality management operate with widely accepted rules, performance criteria and audit mechanisms. Marketing has not yet reached the same level of maturity.",
        "Sellf's long-term vision is to close this gap. We aim to become a global standards institution that defines how marketing should be measured, assessed and audited, with a methodology that can be applied by companies and practitioners beyond Sellf.",
      ],
      points: ["More transparent", "More equitable", "More measurable", "More effective"],
      statement:
        "A standard gains real power when an entire ecosystem begins to use it.",
    },
    step: {
      kicker: "Opening the knowledge of growth",
      title: "Step by step, towards lasting growth.",
      body:
        "We developed Step by Step to help ventures and new ecosystem players make the right moves in the right order. It is designed to protect them from misplaced priorities, unnecessary investment and costly growth mistakes.",
      steps: [
        ["01", "Analyse", "Clarify the starting point."],
        ["02", "Define Strategy", "Set the right path and priorities."],
        ["03", "Execute", "Bring the strategy to life with discipline."],
        ["04", "Measure & Improve", "Continuously strengthen what works."],
      ],
      cta: "Explore Step by Step",
      bookTitle: "Success Is Not Original.",
      bookBody:
        "Success does not belong only to exceptional talent or luck. When the right systems are studied, success can be understood, taught and reproduced.",
    },
    awards: {
      kicker: "Awards & Recognition",
      title: "Awards are not the goal. They are signals that we are on the right path.",
      body:
        "Awards received by Sellf and Yiğit Konuk were determined through evaluations conducted by Research International and UK-based Key Awards.",
      items: [
        ["2026", "Sellf", "Best Growth Marketing & Sales Performance Consultancy 2026 — Türkiye"],
        ["2024", "Yiğit Konuk", "Middle East CEO of the Year 2024"],
        ["—", "Yiğit Konuk", "Best Digital Marketing Business Leader"],
        ["2023", "Yiğit Konuk", "Global Startup Awards Association · Founder of the Year Nominee"],
      ],
      sources: "Research International · Key Awards (UK) · Global Startup Awards Association",
    },
    closing: {
      kicker: "Where are we going?",
      title:
        "Today, we build growth systems. Tomorrow, we want to define how marketing is measured.",
      body:
        "We want to move marketing beyond fragmented, opinion-led services and turn it into a global business discipline with shared criteria, reliable measurement systems and auditable standards.",
      line1: "Marketing deserves more.",
      line2: "Companies deserve better.",
      statement: "We are building it.",
      primary: "Our Operating Model",
      secondary: "Meet Us",
      side: "The same question. A bigger answer.",
    },
  },
} as const;

function Arrow() {
  return (
    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  );
}

function GlobalStandardGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <div className="about-orbit absolute inset-[9%] rounded-full border border-white/16" />
      <div className="absolute inset-[20%] rounded-full border border-white/10" />
      <div className="absolute inset-x-[9%] top-1/2 h-px bg-white/12" />
      <div className="absolute inset-y-[9%] left-1/2 w-px bg-white/12" />
      <div className="absolute left-[9%] right-[9%] top-[31%] h-[38%] rounded-[50%] border-y border-white/10" />
      <div className="absolute bottom-[9%] top-[9%] left-[31%] w-[38%] rounded-[50%] border-x border-white/10" />
      {[
        ["left-[17%] top-[36%]", "h-2 w-2"],
        ["left-[39%] top-[24%]", "h-1.5 w-1.5"],
        ["right-[24%] top-[42%]", "h-2.5 w-2.5"],
        ["right-[34%] bottom-[22%]", "h-1.5 w-1.5"],
        ["left-[27%] bottom-[29%]", "h-2 w-2"],
      ].map(([position, size], index) => (
        <span
          key={index}
          className={"about-node absolute rounded-full bg-white " + position + " " + size}
        />
      ))}
      <div className="absolute inset-[4%] rotate-[22deg] rounded-[50%] border border-white/8" />
      <div className="absolute inset-[4%] -rotate-[22deg] rounded-[50%] border border-white/8" />
      <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-black" />
    </div>
  );
}

export default function AboutClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = copy[currentLang];
  const langPrefix = "/" + currentLang;

  return (
    <div className="about-page w-full overflow-hidden bg-[#f8f8f6] text-[#0b0d0d]">
      <style
        dangerouslySetInnerHTML={{
          __html:
            ".about-guides{background-image:linear-gradient(to right,rgba(11,13,13,.055) 1px,transparent 1px);background-size:20% 100%;background-position:center}.about-founder{mask-image:linear-gradient(to right,transparent 0%,#000 15%,#000 100%);-webkit-mask-image:linear-gradient(to right,transparent 0%,#000 15%,#000 100%)}.about-team-image{filter:grayscale(1) contrast(1.08)}.about-orbit{animation:aboutOrbit 28s linear infinite}.about-node{animation:aboutPulse 3.8s ease-in-out infinite}.about-node:nth-of-type(2){animation-delay:-.8s}.about-node:nth-of-type(3){animation-delay:-1.6s}.about-node:nth-of-type(4){animation-delay:-2.4s}.about-node:nth-of-type(5){animation-delay:-3.2s}@keyframes aboutOrbit{to{transform:rotate(360deg)}}@keyframes aboutPulse{0%,100%{opacity:.28;box-shadow:0 0 0 0 rgba(255,255,255,.12)}50%{opacity:1;box-shadow:0 0 0 12px rgba(255,255,255,0)}}@media(max-width:1023px){.about-founder{mask-image:linear-gradient(to top,#000 72%,transparent 100%);-webkit-mask-image:linear-gradient(to top,#000 72%,transparent 100%)}}@media(prefers-reduced-motion:reduce){.about-orbit,.about-node{animation:none}}",
        }}
      />

      <section className="about-guides relative border-b border-black/[.07] bg-[#f8f8f6] pt-24 md:pt-28">
        <div className="sellf-container grid min-h-[760px] lg:grid-cols-[58%_42%] lg:min-h-[830px]">
          <div className="relative z-10 flex flex-col justify-between py-14 pr-0 sm:py-16 lg:py-20 lg:pr-10">
            <div>
              <p className="sellf-kicker text-black/38">{t.hero.kicker}</p>
              <h1 className="sellf-display mt-8 max-w-[13ch] text-[clamp(3rem,6vw,6.5rem)] leading-[.91]">
                {t.hero.title}
              </h1>
              <p className="mt-8 max-w-[45rem] text-sm leading-7 text-black/58 md:text-base">
                {t.hero.body}
              </p>
            </div>

            <div className="mt-12 grid gap-8 border-t border-black/12 pt-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-[38rem] text-lg font-medium leading-snug tracking-[-.025em] md:text-2xl">
                {t.hero.statement}
              </p>
              <a
                href="#manifesto"
                className="group inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[.2em] text-black/52"
              >
                <span className="text-xl font-light">↓</span>
                {t.hero.discover}
              </a>
            </div>
          </div>

          <div className="relative min-h-[510px] lg:min-h-0">
            <Image
              src={founderImage}
              alt={t.hero.imageAlt}
              fill
              priority
              unoptimized
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="about-founder object-cover object-center mix-blend-multiply"
            />
            <div className="pointer-events-none absolute right-4 top-10 hidden text-right lg:block">
              <p className="text-[10px] font-medium uppercase tracking-[.32em] text-black/40">
                {t.hero.sideTop}
              </p>
              <span className="mt-4 ml-auto block h-px w-10 bg-black/20" />
            </div>
            <div className="pointer-events-none absolute bottom-12 right-4 hidden lg:block">
              {t.hero.sideBottom.map((line) => (
                <p key={line} className="text-[9px] font-medium uppercase tracking-[.3em] text-black/36">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="manifesto" className="relative overflow-hidden bg-[#0a0c0c] text-white">
        <div className="sellf-container grid lg:min-h-[660px] lg:grid-cols-[54%_46%]">
          <div className="relative z-10 flex flex-col justify-between py-16 pr-0 md:py-20 lg:py-24 lg:pr-14">
            <div>
              <p className="sellf-kicker text-white/38">{t.manifesto.kicker}</p>
              <h2 className="sellf-display mt-7 max-w-[11ch] text-[clamp(2.8rem,5.3vw,5.8rem)] leading-[.92]">
                {t.manifesto.title}
              </h2>
            </div>
            <div className="mt-12 max-w-[46rem] space-y-5 text-sm leading-7 text-white/58 md:text-[15px]">
              {t.manifesto.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="border-t border-white/14 pt-6 text-base font-medium leading-snug text-white/88 md:text-xl">
                {t.manifesto.statement}
              </p>
            </div>
          </div>

          <div className="relative min-h-[460px] lg:min-h-0">
            <Image
              src="https://cdn.sellfmedia.workers.dev/statics/ekip_foto.jpg"
              alt={t.manifesto.imageAlt}
              fill
              unoptimized
              sizes="(max-width: 1023px) 100vw, 46vw"
              className="about-team-image object-cover object-center opacity-72"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0c0c_0%,rgba(10,12,12,.5)_18%,rgba(10,12,12,.1)_65%,rgba(10,12,12,.36)_100%)]" />
          </div>
        </div>
      </section>

      <section className="border-b border-black/[.07] bg-white">
        <div className="sellf-container grid gap-10 py-14 md:py-18 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:py-20">
          <div>
            <p className="sellf-kicker text-black/35">{t.team.kicker}</p>
            <h2 className="sellf-display mt-5 max-w-[18ch] text-4xl sm:text-5xl lg:text-[3.4rem]">
              {t.team.title}
            </h2>
            <p className="mt-6 max-w-[48rem] text-sm leading-7 text-black/55 md:text-[15px]">
              {t.team.body}
            </p>
          </div>
          <div className="grid grid-cols-2 border-l border-t border-black/10">
            {t.team.credentials.map(([name, field]) => (
              <div key={name} className="min-h-28 border-r border-b border-black/10 p-5 md:p-6">
                <p className="text-lg font-semibold tracking-[-.035em] md:text-xl">{name}</p>
                <p className="mt-3 text-xs leading-5 text-black/40">{field}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-guides border-b border-black/[.07] bg-[#f5f5f2]">
        <div className="sellf-container py-18 md:py-24 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p className="sellf-kicker text-black/35">{t.thesis.kicker}</p>
              <h2 className="sellf-display mt-6 max-w-[12ch] text-[clamp(3rem,6vw,6.7rem)] leading-[.91]">
                {t.thesis.title}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-black/58 md:text-base">{t.thesis.body}</p>
              <p className="mt-7 border-l-2 border-black pl-5 text-lg font-semibold leading-snug tracking-[-.025em] md:text-xl">
                {t.thesis.statement}
              </p>
            </div>
          </div>

          <div className="mt-16 grid border-l border-t border-black/12 sm:grid-cols-3 md:mt-20">
            {t.thesis.pillars.map(([number, title, note]) => (
              <div key={title} className="min-h-36 border-r border-b border-black/12 p-6 md:min-h-44 md:p-8">
                <p className="text-[10px] font-medium tracking-[.2em] text-black/35">{number}</p>
                <h3 className="mt-5 text-sm font-semibold uppercase tracking-[.16em]">{title}</h3>
                <p className="mt-3 text-xs leading-5 text-black/42">{note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium uppercase tracking-[.22em] text-black/34">
            {t.thesis.rail.map((item, index) => (
              <span key={item} className="flex items-center gap-4">
                {item}
                {index < t.thesis.rail.length - 1 && <span aria-hidden="true">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/[.07] bg-white">
        <div className="sellf-container grid gap-12 py-18 md:py-24 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:py-28">
          <div>
            <p className="sellf-kicker text-black/35">{t.operating.kicker}</p>
            <h2 className="sellf-display mt-6 max-w-[11ch] text-5xl md:text-6xl lg:text-7xl">
              {t.operating.title}
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-black/55 md:text-[15px]">
              {t.operating.body}
            </p>
            <Link
              href={langPrefix + "/framework/operating-model"}
              className="group mt-8 inline-flex items-center gap-3 text-xs font-semibold"
            >
              {t.operating.cta}
              <Arrow />
            </Link>
          </div>

          <div className="relative grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="relative flex aspect-square flex-col justify-center rounded-full border border-black/18 p-[15%]">
              <p className="text-[clamp(2rem,4vw,3.7rem)] font-semibold tracking-[-.055em]">
                {t.operating.growth.title}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[.2em] text-black/38">
                {t.operating.growth.sub}
              </p>
              <ul className="mt-7 space-y-2 text-xs leading-5 text-black/55">
                {t.operating.growth.items.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>

            <div className="relative flex aspect-square flex-col justify-center rounded-full border border-black/18 bg-[#f2f1ed] p-[15%]">
              <p className="text-[clamp(2rem,4vw,3.7rem)] font-semibold tracking-[-.055em]">
                {t.operating.operations.title}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[.2em] text-black/38">
                {t.operating.operations.sub}
              </p>
              <ul className="mt-7 space-y-2 text-xs leading-5 text-black/55">
                {t.operating.operations.items.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden w-16 -translate-x-1/2 -translate-y-1/2 items-center md:flex">
              <span className="h-px flex-1 bg-black/25" />
              <span className="h-2 w-2 rounded-full border border-black/40 bg-white" />
              <span className="h-px flex-1 bg-black/25" />
            </div>
            <p className="pointer-events-none absolute left-1/2 top-[calc(50%+2rem)] hidden -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-[.16em] text-black/35 md:block">
              {t.operating.bridge}
            </p>
          </div>
        </div>
      </section>

      <section className="about-guides border-b border-black/[.07] bg-[#f7f7f4]">
        <div className="sellf-container grid gap-12 py-18 md:py-24 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:py-28">
          <div>
            <p className="sellf-kicker text-black/35">{t.standards.kicker}</p>
            <h2 className="sellf-display mt-6 max-w-[11ch] text-5xl md:text-6xl lg:text-7xl">
              {t.standards.title}
            </h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-black/55 md:text-[15px]">
              {t.standards.body}
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-8">
            {[
              { item: t.standards.bhs, href: "/framework/bhs" },
              { item: t.standards.rgi, href: "/framework/rgi" },
            ].map(({ item, href }) => {
              return (
                <article key={item.name} className="flex flex-col items-center text-center">
                  <div className="flex aspect-square w-full max-w-[330px] flex-col items-center justify-center rounded-full border border-white/10 bg-[#0b0d0d] px-[14%] text-white shadow-[0_24px_70px_rgba(0,0,0,.14)]">
                    <p className="text-[clamp(3.4rem,6vw,5.5rem)] font-light tracking-[-.06em]">{item.name}</p>
                    <p className="mt-2 text-[10px] font-medium uppercase tracking-[.24em] text-white/46">
                      {item.label}
                    </p>
                    <p className="mt-6 text-xs leading-5 text-white/52">{item.desc}</p>
                  </div>
                  <p className="mt-6 text-[10px] uppercase tracking-[.2em] text-black/38">{item.question}</p>
                  <Link
                    href={langPrefix + href}
                    className="group mt-4 inline-flex items-center gap-3 text-xs font-semibold"
                  >
                    {item.cta}
                    <Arrow />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#080a0a] text-white">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="sellf-container relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:py-32">
          <div>
            <p className="sellf-kicker text-white/38">{t.vision.kicker}</p>
            <h2 className="sellf-display mt-7 max-w-[12ch] text-[clamp(3rem,5.8vw,6.3rem)] leading-[.92]">
              {t.vision.title}
            </h2>
            <div className="mt-9 max-w-[48rem] space-y-5 text-sm leading-7 text-white/56 md:text-[15px]">
              {t.vision.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-9 max-w-[42rem] border-l border-white/35 pl-5 text-lg font-medium leading-snug text-white/88 md:text-xl">
              {t.vision.statement}
            </p>
          </div>

          <div>
            <GlobalStandardGraphic />
            <div className="mt-7 grid grid-cols-2 gap-y-3 border-t border-white/12 pt-6">
              {t.vision.points.map((point) => (
                <p key={point} className="text-[10px] font-medium uppercase tracking-[.2em] text-white/42">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/[.07] bg-white">
        <div className="sellf-container grid gap-12 py-18 md:py-24 lg:grid-cols-[1.35fr_.65fr] lg:py-28">
          <div>
            <p className="sellf-kicker text-black/35">{t.step.kicker}</p>
            <h2 className="sellf-display mt-6 max-w-[12ch] text-5xl md:text-6xl lg:text-7xl">
              {t.step.title}
            </h2>
            <p className="mt-7 max-w-[48rem] text-sm leading-7 text-black/55 md:text-[15px]">
              {t.step.body}
            </p>

            <div className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-0">
              <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-black/18 md:block" />
              {t.step.steps.map(([number, title, note]) => (
                <div key={number} className="relative pr-6">
                  <span className="relative z-10 block h-2.5 w-2.5 rounded-full border border-black/35 bg-white" />
                  <p className="mt-5 text-[9px] font-medium tracking-[.2em] text-black/35">{number}</p>
                  <h3 className="mt-3 text-xs font-semibold uppercase tracking-[.14em]">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-black/42">{note}</p>
                </div>
              ))}
            </div>

            <Link
              href={langPrefix + "/framework/step-by-step"}
              className="group mt-10 inline-flex items-center gap-3 text-xs font-semibold"
            >
              {t.step.cta}
              <Arrow />
            </Link>
          </div>

          <aside className="flex flex-col justify-between border-l border-black/12 pl-7 md:pl-10">
            <p className="text-[10px] uppercase tracking-[.2em] text-black/35">Sellf Notes · 01</p>
            <div className="mt-16 lg:mt-auto">
              <h3 className="sellf-display max-w-[8ch] text-4xl md:text-5xl">{t.step.bookTitle}</h3>
              <p className="mt-6 text-sm leading-7 text-black/50">{t.step.bookBody}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="about-guides border-b border-black/[.07] bg-[#f5f5f2]">
        <div className="sellf-container py-18 md:py-24 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="sellf-kicker text-black/35">{t.awards.kicker}</p>
              <h2 className="sellf-display mt-6 max-w-[11ch] text-4xl sm:text-5xl lg:text-6xl">
                {t.awards.title}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-black/52 md:text-[15px]">{t.awards.body}</p>
          </div>

          <div className="mt-14 grid border-l border-t border-black/12 md:grid-cols-2 xl:grid-cols-4">
            {t.awards.items.map(([year, recipient, award]) => (
              <article key={award} className="min-h-52 border-r border-b border-black/12 p-6 md:p-8">
                <p className="text-2xl font-semibold tracking-[-.04em]">{year}</p>
                <p className="mt-8 text-[10px] font-semibold uppercase tracking-[.18em] text-black/42">
                  {recipient}
                </p>
                <h3 className="mt-3 text-sm font-medium leading-6">{award}</h3>
              </article>
            ))}
          </div>

          <p className="mt-6 text-[10px] uppercase tracking-[.18em] text-black/35">{t.awards.sources}</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#090b0b] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(255,255,255,.06),transparent_34%)]" />
        <div className="sellf-container relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.35fr_.65fr] lg:items-end lg:py-32">
          <div>
            <p className="sellf-kicker text-white/38">{t.closing.kicker}</p>
            <h2 className="sellf-display mt-7 max-w-[15ch] text-[clamp(3rem,6vw,6.6rem)] leading-[.92]">
              {t.closing.title}
            </h2>
            <p className="mt-8 max-w-[50rem] text-sm leading-7 text-white/55 md:text-[15px]">
              {t.closing.body}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={langPrefix + "/framework/operating-model"}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t.closing.primary}
                <Arrow />
              </Link>
              <Link
                href={langPrefix + "/contact"}
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-white/8"
              >
                {t.closing.secondary}
                <Arrow />
              </Link>
            </div>
          </div>

          <div className="border-l border-white/16 pl-7">
            <p className="text-base leading-7 text-white/56">{t.closing.line1}</p>
            <p className="text-base leading-7 text-white/56">{t.closing.line2}</p>
            <p className="mt-5 text-xl font-semibold tracking-[-.03em]">{t.closing.statement}</p>
            <span className="mt-10 block h-px w-12 bg-white/35" />
            <p className="mt-5 max-w-[16rem] text-[10px] font-medium uppercase leading-5 tracking-[.24em] text-white/35">
              {t.closing.side}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
