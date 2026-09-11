type SupportedLang = "tr" | "en";

type Copy = {
  heroEyebrow: string;
  name: string;
  expansion: string;
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
  brandTitle: string;
  brandDesc: string;
  productTitle: string;
  productDesc: string;
  layersEyebrow: string;
  layersTitle: string;
  layersDesc: string;
  layerMarketing: string;
  layerMarketingDesc: string;
  layerFinancial: string;
  layerFinancialDesc: string;
  layerOperational: string;
  layerOperationalDesc: string;
  brandMarketingEyebrow: string;
  brandMarketingTitle: string;
  brandMarketingDesc: string;
  brandSignals: [string, string][];
  brandFinancialEyebrow: string;
  brandFinancialTitle: string;
  brandFinancialDesc: string;
  brandFinancialItems: [string, string][];
  productMarketingEyebrow: string;
  productMarketingTitle: string;
  productMarketingDesc: string;
  funnelEyebrow: string;
  funnelTitle: string;
  funnelDesc: string;
  funnelRule: string;
  funnelHealthy: string;
  funnelUnhealthy: string;
  funnelDepthEyebrow: string;
  funnelDepthTitle: string;
  funnelDepthDesc: string;
  productFinancialEyebrow: string;
  productFinancialTitle: string;
  productFinancialDesc: string;
  productFinancialItems: [string, string][];
  weightsEyebrow: string;
  weightsTitle: string;
  weightsDesc: string;
  weightsNote: string;
  externalTitle: string;
  externalDesc: string;
  internalTitle: string;
  internalDesc: string;
  cadenceEyebrow: string;
  cadenceTitle: string;
  cadenceDesc: string;
  quarterly: string;
  quarterlyDesc: string;
  annual: string;
  annualDesc: string;
  outputEyebrow: string;
  outputTitle: string;
  outputDesc: string;
  outputQuestions: string[];
  principleEyebrow: string;
  principleTitle: string;
  principleDesc: string;
  principlePull: string;
  journeyEyebrow: string;
  journeyTitle: string;
  journeyDesc: string;
  journeyCta: string;
  finalEyebrow: string;
  finalTitle: string;
  finalDesc: string;
  finalQuestionA: string;
  finalQuestionB: string;
  finalQuestionC: string;
  finalCta: string;
};

const copy: Record<SupportedLang, Copy> = {
  tr: {
    heroEyebrow: "SELLF PROPRIETARY FRAMEWORK",
    name: "RGI",
    expansion: "Real Growth Index",
    heroTitleA: "Büyüme, iyi görünen şey değildir.",
    heroTitleB: "Ölçülebilir biçimde gerçekten ilerleyen şeydir.",
    heroDesc: "Satış, trafik, erişim veya kampanya sonuçları tek başına gerçek büyümeyi kanıtlamaz. RGI — Real Growth Index, BHS ile belirlenen başlangıç noktasından itibaren marka ve ürün performansının gerçekten ne kadar ilerlediğini ölçmek için geliştirdiğimiz Sellf büyüme indeksidir.",
    heroCta: "RGI Nasıl Çalışır",
    glanceEyebrow: "RGI'YA HIZLI BAKIŞ",
    glanceTitle: "Bir performans skoru değil. Bir ilerleme ölçüsü.",
    glanceDesc: "RGI sabit bir performans skoru değildir. BHS ile tanımlanan başlangıç noktasını referans alır ve zaman içindeki değişimi ölçerek her sonucun şirketi gerçekten ileri taşıyıp taşımadığını gösterir.",
    glanceCta: "RGI nedir?",
    bridgeEyebrow: "BHS → RGI",
    bridgeTitle: "Önce nerede olduğumuzu tanımlarız. Sonra gerçekten ne kadar ilerlediğimizi ölçeriz.",
    bridgeDesc: "BHS başlangıç çizgisini tanımlar. RGI bu başlangıçtan itibaren oluşan değişimi üç aylık ve yıllık periyotlarda izler. Böylece tek bir kampanya sonucu yerine başlangıcı bilinen, tekrar ölçülebilen bir büyüme sistemi kurulur.",
    bridgeCta: "BHS ile bağlantıyı gör",
    axesEyebrow: "İKİ EKSEN",
    axesTitle: "Büyüme tek bir yerde gerçekleşmez.",
    axesDesc: "RGI şirket performansını Brand ve Product eksenlerinde inceler; sonra gerçek büyümeyi anlamak için bu iki alanı tekrar bir araya getirir.",
    brandTitle: "Brand",
    brandDesc: "Marka gücü, talep, algı, erişim ve ticari değer yaratma kapasitesi.",
    productTitle: "Product",
    productDesc: "Ürün veya hizmetin funnel yapısı, ekonomik performansı ve gerçek büyümeye katkısı.",
    layersEyebrow: "ÜÇ PERFORMANS KATMANI",
    layersTitle: "Görünürlüğün ötesinde ne değişti?",
    layersDesc: "Tam RGI sistemi büyümeyi pazarlama, finans ve operasyon katmanlarında okur. Çünkü pazarlama performansı yükselirken şirketin finansal veya operasyonel sağlığı aynı anda kötüleşebilir.",
    layerMarketing: "Marketing Performance",
    layerMarketingDesc: "Pazarın markaya ve ürünlere verdiği tepki nasıl değişiyor?",
    layerFinancial: "Financial Health",
    layerFinancialDesc: "Bu büyüme ekonomik olarak ne kadar sağlıklı?",
    layerOperational: "Operational Efficiency",
    layerOperationalDesc: "Organizasyon oluşan büyümeyi ne kadar verimli ve sürdürülebilir taşıyor?",
    brandMarketingEyebrow: "BRAND — MARKETING PERFORMANCE",
    brandMarketingTitle: "Marka gerçekten güçleniyor mu?",
    brandMarketingDesc: "Marka performansını yalnızca erişim veya takipçi sayısıyla değerlendirmeyiz. External RGI, markanın pazardaki gerçek hareketini beş temel sinyal üzerinden okur.",
    brandSignals: [
      ["Trend Adaptation", "Kategori trendleri içindeki görünürlük ve yıllık talep değişimi."],
      ["Positive Comment %", "Yorum ve mention hacmi içinde pozitif algı ve rakiplere göre konum."],
      ["Traffic-Based Market Share", "Sektörel trafik payı ve erişilebildiği ölçüde trafik kalitesi."],
      ["Marketing KPI / Result Focus", "Kampanyanın belirlenen gerçek hedefe göre ürettiği sonuç."],
      ["Advocacy Share", "Loyalty aşamasındaki kitlenin markayı paylaşma, tavsiye etme ve savunma oranı."],
    ],
    brandFinancialEyebrow: "BRAND — FINANCIAL HEALTH",
    brandFinancialTitle: "Büyümenin ekonomik karşılığı var mı?",
    brandFinancialDesc: "Markanın büyüyor görünmesi ile ekonomik olarak büyümesi aynı şey değildir. RGI nominal artışı ekonomik sağlık sinyallerinden ayırır.",
    brandFinancialItems: [
      ["Gider / Gelir Yapısı", "Toplam giderlerin gelir içindeki payı."],
      ["Net Kâr Marjı", "Şirket büyüdükçe gerçek kârlılığın nasıl değiştiği."],
      ["Öngörülmeyen Maliyetler", "Beklenmeyen giderlerin toplam maliyet yapısındaki payı."],
      ["Reel Gelir Büyümesi", "Enflasyon etkisi sonrası gerçek gelir gelişimi."],
    ],
    productMarketingEyebrow: "PRODUCT — MARKETING PERFORMANCE",
    productMarketingTitle: "Bir ürün yalnızca daha fazla sattığı için sağlıklı büyümüş sayılmaz.",
    productMarketingDesc: "RGI ürün büyümesini Funnel Width ve Funnel Depth üzerinden okur. Amaç tek bir aşamadaki sıçramayı ödüllendirmek değil; funnel'ın birlikte, dengeli ve sürdürülebilir biçimde genişleyip genişlemediğini anlamaktır.",
    funnelEyebrow: "FUNNEL WIDTH",
    funnelTitle: "Sağlıklı büyüme funnel'ın tek bir noktasında gerçekleşmez.",
    funnelDesc: "RGI, Awareness → Consideration → Intent → Conversion → Loyalty aşamalarının BHS başlangıç noktasından itibaren yüzdesel değişimini izler. Asıl ölçüm, bu büyüme oranlarının birbirine ne kadar yakın olduğudur.",
    funnelRule: "RGI'ın sorusu: En çok hangi aşama büyüdü? değil. Funnel'ın tamamı birlikte, sağlıklı bir hızda büyüyor mu?",
    funnelHealthy: "Dengeli büyüme",
    funnelUnhealthy: "Dengesiz büyüme",
    funnelDepthEyebrow: "FUNNEL DEPTH",
    funnelDepthTitle: "Satıştan sonra ne oluyor?",
    funnelDepthDesc: "Funnel Depth özellikle Loyalty ve Advocacy gelişimini yıllık perspektifte değerlendirir. Çünkü gerçek sadakat birkaç haftalık kampanya sonucuyla değil, zaman içinde tekrar satın alma, tavsiye ve savunuculukla kanıtlanır.",
    productFinancialEyebrow: "PRODUCT — FINANCIAL HEALTH",
    productFinancialTitle: "Satılan ürün gerçekten değer mi yaratıyor?",
    productFinancialDesc: "Yüksek satış hacmi tek başına iyi bir ürün ekonomisi anlamına gelmez. RGI ürünün büyümeyi ekonomik olarak ne kadar sağlıklı taşıdığını inceler.",
    productFinancialItems: [
      ["Gross Profit", "Brüt kârlılık ve sektör ortalamasına göre konum."],
      ["Marketing Efficiency", "Acquisition maliyeti veya satış hedefi ile pazarlama bütçesi arasındaki ilişki."],
      ["Production / Service Cost", "Üretim veya hizmet maliyetlerinin yarattığı ekonomik yük."],
      ["Capacity vs. Result", "Pazarlamanın yarattığı talebi operasyonun gerçekten karşılayabilme kapasitesi."],
    ],
    weightsEyebrow: "HEDEFE GÖRE AĞIRLIKLANDIRMA",
    weightsTitle: "Her KPI aynı şirket için aynı ağırlıkta değildir.",
    weightsDesc: "External RGI'da Marketing Performance %60, Financial Health %40 ağırlığa sahiptir. Brand ve Product eksenlerinin ağırlığı ise şirketin temel KPI'ına göre değişir: brand odaklı hedeflerde Brand %60, conversion odaklı hedeflerde Product %60 ağırlık taşır.",
    weightsNote: "KPI ağırlığı şirketin hedefini hesaba katar; funnel verimliliği ise aşamalar arasındaki büyüme dengesini ölçer. İkisi aynı şey değildir.",
    externalTitle: "External RGI",
    externalDesc: "Kamuya açık ve doğrulanabilir verilerle Brand ve Product eksenlerini Marketing Performance + Financial Health katmanlarında ölçer. Amaç dışarıdan kusursuz model kurmak değil; tutarlı ve karşılaştırılabilir bir büyüme sinyali üretmektir.",
    internalTitle: "Internal RGI",
    internalDesc: "Şirket verisi sisteme girdiğinde resim derinleşir. Marketing Performance ve Financial Health'e Operational Efficiency eklenir; böylece büyümenin ne kadar sağlıklı taşındığı da ölçümün parçası olur.",
    cadenceEyebrow: "QUARTERLY + ANNUAL",
    cadenceTitle: "Growth tek bir snapshot değildir.",
    cadenceDesc: "RGI kısa ve orta vadeli değişimi yapısal gelişimden ayırmak için iki zaman perspektifi kullanır.",
    quarterly: "Quarterly RGI",
    quarterlyDesc: "Kısa ve orta vadeli değişimi, yönü ve stratejinin doğru ilerleyip ilerlemediğini gösterir.",
    annual: "Annual RGI",
    annualDesc: "Brand strength, financial health, funnel depth ve uzun dönemli gelişimi daha yapısal perspektiften değerlendirir.",
    outputEyebrow: "MORE THAN A REPORT",
    outputTitle: "Bir dashboard değil. Bir karar sistemi.",
    outputDesc: "RGI'ın değeri daha fazla grafik üretmesinde değil, bir sonraki kararı daha net hale getirmesindedir.",
    outputQuestions: ["Nerede gerçek büyüme var?", "Nerede yalnızca metrik artışı var?", "Hangi alan büyümeyi aşağı çekiyor?", "Bir sonraki çeyrekte kaynak nereye kaydırılmalı?"],
    principleEyebrow: "RGI'IN TEMEL PRENSİBİ",
    principleTitle: "Vanity metrics büyümeyi kanıtlamaz.",
    principleDesc: "Trafik, erişim veya satış yükselirken marj düşüyor, sadakat zayıflıyor, acquisition maliyeti kontrolden çıkıyor veya operasyon ölçeklenemiyorsa şirket gerçekten büyümüş olmayabilir.",
    principlePull: "Başarı, tek bir metriğin yükselmesi değil; sistemin bütünü içinde yaratılan ölçülebilir ilerlemedir.",
    journeyEyebrow: "BHS + RGI",
    journeyTitle: "Baseline → Progress → Real Growth",
    journeyDesc: "BHS başlangıç noktasını verir. RGI bu başlangıçtan itibaren oluşan değişimi ölçer. Bu döngü tekrarlandıkça büyüme tahmin edilen bir sonuç olmaktan çıkar; ölçülen, öğrenilen ve yönetilen bir sistem haline gelir.",
    journeyCta: "BHS'i Keşfet",
    finalEyebrow: "THE SELLF MEASUREMENT SYSTEM",
    finalTitle: "Görünen büyümeyi değil. Gerçek büyümeyi ölçün.",
    finalDesc: "Şirketlerin daha fazla data üretmeye değil, mevcut datanın ne anlattığını anlayabilmeye ihtiyacı var. RGI karmaşık performans sinyallerini tek bir temel sorunun cevabına dönüştürür.",
    finalQuestionA: "Gerçekten büyüdük mü?",
    finalQuestionB: "Ne sayesinde?",
    finalQuestionC: "Neyi değiştirmeliyiz?",
    finalCta: "Ekibimizle Konuşun",
  },
  en: {
    heroEyebrow: "SELLF PROPRIETARY FRAMEWORK",
    name: "RGI",
    expansion: "Real Growth Index",
    heroTitleA: "Growth isn't what looked good.",
    heroTitleB: "It's what measurably improved.",
    heroDesc: "Sales, traffic, reach or campaign results do not prove real growth on their own. RGI — Real Growth Index is Sellf's growth index, developed to measure how much brand and product performance has truly progressed from the baseline defined by BHS.",
    heroCta: "How RGI Works",
    glanceEyebrow: "RGI AT A GLANCE",
    glanceTitle: "Not a performance score. A progress measure.",
    glanceDesc: "RGI is not a static performance score. It uses the BHS baseline as its reference and measures change over time, showing whether each result actually moved the company forward.",
    glanceCta: "What is RGI?",
    bridgeEyebrow: "BHS → RGI",
    bridgeTitle: "First we define where we are. Then we measure how much we really improved.",
    bridgeDesc: "BHS defines the starting line. RGI tracks the change from that baseline in quarterly and annual periods. Growth becomes a repeatable measurement system rather than a one-off campaign result.",
    bridgeCta: "See the BHS connection",
    axesEyebrow: "TWO AXES",
    axesTitle: "Growth happens in more than one place.",
    axesDesc: "RGI evaluates company performance across Brand and Product, then brings both axes together to understand real growth.",
    brandTitle: "Brand",
    brandDesc: "Market strength, demand, perception, reach and commercial value creation.",
    productTitle: "Product",
    productDesc: "Marketing funnel, economic performance and contribution to real growth.",
    layersEyebrow: "THREE PERFORMANCE LAYERS",
    layersTitle: "Beyond visibility, what actually changed?",
    layersDesc: "The full RGI system reads growth across marketing, finance and operations. Marketing performance can improve while financial or operational health deteriorates at the same time.",
    layerMarketing: "Marketing Performance",
    layerMarketingDesc: "How is the market's response to the brand and products changing?",
    layerFinancial: "Financial Health",
    layerFinancialDesc: "Is this growth economically healthy?",
    layerOperational: "Operational Efficiency",
    layerOperationalDesc: "How efficiently and sustainably can the organisation carry this growth?",
    brandMarketingEyebrow: "BRAND — MARKETING PERFORMANCE",
    brandMarketingTitle: "Is the brand actually getting stronger?",
    brandMarketingDesc: "We do not evaluate brand performance through reach or follower count alone. External RGI reads real market movement through five core signals.",
    brandSignals: [
      ["Trend Adaptation", "Visibility within category trends and annual demand shifts."],
      ["Positive Comment %", "Positive perception within review and mention volume, benchmarked against competitors."],
      ["Traffic-Based Market Share", "Estimated category traffic share and traffic quality where observable."],
      ["Marketing KPI / Result Focus", "The result created against the campaign's actual target."],
      ["Advocacy Share", "How much of the loyalty-stage audience recommends, shares or visibly supports the brand."],
    ],
    brandFinancialEyebrow: "BRAND — FINANCIAL HEALTH",
    brandFinancialTitle: "Does growth have an economic return?",
    brandFinancialDesc: "Looking bigger and growing economically are not the same thing. RGI separates nominal increases from signals of real financial health.",
    brandFinancialItems: [
      ["Expense / Revenue Structure", "The share of total expenses within revenue."],
      ["Net Profit Margin", "How true profitability changes as the company grows."],
      ["Unforeseen Costs", "The share of unexpected costs within the overall cost structure."],
      ["Real Revenue Growth", "Revenue development after accounting for inflation."],
    ],
    productMarketingEyebrow: "PRODUCT — MARKETING PERFORMANCE",
    productMarketingTitle: "A product is not healthy just because it sells more.",
    productMarketingDesc: "RGI reads product growth through Funnel Width and Funnel Depth. The goal is not to reward a spike in one stage, but to understand whether the funnel is expanding together in a balanced and sustainable way.",
    funnelEyebrow: "FUNNEL WIDTH",
    funnelTitle: "Healthy growth doesn't happen in just one funnel stage.",
    funnelDesc: "RGI tracks percentage change from the BHS baseline across Awareness → Consideration → Intent → Conversion → Loyalty. The real measurement is how close those growth rates are to one another.",
    funnelRule: "RGI does not ask: Which stage grew the most? It asks: Is the whole funnel growing together at a healthy rate?",
    funnelHealthy: "Balanced growth",
    funnelUnhealthy: "Unbalanced growth",
    funnelDepthEyebrow: "FUNNEL DEPTH",
    funnelDepthTitle: "What happens after the sale?",
    funnelDepthDesc: "Funnel Depth evaluates Loyalty and Advocacy on an annual horizon. Real loyalty is not created by a few weeks of campaign performance; it is proven through repeat purchase, recommendation and advocacy over time.",
    productFinancialEyebrow: "PRODUCT — FINANCIAL HEALTH",
    productFinancialTitle: "Is the product actually creating value?",
    productFinancialDesc: "High sales volume does not automatically mean healthy product economics. RGI evaluates how sustainably a product carries growth financially.",
    productFinancialItems: [
      ["Gross Profit", "Gross profitability relative to the industry benchmark."],
      ["Marketing Efficiency", "Relationship between acquisition/sales targets and allocated marketing spend."],
      ["Production / Service Cost", "The economic load created by production or service delivery."],
      ["Capacity vs. Result", "Whether operations can actually fulfil the demand marketing is designed to create."],
    ],
    weightsEyebrow: "GOAL-BASED WEIGHTING",
    weightsTitle: "Not every KPI carries the same weight for every company.",
    weightsDesc: "Within External RGI, Marketing Performance carries 60% and Financial Health 40%. Brand and Product weighting changes with the primary KPI: Brand carries 60% for brand-led objectives, while Product carries 60% for conversion-led objectives.",
    weightsNote: "KPI weighting reflects the company's objective; funnel efficiency measures balance between stage growth rates. They are not the same thing.",
    externalTitle: "External RGI",
    externalDesc: "Uses public and verifiable data to measure Brand and Product across Marketing Performance + Financial Health. The goal is not a perfect outside-in model, but a consistent and comparable growth signal.",
    internalTitle: "Internal RGI",
    internalDesc: "When company data enters the system, the view becomes deeper. Operational Efficiency joins Marketing Performance and Financial Health, allowing RGI to evaluate how well the organisation can carry and scale growth.",
    cadenceEyebrow: "QUARTERLY + ANNUAL",
    cadenceTitle: "Growth is not a snapshot.",
    cadenceDesc: "RGI uses two time perspectives to separate short-to-mid-term movement from structural progress.",
    quarterly: "Quarterly RGI",
    quarterlyDesc: "Shows short- and mid-term movement, direction and whether strategy is progressing as intended.",
    annual: "Annual RGI",
    annualDesc: "Evaluates brand strength, financial health, funnel depth and long-term change from a more structural perspective.",
    outputEyebrow: "MORE THAN A REPORT",
    outputTitle: "Not a dashboard. A decision system.",
    outputDesc: "The value of RGI is not more charts. It is making the next decision clearer.",
    outputQuestions: ["Where is real growth happening?", "Where is there only metric growth?", "What is dragging growth down?", "Where should resources move next quarter?"],
    principleEyebrow: "THE RGI PRINCIPLE",
    principleTitle: "Vanity metrics do not prove growth.",
    principleDesc: "If traffic, reach or sales rise while margin falls, loyalty weakens, acquisition cost runs out of control or operations cannot scale, the company may not have truly grown.",
    principlePull: "Success is not one metric moving up. It is measurable progress created across the system as a whole.",
    journeyEyebrow: "BHS + RGI",
    journeyTitle: "Baseline → Progress → Real Growth",
    journeyDesc: "BHS gives us the baseline. RGI measures what changed from that point. Repeated over time, growth stops being an assumed outcome and becomes a system that can be measured, learned from and managed.",
    journeyCta: "Explore BHS",
    finalEyebrow: "THE SELLF MEASUREMENT SYSTEM",
    finalTitle: "Measure real growth. Not growth that only looks good.",
    finalDesc: "Companies do not need more data. They need to understand what their existing data means. RGI turns complex performance signals into answers to a small number of fundamental questions.",
    finalQuestionA: "Did we really grow?",
    finalQuestionB: "What caused it?",
    finalQuestionC: "What should we change?",
    finalCta: "Talk to Our Team",
  },
};

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-[9px] font-semibold uppercase tracking-[.22em] ${dark ? "text-white/48" : "text-[#60758a]"}`}>{children}</p>;
}

function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <a href={href} className={`inline-flex items-center gap-2 border-b pb-1 text-[11px] font-medium transition-opacity hover:opacity-60 ${dark ? "border-white/35 text-white/82" : "border-black/24 text-black/75"}`}>{children}<span>→</span></a>;
}

function PrimaryButton({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <a href={href} className={`inline-flex items-center gap-3 rounded-full px-5 py-3 text-[11px] font-semibold transition-transform hover:-translate-y-0.5 ${light ? "bg-white text-[#0b1117]" : "bg-[#0c1218] text-white"}`}>{children}<span>→</span></a>;
}

function HeroIndexGraphic() {
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[540px] md:h-[520px]">
      <div className="absolute inset-x-[10%] bottom-[7%] h-[12%] rounded-[50%] bg-[#17324a]/16 blur-2xl" />
      {[0,1,2,3].map((i) => (
        <div key={i} className="absolute left-1/2 top-1/2 h-[285px] w-[225px] rounded-[4px] border border-[#416b8f]/25 bg-[linear-gradient(145deg,rgba(217,235,249,.36),rgba(74,115,151,.10))] shadow-[0_26px_65px_rgba(34,62,88,.09)] backdrop-blur-[2px] md:h-[340px] md:w-[270px]" style={{ transform: `translate(-50%,-50%) translateX(${i * 28 - 35}px) translateY(${i * 5}px) rotateY(-18deg)`, zIndex: 5-i }}>
          {i===0 && <div className="absolute inset-0 p-7 md:p-9">
            <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#607b93]">Real Growth Index</div>
            <svg viewBox="0 0 220 190" className="mt-7 h-[210px] w-full overflow-visible">
              <path d="M15 165 L50 125 L82 118 L110 82 L145 67 L183 18" fill="none" stroke="#dcebf7" strokeWidth="12" opacity=".5" />
              <path d="M15 165 L50 125 L82 118 L110 82 L145 67 L183 18" fill="none" stroke="#ffffff" strokeWidth="3" />
              <path d="M180 18 L171 28 M180 18 L179 32" fill="none" stroke="#ffffff" strokeWidth="3" />
            </svg>
            <div className="absolute bottom-7 left-7 right-7 flex justify-between border-t border-[#496d8c]/25 pt-4 text-[7px] uppercase tracking-[.12em] text-[#516d85]"><span>Baseline</span><span>Progress</span><span>Growth</span></div>
          </div>}
        </div>
      ))}
      <div className="absolute right-[1%] top-[20%] hidden border-l border-[#607b93]/35 pl-4 text-[8px] uppercase leading-5 tracking-[.14em] text-[#526d84] sm:block">From data<br/>to real<br/>growth</div>
    </div>
  );
}

function MiniStat({ number, title, items }: { number: string; title: string; items: string[] }) {
  return <div className="min-h-[160px] rounded-[8px] border border-[#8095a8]/15 bg-white/70 p-5 shadow-[0_12px_38px_rgba(61,84,104,.05)]"><div className="text-3xl font-medium tracking-[-.05em]">{number}</div><div className="mt-1 text-[10px] font-semibold">{title}</div><div className="mt-5 space-y-2 text-[9px] leading-4 text-black/48">{items.map(x=><div key={x}>{x}</div>)}</div></div>;
}

function FunnelDiagram({ healthy = true }: { healthy?: boolean }) {
  const values = healthy ? [12,11,13,10,12] : [5,6,7,30,8];
  const labels = ["Awareness","Consideration","Intent","Conversion","Loyalty"];
  return <div className="space-y-2">{labels.map((label,i)=><div key={label} className="grid grid-cols-[1fr_52px] items-center gap-4"><div className="relative h-9 overflow-hidden rounded-[2px] bg-[#dfe9f1]"><div className="absolute inset-y-0 left-0 bg-[#88a9c3]/45" style={{width:`${Math.min(100, 35 + values[i]*1.8)}%`}} /><div className="relative flex h-full items-center justify-center text-[9px] font-medium text-[#243746]">{label}</div></div><div className={`text-right text-[11px] font-semibold ${healthy ? "text-[#334e63]" : i===3 ? "text-[#aa6b57]" : "text-[#5b6d7c]"}`}>+{values[i]}%</div></div>)}</div>;
}

export default function RgiFrameworkPage({ lang }: { lang: SupportedLang }) {
  const t = copy[lang];
  return (
    <article className="bg-[#f5f7f8] text-[#0b1117]">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_76%_35%,rgba(114,157,194,.17),transparent_32%),linear-gradient(180deg,#f8fafb,#f3f6f8)] pt-28 md:pt-32">
        <div className="sellf-container grid gap-8 py-14 md:py-20 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-6 xl:py-24">
          <div className="max-w-[650px]">
            <Eyebrow>{t.heroEyebrow}</Eyebrow>
            <h1 className="mt-4 text-[5.6rem] font-semibold leading-[.85] tracking-[-.075em] sm:text-[7rem]">{t.name}</h1>
            <p className="mt-3 text-xl font-medium tracking-[-.03em]">{t.expansion}</p>
            <h2 className="mt-8 max-w-[17ch] text-3xl font-semibold leading-[1.05] tracking-[-.05em] sm:text-[2.8rem]">{t.heroTitleA}<br/><span className="text-[#7893aa]">{t.heroTitleB}</span></h2>
            <p className="mt-6 max-w-[620px] text-[13px] leading-7 text-black/58 md:text-sm">{t.heroDesc}</p>
            <div className="mt-8"><PrimaryButton href="#what">{t.heroCta}</PrimaryButton></div>
          </div>
          <HeroIndexGraphic />
        </div>
      </section>

      <section id="what" className="scroll-mt-28 border-y border-[#8397a8]/12 bg-[#eef3f6]">
        <div className="sellf-container grid gap-12 py-16 md:py-20 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-16">
          <div><Eyebrow>{t.glanceEyebrow}</Eyebrow><h2 className="mt-3 max-w-[14ch] text-3xl font-semibold leading-[1.05] tracking-[-.045em] md:text-[2.65rem]">{t.glanceTitle}</h2><p className="mt-5 max-w-[570px] text-sm leading-7 text-black/56">{t.glanceDesc}</p><div className="mt-6"><TextLink href="#bhs-rgi">{t.glanceCta}</TextLink></div></div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><MiniStat number="2" title={lang==="tr"?"Eksen":"Axes"} items={["Brand","Product"]}/><MiniStat number="3" title={lang==="tr"?"Performans katmanı":"Performance layers"} items={["Marketing","Financial","Operational"]}/><MiniStat number="2" title={lang==="tr"?"Ölçüm tipi":"Measurement types"} items={["External RGI","Internal RGI"]}/><MiniStat number="2" title={lang==="tr"?"Zaman perspektifi":"Time perspectives"} items={["Quarterly","Annual"]}/></div>
        </div>
      </section>

      <section id="bhs-rgi" className="scroll-mt-28 bg-[#111a22] text-white">
        <div className="sellf-container grid gap-14 py-16 md:py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
          <div><Eyebrow dark>{t.bridgeEyebrow}</Eyebrow><h2 className="mt-4 max-w-[16ch] text-3xl font-semibold leading-[1.08] tracking-[-.045em] md:text-[2.7rem]">{t.bridgeTitle}</h2><p className="mt-5 max-w-[620px] text-sm leading-7 text-white/55">{t.bridgeDesc}</p><div className="mt-7"><TextLink href={`/${lang}/framework/bhs`} dark>{t.bridgeCta}</TextLink></div></div>
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3">
            {[['BHS',lang==='tr'?'Neredeyiz?':'Where are we?'],['RGI',lang==='tr'?'Ne kadar ilerledik?':'How much did we improve?'],['Strategy',lang==='tr'?'Sıradaki karar ne?':"What's the next decision?"]].map(([a,b],i)=><div key={a} className="contents"><div className={`grid aspect-square place-items-center rounded-full border ${i===1?'border-[#a6c7e4] bg-[#6f9cbe]/12 shadow-[0_0_34px_rgba(149,193,229,.18)]':'border-white/25'}`}><div className="text-center"><div className="text-lg font-semibold">{a}</div><div className="mt-1 px-4 text-[8px] leading-4 text-white/50">{b}</div></div></div>{i<2&&<div className="text-white/42">→</div>}</div>)}
          </div>
        </div>
      </section>

      <section id="axes" className="scroll-mt-28 bg-[#f7f9fa]">
        <div className="sellf-container grid gap-12 py-18 md:py-24 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-16">
          <div><Eyebrow>{t.axesEyebrow}</Eyebrow><h2 className="mt-4 max-w-[13ch] text-3xl font-semibold leading-[1.06] tracking-[-.045em] md:text-[2.65rem]">{t.axesTitle}</h2><p className="mt-5 max-w-[540px] text-sm leading-7 text-black/56">{t.axesDesc}</p></div>
          <div className="grid gap-4 md:grid-cols-2">{[[t.brandTitle,t.brandDesc],[t.productTitle,t.productDesc]].map(([title,desc],i)=><div key={title} className="relative min-h-[250px] overflow-hidden rounded-[8px] border border-[#7f98ac]/18 bg-white p-6 shadow-[0_16px_45px_rgba(52,76,97,.06)]"><div className="grid h-10 w-10 place-items-center rounded-full bg-[#dce9f3] text-[#587790]">{i===0?'◎':'◇'}</div><h3 className="mt-10 text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-2 max-w-[300px] text-[12px] leading-6 text-black/55">{desc}</p><div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(175deg,transparent_25%,rgba(133,169,198,.12)_26%,rgba(133,169,198,.12)_55%,transparent_56%)]" /></div>)}</div>
        </div>
      </section>

      <section id="layers" className="scroll-mt-28 border-t border-[#8196a8]/12 bg-[#f3f6f8]">
        <div className="sellf-container py-18 md:py-24"><div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-16"><div><Eyebrow>{t.layersEyebrow}</Eyebrow><h2 className="mt-4 max-w-[13ch] text-3xl font-semibold leading-[1.06] tracking-[-.045em] md:text-[2.65rem]">{t.layersTitle}</h2><p className="mt-5 max-w-[540px] text-sm leading-7 text-black/56">{t.layersDesc}</p></div><div className="grid gap-3 md:grid-cols-3">{[[t.layerMarketing,t.layerMarketingDesc,'#7ca6c8'],[t.layerFinancial,t.layerFinancialDesc,'#c8aa72'],[t.layerOperational,t.layerOperationalDesc,'#8fa6b2']].map(([title,desc,color])=><div key={title} className="rounded-[8px] border border-[#8298aa]/18 bg-white p-5"><div className="h-9 w-9 rounded-full bg-[#e5eef4]"/><h3 className="mt-5 text-[13px] font-semibold leading-4">{title}</h3><p className="mt-5 text-[11px] leading-5 text-black/52">{desc}</p><div className="mt-7 h-[2px] w-full" style={{background:`linear-gradient(90deg,${color},transparent)`}}/></div>)}</div></div></div>
      </section>

      <section id="brand" className="scroll-mt-28 bg-white">
        <div className="sellf-container grid gap-14 py-20 md:py-28 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div><Eyebrow>{t.brandMarketingEyebrow}</Eyebrow><h2 className="mt-4 max-w-[15ch] text-3xl font-semibold leading-[1.08] tracking-[-.045em] md:text-[2.7rem]">{t.brandMarketingTitle}</h2><p className="mt-5 max-w-[590px] text-sm leading-7 text-black/56">{t.brandMarketingDesc}</p></div><div className="space-y-0 border-t border-black/10">{t.brandSignals.map(([title,desc],i)=><div key={title} className="grid grid-cols-[36px_1fr] gap-4 border-b border-black/10 py-5"><div className="text-[10px] font-semibold text-[#6e879b]">0{i+1}</div><div><h3 className="text-[13px] font-semibold">{title}</h3><p className="mt-2 text-[11px] leading-5 text-black/50">{desc}</p></div></div>)}</div></div>
      </section>

      <section className="border-y border-[#8196a8]/12 bg-[#edf2f5]">
        <div className="sellf-container grid gap-14 py-20 md:py-24 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div><Eyebrow>{t.brandFinancialEyebrow}</Eyebrow><h2 className="mt-4 max-w-[15ch] text-3xl font-semibold leading-[1.08] tracking-[-.045em] md:text-[2.6rem]">{t.brandFinancialTitle}</h2><p className="mt-5 max-w-[590px] text-sm leading-7 text-black/56">{t.brandFinancialDesc}</p></div><div className="grid gap-px overflow-hidden rounded-[8px] border border-[#8196a8]/15 bg-[#8196a8]/15 sm:grid-cols-2">{t.brandFinancialItems.map(([title,desc])=><div key={title} className="bg-[#f7f9fa] p-6"><h3 className="text-sm font-semibold">{title}</h3><p className="mt-3 text-[11px] leading-5 text-black/50">{desc}</p></div>)}</div></div>
      </section>

      <section id="product" className="scroll-mt-28 bg-[#f7f9fa]">
        <div className="sellf-container py-20 md:py-28"><div className="max-w-[780px]"><Eyebrow>{t.productMarketingEyebrow}</Eyebrow><h2 className="mt-4 max-w-[16ch] text-3xl font-semibold leading-[1.08] tracking-[-.045em] md:text-[2.7rem]">{t.productMarketingTitle}</h2><p className="mt-5 max-w-[720px] text-sm leading-7 text-black/56">{t.productMarketingDesc}</p></div></div>
      </section>

      <section id="funnel" className="scroll-mt-28 border-y border-[#8196a8]/12 bg-[linear-gradient(90deg,#f4f7f9,#e8f0f5)]">
        <div className="sellf-container grid gap-14 py-20 md:py-24 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-20"><div><Eyebrow>{t.funnelEyebrow}</Eyebrow><h2 className="mt-4 max-w-[15ch] text-3xl font-semibold leading-[1.07] tracking-[-.045em] md:text-[2.7rem]">{t.funnelTitle}</h2><p className="mt-5 text-sm leading-7 text-black/56">{t.funnelDesc}</p><div className="mt-6 border-l-2 border-[#7f9bb1] pl-5 text-[12px] font-medium leading-6 text-black/70">{t.funnelRule}</div></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[8px] border border-[#7894aa]/18 bg-white/85 p-5"><div className="mb-5 text-[10px] font-semibold uppercase tracking-[.16em] text-[#58748b]">{t.funnelHealthy}</div><FunnelDiagram healthy /></div><div className="rounded-[8px] border border-[#a58b81]/16 bg-white/72 p-5"><div className="mb-5 text-[10px] font-semibold uppercase tracking-[.16em] text-[#8a6d62]">{t.funnelUnhealthy}</div><FunnelDiagram healthy={false} /></div></div></div>
      </section>

      <section className="bg-white"><div className="sellf-container grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-20"><div><Eyebrow>{t.funnelDepthEyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-semibold tracking-[-.045em] md:text-[2.5rem]">{t.funnelDepthTitle}</h2><p className="mt-5 max-w-[620px] text-sm leading-7 text-black/56">{t.funnelDepthDesc}</p><div className="mt-8 flex items-center gap-4"><div className="grid h-20 w-20 place-items-center rounded-full border border-[#8198aa]/25 text-xs font-semibold">Loyalty</div><div className="text-black/30">→</div><div className="grid h-24 w-24 place-items-center rounded-full border border-[#6f92ad]/35 bg-[#eef4f8] text-xs font-semibold">Advocacy</div></div></div><div><Eyebrow>{t.productFinancialEyebrow}</Eyebrow><h2 className="mt-4 max-w-[15ch] text-3xl font-semibold tracking-[-.045em] md:text-[2.5rem]">{t.productFinancialTitle}</h2><p className="mt-5 text-sm leading-7 text-black/56">{t.productFinancialDesc}</p><div className="mt-7 grid grid-cols-2 gap-3">{t.productFinancialItems.map(([title,desc])=><div key={title} className="rounded-[7px] border border-[#8297a8]/15 bg-[#f5f7f8] p-4"><div className="text-[11px] font-semibold">{title}</div><div className="mt-2 text-[9px] leading-4 text-black/48">{desc}</div></div>)}</div></div></div></section>

      <section className="border-y border-[#8196a8]/12 bg-[#eef3f6]"><div className="sellf-container grid gap-14 py-20 md:py-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20"><div><Eyebrow>{t.weightsEyebrow}</Eyebrow><h2 className="mt-4 max-w-[15ch] text-3xl font-semibold leading-[1.08] tracking-[-.045em] md:text-[2.6rem]">{t.weightsTitle}</h2><p className="mt-5 text-sm leading-7 text-black/56">{t.weightsDesc}</p><p className="mt-4 text-[11px] leading-6 text-black/42">{t.weightsNote}</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[8px] border border-[#7894aa]/18 bg-white p-6"><div className="text-[10px] uppercase tracking-[.16em] text-black/42">Layer weight</div><div className="mt-8 space-y-5"><div><div className="flex justify-between text-[11px]"><span>Marketing Performance</span><b>60%</b></div><div className="mt-2 h-2 bg-[#e4ebf0]"><div className="h-full w-[60%] bg-[#7398b7]"/></div></div><div><div className="flex justify-between text-[11px]"><span>Financial Health</span><b>40%</b></div><div className="mt-2 h-2 bg-[#e4ebf0]"><div className="h-full w-[40%] bg-[#b7a27d]"/></div></div></div></div><div className="rounded-[8px] border border-[#7894aa]/18 bg-[#17222b] p-6 text-white"><div className="text-[10px] uppercase tracking-[.16em] text-white/42">Axis weight</div><div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-[6px] border border-white/12 bg-white/5 p-4"><div className="text-3xl font-semibold">60</div><div className="mt-1 text-[9px] text-white/45">Brand-led KPI</div></div><div className="rounded-[6px] border border-white/12 bg-white/5 p-4"><div className="text-3xl font-semibold">60</div><div className="mt-1 text-[9px] text-white/45">Product-led KPI</div></div></div></div></div></div></section>

      <section id="external-internal" className="scroll-mt-28 grid lg:grid-cols-2"><div className="bg-[#17222b] px-6 py-16 text-white sm:px-10 md:px-14 lg:px-[max(3.5rem,calc((100vw-1280px)/2))] lg:pr-16"><Eyebrow dark>EXTERNAL RGI</Eyebrow><h2 className="mt-4 text-3xl font-semibold tracking-[-.045em]">{t.externalTitle}</h2><p className="mt-5 max-w-[620px] text-sm leading-7 text-white/55">{t.externalDesc}</p><div className="mt-10 grid h-28 place-items-center rounded-[50%] border border-white/12 text-[9px] uppercase tracking-[.16em] text-white/45">Public data<br/>real insights</div></div><div className="bg-[#e8f0f5] px-6 py-16 sm:px-10 md:px-14 lg:px-16"><Eyebrow>INTERNAL RGI</Eyebrow><h2 className="mt-4 text-3xl font-semibold tracking-[-.045em]">{t.internalTitle}</h2><p className="mt-5 max-w-[620px] text-sm leading-7 text-black/56">{t.internalDesc}</p><div className="mt-10 grid h-28 place-items-center rounded-[50%] border border-[#718ea5]/18 text-[9px] uppercase tracking-[.16em] text-[#627f95]">Company data<br/>deeper decisions</div></div></section>

      <section id="cadence" className="scroll-mt-28 bg-[#f6f8f9]"><div className="sellf-container grid gap-14 py-20 md:py-24 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:gap-20"><div><Eyebrow>{t.cadenceEyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-semibold tracking-[-.045em] md:text-[2.6rem]">{t.cadenceTitle}</h2><p className="mt-5 text-sm leading-7 text-black/56">{t.cadenceDesc}</p></div><div><div className="mb-8 inline-flex rounded-[6px] border border-[#7893a8]/18 bg-white p-1 text-[10px]"><span className="rounded-[4px] bg-[#17222b] px-4 py-2 text-white">Quarterly</span><span className="px-4 py-2">Annual</span></div><div className="flex h-[190px] items-end gap-4 border-b border-[#7893a8]/18 px-3">{[34,46,42,64,58,78,73,98].map((h,i)=><div key={i} className="relative flex-1"><div className="absolute bottom-0 w-full bg-[#cbdbe7]" style={{height:`${h}%`}}/><div className="absolute bottom-0 left-1/2 w-[2px] bg-[#6f9abd]" style={{height:`${Math.min(100,h+12)}%`}}/></div>)}</div><div className="mt-6 grid gap-5 sm:grid-cols-2"><div><h3 className="text-sm font-semibold">{t.quarterly}</h3><p className="mt-2 text-[10px] leading-5 text-black/48">{t.quarterlyDesc}</p></div><div><h3 className="text-sm font-semibold">{t.annual}</h3><p className="mt-2 text-[10px] leading-5 text-black/48">{t.annualDesc}</p></div></div></div></div></section>

      <section id="output" className="scroll-mt-28 border-y border-[#8196a8]/12 bg-[#eef3f6]"><div className="sellf-container grid gap-14 py-20 md:py-24 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-20"><div><Eyebrow>{t.outputEyebrow}</Eyebrow><h2 className="mt-4 max-w-[15ch] text-3xl font-semibold leading-[1.08] tracking-[-.045em] md:text-[2.6rem]">{t.outputTitle}</h2><p className="mt-5 text-sm leading-7 text-black/56">{t.outputDesc}</p><div className="mt-7 space-y-3">{t.outputQuestions.map(q=><div key={q} className="flex gap-3 text-[11px] text-black/62"><span className="text-[#7394ad]">↗</span><span>{q}</span></div>)}</div></div><div className="relative mx-auto h-[300px] w-full max-w-[600px]"><div className="absolute left-[10%] top-[16%] h-[210px] w-[38%] rounded-[5px] border border-[#7893a8]/20 bg-white p-5 shadow-[0_24px_60px_rgba(50,76,98,.11)]"><div className="text-[8px] font-semibold">Quarterly Growth</div><div className="mt-10 flex h-24 items-end gap-2">{[42,72,56,84].map((v,i)=><div key={i} className="flex-1 bg-[#a9c3d7]" style={{height:`${v}%`}}/>)}</div></div><div className="absolute left-[38%] top-[7%] z-10 h-[235px] w-[34%] rounded-[5px] bg-[#17222b] p-6 text-white shadow-[0_28px_70px_rgba(27,42,54,.22)]"><div className="text-[8px] uppercase tracking-[.15em] text-white/45">RGI / Real Growth Index</div><div className="mt-9 grid h-24 place-items-center rounded-full border border-white/14"><div className="text-4xl font-semibold">78</div></div><div className="mt-7 space-y-2 text-[8px] text-white/45"><div className="flex justify-between"><span>Brand</span><span>82</span></div><div className="flex justify-between"><span>Product</span><span>76</span></div><div className="flex justify-between"><span>Financial</span><span>71</span></div></div></div><div className="absolute right-[7%] top-[22%] h-[195px] w-[36%] rounded-[5px] border border-[#7893a8]/20 bg-white p-5 shadow-[0_20px_50px_rgba(50,76,98,.09)]"><div className="text-[8px] font-semibold">Key insights</div><div className="mt-8 space-y-4">{[80,58,72,45].map((v,i)=><div key={i} className="h-2 bg-[#e0e8ee]"><div className="h-full bg-[#8dabbe]" style={{width:`${v}%`}}/></div>)}</div></div></div></div></section>

      <section className="bg-white"><div className="sellf-container grid gap-14 py-20 md:py-24 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div><Eyebrow>{t.principleEyebrow}</Eyebrow><h2 className="mt-4 max-w-[14ch] text-3xl font-semibold leading-[1.08] tracking-[-.045em] md:text-[2.6rem]">{t.principleTitle}</h2><p className="mt-5 text-sm leading-7 text-black/56">{t.principleDesc}</p></div><blockquote className="border-l border-[#7392aa]/35 pl-8 text-2xl font-medium leading-[1.45] tracking-[-.035em] text-[#243846]">“{t.principlePull}”</blockquote></div></section>

      <section className="border-y border-[#8196a8]/12 bg-[#f0f4f6]"><div className="sellf-container grid gap-14 py-20 md:py-24 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-20"><div><Eyebrow>{t.journeyEyebrow}</Eyebrow><h2 className="mt-4 text-3xl font-semibold tracking-[-.045em] md:text-[2.6rem]">{t.journeyTitle}</h2><p className="mt-5 max-w-[650px] text-sm leading-7 text-black/56">{t.journeyDesc}</p><div className="mt-7"><PrimaryButton href={`/${lang}/framework/bhs`}>{t.journeyCta}</PrimaryButton></div></div><div className="grid grid-cols-3 items-center gap-3 text-center"><div className="rounded-[8px] border border-[#7a94a8]/18 bg-white p-5"><div className="text-2xl font-semibold">BHS</div><div className="mt-2 text-[9px] text-black/42">Baseline</div></div><div className="rounded-[8px] border border-[#6f90aa]/25 bg-[#dce8f0] p-5"><div className="text-2xl font-semibold">RGI</div><div className="mt-2 text-[9px] text-black/42">Progress</div></div><div className="rounded-[8px] bg-[#17222b] p-5 text-white"><div className="text-2xl font-semibold">→</div><div className="mt-2 text-[9px] text-white/45">Real Growth</div></div></div></div></section>

      <section className="bg-[#101820] text-white"><div className="sellf-container grid gap-14 py-20 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20"><div><Eyebrow dark>{t.finalEyebrow}</Eyebrow><h2 className="mt-4 max-w-[15ch] text-4xl font-semibold leading-[1.06] tracking-[-.05em] md:text-[3rem]">{t.finalTitle}</h2><p className="mt-6 max-w-[720px] text-sm leading-7 text-white/52">{t.finalDesc}</p></div><div className="border-l border-white/12 pl-8"><div className="space-y-4 text-xl font-medium tracking-[-.025em] text-white/82"><div>{t.finalQuestionA}</div><div className="text-[#91aec4]">{t.finalQuestionB}</div><div>{t.finalQuestionC}</div></div><div className="mt-8"><PrimaryButton href={`/${lang}/contact`} light>{t.finalCta}</PrimaryButton></div></div></div></section>
    </article>
  );
}
