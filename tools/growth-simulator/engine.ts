export type SectorId = 'ecommerce' | 'b2b' | 'retail' | 'realEstate'

export type NumericInputs = Record<string, number>

export type SimulationResult = {
  revenue: number
  expenses: number
  ebitda: number
  ebitdaMargin: number
  roas: number | null
  breakEvenRevenue: number | null
  volume: number
  volumeLabel: string
  secondary: Array<{label: string; value: number | null; format: 'currency' | 'number' | 'percent' | 'months'}>
  breakdown: Array<{label: string; value: number}>
  warnings: string[]
}

export type ComparisonResult = {
  baseline: SimulationResult
  scenario: SimulationResult
  ebitdaDelta: number
  growthInvestment: number
  growthRoi: number | null
}

const finite = (value: number) => Number.isFinite(value) ? value : 0
const nonNegative = (value: number) => Math.max(0, finite(value))
const percentage = (value: number) => Math.min(100, nonNegative(value))
const safeDivide = (numerator: number, denominator: number) => denominator > 0 ? numerator / denominator : 0
const ratioOrNull = (numerator: number, denominator: number) => denominator > 0 ? numerator / denominator : null
const breakEvenFor = (fixedCosts: number, contributionRate: number) => contributionRate > 0 ? fixedCosts / contributionRate : null
const positiveDelta = (baseline: NumericInputs, scenario: NumericInputs, key: string) => nonNegative(nonNegative(scenario[key]) - nonNegative(baseline[key]))

function ecommerce(x: NumericInputs): SimulationResult {
  const adSpend = nonNegative(x.adSpend)
  const cpc = nonNegative(x.cpc)
  const paidConversion = percentage(x.paidConversion)
  const organicVisits = nonNegative(x.organicVisits)
  const organicConversion = percentage(x.organicConversion)
  const aov = nonNegative(x.aov)
  const returnRate = percentage(x.returnRate)
  const cogsRate = percentage(x.cogsRate)
  const commissionRate = percentage(x.commissionRate)
  const logisticsPerOrder = nonNegative(x.logisticsPerOrder)
  const paidVisits = safeDivide(adSpend, cpc)
  const paidOrders = paidVisits * paidConversion / 100
  const organicOrders = organicVisits * organicConversion / 100
  const netOrders = (paidOrders + organicOrders) * (1 - returnRate / 100)
  const revenue = netOrders * aov
  const paidRevenue = paidOrders * (1 - returnRate / 100) * aov
  const cogs = revenue * cogsRate / 100
  const commission = revenue * commissionRate / 100
  const logistics = netOrders * logisticsPerOrder
  const fixed = nonNegative(x.marketingOps) + nonNegative(x.payroll) + nonNegative(x.warehouse) + nonNegative(x.tech) + nonNegative(x.otherFixed)
  const expenses = cogs + commission + logistics + fixed + adSpend
  const contributionRate = safeDivide(revenue - cogs - commission - logistics, revenue)
  const breakEvenRevenue = breakEvenFor(fixed + adSpend, contributionRate)

  return {
    revenue, expenses, ebitda: revenue - expenses,
    ebitdaMargin: safeDivide(revenue - expenses, revenue) * 100,
    roas: ratioOrNull(paidRevenue, adSpend), breakEvenRevenue,
    volume: netOrders, volumeLabel: 'Net sipariş',
    secondary: [
      {label: 'Ücretli trafik', value: paidVisits, format: 'number'},
      {label: 'Katkı marjı', value: contributionRate * 100, format: 'percent'},
    ],
    breakdown: [
      {label: 'Ürün maliyeti', value: cogs}, {label: 'Komisyonlar', value: commission},
      {label: 'Lojistik', value: logistics}, {label: 'Reklam harcaması', value: adSpend},
      {label: 'Sabit operasyon giderleri', value: fixed},
    ],
    warnings: [
      ...(returnRate > 15 ? ['İade oranı kârlılığı belirgin biçimde baskılıyor.'] : []),
      ...(breakEvenRevenue === null ? ['Pozitif birim katkısı oluşmadığı için operasyonel başabaş mümkün değil.'] : []),
      ...(breakEvenRevenue !== null && revenue < breakEvenRevenue ? ['Ciro, operasyonel başabaş seviyesinin altında.'] : []),
    ],
  }
}

function b2b(x: NumericInputs): SimulationResult {
  const marketingSpend = nonNegative(x.marketingSpend)
  const cpl = nonNegative(x.cpl)
  const nonPaidLeads = nonNegative(x.nonPaidLeads)
  const qualificationRate = percentage(x.qualificationRate)
  const proposalRate = percentage(x.proposalRate)
  const winRate = percentage(x.winRate)
  const averageDeal = nonNegative(x.averageDeal)
  const deliveryCapacity = nonNegative(x.deliveryCapacity)
  const revenueRecognitionRate = percentage(x.revenueRecognitionRate)
  const existingRevenue = nonNegative(x.existingRevenue)
  const deliveryCostRate = percentage(x.deliveryCostRate)
  const salesCommissionRate = percentage(x.salesCommissionRate)
  const paidLeads = safeDivide(marketingSpend, cpl)
  const leads = paidLeads + nonPaidLeads
  const qualified = leads * qualificationRate / 100
  const proposals = qualified * proposalRate / 100
  const expectedWins = proposals * winRate / 100
  const deliveredWins = Math.min(expectedWins, deliveryCapacity)
  const backlog = nonNegative(expectedWins - deliveredWins)
  const newRecognizedRevenue = deliveredWins * averageDeal * revenueRecognitionRate / 100
  const revenue = existingRevenue + newRecognizedRevenue
  const paidExpectedWins = paidLeads * qualificationRate / 100 * proposalRate / 100 * winRate / 100
  const deliveredShare = safeDivide(deliveredWins, expectedWins)
  const attributedRevenue = paidExpectedWins * deliveredShare * averageDeal * revenueRecognitionRate / 100
  const deliveryCost = revenue * deliveryCostRate / 100
  const salesCommission = newRecognizedRevenue * salesCommissionRate / 100
  const fixed = nonNegative(x.salesPayroll) + nonNegative(x.deliveryPayroll) + nonNegative(x.marketingOps) + nonNegative(x.tech) + nonNegative(x.otherFixed)
  const expenses = deliveryCost + salesCommission + fixed + marketingSpend
  const contributionRate = safeDivide(revenue - deliveryCost - salesCommission, revenue)
  const breakEvenRevenue = breakEvenFor(fixed + marketingSpend, contributionRate)

  return {
    revenue, expenses, ebitda: revenue - expenses,
    ebitdaMargin: safeDivide(revenue - expenses, revenue) * 100,
    roas: ratioOrNull(attributedRevenue, marketingSpend), breakEvenRevenue,
    volume: deliveredWins, volumeLabel: 'Teslim edilebilir iş',
    secondary: [
      {label: 'Toplam lead', value: leads, format: 'number'},
      {label: 'Kapasite üstü backlog', value: backlog, format: 'number'},
      {label: 'Yeni muhasebeleşen gelir', value: newRecognizedRevenue, format: 'currency'},
      {label: 'Mevcut müşteri geliri', value: existingRevenue, format: 'currency'},
      {label: 'Satış döngüsü', value: nonNegative(x.salesCycleMonths), format: 'months'},
    ],
    breakdown: [
      {label: 'Teslimat maliyeti', value: deliveryCost}, {label: 'Satış komisyonu', value: salesCommission},
      {label: 'Pazarlama harcaması', value: marketingSpend},
      {label: 'Satış ve teslimat ekipleri', value: nonNegative(x.salesPayroll) + nonNegative(x.deliveryPayroll)},
      {label: 'Diğer sabit giderler', value: nonNegative(x.marketingOps) + nonNegative(x.tech) + nonNegative(x.otherFixed)},
    ],
    warnings: [
      ...(backlog > 0 ? [`Talep kapasiteyi ${backlog.toFixed(1)} iş aşıyor; gelir aynı dönemde gerçekleşemiyor.`] : []),
      ...(breakEvenRevenue === null ? ['Pozitif birim katkısı oluşmadığı için operasyonel başabaş mümkün değil.'] : []),
      ...(breakEvenRevenue !== null && revenue < breakEvenRevenue ? ['Tanınan gelir operasyonel başabaş seviyesinin altında.'] : []),
    ],
  }
}

function retail(x: NumericInputs): SimulationResult {
  const storeCount = nonNegative(x.storeCount)
  const footfallPerStore = nonNegative(x.footfallPerStore)
  const conversionRate = percentage(x.conversionRate)
  const stockAvailability = percentage(x.stockAvailability)
  const returnRate = percentage(x.returnRate)
  const aov = nonNegative(x.aov)
  const marketingSpend = nonNegative(x.marketingSpend)
  const visits = storeCount * footfallPerStore
  const demandTransactions = visits * conversionRate / 100
  const fulfilled = demandTransactions * stockAvailability / 100
  const netTransactions = fulfilled * (1 - returnRate / 100)
  const revenue = netTransactions * aov
  const lostRevenue = demandTransactions * (1 - stockAvailability / 100) * (1 - returnRate / 100) * aov
  const attributedRevenue = Math.min(nonNegative(x.attributedVisits), visits) * percentage(x.attributedConversion) / 100 * stockAvailability / 100 * (1 - returnRate / 100) * aov
  const cogs = revenue * percentage(x.cogsRate) / 100
  const shrinkage = revenue * percentage(x.shrinkageRate) / 100
  const commissions = revenue * percentage(x.commissionRate) / 100
  const transactionOps = netTransactions * nonNegative(x.transactionCost)
  const storeFixed = storeCount * (nonNegative(x.rentPerStore) + nonNegative(x.staffPerStore) + nonNegative(x.utilitiesPerStore) + nonNegative(x.otherStoreCost))
  const centralFixed = nonNegative(x.centralPayroll) + nonNegative(x.marketingOps) + nonNegative(x.tech) + nonNegative(x.otherCentral)
  const expenses = cogs + shrinkage + commissions + transactionOps + storeFixed + centralFixed + marketingSpend
  const contributionRate = safeDivide(revenue - cogs - shrinkage - commissions - transactionOps, revenue)
  const breakEvenRevenue = breakEvenFor(storeFixed + centralFixed + marketingSpend, contributionRate)

  return {
    revenue, expenses, ebitda: revenue - expenses,
    ebitdaMargin: safeDivide(revenue - expenses, revenue) * 100,
    roas: ratioOrNull(attributedRevenue, marketingSpend), breakEvenRevenue,
    volume: netTransactions, volumeLabel: 'Net işlem',
    secondary: [
      {label: 'Mağaza başına ciro', value: safeDivide(revenue, storeCount), format: 'currency'},
      {label: 'Stoksuzluk kaynaklı kayıp', value: lostRevenue, format: 'currency'},
      {label: 'Mağaza başına başabaş', value: breakEvenRevenue === null || storeCount === 0 ? null : breakEvenRevenue / storeCount, format: 'currency'},
    ],
    breakdown: [
      {label: 'Ürün maliyeti', value: cogs}, {label: 'Kayıp ve fire', value: shrinkage},
      {label: 'Mağaza sabit giderleri', value: storeFixed}, {label: 'Merkez giderleri', value: centralFixed},
      {label: 'Pazarlama harcaması', value: marketingSpend},
    ],
    warnings: [
      ...(stockAvailability < 90 ? ['Stok bulunabilirliği satış potansiyelini belirgin biçimde sınırlıyor.'] : []),
      ...(breakEvenRevenue === null ? ['Pozitif birim katkısı oluşmadığı için operasyonel başabaş mümkün değil.'] : []),
      ...(breakEvenRevenue !== null && revenue < breakEvenRevenue ? ['Toplam ciro mağaza ağının başabaş seviyesinin altında.'] : []),
    ],
  }
}

function realEstate(x: NumericInputs): SimulationResult {
  const sellableArea = nonNegative(x.sellableArea)
  const pricePerSqm = nonNegative(x.pricePerSqm)
  const discountRate = percentage(x.discountRate)
  const netPriceFactor = 1 - discountRate / 100
  const constructionCostPerSqm = nonNegative(x.constructionCostPerSqm)
  const marketingSpend = nonNegative(x.marketingSpend)
  const financeCost = nonNegative(x.financeCost)
  const revenue = sellableArea * pricePerSqm * netPriceFactor
  const construction = sellableArea * constructionCostPerSqm
  const contingency = construction * percentage(x.contingencyRate) / 100
  const commission = revenue * percentage(x.salesCommissionRate) / 100
  const expenses = nonNegative(x.landCost) + construction + contingency + nonNegative(x.softCosts) + marketingSpend + commission + nonNegative(x.overhead) + nonNegative(x.growthInitiative)
  const ebitda = revenue - expenses
  const totalCost = expenses + financeCost
  const pretaxProfit = ebitda - financeCost
  const breakEvenPrice = sellableArea > 0 && netPriceFactor > 0 ? totalCost / (sellableArea * netPriceFactor) : null
  const breakEvenSalesRate = safeDivide(totalCost, revenue) * 100

  return {
    revenue, expenses, ebitda,
    ebitdaMargin: safeDivide(ebitda, revenue) * 100,
    roas: ratioOrNull(nonNegative(x.marketingAttributedRevenue), marketingSpend),
    breakEvenRevenue: totalCost,
    volume: sellableArea, volumeLabel: 'Satılabilir m²',
    secondary: [
      {label: 'Vergi öncesi kâr', value: pretaxProfit, format: 'currency'},
      {label: 'Başabaş satış fiyatı / m²', value: breakEvenPrice, format: 'currency'},
      {label: 'Başabaş stok satış oranı', value: breakEvenSalesRate, format: 'percent'},
    ],
    breakdown: [
      {label: 'Arsa maliyeti', value: nonNegative(x.landCost)}, {label: 'İnşaat maliyeti', value: construction},
      {label: 'Beklenmeyen gider payı', value: contingency}, {label: 'Proje ve ruhsat giderleri', value: nonNegative(x.softCosts)},
      {label: 'Pazarlama ve satış', value: marketingSpend + commission}, {label: 'Genel yönetim', value: nonNegative(x.overhead) + nonNegative(x.growthInitiative)},
      {label: 'Finansman maliyeti (EBITDA dışı)', value: financeCost},
    ],
    warnings: [
      ...(breakEvenSalesRate > 85 ? ['Projenin başabaşa ulaşması için stokun çok yüksek bir bölümünün satılması gerekiyor.'] : []),
      ...(pretaxProfit < 0 ? ['Finansman maliyeti sonrasında proje zarar üretiyor.'] : []),
    ],
  }
}

const engines: Record<SectorId, (inputs: NumericInputs) => SimulationResult> = {ecommerce, b2b, retail, realEstate}

export function calculateScenario(sector: SectorId, inputs: NumericInputs) {
  return engines[sector](inputs)
}

export function compareScenarios(sector: SectorId, baselineInputs: NumericInputs, scenarioInputs: NumericInputs): ComparisonResult {
  const baseline = calculateScenario(sector, baselineInputs)
  const scenario = calculateScenario(sector, scenarioInputs)
  const ebitdaDelta = scenario.ebitda - baseline.ebitda
  let growthInvestment = 0

  if (sector === 'ecommerce') {
    growthInvestment = ['adSpend', 'marketingOps', 'payroll', 'warehouse', 'tech', 'otherFixed'].reduce((sum, key) => sum + positiveDelta(baselineInputs, scenarioInputs, key), 0)
  }
  if (sector === 'b2b') {
    growthInvestment = ['marketingSpend', 'salesPayroll', 'deliveryPayroll', 'marketingOps', 'tech', 'otherFixed', 'growthInvestment'].reduce((sum, key) => sum + positiveDelta(baselineInputs, scenarioInputs, key), 0)
  }
  if (sector === 'retail') {
    const baselineStoreFixed = nonNegative(baselineInputs.storeCount) * (nonNegative(baselineInputs.rentPerStore) + nonNegative(baselineInputs.staffPerStore) + nonNegative(baselineInputs.utilitiesPerStore) + nonNegative(baselineInputs.otherStoreCost))
    const scenarioStoreFixed = nonNegative(scenarioInputs.storeCount) * (nonNegative(scenarioInputs.rentPerStore) + nonNegative(scenarioInputs.staffPerStore) + nonNegative(scenarioInputs.utilitiesPerStore) + nonNegative(scenarioInputs.otherStoreCost))
    const newStoreCapex = nonNegative(nonNegative(scenarioInputs.storeCount) - nonNegative(baselineInputs.storeCount)) * nonNegative(scenarioInputs.newStoreCapex)
    growthInvestment = newStoreCapex + nonNegative(scenarioStoreFixed - baselineStoreFixed) + ['marketingSpend', 'centralPayroll', 'marketingOps', 'tech', 'otherCentral'].reduce((sum, key) => sum + positiveDelta(baselineInputs, scenarioInputs, key), 0)
  }
  if (sector === 'realEstate') {
    growthInvestment = ['marketingSpend', 'growthInitiative', 'overhead', 'softCosts'].reduce((sum, key) => sum + positiveDelta(baselineInputs, scenarioInputs, key), 0)
  }

  return {baseline, scenario, ebitdaDelta, growthInvestment, growthRoi: growthInvestment > 0 ? ebitdaDelta / growthInvestment * 100 : null}
}
