import Link from "next/link";
import styles from "./StepByStepPage.module.css";

type Lang = "tr" | "en";

type Stage = {
  no: string;
  slug: string;
  title: string;
  subtitle: string;
  body: string;
  quote: string;
  questions?: string[];
  visual: string;
  wide?: boolean;
  visualLabel?: string;
};

const copy = {
  tr: {
    eyebrow: "STEP BY STEP",
    heroTitleA: "Başarı bir sıçrama",
    heroTitleB: "değil, bir süreçtir.",
    heroBody:
      "Step by Step, kişilerin ve kurumların hedeflerine daha düşük hata payıyla, daha sürdürülebilir ve kalıcı biçimde ulaşabilmeleri için Sellf tarafından kullanılan aşamalı gelişim metodolojisidir.",
    heroBody2:
      "İnsanların, markaların ve kurumların yaşadıkları olaylar değişir. Ancak gelişimlerinin geçtiği aşamalar şaşırtıcı ölçüde benzerdir. Sellf bu tekrar eden yapıyı altı temel aşama ve bir tekrar döngüsü altında ele alır.",
    heroStat: "6 Aşama. 1 Döngü.",
    stages: [
      {
        no: "01",
        slug: "gelisim",
        title: "Gelişim",
        subtitle: "Önce kendini bil.",
        body:
          "Bu aşama, fikrin veya kurucunun olgunlaştığı adımdır. Kabiliyetlerin ve güçlü yönlerin farkına varılması, buna göre ürünün ve yolun belirlenmesi gerekir. Japon felsefesinde bu adımı doğrudan karşılayan yaklaşım Ikigai'dir.",
        quote: "Büyümenin başlangıcı fırsat değil, uyumdur.",
        questions: [
          "Ne seviyorum? Neye karşı gerçek bir tutkum var?",
          "Neyi iyi yapıyorum? Kabiliyetim, doğal avantajım veya üstünlüğüm nerede?",
          "Etki alanımın neye ihtiyacı var? Hedef kitlenin problemi nedir?",
          "Bunu nasıl sürdürülebilir hale getiririm? Bir gelir modeli nasıl oluşur?",
        ],
        visual: "development",
      },
      {
        no: "02",
        slug: "kurulum",
        title: "Kurulum",
        subtitle: "Kendini bilmek yetmez. Sistem kur.",
        body:
          "Gelişim aşamasında ne yapılacağı anlaşılır. Kurulum aşamasında ise bunun nasıl ayakta kalacağı belirlenir. Temeller burada atılır ve bu aşama Sellf'in BHS metodolojisiyle doğrudan uyumludur.",
        quote: "Kurucunun varlığına bağımlı olan yapı henüz bir sistem değildir.",
        questions: [
          "Bu fikrin, projenin veya markanın gelişim aşamaları neler olmalı?",
          "Bu aşamaları gerçekleştirecek insanlar ve paydaşlar kimler?",
          "Gelir ve sürdürülebilirlik modeli nedir?",
          "Benim sistemdeki yerim neresi ve sistem benim yokluğumda nasıl çalışabilir?",
        ],
        visual: "setup",
      },
      {
        no: "03",
        slug: "olgunlasma",
        title: "Olgunlaşma",
        subtitle: "Reaction before Action.",
        body:
          "İlk sonuçlar burada ortaya çıkmaya başlar. Hatalar ve yanlışlar not edilir, sistem geliştirilir. Bu aşamanın görevi plansızca reaksiyon vermek değil; reaksiyonu anlamlandırdıktan sonra aksiyon almaktır.",
        quote: "Tek bir reaksiyon veri değildir. Tekrarlanan reaksiyon bir sinyaldir.",
        questions: [
          "Bir problemi meşru kabul etmem için kaç bağımsız geri bildirim gerekir?",
          "Geri bildirimlere göre sistemin hangi parçaları değişmeli?",
          "Yeni ürün veya hizmetler eklemem gerekir mi?",
          "Rakiplerimiz kimler ve eksik kaldığımız noktalar nelerdir?",
        ],
        visual: "maturity",
      },
      {
        no: "04",
        slug: "aci-esigi",
        title: "Acı Eşiği",
        subtitle: "Vazgeçme isteğinin başladığı yer.",
        body:
          "Burası, kişileri ve markaları olgunlaştırıp yetkinleştiren ve kaçınılmaz olan aşamadır. Bu bir optimizasyon süreci değil; düşünme, dayanma ve algılama sürecidir. İlk üç adım ne kadar düzgün atıldıysa bu dönem o kadar kısa sürer.",
        quote: "Sürdürülebilirliğin gerçek testi büyümek değil, sonuç görünmediğinde devam edebilmektir.",
        visual: "pain",
        wide: true,
        visualLabel: "DAHA GÜÇLÜ İNSANLAR\nDAHA BÜYÜK MARKALAR",
      },
      {
        no: "05",
        slug: "genisleme",
        title: "Genişleme",
        subtitle: "Şafak Eşiği.",
        body:
          "Bu aşama, kişilerin ve markaların gerçekten büyüdükleri dönemdir. Acı Eşiği ile Genişleme arasında Şafak Eşiği vardır. Çoğu zaman fark edilmez; bir yorum, bir müşteri, bir davet veya bir mail bu eşiğin başlangıcı olabilir.",
        quote: "Şafak Eşiği çoğu zaman geçilirken fark edilmez.",
        questions: [
          "Bu sonucu bana getiren en önemli üç faktör nedir?",
          "Bunu başka alanlara nasıl uygular ve sistematik hale getiririm?",
          "Bu ivmeyi nasıl koruyabilirim?",
        ],
        visual: "expansion",
      },
      {
        no: "06",
        slug: "yillanma",
        title: "Yıllanma",
        subtitle: "Başarıdan sonraki en büyük risk: başarı.",
        body:
          "İlk beş adım doğru atıldığında bu aşama huzurun aşamasıdır. Fakat burada önemli olan tek şey rehavete kapılmamaktır. İnsan dinlenebilir; fakat gelişim tamamen duramaz. Başarı Rehaveti, daha büyük başarılara geçişin önündeki en sessiz engeldir.",
        quote: "Başarılı olanlarla büyük olanlar arasındaki fark, başarıdan sonra ne yaptıklarıdır.",
        visual: "aging",
        wide: true,
        visualLabel: "DİSİPLİN\nBAŞARIYI MİRASA DÖNÜŞTÜRÜR",
      },
      {
        no: "+1",
        slug: "tekrar",
        title: "Tekrar",
        subtitle: "Tekrar, hayattır.",
        body:
          "Adımların sonunda gerçek tecrübe kazanılır. Bunu cephanesine koyarak tekrarlayanlar, başarıyı yalnızca kazanmaz; onu büyütür ve yaşatırlar. Step by Step döngüseldir, fakat her tekrar sizi daha ileri bir seviyeye taşır.",
        quote: "Başarıya ulaşmak bir kez doğru yapmaktır. Başarıyı büyütmek, doğru olanı tekrar edebilmektir.",
        visual: "repeat",
        questions: ["DAHA FAZLA TECRÜBE", "DAHA FAZLA SEZGİ", "DAHA FAZLA DAYANIKLILIK", "DAHA BÜYÜK ETKİ"],
      },
    ] as Stage[],
    originEyebrow: "DAHA FAZLA DÜŞÜNCE",
    originTitleA: "Metodolojinin kökenini keşfedin.",
    originTitleB: "Başarı Orijinal Değildir.",
    originButton: "Kitabı incele",
    bhsLinkLabel: "BHS metodolojisi",
  },
  en: {
    eyebrow: "STEP BY STEP",
    heroTitleA: "Success is not a leap,",
    heroTitleB: "it is a process.",
    heroBody:
      "Step by Step is Sellf's staged development methodology for helping people and organizations reach their goals with a lower margin of error, in a more sustainable and lasting way.",
    heroBody2:
      "The events people, brands and organizations experience may differ, yet the stages their development passes through remain surprisingly similar. Sellf maps this recurring pattern into six core stages and one cycle of repetition.",
    heroStat: "6 Stages. 1 Cycle.",
    stages: [
      {
        no: "01",
        slug: "development",
        title: "Development",
        subtitle: "Know yourself first.",
        body:
          "This is the stage in which the idea or founder matures. Capabilities and strengths must become visible so the product and direction can be defined accordingly. The Japanese philosophy that most closely mirrors this stage is Ikigai.",
        quote: "Growth begins not with opportunity, but with alignment.",
        questions: [
          "What do I love? What am I genuinely passionate about?",
          "What am I good at? Where is my natural advantage?",
          "What does my sphere of influence need? What problem exists there?",
          "How can this become sustainable? What is the revenue model?",
        ],
        visual: "development",
      },
      {
        no: "02",
        slug: "setup",
        title: "Setup",
        subtitle: "Knowing yourself is not enough. Build a system.",
        body:
          "Development clarifies what should be built. Setup defines how it can continue to stand. Foundations are laid here, and this stage directly aligns with Sellf's BHS methodology.",
        quote: "A structure that depends on the founder's presence is not yet a system.",
        questions: [
          "What should the development stages of this idea, project or brand be?",
          "Who are the people and stakeholders required for those stages?",
          "What is the revenue and sustainability model?",
          "What is my role, and how can the system work without me?",
        ],
        visual: "setup",
      },
      {
        no: "03",
        slug: "maturation",
        title: "Maturation",
        subtitle: "Reaction before Action.",
        body:
          "The first results begin to appear here. Mistakes are recorded and the system improves. The goal is not to react impulsively, but to understand reaction before taking action.",
        quote: "A single reaction is not data. Repeated reaction is a signal.",
        questions: [
          "How much independent feedback makes a problem legitimate?",
          "Which parts of the system should change in response?",
          "Do current needs require new products or services?",
          "Who are the competitors and where are our blind spots?",
        ],
        visual: "maturity",
      },
      {
        no: "04",
        slug: "pain-threshold",
        title: "Pain Threshold",
        subtitle: "Where the urge to quit begins.",
        body:
          "This unavoidable stage is what matures and strengthens people and brands. It is not an optimization phase; it is a period of thought, endurance and perception. The better the first three stages were built, the shorter this period tends to be.",
        quote: "The real test of sustainability is not growth, but continuing when the outcome is not yet visible.",
        visual: "pain",
        wide: true,
        visualLabel: "STRONGER PEOPLE\nBUILD STRONGER BRANDS",
      },
      {
        no: "05",
        slug: "expansion",
        title: "Expansion",
        subtitle: "The Dawn Threshold.",
        body:
          "This is where people and brands truly begin to grow. Between the Pain Threshold and Expansion sits the Dawn Threshold. It is often invisible while it happens: one customer, one comment, one invitation or one email can be the signal.",
        quote: "The Dawn Threshold is usually recognized only after it has been crossed.",
        questions: [
          "What were the three most important factors behind this result?",
          "How can I apply and systematize them elsewhere?",
          "How can I preserve this momentum?",
        ],
        visual: "expansion",
      },
      {
        no: "06",
        slug: "aging",
        title: "Aging",
        subtitle: "The greatest risk after success is success itself.",
        body:
          "When the first five stages are built correctly, this becomes a stage of calm. The danger is complacency. A person can rest, but development cannot stop entirely. Success Complacency is one of the quietest barriers to becoming truly great.",
        quote: "The difference between the successful and the great is what they do after success.",
        visual: "aging",
        wide: true,
        visualLabel: "DISCIPLINE\nTURNS SUCCESS INTO A LEGACY",
      },
      {
        no: "+1",
        slug: "repeat",
        title: "Repeat",
        subtitle: "Repetition is life.",
        body:
          "Real experience is gained at the end of the stages. Those who repeat with that experience do not merely achieve success; they grow it and keep it alive. Step by Step is cyclical, but each repetition carries you to a higher level.",
        quote: "Reaching success is doing the right thing once. Growing success is being able to repeat what is right.",
        visual: "repeat",
        questions: ["MORE EXPERIENCE", "MORE INTUITION", "MORE RESILIENCE", "GREATER IMPACT"],
      },
    ] as Stage[],
    originEyebrow: "MORE THOUGHT",
    originTitleA: "Discover the origin of the methodology.",
    originTitleB: "Success Is Not Original.",
    originButton: "Explore the book",
    bhsLinkLabel: "BHS methodology",
  },
} as const;

const visualPositions: Record<string, string> = {
  hero: "0%",
  development: "14.2857%",
  setup: "28.5714%",
  maturity: "42.8571%",
  pain: "57.1429%",
  expansion: "71.4286%",
  aging: "85.7143%",
  repeat: "100%",
};

function Visual({ name, label, className = "" }: { name: string; label?: string; className?: string }) {
  return (
    <div
      className={`${styles.visual} ${className}`}
      style={{ backgroundPosition: `center ${visualPositions[name]}` }}
      aria-hidden="true"
    >
      {label ? <span className={styles.visualLabel}>{label.split("\n").map((line) => <span key={line}>{line}</span>)}</span> : null}
    </div>
  );
}

export default function StepByStepPage({ lang }: { lang: Lang }) {
  const c = copy[lang];

  return (
    <main className={styles.page} id="step-by-step">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1><span>{c.heroTitleA}</span><span>{c.heroTitleB}</span></h1>
          <p className={styles.heroBody}>{c.heroBody}</p>
          <p className={styles.heroBodySecondary}>{c.heroBody2}</p>
          <p className={styles.heroStat}>{c.heroStat}</p>
        </div>
        <Visual name="hero" className={styles.heroVisual} />
      </section>

      <section className={styles.stages} aria-label={lang === "tr" ? "Step by Step aşamaları" : "Step by Step stages"}>
        {c.stages.map((stage) => {
          const setupStage = stage.slug === "kurulum" || stage.slug === "setup";
          return (
            <article key={stage.slug} id={stage.slug} className={`${styles.stage} ${stage.wide ? styles.stageWide : ""}`}>
              <div className={styles.stageCopy}>
                <p className={styles.stageNo}>{stage.no}</p>
                <h2>{stage.title}</h2>
                <p className={styles.stageSubtitle}>{stage.subtitle}</p>
                <p className={styles.stageBody}>
                  {setupStage ? (
                    <>
                      {stage.body.split(lang === "tr" ? "BHS metodolojisi" : "BHS methodology")[0]}
                      <Link href={`/${lang}/framework/bhs`} className={styles.inlineLink}>{c.bhsLinkLabel}</Link>
                      {stage.body.split(lang === "tr" ? "BHS metodolojisi" : "BHS methodology")[1]}
                    </>
                  ) : stage.body}
                </p>
                <blockquote>{stage.quote}</blockquote>
              </div>

              <Visual name={stage.visual} label={stage.visualLabel} className={stage.wide ? styles.wideVisual : ""} />

              {stage.questions ? (
                <ol className={`${styles.questions} ${stage.slug === "tekrar" || stage.slug === "repeat" ? styles.questionManifesto : ""}`}>
                  {stage.questions.map((question, index) => (
                    <li key={question}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{question}</p>
                    </li>
                  ))}
                </ol>
              ) : null}
            </article>
          );
        })}
      </section>

      <section className={styles.origin} id="methodology-origin">
        <div>
          <p className={styles.eyebrow}>{c.originEyebrow}</p>
          <h2><span>{c.originTitleA}</span><span>{c.originTitleB}</span></h2>
        </div>
        <span className={styles.bookButton}>{c.originButton}<span aria-hidden="true">→</span></span>
      </section>
    </main>
  );
}
