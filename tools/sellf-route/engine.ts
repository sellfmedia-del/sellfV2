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

  if (includesAny(text, ['lead geliyor ama', 'lead var ama', 'teklif veriyoruz ama']) && includesAny(text, ['kapanmiyor', 'satisa donusmuyor', 'donusmuyor'])) mark('sales-close-explicit', 'low-close-rate')
  else if (includesAny(text, ['lead gelmiyor', 'talep yok', 'musteri gelmiyor', 'siparis gelmiyor'])) mark('demand-explicit', 'low-demand')

  const adsMention = includesAny(text, ['reklam', 'google ads', 'meta ads', 'medya butcesi'])
  const adsFailure = includesAny(text, ['ise yaramiyor', 'calismiyor', 'satis getirmiyor', 'sonuc alamiyoruz', 'para harciyoruz'])
  if (adsMention && adsFailure) clarifications.add('ads-outcome')

  const siteMention = includesAny(text, ['site', 'website', 'web sitesi', 'eticaret sitesi', 'e ticaret sitesi'])
  if (siteMention && includesAny(text, ['acilmiyor', 'hata veriyor', 'cok yavas', 'bozuk'])) mark('site-technical-explicit', 'site-technical')
  else if (siteMention && includesAny(text, ['calismiyor', 'ise yaramiyor', 'satis getirmiyor'])) clarifications.add('site-meaning')

  if (includesAny(text, ['manuel', 'elle yapiyoruz', 'excelden', 'entegrasyon yok', 'sistemler bagli degil'])) mark('workflow-explicit', 'manual-process')
  if (includesAny(text, ['satis artiyor ama para kazanmiyoruz', 'ciro var kar yok', 'kar edemiyoruz', 'marjimiz dusuk', 'marj dusuk'])) mark('margin-explicit', 'margin-pressure')
  if (includesAny(text, ['tekrar satin alma yok', 'musteri geri gelmiyor', 'churn yuksek', 'sadakat dusuk'])) mark('retention-explicit', 'low-retention')
  if (includesAny(text, ['markamiz anlasilmiyor', 'ne sundugumuz anlasilmiyor', 'konumlandirma belirsiz', 'mesajimiz net degil'])) mark('brand-explicit', 'brand-unclear')
  if (includesAny(text, ['pazaryeri karmasik', 'trendyol yonet', 'amazon yonet', 'urun listeleme sorunu'])) mark('marketplace-explicit', 'marketplace-complexity')

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
