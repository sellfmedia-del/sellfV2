import type {NarrativeAssessment, ProblemSignal, RouteInputs, RouteItem, RouteResult, ServiceId} from './types'

const normalize = (value: string) => value
  .toLocaleLowerCase('tr-TR')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/ı/g, 'i')
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const includesAny = (text: string, values: string[]) => values.some((value) => text.includes(value))
const matchesAny = (text: string, patterns: RegExp[]) => patterns.some((pattern) => pattern.test(text))

// These patterns only nominate a signal for the confirmation screen. They never
// select a service on their own, so recall can be broad without turning a phrase
// into an unverified diagnosis.
const signalPatterns: Array<{label: string; signal: ProblemSignal; patterns: RegExp[]}> = [
  {
    label: 'demand-explicit', signal: 'low-demand', patterns: [
      /musteri (?:bulam|edinem|kazanam)/, /musteri bulmakta zorlan/, /yeni musteri.{0,30}(?:gelmiyor|bulam|edinem|kazanam|yok|az)/,
      /(?:lead|talep|siparis|satis).{0,25}(?:gelmiyor|olusmuyor|uretemiyoruz|yok|yetersiz|cok az|azaldi|durdu)/,
      /(?:satis|siparis|talep) yaratam/, /potansiyel musteri.{0,25}(?:bulam|yok|gelmiyor)/,
      /(?:cannot|can t|struggl\w* to) (?:find|acquire|win) (?:new )?(?:customers|clients)/,
      /(?:not enough|no|few) (?:leads|orders|customers|sales|demand)/,
    ],
  },
  {
    label: 'conversion-explicit', signal: 'low-conversion', patterns: [
      /(?:trafik|ziyaretci|tiklama).{0,35}(?:geliyor|var|yuksek).{0,35}(?:satis|donusum|form|siparis).{0,20}(?:yok|olmuyor|dusuk|az)/,
      /(?:siteye|sayfaya).{0,25}(?:ziyaretci|kullanici|trafik).{0,25}(?:geliyor|var).{0,45}(?:satin alan|form dolduran|siparis veren).{0,15}(?:yok|olmuyor)/,
      /(?:sepete ekliyor|urun inceliyor).{0,30}(?:satin almiyor|siparis vermiyor|terk ediyor)/,
      /(?:siteye|sayfaya).{0,25}(?:giren|gelen).{0,30}(?:satin almiyor|donusmuyor|form doldurmuyor)/,
      /(?:traffic|visitors|clicks).{0,35}(?:but|yet).{0,35}(?:no|few|low).{0,15}(?:sales|orders|conversions|forms)/,
    ],
  },
  {
    label: 'lead-quality-explicit', signal: 'low-quality-leads', patterns: [
      /lead(?:ler|lerin|lerimiz)?\s*.{0,25}(?:niteliksiz|kalitesiz|alakasiz|uygunsuz|butcesiz|yanlis)/,
      /(?:nitelikli|kaliteli|uygun) lead.{0,20}(?:gelmiyor|bulam|yok|az)/,
      /(?:wrong|poor quality|unqualified|irrelevant) leads/,
      /leads?.{0,25}(?:no budget|not qualified|poor quality|irrelevant)/,
    ],
  },
  {
    label: 'sales-close-explicit', signal: 'low-close-rate', patterns: [
      /(?:teklif|fiyat teklifi|proposal).{0,45}(?:askida|cevapsiz|bekliyor|sonuclanmiyor|kapanmiyor|reddediliyor|kabul edilmiyor|satisa donusmuyor|donus yok)/,
      /teklif (?:gonder|ver).{0,45}(?:sonuc alam|geri donmuyor|cevap gelmiyor|kapanmiyor|anlasma olmuyor|satisa donusmuyor)/,
      /(?:musteri|lead|gorusme|toplanti).{0,35}(?:var|geliyor|yapiyoruz).{0,35}(?:satisi|anlasmayi|isi).{0,15}(?:kapatam|sonuclandiram)/,
      /(?:kapanis|close|closing) oran(?:i|imiz)?.{0,20}(?:dusuk|zayif|az)/,
      /(?:quotes?|proposals?|offers?).{0,40}(?:stuck|unanswered|not closing|not converting|no response)/,
      /(?:cannot|can t|struggl\w* to) close (?:deals|sales|opportunities)/,
    ],
  },
  {
    label: 'margin-explicit', signal: 'margin-pressure', patterns: [
      /(?:ciro|satis).{0,25}(?:var|artiyor|yuksek).{0,30}(?:kar yok|para kazanmiyoruz|kar birakmiyor|zarar)/,
      /(?:kar|katki) marj(?:i|imiz)?.{0,20}(?:dusuk|zayif|eriyor|az)/, /kar edemiyoruz/, /maliyetler.{0,25}(?:cok yuksek|artti|kari eritiyor)/,
      /(?:revenue|sales).{0,25}(?:growing|high).{0,30}(?:no profit|unprofitable|losing money)/, /(?:profit|contribution) margin.{0,20}(?:low|weak|shrinking)/,
    ],
  },
  {
    label: 'retention-explicit', signal: 'low-retention', patterns: [
      /musteri.{0,25}(?:tekrar gelmiyor|geri gelmiyor|bir daha almiyor|yenilemiyor)/, /tekrar satin alma.{0,15}(?:yok|dusuk|az)/,
      /(?:churn|musteri kaybi).{0,15}(?:yuksek|artti|fazla)/, /(?:repeat purchase|retention).{0,20}(?:low|poor)/, /customers?.{0,20}(?:do not|don t) (?:return|renew|buy again)/,
    ],
  },
  {
    label: 'brand-explicit', signal: 'brand-unclear', patterns: [
      /(?:marka|markamiz|teklif|mesaj|konumlandirma).{0,30}(?:anlasilmiyor|net degil|belirsiz|karisik)/,
      /(?:ne yaptigimizi|ne sundugumuzu|farkimizi|neden bizi).{0,35}(?:anlatam|aciklayam|gosterem|anlamiyor)/,
      /(?:brand|offer|message|positioning).{0,25}(?:unclear|confusing|not clear|not understood)/,
    ],
  },
  {
    label: 'workflow-explicit', signal: 'manual-process', patterns: [
      /(?:manuel|elle) (?:yapiyor|takip ediyor|giriyor|yonetiyor)/, /excel(?:den|le| uzerinden)?.{0,30}(?:takip|yonet|aktar|gir)/,
      /(?:etiket|siparis|stok|rapor|veri|fatura|operasyon).{0,25}(?:manuel|elle)/,
      /entegrasyon.{0,15}(?:yok|eksik|calismiyor)/, /sistemler.{0,20}(?:bagli degil|konusmuyor)/, /(?:manual|spreadsheet).{0,25}(?:process|tracking|workflow)/,
    ],
  },
  {
    label: 'marketplace-explicit', signal: 'marketplace-complexity', patterns: [
      /(?:pazaryeri|trendyol|amazon|hepsiburada).{0,35}(?:yonetem|karisik|sorun|stok.{0,10}(?:uyusmuyor|senkron)|liste.{0,10}(?:hata|sorun))/, /urun listeleme.{0,15}(?:sorun|hata)/,
      /(?:marketplace|amazon).{0,30}(?:listing|inventory|feed|store).{0,20}(?:problem|error|out of sync)/,
    ],
  },
]

export function analyzeNarrative(value: string): NarrativeAssessment {
  const text = normalize(value)
  if (!text) return {matchedPhrases: [], suggestedSignals: [], clarificationIds: [], confidence: 'none'}

  const matchedPhrases: string[] = []
  const suggestions = new Set<ProblemSignal>()
  const clarifications = new Set<NarrativeAssessment['clarificationIds'][number]>()
  const mark = (label: string, signal?: ProblemSignal) => { matchedPhrases.push(label); if (signal) suggestions.add(signal) }

  const shippingMention = includesAny(text, ['kargo', 'teslimat', 'sevkiyat'])
  const ordersExist = includesAny(text, ['siparis geliyor', 'siparisler geliyor', 'siparis var', 'satis var'])
  const fulfilmentEvidence = includesAny(text, ['gecikiyor', 'hazirlayam', 'etiket', 'entegrasyon', 'depoda', 'paketleyem', 'teslim edem'])
  const noOrders = includesAny(text, ['siparis yok', 'siparis gelmiyor', 'satis yok', 'satis yapam', 'kargo cikisimiz yok', 'kargo cikisi yok'])

  if (shippingMention && ordersExist && fulfilmentEvidence) mark('fulfillment-explicit', 'fulfillment')
  else if (shippingMention && noOrders && !ordersExist) clarifications.add('shipping-meaning')
  else if (shippingMention) clarifications.add('shipping-meaning')

  for (const rule of signalPatterns) {
    if (matchesAny(text, rule.patterns)) mark(rule.label, rule.signal)
  }

  const adsMention = includesAny(text, ['reklam', 'google ads', 'meta ads', 'medya butcesi'])
  const adsFailure = includesAny(text, ['ise yaramiyor', 'calismiyor', 'satis getirmiyor', 'sonuc alamiyoruz', 'para harciyoruz'])
  if (adsMention && adsFailure) clarifications.add('ads-outcome')

  const siteMention = includesAny(text, ['site', 'website', 'web sitesi', 'eticaret sitesi', 'e ticaret sitesi'])
  if (siteMention && includesAny(text, ['acilmiyor', 'hata veriyor', 'hata aliyoruz', 'cok yavas', 'yuklenmiyor', 'bozuk', 'cokuyor', 'crash', 'broken', 'too slow'])) mark('site-technical-explicit', 'site-technical')
  else if (siteMention && includesAny(text, ['calismiyor', 'ise yaramiyor', 'satis getirmiyor'])) clarifications.add('site-meaning')

  const confidence = clarifications.size > 0
    ? suggestions.size > 0 ? 'medium' : 'low'
    : suggestions.size >= 2 ? 'high' : suggestions.size === 1 ? 'medium' : 'low'

  return {matchedPhrases, suggestedSignals: [...suggestions], clarificationIds: [...clarifications], confidence}
}

type MutableItem = RouteItem & {order: number}

export function buildRoute(input: RouteInputs): RouteResult {
  const signals = new Set(input.signals)
  const items = new Map<ServiceId, MutableItem>()
  const add = (id: ServiceId, phase: 1 | 2 | 3, state: RouteItem['state'], reason: string, blockers: string[] = [], order = 0) => {
    const existing = items.get(id)
    if (existing) {
      if (!existing.reasons.includes(reason)) existing.reasons.push(reason)
      existing.blockers = [...new Set([...existing.blockers, ...blockers])]
      if (phase < existing.phase) existing.phase = phase
      if (state === 'blocked') existing.state = 'blocked'
      return
    }
    items.set(id, {id, phase, state, reasons: [reason], blockers, order})
  }

  const commercialUnknown = input.unitEconomicsReady !== 'yes'
  const offerUnclear = input.offerReady !== 'yes'
  const measurementGap = input.measurementReady !== 'yes'
  const capacityRisk = input.capacityReady !== 'yes'
  const pathGap = input.conversionPathReady !== 'yes'

  if (commercialUnknown || signals.has('margin-pressure') || input.objective === 'profitability') add('commercial-diagnosis', 1, 'required', 'commercial-clarity', [], 10)
  if (offerUnclear || signals.has('brand-unclear') || input.objective === 'launch' || signals.has('low-demand')) add('offer-positioning', 1, 'required', 'offer-clarity', [], 20)
  if (measurementGap) add('measurement', 1, 'required', 'measurement-gap', [], 30)
  if (pathGap || signals.has('site-technical')) add('digital-foundation', 1, 'required', signals.has('site-technical') ? 'technical-friction' : 'conversion-path-gap', [], 40)
  if (signals.has('fulfillment')) add('ecommerce-operations', 1, 'required', 'fulfillment-risk', [], 50)
  if (signals.has('manual-process') || input.objective === 'digitalize') add('software-workflow', signals.has('fulfillment') ? 2 : 1, 'required', 'workflow-friction', [], 60)

  if (signals.has('low-conversion') || input.conversionState === 'weak') {
    const blockers = [measurementGap ? 'measurement' : '', pathGap ? 'conversion-path' : ''].filter(Boolean)
    add('conversion', blockers.length ? 2 : 1, blockers.length ? 'next' : 'required', 'conversion-loss', blockers, 70)
  }
  if (input.businessModel === 'b2b' && (signals.has('low-quality-leads') || signals.has('low-close-rate') || signals.has('low-demand'))) add('sales-funnel', 2, 'required', 'sales-pipeline-gap', measurementGap ? ['measurement'] : [], 80)
  if (input.businessModel === 'marketplace' || signals.has('marketplace-complexity')) add('marketplace', 2, 'required', 'marketplace-complexity', commercialUnknown ? ['unit-economics'] : [], 90)
  if (signals.has('low-retention') && input.stage !== 'idea') add('retention', 2, 'required', 'retention-loss', measurementGap ? ['measurement'] : [], 100)

  if (input.objective === 'international') add('international-growth', 2, 'required', 'international-objective', commercialUnknown ? ['unit-economics'] : [], 110)
  if (input.objective === 'brand' || signals.has('brand-unclear')) add('brand-system', offerUnclear ? 2 : 1, 'required', 'brand-clarity', [], 120)

  const acquisitionNeed = input.objective === 'sales' || input.trafficState === 'low' || signals.has('low-demand')
  if (acquisitionNeed) {
    const adBlockers = [commercialUnknown ? 'unit-economics' : '', offerUnclear ? 'offer' : '', measurementGap ? 'measurement' : '', pathGap ? 'conversion-path' : '', capacityRisk ? 'capacity' : ''].filter(Boolean)
    add('performance', 3, adBlockers.length ? 'blocked' : 'next', 'acquisition-needed', adBlockers, 130)
    add('organic-growth', input.stage === 'idea' ? 3 : 2, 'next', 'sustainable-demand', pathGap ? ['conversion-path'] : [], 140)
  }

  const ordered = [...items.values()].sort((a, b) => a.phase - b.phase || a.order - b.order).map((item) => ({id: item.id, phase: item.phase, state: item.state, reasons: item.reasons, blockers: item.blockers}))
  const allIds: ServiceId[] = ['commercial-diagnosis', 'offer-positioning', 'measurement', 'digital-foundation', 'ecommerce-operations', 'software-workflow', 'conversion', 'sales-funnel', 'marketplace', 'performance', 'organic-growth', 'retention', 'international-growth', 'brand-system']
  const excluded = allIds.filter((id) => !items.has(id))

  const knownReadiness = [input.offerReady, input.measurementReady, input.unitEconomicsReady, input.capacityReady, input.conversionPathReady].filter((value) => value !== 'unknown').length
  const knownPerformance = [input.trafficState, input.conversionState].filter((value) => value !== 'unknown').length
  const confidenceScore = Math.min(100, 35 + knownReadiness * 8 + knownPerformance * 7 + Math.min(2, signals.size) * 5)
  const confidenceReasons = [
    `${knownReadiness}/5-readiness-known`,
    `${knownPerformance}/2-performance-known`,
    `${signals.size}-confirmed-signals`,
  ]
  const diagnosis = [
    commercialUnknown || signals.has('margin-pressure') ? 'commercial-foundation' : '',
    offerUnclear || signals.has('low-demand') ? 'offer-before-acquisition' : '',
    measurementGap ? 'measurement-before-scale' : '',
    signals.has('fulfillment') || capacityRisk ? 'capacity-before-scale' : '',
    acquisitionNeed ? 'acquisition-after-foundation' : '',
  ].filter(Boolean)

  return {items: ordered, excluded, confidenceScore, confidenceReasons, diagnosis}
}
