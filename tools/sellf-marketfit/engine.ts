import type {ChannelEconomics, CostInputs, Locale, MarketEvidence, MarketSummary, PriceResult, SalesChannel, SalesPlanResult, SalesTargetInputs, ScenarioInputs} from './types.ts'

const finite = (value: number) => Number.isFinite(value) ? value : 0
const nonNegative = (value: number) => Math.max(0, finite(value))
const percent = (value: number) => Math.min(100, nonNegative(value))
const divide = (a: number, b: number) => b > 0 ? a / b : 0

export const defaultCosts: CostInputs = {
  production: 240, packaging: 18, inboundLogistics: 12, outboundLogistics: 42,
  distribution: 0, operations: 20, otherVariable: 8, returnHandling: 35,
  marketingPerOrder: 90, vatRate: 20, commissionRate: 18, paymentRate: 0,
  returnRate: 8, returnLossRate: 20, targetMargin: 20, plannedDiscountRate: 10,
}

function normalizedCosts(input: CostInputs, override?: Partial<ScenarioInputs>, channel?: ChannelEconomics) {
  const returnRate = percent(override?.returnRate ?? input.returnRate) / 100
  const returnLoss = percent(input.returnLossRate) / 100
  const landed = nonNegative(input.production) + nonNegative(input.packaging) + nonNegative(input.inboundLogistics)
  const storeAllocation = channel?.channel === 'store'
    ? divide(nonNegative(channel.monthlyFixedCost), nonNegative(channel.expectedMonthlyUnits)) * Math.max(1, nonNegative(override?.unitsPerOrder ?? 1))
    : 0
  const fulfilment = nonNegative(override?.shippingCost ?? input.outboundLogistics) + nonNegative(input.distribution) + nonNegative(input.operations) + nonNegative(input.otherVariable) + storeAllocation
  const recoverableLanded = landed * (1 - returnRate + returnRate * returnLoss)
  const expectedReturnHandling = returnRate * nonNegative(input.returnHandling)
  return {
    retainedRate: 1 - returnRate,
    landed,
    nonMarketing: recoverableLanded + fulfilment + expectedReturnHandling,
    marketing: nonNegative(input.marketingPerOrder),
    vat: percent(input.vatRate) / 100,
    feeRate: (percent(override?.commissionRate ?? input.commissionRate) + percent(input.paymentRate)
      + (channel?.channel === 'b2b' ? percent(channel.tradeMarginRate) : 0)) / 100
      + (channel?.channel === 'b2b' ? percent(channel.annualFinancingRate) / 100 * nonNegative(channel.paymentTermDays) / 365 : 0),
    margin: percent(input.targetMargin) / 100,
    storeAllocation,
  }
}

function priceCoefficient(costs: ReturnType<typeof normalizedCosts>, targetMargin: number) {
  return costs.retainedRate * ((1 - targetMargin) / (1 + costs.vat) - costs.feeRate)
}

export function calculatePrice(input: CostInputs, listPrice?: number, override?: Partial<ScenarioInputs>, channel?: ChannelEconomics): PriceResult {
  const c = normalizedCosts(input, override, channel)
  const totalFixedPerOrder = c.nonMarketing + c.marketing
  const breakEvenCoefficient = priceCoefficient(c, 0)
  const targetCoefficient = priceCoefficient(c, c.margin)
  const breakEvenSalePrice = breakEvenCoefficient > 0 ? totalFixedPerOrder / breakEvenCoefficient : null
  const targetSalePrice = targetCoefficient > 0 ? totalFixedPerOrder / targetCoefficient : null
  const discount = percent(override?.discountRate ?? input.plannedDiscountRate) / 100
  const recommendedListPrice = targetSalePrice !== null && discount < 1 ? targetSalePrice / (1 - discount) : null
  const effectiveList = nonNegative(override?.listPrice ?? listPrice ?? recommendedListPrice ?? 0)
  const salePrice = effectiveList * (1 - discount)
  const recognizedGross = salePrice * c.retainedRate
  const netRevenue = recognizedGross / (1 + c.vat)
  const fees = recognizedGross * c.feeRate
  const contribution = netRevenue - fees - totalFixedPerOrder
  const contributionMargin = divide(contribution, netRevenue) * 100
  const targetContribution = netRevenue * c.margin
  const allowedCac = Math.max(0, netRevenue - fees - c.nonMarketing - targetContribution)
  const maxDiscountRate = effectiveList > 0 && breakEvenSalePrice !== null
    ? Math.max(0, Math.min(100, (1 - breakEvenSalePrice / effectiveList) * 100))
    : null
  const warnings = [
    ...(c.retainedRate <= 0 ? ['İade oranı tüm satış gelirini ortadan kaldırıyor.'] : []),
    ...(targetCoefficient <= 0 ? ['Komisyon, vergi ve hedef marj birlikte uygulanabilir bir fiyat bırakmıyor.'] : []),
    ...(breakEvenSalePrice !== null && salePrice > 0 && salePrice < breakEvenSalePrice ? ['Seçilen satış fiyatı birim başabaş fiyatının altında.'] : []),
    ...(targetSalePrice !== null && salePrice > 0 && salePrice < targetSalePrice ? ['Seçilen fiyat hedeflenen kâr marjını karşılamıyor.'] : []),
    ...(channel?.channel === 'store' && nonNegative(channel.expectedMonthlyUnits) === 0 ? ['Mağaza sabit giderini dağıtmak için beklenen aylık satış adedi girilmelidir.'] : []),
    ...(channel?.channel === 'b2b' && percent(channel.tradeMarginRate) >= 60 ? ['B2B kanal marjı fiyatın uygulanabilirliğini ciddi biçimde sınırlıyor.'] : []),
  ]
  return {
    landedCost: c.landed, expectedNonMarketingCost: c.nonMarketing,
    breakEvenSalePrice, targetSalePrice, recommendedListPrice, netRevenue,
    netRevenueAfterFees: netRevenue - fees, channelCostPerOrder: c.storeAllocation,
    contribution, contributionMargin, maxDiscountRate, allowedCac,
    viable: breakEvenSalePrice !== null && salePrice >= breakEvenSalePrice,
    warnings,
  }
}

export function calculateSalesPlan(costs: CostInputs, target: SalesTargetInputs, scenario: ScenarioInputs, channel?: ChannelEconomics): SalesPlanResult {
  const discount = percent(scenario.discountRate) / 100
  const salePrice = nonNegative(scenario.listPrice) * (1 - discount)
  const returnRate = percent(scenario.returnRate) / 100
  const unitsPerOrder = Math.max(.01, nonNegative(scenario.unitsPerOrder), channel?.channel === 'b2b' ? nonNegative(channel.minimumOrderUnits) : 0)
  const keptUnitsPerOrder = unitsPerOrder * (1 - returnRate)
  const retainedRevenuePerOrder = salePrice * (1 - returnRate)
  const requiredOrders = target.targetType === 'units'
    ? divide(nonNegative(target.targetValue), keptUnitsPerOrder)
    : divide(nonNegative(target.targetValue), retainedRevenuePerOrder)
  const requiredGrossUnits = requiredOrders * unitsPerOrder
  const existingShare = percent(target.existingCustomerShare) / 100
  const newCustomerOrders = requiredOrders * (1 - existingShare)
  const ordersPerNewCustomer = 1 + nonNegative(target.repeatOrdersPerNewCustomer)
  const requiredNewCustomers = divide(newCustomerOrders, ordersPerNewCustomer)
  const requiredPaidCustomers = requiredNewCustomers * (1 - percent(target.organicNewCustomerShare) / 100)
  const conversion = percent(scenario.conversionRate) / 100
  const requiredVisits = conversion > 0 ? requiredPaidCustomers / conversion : null
  const perOrder = calculatePrice(costs, scenario.listPrice, scenario, channel)
  const contributionBeforeMarketingPerOrder = perOrder.contribution + nonNegative(costs.marketingPerOrder)
  const breakEvenMarketingBudget = Math.max(0, contributionBeforeMarketingPerOrder * requiredOrders - nonNegative(target.fixedPeriodCosts))
  const marketingBudgetLow = requiredPaidCustomers * nonNegative(target.cacRangeLow)
  const marketingBudgetHigh = requiredPaidCustomers * nonNegative(target.cacRangeHigh)
  const expectedMarketingBudget = requiredPaidCustomers * nonNegative(scenario.cac)
  const estimatedProfit = contributionBeforeMarketingPerOrder * requiredOrders - expectedMarketingBudget - nonNegative(target.fixedPeriodCosts)
  const profitAfterHighBudget = contributionBeforeMarketingPerOrder * requiredOrders - marketingBudgetHigh - nonNegative(target.fixedPeriodCosts)
  const warnings = [
    ...(requiredVisits === null ? ['Dönüşüm oranı olmadan gerekli trafik hesaplanamaz.'] : []),
    ...(contributionBeforeMarketingPerOrder <= 0 ? ['Ürün pazarlama harcaması öncesinde dahi pozitif katkı üretmiyor.'] : []),
    ...(expectedMarketingBudget > breakEvenMarketingBudget ? ['Beklenen pazarlama bütçesi başabaş bütçesini aşıyor.'] : []),
    ...(salePrice <= 0 ? ['Geçerli bir satış fiyatı girilmedi.'] : []),
  ]
  return {
    salePrice, requiredOrders, requiredGrossUnits, requiredNewCustomers, requiredPaidCustomers,
    requiredVisits, revenue: requiredOrders * retainedRevenuePerOrder,
    marketingBudgetLow, marketingBudgetHigh, expectedMarketingBudget,
    breakEvenMarketingBudget, estimatedProfit, profitAfterHighBudget,
    feasible: contributionBeforeMarketingPerOrder > 0 && expectedMarketingBudget <= breakEvenMarketingBudget,
    warnings,
  }
}

export function buildPriceStrategies(input: CostInputs, channel?: ChannelEconomics) {
  const variants = [
    {id: 'entry', margin: Math.max(5, input.targetMargin - 7), discount: Math.min(90, input.plannedDiscountRate + 5)},
    {id: 'balanced', margin: input.targetMargin, discount: input.plannedDiscountRate},
    {id: 'premium', margin: Math.min(60, input.targetMargin + 8), discount: Math.max(0, input.plannedDiscountRate - 3)},
  ] as const
  return variants.map((variant) => {
    const adjusted = {...input, targetMargin: variant.margin, plannedDiscountRate: variant.discount}
    return {...variant, result: calculatePrice(adjusted, undefined, undefined, channel)}
  })
}

function quantile(sorted: number[], q: number) {
  if (!sorted.length) return null
  const position = (sorted.length - 1) * q
  const base = Math.floor(position)
  const rest = position - base
  return sorted[base + 1] === undefined ? sorted[base] : sorted[base] + rest * (sorted[base + 1] - sorted[base])
}

function comparablePrice(item: MarketEvidence) {
  const packs = item.packageQuantity && item.packageQuantity > 0 ? item.packageQuantity : 1
  const amount = item.unitAmount && item.unitAmount > 0 ? item.unitAmount : 1
  const unit = (item.unitLabel || 'adet').trim().toLocaleLowerCase('tr-TR')
  if (['kg', 'kilogram'].includes(unit)) return {group: 'weight', unit: '100 g', price: item.price / (packs * amount * 10)}
  if (['g', 'gr', 'gram'].includes(unit)) return {group: 'weight', unit: '100 g', price: item.price / (packs * amount / 100)}
  if (['l', 'lt', 'litre', 'liter'].includes(unit)) return {group: 'volume', unit: '100 ml', price: item.price / (packs * amount * 10)}
  if (['ml', 'mililitre', 'milliliter'].includes(unit)) return {group: 'volume', unit: '100 ml', price: item.price / (packs * amount / 100)}
  return {group: 'item', unit: 'adet', price: item.price / (packs * amount)}
}

export function normalizeMarketPrice(price: number | null, unitAmount = 1, unitLabel = 'adet', packageQuantity = 1) {
  if (price === null || !Number.isFinite(price) || price <= 0) return null
  return comparablePrice({title: '', source: '', price, unitAmount, unitLabel, packageQuantity}).price
}

export function summarizeMarket(evidence: MarketEvidence[], currentPrice?: number): MarketSummary {
  const valid = evidence.filter((item) => Number.isFinite(item.price) && item.price > 0)
  const normalized = valid.map((item) => ({item, ...comparablePrice(item)})).filter((item) => Number.isFinite(item.price) && item.price > 0)
  const groupCounts = normalized.reduce((counts, item) => counts.set(item.group, (counts.get(item.group) || 0) + 1), new Map<string, number>())
  const dominantGroup = [...groupCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
  const comparable = normalized.filter((item) => item.group === dominantGroup)
  const rawPrices = comparable.map((item) => item.price).sort((a, b) => a - b)
  const rawLower = quantile(rawPrices, .25)
  const rawUpper = quantile(rawPrices, .75)
  const iqr = rawLower !== null && rawUpper !== null ? rawUpper - rawLower : 0
  const filtered = rawPrices.length >= 5 && iqr > 0
    ? comparable.filter((item) => item.price >= (rawLower as number) - 1.5 * iqr && item.price <= (rawUpper as number) + 1.5 * iqr)
    : comparable
  const prices = filtered.map((item) => item.price).sort((a, b) => a - b)
  const excludedCount = valid.length - filtered.length
  if (!prices.length) return {
    evidenceCount: valid.length, comparableCount: 0, excludedCount: valid.length, confidence: 'unavailable', confidenceScore: 0,
    confidenceReasons: ['Karşılaştırılabilir fiyat kanıtı bulunamadı.'], comparisonUnit: null, minimum: null, maximum: null, median: null,
    lowerQuartile: null, upperQuartile: null, suggestedLow: null, suggestedHigh: null,
    discountPrevalence: null, freeShippingPrevalence: null, positioning: 'unknown',
    observations: ['Doğrulanabilir pazar fiyatı bulunamadı; fiyat aralığı üretilmedi.'],
  }
  const lower = quantile(prices, .25)
  const median = quantile(prices, .5)
  const upper = quantile(prices, .75)
  const included = new Set(filtered.map(({item}) => item))
  const comparableEvidence = valid.filter((item) => included.has(item))
  const discounts = comparableEvidence.filter((item) => item.listPrice && item.listPrice > item.price).length
  const shippingKnown = comparableEvidence.filter((item) => typeof item.freeShipping === 'boolean')
  const sourceCount = new Set(comparableEvidence.map((item) => item.source)).size
  const datedCount = comparableEvidence.filter((item) => item.observedAt && !Number.isNaN(Date.parse(item.observedAt))).length
  const medianValue = median || 0
  const dispersion = medianValue > 0 && lower !== null && upper !== null ? (upper - lower) / medianValue : 1
  const score = Math.max(0, Math.min(100, Math.round(
    Math.min(45, filtered.length * 6)
    + (sourceCount >= 2 ? 15 : 7)
    + (dispersion <= .25 ? 18 : dispersion <= .5 ? 12 : 5)
    + (datedCount / filtered.length >= .8 ? 12 : datedCount > 0 ? 6 : 0)
    + (excludedCount === 0 ? 10 : Math.max(0, 10 - excludedCount * 2))
  )))
  const confidence = score >= 75 ? 'high' : score >= 50 ? 'medium' : 'low'
  const positioning = !currentPrice || filtered[0]?.group !== 'item' || lower === null || upper === null ? 'unknown'
    : currentPrice < lower ? 'budget' : currentPrice > upper ? 'premium' : 'mid-market'
  const observations = [
    `${filtered.length} karşılaştırılabilir fiyat sinyali değerlendirildi.`,
    ...(filtered.length < 5 ? ['Öneri yön göstericidir; en az beş karşılaştırılabilir ürünle güçlendirilmelidir.'] : []),
    ...(excludedCount > 0 ? [`${excludedCount} uyumsuz birim veya aykırı fiyat hesaplamadan çıkarıldı.`] : []),
    ...(discounts / filtered.length >= .5 ? ['İncelenen ürünlerin çoğunda liste fiyatı ile satış fiyatı ayrışıyor.'] : []),
  ]
  return {
    evidenceCount: valid.length, comparableCount: filtered.length, excludedCount, confidence, confidenceScore: score,
    confidenceReasons: [
      `${filtered.length} karşılaştırılabilir ürün`,
      sourceCount >= 2 ? `${sourceCount} farklı kanıt kaynağı` : 'Tek kanıt kaynağı',
      dispersion <= .25 ? 'Fiyatlar tutarlı' : dispersion <= .5 ? 'Fiyat dağılımı orta' : 'Fiyat dağılımı geniş',
      datedCount ? `${datedCount} tarihli gözlem` : 'Gözlem tarihi belirtilmedi',
    ],
    comparisonUnit: filtered[0]?.unit || null, minimum: prices[0], maximum: prices.at(-1) ?? prices[0],
    median, lowerQuartile: lower, upperQuartile: upper, suggestedLow: lower, suggestedHigh: upper,
    discountPrevalence: discounts / filtered.length * 100,
    freeShippingPrevalence: shippingKnown.length ? shippingKnown.filter((item) => item.freeShipping).length / shippingKnown.length * 100 : null,
    positioning, observations,
  }
}

export function assessMarketFit(summary: MarketSummary, price: PriceResult, comparableTargetPrice = price.targetSalePrice) {
  if (summary.confidence === 'unavailable' || summary.suggestedHigh === null || comparableTargetPrice === null) {
    return {status: 'unknown' as const, gap: null, message: 'Pazar aralığı ile kârlı fiyatı karşılaştırmak için yeterli kanıt yok.'}
  }
  if (comparableTargetPrice <= summary.suggestedHigh) {
    return {status: 'fit' as const, gap: 0, message: 'Hedef marjı koruyan fiyat, gözlemlenen pazar koridorunun içinde.'}
  }
  const gap = comparableTargetPrice - summary.suggestedHigh
  return {status: 'gap' as const, gap, message: 'Kârlı fiyat pazar koridorunun üzerinde; maliyet, paket, kanal veya konumlandırma değişikliği gerekiyor.'}
}

export function derivePositioning(evidence: MarketEvidence[], summary: MarketSummary, referencePrice: number | null, channel: SalesChannel, locale: Locale) {
  const stop = new Set(['ve', 'ile', 'için', 'the', 'and', 'for', 'bir', 'adet', 'ürün', 'product', 'yeni', 'new', 'paket', 'set'])
  const frequencies = new Map<string, number>()
  for (const item of evidence) {
    const words = item.title.toLocaleLowerCase(locale === 'tr' ? 'tr-TR' : 'en-US').match(/[\p{L}\p{N}]+/gu) || []
    for (const word of new Set(words)) if (word.length >= 4 && !stop.has(word)) frequencies.set(word, (frequencies.get(word) || 0) + 1)
  }
  const commonTerms = [...frequencies.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([word]) => word)
  const position = referencePrice === null || summary.lowerQuartile === null || summary.upperQuartile === null ? 'unknown'
    : referencePrice < summary.lowerQuartile ? 'budget' : referencePrice > summary.upperQuartile ? 'premium' : 'mid-market'
  const territory = locale === 'tr'
    ? position === 'premium' ? 'Kanıtlanabilir üstünlük' : position === 'budget' ? 'Erişilebilir değer' : position === 'mid-market' ? 'Net kullanım sonucu' : 'Kanıtla netleştirilecek konum'
    : position === 'premium' ? 'Provable superiority' : position === 'budget' ? 'Accessible value' : position === 'mid-market' ? 'Clear use-case outcome' : 'Position to validate with evidence'
  const channelAdvice: Record<SalesChannel, [string, string]> = {
    marketplace: ['İlk görsel ve ürün başlığında tek farkı görünür kılın; birim fiyatı ve yorum kanıtını saklamayın.', 'Make one difference visible in the first image and title; expose unit price and review proof.'],
    'own-site': ['Fiyatı ürün kanıtı, karşılaştırma, garanti ve kullanım sonucu ile birlikte savunun.', 'Defend the price with product proof, comparison, guarantee and use-case outcome.'],
    store: ['Raf üzerinde üç saniyede anlaşılabilecek tek fayda ve net fiyat mimarisi kurun.', 'Build one benefit and a clear price architecture that can be understood on shelf in three seconds.'],
    b2b: ['Alıcı marjı, stok dönüşü, vade ve tekrar sipariş kolaylığını birlikte savunun.', 'Defend buyer margin, inventory turns, payment terms and reorder ease together.'],
  }
  return {
    position, territory, commonTerms, recommendation: channelAdvice[channel][locale === 'tr' ? 0 : 1],
    avoid: locale === 'tr'
      ? commonTerms.length ? `Rakiplerde sık tekrarlanan ${commonTerms.slice(0, 3).join(', ')} ifadelerini tek başına farklılaştırıcı olarak kullanmayın.` : 'Yeterli ürün başlığı olmadan jenerik bir konumlandırma iddiası üretmeyin.'
      : commonTerms.length ? `Do not use the common terms ${commonTerms.slice(0, 3).join(', ')} as standalone differentiators.` : 'Do not produce a generic positioning claim without enough product-title evidence.',
  }
}
