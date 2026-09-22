export type SectorId = 'ecommerce' | 'b2b' | 'retail' | 'realEstate'

export type NumericInputs = Record<string, number>

export type SimulationResult = {
  revenue: number
  expenses: number
  ebitda: number
  ebitdaMargin: number
  roas: number | null
  breakEvenRevenue: number
  volume: number
  volumeLabel: string
  secondary: Array<{label: string; value: number; format: 'currency' | 'number' | 'percent' | 'months'}>
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

const safeDivide = (numerator: number, denominator: number) => denominator > 0 ? numerator / denominator : 0
const nonNegative = (value: number) => Math.max(0, value)

function ecommerce(x: NumericInputs): SimulationResult {
  const paidVisits = safeDivide(x.adSpend, x.cpc)
  const paidOrders = paidVisits * x.paidConversion / 100
  const organicOrders = x.organicVisits * x.organicConversion / 100
  const netOrders = (paidOrders + organicOrders) * (1 - x.returnRate / 100)
  const revenue = netOrders * x.aov
  const paidRevenue = paidOrders * (1 - x.returnRate / 100) * x.aov
  const cogs = revenue * x.cogsRate / 100
  const commission = revenue * x.commissionRate / 100
  const logistics = netOrders * x.logisticsPerOrder
  const fixed = x.marketingOps + x.payroll + x.warehouse + x.tech + x.otherFixed
  const expenses = cogs + commission + logistics + fixed + x.adSpend
  const contributionRate = safeDivide(revenue - cogs - commission - logistics, revenue)
  const breakEvenRevenue = safeDivide(fixed + x.adSpend, contributionRate)

  return {
    revenue, expenses, ebitda: revenue - expenses,
    ebitdaMargin: safeDivide(revenue - expenses, revenue) * 100,
    roas: safeDivide(paidRevenue, x.adSpend), breakEvenRevenue,
    volume: netOrders, volumeLabel: 'Net sipariş',
    secondary: [
      {label: 'Ücretli trafik', value: paidVisits, format: 'number'},
      {label: 'Katkı marjı', value: contributionRate * 100, format: 'percent'},
    ],
    breakdown: [
      {label: 'Ürün maliyeti', value: cogs}, {label: 'Komisyonlar', value: commission},
      {label: 'Lojistik', value: logistics}, {label: 'Reklam harcaması', value: x.adSpend},
      {label: 'Sabit operasyon giderleri', value: fixed},
    ],
    warnings: [
      ...(x.returnRate > 15 ? ['İade oranı kârlılığı belirgin biçimde baskılıyor.'] : []),
      ...(revenue < breakEvenRevenue ? ['Ciro, operasyonel başabaş seviyesinin altında.'] : []),
    ],
  }
}

function b2b(x: NumericInputs): SimulationResult {
  const paidLeads = safeDivide(x.marketingSpend, x.cpl)
  const leads = paidLeads + x.nonPaidLeads
  const qualified = leads * x.qualificationRate / 100
  const proposals = qualified * x.proposalRate / 100
  const expectedWins = proposals * x.winRate / 100
  const recognizedWins = Math.min(expectedWins, x.deliveryCapacity)
  const backlog = nonNegative(expectedWins - recognizedWins)
  const revenue = recognizedWins * x.averageDeal
  const attributedRevenue = Math.min(paidLeads * x.qualificationRate / 100 * x.proposalRate / 100 * x.winRate / 100, x.deliveryCapacity) * x.averageDeal
  const deliveryCost = revenue * x.deliveryCostRate / 100
  const fixed = x.salesPayroll + x.deliveryPayroll + x.marketingOps + x.tech + x.otherFixed
  const expenses = deliveryCost + fixed + x.marketingSpend
  const contributionRate = 1 - x.deliveryCostRate / 100
  const breakEvenRevenue = safeDivide(fixed + x.marketingSpend, contributionRate)

  return {
    revenue, expenses, ebitda: revenue - expenses,
    ebitdaMargin: safeDivide(revenue - expenses, revenue) * 100,
    roas: safeDivide(attributedRevenue, x.marketingSpend), breakEvenRevenue,
    volume: recognizedWins, volumeLabel: 'Kazanılan iş',
    secondary: [
      {label: 'Toplam lead', value: leads, format: 'number'},
      {label: 'Kapasite üstü backlog', value: backlog, format: 'number'},
      {label: 'Satış döngüsü', value: x.salesCycleMonths, format: 'months'},
    ],
    breakdown: [
      {label: 'Teslimat maliyeti', value: deliveryCost}, {label: 'Pazarlama harcaması', value: x.marketingSpend},
      {label: 'Satış ve teslimat ekipleri', value: x.salesPayroll + x.deliveryPayroll},
      {label: 'Diğer sabit giderler', value: x.marketingOps + x.tech + x.otherFixed},
    ],
    warnings: [
      ...(backlog > 0 ? [`Talep kapasiteyi ${backlog.toFixed(1)} iş aşıyor; gelir aynı dönemde gerçekleşemiyor.`] : []),
      ...(revenue < breakEvenRevenue ? ['Tanınan gelir operasyonel başabaş seviyesinin altında.'] : []),
    ],
  }
}

function retail(x: NumericInputs): SimulationResult {
  const visits = x.storeCount * x.footfallPerStore
  const demandTransactions = visits * x.conversionRate / 100
  const fulfilled = demandTransactions * x.stockAvailability / 100
  const netTransactions = fulfilled * (1 - x.returnRate / 100)
  const revenue = netTransactions * x.aov
  const lostRevenue = demandTransactions * (1 - x.stockAvailability / 100) * (1 - x.returnRate / 100) * x.aov
  const attributedRevenue = Math.min(x.attributedVisits, visits) * x.attributedConversion / 100 * x.stockAvailability / 100 * (1 - x.returnRate / 100) * x.aov
  const cogs = revenue * x.cogsRate / 100
  const shrinkage = revenue * x.shrinkageRate / 100
  const commissions = revenue * x.commissionRate / 100
  const transactionOps = netTransactions * x.transactionCost
  const storeFixed = x.storeCount * (x.rentPerStore + x.staffPerStore + x.utilitiesPerStore + x.otherStoreCost)
  const centralFixed = x.centralPayroll + x.marketingOps + x.tech + x.otherCentral
  const expenses = cogs + shrinkage + commissions + transactionOps + storeFixed + centralFixed + x.marketingSpend
  const contributionRate = safeDivide(revenue - cogs - shrinkage - commissions - transactionOps, revenue)
  const breakEvenRevenue = safeDivide(storeFixed + centralFixed + x.marketingSpend, contributionRate)

  return {
    revenue, expenses, ebitda: revenue - expenses,
    ebitdaMargin: safeDivide(revenue - expenses, revenue) * 100,
    roas: safeDivide(attributedRevenue, x.marketingSpend), breakEvenRevenue,
    volume: netTransactions, volumeLabel: 'Net işlem',
    secondary: [
      {label: 'Mağaza başına ciro', value: safeDivide(revenue, x.storeCount), format: 'currency'},
      {label: 'Stoksuzluk kaynaklı kayıp', value: lostRevenue, format: 'currency'},
      {label: 'Mağaza başına başabaş', value: safeDivide(breakEvenRevenue, x.storeCount), format: 'currency'},
    ],
    breakdown: [
      {label: 'Ürün maliyeti', value: cogs}, {label: 'Kayıp ve fire', value: shrinkage},
      {label: 'Mağaza sabit giderleri', value: storeFixed}, {label: 'Merkez giderleri', value: centralFixed},
      {label: 'Pazarlama harcaması', value: x.marketingSpend},
    ],
    warnings: [
      ...(x.stockAvailability < 90 ? ['Stok bulunabilirliği satış potansiyelini belirgin biçimde sınırlıyor.'] : []),
      ...(revenue < breakEvenRevenue ? ['Toplam ciro mağaza ağının başabaş seviyesinin altında.'] : []),
    ],
  }
}

function realEstate(x: NumericInputs): SimulationResult {
  const revenue = x.sellableArea * x.pricePerSqm * (1 - x.discountRate / 100)
  const construction = x.sellableArea * x.constructionCostPerSqm
  const contingency = construction * x.contingencyRate / 100
  const commission = revenue * x.salesCommissionRate / 100
  const expenses = x.landCost + construction + contingency + x.softCosts + x.marketingSpend + commission + x.overhead + x.growthInitiative
  const ebitda = revenue - expenses
  const totalCost = expenses + x.financeCost
  const pretaxProfit = ebitda - x.financeCost
  const breakEvenPrice = safeDivide(totalCost, x.sellableArea)
  const breakEvenSalesRate = safeDivide(totalCost, revenue) * 100

  return {
    revenue, expenses, ebitda,
    ebitdaMargin: safeDivide(ebitda, revenue) * 100,
    roas: safeDivide(x.marketingAttributedRevenue, x.marketingSpend),
    breakEvenRevenue: totalCost,
    volume: x.sellableArea, volumeLabel: 'Satılabilir m²',
    secondary: [
      {label: 'Vergi öncesi kâr', value: pretaxProfit, format: 'currency'},
      {label: 'Başabaş satış fiyatı / m²', value: breakEvenPrice, format: 'currency'},
      {label: 'Başabaş stok satış oranı', value: breakEvenSalesRate, format: 'percent'},
    ],
    breakdown: [
      {label: 'Arsa maliyeti', value: x.landCost}, {label: 'İnşaat maliyeti', value: construction},
      {label: 'Beklenmeyen gider payı', value: contingency}, {label: 'Proje ve ruhsat giderleri', value: x.softCosts},
      {label: 'Pazarlama ve satış', value: x.marketingSpend + commission}, {label: 'Genel yönetim', value: x.overhead + x.growthInitiative},
      {label: 'Finansman maliyeti (EBITDA dışı)', value: x.financeCost},
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

  if (sector === 'ecommerce') growthInvestment = nonNegative(scenarioInputs.adSpend - baselineInputs.adSpend) + nonNegative(scenarioInputs.marketingOps - baselineInputs.marketingOps)
  if (sector === 'b2b') growthInvestment = nonNegative(scenarioInputs.marketingSpend - baselineInputs.marketingSpend) + nonNegative(scenarioInputs.marketingOps - baselineInputs.marketingOps)
  if (sector === 'retail') growthInvestment = nonNegative(scenarioInputs.marketingSpend - baselineInputs.marketingSpend) + nonNegative(scenarioInputs.marketingOps - baselineInputs.marketingOps) + nonNegative(scenarioInputs.storeCount - baselineInputs.storeCount) * scenarioInputs.newStoreCapex
  if (sector === 'realEstate') growthInvestment = nonNegative(scenarioInputs.marketingSpend - baselineInputs.marketingSpend) + nonNegative(scenarioInputs.growthInitiative - baselineInputs.growthInitiative)

  return {baseline, scenario, ebitdaDelta, growthInvestment, growthRoi: growthInvestment > 0 ? ebitdaDelta / growthInvestment * 100 : null}
}
