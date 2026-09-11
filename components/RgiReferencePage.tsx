import RgiFrameworkPage from "@/components/RgiFrameworkPage";
import styles from "./RgiReferencePage.module.css";

type SupportedLang = "tr" | "en";

type SummaryCopy = {
  heroEyebrow: string;
  heroTitleA: string;
  heroTitleB: string;
  heroDesc: string;
  heroCta: string;
  glanceEyebrow: string;
  glanceTitle: string;
  glanceDesc: string;
  glanceCta: string;
  bridgeEyebrow: string;
  bridgeTitle: string;
  bridgeDesc: string;
  bridgeCta: string;
  axesEyebrow: string;
  axesTitle: string;
  axesDesc: string;
  axesCta: string;
  layersEyebrow: string;
  layersTitle: string;
  layersDesc: string;
  layersCta: string;
  funnelEyebrow: string;
  funnelTitle: string;
  funnelDesc: string;
  funnelCta: string;
  externalEyebrow: string;
  externalTitle: string;
  externalDesc: string;
  externalCta: string;
  internalEyebrow: string;
  internalTitle: string;
  internalDesc: string;
  internalCta: string;
  cadenceEyebrow: string;
  cadenceTitle: string;
  cadenceDesc: string;
  cadenceCta: string;
  outputEyebrow: string;
  outputTitle: string;
  outputDesc: string;
  outputCta: string;
};

const summaryCopy: Record<SupportedLang, SummaryCopy> = {
  tr: {
    heroEyebrow: "SELLF'E ÖZGÜ BÜYÜME ÇERÇEVESİ",
    heroTitleA: "Büyüme, iyi görünen şey değildir.",
    heroTitleB: "Ölçülebilir biçimde gerçekten ilerleyen şeydir.",
    heroDesc:
      "Satış, trafik, erişim veya kampanya sonuçları tek başına gerçek büyümeyi kanıtlamaz. RGI — Gerçek Büyüme Endeksi, BHS ile belirlenen başlangıç noktasından itibaren marka ve ürün performansının gerçekten ne kadar ilerlediğini ölçmek için geliştirdiğimiz Sellf büyüme indeksidir.",
    heroCta: "RGI Nasıl Çalışır",
    glanceEyebrow: "RGI'YA HIZLI BAKIŞ",
    glanceTitle: "Bir performans skoru değil. Bir ilerleme ölçüsü.",
    glanceDesc:
      "RGI sabit bir performans skoru değildir. BHS ile tanımlanan başlangıç noktasını referans alır ve zaman içindeki değişimi ölçerek her sonucun şirketi gerçekten ileri taşıyıp taşımadığını gösterir.",
    glanceCta: "RGI nedir?",
    bridgeEyebrow: "BHS → RGI",
    bridgeTitle: "Önce nerede olduğumuzu tanımlarız. Sonra gerçekten ne kadar ilerlediğimizi ölçeriz.",
    bridgeDesc:
      "BHS başlangıç çizgisini tanımlar. RGI bu başlangıçtan itibaren oluşan değişimi üç aylık ve yıllık periyotlarda izler. Böylece tek bir kampanya sonucu yerine başlangıcı bilinen, tekrar ölçülebilen bir büyüme sistemi kurulur.",
    bridgeCta: "Bağlantıyı gör",
    axesEyebrow: "İKİ EKSEN",
    axesTitle: "Büyüme tek bir yerde gerçekleşmez.",
    axesDesc:
      "RGI şirket performansını Marka ve Ürün eksenlerinde inceler; sonra gerçek büyümeyi anlamak için bu iki alanı tekrar bir araya getirir.",
    axesCta: "Marka & Ürün hakkında",
    layersEyebrow: "ÜÇ PERFORMANS KATMANI",
    layersTitle: "Görünürlüğün ötesinde ne değişti?",
    layersDesc:
      "Tam RGI sistemi büyümeyi pazarlama, finans ve operasyon katmanlarında okur. Çünkü pazarlama performansı yükselirken şirketin finansal veya operasyonel sağlığı aynı anda kötüleşebilir.",
    layersCta: "Katmanları keşfet",
    funnelEyebrow: "DÖNÜŞÜM HUNİSİ GENİŞLİĞİ",
    funnelTitle: "Sağlıklı büyüme dönüşüm hunisinin tek bir noktasında gerçekleşmez.",
    funnelDesc:
      "RGI, dönüşüm hunisinin tamamının ne kadar verimli büyüdüğüne bakar. Hedef, tek bir aşamanın sıçraması değil; aşamaların birbirine yakın oranlarda, dengeli ve sürdürülebilir biçimde genişlemesidir.",
    funnelCta: "Huni verimliliğini gör",
    externalEyebrow: "DIŞ RGI",
    externalTitle: "Dışarıdan ölçülebilir büyüme.",
    externalDesc:
      "Dış RGI, kamuya açık ve doğrulanabilir verilerle Marka ve Ürün eksenlerini Pazarlama Performansı ve Finansal Sağlık katmanlarında ölçer.",
    externalCta: "Dış RGI hakkında",
    internalEyebrow: "İÇ RGI",
    internalTitle: "Şirket verisiyle daha derin bir görünüm.",
    internalDesc:
      "Şirket verisi sisteme girdiğinde Operasyonel Verimlilik de ölçüme eklenir; böylece yalnızca talebi değil, organizasyonun büyümeyi ne kadar sağlıklı taşıdığını da görürüz.",
    internalCta: "İç RGI hakkında",
    cadenceEyebrow: "ÜÇ AYLIK + YILLIK",
    cadenceTitle: "Büyüme tek bir anlık görüntü değildir.",
    cadenceDesc:
      "Üç Aylık RGI kısa ve orta vadeli değişimi, Yıllık RGI ise yapısal gelişimi gösterir. Birlikte yalnızca sonucu değil, büyümenin yönünü ve kalitesini okuruz.",
    cadenceCta: "Zaman perspektifini gör",
    outputEyebrow: "BİR RAPORDAN FAZLASI",
    outputTitle: "Bir gösterge paneli değil. Bir karar sistemi.",
    outputDesc:
      "RGI nerede gerçek büyüme olduğunu, nerede yalnızca metrik artışı bulunduğunu ve odağın bir sonraki adımda nereye kayması gerektiğini görünür hale getirir.",
    outputCta: "Örnek çıktıyı gör",
  },
  en: {
    heroEyebrow: "SELLF PROPRIETARY FRAMEWORK",
    heroTitleA: "Growth isn't what looked good.",
    heroTitleB: "It's what measurably improved.",
    heroDesc:
      "More sales. Higher traffic. A larger audience. Better campaign results. Each of these can be positive. But none of them alone proves a company is truly growing. RGI — Real Growth Index is Sellf's growth index, developed to measure how much real progress a brand has made from the starting point defined by BHS.",
    heroCta: "How RGI Works",
    glanceEyebrow: "RGI AT A GLANCE",
    glanceTitle: "Not a performance score. A progress measure.",
    glanceDesc:
      "RGI is not a static performance score. It takes the starting point defined by BHS and measures change over time, showing how much each result truly moves the company forward.",
    glanceCta: "What is RGI?",
    bridgeEyebrow: "BHS → RGI",
    bridgeTitle: "First we define where we are. Then we measure how much we really improved.",
    bridgeDesc:
      "BHS and RGI serve two different roles in the same measurement system. BHS defines the starting point. RGI measures the change from that point in quarterly and annual periods.",
    bridgeCta: "See the connection",
    axesEyebrow: "TWO AXES",
    axesTitle: "Growth happens in more than one place.",
    axesDesc:
      "RGI evaluates company performance across two main axes, then brings them together to understand real growth.",
    axesCta: "About Brand & Product",
    layersEyebrow: "THREE PERFORMANCE LAYERS",
    layersTitle: "Beyond visibility, what actually changed?",
    layersDesc: "RGI evaluates growth across three core performance areas.",
    layersCta: "Explore the layers",
    funnelEyebrow: "FUNNEL WIDTH",
    funnelTitle: "Healthy growth doesn't happen in just one stage.",
    funnelDesc:
      "RGI measures the efficiency of the entire funnel by looking at how consistently each stage grows. It's not about which stage grows the most, but whether all stages grow together in a balanced and sustainable way.",
    funnelCta: "See how funnel efficiency works",
    externalEyebrow: "EXTERNAL RGI",
    externalTitle: "Measurable growth from the outside.",
    externalDesc:
      "External RGI uses publicly available and verifiable data to evaluate Brand and Product across Marketing Performance and Financial Health.",
    externalCta: "Learn about External RGI",
    internalEyebrow: "INTERNAL RGI",
    internalTitle: "A deeper view with company data.",
    internalDesc:
      "Internal RGI includes operational efficiency by using the company's real data. This allows us to evaluate not only demand and financial results, but also how well the organisation can sustain and scale the growth.",
    internalCta: "Learn about Internal RGI",
    cadenceEyebrow: "QUARTERLY + ANNUAL",
    cadenceTitle: "Growth is not a snapshot.",
    cadenceDesc:
      "Quarterly RGI shows short and mid-term change. Annual RGI reveals structural growth. Together, they show not only the result, but the direction and quality of growth.",
    cadenceCta: "See the time perspective",
    outputEyebrow: "MORE THAN A REPORT",
    outputTitle: "A decision system.",
    outputDesc:
      "RGI reveals where real growth exists, where there is only metric increase, which areas move the company forward, and where focus should shift next. Because the value of measurement is not a report. It's a better next decision.",
    outputCta: "See a sample output",
  },
};

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-[9px] font-semibold uppercase tracking-[.18em] ${dark ? "text-white/58" : "text-[#5f7587]"}`}>
      {children}
    </p>
  );
}

function InlineLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 border-b pb-1 text-[10px] font-medium transition-opacity hover:opacity-60 ${
        dark ? "border-white/35 text-white/82" : "border-black/25 text-black/72"
      }`}
    >
      {children}<span>→</span>
    </a>
  );
}

function Artwork({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`block h-auto w-full ${className}`} />;
}

export default function RgiReferencePage({ lang }: { lang: SupportedLang }) {
  const t = summaryCopy[lang];

  return (
    <>
      <article className="bg-[#f7f9fa] text-[#0b1117]">
        <section className="bg-[#f8fafb]">
          <div className="sellf-container grid gap-8 pb-10 pt-5 md:pb-12 md:pt-8 lg:grid-cols-[.94fr_1.06fr] lg:items-center lg:gap-7">
            <div className="max-w-[610px]">
              <Eyebrow>{t.heroEyebrow}</Eyebrow>
              <h1 className="mt-3 text-[5.35rem] font-semibold leading-[.82] tracking-[-.075em] sm:text-[6.6rem]">RGI</h1>
              <p className="mt-2 text-[18px] font-medium tracking-[-.035em]">{lang === "tr" ? "Gerçek Büyüme Endeksi" : "Real Growth Index"}</p>
              <h2 className="mt-5 max-w-[18ch] text-[2rem] font-semibold leading-[1.02] tracking-[-.048em] sm:text-[2.45rem]">
                {t.heroTitleA}<br/><span className="text-[#7894ac]">{t.heroTitleB}</span>
              </h2>
              <p className="mt-4 max-w-[600px] text-[12px] leading-[1.55] text-black/66">{t.heroDesc}</p>
              <a href="#rgi-glance" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0b1117] px-5 py-2.5 text-[10px] font-semibold text-white">
                {t.heroCta}<span>↓</span>
              </a>
            </div>
            <div className="mx-auto w-full max-w-[530px]">
              <Artwork src={lang === "tr" ? "/framework/rgi/hero-tr.svg" : "/framework/rgi/hero.svg"} alt={lang === "tr" ? "RGI Gerçek Büyüme Endeksi görseli" : "RGI Real Growth Index visual"} />
            </div>
          </div>
        </section>

        <section id="rgi-glance" className="scroll-mt-28 border-y border-[#8296a7]/10 bg-[#eef3f6]">
          <div className="sellf-container grid gap-7 py-7 md:py-8 lg:grid-cols-[.76fr_1.24fr] lg:items-center lg:gap-8">
            <div>
              <Eyebrow>{t.glanceEyebrow}</Eyebrow>
              <h2 className="mt-2 max-w-[15ch] text-[2rem] font-semibold leading-[1.03] tracking-[-.046em] md:text-[2.25rem]">{t.glanceTitle}</h2>
              <p className="mt-4 max-w-[500px] text-[11px] leading-5 text-black/58">{t.glanceDesc}</p>
              <div className="mt-4"><InlineLink href="#rgi-bridge">{t.glanceCta}</InlineLink></div>
            </div>
            <div className="mx-auto w-full max-w-[680px]">
              <Artwork src={lang === "tr" ? "/framework/rgi/glance-tr.svg" : "/framework/rgi/glance.svg"} alt={lang === "tr" ? "RGI hızlı bakış" : "RGI at a glance"} />
            </div>
          </div>
        </section>

        <section id="rgi-bridge" className="scroll-mt-28 bg-[#17222b] text-white">
          <div className="sellf-container grid gap-8 py-7 md:py-9 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-10">
            <div>
              <Eyebrow dark>{t.bridgeEyebrow}</Eyebrow>
              <h2 className="mt-3 max-w-[16ch] text-[2.05rem] font-semibold leading-[1.03] tracking-[-.048em] md:text-[2.35rem]">{t.bridgeTitle}</h2>
              <p className="mt-4 max-w-[590px] text-[11px] leading-5 text-white/62">{t.bridgeDesc}</p>
              <div className="mt-4"><InlineLink href={`/${lang}/framework/bhs`} dark>{t.bridgeCta}</InlineLink></div>
            </div>
            <div className="mx-auto w-full max-w-[650px]">
              <Artwork src={lang === "tr" ? "/framework/rgi/bridge-tr.svg" : "/framework/rgi/bridge.svg"} alt={lang === "tr" ? "BHS'den RGI'a büyüme döngüsü" : "BHS to RGI growth cycle"} />
            </div>
          </div>
        </section>

        <section id="rgi-axes" className="scroll-mt-28 bg-[#f7f9fa]">
          <div className="sellf-container grid gap-8 py-7 md:py-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-10">
            <div>
              <Eyebrow>{t.axesEyebrow}</Eyebrow>
              <h2 className="mt-3 max-w-[14ch] text-[2rem] font-semibold leading-[1.04] tracking-[-.046em] md:text-[2.25rem]">{t.axesTitle}</h2>
              <p className="mt-4 max-w-[500px] text-[11px] leading-5 text-black/58">{t.axesDesc}</p>
              <div className="mt-4"><InlineLink href="#brand">{t.axesCta}</InlineLink></div>
            </div>
            <div className="mx-auto w-full max-w-[690px]">
              <Artwork src={lang === "tr" ? "/framework/rgi/axes-tr.svg" : "/framework/rgi/axes.svg"} alt={lang === "tr" ? "Marka ve Ürün eksenleri" : "Brand and Product axes"} />
            </div>
          </div>
        </section>

        <section id="rgi-layers" className="scroll-mt-28 border-t border-[#8196a8]/10 bg-[#f2f6f8]">
          <div className="sellf-container grid gap-8 py-7 md:py-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-10">
            <div>
              <Eyebrow>{t.layersEyebrow}</Eyebrow>
              <h2 className="mt-3 max-w-[14ch] text-[2rem] font-semibold leading-[1.04] tracking-[-.046em] md:text-[2.25rem]">{t.layersTitle}</h2>
              <p className="mt-4 max-w-[500px] text-[11px] leading-5 text-black/58">{t.layersDesc}</p>
              <div className="mt-4"><InlineLink href="#brand">{t.layersCta}</InlineLink></div>
            </div>
            <div className="mx-auto w-full max-w-[690px]">
              <Artwork src={lang === "tr" ? "/framework/rgi/layers-tr.svg" : "/framework/rgi/layers.svg"} alt={lang === "tr" ? "RGI performans katmanları" : "RGI performance layers"} />
            </div>
          </div>
        </section>

        <section id="rgi-funnel" className="scroll-mt-28 border-y border-[#8196a8]/10 bg-[#edf3f6]">
          <div className="sellf-container grid gap-8 py-7 md:py-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-10">
            <div>
              <Eyebrow>{t.funnelEyebrow}</Eyebrow>
              <h2 className="mt-3 max-w-[15ch] text-[2rem] font-semibold leading-[1.04] tracking-[-.046em] md:text-[2.25rem]">{t.funnelTitle}</h2>
              <p className="mt-4 max-w-[520px] text-[11px] leading-5 text-black/58">{t.funnelDesc}</p>
              <div className="mt-4"><InlineLink href="#product">{t.funnelCta}</InlineLink></div>
            </div>
            <div className="mx-auto w-full max-w-[690px]">
              <Artwork src={lang === "tr" ? "/framework/rgi/funnel-tr.svg" : "/framework/rgi/funnel.svg"} alt={lang === "tr" ? "Dengeli dönüşüm hunisi büyümesi" : "Balanced funnel growth example"} />
            </div>
          </div>
        </section>

        <section id="rgi-external-internal" className="scroll-mt-28 grid lg:grid-cols-2">
          <div className="bg-[#17222b] px-6 py-8 text-white sm:px-10 md:px-12 lg:pl-[max(3.5rem,calc((100vw-1280px)/2))] lg:pr-10">
            <div className="grid h-full grid-cols-[1fr_118px] items-center gap-8">
              <div>
                <Eyebrow dark>{t.externalEyebrow}</Eyebrow>
                <h2 className="mt-3 max-w-[15ch] text-[1.9rem] font-semibold leading-[1.04] tracking-[-.045em]">{t.externalTitle}</h2>
                <p className="mt-4 max-w-[520px] text-[10px] leading-5 text-white/62">{t.externalDesc}</p>
                <div className="mt-4"><InlineLink href="#brand" dark>{t.externalCta}</InlineLink></div>
              </div>
              <div className="hidden sm:grid place-items-center text-center text-[8px] uppercase leading-4 tracking-[.08em] text-white/52">
                <div className="relative grid h-[82px] w-[82px] place-items-center rounded-full border border-white/30 before:absolute before:inset-[12px] before:rounded-full before:border before:border-white/18 after:absolute after:left-1/2 after:top-[8px] after:h-[64px] after:w-px after:-translate-x-1/2 after:bg-white/18">
                  <div className="h-[1px] w-[58px] bg-white/18" />
                </div>
                <span className="mt-2">{lang === "tr" ? <><span>AÇIK VERİ</span><br/><span>GERÇEK İÇGÖRÜ</span></> : <><span>PUBLIC DATA</span><br/><span>REAL INSIGHTS</span></>}</span>
              </div>
            </div>
          </div>
          <div className="bg-[linear-gradient(135deg,#eef4f7,#dfe9ef)] px-6 py-8 sm:px-10 md:px-12 lg:pl-10 lg:pr-[max(3.5rem,calc((100vw-1280px)/2))]">
            <div className="grid h-full grid-cols-[1fr_118px] items-center gap-8">
              <div>
                <Eyebrow>{t.internalEyebrow}</Eyebrow>
                <h2 className="mt-3 max-w-[15ch] text-[1.9rem] font-semibold leading-[1.04] tracking-[-.045em]">{t.internalTitle}</h2>
                <p className="mt-4 max-w-[520px] text-[10px] leading-5 text-black/58">{t.internalDesc}</p>
                <div className="mt-4"><InlineLink href="#product">{t.internalCta}</InlineLink></div>
              </div>
              <div className="hidden sm:grid place-items-center text-center text-[8px] uppercase leading-4 tracking-[.08em] text-[#6c879b]">
                <div className="grid h-[82px] w-[82px] place-items-center rounded-full border border-[#6f8da4]/35 text-3xl font-light">▢</div>
                <span className="mt-2">{lang === "tr" ? <><span>DERİN VERİ</span><br/><span>GÜÇLÜ KARARLAR</span></> : <><span>DEEPER DATA</span><br/><span>STRONGER DECISIONS</span></>}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="rgi-cadence" className="scroll-mt-28 bg-[#f7f9fa]">
          <div className="sellf-container grid gap-8 py-6 md:py-7 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:gap-10">
            <div>
              <Eyebrow>{t.cadenceEyebrow}</Eyebrow>
              <h2 className="mt-2 max-w-[15ch] text-[1.85rem] font-semibold leading-[1.04] tracking-[-.045em] md:text-[2.1rem]">{t.cadenceTitle}</h2>
              <p className="mt-3 max-w-[500px] text-[10px] leading-5 text-black/58">{t.cadenceDesc}</p>
              <div className="mt-3"><InlineLink href="#rgi-output">{t.cadenceCta}</InlineLink></div>
            </div>
            <div className="mx-auto w-full max-w-[690px]">
              <Artwork src={lang === "tr" ? "/framework/rgi/cadence-tr.svg" : "/framework/rgi/cadence.svg"} alt={lang === "tr" ? "Üç aylık ve yıllık RGI büyüme görünümü" : "Quarterly and annual RGI growth view"} />
            </div>
          </div>
        </section>

        <section id="rgi-output" className="scroll-mt-28 border-t border-[#8196a8]/10 bg-[#f2f5f7]">
          <div className="sellf-container grid gap-8 py-6 md:py-7 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:gap-10">
            <div>
              <Eyebrow>{t.outputEyebrow}</Eyebrow>
              <h2 className="mt-2 max-w-[15ch] text-[1.85rem] font-semibold leading-[1.04] tracking-[-.045em] md:text-[2.1rem]">{t.outputTitle}</h2>
              <p className="mt-3 max-w-[500px] text-[10px] leading-5 text-black/58">{t.outputDesc}</p>
              <div className="mt-3"><InlineLink href="#brand">{t.outputCta}</InlineLink></div>
            </div>
            <div className="mx-auto w-full max-w-[690px]">
              <Artwork src={lang === "tr" ? "/framework/rgi/output-tr.svg" : "/framework/rgi/output.svg"} alt={lang === "tr" ? "RGI karar raporu çıktısı" : "RGI decision report output"} />
            </div>
          </div>
        </section>
      </article>

      <div className={styles.methodology}>
        <RgiFrameworkPage lang={lang} />
      </div>
    </>
  );
}
