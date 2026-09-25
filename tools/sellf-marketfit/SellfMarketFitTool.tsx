'use client'

import Link from 'next/link'
import {useEffect, useMemo, useRef, useState} from 'react'
import {assessMarketFit, buildPriceStrategies, calculatePrice, calculateSalesPlan, defaultCosts, derivePositioning, normalizeMarketPrice} from './engine'
import type {B2BModel, ChannelEconomics, CostInputs, Currency, MarketScanResult, Marketplace, SalesChannel, SalesTargetInputs, ScenarioInputs, StoreFormat} from './types'
import styles from './sellf-marketfit.module.css'
import {recordToolRun} from '../analytics'
import ToolReportDownload from '../ToolReportDownload'

type Props = {lang: 'tr' | 'en'}
type Mode = 'market' | 'planner'
type PlannerMode = 'price' | 'target'

const initialScenarios: ScenarioInputs[] = [
  {id: 'current', name: 'Mevcut', listPrice: 899, discountRate: 10, shippingCost: 42, commissionRate: 18, returnRate: 8, cac: 120, conversionRate: 2.2, unitsPerOrder: 1},
  {id: 'controlled', name: 'Kontrollü', listPrice: 949, discountRate: 5, shippingCost: 42, commissionRate: 15, returnRate: 6, cac: 110, conversionRate: 2.6, unitsPerOrder: 1},
  {id: 'aggressive', name: 'Agresif', listPrice: 999, discountRate: 15, shippingCost: 42, commissionRate: 18, returnRate: 10, cac: 145, conversionRate: 3, unitsPerOrder: 1.1},
]

const initialTarget: SalesTargetInputs = {targetType: 'revenue', targetValue: 1000000, existingCustomerShare: 20, repeatOrdersPerNewCustomer: .2, organicNewCustomerShare: 25, fixedPeriodCosts: 60000, cacRangeLow: 90, cacRangeHigh: 150}

const initialChannelEconomics: ChannelEconomics = {channel: 'marketplace', monthlyFixedCost: 0, expectedMonthlyUnits: 0, tradeMarginRate: 0, paymentTermDays: 0, annualFinancingRate: 0, minimumOrderUnits: 1}

const channelProfiles: Record<SalesChannel, {commission: number; payment: number; returns: number; discount: number; shipping: number; distribution: number; marketing: number; cac: number; conversion: number; units: number}> = {
  marketplace: {commission: 18, payment: 0, returns: 8, discount: 10, shipping: 42, distribution: 0, marketing: 90, cac: 120, conversion: 2.2, units: 1},
  'own-site': {commission: 0, payment: 3.2, returns: 6, discount: 5, shipping: 55, distribution: 0, marketing: 110, cac: 140, conversion: 2, units: 1},
  store: {commission: 0, payment: 2, returns: 3, discount: 5, shipping: 0, distribution: 4, marketing: 35, cac: 55, conversion: 24, units: 1.2},
  b2b: {commission: 0, payment: 0, returns: 2, discount: 0, shipping: 25, distribution: 18, marketing: 30, cac: 750, conversion: 14, units: 50},
}

const copy = {
  tr: {
    back: 'Tüm tool’lara dön', eyebrow: 'SELLF ENGAGE / SELLF MARKETFIT',
    title: 'Pazarın kabul ettiği fiyat ile kârlı fiyatınız kesişiyor mu?',
    intro: 'Pazar sinyallerini, birim ekonomiyi ve satış hedefini aynı karar sisteminde birleştirin.',
    market: 'Pazar konumlandırması', planner: 'Fiyat & satış planı', price: 'Doğru fiyatı bul', target: 'Satış hedefini planla',
    noAi: 'AI kullanmaz', noPaid: 'Ücretli API kullanmaz', evidence: 'Kanıtsız sonuç üretmez',
  },
  en: {
    back: 'Back to all tools', eyebrow: 'SELLF ENGAGE / SELLF MARKETFIT',
    title: 'Does the price your market accepts meet the price your margin requires?',
    intro: 'Combine market signals, unit economics and sales targets in one decision system.',
    market: 'Market positioning', planner: 'Pricing & sales plan', price: 'Find the right price', target: 'Plan a sales target',
    noAi: 'No AI', noPaid: 'No paid API', evidence: 'No claim without evidence',
  },
} as const

const labels = {
  production: ['Üretim / tedarik', 'Production / sourcing'], packaging: ['Ambalaj', 'Packaging'], inboundLogistics: ['Giriş lojistiği', 'Inbound logistics'],
  outboundLogistics: ['Müşteri lojistiği', 'Customer shipping'], distribution: ['Dağıtım', 'Distribution'], operations: ['Operasyon', 'Operations'],
  otherVariable: ['Diğer değişken maliyet', 'Other variable cost'], returnHandling: ['İade işlem maliyeti', 'Return handling'], marketingPerOrder: ['Sipariş başı pazarlama', 'Marketing per order'],
  vatRate: ['Vergi / KDV', 'Tax / VAT'], commissionRate: ['Kanal komisyonu', 'Channel commission'], paymentRate: ['Ödeme komisyonu', 'Payment fee'],
  returnRate: ['İade oranı', 'Return rate'], returnLossRate: ['İadede ürün kaybı', 'Product loss on return'], targetMargin: ['Hedef katkı marjı', 'Target contribution margin'], plannedDiscountRate: ['Planlanan indirim', 'Planned discount'],
} as const

const currencies: Record<Currency, {tr: string; en: string; locale: string}> = {
  TRY: {tr: '₺ Türk Lirası', en: '₺ Turkish Lira', locale: 'tr-TR'}, USD: {tr: '$ ABD Doları', en: '$ US Dollar', locale: 'en-US'},
  EUR: {tr: '€ Euro', en: '€ Euro', locale: 'de-DE'}, GBP: {tr: '£ Sterlin', en: '£ Pound Sterling', locale: 'en-GB'},
}

const roundToSingleDecimal = (value: number) => Math.round((value + Number.EPSILON) * 10) / 10

function Field({label, value, onChange, suffix, min = 0, step = 1}: {label: string; value: number; onChange: (value: number) => void; suffix?: string; min?: number; step?: number}) {
  return <label className={styles.field}><span>{label}</span><div><input type="number" min={min} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />{suffix && <i>{suffix}</i>}</div></label>
}

function Metric({label, value, note, tone}: {label: string; value: string; note?: string; tone?: 'good' | 'warn'}) {
  return <article className={`${styles.metric} ${tone === 'good' ? styles.good : tone === 'warn' ? styles.warn : ''}`}><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</article>
}

export default function SellfMarketFitTool({lang}: Props) {
  const t = copy[lang]
  const li = lang === 'tr' ? 0 : 1
  const [mode, setMode] = useState<Mode>('market')
  const [plannerMode, setPlannerMode] = useState<PlannerMode>('price')
  const [currency, setCurrency] = useState<Currency>('TRY')
  const [channel, setChannel] = useState<SalesChannel>('marketplace')
  const [marketplace, setMarketplace] = useState<Marketplace>('trendyol')
  const [storeFormat, setStoreFormat] = useState<StoreFormat>('own-store')
  const [b2bModel, setB2BModel] = useState<B2BModel>('wholesale')
  const [marketArea, setMarketArea] = useState('Türkiye')
  const [channelEconomics, setChannelEconomics] = useState<ChannelEconomics>(initialChannelEconomics)
  const [category, setCategory] = useState('Kişisel bakım')
  const [productType, setProductType] = useState('Yüz temizleme jeli')
  const [productUrl, setProductUrl] = useState('')
  const [ownPackageQuantity, setOwnPackageQuantity] = useState(1)
  const [ownUnitAmount, setOwnUnitAmount] = useState(1)
  const [ownUnitLabel, setOwnUnitLabel] = useState('adet')
  const [competitorUrls, setCompetitorUrls] = useState('')
  const [manualEvidence, setManualEvidence] = useState('Doğal yüz temizleme jeli | 699 | 799 | 4.6 | 820 | evet\nHassas cilt yüz yıkama jeli | 749 | 899 | 4.4 | 410 | evet\nNiacinamide arındırıcı temizleme jeli | 829 | 829 | 4.7 | 1260 | evet\nDermatolojik yüz temizleme jeli | 899 | 999 | 4.5 | 260 | hayır\nNemlendirici günlük temizleme jeli | 949 | 1099 | 4.8 | 640 | evet')
  const [marketResult, setMarketResult] = useState<MarketScanResult | null>(null)
  const [marketLoading, setMarketLoading] = useState(false)
  const [marketError, setMarketError] = useState('')
  const [costs, setCosts] = useState<CostInputs>(defaultCosts)
  const [target, setTarget] = useState<SalesTargetInputs>(initialTarget)
  const [scenarios, setScenarios] = useState<ScenarioInputs[]>(initialScenarios)
  const [activeScenario, setActiveScenario] = useState(0)

  const formatMoney = (value: number | null) => value === null || !Number.isFinite(value) ? '—' : new Intl.NumberFormat(currencies[currency].locale, {style: 'currency', currency, maximumFractionDigits: 0}).format(value)
  const formatNumber = (value: number | null) => value === null || !Number.isFinite(value) ? '—' : new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : 'en-US', {maximumFractionDigits: 1}).format(value)
  const active = scenarios[activeScenario]
  const economics = useMemo(() => ({...channelEconomics, channel}), [channelEconomics, channel])
  const priceResult = useMemo(() => calculatePrice(costs, active.listPrice, active, economics), [costs, active, economics])
  const planResults = useMemo(() => scenarios.map((scenario) => calculateSalesPlan(costs, target, scenario, economics)), [costs, target, scenarios, economics])
  const priceStrategies = useMemo(() => buildPriceStrategies(costs, economics), [costs, economics])
  const sensitivity = useMemo(() => [-10, 0, 10].map((costChange) => ({costChange, prices: [-5, 0, 5].map((marginChange) => {
    const factor = 1 + costChange / 100
    const adjusted = {...costs, production: costs.production * factor, packaging: costs.packaging * factor, inboundLogistics: costs.inboundLogistics * factor, outboundLogistics: costs.outboundLogistics * factor, distribution: costs.distribution * factor, operations: costs.operations * factor, otherVariable: costs.otherVariable * factor, returnHandling: costs.returnHandling * factor, marketingPerOrder: costs.marketingPerOrder * factor, targetMargin: Math.max(0, Math.min(95, costs.targetMargin + marginChange))}
    return calculatePrice(adjusted, undefined, undefined, economics).targetSalePrice
  })})), [costs, economics])
  const ownComparisonUnit = ['g', 'gr', 'gram', 'kg'].includes(ownUnitLabel) ? '100 g' : ['ml', 'l', 'lt'].includes(ownUnitLabel) ? '100 ml' : 'adet'
  const comparableTargetPrice = marketResult?.summary.comparisonUnit === ownComparisonUnit ? normalizeMarketPrice(priceResult.targetSalePrice, ownUnitAmount, ownUnitLabel, ownPackageQuantity) : null
  const marketFit = marketResult ? assessMarketFit(marketResult.summary, priceResult, comparableTargetPrice) : null
  const positioning = marketResult ? derivePositioning(marketResult.evidence, marketResult.summary, comparableTargetPrice, channel, lang) : null
  const plannerSignatureRef = useRef('')

  useEffect(() => {
    if (mode !== 'planner') return
    const input = {
      plannerMode,
      currency,
      channel,
      marketplace,
      storeFormat,
      b2bModel,
      channelEconomics: economics,
      costs,
      target: plannerMode === 'target' ? target : undefined,
      scenarios,
      activeScenario,
    }
    const signature = JSON.stringify(input)
    if (signature === plannerSignatureRef.current) return
    const timer = window.setTimeout(() => {
      plannerSignatureRef.current = signature
      recordToolRun({
        tool: 'sellf-marketfit',
        language: lang,
        input: {mode: 'planner', ...input},
        result: {
          price: priceResult,
          salesPlans: plannerMode === 'target' ? planResults : [],
          priceStrategies,
        },
      })
    }, 1800)
    return () => window.clearTimeout(timer)
  }, [mode, plannerMode, currency, channel, marketplace, storeFormat, b2bModel, economics, costs, target, scenarios, activeScenario, priceResult, planResults, priceStrategies, lang])

  function updateCost(key: keyof CostInputs, value: number) { setCosts((current) => ({...current, [key]: value})) }
  function updateTarget(key: keyof SalesTargetInputs, value: number | string) { setTarget((current) => ({...current, [key]: value})) }
  function updateScenario(index: number, key: keyof ScenarioInputs, value: number | string) { setScenarios((current) => current.map((scenario, scenarioIndex) => scenarioIndex === index ? {...scenario, [key]: value} : scenario)) }
  function updateEconomics(key: keyof ChannelEconomics, value: number) { setChannelEconomics((current) => ({...current, [key]: value})) }

  function changeChannel(next: SalesChannel) {
    setChannel(next)
    setChannelEconomics((current) => ({...current, channel: next}))
    setMarketResult(null)
    applyChannelProfile(next)
  }

  function applyChannelProfile(selected: SalesChannel = channel) {
    const profile = channelProfiles[selected]
    setCosts((current) => ({...current, commissionRate: profile.commission, paymentRate: profile.payment, returnRate: profile.returns, plannedDiscountRate: profile.discount, outboundLogistics: profile.shipping, distribution: profile.distribution, marketingPerOrder: profile.marketing}))
    setScenarios((current) => current.map((scenario, index) => ({...scenario, shippingCost: profile.shipping, commissionRate: profile.commission, returnRate: profile.returns, discountRate: Math.max(0, profile.discount + (index === 1 ? -3 : index === 2 ? 5 : 0)), cac: profile.cac * (index === 1 ? .9 : index === 2 ? 1.2 : 1), conversionRate: roundToSingleDecimal(profile.conversion * (index === 1 ? 1.15 : index === 2 ? 1.3 : 1)), unitsPerOrder: profile.units})))
    if (selected === 'store') setChannelEconomics((current) => ({...current, channel: selected, monthlyFixedCost: current.monthlyFixedCost || 250000, expectedMonthlyUnits: current.expectedMonthlyUnits || 1000, tradeMarginRate: 0, paymentTermDays: 0, annualFinancingRate: 0, minimumOrderUnits: 1}))
    if (selected === 'b2b') setChannelEconomics((current) => ({...current, channel: selected, monthlyFixedCost: 0, expectedMonthlyUnits: 0, tradeMarginRate: current.tradeMarginRate || 25, paymentTermDays: current.paymentTermDays || 60, annualFinancingRate: current.annualFinancingRate || 45, minimumOrderUnits: current.minimumOrderUnits <= 1 ? 50 : current.minimumOrderUnits}))
    if (selected === 'marketplace' || selected === 'own-site') setChannelEconomics({...initialChannelEconomics, channel: selected})
  }

  async function scan() {
    setMarketLoading(true); setMarketError('')
    try {
      const response = await fetch('/api/engage/marketfit', {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({category, productType, productUrl, competitorUrls: competitorUrls.split(/\r?\n/).map((item) => item.trim()).filter(Boolean), channel, marketplace, storeFormat, b2bModel, marketArea, currency, manualEvidence})})
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Analysis failed')
      const scanResult = data as MarketScanResult
      setMarketResult(scanResult)
      const comparisonUnit = ['g', 'gr', 'gram', 'kg'].includes(ownUnitLabel) ? '100 g' : ['ml', 'l', 'lt'].includes(ownUnitLabel) ? '100 ml' : 'adet'
      const targetComparisonPrice = scanResult.summary.comparisonUnit === comparisonUnit
        ? normalizeMarketPrice(priceResult.targetSalePrice, ownUnitAmount, ownUnitLabel, ownPackageQuantity)
        : null
      const fit = assessMarketFit(scanResult.summary, priceResult, targetComparisonPrice)
      recordToolRun({
        tool: 'sellf-marketfit',
        language: lang,
        input: {
          mode: 'market',
          category: category.slice(0, 160),
          productType: productType.slice(0, 160),
          productUrl: productUrl.slice(0, 2048),
          competitorUrls: competitorUrls.split(/\\r?\\n/).map((item) => item.trim().slice(0, 2048)).filter(Boolean).slice(0, 12),
          channel,
          marketplace,
          storeFormat,
          b2bModel,
          marketArea: marketArea.slice(0, 120),
          currency,
          ownPackageQuantity,
          ownUnitAmount,
          ownUnitLabel: ownUnitLabel.slice(0, 20),
          manualEvidenceRows: manualEvidence.split(/\\r?\\n/).filter((line) => line.trim()).length,
        },
        result: {
          summary: scanResult.summary,
          evidenceCount: scanResult.evidence.length,
          discovery: scanResult.discovery,
          fit,
          positioning: derivePositioning(scanResult.evidence, scanResult.summary, targetComparisonPrice, channel, lang),
        },
      })
    } catch (error) { setMarketError(error instanceof Error ? error.message : 'Analysis failed') }
    finally { setMarketLoading(false) }
  }

  const channels: Array<[SalesChannel, string, string]> = [
    ['marketplace', 'Dijital pazaryeri', 'Digital marketplace'], ['own-site', 'Kendi e-ticaret sitesi', 'Own ecommerce site'], ['store', 'Fiziksel mağazacılık', 'Physical retail'],
    ['b2b', 'B2B / toptan satış', 'B2B / wholesale'],
  ]

  return <main className={styles.page}>
    <section className={styles.hero}><div className={styles.orb} /><div className="sellf-container">
      <Link href={`/${lang}/engage/tools`} className={styles.back}>← {t.back}</Link><span className={styles.eyebrow}>{t.eyebrow}</span>
      <h1>{t.title}</h1><p>{t.intro}</p><div className={styles.badges}><span>✓ {t.noAi}</span><span>✓ {t.noPaid}</span><span>✓ {t.evidence}</span></div>
    </div></section>
    <section className={`sellf-container ${styles.workspace}`}>
      <nav className={styles.modeTabs}><button className={mode === 'market' ? styles.activeTab : ''} onClick={() => setMode('market')}>01 <b>{t.market}</b></button><button className={mode === 'planner' ? styles.activeTab : ''} onClick={() => setMode('planner')}>02 <b>{t.planner}</b></button></nav>

      {mode === 'market' ? <div className={styles.twoCol}>
        <div className={styles.panel}><div className={styles.panelHead}><span>01</span><div><h2>{t.market}</h2><p>{lang === 'tr' ? 'Ürün ve kanal bağlamını tanımlayın; motor yalnızca doğrulayabildiği fiyatları kullanır.' : 'Define the product and channel; the engine uses only prices it can verify.'}</p></div></div>
          <div className={styles.formGrid}><label className={styles.field}><span>{lang === 'tr' ? 'Ürün kategorisi' : 'Product category'}</span><div><input value={category} onChange={(e) => setCategory(e.target.value)} /></div></label><label className={styles.field}><span>{lang === 'tr' ? 'Ürün tipi' : 'Product type'}</span><div><input value={productType} onChange={(e) => setProductType(e.target.value)} /></div></label>
            <label className={styles.field}><span>{lang === 'tr' ? 'Para birimi' : 'Currency'}</span><div><select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>{Object.entries(currencies).map(([id, value]) => <option value={id} key={id}>{value[lang]}</option>)}</select></div></label><label className={styles.field}><span>{lang === 'tr' ? 'Satış kanalı' : 'Sales channel'}</span><div><select value={channel} onChange={(e) => changeChannel(e.target.value as SalesChannel)}>{channels.map(([id, tr, en]) => <option value={id} key={id}>{lang === 'tr' ? tr : en}</option>)}</select></div></label>
            {channel === 'marketplace' && <label className={styles.field}><span>{lang === 'tr' ? 'Pazaryeri' : 'Marketplace'}</span><div><select value={marketplace} onChange={(e) => setMarketplace(e.target.value as Marketplace)}><option value="trendyol">Trendyol</option><option value="hepsiburada">Hepsiburada</option><option value="amazon-tr">Amazon Türkiye</option><option value="n11">N11</option><option value="other">{lang === 'tr' ? 'Diğer' : 'Other'}</option></select></div></label>}
            {channel === 'store' && <><label className={styles.field}><span>{lang === 'tr' ? 'Mağaza formatı' : 'Store format'}</span><div><select value={storeFormat} onChange={(e) => setStoreFormat(e.target.value as StoreFormat)}><option value="own-store">{lang === 'tr' ? 'Kendi mağazası' : 'Own store'}</option><option value="chain">{lang === 'tr' ? 'Zincir mağaza' : 'Retail chain'}</option><option value="department-store">{lang === 'tr' ? 'Departman mağazası' : 'Department store'}</option><option value="pop-up">Pop-up</option></select></div></label><label className={styles.field}><span>{lang === 'tr' ? 'Pazar / bölge' : 'Market / region'}</span><div><input value={marketArea} onChange={(e) => setMarketArea(e.target.value)} /></div></label></>}
            {channel === 'b2b' && <><label className={styles.field}><span>{lang === 'tr' ? 'B2B modeli' : 'B2B model'}</span><div><select value={b2bModel} onChange={(e) => setB2BModel(e.target.value as B2BModel)}><option value="wholesale">{lang === 'tr' ? 'Toptan satış' : 'Wholesale'}</option><option value="distributor">{lang === 'tr' ? 'Distribütör' : 'Distributor'}</option><option value="dealer">{lang === 'tr' ? 'Bayi ağı' : 'Dealer network'}</option><option value="corporate">{lang === 'tr' ? 'Kurumsal satış' : 'Corporate sales'}</option></select></div></label><label className={styles.field}><span>{lang === 'tr' ? 'Pazar / bölge' : 'Market / region'}</span><div><input value={marketArea} onChange={(e) => setMarketArea(e.target.value)} /></div></label></>}
            <Field label={lang === 'tr' ? 'Paket içi ürün adedi' : 'Items per pack'} value={ownPackageQuantity} onChange={setOwnPackageQuantity} suffix={lang === 'tr' ? 'adet' : 'items'} />
            <label className={styles.field}><span>{lang === 'tr' ? 'Karşılaştırma birimi' : 'Comparison unit'}</span><div><select value={ownUnitLabel} onChange={(e) => setOwnUnitLabel(e.target.value)}><option value="adet">{lang === 'tr' ? 'Adet' : 'Item'}</option><option value="g">Gram</option><option value="kg">Kilogram</option><option value="ml">Mililitre</option><option value="l">Litre</option></select></div></label>
            <Field label={lang === 'tr' ? 'Her ürünün miktarı' : 'Amount per item'} value={ownUnitAmount} onChange={setOwnUnitAmount} suffix={ownUnitLabel} step={.1} />
            <label className={`${styles.field} ${styles.full}`}><span>{lang === 'tr' ? 'Kendi ürün linkiniz · isteğe bağlı' : 'Your product URL · optional'}</span><div><input type="url" placeholder="https://..." value={productUrl} onChange={(e) => setProductUrl(e.target.value)} /></div></label>
            <label className={`${styles.field} ${styles.full}`}><span>{lang === 'tr' ? 'Rakip ürün linkleri · her satıra bir URL' : 'Competitor product URLs · one per line'}</span><textarea rows={3} placeholder="https://..." value={competitorUrls} onChange={(e) => setCompetitorUrls(e.target.value)} /></label>
            <label className={`${styles.field} ${styles.full}`}><span>{channel === 'store' ? (lang === 'tr' ? 'Raf fiyatı kanıtları' : 'Shelf-price evidence') : channel === 'b2b' ? (lang === 'tr' ? 'Teklif / fiyat listesi kanıtları' : 'Quote / price-list evidence') : (lang === 'tr' ? 'Manuel pazar kanıtı' : 'Manual market evidence')}</span><textarea rows={6} value={manualEvidence} onChange={(e) => setManualEvidence(e.target.value)} /><small>{lang === 'tr' ? 'Format: Ürün | satış fiyatı | liste fiyatı | puan | yorum | ücretsiz kargo | paket adedi | birim miktarı | birim (g/ml/adet) | tarih (YYYY-AA-GG)' : 'Format: Product | sale price | list price | rating | reviews | free shipping | pack count | unit amount | unit (g/ml/item) | date (YYYY-MM-DD)'}</small></label>
          </div><button className={styles.primary} onClick={scan} disabled={marketLoading}>{marketLoading ? (lang === 'tr' ? 'Pazar taranıyor…' : 'Scanning market…') : (lang === 'tr' ? 'Pazarı analiz et →' : 'Analyze market →')}</button>{marketError && <p className={styles.error}>{marketError}</p>}
        </div>
        <aside className={`${styles.panel} ${styles.results}`}><div className={styles.panelHead}><span>02</span><div><h2>{lang === 'tr' ? 'Pazar kararı' : 'Market decision'}</h2><p>{marketResult?.discovery.note || (lang === 'tr' ? 'Sonuçlar tarama ve eklediğiniz kanıtlar üzerinden oluşur.' : 'Results are based on the scan and evidence you submit.')}</p></div></div>
          {!marketResult ? <div className={styles.empty}><i>↗</i><strong>{lang === 'tr' ? 'Henüz pazar kanıtı analiz edilmedi.' : 'No market evidence analyzed yet.'}</strong><p>{lang === 'tr' ? 'Örnek satırlar hazır. Analizi çalıştırarak fiyat koridorunu görün.' : 'Sample rows are ready. Run the analysis to see the price corridor.'}</p></div> : <>
            <div className={styles.confidence}><span>{lang === 'tr' ? 'Kanıt güveni' : 'Evidence confidence'}</span><strong>{marketResult.summary.confidenceScore}/100 · {marketResult.summary.confidence.toUpperCase()}</strong><small>{marketResult.summary.comparableCount}/{marketResult.summary.evidenceCount} {lang === 'tr' ? 'karşılaştırılabilir sinyal' : 'comparable signals'}{marketResult.summary.excludedCount ? ` · ${marketResult.summary.excludedCount} ${lang === 'tr' ? 'hariç' : 'excluded'}` : ''}</small><div>{marketResult.summary.confidenceReasons.map((reason) => <b key={reason}>{reason}</b>)}</div></div>
            <div className={styles.metrics}><Metric label={lang === 'tr' ? 'Gözlemlenen aralık' : 'Observed range'} value={`${formatMoney(marketResult.summary.minimum)} – ${formatMoney(marketResult.summary.maximum)}`} note={marketResult.summary.comparisonUnit ? `${lang === 'tr' ? 'Birim' : 'Unit'}: ${marketResult.summary.comparisonUnit}` : undefined} /><Metric label="Median" value={formatMoney(marketResult.summary.median)} note={marketResult.summary.comparisonUnit || undefined} /><Metric label={lang === 'tr' ? 'Önerilen koridor' : 'Suggested corridor'} value={`${formatMoney(marketResult.summary.suggestedLow)} – ${formatMoney(marketResult.summary.suggestedHigh)}`} tone="good" /><Metric label={lang === 'tr' ? 'İndirim kullanımı' : 'Discount prevalence'} value={marketResult.summary.discountPrevalence === null ? '—' : `%${formatNumber(marketResult.summary.discountPrevalence)}`} /></div>
            <div className={`${styles.decision} ${marketFit?.status === 'gap' ? styles.decisionWarn : ''}`}><span>{lang === 'tr' ? 'Pazar × kârlılık kesişimi' : 'Market × margin intersection'}</span><strong>{marketFit?.status === 'fit' ? (lang === 'tr' ? 'UYUMLU' : 'FIT') : marketFit?.status === 'gap' ? (lang === 'tr' ? 'FİYAT BOŞLUĞU' : 'PRICE GAP') : (lang === 'tr' ? 'DOĞRULAMA GEREKLİ' : 'NEEDS EVIDENCE')}</strong><p>{marketFit?.message}{comparableTargetPrice === null && marketResult.summary.comparisonUnit ? ` ${lang === 'tr' ? 'Kendi ürününüzün karşılaştırma birimini pazar kanıtlarıyla eşleştirin.' : 'Match your product comparison unit to the market evidence.'}` : ''}</p>{marketFit?.gap ? <b>{lang === 'tr' ? 'Koridor üzerindeki fark: ' : 'Gap above corridor: '}{formatMoney(marketFit.gap)} / {marketResult.summary.comparisonUnit}</b> : null}</div>
            {positioning && <div className={styles.positioning}><span>{lang === 'tr' ? 'Önerilen pazarlama konumu' : 'Suggested marketing position'}</span><h3>{positioning.territory}</h3><p>{positioning.recommendation}</p><small>{positioning.avoid}</small>{positioning.commonTerms.length > 0 && <div>{positioning.commonTerms.map((term) => <b key={term}>{term}</b>)}</div>}</div>}
            <div className={styles.evidenceList}>{marketResult.evidence.slice(0, 6).map((item, index) => <article key={`${item.title}-${index}`}><div><strong>{item.title}</strong><small>{item.source}</small></div><b>{formatMoney(item.price)}</b></article>)}</div>
          </>}
          <div className={styles.compete}><span>SELLF COMPETE</span><h3>{lang === 'tr' ? 'Rekabet analizini sürekli hale getirin.' : 'Turn competitive analysis into a continuous system.'}</h3><p>{lang === 'tr' ? 'Sürekli rakip takibi, kampanya değişimleri ve daha geniş ürün karşılaştırmaları için.' : 'For continuous competitor tracking, campaign changes and broader product comparisons.'}</p><a href="https://sellfcompete.com" target="_blank" rel="noreferrer">{lang === 'tr' ? 'SellfCompete’i incele →' : 'Explore SellfCompete →'}</a></div>
        </aside>
      </div> : <>
        <div className={styles.subTabs}><button className={plannerMode === 'price' ? styles.activeSub : ''} onClick={() => setPlannerMode('price')}>{t.price}</button><button className={plannerMode === 'target' ? styles.activeSub : ''} onClick={() => setPlannerMode('target')}>{t.target}</button></div>
        <section className={styles.channelBar}><div><span>{lang === 'tr' ? 'KANAL EKONOMİSİ' : 'CHANNEL ECONOMICS'}</span><h2>{channels.find(([id]) => id === channel)?.[lang === 'tr' ? 1 : 2]}</h2><p>{lang === 'tr' ? 'Kanal değiştiğinde düzenlenebilir örnek varsayımlar otomatik uygulanır; bu düğmeyle varsayılanlara dönebilirsiniz.' : 'Editable example assumptions are applied when the channel changes; use this button to reset them.'}</p></div><label><span>{lang === 'tr' ? 'Satış kanalı' : 'Sales channel'}</span><select value={channel} onChange={(e) => changeChannel(e.target.value as SalesChannel)}>{channels.map(([id, tr, en]) => <option value={id} key={id}>{lang === 'tr' ? tr : en}</option>)}</select></label><button onClick={() => applyChannelProfile()}>{lang === 'tr' ? 'Kanal varsayımlarını sıfırla' : 'Reset channel assumptions'}</button>
          {channel === 'store' && <div className={styles.channelFields}><Field label={lang === 'tr' ? 'Aylık mağaza sabit gideri' : 'Monthly store fixed cost'} value={channelEconomics.monthlyFixedCost} onChange={(value) => updateEconomics('monthlyFixedCost', value)} suffix={currency} /><Field label={lang === 'tr' ? 'Beklenen aylık satış adedi' : 'Expected monthly units'} value={channelEconomics.expectedMonthlyUnits} onChange={(value) => updateEconomics('expectedMonthlyUnits', value)} suffix={lang === 'tr' ? 'adet' : 'units'} /></div>}
          {channel === 'b2b' && <div className={styles.channelFields}><Field label={lang === 'tr' ? 'Alıcı / kanal marjı' : 'Buyer / channel margin'} value={channelEconomics.tradeMarginRate} onChange={(value) => updateEconomics('tradeMarginRate', value)} suffix="%" step={.5} /><Field label={lang === 'tr' ? 'Ödeme vadesi' : 'Payment term'} value={channelEconomics.paymentTermDays} onChange={(value) => updateEconomics('paymentTermDays', value)} suffix={lang === 'tr' ? 'gün' : 'days'} /><Field label={lang === 'tr' ? 'Yıllık finansman maliyeti' : 'Annual financing cost'} value={channelEconomics.annualFinancingRate} onChange={(value) => updateEconomics('annualFinancingRate', value)} suffix="%" step={.5} /><Field label={lang === 'tr' ? 'Minimum sipariş adedi' : 'Minimum order units'} value={channelEconomics.minimumOrderUnits} onChange={(value) => updateEconomics('minimumOrderUnits', value)} suffix={lang === 'tr' ? 'adet' : 'units'} /></div>}
        </section>
        <div className={styles.twoCol}>
          <div className={styles.panel}><div className={styles.panelHead}><span>01</span><div><h2>{plannerMode === 'price' ? t.price : t.target}</h2><p>{plannerMode === 'price' ? (lang === 'tr' ? 'Maliyetleri ve hedef marjı eksiksiz tanımlayın.' : 'Define costs and target margin completely.') : (lang === 'tr' ? 'Hedef hacmi ve müşteri ekonomisini tanımlayın.' : 'Define target volume and customer economics.')}</p></div></div>
            {plannerMode === 'price' ? <div className={styles.formGrid}>{(Object.keys(labels) as Array<keyof CostInputs>).map((key) => <Field key={key} label={labels[key][li]} value={costs[key]} onChange={(value) => updateCost(key, value)} suffix={key.endsWith('Rate') || key === 'targetMargin' ? '%' : currency} step={key.endsWith('Rate') || key === 'targetMargin' ? .5 : 1} />)}</div> : <div className={styles.formGrid}>
              <label className={styles.field}><span>{lang === 'tr' ? 'Hedef türü' : 'Target type'}</span><div><select value={target.targetType} onChange={(e) => updateTarget('targetType', e.target.value)}><option value="revenue">{lang === 'tr' ? 'Ciro' : 'Revenue'}</option><option value="units">{lang === 'tr' ? 'Net satış adedi' : 'Net units sold'}</option></select></div></label>
              <Field label={lang === 'tr' ? 'Hedef değer' : 'Target value'} value={target.targetValue} onChange={(v) => updateTarget('targetValue', v)} suffix={target.targetType === 'revenue' ? currency : lang === 'tr' ? 'adet' : 'units'} />
              <Field label={lang === 'tr' ? 'Mevcut müşteri payı' : 'Existing customer share'} value={target.existingCustomerShare} onChange={(v) => updateTarget('existingCustomerShare', v)} suffix="%" step={.5} />
              <Field label={lang === 'tr' ? 'Yeni müşteri tekrar siparişi' : 'Repeat orders per new customer'} value={target.repeatOrdersPerNewCustomer} onChange={(v) => updateTarget('repeatOrdersPerNewCustomer', v)} step={.1} />
              <Field label={lang === 'tr' ? 'Organik yeni müşteri payı' : 'Organic new-customer share'} value={target.organicNewCustomerShare} onChange={(v) => updateTarget('organicNewCustomerShare', v)} suffix="%" step={.5} />
              <Field label={lang === 'tr' ? 'Dönemsel sabit gider' : 'Fixed period costs'} value={target.fixedPeriodCosts} onChange={(v) => updateTarget('fixedPeriodCosts', v)} suffix={currency} />
              <Field label={lang === 'tr' ? 'CAC aralığı · alt' : 'CAC range · low'} value={target.cacRangeLow} onChange={(v) => updateTarget('cacRangeLow', v)} suffix={currency} />
              <Field label={lang === 'tr' ? 'CAC aralığı · üst' : 'CAC range · high'} value={target.cacRangeHigh} onChange={(v) => updateTarget('cacRangeHigh', v)} suffix={currency} />
            </div>}
          </div>
          <aside className={`${styles.panel} ${styles.results}`}><div className={styles.panelHead}><span>02</span><div><h2>{lang === 'tr' ? 'Canlı sonuç' : 'Live result'}</h2><p>{active.name} {lang === 'tr' ? 'senaryosu' : 'scenario'}</p></div></div>
            {plannerMode === 'price' ? <div className={styles.metrics}><Metric label={lang === 'tr' ? 'Minimum fiyat' : 'Minimum price'} value={formatMoney(priceResult.breakEvenSalePrice)} /><Metric label={channel === 'b2b' ? (lang === 'tr' ? 'Hedef referans fiyatı' : 'Target reference price') : (lang === 'tr' ? 'Hedef satış fiyatı' : 'Target sale price')} value={formatMoney(priceResult.targetSalePrice)} tone="good" /><Metric label={lang === 'tr' ? 'Önerilen liste fiyatı' : 'Suggested list price'} value={formatMoney(priceResult.recommendedListPrice)} /><Metric label={lang === 'tr' ? 'Birim katkı' : 'Unit contribution'} value={formatMoney(priceResult.contribution)} tone={priceResult.contribution >= 0 ? 'good' : 'warn'} /><Metric label={lang === 'tr' ? 'Maksimum indirim' : 'Maximum discount'} value={priceResult.maxDiscountRate === null ? '—' : `%${formatNumber(priceResult.maxDiscountRate)}`} /><Metric label={lang === 'tr' ? 'İzin verilen edinme maliyeti' : 'Allowable acquisition cost'} value={formatMoney(priceResult.allowedCac)} />{channel === 'b2b' && <Metric label={lang === 'tr' ? 'Kanal kesintileri sonrası net gelir' : 'Net revenue after channel deductions'} value={formatMoney(priceResult.netRevenueAfterFees)} />}{channel === 'store' && <Metric label={lang === 'tr' ? 'Siparişe düşen mağaza gideri' : 'Store cost allocated per order'} value={formatMoney(priceResult.channelCostPerOrder)} />}</div> : <div className={styles.metrics}><Metric label={channel === 'b2b' ? (lang === 'tr' ? 'Gerekli yeni alıcı' : 'Required new buyers') : (lang === 'tr' ? 'Gerekli yeni müşteri' : 'Required new customers')} value={formatNumber(planResults[activeScenario].requiredNewCustomers)} /><Metric label={channel === 'b2b' ? (lang === 'tr' ? 'Gerekli nitelikli lead' : 'Required qualified leads') : channel === 'store' ? (lang === 'tr' ? 'Gerekli mağaza ziyareti' : 'Required store visits') : (lang === 'tr' ? 'Gerekli trafik' : 'Required traffic')} value={formatNumber(planResults[activeScenario].requiredVisits)} /><Metric label={lang === 'tr' ? 'Edinme bütçesi aralığı' : 'Acquisition budget range'} value={`${formatMoney(planResults[activeScenario].marketingBudgetLow)} – ${formatMoney(planResults[activeScenario].marketingBudgetHigh)}`} /><Metric label={lang === 'tr' ? 'Başabaş bütçesi' : 'Break-even budget'} value={formatMoney(planResults[activeScenario].breakEvenMarketingBudget)} /><Metric label={lang === 'tr' ? 'Tahmini ciro' : 'Estimated revenue'} value={formatMoney(planResults[activeScenario].revenue)} /><Metric label={lang === 'tr' ? 'Edinme sonrası kâr' : 'Profit after acquisition'} value={formatMoney(planResults[activeScenario].estimatedProfit)} tone={planResults[activeScenario].estimatedProfit >= 0 ? 'good' : 'warn'} /></div>}
            {[...(plannerMode === 'price' ? priceResult.warnings : planResults[activeScenario].warnings)].map((warning) => <p className={styles.warning} key={warning}>! {warning}</p>)}
          </aside>
        </div>
        {plannerMode === 'price' && <section className={styles.strategySection}><div className={styles.sectionHead}><span>03</span><div><h2>{lang === 'tr' ? 'Üç fiyat stratejisi' : 'Three pricing strategies'}</h2><p>{lang === 'tr' ? 'Aynı maliyet yapısını farklı marj ve kampanya disiplinleriyle karşılaştırın.' : 'Compare the same cost structure under different margin and promotion disciplines.'}</p></div></div><div className={styles.strategyGrid}>{priceStrategies.map((strategy) => {const names = {entry: lang === 'tr' ? 'Pazara giriş' : 'Market entry', balanced: lang === 'tr' ? 'Dengeli' : 'Balanced', premium: 'Premium'}; return <article key={strategy.id}><span>{names[strategy.id]}</span><strong>{formatMoney(strategy.result.recommendedListPrice)}</strong><p>{lang === 'tr' ? 'Hedef satış' : 'Target sale'}: {formatMoney(strategy.result.targetSalePrice)}</p><small>%{formatNumber(strategy.margin)} {lang === 'tr' ? 'marj' : 'margin'} · %{formatNumber(strategy.discount)} {lang === 'tr' ? 'indirim alanı' : 'discount room'}</small></article>})}</div><div className={styles.sensitivity}><h3>{lang === 'tr' ? 'Maliyet × marj hassasiyeti' : 'Cost × margin sensitivity'}</h3><p>{lang === 'tr' ? 'Hedef satış fiyatının değişen maliyet ve marja tepkisi.' : 'How target sale price reacts to changing cost and margin.'}</p><table><thead><tr><th>{lang === 'tr' ? 'Maliyet' : 'Cost'}</th><th>{lang === 'tr' ? 'Marj −5 puan' : 'Margin −5 pts'}</th><th>{lang === 'tr' ? 'Mevcut marj' : 'Current margin'}</th><th>{lang === 'tr' ? 'Marj +5 puan' : 'Margin +5 pts'}</th></tr></thead><tbody>{sensitivity.map((row) => <tr key={row.costChange}><th>{row.costChange > 0 ? '+' : ''}{row.costChange}%</th>{row.prices.map((price, index) => <td key={index}>{formatMoney(price)}</td>)}</tr>)}</tbody></table></div></section>}
        <section className={styles.scenarioSection}><div className={styles.sectionHead}><span>{plannerMode === 'price' ? '04' : '03'}</span><div><h2>{lang === 'tr' ? 'Senaryoları karşılaştırın' : 'Compare scenarios'}</h2><p>{lang === 'tr' ? 'Fiyat, indirim, kargo, komisyon, iade ve CAC değiştikçe sonuçları canlı görün.' : 'See the impact as price, discount, shipping, commission, returns and CAC change.'}</p></div></div>
          <div className={styles.scenarioGrid}>{scenarios.map((scenario, index) => {const result = planResults[index]; const price = calculatePrice(costs, scenario.listPrice, scenario, economics); return <article className={`${styles.scenario} ${activeScenario === index ? styles.activeScenario : ''}`} key={scenario.id} onClick={() => setActiveScenario(index)}><div className={styles.scenarioTitle}><input aria-label={lang === 'tr' ? 'Senaryo adı' : 'Scenario name'} value={scenario.name} onChange={(e) => updateScenario(index, 'name', e.target.value)} onClick={(e) => e.stopPropagation()} /><span>{result.feasible ? (lang === 'tr' ? 'Uygulanabilir' : 'Feasible') : (lang === 'tr' ? 'Riskli' : 'At risk')}</span></div><div className={styles.scenarioFields}>
              <Field label={lang === 'tr' ? 'Liste fiyatı' : 'List price'} value={scenario.listPrice} onChange={(v) => updateScenario(index, 'listPrice', v)} suffix={currency} />
              <Field label={lang === 'tr' ? 'İndirim' : 'Discount'} value={scenario.discountRate} onChange={(v) => updateScenario(index, 'discountRate', v)} suffix="%" step={.5} />
              <Field label={lang === 'tr' ? 'Ücretsiz kargo maliyeti' : 'Free shipping cost'} value={scenario.shippingCost} onChange={(v) => updateScenario(index, 'shippingCost', v)} suffix={currency} />
              <Field label={lang === 'tr' ? 'Komisyon' : 'Commission'} value={scenario.commissionRate} onChange={(v) => updateScenario(index, 'commissionRate', v)} suffix="%" step={.5} />
              <Field label={lang === 'tr' ? 'İade' : 'Returns'} value={scenario.returnRate} onChange={(v) => updateScenario(index, 'returnRate', v)} suffix="%" step={.5} />
              <Field label={channel === 'b2b' ? (lang === 'tr' ? 'Alıcı edinme maliyeti' : 'Buyer acquisition cost') : 'CAC'} value={scenario.cac} onChange={(v) => updateScenario(index, 'cac', v)} suffix={currency} />
              <Field label={channel === 'b2b' ? (lang === 'tr' ? 'Lead → alıcı dönüşümü' : 'Lead-to-buyer conversion') : channel === 'store' ? (lang === 'tr' ? 'Ziyaret → alışveriş' : 'Visit-to-purchase') : (lang === 'tr' ? 'Dönüşüm' : 'Conversion')} value={scenario.conversionRate} onChange={(v) => updateScenario(index, 'conversionRate', v)} suffix="%" step={.1} />
              <Field label={lang === 'tr' ? 'Sipariş başı adet' : 'Units per order'} value={scenario.unitsPerOrder} onChange={(v) => updateScenario(index, 'unitsPerOrder', v)} step={.1} />
            </div><div className={styles.scenarioOutput}><div><span>{lang === 'tr' ? 'Satış fiyatı' : 'Sale price'}</span><strong>{formatMoney(result.salePrice)}</strong></div><div><span>{lang === 'tr' ? 'Birim katkı' : 'Unit contribution'}</span><strong>{formatMoney(price.contribution)}</strong></div><div><span>{lang === 'tr' ? 'Tahmini kâr' : 'Estimated profit'}</span><strong>{formatMoney(result.estimatedProfit)}</strong></div></div></article>})}</div>
        </section>
      </>}
      {(mode === 'planner' || marketResult) && <ToolReportDownload
        tool="sellf-marketfit"
        language={lang}
        title={mode === 'market' ? (lang === 'tr' ? 'Sellf MarketFit pazar raporu' : 'Sellf MarketFit market report') : (lang === 'tr' ? 'Sellf MarketFit fiyat ve satış raporu' : 'Sellf MarketFit pricing and sales report')}
        input={mode === 'market' ? {mode, category, productType, productUrl: productUrl || null, competitorUrlCount: competitorUrls.split(/\r?\n/).filter((line) => line.trim()).length, channel, marketplace, storeFormat, b2bModel, marketArea, currency, ownPackageQuantity, ownUnitAmount, ownUnitLabel, manualEvidenceRows: manualEvidence.split(/\r?\n/).filter((line) => line.trim()).length} : {mode, plannerMode, currency, channel, marketplace, storeFormat, b2bModel, channelEconomics: economics, costs, target: plannerMode === 'target' ? target : null, scenarios, activeScenario}}
        result={mode === 'market' && marketResult ? {summary: marketResult.summary, discovery: marketResult.discovery, fit: marketFit, positioning, evidence: marketResult.evidence.slice(0, 12).map((item) => ({title: item.title, source: item.source, price: item.price}))} : {price: priceResult, salesPlans: plannerMode === 'target' ? planResults : [], priceStrategies, activeScenario: planResults[activeScenario]}}
      />}
    </section>
  </main>
}
