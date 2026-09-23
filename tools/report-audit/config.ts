export type Locale = 'tr' | 'en'
export type ReportAreaId = 'marketing' | 'sales' | 'commerce' | 'finance' | 'operations' | 'project'
export type ReportPurposeId = 'monitoring' | 'diagnosis' | 'allocation' | 'forecast' | 'investment' | 'executive'
export type MetricPriority = 'required' | 'contextual'

export type LocalizedText = {tr: string; en: string}

export type MetricDefinition = {
  id: string
  label: LocalizedText
  aliases: string[]
  priority: MetricPriority
  purposes?: ReportPurposeId[]
  rationale: LocalizedText
}

export type ReportArea = {
  id: ReportAreaId
  label: LocalizedText
  description: LocalizedText
  metrics: MetricDefinition[]
}

export type ReportPurpose = {
  id: ReportPurposeId
  label: LocalizedText
  description: LocalizedText
}

const metric = (
  id: string,
  tr: string,
  en: string,
  aliases: string[],
  priority: MetricPriority,
  rationaleTr: string,
  rationaleEn: string,
  purposes?: ReportPurposeId[],
): MetricDefinition => ({id, label: {tr, en}, aliases, priority, purposes, rationale: {tr: rationaleTr, en: rationaleEn}})

export const reportPurposes: ReportPurpose[] = [
  {id: 'monitoring', label: {tr: 'Performans takibi', en: 'Performance monitoring'}, description: {tr: 'Dönemsel performansı ve sapmaları izlemek.', en: 'Track periodic performance and variance.'}},
  {id: 'diagnosis', label: {tr: 'Sorun teşhisi', en: 'Problem diagnosis'}, description: {tr: 'Bir sonucun neden değiştiğini açıklamak.', en: 'Explain why an outcome changed.'}},
  {id: 'allocation', label: {tr: 'Kaynak dağılımı', en: 'Resource allocation'}, description: {tr: 'Bütçe, ekip veya kapasiteyi dağıtmak.', en: 'Allocate budget, people or capacity.'}},
  {id: 'forecast', label: {tr: 'Tahmin / forecast', en: 'Forecasting'}, description: {tr: 'Gelecek sonuçları ve ihtiyacı öngörmek.', en: 'Estimate future outcomes and needs.'}},
  {id: 'investment', label: {tr: 'Yatırım kararı', en: 'Investment decision'}, description: {tr: 'Bir yatırımın ekonomik değerini değerlendirmek.', en: 'Evaluate the economics of an investment.'}},
  {id: 'executive', label: {tr: 'Üst yönetim özeti', en: 'Executive summary'}, description: {tr: 'Karar vericilere kısa ve bütüncül görünüm sunmak.', en: 'Give decision makers a concise, complete view.'}},
]

export const reportAreas: ReportArea[] = [
  {
    id: 'marketing',
    label: {tr: 'Marketing & Growth', en: 'Marketing & Growth'},
    description: {tr: 'Pazarlama yatırımının gelir, müşteri ve kârlılık etkisi.', en: 'Revenue, customer and profit impact of marketing investment.'},
    metrics: [
      metric('spend', 'Pazarlama harcaması', 'Marketing spend', ['pazarlama harcamasi', 'reklam harcamasi', 'medya harcamasi', 'ad spend', 'marketing spend', 'media spend'], 'required', 'Yatırımın ölçeğini tanımlar.', 'Defines the scale of investment.'),
      metric('attributedRevenue', 'Atfedilen gelir', 'Attributed revenue', ['atfedilen gelir', 'pazarlama geliri', 'attributed revenue', 'marketing revenue'], 'required', 'Harcamayla ilişkilendirilen ticari sonucu gösterir.', 'Shows the commercial outcome associated with spend.'),
      metric('newCustomers', 'Yeni müşteri', 'New customers', ['yeni musteri', 'ilk siparis', 'new customer', 'first order', 'new buyers'], 'required', 'Büyümenin müşteri tabanına etkisini ölçer.', 'Measures growth in the customer base.'),
      metric('cac', 'Müşteri edinme maliyeti', 'Customer acquisition cost', ['musteri edinme maliyeti', 'edinme maliyeti', 'cac', 'customer acquisition cost'], 'required', 'Müşteri büyümesinin birim ekonomisini gösterir.', 'Shows the unit economics of customer growth.'),
      metric('contribution', 'Katkı kârı / marjı', 'Contribution profit / margin', ['katki kari', 'katki marji', 'contribution profit', 'contribution margin'], 'required', 'Cironun gerçek ekonomik katkısını ayırır.', 'Separates revenue from its actual economic contribution.'),
      metric('roi', 'ROI', 'ROI', ['roi', 'yatirim getirisi', 'return on investment'], 'contextual', 'Yatırım veya kaynak dağılımı kararında geri dönüşü doğrular.', 'Validates return for investment or allocation decisions.', ['investment', 'allocation']),
      metric('ltv', 'LTV', 'LTV', ['ltv', 'musteri yasam boyu degeri', 'lifetime value', 'customer lifetime value'], 'contextual', 'Edinilen müşterinin uzun dönem değerini gösterir.', 'Shows the long-term value of acquired customers.', ['investment', 'forecast', 'allocation']),
      metric('payback', 'Geri ödeme süresi', 'Payback period', ['geri odeme suresi', 'payback', 'payback period'], 'contextual', 'Yatırımın nakdi ne zaman geri kazandığını gösterir.', 'Shows when the investment recovers its cash outlay.', ['investment', 'forecast']),
      metric('incrementality', 'Artımsallık', 'Incrementality', ['artimsallik', 'incrementality', 'incremental lift', 'uplift'], 'contextual', 'Sonucun pazarlama olmasaydı gerçekleşip gerçekleşmeyeceğini sınar.', 'Tests whether the outcome would have occurred without marketing.', ['diagnosis', 'allocation', 'investment']),
      metric('channelSplit', 'Kanal kırılımı', 'Channel breakdown', ['kanal kirilimi', 'kanal bazinda', 'channel split', 'by channel'], 'contextual', 'Sonuçların hangi kanaldan geldiğini ayrıştırır.', 'Separates results by channel.', ['diagnosis', 'allocation', 'executive']),
    ],
  },
  {
    id: 'sales',
    label: {tr: 'Satış & CRM', en: 'Sales & CRM'},
    description: {tr: 'Pipeline sağlığı, dönüşüm ve tahmin doğruluğu.', en: 'Pipeline health, conversion and forecast accuracy.'},
    metrics: [
      metric('pipelineValue', 'Pipeline değeri', 'Pipeline value', ['pipeline degeri', 'firsat degeri', 'pipeline value', 'opportunity value'], 'required', 'Potansiyel satış hacmini gösterir.', 'Shows potential sales volume.'),
      metric('stageConversion', 'Aşama dönüşümü', 'Stage conversion', ['asama donusumu', 'funnel donusumu', 'stage conversion', 'funnel conversion'], 'required', 'Satış hunisindeki kaybın yerini gösterir.', 'Shows where opportunities are lost in the funnel.'),
      metric('winRate', 'Kazanma oranı', 'Win rate', ['kazanma orani', 'win rate', 'close rate'], 'required', 'Teklif veya fırsatların başarı oranını ölçer.', 'Measures the success rate of proposals or opportunities.'),
      metric('salesCycle', 'Satış döngüsü', 'Sales cycle', ['satis dongusu', 'kapanis suresi', 'sales cycle', 'time to close'], 'required', 'Gelirin gerçekleşme hızını gösterir.', 'Shows how quickly revenue can materialize.'),
      metric('forecast', 'Satış tahmini', 'Sales forecast', ['satis tahmini', 'forecast', 'sales forecast', 'weighted pipeline'], 'required', 'Beklenen geliri görünür kılar.', 'Makes expected revenue visible.'),
      metric('averageDeal', 'Ortalama sözleşme', 'Average deal size', ['ortalama sozlesme', 'ortalama teklif', 'average deal', 'average contract', 'acv'], 'contextual', 'Hacim ile değer arasındaki ilişkiyi açıklar.', 'Explains the relationship between volume and value.', ['monitoring', 'forecast', 'executive']),
      metric('coverage', 'Pipeline coverage', 'Pipeline coverage', ['pipeline coverage', 'pipeline kapsama'], 'contextual', 'Hedefe ulaşmak için yeterli fırsat olup olmadığını gösterir.', 'Shows whether the pipeline is sufficient to reach target.', ['forecast', 'executive']),
      metric('lossReasons', 'Kaybedilme nedenleri', 'Loss reasons', ['kaybedilme nedeni', 'kayip nedeni', 'loss reason', 'lost reason'], 'contextual', 'Dönüşüm sorununun nedenini açıklar.', 'Explains why conversion is weak.', ['diagnosis']),
      metric('renewal', 'Yenileme / churn', 'Renewal / churn', ['yenileme', 'musteri kaybi', 'churn', 'renewal', 'retention'], 'contextual', 'Mevcut müşteri gelirinin devamlılığını gösterir.', 'Shows the durability of existing-customer revenue.', ['monitoring', 'forecast', 'executive']),
    ],
  },
  {
    id: 'commerce',
    label: {tr: 'E-ticaret & Perakende', en: 'E-commerce & Retail'},
    description: {tr: 'Net satış, sipariş ekonomisi, stok ve mağaza performansı.', en: 'Net sales, order economics, inventory and store performance.'},
    metrics: [
      metric('netRevenue', 'Net ciro', 'Net revenue', ['net ciro', 'net satis', 'net revenue', 'net sales'], 'required', 'İade ve indirim sonrası gerçek geliri gösterir.', 'Shows actual revenue after returns and discounts.'),
      metric('orders', 'Sipariş / işlem', 'Orders / transactions', ['siparis', 'islem adedi', 'orders', 'transactions'], 'required', 'Gelirin hacim bileşenini gösterir.', 'Shows the volume component of revenue.'),
      metric('conversion', 'Dönüşüm oranı', 'Conversion rate', ['donusum orani', 'conversion rate', 'cvr'], 'required', 'Trafiğin satışa dönüşme verimini ölçer.', 'Measures how efficiently traffic becomes sales.'),
      metric('aov', 'Ortalama sepet', 'Average order value', ['ortalama sepet', 'sepet tutari', 'average order value', 'aov'], 'required', 'Gelirin işlem başına değerini gösterir.', 'Shows revenue value per transaction.'),
      metric('grossMargin', 'Brüt kâr / marj', 'Gross profit / margin', ['brut kar', 'brut marj', 'gross profit', 'gross margin'], 'required', 'Satışın ürün maliyeti sonrası değerini gösterir.', 'Shows value after product cost.'),
      metric('returns', 'İade oranı', 'Return rate', ['iade orani', 'iadeler', 'return rate', 'returns'], 'required', 'Brüt satış ile gerçekleşen gelir arasındaki kaybı gösterir.', 'Shows leakage between gross sales and realized revenue.'),
      metric('availability', 'Stok bulunabilirliği', 'Stock availability', ['stok bulunabilirligi', 'stokta bulunma', 'stock availability', 'in stock rate'], 'required', 'Talebin stok nedeniyle kaybedilip kaybedilmediğini gösterir.', 'Shows whether demand is lost due to stock.'),
      metric('inventoryTurnover', 'Stok devir hızı', 'Inventory turnover', ['stok devir hizi', 'inventory turnover', 'stock turn'], 'contextual', 'Stok verimliliğini ve nakit bağlanmasını gösterir.', 'Shows inventory efficiency and cash tied up.', ['monitoring', 'diagnosis', 'forecast', 'executive']),
      metric('fulfillmentCost', 'Sipariş karşılama maliyeti', 'Fulfillment cost', ['siparis karsilama maliyeti', 'siparis basina lojistik', 'fulfillment cost', 'cost per order'], 'contextual', 'Siparişin operasyonel katkısını netleştirir.', 'Clarifies the operational contribution per order.', ['diagnosis', 'allocation', 'investment']),
      metric('cac', 'Müşteri edinme maliyeti', 'Customer acquisition cost', ['musteri edinme maliyeti', 'cac', 'customer acquisition cost'], 'contextual', 'Yeni müşteri büyümesinin maliyetini gösterir.', 'Shows the cost of new-customer growth.', ['allocation', 'investment', 'executive']),
    ],
  },
  {
    id: 'finance',
    label: {tr: 'Finans & Yönetim', en: 'Finance & Management'},
    description: {tr: 'Kârlılık, nakit, bütçe ve finansal dayanıklılık.', en: 'Profitability, cash, budget and financial resilience.'},
    metrics: [
      metric('revenue', 'Gelir / ciro', 'Revenue', ['gelir', 'ciro', 'revenue', 'sales'], 'required', 'İşletmenin gelir ölçeğini gösterir.', 'Shows the revenue scale of the business.'),
      metric('grossProfit', 'Brüt kâr', 'Gross profit', ['brut kar', 'gross profit'], 'required', 'Gelirin doğrudan maliyetler sonrası katkısını gösterir.', 'Shows contribution after direct costs.'),
      metric('opex', 'Operasyonel gider', 'Operating expenses', ['operasyonel gider', 'faaliyet gideri', 'opex', 'operating expenses'], 'required', 'İşletmenin çalışma maliyetini gösterir.', 'Shows the cost of running the business.'),
      metric('ebitda', 'EBITDA / FAVÖK', 'EBITDA', ['ebitda', 'favok'], 'required', 'Operasyonel kârlılığı karşılaştırılabilir kılar.', 'Makes operating profitability comparable.'),
      metric('cashFlow', 'Nakit akışı', 'Cash flow', ['nakit akisi', 'cash flow', 'free cash flow'], 'required', 'Kârlılık ile nakit üretimi arasındaki farkı gösterir.', 'Shows the difference between profit and cash generation.'),
      metric('budgetVariance', 'Bütçe sapması', 'Budget variance', ['butce sapmasi', 'butce gerceklesen', 'budget variance', 'actual vs budget'], 'required', 'Plan ile gerçekleşen arasındaki farkı görünür kılar.', 'Makes the gap between plan and actual visible.'),
      metric('workingCapital', 'Çalışma sermayesi', 'Working capital', ['calisma sermayesi', 'working capital'], 'contextual', 'Operasyonun nakit ihtiyacını açıklar.', 'Explains the operation’s cash requirement.', ['monitoring', 'forecast', 'executive']),
      metric('receivables', 'Alacak / tahsilat', 'Receivables / collections', ['alacak', 'tahsilat', 'receivables', 'collections', 'dso'], 'contextual', 'Gelirin nakde dönüşme hızını gösterir.', 'Shows how quickly revenue converts into cash.', ['diagnosis', 'forecast', 'executive']),
      metric('unitProfitability', 'Birim kârlılığı', 'Unit profitability', ['birim karliligi', 'urun karliligi', 'segment karliligi', 'unit profitability', 'profit by product'], 'contextual', 'Toplam sonucun hangi birimlerden geldiğini gösterir.', 'Shows which units drive the total result.', ['diagnosis', 'allocation']),
      metric('financeForecast', 'Finansal tahmin', 'Financial forecast', ['finansal tahmin', 'nakit tahmini', 'financial forecast', 'cash forecast'], 'contextual', 'Gelecek dönem risk ve ihtiyacını görünür kılar.', 'Makes future risk and need visible.', ['forecast', 'executive']),
    ],
  },
  {
    id: 'operations',
    label: {tr: 'Operasyon & Lojistik', en: 'Operations & Logistics'},
    description: {tr: 'Teslimat, kapasite, hizmet seviyesi ve birim maliyet.', en: 'Delivery, capacity, service level and unit cost.'},
    metrics: [
      metric('otif', 'Zamanında ve tam teslimat', 'On-time and in-full delivery', ['zamaninda teslimat', 'tam teslimat', 'otif', 'on time delivery', 'on-time delivery', 'on time in full'], 'required', 'Teslimat güvenilirliğini ölçer.', 'Measures delivery reliability.'),
      metric('volume', 'Operasyon hacmi', 'Operational volume', ['sevkiyat adedi', 'teslimat adedi', 'siparis adedi', 'operasyon hacmi', 'shipment volume', 'delivery volume', 'order volume'], 'required', 'Maliyet ve kapasiteyi normalize etmek için payda sağlar.', 'Provides the denominator for cost and capacity.'),
      metric('unitCost', 'Sevkiyat / sipariş başı maliyet', 'Cost per shipment / order', ['sevkiyat basina maliyet', 'siparis basina maliyet', 'teslimat maliyeti', 'cost per shipment', 'cost per order', 'delivery cost'], 'required', 'Operasyonel verimliliği hacimden bağımsız gösterir.', 'Shows efficiency independently of volume.'),
      metric('cycleTime', 'Çevrim / teslimat süresi', 'Cycle / delivery time', ['cevrim suresi', 'teslimat suresi', 'siparis suresi', 'cycle time', 'delivery time', 'lead time'], 'required', 'Operasyonun hızını ölçer.', 'Measures operational speed.'),
      metric('capacity', 'Kapasite kullanımı', 'Capacity utilization', ['kapasite kullanimi', 'doluluk orani', 'capacity utilization', 'load factor'], 'required', 'Büyüme ve darboğaz riskini gösterir.', 'Shows growth and bottleneck risk.'),
      metric('exceptions', 'Hasar / kayıp / iade', 'Damage / loss / returns', ['hasar orani', 'kayip orani', 'lojistik iade', 'damage rate', 'loss rate', 'delivery returns'], 'required', 'Hizmet kalitesindeki operasyonel kaybı gösterir.', 'Shows operational quality leakage.'),
      metric('sla', 'SLA uyumu', 'SLA compliance', ['sla uyumu', 'hizmet seviyesi', 'sla compliance', 'service level'], 'contextual', 'Taahhüt edilen hizmet seviyesini doğrular.', 'Validates the promised service level.', ['monitoring', 'executive']),
      metric('backlog', 'Backlog', 'Backlog', ['backlog', 'bekleyen siparis', 'bekleyen sevkiyat', 'pending orders'], 'contextual', 'Kapasite açığını ve gelecek iş yükünü gösterir.', 'Shows capacity gaps and future workload.', ['monitoring', 'forecast', 'executive']),
      metric('productivity', 'Depo / rota verimliliği', 'Warehouse / route productivity', ['depo verimliligi', 'rota verimliligi', 'warehouse productivity', 'route productivity', 'picks per hour'], 'contextual', 'Sorunun hangi operasyon biriminde oluştuğunu gösterir.', 'Shows where operational inefficiency occurs.', ['diagnosis', 'allocation']),
      metric('investmentReturn', 'Operasyon yatırımı geri dönüşü', 'Operations investment return', ['operasyon yatirimi geri donusu', 'lojistik roi', 'automation roi', 'investment return'], 'contextual', 'Yalnızca yatırım kararında ekonomik geri dönüşü ölçer.', 'Measures economic return only for investment decisions.', ['investment']),
    ],
  },
  {
    id: 'project',
    label: {tr: 'Proje & Gayrimenkul', en: 'Project & Real Estate'},
    description: {tr: 'İlerleme, bütçe, satış, tahsilat ve finansman ihtiyacı.', en: 'Progress, budget, sales, collections and funding need.'},
    metrics: [
      metric('progress', 'Fiziksel ilerleme', 'Physical progress', ['fiziksel ilerleme', 'tamamlanma orani', 'physical progress', 'completion rate'], 'required', 'Projenin gerçekleşme seviyesini gösterir.', 'Shows the project’s completion level.'),
      metric('budgetActual', 'Bütçe / gerçekleşen', 'Budget vs actual', ['butce gerceklesen', 'maliyet sapmasi', 'budget vs actual', 'cost variance'], 'required', 'Maliyet kontrolünü ve sapmayı gösterir.', 'Shows cost control and variance.'),
      metric('salesVelocity', 'Satış hızı', 'Sales velocity', ['satis hizi', 'aylik satis', 'sales velocity', 'monthly sales'], 'required', 'Stokun gelire dönüşme hızını gösterir.', 'Shows how quickly inventory becomes revenue.'),
      metric('collections', 'Tahsilat', 'Collections', ['tahsilat', 'collections', 'cash collection'], 'required', 'Sözleşme ile nakit arasındaki farkı gösterir.', 'Shows the gap between contracts and cash.'),
      metric('inventory', 'Kalan stok', 'Remaining inventory', ['kalan stok', 'satilmamis stok', 'remaining inventory', 'unsold inventory'], 'required', 'Satış riski taşıyan proje stokunu gösterir.', 'Shows project inventory exposed to sales risk.'),
      metric('fundingNeed', 'Nakit / finansman ihtiyacı', 'Cash / funding need', ['finansman ihtiyaci', 'nakit ihtiyaci', 'funding need', 'cash requirement'], 'required', 'Projenin en yüksek fonlama açığını gösterir.', 'Shows the project’s peak funding gap.'),
      metric('scheduleVariance', 'Takvim sapması', 'Schedule variance', ['takvim sapmasi', 'gecikme', 'schedule variance', 'delay'], 'contextual', 'İlerleme ile plan arasındaki farkı gösterir.', 'Shows the gap between progress and plan.', ['monitoring', 'diagnosis', 'executive']),
      metric('costPerSqm', 'm² başına maliyet', 'Cost per sqm', ['m2 basina maliyet', 'metrekare maliyeti', 'cost per sqm', 'cost per square meter'], 'contextual', 'Proje maliyetini karşılaştırılabilir hale getirir.', 'Makes project cost comparable.', ['diagnosis', 'allocation', 'executive']),
      metric('financeCost', 'Finansman maliyeti', 'Finance cost', ['finansman maliyeti', 'faiz gideri', 'finance cost', 'interest expense'], 'contextual', 'Nakit açığının toplam kârlılık etkisini gösterir.', 'Shows the profitability impact of funding gaps.', ['forecast', 'investment', 'executive']),
      metric('projectProfit', 'Proje kârlılığı', 'Project profitability', ['proje karliligi', 'proje kari', 'project profitability', 'project profit'], 'contextual', 'Yatırımın ekonomik sonucunu gösterir.', 'Shows the economic outcome of the investment.', ['investment', 'executive']),
    ],
  },
]

export const getArea = (id: ReportAreaId) => reportAreas.find((area) => area.id === id) ?? reportAreas[0]
export const getPurpose = (id: ReportPurposeId) => reportPurposes.find((purpose) => purpose.id === id) ?? reportPurposes[0]

