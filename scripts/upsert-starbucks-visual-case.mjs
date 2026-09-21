import {createClient} from '@sanity/client'
import {createReadStream, existsSync} from 'node:fs'
import path from 'node:path'

const token = process.env.SANITY_API_TOKEN
const coverPath = process.env.STARBUCKS_COVER_PATH

if (!token) throw new Error('SANITY_API_TOKEN is required')
if (!coverPath || !existsSync(coverPath)) throw new Error('STARBUCKS_COVER_PATH must point to an existing image')

const client = createClient({
  projectId: 'qozgfxrm',
  dataset: 'production',
  apiVersion: '2026-03-01',
  token,
  useCdn: false,
})

const coverAsset = await client.assets.upload('image', createReadStream(coverPath), {
  filename: path.basename(coverPath),
  title: 'Starbucks sales recovery external case analysis',
})

const document = {
  _id: 'engage-showcase-external-starbucks-growth-quality',
  _type: 'engageShowcase',
  title_tr: 'Starbucks satışları geri getirdi. Peki büyümeyi de mi?',
  title_en: 'Starbucks brought sales back. But did growth return?',
  slug: {_type: 'slug', current: 'starbucks-satislari-geri-getirdi-peki-buyumeyi-de-mi'},
  summary_tr: 'Eşdeğer mağaza satışları %7,9 arttı. Küresel faaliyet marjı ise iki yıl önceki %15,8 seviyesinden %12,9’a geriledi. Starbucks dönüşümünü Sinyal–Değer–Sonuç merceğiyle inceliyoruz.',
  summary_en: 'Comparable-store sales increased by 7.9%, while global operating margin stood at 12.9%, down from 15.8% two years earlier. We examine the Starbucks turnaround through the Signal–Value–Outcome lens.',
  publishedAt: '2026-09-21T09:00:00.000Z',
  featured: false,
  clientName: 'Starbucks — bağımsız dış vaka analizi',
  format: 'visualCase',
  layoutPreset: 'visualCase',
  cardStyle: 'featured',
  coverImage: {_type: 'image', asset: {_type: 'reference', _ref: coverAsset._id}, hotspot: {_type: 'sanity.imageHotspot', x: 0.67, y: 0.5, height: 1, width: 0.66}},
  metrics: [
    {_key: 'sales', _type: 'object', value: '+%7,9', label_tr: 'Eşdeğer mağaza satışları', label_en: 'Comparable-store sales'},
    {_key: 'margin', _type: 'object', value: '%15,8 → %12,9', label_tr: 'Küresel faaliyet marjı, iki yıllık karşılaştırma', label_en: 'Global operating margin, two-year comparison'},
  ],
  visualCaseScenes: [
    {
      _key: 'timeline', _type: 'visualCaseTimeline',
      eyebrow_tr: 'Zorlu bir dönem', eyebrow_en: 'A difficult stretch',
      title_tr: 'Altı çeyreklik gerilemenin ardından.', title_en: 'After six quarters of decline.',
      description_tr: 'Brian Niccol göreve geldiğinde Starbucks üç çeyrektir düşen eşdeğer mağaza satışlarıyla karşı karşıyaydı. Gerileme sonraki üç çeyrekte de devam etti.',
      description_en: 'When Brian Niccol took over, Starbucks had already recorded three consecutive quarters of declining comparable sales. The decline continued for another three quarters.',
      items: Array.from({length: 6}, (_, index) => ({
        _key: `quarter-${index + 1}`, _type: 'object',
        label_tr: `${index + 1}. çeyrek`, label_en: `Quarter ${index + 1}`,
        detail_tr: 'Eşdeğer satışlarda gerileme', detail_en: 'Comparable-sales decline',
      })),
    },
    {
      _key: 'levers', _type: 'visualCaseLevers',
      eyebrow_tr: 'Back to Starbucks', eyebrow_en: 'Back to Starbucks',
      title_tr: 'Operasyonel bir yeniden başlatma.', title_en: 'An operational reset.',
      description_tr: 'Plan, yeni bir reklam söyleminden çok satışın gerçekleştiği sistemi yeniden kurmaya odaklandı.',
      description_en: 'The plan focused less on a new marketing message and more on rebuilding the system responsible for producing the sale.',
      items: [
        {_key: 'wait', _type: 'object', title_tr: 'Daha kısa bekleme', title_en: 'Shorter waits', description_tr: 'Servis sürelerini kısaltacak operasyonel düzenlemeler.', description_en: 'Operational changes intended to reduce service times.'},
        {_key: 'menu', _type: 'object', title_tr: 'Daha sade menü', title_en: 'A simpler menu', description_tr: 'Daha az tercih edilen ürünlerin çıkarılması.', description_en: 'Less popular items were removed.'},
        {_key: 'space', _type: 'object', title_tr: 'Sosyal mekân', title_en: 'A social space', description_tr: 'Mağazaları yeniden kalınacak bir yer olarak kurmak.', description_en: 'Restoring stores as places where customers want to stay.'},
        {_key: 'labour', _type: 'object', title_tr: 'İşgücüne yatırım', title_en: 'Investment in labor', description_tr: 'Çalışan sayısı ve çalışma saatlerinin güçlendirilmesi.', description_en: 'Strengthening staffing levels and employee hours.'},
      ],
      featuredValue: '$500M+',
      featuredLabel_tr: 'İşgücü yatırımı', featuredLabel_en: 'Labor investment',
      featuredNote_tr: 'Daha hızlı servis ve daha güçlü mağaza deneyimi için planlanan asgari yatırım.',
      featuredNote_en: 'Minimum planned investment to support faster service and a stronger store experience.',
    },
    {
      _key: 'metrics', _type: 'visualCaseMetricComparison',
      eyebrow_tr: 'İki rakam, tek vaka', eyebrow_en: 'Two figures, one case',
      leftMetric: {value: '+%7,9', label_tr: 'Eşdeğer mağaza satışları', label_en: 'Comparable-store sales', note_tr: '28 Haziran’da sona eren 2026 mali yılı üçüncü çeyreği.', note_en: 'Fiscal Q3 2026, ended June 28.'},
      rightMetric: {value: '%15,8 → %12,9', label_tr: 'Küresel faaliyet marjı', label_en: 'Global operating margin', note_tr: 'Reuters’ın LSEG verilerine dayandırdığı iki yıllık karşılaştırma.', note_en: 'Two-year comparison cited by Reuters using LSEG data.'},
    },
    {
      _key: 'framework', _type: 'visualCaseFramework',
      eyebrow_tr: 'Veriden çıkan tablo', eyebrow_en: 'What the data shows',
      title_tr: 'Sinyal, değer ve sonuç aynı şey değildir.', title_en: 'Signal, value and outcome are not the same thing.',
      columns: [
        {_key: 'signal', _type: 'object', title_tr: 'Sinyal', title_en: 'Signal', statement_tr: 'Trafik ve satış güçlü.', statement_en: 'Traffic and sales are strong.', description_tr: 'Müşteriler geri dönüyor ve operasyonel değişiklikler tüketici davranışında ölçülebilir karşılık buluyor.', description_en: 'Customers are returning, and operational changes are producing a measurable response in customer behavior.'},
        {_key: 'value', _type: 'object', title_tr: 'Değer', title_en: 'Value', statement_tr: 'Kârlılık baskı altında.', statement_en: 'Profitability remains under pressure.', description_tr: 'Mağaza ve müşteri başına ekonomik değeri belirleyen marjlar iki yıl önceki seviyelerin altında.', description_en: 'The margins that determine economic value per store and per customer remain below their levels from two years earlier.'},
        {_key: 'outcome', _type: 'object', title_tr: 'Sonuç', title_en: 'Outcome', statement_tr: 'Toparlanma henüz tamamlanmadı.', statement_en: 'The recovery is not yet complete.', description_tr: 'Satış gerilemesi tersine döndü; ancak satış toparlanması henüz aynı ölçüde kâr toparlanmasına dönüşmedi.', description_en: 'The sales decline has reversed, but the recovery in sales has not yet translated into an equivalent recovery in profit.'},
      ],
    },
    {
      _key: 'system', _type: 'visualCaseFlow',
      eyebrow_tr: 'Kalıcı iyileşme, sistemle mümkün', eyebrow_en: 'Lasting improvement requires a system',
      title_tr: 'Sonuç, kişilere değil sisteme bağlı.', title_en: 'The outcome is tied to the system, not individuals.',
      description_tr: 'Bekleme süresi, menü yoğunluğu ve çalışan kapasitesi süreç seviyesinde ele alındığında performans tekrar edilebilir bir işleyişe bağlanabilir.',
      description_en: 'When wait times, menu complexity and staffing capacity are addressed at process level, performance can be connected to a repeatable operating model.',
      steps: [
        {_key: 'wait', _type: 'object', title_tr: 'Bekleme süresi', title_en: 'Wait times', description_tr: 'Daha hızlı servis', description_en: 'Faster service'},
        {_key: 'menu', _type: 'object', title_tr: 'Menü sadeleştirme', title_en: 'Menu simplification', description_tr: 'Daha düşük operasyon yükü', description_en: 'Lower operational load'},
        {_key: 'repeat', _type: 'object', title_tr: 'Tekrarlanabilir işleyiş', title_en: 'Repeatable operation', description_tr: 'Kişiye bağlı olmayan sistem', description_en: 'A system not dependent on individuals'},
      ],
    },
    {
      _key: 'units', _type: 'visualCaseEvidence',
      eyebrow_tr: 'Marjinal birim', eyebrow_en: 'The marginal unit',
      title_tr: 'Her mağaza büyümeye katkı sağlamaz.', title_en: 'Not every store contributes to growth.',
      description_tr: 'Bazı mağazalar ciro üretse bile sermaye, işgücü ve operasyon yükü hesaba katıldığında toplam değeri aşağı çekebilir. Yüzlerce mağazanın kapatılması, ağın birim ekonomisinin yeniden değerlendirildiğini gösteriyor.',
      description_en: 'Some stores may produce revenue while reducing total value once capital, labor and operating costs are considered. The closure of hundreds of stores shows that the economics of the network are being reassessed.',
      points: [
        {_key: 'economics', _type: 'object', title_tr: 'Birim ekonomisi', title_en: 'Unit economics', description_tr: 'Ciro tek başına yeterli değil.', description_en: 'Revenue alone is not enough.'},
        {_key: 'resources', _type: 'object', title_tr: 'Kaynak kullanımı', title_en: 'Resource allocation', description_tr: 'Sermaye ve işgücü daha güçlü birimlere yöneliyor.', description_en: 'Capital and labor shift toward stronger units.'},
        {_key: 'quality', _type: 'object', title_tr: 'Büyüme kalitesi', title_en: 'Growth quality', description_tr: 'Daha az birimle daha sağlıklı sonuç mümkün.', description_en: 'Healthier outcomes can come from fewer units.'},
      ],
    },
    {
      _key: 'conclusion', _type: 'visualCaseConclusion',
      eyebrow_tr: 'Sellf’in çıkarımı', eyebrow_en: 'Sellf perspective',
      title_tr: 'Ciroyu geri getirmek, büyümeyi geri getirmek değildir.', title_en: 'Bringing revenue back is not the same as bringing growth back.',
      description_tr: 'Büyümenin kalitesi yalnızca satış hızında değil; marjda, tekrar edilebilirlikte ve bu sonucu üreten maliyet yapısının sürdürülebilirliğinde ölçülür.',
      description_en: 'Growth quality is measured not only by sales momentum, but also by margin, repeatability and the sustainability of the cost structure required to produce the result.',
      question_tr: 'Ciroyu geri getirdiniz. Peki geri getirdiğiniz ciro, sizi ayakta tutacak maliyetin altına düşmeden taşınabilir mi?',
      question_en: 'You brought the revenue back. But can that revenue be carried without its cost undermining the economics required to sustain the business?',
    },
  ],
  sources: [
    { _key: 'reuters-analysis', _type: 'object', label: 'Reuters — sales recovery and margins', url: 'https://www.reuters.com/world/china/starbucks-ceo-niccol-brought-back-customers-investors-want-margins-next-2026-09-09/'},
    { _key: 'reuters-results', _type: 'object', label: 'Reuters — fiscal Q3 2026 results', url: 'https://www.reuters.com/business/retail-consumer/starbucks-beats-quarterly-sales-estimates-2026-07-29/'},
    { _key: 'ap-results', _type: 'object', label: 'AP — comparable-store sales', url: 'https://apnews.com/article/f1bbcee3ab22b4da67b64c0adeb4adb1'},
    { _key: 'cnbc-results', _type: 'object', label: 'CNBC — average ticket and outlook', url: 'https://www.cnbc.com/2026/07/29/starbucks-sbux-q3-2026-earnings.html'},
  ],
  disclosure_tr: 'Starbucks, Sellf’in müşterisi değildir. Bu çalışma, kamuya açık veriler üzerinden hazırlanmış bağımsız bir dış vaka analizidir.',
  disclosure_en: 'Starbucks is not a Sellf client. This is an independent external case analysis based exclusively on publicly available information.',
  seo: {
    _type: 'engageSeo',
    title_tr: 'Starbucks Satışları Geri Getirdi. Peki Büyümeyi de mi? | Sellf Engage',
    title_en: 'Starbucks Brought Sales Back. But Did Growth Return? | Sellf Engage',
    description_tr: 'Starbucks’ın %7,9 satış artışını ve %15,8’den %12,9’a gerileyen faaliyet marjını Sinyal–Değer–Sonuç yaklaşımıyla inceleyin.',
    description_en: 'Examine Starbucks’ 7.9% comparable-sales growth and the operating-margin decline from 15.8% to 12.9% through the Signal–Value–Outcome lens.',
    noIndex: false,
  },
}

const result = await client.createOrReplace(document)
console.log(JSON.stringify({id: result._id, slug: result.slug?.current, coverAsset: coverAsset._id}))
