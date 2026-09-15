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


const displayCopy = {
  tr: {
    heroBody: "Daha stratejik, daha ölçülebilir ve daha sürdürülebilir bir büyüme mümkün. Biz, pazarlamayı iş sonuçlarına bağlayan bir büyüme kurumu olarak çalışıyoruz.",
    manifestoBody: "Sellf, daha iyi görünen markalar değil, gerçekten büyüyen şirketler inşa etmek için kuruldu. Kısa vadeli gösterinin değil, uzun vadeli değerin peşindeyiz. Pazarlamayı bir maliyet kalemi olarak değil, stratejik bir büyüme sistemi olarak ele alıyoruz. Daha az gürültü, daha fazla gerçek sonuç için çalışıyoruz.",
    teamBody: "Strateji, yaratıcılık, veri, teknoloji ve operasyon disiplinlerinden gelen deneyimimiz, ortak bir amaç etrafında birleşiyor: şirketlerin sürdürülebilir şekilde büyümesi.",
    thesisBody: "Büyümeyi sezgilerle değil, veriye dayalı içgörülerle inşa ediyoruz. Doğru ölçmek, doğru yönlendirmek ve doğru uygulamak, kalıcı başarının tek yoludur.",
    operatingBody: "Strateji ve uygulama aynı sistemin içinde birlikte çalışır. Daha hızlı, daha akıllı ve daha verimli büyüme için.",
    standardsBody: "Büyümeyi anlamak, ölçmek ve yönetmek için iki tamamlayıcı sistem kullanıyoruz: Başlangıç Sağlığı (BHS) ve Gerçek Büyüme (RGI). Bu sistemler, pazarlamanın iş etkisini ortak bir dilde ele almamızı sağlar.",
    visionBody: "Bugünün deneyimlerini, yarının standardına dönüştürmek için çalışıyoruz. Türkiye'den doğan, global ölçekte değer yaratan bir büyüme kurumu olmayı hedefliyoruz. Daha şeffaf, daha ölçülebilir ve daha etkili bir pazarlama dünyası mümkün.",
    stepBody: "Her projede, aynı disiplinle ilerleyen kanıtlanmış bir süreç izliyoruz.",
    awardsTitle: "Daha iyi bir pazarlama dünyası için.",
    closingBody: "Daha güçlü markalar, daha sürdürülebilir şirketler ve daha iyi bir pazarlama dünyası için birlikte çalışalım.",
    better: "Daha iyisi mümkün",
    systemCta: "Sistemi daha yakından incele",
    awardKicker: "Aldığımız takdirler",
  },
  en: {
    heroBody: "More strategic, more measurable and more sustainable growth is possible. We work as a growth institution that connects marketing to business outcomes.",
    manifestoBody: "Sellf was founded not to build better-looking brands, but truly growing companies. We pursue long-term value over short-term spectacle. We treat marketing not as a cost line, but as a strategic growth system. Less noise, more real outcomes.",
    teamBody: "Our experience across strategy, creativity, data, technology and operations comes together around one objective: helping companies grow sustainably.",
    thesisBody: "We build growth with data-led insight, not intuition. Measuring, directing and executing correctly is the only path to lasting success.",
    operatingBody: "Strategy and execution work together inside one system. For faster, smarter and more efficient growth.",
    standardsBody: "We use two complementary systems to understand, measure and manage growth: Baseline Health (BHS) and Real Growth (RGI). Together, they create a shared language for marketing's business impact.",
    visionBody: "We turn today's experience into tomorrow's standard. Our ambition is to build a growth institution born in Türkiye and creating value globally. A more transparent, measurable and effective marketing world is possible.",
    stepBody: "Every project follows the same disciplined and proven process.",
    awardsTitle: "For a better marketing world.",
    closingBody: "Let us work together for stronger brands, more sustainable companies and a better marketing world.",
    better: "Better is possible",
    systemCta: "Explore the system",
    awardKicker: "Recognition",
  },
} as const;

const pageCss =
  ".about-exact{--line:rgba(11,13,13,.09);--muted:rgba(11,13,13,.52)}" +
  ".about-exact .band{position:relative;isolation:isolate;overflow:clip;border-bottom:1px solid var(--line)}" +
  ".about-exact .headline{text-transform:uppercase;font-weight:700;letter-spacing:-.055em;line-height:.94}" +
  ".about-exact .body-copy{font-size:14px;line-height:1.65;color:var(--muted)}" +
  ".about-exact .meta{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase}" +
  ".about-exact .founder-cut{filter:grayscale(1) contrast(1.06);mix-blend-mode:multiply;object-fit:cover;object-position:right bottom}" +
  ".about-exact .team-cut{filter:grayscale(1) contrast(1.12);object-fit:cover;object-position:center}" +
  ".about-exact .manifesto-copy{padding-left:max(2.5rem,calc((100vw - 1400px)/2))}" +
  ".about-exact .hero-band{height:clamp(560px,43vw,650px)}" +
  ".about-exact .manifesto-band{height:clamp(420px,31vw,480px)}" +
  ".about-exact .team-band{height:250px}.about-exact .thesis-band{height:370px}.about-exact .operating-band{height:275px}" +
  ".about-exact .standards-band{height:335px}.about-exact .vision-band{height:405px}.about-exact .step-band{height:305px}" +
  ".about-exact .awards-band{height:285px}.about-exact .closing-band{height:335px}" +
  ".about-exact .orb{transition:transform .35s ease,box-shadow .35s ease}.about-exact .orb:hover{transform:translateY(-4px);box-shadow:0 18px 45px rgba(0,0,0,.18)}" +
  "@media(max-width:1023px){.about-exact .hero-band,.about-exact .manifesto-band,.about-exact .team-band,.about-exact .thesis-band,.about-exact .operating-band,.about-exact .standards-band,.about-exact .vision-band,.about-exact .step-band,.about-exact .awards-band,.about-exact .closing-band{height:auto}.about-exact .band{padding-bottom:64px}.about-exact .manifesto-copy{padding-left:1rem;padding-right:1rem}}" +
  "@media(prefers-reduced-motion:reduce){.about-exact .orb{transition:none}}";

function Arrow() {
  return <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>;
}

export default function AboutClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = copy[currentLang];
  const d = displayCopy[currentLang];
  const langPrefix = "/" + currentLang;

  return (
    <main className="about-exact overflow-hidden bg-[#f7f7f4] text-[#0b0d0d]">
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />

      <section className="band hero-band bg-[#f8f8f6]">
        <div className="sellf-container grid h-full lg:grid-cols-[58%_42%]">
          <div className="relative z-10 flex flex-col justify-center pb-12 pt-28 lg:pr-8 lg:pt-32">
            <p className="meta text-black/38">The Sellf Mentality</p>
            <h1 className="headline mt-5 max-w-[820px] text-[clamp(2.8rem,3.7vw,4rem)]">{t.hero.title}</h1>
            <p className="body-copy mt-5 max-w-[42rem]">{d.heroBody}</p>
            <a href="#manifesto" className="group mt-8 inline-flex w-fit items-center gap-5 text-[11px] font-semibold uppercase tracking-[.2em] text-black/48">
              <span className="text-2xl font-light">↓</span>{t.hero.discover}
            </a>
          </div>
          <div className="relative min-h-[430px] lg:min-h-0">
            <Image src={founderImage} alt={t.hero.imageAlt} fill priority unoptimized sizes="(max-width: 1023px) 100vw, 42vw" className="founder-cut" />
          </div>
        </div>
      </section>

      <section id="manifesto" className="band manifesto-band overflow-hidden bg-[#090b0b] text-white">
        <div className="grid h-full lg:grid-cols-2">
          <div className="manifesto-copy relative z-10 flex flex-col justify-center py-14 lg:pr-10">
            <p className="meta text-white/42">{currentLang === "tr" ? "Manifestomuz" : "Our Manifesto"}</p>
            <h2 className="headline mt-4 max-w-[18ch] text-[clamp(2.5rem,3.45vw,3.65rem)]">{t.manifesto.title}</h2>
            <p className="mt-5 max-w-[43rem] text-[13px] leading-[1.6] text-white/58">{d.manifestoBody}</p>
            <div className="mt-6 flex items-center gap-4"><span className="h-px w-10 bg-white/50" /><span className="meta text-[10px] text-white/60">{d.better}</span></div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-0">
            <Image src="/images/about-team.webp" alt={t.manifesto.imageAlt} fill sizes="(max-width: 1023px) 100vw, 50vw" className="team-cut" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#090b0b_0%,rgba(9,11,11,.62)_15%,rgba(9,11,11,.05)_62%,rgba(9,11,11,.2)_100%)]" />
          </div>
        </div>
      </section>

      <section className="band team-band bg-white">
        <div className="sellf-container grid h-full items-center gap-8 py-10 lg:grid-cols-[54%_46%]">
          <div>
            <p className="meta text-black/35">{t.team.kicker}</p>
            <h2 className="headline mt-4 max-w-[22ch] text-[clamp(2rem,3vw,3.1rem)]">{t.team.title}</h2>
            <p className="body-copy mt-4 max-w-[44rem]">{d.teamBody}</p>
          </div>
          <div className="grid grid-cols-2 border-l border-black/10 sm:grid-cols-4">
            {t.team.credentials.map(([name, field]) => <div key={name} className="min-h-24 border-r border-black/10 px-4 py-3"><p className="text-xl font-semibold tracking-[-.045em]">{name}</p><p className="mt-3 text-[11px] leading-4 text-black/42">{field}</p></div>)}
          </div>
        </div>
      </section>

      <section className="band thesis-band bg-[#f7f7f4]">
        <div className="sellf-container grid h-full content-center gap-y-8 py-10">
          <div className="grid items-end gap-8 lg:grid-cols-[58%_42%]">
            <div><p className="meta text-black/35">{currentLang === "tr" ? "İnandığımız gerçek" : "What we believe"}</p><h2 className="headline mt-4 max-w-[17ch] text-[clamp(2.6rem,4vw,4.35rem)]">{t.thesis.title}</h2></div>
            <p className="body-copy max-w-[35rem]">{d.thesisBody}</p>
          </div>
          <div className="grid items-stretch lg:grid-cols-[1fr_1fr_1fr_.55fr]">
            {t.thesis.pillars.map(([number, title, note]) => <div key={title} className="border-r border-black/12 pr-6 last:border-r-0 lg:px-5 lg:first:pl-0"><p className="text-[10px] font-medium tracking-[.2em] text-black/35">{number}</p><h3 className="mt-3 text-xs font-semibold uppercase tracking-[.16em]">{title}</h3><p className="mt-2 text-[11px] leading-5 text-black/42">{note}</p></div>)}
            <div className="hidden pl-8 lg:block">{t.thesis.rail.map((item) => <p key={item} className="meta text-[9px] leading-5 text-black/35">{item}</p>)}</div>
          </div>
        </div>
      </section>

      <section className="band operating-band bg-white">
        <div className="sellf-container grid h-full items-center gap-8 py-10 lg:grid-cols-[41%_59%]">
          <div><p className="meta text-black/35">{t.operating.kicker}</p><h2 className="headline mt-4 max-w-[15ch] text-[clamp(2rem,3.1vw,3.25rem)]">{t.operating.title}</h2><p className="body-copy mt-4 max-w-[34rem]">{d.operatingBody}</p></div>
          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
            <div className="grid items-center gap-4 sm:grid-cols-[auto_1fr]">
              <p className="meta hidden max-w-[5rem] text-[9px] leading-5 text-black/35 xl:block">{t.thesis.rail.slice(0, 3).join(" · ")}</p>
              <div className="mx-auto flex h-40 w-40 flex-col items-center justify-center rounded-full border border-black/25 text-center"><p className="text-2xl font-semibold tracking-[-.05em]">{t.operating.growth.title}</p><p className="meta mt-2 text-[8px] leading-4 text-black/38">{t.operating.growth.sub}</p></div>
            </div>
            <div className="flex min-w-24 items-center"><span className="h-px flex-1 bg-black/22" /><span className="h-2 w-2 rounded-full bg-black/60" /><span className="h-px flex-1 bg-black/22" /></div>
            <div className="grid items-center gap-4 sm:grid-cols-[auto_1fr]">
              <div className="mx-auto flex h-40 w-40 flex-col items-center justify-center rounded-full border border-black/25 text-center"><p className="text-xl font-semibold tracking-[-.05em]">{t.operating.operations.title}</p><p className="meta mt-2 text-[8px] leading-4 text-black/38">{t.operating.operations.sub}</p></div>
              <p className="meta hidden max-w-[7rem] text-[9px] leading-5 text-black/35 xl:block">{t.operating.operations.items.join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="band standards-band bg-[#f8f8f6]">
        <div className="sellf-container grid h-full items-center gap-8 py-10 lg:grid-cols-[47%_53%]">
          <div>
            <p className="meta text-black/35">{currentLang === "tr" ? "Ölçen. Yönlendiren. Büyüten." : "Measure. Direct. Grow."}</p>
            <h2 className="headline mt-4 max-w-[19ch] text-[clamp(2.25rem,2.8vw,3rem)]">{t.standards.title}</h2>
            <p className="body-copy mt-4 max-w-[39rem]">{d.standardsBody}</p>
            <div className="mt-6 flex items-center gap-4"><span className="h-px w-10 bg-black/35" /><span className="meta text-[9px] text-black/42">{d.systemCta}</span></div>
          </div>
          <div className="grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
            <Link href={langPrefix + "/framework/bhs"} className="group text-center">
              <div className="orb mx-auto flex h-44 w-44 flex-col items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_28%,#41413d_0%,#151615_48%,#050606_100%)] text-white shadow-[0_12px_35px_rgba(0,0,0,.2)]"><p className="text-4xl font-light tracking-[-.06em]">{t.standards.bhs.name}</p><p className="meta mt-2 text-[9px] leading-4 text-white/58">{t.standards.bhs.label}</p></div>
              <p className="meta mt-4 text-[9px] text-black/35">{t.standards.bhs.question}</p>
            </Link>
            <div className="flex min-w-16 items-center text-black/42"><span className="h-px flex-1 bg-black/25" /><span className="px-2 text-xl font-light">⇄</span><span className="h-px flex-1 bg-black/25" /></div>
            <Link href={langPrefix + "/framework/rgi"} className="group text-center">
              <div className="orb mx-auto flex h-44 w-44 flex-col items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_28%,#4b4944_0%,#171817_48%,#050606_100%)] text-white shadow-[0_12px_35px_rgba(0,0,0,.2)]"><p className="text-4xl font-light tracking-[-.06em]">{t.standards.rgi.name}</p><p className="meta mt-2 text-[9px] leading-4 text-white/58">{t.standards.rgi.label}</p></div>
              <p className="meta mt-4 text-[9px] text-black/35">{t.standards.rgi.question}</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="band vision-band overflow-hidden bg-[#070909] text-white">
        <div className="sellf-container relative grid h-full items-center py-12 lg:grid-cols-[48%_52%]">
          <div className="relative z-10"><p className="meta text-white/40">{t.vision.kicker}</p><h2 className="headline mt-4 max-w-[14ch] text-[clamp(2.6rem,4vw,4.3rem)]">{t.vision.title}</h2><p className="mt-5 max-w-[42rem] text-[13px] leading-[1.65] text-white/58">{d.visionBody}</p></div>
          <div className="absolute bottom-0 right-0 top-0 w-[61%] opacity-90"><Image src="/images/about-global-standard.webp" alt="" fill sizes="(max-width: 1023px) 100vw, 61vw" className="object-contain object-center" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#070909_0%,rgba(7,9,9,.35)_24%,transparent_55%)]" /></div>
          <div className="relative z-10 col-start-2 hidden justify-end lg:flex"><div className="border-l border-white/16 pl-6">{t.vision.points.map((point) => <p key={point} className="meta text-[9px] leading-6 text-white/54">{point}</p>)}<span className="mt-3 block h-px w-10 bg-white/45" /></div></div>
        </div>
      </section>

      <section className="band step-band bg-white">
        <div className="sellf-container grid h-full items-center gap-7 py-10 lg:grid-cols-[24%_56%_20%]">
          <div><p className="meta text-black/35">{t.step.kicker}</p><h2 className="headline mt-4 max-w-[11ch] text-[clamp(2rem,3vw,3.1rem)]">{t.step.title}</h2><p className="body-copy mt-4 max-w-[18rem]">{d.stepBody}</p></div>
          <div className="relative grid grid-cols-2 gap-y-7 md:grid-cols-4 md:gap-0">
            <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-black/24 md:block" />
            {t.step.steps.map(([number, title, note]) => <div key={number} className="relative pr-5"><span className="relative z-10 block h-2.5 w-2.5 rounded-full border border-black/40 bg-white" /><p className="mt-4 text-[9px] font-medium tracking-[.2em] text-black/35">{number}</p><h3 className="mt-2 text-[11px] font-semibold uppercase tracking-[.13em]">{title}</h3><p className="mt-2 text-[11px] leading-5 text-black/42">{note}</p></div>)}
          </div>
          <aside className="border-l border-black/12 pl-6"><h3 className="headline max-w-[11ch] text-2xl">{t.step.bookTitle}</h3><p className="mt-4 text-[12px] leading-5 text-black/48">{t.step.bookBody}</p></aside>
        </div>
      </section>

      <section className="band awards-band bg-[#f7f7f4]">
        <div className="sellf-container grid h-full items-center gap-7 py-10 lg:grid-cols-[31%_69%]">
          <div><p className="meta text-black/35">{d.awardKicker}</p><h2 className="headline mt-4 max-w-[12ch] text-[clamp(2rem,3vw,3.05rem)]">{d.awardsTitle}</h2><p className="body-copy mt-4 max-w-[22rem]">{t.awards.body}</p></div>
          <div className="relative grid gap-6 md:grid-cols-4">
            <span className="absolute left-0 right-0 top-[5px] hidden h-px bg-black/25 md:block" />
            {t.awards.items.map(([year, recipient, award]) => <article key={award} className="relative pr-4"><span className="relative z-10 block h-2.5 w-2.5 rounded-full bg-black/70 ring-4 ring-[#f7f7f4]" /><p className="mt-4 text-xl font-semibold tracking-[-.04em]">{year}</p><p className="meta mt-2 text-[9px] leading-4 text-black/42">{recipient}</p><h3 className="mt-2 text-[11px] leading-[1.1rem] text-black/62">{award}</h3></article>)}
          </div>
        </div>
      </section>

      <section className="band closing-band overflow-hidden bg-[#080a0a] text-white">
        <div className="sellf-container relative grid h-full items-center gap-10 py-12 lg:grid-cols-[68%_32%]">
          <div><p className="meta text-white/40">{t.closing.kicker}</p><h2 className="headline mt-4 max-w-[24ch] text-[clamp(2.35rem,3.2vw,3.55rem)]">{t.closing.title}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={langPrefix + "/framework/operating-model"} className="group inline-flex items-center gap-4 rounded-full bg-white px-5 py-3 text-[11px] font-semibold text-black">{t.closing.primary}<Arrow /></Link>
              <Link href={langPrefix + "/contact"} className="group inline-flex items-center gap-4 rounded-full border border-white/22 px-5 py-3 text-[11px] font-semibold text-white">{t.closing.secondary}<Arrow /></Link>
            </div>
          </div>
          <aside className="border-l border-white/16 pl-7"><p className="text-sm leading-6 text-white/58">{d.closingBody}</p><span className="mt-6 block h-px w-10 bg-white/45" /><p className="meta mt-4 max-w-[13rem] text-[9px] leading-5 text-white/42">{t.closing.side}</p></aside>
        </div>
      </section>
    </main>
  );
}
