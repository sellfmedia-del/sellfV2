import Link from "next/link";
import styles from "./OperatingModelPage.module.css";

type SupportedLang = "tr" | "en";

type Step = {
  no: string;
  eyebrow: string;
  title: string;
  body: string;
  detail?: string;
};

const copy = {
  tr: {
    eyebrow: "SELLF OPERATING MODEL",
    titleA: "Strateji ve execution,",
    titleB: "aynı sorumluluk değildir.",
    intro:
      "Sellf iki ayrı sistemle çalışır: Growth ve Operations. Growth yönü, yönetimi ve accountability'yi üstlenir. Operations ise bu yönü execution'a dönüştürür.",
    statement: "Marka hedefi belirler. Sellf rotayı kurar.",
    growthLabel: "GROWTH",
    growthTitle: "Direction, governance & accountability.",
    growthBody:
      "11 danışmandan oluşan Growth Team; BHS'i çıkarır, RGI'ı takip eder, Step by Step metodolojisini denetler, stratejiyi kurar, veriyi analiz eder ve markanın hedeflerine giden rotayı sürekli yönetir.",
    growthFoot: "Growth tek tek kanalları yürütmez. Sistemi yönetir.",
    opsLabel: "OPERATIONS",
    opsTitle: "Specialized execution.",
    opsBody:
      "Operations, reklamdan yazılıma, SEO'dan tasarıma ve e-mail marketing'e kadar 23 ayrı operasyonel dikeyde planlama, execution, optimizasyon ve raporlamayı yürütür.",
    opsFoot: "Operations stratejiyi çıktıya dönüştürür.",
    ruleA: "Growth neyin, ne zaman olması gerektiğini belirler.",
    ruleB: "Operations bunun tam olarak nasıl uygulanacağını belirler.",
    integratedEyebrow: "ENTEGRE MODEL",
    integratedTitle: "The brand defines the destination. Sellf takes the wheel.",
    integratedBody:
      "Tam entegre model hizmet listesiyle değil, business objective'lerle başlar. Marka 1–3 öncelikli hedefini, vadesini ve büyümeye ayırabileceği toplam bütçeyi tanımlar. Sellf ise hedefe ulaşmak için gerekli sistemi kurar, operasyonları aktive eder ve performansı yönetir.",
    budgetTitle: "Growth Budget ≠ Media Budget",
    budgetBody:
      "Reklam bütçesi tek başına yeterli değildir. Growth Budget; medya, influencer, PR, etkinlik, prodüksiyon, hizmet bedeli ve hedefe ulaşmak için gerekebilecek diğer tüm büyüme yatırımlarını kapsar.",
    steps: [
      {
        no: "01",
        eyebrow: "OBJECTIVES",
        title: "Önce destinasyonu tanımlarız.",
        body: "Marka 1–3 öncelikli, ölçülebilir business objective belirler. Rezervasyon artışı, e-ticaret hacmi, yeni pazar, günlük sipariş, pazar payı veya marka bilinirliği — hedef sektöre ve markaya göre değişir.",
        detail: "Hedef + Time Horizon + Growth Budget",
      },
      {
        no: "02",
        eyebrow: "DIAGNOSE",
        title: "Büyümeyi neyin durdurduğunu buluruz.",
        body: "11 kişilik danışman ekibinden markaya en uygun 4 danışman atanır. Growth Lead ve Data Analyst her zaman çekirdektedir. İlk iki haftada full-scope BHS çıkarılır; bottleneck'ler, pain point'ler, öncelikli sorunlar, pazar, rakip ve hedef kitle analiz edilir.",
        detail: "4 Consultants → Full-Scope BHS",
      },
      {
        no: "03",
        eyebrow: "ROADMAP",
        title: "Teşhisi gerçek bir operating plan'e çeviririz.",
        body: "BHS onaylandıktan sonra, genellikle yıllık ve hiçbir zaman 6 aydan kısa olmayan stratejik roadmap hazırlanır. Adımlar, always-on operasyonlar, project scope'lar, takvimler, bütçe kırılımları ve performans eşikleri tek yapıda planlanır.",
        detail: "Week 3–4 → Strategic Growth Roadmap",
      },
      {
        no: "04",
        eyebrow: "ACTIVATE",
        title: "Doğru operasyonları doğru zamanda aktive ederiz.",
        body: "Roadmap onaylandıktan sonra başlangıçtaki 4 danışmandan 1 veya gerektiğinde 2'si proje başında kalır. Geri kalan uzmanlar çekilir; planın ihtiyaç duyduğu Operations ekipleri devreye girer. Marka 23 operasyonun tamamını değil, hedefin gerektirdiklerini kullanır.",
        detail: "1–2 Consultants + Required Operations",
      },
      {
        no: "05",
        eyebrow: "GOVERN",
        title: "Execution'ı destinasyona karşı yönetiriz.",
        body: "Kalan Growth danışmanı planın uygulanmasını, Step by Step uyumunu, BHS/RGI gelişimini ve performansı sürekli denetler. Veri veya koşullar rotanın değişmesi gerektiğini gösterirse strateji adapte edilir; hedef net kalır.",
        detail: "Continuous Governance → Outcome",
      },
    ] as Step[],
    exampleEyebrow: "STRATEGY VS EXECUTION",
    exampleTitle: "Roadmap yönü belirler. Operasyon detaylandırır.",
    exampleLead:
      "Örneğin roadmap ilk iki ay Meta, üçüncü ay Google aktivasyonu, dördüncü ay 5x ROAS hedefi ve ardından influencer katmanı öngörebilir.",
    exampleBody:
      "Growth; platformu, zamanı, bütçeyi ve beklenen sonucu belirler. Advertising Operations ise kampanya mimarisini, PPC dağılımını, campaign type'ları ve kanal içi optimizasyonu tasarlar.",
    modesEyebrow: "İKİ ÇALIŞMA MODELİ",
    modesTitle: "Direksiyonda kimin olduğu her şeyi değiştirir.",
    integratedMode: "Growth + Operations",
    integratedModeTitle: "Sellf takes the wheel.",
    integratedModeBody:
      "Marka hedeflerini, vadeyi ve Growth Budget'ı tanımlar. Sellf teşhisi yapar, rotayı kurar, gerekli operasyonları koordine eder ve performansı hedefe karşı yönetir.",
    accountability:
      "Growth Team dahil olduğunda Sellf, sözleşme koşullarına göre hedeflere karşı accountability üstlenebilir. Tanımlı hedef, mutabık kalınan vadede sağlanamazsa toplam hizmet bedelinin %10–20'si markaya iade edilebilir.",
    opsOnly: "Operations Only",
    opsOnlyTitle: "You take the wheel. Sellf executes.",
    opsOnlyBody:
      "Growth Team talep edilmezse stratejik yön ve ana kararlar markada kalır. Sellf yalnızca seçilen operasyonel dikeylerde planlama, execution, optimizasyon ve raporlamayı üstlenir.",
    finalEyebrow: "ONE SYSTEM. TWO RESPONSIBILITIES.",
    finalTitle: "Growth owns the direction. Operations owns the execution.",
    finalBody:
      "Birlikte çalıştıklarında Sellf'in tam Operating Model'ini oluştururlar: siz destinasyonu tanımlarsınız, biz rotayı kurar ve uygularız.",
    cta: "Ekibimizle Konuşun",
  },
  en: {
    eyebrow: "SELLF OPERATING MODEL",
    titleA: "Strategy and execution",
    titleB: "are different responsibilities.",
    intro:
      "Sellf operates through two distinct systems: Growth and Operations. Growth owns direction, governance and accountability. Operations turns that direction into execution.",
    statement: "The brand defines the destination. Sellf builds the route.",
    growthLabel: "GROWTH",
    growthTitle: "Direction, governance & accountability.",
    growthBody:
      "Made up of 11 consultants, the Growth Team builds BHS, monitors RGI, audits the Step by Step methodology, develops strategy, analyses data and continuously governs the route toward the brand's objectives.",
    growthFoot: "Growth does not run individual channels. It governs the system.",
    opsLabel: "OPERATIONS",
    opsTitle: "Specialized execution.",
    opsBody:
      "Operations handles planning, execution, optimization and reporting across 23 operational verticals — from advertising and software to SEO, design, email marketing and more.",
    opsFoot: "Operations turns strategy into output.",
    ruleA: "Growth determines what must happen and when.",
    ruleB: "Operations determines exactly how it gets executed.",
    integratedEyebrow: "THE INTEGRATED MODEL",
    integratedTitle: "The brand defines the destination. Sellf takes the wheel.",
    integratedBody:
      "The full model starts with business objectives, not a service list. The brand defines 1–3 prioritized objectives, a time horizon and the total budget available for growth. Sellf then builds the system required to reach them, activates the necessary operations and governs performance.",
    budgetTitle: "Growth Budget ≠ Media Budget",
    budgetBody:
      "Media spend is only one part of growth. Growth Budget can include media, influencers, PR, events, production, service fees and any other investment required to reach the objective.",
    steps: [
      { no: "01", eyebrow: "OBJECTIVES", title: "Define the destination first.", body: "The brand defines 1–3 prioritized, measurable business objectives. Reservation growth, e-commerce volume, market entry, daily order volume, market share or brand awareness — the objective changes with the business.", detail: "Objective + Time Horizon + Growth Budget" },
      { no: "02", eyebrow: "DIAGNOSE", title: "Find what is stopping growth.", body: "Four consultants are selected from the 11-person Growth Team. A Growth Lead and Data Analyst are always in the core team. During the first two weeks, a full-scope BHS identifies bottlenecks, pain points, priorities, market dynamics, competitors and audiences.", detail: "4 Consultants → Full-Scope BHS" },
      { no: "03", eyebrow: "ROADMAP", title: "Turn diagnosis into an operating plan.", body: "Once BHS is approved, a strategic roadmap is built for the full time horizon — generally annual and never shorter than six months. Initiatives, always-on operations, project scopes, timelines, budget allocation and performance thresholds are mapped in one system.", detail: "Week 3–4 → Strategic Growth Roadmap" },
      { no: "04", eyebrow: "ACTIVATE", title: "Activate the right operations at the right time.", body: "After roadmap approval, one or when needed two consultants remain on the engagement. The other specialists step out and the Operations teams required by the roadmap step in. The brand does not use all 23 operations — only the capabilities the objective requires.", detail: "1–2 Consultants + Required Operations" },
      { no: "05", eyebrow: "GOVERN", title: "Manage execution against the destination.", body: "The remaining Growth consultant continuously audits roadmap execution, Step by Step compliance, BHS/RGI movement and performance. When data or conditions require a new route, the strategy adapts while the destination stays clear.", detail: "Continuous Governance → Outcome" },
    ] as Step[],
    exampleEyebrow: "STRATEGY VS EXECUTION",
    exampleTitle: "The roadmap sets direction. Operations specifies the detail.",
    exampleLead: "A roadmap might call for Meta in months one and two, Google activation in month three, a 5x ROAS threshold in month four and an influencer layer after that.",
    exampleBody: "Growth defines the platform, timing, budget and expected outcome. Advertising Operations designs campaign architecture, PPC allocation, campaign types and channel-level optimization.",
    modesEyebrow: "TWO WAYS TO WORK",
    modesTitle: "Who holds the wheel changes everything.",
    integratedMode: "Growth + Operations",
    integratedModeTitle: "Sellf takes the wheel.",
    integratedModeBody: "The brand defines objectives, time horizon and Growth Budget. Sellf diagnoses the business, builds the route, coordinates the required operations and manages performance against the objective.",
    accountability: "When the Growth Team is included, Sellf can assume contractual accountability toward agreed objectives. Subject to engagement terms, if the defined target is not achieved within the agreed time horizon, 10–20% of the total service fee may be returned to the brand.",
    opsOnly: "Operations Only",
    opsOnlyTitle: "You take the wheel. Sellf executes.",
    opsOnlyBody: "Without the Growth Team, strategic ownership and overall direction remain with the brand. Sellf handles planning, execution, optimization and reporting only within the selected operational verticals.",
    finalEyebrow: "ONE SYSTEM. TWO RESPONSIBILITIES.",
    finalTitle: "Growth owns the direction. Operations owns the execution.",
    finalBody: "Together, they form Sellf's complete Operating Model: you define the destination; we build and execute the route.",
    cta: "Talk to Our Team",
  },
} as const;

export default function OperatingModelPage({ lang }: { lang: SupportedLang }) {
  const c = copy[lang];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1><span>{c.titleA}</span><span>{c.titleB}</span></h1>
          <p className={styles.heroIntro}>{c.intro}</p>
          <div className={styles.heroStatement}>{c.statement}</div>
        </div>
      </section>

      <section className={styles.dualSection}>
        <div className={`${styles.container} ${styles.dualGrid}`}>
          <article className={styles.teamCard}>
            <div className={styles.teamIndex}>01</div>
            <p className={styles.eyebrow}>{c.growthLabel}</p>
            <h2>{c.growthTitle}</h2>
            <p>{c.growthBody}</p>
            <strong>{c.growthFoot}</strong>
          </article>
          <article className={`${styles.teamCard} ${styles.teamCardLight}`}>
            <div className={styles.teamIndex}>02</div>
            <p className={styles.eyebrow}>{c.opsLabel}</p>
            <h2>{c.opsTitle}</h2>
            <p>{c.opsBody}</p>
            <strong>{c.opsFoot}</strong>
          </article>
        </div>
        <div className={`${styles.container} ${styles.ruleBar}`}>
          <span>{c.ruleA}</span>
          <span>{c.ruleB}</span>
        </div>
      </section>

      <section className={styles.integrated}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>{c.integratedEyebrow}</p>
          <div className={styles.integratedHeader}>
            <h2>{c.integratedTitle}</h2>
            <p>{c.integratedBody}</p>
          </div>
          <div className={styles.budgetBand}>
            <h3>{c.budgetTitle}</h3>
            <p>{c.budgetBody}</p>
          </div>
        </div>
      </section>

      <section className={styles.stepsSection}>
        <div className={styles.container}>
          <div className={styles.stepsRail}>
            {c.steps.map((step) => (
              <article className={styles.step} key={step.no}>
                <div className={styles.stepNumber}>{step.no}</div>
                <div className={styles.stepBody}>
                  <p className={styles.eyebrow}>{step.eyebrow}</p>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                  {step.detail && <div className={styles.stepDetail}>{step.detail}</div>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.exampleSection}>
        <div className={`${styles.container} ${styles.exampleGrid}`}>
          <div>
            <p className={styles.eyebrow}>{c.exampleEyebrow}</p>
            <h2>{c.exampleTitle}</h2>
          </div>
          <div className={styles.exampleCopy}>
            <p>{c.exampleLead}</p>
            <p>{c.exampleBody}</p>
          </div>
        </div>
      </section>

      <section className={styles.modesSection}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>{c.modesEyebrow}</p>
          <h2 className={styles.modesTitle}>{c.modesTitle}</h2>
          <div className={styles.modesGrid}>
            <article className={styles.modeDark}>
              <span>{c.integratedMode}</span>
              <h3>{c.integratedModeTitle}</h3>
              <p>{c.integratedModeBody}</p>
              <div className={styles.accountability}>{c.accountability}</div>
            </article>
            <article className={styles.modeLight}>
              <span>{c.opsOnly}</span>
              <h3>{c.opsOnlyTitle}</h3>
              <p>{c.opsOnlyBody}</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>{c.finalEyebrow}</p>
          <h2>{c.finalTitle}</h2>
          <p>{c.finalBody}</p>
          <Link href={`/${lang}/contact`} className={styles.cta}>{c.cta}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
