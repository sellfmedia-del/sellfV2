import Link from "next/link";
import styles from "./OperatingModelPage.module.css";

type SupportedLang = "tr" | "en";
type Step = { no: string; title: string; body: string; detail: string };

const copy = {
  tr: {
    eyebrow: "SELLF İŞLETİM MODELİ",
    titleA: "Strateji ve Operasyon,",
    titleB: "birlikte daha güçlü.",
    intro: "Sellf, büyümeyi iki ayrı sistemle yönetir: Büyüme ve Operasyon. Biri yönü, planı ve denetimi üstlenir. Diğeri bu planı hayata geçirir. Birlikte, markaların hedeflerine giden en kısa ve verimli yolu kurar.",
    statement: "Marka hedefi belirler. Sellf rotayı kurar.",
    heroLeftWords: ["STRATEJİ", "İÇGÖRÜ", "YÖN", "SORUMLULUK"],
    heroRightWords: ["UYGULAMA", "YARATICILIK", "TEKNOLOJİ", "OPTİMİZASYON"],
    heroLeftLabel: "BÜYÜME",
    heroRightLabel: "OPERASYON",
    growthIndex: "01",
    growthTitle: "Büyüme",
    growthSub: "Yön, yönetim ve sorumluluk.",
    growthBody: "Tamamı danışmanlardan oluşan 11 kişilik Büyüme ekibi; BHS'i ölçer, RGI'ı takip eder, stratejiyi belirler, veri analizini yapar, pazar ve rakip araştırmalarını tamamlar, operasyonun Adım Adım metodolojisine uygun ilerleyip ilerlemediğini denetler ve markanın hedeflerine giden rotayı sürekli yönetir.",
    growthNote: "Hukuk, finans, büyüme liderliği, marka yönetimi, sanat yönetimi, veri analitiği ve operasyonel mükemmellik gibi farklı uzmanlıklardan oluşur.",
    growthTags: ["STRATEJİ", "VERİ ANALİZİ", "PAZAR ARAŞTIRMASI", "DENETİM", "SONUÇ ODAKLILIK"],
    opsIndex: "02",
    opsTitle: "Operasyon",
    opsSub: "Stratejiyi sonuca dönüştüren güç.",
    opsBody: "23 ayrı operasyonel dikeyde uzmanlaşmış ekip; reklam, yazılım, tasarım, SEO, e-posta pazarlaması ve daha fazlasında planlama, uygulama, optimizasyon ve raporlamayı yürütür. Her operasyon, belirlenen strateji ve plana göre kendi alanındaki ayrıntıları yönetir.",
    opsNote: "Büyüme ekibi neyin ve ne zaman olması gerektiğini belirler. Operasyon ekibi bunun tam olarak nasıl uygulanacağını belirler.",
    opsTags: ["UYGULAMA", "YARATICILIK", "TEKNOLOJİ", "OPTİMİZASYON", "SÜREKLİ İYİLEŞTİRME"],
    integratedEyebrow: "ENTEGRE BÜYÜME MODELİ",
    integratedTitleA: "Hedeften sonuca,",
    integratedTitleB: "net bir süreç.",
    integratedIntro: "Entegre Büyüme Danışmanlığı ile markanın hedefini alır, bir yol haritası oluşturur ve bu yol haritasını operasyonel güçle hayata geçiririz.",
    integratedCta: "Detaylı süreci gör",
    steps: [
      { no: "01", title: "Hedefleri Belirle", body: "Marka 1–3 öncelikli, ölçülebilir hedefini; hedefe ulaşmak istediği vadeyi ve büyümeye ayırabileceği toplam bütçeyi belirler.", detail: "Büyüme bütçesi yalnızca medya harcaması değildir; reklam, içerik üreticisi iş birlikleri, halkla ilişkiler, etkinlik, prodüksiyon, hizmet bedeli ve hedefe ulaşmak için gerekli diğer büyüme yatırımlarını kapsar." },
      { no: "02", title: "Analiz Et", body: "11 kişilik danışman ekibinden hedeflere en uygun 4 danışman atanır. Büyüme Lideri ve Veri Analisti her zaman bu çekirdekte yer alır.", detail: "İlk iki haftada tam kapsamlı BHS çıkarılır; darboğazlar, sorun noktaları, öncelikler, pazar, rakip ve hedef kitle analiz edilir ve markaya sunulur." },
      { no: "03", title: "Yol Haritasını Kur", body: "BHS onaylandıktan sonra hedef vadesinin tamamını kapsayan ayrıntılı stratejik yol haritası hazırlanır. Bu plan genellikle yıllıktır ve altı aydan kısa kurulmaz.", detail: "Adımlar, sürekli devam eden operasyonlar, proje kapsamları, takvimler, bütçe kırılımları ve performans eşikleri belirlenir. Operasyon dikeylerinin ayrıntılı kampanya ve kanal planları uzman ekiplere bırakılır." },
      { no: "04", title: "Operasyonu Devreye Al", body: "Strateji onaylandıktan sonra başlangıçtaki 4 danışmandan en uygun 1 veya gerektiğinde 2 danışman projenin başında kalır.", detail: "Diğer danışmanlar çekilir; yol haritasının ihtiyaç duyduğu operasyon ekipleri devreye girer. Marka 23 operasyonun tamamını değil, hedefin gerektirdiği ekipleri kullanır." },
      { no: "05", title: "Performansı Yönet", body: "Kalan danışman, stratejinin uygulanmasını, Adım Adım metodolojisine uyumu, BHS ve RGI gelişimini ve operasyonların performansını sürekli denetler.", detail: "Veri veya koşullar rotanın değişmesi gerektiğini gösterirse strateji güncellenir; hedef sabit kalır ve performans hedefe karşı yönetilir." },
    ] as Step[],
    modesEyebrow: "İKİ FARKLI İŞ BİRLİĞİ MODELİ",
    integratedModeTitle: "Büyüme + Operasyon",
    integratedModeSub: "Direksiyon Sellf'te.",
    integratedModeBody: "Marka hedeflerini, vadesini ve toplam büyüme bütçesini belirler. Sellf teşhisi yapar, stratejiyi kurar, operasyonları yönetir ve performansı hedefe karşı denetleyerek rotanın tamamını üstlenir.",
    integratedChecks: ["Hedef odaklı strateji ve yol haritası", "Tüm operasyonların koordinasyonu", "Sürekli denetim ve optimizasyon", "Sözleşmeye bağlı sonuç sorumluluğu"],
    integratedFoot: "Büyüme ekibinin dahil olduğu çalışmalarda, sözleşme koşullarına göre hedeflere yönelik taahhüt verilebilir. Tanımlı hedef mutabık kalınan vadede sağlanamazsa toplam hizmet bedelinin %10–20'si markaya iade edilebilir.",
    opsOnlyTitle: "Sadece Operasyon",
    opsOnlySub: "Direksiyon sizde.",
    opsOnlyBody: "Büyüme ekibi olmadan da çalışabilirsiniz. Bu modelde stratejik yönlendirme markaya aittir; Sellf yalnızca seçilen operasyonel dikeylerde planlama, uygulama, optimizasyon ve raporlamayı üstlenir.",
    opsOnlyChecks: ["Seçilen dikeylerde operasyonel destek", "Planlama, uygulama ve raporlama", "Stratejik yönlendirme markaya ait", "Esnek ve odaklı iş birliği"],
    modeCta: "Daha Fazla Bilgi",
    integratedScenic: ["SELLF", "DİREKSİYONDA"],
    opsScenic: ["SİZ", "DİREKSİYONDASINIZ"],
    finalTitle: "Tek Sistem. İki Sorumluluk.",
    finalBody: "Büyüme yönü belirler. Operasyon sonuca ulaştırır. Birlikte, markaların sürdürülebilir büyümesini mümkün kılar.",
    finalCta: "Benim markam için en uygunu hangisi?",
  },
  en: {
    eyebrow: "SELLF OPERATING MODEL",
    titleA: "Strategy and Operations,",
    titleB: "stronger together.",
    intro: "Sellf manages growth through two distinct systems: Growth and Operations. One owns direction, planning and governance. The other turns that plan into execution. Together, they build the shortest and most efficient route toward the brand's goals.",
    statement: "The brand defines the goal. Sellf builds the route.",
    heroLeftWords: ["STRATEGY", "INSIGHT", "DIRECTION", "ACCOUNTABILITY"],
    heroRightWords: ["EXECUTION", "CREATIVE", "TECHNOLOGY", "OPTIMIZATION"],
    heroLeftLabel: "GROWTH",
    heroRightLabel: "OPERATIONS",
    growthIndex: "01",
    growthTitle: "Growth",
    growthSub: "Direction, governance and accountability.",
    growthBody: "The 11-person Growth team is made up entirely of consultants. It measures BHS, tracks RGI, defines strategy, analyses data, completes market and competitor research, audits whether operations follow the Step by Step methodology and continuously governs the route toward the brand's objectives.",
    growthNote: "Its expertise spans legal, finance, growth leadership, brand direction, art direction, data analytics and operational excellence.",
    growthTags: ["STRATEGY", "DATA ANALYSIS", "MARKET RESEARCH", "GOVERNANCE", "OUTCOME FOCUS"],
    opsIndex: "02",
    opsTitle: "Operations",
    opsSub: "The force that turns strategy into outcomes.",
    opsBody: "A specialist execution team across 23 operational verticals handles planning, execution, optimization and reporting in advertising, software, design, SEO, email marketing and more. Each operation manages the detailed execution within its own discipline according to the agreed strategy and plan.",
    opsNote: "Growth determines what must happen and when. Operations determines exactly how it gets executed.",
    opsTags: ["EXECUTION", "CREATIVE", "TECHNOLOGY", "OPTIMIZATION", "CONTINUOUS IMPROVEMENT"],
    integratedEyebrow: "INTEGRATED GROWTH MODEL",
    integratedTitleA: "From objective to outcome,",
    integratedTitleB: "one clear process.",
    integratedIntro: "With Integrated Growth Consulting, we take the brand's objective, build the route and bring that route to life with specialized operational power.",
    integratedCta: "See the full process",
    steps: [
      { no: "01", title: "Define the Objectives", body: "The brand defines 1–3 prioritized, measurable objectives, the time horizon for achieving them and the total budget available for growth.", detail: "The growth budget is broader than media spend; it can include advertising, creators, PR, events, production, service fees and any other investment required to reach the objective." },
      { no: "02", title: "Diagnose", body: "Four consultants are selected from the 11-person Growth team according to the brand's objectives. A Growth Lead and Data Analyst are always part of the core team.", detail: "During the first two weeks, a full-scope BHS identifies bottlenecks, pain points, priorities, market dynamics, competitors and target audiences and is then presented to the brand." },
      { no: "03", title: "Build the Roadmap", body: "Once BHS is approved, a detailed strategic roadmap is built for the complete time horizon. It is generally annual and is never designed for periods shorter than six months.", detail: "The roadmap defines initiatives, always-on operations, project scopes, timing, budget allocation and performance thresholds while leaving detailed campaign and channel planning to the operational specialists." },
      { no: "04", title: "Activate Operations", body: "After strategy approval, the most relevant one or, when required, two consultants remain at the head of the engagement.", detail: "The other consultants step out and the Operations teams required by the roadmap step in. The brand does not use all 23 operations, only the capabilities required by the objective." },
      { no: "05", title: "Govern Performance", body: "The remaining consultant continuously audits roadmap execution, Step by Step compliance, BHS and RGI movement and operational performance.", detail: "When data or conditions show that the route must change, strategy adapts while the destination remains clear and performance stays managed against the objective." },
    ] as Step[],
    modesEyebrow: "TWO WAYS TO WORK",
    integratedModeTitle: "Growth + Operations",
    integratedModeSub: "Sellf takes the wheel.",
    integratedModeBody: "The brand defines objectives, time horizon and total growth budget. Sellf diagnoses the business, builds the strategy, directs the operations and governs performance against the objective, taking ownership of the full route.",
    integratedChecks: ["Objective-led strategy and roadmap", "Coordination across every required operation", "Continuous governance and optimization", "Contractual outcome accountability where applicable"],
    integratedFoot: "When the Growth team is included, Sellf can assume contractual accountability toward agreed objectives. Subject to engagement terms, if the defined target is not achieved within the agreed time horizon, 10–20% of the total service fee may be returned to the brand.",
    opsOnlyTitle: "Operations Only",
    opsOnlySub: "You take the wheel.",
    opsOnlyBody: "You can also work with Sellf without the Growth team. In this model, strategic ownership remains with the brand while Sellf handles planning, execution, optimization and reporting only within the selected operational verticals.",
    opsOnlyChecks: ["Operational support in selected verticals", "Planning, execution and reporting", "Strategic direction remains with the brand", "Flexible and focused collaboration"],
    modeCta: "Learn More",
    integratedScenic: ["SELLF", "TAKES THE WHEEL"],
    opsScenic: ["YOU", "TAKE THE WHEEL"],
    finalTitle: "One System. Two Responsibilities.",
    finalBody: "Growth sets the direction. Operations delivers the outcome. Together, they make sustainable growth possible.",
    finalCta: "Which model fits my brand?",
  },
} as const;

function Arrow() { return <span aria-hidden="true">→</span> }
function Check() { return <span className={styles.check} aria-hidden="true">✓</span> }

export default function OperatingModelPage({ lang }: { lang: SupportedLang }) {
  const c = copy[lang];
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h1><span>{c.titleA}</span><span className={styles.heroMuted}>{c.titleB}</span></h1>
            <p className={styles.heroIntro}>{c.intro}</p>
            <div className={styles.heroRule} />
            <p className={styles.heroStatement}>{c.statement}</p>
          </div>
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={`${styles.heroDoor} ${styles.heroDoorLeft}`}><div className={styles.heroDoorWords}>{c.heroLeftWords.map((word)=><span key={word}>{word}</span>)}</div><strong>{c.heroLeftLabel}</strong></div>
            <div className={`${styles.heroDoor} ${styles.heroDoorRight}`}><div className={styles.heroDoorWords}>{c.heroRightWords.map((word)=><span key={word}>{word}</span>)}</div><strong>{c.heroRightLabel}</strong></div>
            <div className={styles.heroLight} /><div className={styles.figure}><span /></div><div className={styles.floorLight} />
          </div>
        </div>
      </section>

      <section className={styles.teamSection}>
        <div className={styles.teamGrid}>
          <article className={styles.teamCard}>
            <div className={styles.teamTopline}><span>{c.growthIndex}</span><i /></div>
            <div className={styles.teamCopy}><h2>{c.growthTitle}</h2><p className={styles.teamSub}>{c.growthSub}</p><p className={styles.teamBody}>{c.growthBody}</p><p className={styles.teamNote}>{c.growthNote}</p></div>
            <div className={styles.rings} aria-hidden="true"><i /><i /><i /><i /></div>
            <div className={styles.teamTags}>{c.growthTags.map((tag)=><span key={tag}>{tag}</span>)}</div>
          </article>
          <article className={styles.teamCard}>
            <div className={styles.teamTopline}><span>{c.opsIndex}</span><i /></div>
            <div className={styles.teamCopy}><h2>{c.opsTitle}</h2><p className={styles.teamSub}>{c.opsSub}</p><p className={styles.teamBody}>{c.opsBody}</p><p className={styles.teamNote}>{c.opsNote}</p></div>
            <div className={styles.layers} aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className={styles.teamTags}>{c.opsTags.map((tag)=><span key={tag}>{tag}</span>)}</div>
          </article>
        </div>
      </section>

      <section className={styles.integratedSection} id="integrated-model">
        <div className={styles.integratedHeader}>
          <div><p className={styles.kicker}>{c.integratedEyebrow}</p><h2><span>{c.integratedTitleA}</span><span>{c.integratedTitleB}</span></h2></div>
          <p>{c.integratedIntro}</p><a href="#model-steps" className={styles.textLink}>{c.integratedCta}<Arrow /></a>
        </div>
        <div className={styles.steps} id="model-steps">
          <div className={styles.stepLine} aria-hidden="true" />
          {c.steps.map((step)=><article className={styles.step} key={step.no}><div className={styles.stepDot}>{step.no}</div><h3>{step.title}</h3><p>{step.body}</p><p className={styles.stepDetail}>{step.detail}</p></article>)}
        </div>
      </section>

      <section className={styles.modesSection}>
        <p className={styles.kicker}>{c.modesEyebrow}</p>
        <div className={styles.modesGrid}>
          <article className={`${styles.modeCard} ${styles.modeIntegrated}`}>
            <div className={styles.modeScenicA} aria-hidden="true"><div className={styles.modePlanet} /><div className={styles.modeHorizon} /><span>{c.integratedScenic[0]}<br/>{c.integratedScenic[1]}</span></div>
            <div className={styles.modeContent}><h2>{c.integratedModeTitle}</h2><p className={styles.modeSub}>{c.integratedModeSub}</p><p className={styles.modeBody}>{c.integratedModeBody}</p><ul>{c.integratedChecks.map((item)=><li key={item}><Check />{item}</li>)}</ul><p className={styles.modeFoot}>{c.integratedFoot}</p><Link href={`/${lang}/contact`} className={styles.pillButton}>{c.modeCta}<Arrow /></Link></div>
          </article>
          <article className={`${styles.modeCard} ${styles.modeOperations}`}>
            <div className={styles.modeScenicB} aria-hidden="true"><div className={styles.road}><i /><i /></div><div className={styles.mirror} /><span>{c.opsScenic[0]}<br/>{c.opsScenic[1]}</span></div>
            <div className={styles.modeContent}><h2>{c.opsOnlyTitle}</h2><p className={styles.modeSub}>{c.opsOnlySub}</p><p className={styles.modeBody}>{c.opsOnlyBody}</p><ul>{c.opsOnlyChecks.map((item)=><li key={item}><Check />{item}</li>)}</ul><Link href={`/${lang}/contact`} className={styles.pillButton}>{c.modeCta}<Arrow /></Link></div>
          </article>
        </div>
      </section>

      <section className={styles.finalStrip}><h2>{c.finalTitle}</h2><p>{c.finalBody}</p><Link href={`/${lang}/contact`} className={styles.finalLink}>{c.finalCta}<Arrow /></Link></section>
    </main>
  );
}
