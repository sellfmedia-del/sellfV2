'use client'

import {useEffect, useMemo, useRef, useState} from 'react'
import {Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {calculateTimeline, compareScenarios, type NumericInputs, type SectorId} from './engine'
import {getSector, sectors, type FieldConfig} from './config'
import styles from './growth-simulator.module.css'
import {recordToolRun} from '../analytics'

type Locale = 'tr' | 'en'
type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP'

const copy = {
  tr: {
    eyebrow: 'SELLF ENGAGE / GROWTH SIMULATOR', title: 'Büyüme kararını, sonuçlarını görmeden verme.',
    intro: 'Mevcut operasyonunuzu tanımlayın, büyüme değişkenlerini hareket ettirin ve cirodan EBITDA’ya kadar finansal etkiyi anında görün.',
    back: 'Tüm tool’lara dön', sector: 'İş modelinizi seçin', current: 'Mevcut durum', scenario: 'Büyüme senaryosu',
    inputs: 'Değişkenler', advanced: 'Detaylı girdileri göster', hideAdvanced: 'Detaylı girdileri gizle', reset: 'Örnek senaryoya dön',
    outputs: 'Finansal sonuç', revenue: 'Net ciro', expenses: 'Toplam gider', ebitda: 'Öngörülen EBITDA', margin: 'EBITDA marjı',
    roas: 'ROAS', roi: 'Growth ROI', noRoi: 'Ek yatırım yok', delta: 'EBITDA değişimi', investment: 'Ek büyüme yatırımı',
    chart: 'Mevcut durum ve senaryo', details: 'Detaylı hesaplama', health: 'Operasyonun finansal sağlığı',
    strong: 'Güçlü', watch: 'İzlenmeli', critical: 'Kritik', assumptions: 'Hesabın kapsamı',
    disclaimer: 'Bu çıktı finansal planlama simülasyonudur; muhasebe, vergi veya yatırım tavsiyesi değildir. EBITDA net kâr değildir. Vergi, amortisman ve finansman etkileri yalnızca ilgili modelde ayrıca gösterilir.',
    baselineLabel: 'Mevcut', scenarioLabel: 'Senaryo', currency: 'Para birimi', currencyNote: 'Para birimi seçimi değerleri dönüştürmez; girilen tutarların birimini belirler.',
    positive: 'Senaryo, mevcut duruma göre daha yüksek EBITDA üretiyor.', negative: 'Senaryo mevcut duruma göre EBITDA kaybı yaratıyor.',
    breakEvenGood: 'Senaryo cirosu operasyonel başabaş seviyesinin üzerinde.', breakEvenBad: 'Senaryo cirosu operasyonel başabaş seviyesinin altında.',
    breakEvenUnavailable: 'Pozitif birim katkısı olmadığı için başabaş noktası oluşmuyor.', points: 'puan',
    noWarning: 'Modelde belirgin bir kapasite veya başabaş uyarısı oluşmadı.',
    timeView: 'Zaman görünümü', timeIntro: 'Steady-state sonucunun aylara nasıl yayıldığını ve nakit etkisinin ne zaman oluştuğunu görün.',
    month: 'Ay', timelineRevenue: 'Gelir / tahsilat', timelineEbitda: 'EBITDA / net nakit', timelineExpenses: 'Gider / proje harcaması', backlog: 'Backlog', cumulativeCash: 'Kümülatif nakit',
    firstRevenue: 'Yeni gelirin başladığı ay', endingBacklog: '12. ay backlog', fullRamp: 'Tam kapasite ayı', payback: 'Geri ödeme ayı', maxFunding: 'Maksimum finansman ihtiyacı',
    cashBreakEven: 'Nakit başabaş ayı', endingInventory: 'Dönem sonu stok', derivedFinance: 'Hesaplanan finansman maliyeti', notReached: 'Dönem içinde oluşmadı',
    b2bTimeNote: 'Yeni lead kohortları satış döngüsü tamamlandıktan sonra kapanır; sözleşme geliri proje süresine eşit dağıtılır.',
    retailTimeNote: 'Yeni mağazalar açılış ayından itibaren doğrusal ramp-up ile olgunlaşır; CAPEX ve ilk stok geri ödeme hesabına dahil edilir.',
    realEstateTimeNote: 'İnşaat harcamaları S-eğrisiyle, tahsilatlar peşinat ve taksit planıyla dağıtılır; finansman maliyeti aylık nakit açığından türetilir.',
  },
  en: {
    eyebrow: 'SELLF ENGAGE / GROWTH SIMULATOR', title: 'See the financial result before making the growth decision.',
    intro: 'Describe your current operation, move the growth variables and see the impact from revenue through EBITDA in real time.',
    back: 'Back to all tools', sector: 'Choose your business model', current: 'Current state', scenario: 'Growth scenario',
    inputs: 'Variables', advanced: 'Show detailed inputs', hideAdvanced: 'Hide detailed inputs', reset: 'Reset example',
    outputs: 'Financial result', revenue: 'Net revenue', expenses: 'Total expenses', ebitda: 'Projected EBITDA', margin: 'EBITDA margin',
    roas: 'ROAS', roi: 'Growth ROI', noRoi: 'No incremental investment', delta: 'EBITDA change', investment: 'Incremental growth investment',
    chart: 'Current state and scenario', details: 'Detailed calculation', health: 'Financial health',
    strong: 'Strong', watch: 'Monitor', critical: 'Critical', assumptions: 'Calculation scope',
    disclaimer: 'This is a financial planning simulation, not accounting, tax or investment advice. EBITDA is not net profit. Tax, depreciation and financing effects are shown separately only where the model supports them.',
    baselineLabel: 'Current', scenarioLabel: 'Scenario', currency: 'Currency', currencyNote: 'Changing currency does not convert values; it defines the unit of the amounts entered.',
    positive: 'The scenario produces higher EBITDA than the current state.', negative: 'The scenario produces an EBITDA loss versus the current state.',
    breakEvenGood: 'Scenario revenue is above operational break-even.', breakEvenBad: 'Scenario revenue is below operational break-even.',
    breakEvenUnavailable: 'There is no break-even point because unit contribution is not positive.', points: 'pts',
    noWarning: 'No material capacity or break-even warning was triggered.',
    timeView: 'Time view', timeIntro: 'See how the steady-state result unfolds by month and when its cash impact occurs.',
    month: 'Month', timelineRevenue: 'Revenue / collections', timelineEbitda: 'EBITDA / net cash', timelineExpenses: 'Costs / project spend', backlog: 'Backlog', cumulativeCash: 'Cumulative cash',
    firstRevenue: 'First month of new revenue', endingBacklog: 'Month-12 backlog', fullRamp: 'Full-ramp month', payback: 'Payback month', maxFunding: 'Maximum funding need',
    cashBreakEven: 'Cash break-even month', endingInventory: 'Ending inventory', derivedFinance: 'Derived finance cost', notReached: 'Not reached in period',
    b2bTimeNote: 'New lead cohorts close after the sales cycle; contract revenue is spread evenly across the project duration.',
    retailTimeNote: 'New stores ramp linearly from their opening month; CAPEX and initial inventory are included in payback.',
    realEstateTimeNote: 'Construction spend follows an S-curve, collections follow down-payment and installment terms, and financing cost is derived from monthly cash deficits.',
  },
} as const

const compact = (value: number, locale: Locale) => new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {notation: 'compact', maximumFractionDigits: 1}).format(value)

const modelTranslations: Record<string, string> = {
  'Net sipariş': 'Net orders', 'Ücretli trafik': 'Paid traffic', 'Katkı marjı': 'Contribution margin',
  'Ürün maliyeti': 'Cost of goods', 'Komisyonlar': 'Commissions', 'Lojistik': 'Logistics', 'Reklam harcaması': 'Ad spend',
  'Sabit operasyon giderleri': 'Fixed operating costs', 'Kazanılan iş': 'Won business', 'Teslim edilebilir iş': 'Deliverable business', 'Toplam lead': 'Total leads',
  'Kapasite üstü backlog': 'Backlog above capacity', 'Satış döngüsü': 'Sales cycle', 'Teslimat maliyeti': 'Delivery cost',
  'Yeni muhasebeleşen gelir': 'New recognized revenue', 'Mevcut müşteri geliri': 'Existing-customer revenue', 'Satış komisyonu': 'Sales commission',
  'Pazarlama harcaması': 'Marketing spend', 'Satış ve teslimat ekipleri': 'Sales and delivery teams', 'Diğer sabit giderler': 'Other fixed costs',
  'Net işlem': 'Net transactions', 'Mağaza başına ciro': 'Revenue per store', 'Stoksuzluk kaynaklı kayıp': 'Revenue lost to stockouts',
  'Mağaza başına başabaş': 'Break-even per store', 'Kayıp ve fire': 'Shrinkage and loss', 'Mağaza sabit giderleri': 'Store fixed costs',
  'Merkez giderleri': 'Central costs', 'Satılabilir m²': 'Sellable sqm', 'Vergi öncesi kâr': 'Pre-tax profit',
  'Başabaş satış fiyatı / m²': 'Break-even price / sqm', 'Başabaş stok satış oranı': 'Break-even inventory sell-through',
  'Arsa maliyeti': 'Land cost', 'İnşaat maliyeti': 'Construction cost', 'Beklenmeyen gider payı': 'Contingency',
  'Proje ve ruhsat giderleri': 'Project and permit costs', 'Pazarlama ve satış': 'Marketing and sales', 'Genel yönetim': 'Overhead',
  'Finansman maliyeti (EBITDA dışı)': 'Finance cost (outside EBITDA)',
  'İade oranı kârlılığı belirgin biçimde baskılıyor.': 'The return rate is materially suppressing profitability.',
  'Ciro, operasyonel başabaş seviyesinin altında.': 'Revenue is below operational break-even.',
  'Tanınan gelir operasyonel başabaş seviyesinin altında.': 'Recognized revenue is below operational break-even.',
  'Stok bulunabilirliği satış potansiyelini belirgin biçimde sınırlıyor.': 'Stock availability is materially limiting sales potential.',
  'Toplam ciro mağaza ağının başabaş seviyesinin altında.': 'Total revenue is below the store network break-even level.',
  'Projenin başabaşa ulaşması için stokun çok yüksek bir bölümünün satılması gerekiyor.': 'A very high share of inventory must be sold for the project to break even.',
  'Finansman maliyeti sonrasında proje zarar üretiyor.': 'The project produces a loss after financing costs.',
  'Pozitif birim katkısı oluşmadığı için operasyonel başabaş mümkün değil.': 'Operational break-even is not possible because unit contribution is not positive.',
}

function localizeModelText(text: string, lang: Locale) {
  if (lang === 'tr') return text
  if (text.startsWith('Talep kapasiteyi ')) return text.replace('Talep kapasiteyi ', 'Demand exceeds capacity by ').replace(' iş aşıyor; gelir aynı dönemde gerçekleşemiyor.', ' deals; the revenue cannot be recognized in the same period.')
  return modelTranslations[text] ?? text
}

export default function GrowthSimulatorTool({lang}: {lang: Locale}) {
  const t = copy[lang]
  const [sectorId, setSectorId] = useState<SectorId>('ecommerce')
  const sector = getSector(sectorId)
  const [baselineBySector, setBaselineBySector] = useState<Record<SectorId, NumericInputs>>(() => Object.fromEntries(sectors.map((item) => [item.id, {...item.baseline}])) as Record<SectorId, NumericInputs>)
  const [scenarioBySector, setScenarioBySector] = useState<Record<SectorId, NumericInputs>>(() => Object.fromEntries(sectors.map((item) => [item.id, {...item.scenario}])) as Record<SectorId, NumericInputs>)
  const [advanced, setAdvanced] = useState(false)
  const [currency, setCurrency] = useState<Currency>('TRY')

  const baseline = baselineBySector[sectorId]
  const scenario = scenarioBySector[sectorId]
  const result = useMemo(() => compareScenarios(sectorId, baseline, scenario), [sectorId, baseline, scenario])
  const timeline = useMemo(() => calculateTimeline(sectorId, baseline, scenario), [sectorId, baseline, scenario])

  const money = (value: number) => new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : 'en-US', {style: 'currency', currency, maximumFractionDigits: 0}).format(value)
  const number = (value: number) => new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : 'en-US', {maximumFractionDigits: 1}).format(value)
  const formatField = (value: number, field: FieldConfig) => field.unit === 'currency' ? money(value) : field.unit === 'percent' ? `%${number(value)}` : field.unit === 'months' ? `${number(value)} ${lang === 'tr' ? 'ay' : 'mo'}` : number(value)
  const visibleFields = sector.fields.filter((field) => advanced || !field.advanced)

  const update = (mode: 'baseline' | 'scenario', key: string, value: number) => {
    const setter = mode === 'baseline' ? setBaselineBySector : setScenarioBySector
    const field = sector.fields.find((item) => item.key === key)
    const safeValue = Number.isFinite(value) ? value : field?.min ?? 0
    const clampedValue = field ? Math.min(field.max, Math.max(field.min, safeValue)) : Math.max(0, safeValue)
    setter((all) => ({...all, [sectorId]: {...all[sectorId], [key]: clampedValue}}))
  }

  const reset = () => {
    setBaselineBySector((all) => ({...all, [sectorId]: {...sector.baseline}}))
    setScenarioBySector((all) => ({...all, [sectorId]: {...sector.scenario}}))
  }

  const healthTone = result.scenario.ebitda < 0 ? 'critical' : result.scenario.ebitdaMargin < 10 || result.scenario.breakEvenRevenue === null || result.scenario.revenue < result.scenario.breakEvenRevenue ? 'watch' : 'strong'
  const healthLabel = healthTone === 'critical' ? t.critical : healthTone === 'watch' ? t.watch : t.strong
  const chartData = [
    {name: t.baselineLabel, revenue: result.baseline.revenue, expenses: result.baseline.expenses, ebitda: result.baseline.ebitda},
    {name: t.scenarioLabel, revenue: result.scenario.revenue, expenses: result.scenario.expenses, ebitda: result.scenario.ebitda},
  ]
  const modelWarnings = result.scenario.warnings.filter((warning) => result.scenario.breakEvenRevenue !== null || !warning.startsWith('Pozitif birim katkısı'))
  const timelineData = timeline?.points.map((point) => ({...point, label: `${t.month} ${point.month}`})) ?? []
  const monthValue = (value: number | null) => value === null ? t.notReached : `${t.month} ${number(value)}`
  const timelineSummary = timeline ? timeline.kind === 'b2b' ? [
    {label: t.firstRevenue, value: monthValue(timeline.summary.firstRevenueMonth)},
    {label: t.endingBacklog, value: number(timeline.summary.endingBacklog ?? 0)},
  ] : timeline.kind === 'retail' ? [
    {label: t.fullRamp, value: monthValue(timeline.summary.fullRampMonth)},
    {label: t.payback, value: monthValue(timeline.summary.paybackMonth)},
    {label: t.maxFunding, value: timeline.summary.maxFunding === null ? '—' : money(timeline.summary.maxFunding)},
  ] : [
    {label: t.maxFunding, value: timeline.summary.maxFunding === null ? '—' : money(timeline.summary.maxFunding)},
    {label: t.cashBreakEven, value: monthValue(timeline.summary.cashBreakEvenMonth)},
    {label: t.endingInventory, value: `${number(timeline.summary.endingInventory ?? 0)} m²`},
    {label: t.derivedFinance, value: money(timeline.summary.derivedFinanceCost ?? 0)},
  ] : []
  const timelineNote = timeline?.kind === 'b2b' ? t.b2bTimeNote : timeline?.kind === 'retail' ? t.retailTimeNote : t.realEstateTimeNote
  const runSignatureRef = useRef('')

  useEffect(() => {
    const input = {sectorId, currency, baseline, scenario}
    const signature = JSON.stringify(input)
    if (!runSignatureRef.current) {
      runSignatureRef.current = signature
      return
    }
    if (signature === runSignatureRef.current) return
    runSignatureRef.current = signature
    const timer = window.setTimeout(() => {
      recordToolRun({
        tool: 'growth-simulator',
        language: lang,
        input,
        result: {
          baseline: {
            revenue: result.baseline.revenue,
            expenses: result.baseline.expenses,
            ebitda: result.baseline.ebitda,
            ebitdaMargin: result.baseline.ebitdaMargin,
            roas: result.baseline.roas,
            breakEvenRevenue: result.baseline.breakEvenRevenue,
          },
          scenario: {
            revenue: result.scenario.revenue,
            expenses: result.scenario.expenses,
            ebitda: result.scenario.ebitda,
            ebitdaMargin: result.scenario.ebitdaMargin,
            roas: result.scenario.roas,
            breakEvenRevenue: result.scenario.breakEvenRevenue,
            warnings: result.scenario.warnings,
          },
          ebitdaDelta: result.ebitdaDelta,
          growthInvestment: result.growthInvestment,
          growthRoi: result.growthRoi,
          timeline: timeline ? {kind: timeline.kind, summary: timeline.summary} : null,
        },
      })
    }, 1800)
    return () => window.clearTimeout(timer)
  }, [sectorId, currency, baseline, scenario, result, timeline, lang])

  return <div className={styles.shell}>
    <section className={styles.hero}>
      <div className={styles.heroGlow} />
      <div className="sellf-container">
        <a href={`/${lang}/engage/tools`} className={styles.back}>← {t.back}</a>
        <span className={styles.eyebrow}>{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </div>
    </section>

    <section className={`sellf-container ${styles.workspace}`}>
      <div className={styles.modelHead}>
        <div><span className={styles.step}>01</span><h2>{t.sector}</h2></div>
        <div className={styles.currencyWrap}>
          <label htmlFor="currency">{t.currency}</label>
          <select id="currency" value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}>{(['TRY', 'USD', 'EUR', 'GBP'] as Currency[]).map((item) => <option key={item}>{item}</option>)}</select>
        </div>
      </div>
      <div className={styles.sectorGrid}>
        {sectors.map((item) => <button key={item.id} type="button" onClick={() => setSectorId(item.id)} className={item.id === sectorId ? styles.sectorActive : ''}>
          <strong>{item.name[lang]}</strong><span>{item.description[lang]}</span>
        </button>)}
      </div>
      <p className={styles.currencyNote}>{t.currencyNote}</p>

      <div className={styles.simulatorGrid}>
        <div className={styles.controls}>
          <div className={styles.panelHeading}><div><span className={styles.step}>02</span><h2>{t.inputs}</h2></div><button type="button" onClick={reset}>{t.reset}</button></div>
          <div className={styles.columnLabels}><span /> <b>{t.current}</b><b>{t.scenario}</b></div>
          <div className={styles.fields}>
            {visibleFields.map((field) => <div className={styles.field} key={field.key}>
              <div className={styles.fieldTop}><label htmlFor={`${field.key}-scenario`}>{field.label[lang]}</label><strong>{formatField(scenario[field.key], field)}</strong></div>
              <div className={styles.fieldCompare}>
                <input aria-label={`${field.label[lang]} - ${t.current}`} type="number" min={field.min} max={field.max} step={field.step} value={baseline[field.key]} onChange={(event) => update('baseline', field.key, Number(event.target.value))} />
                <input aria-label={`${field.label[lang]} - ${t.scenario}`} type="number" min={field.min} max={field.max} step={field.step} value={scenario[field.key]} onChange={(event) => update('scenario', field.key, Number(event.target.value))} />
              </div>
              <input id={`${field.key}-scenario`} className={styles.range} type="range" min={field.min} max={field.max} step={field.step} value={scenario[field.key]} onChange={(event) => update('scenario', field.key, Number(event.target.value))} />
            </div>)}
          </div>
          <button className={styles.advancedButton} type="button" onClick={() => setAdvanced((value) => !value)}>{advanced ? t.hideAdvanced : t.advanced}<span>{advanced ? '−' : '+'}</span></button>
        </div>

        <div className={styles.results}>
          <div className={styles.panelHeading}><div><span className={styles.step}>03</span><h2>{t.outputs}</h2></div><span className={`${styles.healthPill} ${styles[healthTone]}`}>{healthLabel}</span></div>
          <div className={styles.metricGrid}>
            <Metric label={t.revenue} value={money(result.scenario.revenue)} delta={result.scenario.revenue - result.baseline.revenue} formatter={money} />
            <Metric label={t.ebitda} value={money(result.scenario.ebitda)} delta={result.ebitdaDelta} formatter={money} emphasized />
            <Metric label={t.margin} value={`%${number(result.scenario.ebitdaMargin)}`} delta={result.scenario.ebitdaMargin - result.baseline.ebitdaMargin} formatter={(value) => `${value >= 0 ? '+' : ''}${number(value)} ${t.points}`} />
            <Metric label={t.roas} value={result.scenario.roas === null ? '—' : `${number(result.scenario.roas)}x`} delta={result.scenario.roas === null || result.baseline.roas === null ? undefined : result.scenario.roas - result.baseline.roas} formatter={(value) => `${value >= 0 ? '+' : ''}${number(value)}x`} />
            <Metric label={t.roi} value={result.growthRoi === null ? t.noRoi : `%${number(result.growthRoi)}`} />
            <Metric label={t.expenses} value={money(result.scenario.expenses)} delta={result.scenario.expenses - result.baseline.expenses} formatter={money} />
          </div>

          <div className={styles.investmentStrip}>
            <div><span>{t.delta}</span><strong>{money(result.ebitdaDelta)}</strong></div>
            <div><span>{t.investment}</span><strong>{money(result.growthInvestment)}</strong></div>
          </div>

          <div className={styles.chartPanel}>
            <h3>{t.chart}</h3>
            <div className={styles.chart}>
              <ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} margin={{top: 12, right: 4, left: 0, bottom: 0}}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,.45)" tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,.35)" tickFormatter={(value) => compact(Number(value), lang)} tickLine={false} axisLine={false} width={58} />
                <Tooltip formatter={(value) => money(Number(value))} contentStyle={{background: '#111827', border: '1px solid rgba(255,255,255,.14)', borderRadius: 12}} />
                <Legend wrapperStyle={{fontSize: 11}} />
                <Bar dataKey="revenue" name={t.revenue} fill="#7777ef" radius={[5, 5, 0, 0]} />
                <Bar dataKey="expenses" name={t.expenses} fill="#36415d" radius={[5, 5, 0, 0]} />
                <Bar dataKey="ebitda" name="EBITDA" fill="#d6d6ff" radius={[5, 5, 0, 0]} />
              </BarChart></ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {timeline && <section className={styles.timelinePanel}>
        <div className={styles.timelineHeading}>
          <div><span className={styles.step}>04</span><h2>{t.timeView}</h2><p>{t.timeIntro}</p></div>
          <div className={styles.timelineSummary}>{timelineSummary.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div>
        </div>
        <div className={styles.timelineChart}>
          <ResponsiveContainer width="100%" height="100%"><ComposedChart data={timelineData} margin={{top: 12, right: 10, left: 0, bottom: 0}}>
            <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
            <XAxis dataKey="label" stroke="rgba(255,255,255,.45)" tickLine={false} axisLine={false} minTickGap={24} />
            <YAxis yAxisId="money" stroke="rgba(255,255,255,.35)" tickFormatter={(value) => compact(Number(value), lang)} tickLine={false} axisLine={false} width={62} />
            {timeline.kind === 'b2b' && <YAxis yAxisId="volume" orientation="right" stroke="rgba(170,170,255,.55)" tickLine={false} axisLine={false} width={36} />}
            <Tooltip formatter={(value, name) => name === t.backlog ? number(Number(value)) : money(Number(value))} contentStyle={{background: '#111827', border: '1px solid rgba(255,255,255,.14)', borderRadius: 12}} />
            <Legend wrapperStyle={{fontSize: 11}} />
            <Bar yAxisId="money" dataKey="revenue" name={t.timelineRevenue} fill="#7777ef" radius={[4, 4, 0, 0]} />
            {timeline.kind === 'realEstate' && <Bar yAxisId="money" dataKey="expenses" name={t.timelineExpenses} fill="#36415d" radius={[4, 4, 0, 0]} />}
            {timeline.kind !== 'realEstate' && <Line yAxisId="money" type="monotone" dataKey="ebitda" name={t.timelineEbitda} stroke="#d6d6ff" strokeWidth={2} dot={false} />}
            {timeline.kind !== 'b2b' && <Line yAxisId="money" type="monotone" dataKey="cumulativeCash" name={t.cumulativeCash} stroke="#75d9a7" strokeWidth={2} dot={false} />}
            {timeline.kind === 'b2b' && <Line yAxisId="volume" type="stepAfter" dataKey="backlog" name={t.backlog} stroke="#f5c878" strokeWidth={2} dot={false} />}
          </ComposedChart></ResponsiveContainer>
        </div>
        <p className={styles.timelineNote}>{timelineNote}</p>
      </section>}

      <div className={styles.lowerGrid}>
        <section className={styles.detailPanel}><span className={styles.step}>{timeline ? '05' : '04'}</span><h2>{t.details}</h2>
          <div className={styles.detailRows}>{result.scenario.breakdown.map((item) => <div key={item.label}><span>{localizeModelText(item.label, lang)}</span><strong>{money(item.value)}</strong></div>)}</div>
          <div className={styles.secondaryGrid}>
            {result.scenario.secondary.map((item) => <div key={item.label}><span>{localizeModelText(item.label, lang)}</span><strong>{item.value === null ? '—' : item.format === 'currency' ? money(item.value) : item.format === 'percent' ? `%${number(item.value)}` : item.format === 'months' ? `${number(item.value)} ${lang === 'tr' ? 'ay' : 'mo'}` : number(item.value)}</strong></div>)}
          </div>
        </section>
        <section className={styles.healthPanel}><span className={styles.step}>{timeline ? '06' : '05'}</span><h2>{t.health}</h2>
          <ul>
            <li>{result.ebitdaDelta >= 0 ? t.positive : t.negative}</li>
            <li>{result.scenario.breakEvenRevenue === null ? t.breakEvenUnavailable : result.scenario.revenue >= result.scenario.breakEvenRevenue ? t.breakEvenGood : t.breakEvenBad}</li>
            {(modelWarnings.length ? modelWarnings : result.scenario.breakEvenRevenue === null ? [] : [t.noWarning]).map((warning) => <li key={warning}>{localizeModelText(warning, lang)}</li>)}
          </ul>
          <div className={styles.disclaimer}><strong>{t.assumptions}</strong><p>{t.disclaimer}</p></div>
        </section>
      </div>
    </section>
  </div>
}

function Metric({label, value, delta, formatter, emphasized = false}: {label: string; value: string; delta?: number; formatter?: (value: number) => string; emphasized?: boolean}) {
  return <div className={`${styles.metric} ${emphasized ? styles.metricEmphasized : ''}`}><span>{label}</span><strong>{value}</strong>{delta !== undefined && formatter && <small className={delta >= 0 ? styles.up : styles.down}>{delta >= 0 ? '↑' : '↓'} {formatter(Math.abs(delta))}</small>}</div>
}
