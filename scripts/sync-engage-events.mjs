import {readFile} from 'node:fs/promises'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is required')

const projectId = 'qozgfxrm'
const dataset = 'production'
const apiVersion = '2026-02-19'
const base = `https://${projectId}.api.sanity.io/v${apiVersion}`

const imageRef = (assetId) => ({_type: 'image', asset: {_type: 'reference', _ref: assetId}})

async function uploadImage(filename, path) {
  const body = await readFile(path)
  const response = await fetch(`${base}/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`, {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'image/png'},
    body,
  })
  if (!response.ok) throw new Error(`Image upload failed (${filename}): ${response.status} ${await response.text()}`)
  const result = await response.json()
  return result.document._id
}

const block = (text, key, style = 'normal') => ({
  _type: 'block',
  _key: key,
  style,
  markDefs: [],
  children: [{_type: 'span', _key: `${key}s`, text, marks: []}],
})

const files = {
  omnisend: 'designs/events/omnisend-networking-event.png',
  sellfForUs: 'designs/events/sellf-for-us.png',
  globemeets: 'designs/events/globemeets-2026.png',
  worldef: 'designs/events/worldef-istanbul-2026.png',
}

const assets = {}
for (const [name, path] of Object.entries(files)) {
  assets[name] = await uploadImage(`sellf-engage-event-${name}.png`, path)
  console.log(`Uploaded ${name}`)
}

const events = [
  {
    _id: 'engage-event-omnisend-networking-event-2026',
    _type: 'engageEvent',
    title_tr: 'Omnisend Networking Event',
    title_en: 'Omnisend Networking Event',
    slug: {_type: 'slug', current: 'omnisend-networking-event-2026'},
    summary_tr: 'E-ticaret ve müşteri iletişimi odağındaki profesyonelleri bir araya getiren Omnisend buluşmasına katıldık; otomasyon, müşteri deneyimi ve sürdürülebilir büyüme üzerine yeni bağlantılar ve fikirler geliştirdik.',
    summary_en: 'We joined the Omnisend gathering for ecommerce and customer communication professionals, building new connections and exchanging ideas on automation, customer experience and sustainable growth.',
    body_tr: [
      block('Etkinlik hakkında', 'otrh', 'h2'),
      block('İstanbul Galata’da gerçekleşen buluşma, e-ticaret ekosistemindeki markaları ve uzmanları daha yakın bir diyalog ortamında bir araya getirdi. Sellf ekibi olarak otomasyonun yalnızca operasyonel hız değil, daha tutarlı bir müşteri deneyimi ve daha sağlıklı büyüme kararları üretmesi gerektiği yaklaşımını paylaştık.', 'otr1'),
      block('Etkinlik boyunca farklı sektörlerden ekiplerle ölçüm altyapıları, yaşam döngüsü iletişimi ve veriye dayalı büyüme üzerine görüş alışverişinde bulunduk.', 'otr2'),
    ],
    body_en: [
      block('About the event', 'oenh', 'h2'),
      block('Held in Galata, Istanbul, the gathering brought ecommerce brands and specialists together in a focused networking setting. Sellf shared its view that automation should deliver more than operational speed: it should create a more consistent customer experience and support better growth decisions.', 'oen1'),
      block('Throughout the event, we exchanged perspectives with teams from different industries on measurement foundations, lifecycle communication and data-informed growth.', 'oen2'),
    ],
    eventType: 'attended',
    startAt: '2026-06-15T09:00:00.000Z',
    datePrecision: 'month',
    timezone: 'Europe/Istanbul',
    location_tr: 'Galata, İstanbul',
    location_en: 'Galata, Istanbul',
    externalUrl: 'https://support.omnisend.com/en/collections/16760716-webinars-events',
    registrationOpen: false,
    featured: false,
    coverImage: imageRef(assets.omnisend),
    seo: {
      _type: 'engageSeo',
      title_tr: 'Omnisend Networking Event 2026 | Sellf Engage',
      title_en: 'Omnisend Networking Event 2026 | Sellf Engage',
      description_tr: 'Sellf’in İstanbul’daki Omnisend Networking Event katılımını ve e-ticaret, otomasyon ve müşteri deneyimi üzerine öne çıkan değerlendirmeleri keşfedin.',
      description_en: 'Explore Sellf’s participation in the Omnisend Networking Event in Istanbul and key perspectives on ecommerce, automation and customer experience.',
      image: imageRef(assets.omnisend),
      noIndex: false,
    },
  },
  {
    _id: 'engage-event-sellf-for-us-2026',
    _type: 'engageEvent',
    title_tr: 'Sellf For US',
    title_en: 'Sellf For US',
    slug: {_type: 'slug', current: 'sellf-for-us-2026'},
    summary_tr: 'C-level yöneticileri ve iş liderlerini bir araya getirdiğimiz özel buluşmada RGI yaklaşımını, gerçek büyümenin tekil metriklerden neden daha fazlası olduğunu ve karar sistemlerine nasıl dönüştürülebileceğini konuştuk.',
    summary_en: 'At this private gathering for C-level executives and business leaders, we explored the RGI approach, why real growth cannot be reduced to isolated metrics and how it can become a practical decision system.',
    body_tr: [
      block('Tekil metriklerin ötesinde büyüme', 'strh', 'h2'),
      block('Sellf For US, klasik bir sunum etkinliğinden çok ortak bir değerlendirme alanı olarak tasarlandı. C-level yöneticiler ve iş liderleriyle birlikte büyümeyi yalnızca ciro, ROAS veya erişim gibi tekil göstergeler üzerinden okumanın yarattığı kör noktaları ele aldık.', 'str1'),
      block('Sellf’in RGI yaklaşımı üzerinden pazar hareketi, verimlilik, kârlılık ve organizasyonel kapasite arasındaki ilişkiyi tartıştık. Oturum, farklı sektörlerden katılımcıların deneyimlerini paylaştığı açık bir fikir alışverişi ve networking formatında ilerledi.', 'str2'),
    ],
    body_en: [
      block('Growth beyond isolated metrics', 'senh', 'h2'),
      block('Sellf For US was designed as a shared evaluation space rather than a conventional presentation. Together with C-level executives and business leaders, we examined the blind spots created by reading growth only through isolated indicators such as revenue, ROAS or reach.', 'sen1'),
      block('Using Sellf’s RGI approach, we discussed the relationship between market movement, efficiency, profitability and organisational capacity. The session evolved as an open exchange of perspectives and a focused networking experience.', 'sen2'),
    ],
    eventType: 'hosted',
    startAt: '2026-08-07T13:00:00.000Z',
    endAt: '2026-08-07T19:00:00.000Z',
    datePrecision: 'day',
    timezone: 'Europe/Istanbul',
    location_tr: 'Monkey Roof Bar, Şişhane, İstanbul',
    location_en: 'Monkey Roof Bar, Şişhane, Istanbul',
    registrationOpen: false,
    featured: false,
    coverImage: imageRef(assets.sellfForUs),
    seo: {
      _type: 'engageSeo',
      title_tr: 'Sellf For US | RGI ve Gerçek Büyüme Buluşması',
      title_en: 'Sellf For US | RGI and Real Growth Gathering',
      description_tr: 'C-level yöneticileri bir araya getiren Sellf For US buluşmasında RGI, gerçek büyüme ve tekil metriklerin ötesindeki karar sistemleri konuşuldu.',
      description_en: 'Sellf For US brought C-level leaders together to discuss RGI, real growth and decision systems that move beyond isolated metrics.',
      image: imageRef(assets.sellfForUs),
      noIndex: false,
    },
  },
  {
    _id: 'engage-event-globemeets-2026',
    _type: 'engageEvent',
    title_tr: 'GlobeMeets 2026',
    title_en: 'GlobeMeets 2026',
    slug: {_type: 'slug', current: 'globemeets-2026'},
    summary_tr: 'Sellf, 50’den fazla ülkeden turizm paydaşlarını İstanbul’da buluşturan GlobeMeets 2026’da ana teknoloji sponsoru olarak yer aldı ve sektörün daha bağlantılı, ölçülebilir ve verimli çalışmasına katkı sundu.',
    summary_en: 'Sellf joined GlobeMeets 2026 as Main Technology Sponsor, supporting a more connected, measurable and efficient tourism ecosystem at a gathering of industry stakeholders from more than 50 countries.',
    body_tr: [
      block('Sınırların ötesinde teknoloji ortaklığı', 'gtrh', 'h2'),
      block('GlobeMeets B2B Networking Event, önceden planlanan bire bir görüşmeler aracılığıyla turizm profesyonellerini, uluslararası markaları ve alıcıları İstanbul’da bir araya getirdi. Sellf, etkinliğin ana teknoloji sponsoru olarak dijital altyapı ve büyüme odağındaki yaklaşımıyla organizasyona eşlik etti.', 'gtr1'),
      block('İki gün boyunca sektör temsilcileriyle turizmde veri kullanımı, dijital operasyonların ölçeklenmesi, yeni pazarlara erişim ve sürdürülebilir talep üretimi üzerine görüşmeler gerçekleştirdik.', 'gtr2'),
    ],
    body_en: [
      block('Technology partnership beyond borders', 'genh', 'h2'),
      block('The GlobeMeets B2B Networking Event brought tourism professionals, international brands and buyers together in Istanbul through pre-scheduled one-to-one meetings. As Main Technology Sponsor, Sellf supported the organisation with its perspective on digital infrastructure and measurable growth.', 'gen1'),
      block('Across two days, we met industry representatives to discuss the use of data in tourism, scalable digital operations, access to new markets and sustainable demand generation.', 'gen2'),
    ],
    eventType: 'sponsored',
    startAt: '2026-09-10T06:00:00.000Z',
    endAt: '2026-09-11T15:00:00.000Z',
    datePrecision: 'day',
    timezone: 'Europe/Istanbul',
    location_tr: 'Rixos Tersane İstanbul, Haliç',
    location_en: 'Rixos Tersane Istanbul, Golden Horn',
    externalUrl: 'https://globemeets.com/',
    registrationOpen: false,
    featured: true,
    coverImage: imageRef(assets.globemeets),
    seo: {
      _type: 'engageSeo',
      title_tr: 'GlobeMeets 2026 Ana Teknoloji Sponsoru | Sellf',
      title_en: 'GlobeMeets 2026 Main Technology Sponsor | Sellf',
      description_tr: 'Sellf’in ana teknoloji sponsoru olduğu GlobeMeets 2026’daki rolünü ve turizmde teknoloji, veri ve sürdürülebilir büyüme odağını keşfedin.',
      description_en: 'Explore Sellf’s role as Main Technology Sponsor of GlobeMeets 2026 and its focus on technology, data and sustainable growth in tourism.',
      image: imageRef(assets.globemeets),
      noIndex: false,
    },
  },
  {
    _id: 'engage-event-worldef-istanbul-2026',
    _type: 'engageEvent',
    title_tr: 'WORLDEF Istanbul 2026',
    title_en: 'WORLDEF Istanbul 2026',
    slug: {_type: 'slug', current: 'worldef-istanbul-2026'},
    summary_tr: 'Sellf ekibi olarak e-ticaret ve perakende dünyasının küresel oyuncularını İstanbul’da buluşturan WORLDEF 2026’ya katıldık; yeni teknolojileri, pazar hareketlerini ve sınır ötesi büyüme fırsatlarını yerinde değerlendirdik.',
    summary_en: 'The Sellf team attended WORLDEF Istanbul 2026, where global ecommerce and retail leaders gathered to explore emerging technologies, market shifts and cross-border growth opportunities.',
    body_tr: [
      block('E-ticaretin küresel gündemi İstanbul’da', 'wtrh', 'h2'),
      block('WORLDEF Istanbul 2026; e-ticaret, dijital ticaret, networking ve inovasyon odağında markaları, teknoloji sağlayıcılarını ve sektör liderlerini bir araya getirdi. Sellf ekibi olarak üç gün boyunca perakende dönüşümünü ve sınır ötesi ticaretin yeni dinamiklerini takip ettik.', 'wtr1'),
      block('Görüşmelerimizde yapay zekâ destekli operasyonlar, pazaryeri stratejileri, lojistik, müşteri deneyimi ve ölçülebilir büyüme sistemleri öne çıktı. Etkinliği, yeni iş birlikleri ve farklı pazarlara dair güncel içgörülerle tamamladık.', 'wtr2'),
    ],
    body_en: [
      block('The global ecommerce agenda in Istanbul', 'wenh', 'h2'),
      block('WORLDEF Istanbul 2026 brought brands, technology providers and industry leaders together around ecommerce, digital trade, networking and innovation. Over three days, the Sellf team followed the latest developments in retail transformation and cross-border commerce.', 'wen1'),
      block('Our conversations focused on AI-enabled operations, marketplace strategy, logistics, customer experience and measurable growth systems. We left the event with new connections and current perspectives on multiple markets.', 'wen2'),
    ],
    eventType: 'attended',
    startAt: '2026-06-11T06:00:00.000Z',
    endAt: '2026-06-13T15:00:00.000Z',
    datePrecision: 'day',
    timezone: 'Europe/Istanbul',
    location_tr: 'Yenikapı, İstanbul',
    location_en: 'Yenikapı, Istanbul',
    externalUrl: 'https://worldef.com/events/worldef-global-summit-2026/',
    registrationOpen: false,
    featured: false,
    coverImage: imageRef(assets.worldef),
    seo: {
      _type: 'engageSeo',
      title_tr: 'WORLDEF Istanbul 2026 | Sellf Engage',
      title_en: 'WORLDEF Istanbul 2026 | Sellf Engage',
      description_tr: 'Sellf’in WORLDEF Istanbul 2026 katılımını; e-ticaret, perakende teknolojileri ve sınır ötesi büyüme üzerine öne çıkan değerlendirmeleri keşfedin.',
      description_en: 'Explore Sellf’s participation in WORLDEF Istanbul 2026 and key perspectives on ecommerce, retail technology and cross-border growth.',
      image: imageRef(assets.worldef),
      noIndex: false,
    },
  },
]

const response = await fetch(`${base}/data/mutate/${dataset}?returnIds=true&visibility=sync`, {
  method: 'POST',
  headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
  body: JSON.stringify({mutations: events.map((document) => ({createOrReplace: document}))}),
})

if (!response.ok) throw new Error(`Mutation failed: ${response.status} ${await response.text()}`)
const result = await response.json()
console.log(JSON.stringify({transactionId: result.transactionId, documentIds: result.documentIds}, null, 2))
