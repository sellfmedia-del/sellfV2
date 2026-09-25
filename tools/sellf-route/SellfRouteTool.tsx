'use client'

import Link from 'next/link'
import {useMemo, useState} from 'react'
import {analyzeNarrative, buildRoute} from './engine'
import type {BusinessModel, ClarificationId, Locale, Objective, ProblemSignal, Readiness, RouteInputs, ServiceId, Stage} from './types'
import styles from './sellf-route.module.css'
import {recordToolRun} from '../analytics'
import ToolReportDownload from '../ToolReportDownload'

type Step = 'brief' | 'verify' | 'result'
type Localized = {tr: string; en: string}

const modelOptions: Array<[BusinessModel, Localized]> = [
  ['ecommerce', {tr: 'E-ticaret', en: 'E-commerce'}], ['b2b', {tr: 'B2B', en: 'B2B'}],
  ['retail', {tr: 'Perakende / mağaza', en: 'Retail / store'}], ['service', {tr: 'Hizmet şirketi', en: 'Service business'}],
  ['marketplace', {tr: 'Pazaryeri satıcısı', en: 'Marketplace seller'}], ['real-estate', {tr: 'Gayrimenkul / proje', en: 'Real estate / project'}],
]

const objectiveOptions: Array<[Objective, Localized]> = [
  ['sales', {tr: 'Daha fazla satış', en: 'More sales'}], ['profitability', {tr: 'Kârlılığı düzeltmek', en: 'Improve profitability'}],
  ['launch', {tr: 'Ürün / marka lansmanı', en: 'Launch a product / brand'}], ['international', {tr: 'Yeni ülke veya pazar', en: 'Enter a new market'}],
  ['digitalize', {tr: 'Süreçleri dijitalleştirmek', en: 'Digitalize operations'}], ['brand', {tr: 'Markayı güçlendirmek', en: 'Strengthen the brand'}],
]

const stageOptions: Array<[Stage, Localized]> = [
  ['idea', {tr: 'Fikir / hazırlık', en: 'Idea / preparation'}], ['early', {tr: 'Yeni faaliyette', en: 'Early stage'}],
  ['established', {tr: 'Oturmuş işletme', en: 'Established'}], ['scaling', {tr: 'Ölçekleniyor', en: 'Scaling'}],
]

const signalLabels: Record<ProblemSignal, Localized> = {
  'low-demand': {tr: 'Yeterli talep veya sipariş yok', en: 'Not enough demand or orders'},
  'low-conversion': {tr: 'Trafik var fakat dönüşüm düşük', en: 'Traffic exists but conversion is low'},
  'low-quality-leads': {tr: 'Lead’ler yeterince nitelikli değil', en: 'Lead quality is weak'},
  'low-close-rate': {tr: 'Teklifler satışa dönüşmüyor', en: 'Proposals do not convert'},
  'margin-pressure': {tr: 'Satış var fakat kârlılık zayıf', en: 'Sales exist but profitability is weak'},
  fulfillment: {tr: 'Siparişleri hazırlama veya teslim etme sorunu var', en: 'Order fulfilment or delivery is failing'},
  'manual-process': {tr: 'Manuel süreçler ve entegrasyon eksikleri var', en: 'Manual workflows or integration gaps exist'},
  'site-technical': {tr: 'Website veya altyapıda teknik sorun var', en: 'The website or infrastructure has technical issues'},
  'low-retention': {tr: 'Müşteriler tekrar satın almıyor', en: 'Customers do not return'},
  'brand-unclear': {tr: 'Teklif veya marka anlatısı net değil', en: 'The offer or brand narrative is unclear'},
  'marketplace-complexity': {tr: 'Pazaryeri operasyonu yönetilemiyor', en: 'Marketplace operations are difficult to manage'},
}

const clarificationCopy: Record<ClarificationId, {question: Localized; options: Array<{value: string; label: Localized; signals: ProblemSignal[]}>}> = {
  'shipping-meaning': {
    question: {tr: '“Kargo / teslimat” ifadenizle neyi kastediyorsunuz?', en: 'What do you mean by “shipping / delivery”?'},
    options: [
      {value: 'no-orders', label: {tr: 'Yeterli sipariş alamıyoruz', en: 'We are not receiving enough orders'}, signals: ['low-demand']},
      {value: 'cannot-dispatch', label: {tr: 'Sipariş geliyor fakat hazırlayıp gönderemiyoruz', en: 'Orders arrive but we cannot fulfil them'}, signals: ['fulfillment']},
      {value: 'delivery', label: {tr: 'Gönderiyoruz fakat teslimat sorunları yaşıyoruz', en: 'We ship but delivery fails'}, signals: ['fulfillment']},
      {value: 'both', label: {tr: 'Hem sipariş hem operasyon sorunu var', en: 'Both demand and fulfilment are problems'}, signals: ['low-demand', 'fulfillment']},
    ],
  },
  'ads-outcome': {
    question: {tr: 'Reklamların çalışmadığını hangi sonuçtan anlıyorsunuz?', en: 'What tells you that advertising is not working?'},
    options: [
      {value: 'no-traffic', label: {tr: 'Yeterli trafik veya talep oluşmuyor', en: 'Traffic or demand is insufficient'}, signals: ['low-demand']},
      {value: 'no-conversion', label: {tr: 'Trafik geliyor fakat satış olmuyor', en: 'Traffic arrives but does not convert'}, signals: ['low-conversion']},
      {value: 'poor-leads', label: {tr: 'Lead geliyor fakat nitelikli değil', en: 'Leads arrive but quality is weak'}, signals: ['low-quality-leads']},
      {value: 'no-visibility', label: {tr: 'Sonucun nerede kaybolduğunu ölçemiyoruz', en: 'We cannot measure where results are lost'}, signals: []},
    ],
  },
  'site-meaning': {
    question: {tr: '“Site çalışmıyor” derken temel sorun hangisi?', en: 'What is the main issue when you say “the site does not work”?'},
    options: [
      {value: 'technical', label: {tr: 'Teknik hata, hız veya kullanılabilirlik sorunu', en: 'Technical, speed or usability problem'}, signals: ['site-technical']},
      {value: 'conversion', label: {tr: 'Ziyaretçi geliyor fakat dönüşüm olmuyor', en: 'Visitors arrive but do not convert'}, signals: ['low-conversion']},
      {value: 'traffic', label: {tr: 'Siteye yeterli ziyaretçi gelmiyor', en: 'The site does not attract enough visitors'}, signals: ['low-demand']},
      {value: 'unknown', label: {tr: 'Henüz bilmiyoruz', en: 'We do not know yet'}, signals: []},
    ],
  },
}

const services: Record<ServiceId, {title: Localized; summary: Localized; href: string}> = {
  'commercial-diagnosis': {title: {tr: 'Büyüme ve finansal teşhis', en: 'Growth and financial diagnosis'}, summary: {tr: 'Birim ekonomi, marj ve büyüme sınırları netleştirilir.', en: 'Clarify unit economics, margins and growth constraints.'}, href: 'growth-management-consulting'},
  'offer-positioning': {title: {tr: 'Teklif ve konumlandırma', en: 'Offer and positioning'}, summary: {tr: 'Kime, hangi değerle ve neden tercih edileceğiniz netleştirilir.', en: 'Clarify who the offer serves, its value and why it should win.'}, href: 'brand-strategy-branding'},
  measurement: {title: {tr: 'Ölçüm ve attribution altyapısı', en: 'Measurement and attribution'}, summary: {tr: 'Kararın nerede kaybolduğunu gösterecek veri temeli kurulur.', en: 'Build the data foundation required to locate performance loss.'}, href: 'marketing-attribution'},
  'digital-foundation': {title: {tr: 'Dijital altyapı ve dönüşüm noktası', en: 'Digital foundation and conversion path'}, summary: {tr: 'Website, landing page veya satış noktası çalışır hâle getirilir.', en: 'Make the website, landing page or conversion point operational.'}, href: 'digital-products-software-development'},
  'ecommerce-operations': {title: {tr: 'E-ticaret operasyon yönetimi', en: 'E-commerce operations'}, summary: {tr: 'Sipariş, stok, hazırlık ve teslimat akışı düzeltilir.', en: 'Repair order, inventory, fulfilment and delivery workflows.'}, href: 'ecommerce-operations-management'},
  'software-workflow': {title: {tr: 'Yazılım, entegrasyon ve otomasyon', en: 'Software, integration and automation'}, summary: {tr: 'Manuel darboğazlar doğru sistem ve entegrasyonlarla kaldırılır.', en: 'Remove manual bottlenecks with the right systems and integrations.'}, href: 'custom-software-development'},
  conversion: {title: {tr: 'Dönüşüm ve funnel optimizasyonu', en: 'Conversion and funnel optimization'}, summary: {tr: 'Mevcut trafik ve lead akışındaki kayıp noktaları giderilir.', en: 'Fix leakage across existing traffic and lead journeys.'}, href: 'conversion-funnel-optimization'},
  'sales-funnel': {title: {tr: 'B2B satış hunisi optimizasyonu', en: 'B2B sales funnel optimization'}, summary: {tr: 'Lead kalitesi, teklif ve kapanış sistemi birlikte düzenlenir.', en: 'Align lead quality, proposals and closing mechanics.'}, href: 'sales-funnel-optimization'},
  marketplace: {title: {tr: 'Pazaryeri operasyonu', en: 'Marketplace operations'}, summary: {tr: 'Listeleme, feed, mağaza ve ticari operasyon birlikte kurulur.', en: 'Structure listings, feeds, storefront and commercial operations.'}, href: 'marketplace-management'},
  performance: {title: {tr: 'Performans reklamları', en: 'Performance advertising'}, summary: {tr: 'Hazır sistem üzerine ölçülebilir talep ve satış yatırımı yapılır.', en: 'Invest in measurable demand and sales after the foundation is ready.'}, href: 'performance-marketing'},
  'organic-growth': {title: {tr: 'SEO ve organik büyüme', en: 'SEO and organic growth'}, summary: {tr: 'Satın alınan trafiğe bağımlılığı azaltan kalıcı talep oluşturulur.', en: 'Build durable demand that reduces dependence on paid traffic.'}, href: 'seo-organic-growth'},
  retention: {title: {tr: 'Retention ve pazarlama otomasyonu', en: 'Retention and marketing automation'}, summary: {tr: 'Tekrar satın alma ve müşteri devamlılığı sistemi kurulur.', en: 'Build repeat purchase and customer continuity systems.'}, href: 'marketing-automation'},
  'international-growth': {title: {tr: 'İhracat ve uluslararası büyüme', en: 'Export and international growth'}, summary: {tr: 'Pazar girişi, kanal ve operasyon hazırlığı birlikte planlanır.', en: 'Plan market entry, channels and operational readiness together.'}, href: 'export-international-growth'},
  'brand-system': {title: {tr: 'Marka stratejisi ve iletişim sistemi', en: 'Brand strategy and communication system'}, summary: {tr: 'Markanın vaadi, dili ve temas noktaları tutarlı hâle getirilir.', en: 'Align the brand promise, language and customer touchpoints.'}, href: 'brand-strategy-branding'},
}

const reasonLabels: Record<string, Localized> = {
  'commercial-clarity': {tr: 'Kârlılık ve büyüme sınırları henüz doğrulanmamış.', en: 'Profitability and growth limits are not verified.'},
  'offer-clarity': {tr: 'Talep yaratmadan önce teklif netliğinin doğrulanması gerekiyor.', en: 'Offer clarity must be verified before creating demand.'},
  'measurement-gap': {tr: 'Sonuçların nerede kaybolduğunu gösterecek güvenilir ölçüm yok.', en: 'Reliable measurement is missing.'},
  'technical-friction': {tr: 'Teknik sorunlar müşteri yolculuğunu kesintiye uğratıyor.', en: 'Technical issues interrupt the customer journey.'},
  'conversion-path-gap': {tr: 'Çalışan bir dönüşüm noktası henüz doğrulanmadı.', en: 'A working conversion point is not verified.'},
  'fulfillment-risk': {tr: 'Mevcut talebi karşılayacak sipariş ve teslimat düzeni sorunlu.', en: 'Order and delivery operations cannot reliably meet demand.'},
  'workflow-friction': {tr: 'Manuel süreçler kapasite ve izlenebilirlik kaybı yaratıyor.', en: 'Manual processes limit capacity and traceability.'},
  'conversion-loss': {tr: 'Mevcut trafik veya lead akışı satışa yeterince dönüşmüyor.', en: 'Existing traffic or leads do not convert efficiently.'},
  'sales-pipeline-gap': {tr: 'B2B lead, teklif ve kapanış zincirinde kayıp var.', en: 'The B2B lead, proposal and closing chain is leaking.'},
  'marketplace-complexity': {tr: 'Pazaryeri yönetimi ayrı bir operasyon disiplini gerektiriyor.', en: 'Marketplace activity requires dedicated operational discipline.'},
  'retention-loss': {tr: 'Yeni müşteri edinimi tekrar satışla desteklenmiyor.', en: 'Acquisition is not supported by repeat business.'},
  'international-objective': {tr: 'Yeni pazar hedefi ticari ve operasyonel hazırlık gerektiriyor.', en: 'New-market entry requires commercial and operational readiness.'},
  'brand-clarity': {tr: 'Marka anlatısı büyüme hedefini destekleyecek kadar net değil.', en: 'The brand narrative is not clear enough to support growth.'},
  'acquisition-needed': {tr: 'Hazırlıklar tamamlandığında yeni talep üretimi gerekli.', en: 'New demand will be needed once foundations are complete.'},
  'sustainable-demand': {tr: 'Kalıcı ve birikimli talep kanalı oluşturulmalı.', en: 'A durable, compounding demand channel is needed.'},
}

const blockerLabels: Record<string, Localized> = {
  'unit-economics': {tr: 'Birim ekonomi doğrulanmalı', en: 'Verify unit economics'}, offer: {tr: 'Teklif netleşmeli', en: 'Clarify the offer'},
  measurement: {tr: 'Ölçüm kurulmalı', en: 'Set up measurement'}, 'conversion-path': {tr: 'Dönüşüm noktası çalışmalı', en: 'Fix the conversion path'},
  capacity: {tr: 'Operasyon kapasitesi doğrulanmalı', en: 'Verify operational capacity'},
}

const copy = {
  tr: {
    back: 'Tüm tool’lara dön', eyebrow: 'SELLF ENGAGE / SELLF ROUTE', title: 'Hangi operasyonu değil, önce hangisini almanız gerektiğini bulun.',
    intro: 'İhtiyacınızı kendi cümlelerinizle anlatın. Sistem belirsiz ifadelerde karar vermek yerine size soru sorar.',
    badges: ['AI kullanmaz', 'Ücretli API kullanmaz', 'Onaysız çıkarım yapmaz'], brief: 'İhtiyacınızı anlatın', briefNote: 'Serbest metin tek başına karar üretmez; yalnızca doğrulanacak sinyalleri bulur.',
    placeholder: 'Örn. Reklama para harcıyoruz ancak satışlar artmıyor. Sitemiz var fakat sorunun nerede olduğunu bilmiyoruz…', model: 'İş modeli', objective: 'Ana hedef', stage: 'Şirket aşaması', continue: 'İfadeleri doğrula →',
    verify: 'Sizi doğru anladığımızdan emin olalım', verifyNote: 'Aşağıdaki cevaplar operasyon rotasının gerçek girdileridir.', detected: 'Metinden çıkarılan ve onayınızı bekleyen sinyaller', noneDetected: 'Metinden kesin bir problem çıkarılmadı. Aşağıdaki durumlardan size uyanları seçin.', problems: 'Doğrulanan mevcut durumlar', readiness: 'Karar için temel hazırlık',
    offer: 'Teklifiniz ve hedef kitleniz net mi?', measurement: 'Satış ve dönüşüm ölçümü güvenilir mi?', economics: 'Birim ekonomi ve katkı marjı biliniyor mu?', capacity: 'Yeni talebi karşılayacak kapasite var mı?', path: 'Çalışan bir satış / dönüşüm noktası var mı?', traffic: 'Mevcut trafik veya lead hacmi', conversion: 'Mevcut dönüşüm performansı',
    create: 'Yorumu onayla ve rotayı oluştur →', edit: 'Cevapları düzenle', result: 'Önerilen operasyon rotası', resultNote: 'Sıralama; gereklilik, hazırlık ve operasyon bağımlılıklarına göre oluşturuldu.', confidence: 'Karar güveni', understood: 'Doğrulanan teşhis', phase: 'Aşama', required: 'Şimdi gerekli', next: 'Sonraki adım', blocked: 'Ön koşul bekliyor', blockers: 'Başlamadan önce', excluded: 'Şimdilik önermediklerimiz', excludedNote: 'Mevcut cevaplarınız bu operasyonlar için yeterli gereklilik göstermiyor.', contact: 'Bu rotayı Sellf ile değerlendirin →', restart: 'Yeni rota oluştur',
  },
  en: {
    back: 'Back to all tools', eyebrow: 'SELLF ENGAGE / SELLF ROUTE', title: 'Find not only what you need, but what must come first.',
    intro: 'Describe the need in your own words. When language is ambiguous, the system asks instead of guessing.',
    badges: ['No AI', 'No paid API', 'No unverified inference'], brief: 'Describe the need', briefNote: 'Free text never makes the decision; it only identifies signals that require confirmation.',
    placeholder: 'Example: We spend on ads but sales are not increasing. We have a site, but we do not know where the problem is…', model: 'Business model', objective: 'Primary objective', stage: 'Business stage', continue: 'Verify interpretation →',
    verify: 'Let’s make sure we understood correctly', verifyNote: 'The answers below—not the paragraph—are the real inputs to the route.', detected: 'Signals detected from text and awaiting confirmation', noneDetected: 'No definite problem was inferred. Select the statements that apply below.', problems: 'Confirmed current conditions', readiness: 'Foundation readiness',
    offer: 'Are your offer and audience clear?', measurement: 'Is sales and conversion measurement reliable?', economics: 'Are unit economics and contribution margin known?', capacity: 'Can operations fulfil additional demand?', path: 'Is there a working sales / conversion point?', traffic: 'Current traffic or lead volume', conversion: 'Current conversion performance',
    create: 'Confirm and build the route →', edit: 'Edit answers', result: 'Recommended operations route', resultNote: 'The order reflects necessity, readiness and operational dependencies.', confidence: 'Decision confidence', understood: 'Confirmed diagnosis', phase: 'Phase', required: 'Required now', next: 'Next step', blocked: 'Waiting for prerequisites', blockers: 'Before starting', excluded: 'Not recommended for now', excludedNote: 'Your current answers do not show sufficient need for these operations.', contact: 'Review this route with Sellf →', restart: 'Build another route',
  },
} as const

const readinessOptions: Array<[Readiness, Localized]> = [['yes', {tr: 'Evet', en: 'Yes'}], ['partial', {tr: 'Kısmen', en: 'Partly'}], ['no', {tr: 'Hayır', en: 'No'}], ['unknown', {tr: 'Bilmiyorum', en: 'Unknown'}]]

export default function SellfRouteTool({lang}: {lang: Locale}) {
  const t = copy[lang]
  const [step, setStep] = useState<Step>('brief')
  const [narrative, setNarrative] = useState('')
  const [businessModel, setBusinessModel] = useState<BusinessModel>('ecommerce')
  const [objective, setObjective] = useState<Objective>('sales')
  const [stage, setStage] = useState<Stage>('established')
  const [signals, setSignals] = useState<ProblemSignal[]>([])
  const [clarifications, setClarifications] = useState<Partial<Record<ClarificationId, string>>>({})
  const [readiness, setReadiness] = useState({offerReady: 'unknown' as Readiness, measurementReady: 'unknown' as Readiness, unitEconomicsReady: 'unknown' as Readiness, capacityReady: 'unknown' as Readiness, conversionPathReady: 'unknown' as Readiness})
  const [trafficState, setTrafficState] = useState<RouteInputs['trafficState']>('unknown')
  const [conversionState, setConversionState] = useState<RouteInputs['conversionState']>('unknown')
  const assessment = useMemo(() => analyzeNarrative(narrative), [narrative])

  const clarificationSignals = useMemo(() => assessment.clarificationIds.flatMap((id) => {
    const value = clarifications[id]
    return clarificationCopy[id].options.find((option) => option.value === value)?.signals || []
  }), [assessment.clarificationIds, clarifications])
  const finalSignals = useMemo(() => [...new Set([...signals, ...clarificationSignals])], [signals, clarificationSignals])
  const result = useMemo(() => buildRoute({businessModel, objective, stage, signals: finalSignals, ...readiness, trafficState, conversionState}), [businessModel, objective, stage, finalSignals, readiness, trafficState, conversionState])

  const toggleSignal = (signal: ProblemSignal) => setSignals((current) => current.includes(signal) ? current.filter((item) => item !== signal) : [...current, signal])
  const startVerification = () => { setSignals((current) => [...new Set([...current, ...assessment.suggestedSignals])]); setStep('verify') }
  const createRoute = () => {
    recordToolRun({
      tool: 'sellf-route',
      language: lang,
      input: {
        narrative: narrative.trim().slice(0, 4000),
        businessModel,
        objective,
        stage,
        signals: finalSignals,
        clarifications,
        readiness,
        trafficState,
        conversionState,
      },
      result: {
        confidenceScore: result.confidenceScore,
        diagnosis: result.diagnosis,
        route: result.items.map((item) => ({
          id: item.id,
          phase: item.phase,
          state: item.state,
          reasons: item.reasons,
          blockers: item.blockers,
        })),
        excluded: result.excluded,
      },
    })
    setStep('result')
  }
  const restart = () => {
    setNarrative('')
    setBusinessModel('ecommerce')
    setObjective('sales')
    setStage('established')
    setSignals([])
    setClarifications({})
    setReadiness({offerReady: 'unknown', measurementReady: 'unknown', unitEconomicsReady: 'unknown', capacityReady: 'unknown', conversionPathReady: 'unknown'})
    setTrafficState('unknown')
    setConversionState('unknown')
    setStep('brief')
  }
  const valueLabel = <T extends string>(options: Array<[T, Localized]>, value: T) => options.find(([id]) => id === value)?.[1][lang] || value
  const statusLabel = (state: RouteItemState) => state === 'required' ? t.required : state === 'next' ? t.next : t.blocked

  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.routeLine} /><div className="sellf-container">
        <Link href={`/${lang}/engage/tools`} className={styles.back}>← {t.back}</Link>
        <span className={styles.eyebrow}>{t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p>
        <div className={styles.badges}>{t.badges.map((badge) => <span key={badge}>✓ {badge}</span>)}</div>
      </div>
    </section>

    <section className={`sellf-container ${styles.workspace}`}>
      <nav className={styles.steps} aria-label="Progress"><span className={step === 'brief' ? styles.active : ''}>01</span><i /><span className={step === 'verify' ? styles.active : ''}>02</span><i /><span className={step === 'result' ? styles.active : ''}>03</span></nav>

      {step === 'brief' && <div className={styles.briefGrid}>
        <section className={styles.panel}><header><b>01</b><div><h2>{t.brief}</h2><p>{t.briefNote}</p></div></header>
          <label className={styles.narrative}><span>{lang === 'tr' ? 'Bugün neyi çözmek istiyorsunuz?' : 'What are you trying to solve today?'}</span><textarea value={narrative} onChange={(event) => setNarrative(event.target.value)} placeholder={t.placeholder} rows={7} /></label>
          {narrative.trim() && <div className={styles.interpretation}><span>{lang === 'tr' ? 'İlk okuma' : 'Initial read'}</span><strong>{assessment.clarificationIds.length ? (lang === 'tr' ? `${assessment.clarificationIds.length} ifade doğrulama gerektiriyor` : `${assessment.clarificationIds.length} statement(s) need clarification`) : assessment.suggestedSignals.length ? (lang === 'tr' ? 'Doğrulanabilir sinyaller bulundu' : 'Verifiable signals found') : (lang === 'tr' ? 'Metinden kesin sonuç çıkarılmadı' : 'No definite conclusion from the text')}</strong><small>{lang === 'tr' ? 'Henüz hiçbir hizmet seçilmedi.' : 'No service has been selected yet.'}</small></div>}
        </section>
        <aside className={styles.panel}><header><b>02</b><div><h2>{lang === 'tr' ? 'Temel bağlam' : 'Business context'}</h2><p>{lang === 'tr' ? 'Bu seçimler yanlış sektör varsayımını engeller.' : 'These choices prevent incorrect sector assumptions.'}</p></div></header>
          <Select label={t.model} value={businessModel} onChange={(value) => setBusinessModel(value as BusinessModel)} options={modelOptions.map(([id, label]) => [id, label[lang]])} />
          <Select label={t.objective} value={objective} onChange={(value) => setObjective(value as Objective)} options={objectiveOptions.map(([id, label]) => [id, label[lang]])} />
          <Select label={t.stage} value={stage} onChange={(value) => setStage(value as Stage)} options={stageOptions.map(([id, label]) => [id, label[lang]])} />
          <button className={styles.primary} onClick={startVerification}>{t.continue}</button>
        </aside>
      </div>}

      {step === 'verify' && <div className={styles.verifyLayout}>
        <section className={styles.panel}><header><b>02</b><div><h2>{t.verify}</h2><p>{t.verifyNote}</p></div></header>
          {assessment.clarificationIds.map((id) => <fieldset className={styles.clarification} key={id}><legend>{clarificationCopy[id].question[lang]}</legend>{clarificationCopy[id].options.map((option) => <label key={option.value}><input type="radio" name={id} checked={clarifications[id] === option.value} onChange={() => setClarifications((current) => ({...current, [id]: option.value}))} /><span>{option.label[lang]}</span></label>)}</fieldset>)}
          <div className={styles.group}><h3>{assessment.suggestedSignals.length ? t.detected : t.noneDetected}</h3><div className={styles.checkGrid}>{(Object.keys(signalLabels) as ProblemSignal[]).map((signal) => <label className={signals.includes(signal) ? styles.checked : ''} key={signal}><input type="checkbox" checked={signals.includes(signal)} onChange={() => toggleSignal(signal)} /><span>{signalLabels[signal][lang]}</span></label>)}</div></div>
          <div className={styles.group}><h3>{t.readiness}</h3><div className={styles.readinessGrid}>
            <CompactSelect label={t.offer} value={readiness.offerReady} setValue={(value) => setReadiness((current) => ({...current, offerReady: value}))} lang={lang} />
            <CompactSelect label={t.measurement} value={readiness.measurementReady} setValue={(value) => setReadiness((current) => ({...current, measurementReady: value}))} lang={lang} />
            <CompactSelect label={t.economics} value={readiness.unitEconomicsReady} setValue={(value) => setReadiness((current) => ({...current, unitEconomicsReady: value}))} lang={lang} />
            <CompactSelect label={t.capacity} value={readiness.capacityReady} setValue={(value) => setReadiness((current) => ({...current, capacityReady: value}))} lang={lang} />
            <CompactSelect label={t.path} value={readiness.conversionPathReady} setValue={(value) => setReadiness((current) => ({...current, conversionPathReady: value}))} lang={lang} />
            <Select label={t.traffic} value={trafficState} onChange={(value) => setTrafficState(value as RouteInputs['trafficState'])} options={[["low", lang === 'tr' ? 'Yetersiz' : 'Low'], ["adequate", lang === 'tr' ? 'Yeterli' : 'Adequate'], ["unknown", lang === 'tr' ? 'Bilmiyorum' : 'Unknown']]} compact />
            <Select label={t.conversion} value={conversionState} onChange={(value) => setConversionState(value as RouteInputs['conversionState'])} options={[["weak", lang === 'tr' ? 'Zayıf' : 'Weak'], ["healthy", lang === 'tr' ? 'Sağlıklı' : 'Healthy'], ["unknown", lang === 'tr' ? 'Bilmiyorum' : 'Unknown']]} compact />
          </div></div>
          <button className={styles.primary} disabled={assessment.clarificationIds.some((id) => !clarifications[id])} onClick={createRoute}>{t.create}</button>
        </section>
        <aside className={`${styles.panel} ${styles.summary}`}><span>{lang === 'tr' ? 'MEVCUT YORUM' : 'CURRENT INTERPRETATION'}</span><h3>{valueLabel(modelOptions, businessModel)}</h3><p>{valueLabel(objectiveOptions, objective)} · {valueLabel(stageOptions, stage)}</p><div>{finalSignals.length ? finalSignals.map((signal) => <b key={signal}>{signalLabels[signal][lang]}</b>) : <small>{lang === 'tr' ? 'Henüz doğrulanmış problem sinyali yok.' : 'No confirmed problem signal yet.'}</small>}</div><button onClick={() => setStep('brief')}>← {lang === 'tr' ? 'Anlatımı düzenle' : 'Edit description'}</button></aside>
      </div>}

      {step === 'result' && <div className={styles.resultLayout}>
        <section className={styles.routePanel}><div className={styles.resultHead}><div><span>03</span><h2>{t.result}</h2><p>{t.resultNote}</p></div><div className={styles.score}><strong>{result.confidenceScore}</strong><small>/100<br />{t.confidence}</small></div></div>
          {[1, 2, 3].map((phase) => {const phaseItems = result.items.filter((item) => item.phase === phase); if (!phaseItems.length) return null; return <div className={styles.phase} key={phase}><div className={styles.phaseLabel}><span>{t.phase} 0{phase}</span><i /></div><div className={styles.routeItems}>{phaseItems.map((item, index) => {const service = services[item.id]; return <article className={item.state === 'blocked' ? styles.blocked : ''} key={item.id}><em>{String(index + 1).padStart(2, '0')}</em><div><div className={styles.itemTitle}><h3>{service.title[lang]}</h3><span>{statusLabel(item.state)}</span></div><p>{service.summary[lang]}</p>{item.reasons.map((reason) => <small key={reason}>{reasonLabels[reason]?.[lang] || reason}</small>)}{item.blockers.length > 0 && <div className={styles.blockers}><b>{t.blockers}:</b>{item.blockers.map((blocker) => <span key={blocker}>{blockerLabels[blocker][lang]}</span>)}</div>}<Link href={`/${lang}/services/${service.href}`}>{lang === 'tr' ? 'Operasyonu incele' : 'Explore operation'} →</Link></div></article>})}</div></div>})}
        </section>
        <aside className={styles.resultSide}><section className={styles.panel}><span>{t.understood}</span><ul>{result.diagnosis.map((item) => <li key={item}>{diagnosisText(item, lang)}</li>)}</ul><button onClick={() => setStep('verify')}>← {t.edit}</button></section><section className={`${styles.panel} ${styles.excluded}`}><span>{t.excluded}</span><p>{t.excludedNote}</p><div>{result.excluded.slice(0, 5).map((id) => <b key={id}>{services[id].title[lang]}</b>)}</div></section><Link className={styles.contact} href={`/${lang}/contact`}>{t.contact}</Link><button className={styles.restart} onClick={restart}>{t.restart}</button></aside>
      </div>}
      {step === 'result' && <ToolReportDownload
        tool="sellf-route"
        language={lang}
        title={lang === 'tr' ? 'Sellf Route operasyon raporu' : 'Sellf Route operations report'}
        input={{narrative: narrative.trim().slice(0, 4000), businessModel: valueLabel(modelOptions, businessModel), objective: valueLabel(objectiveOptions, objective), stage: valueLabel(stageOptions, stage), signals: finalSignals.map((signal) => signalLabels[signal][lang]), readiness, trafficState, conversionState}}
        result={{confidenceScore: result.confidenceScore, diagnosis: result.diagnosis.map((item) => diagnosisText(item, lang)), route: result.items.map((item) => ({service: services[item.id].title[lang], summary: services[item.id].summary[lang], phase: item.phase, state: statusLabel(item.state), reasons: item.reasons.map((reason) => reasonLabels[reason]?.[lang] || reason), blockers: item.blockers.map((blocker) => blockerLabels[blocker][lang])})), excluded: result.excluded.map((id) => services[id].title[lang])}}
      />}
    </section>
  </main>
}

type RouteItemState = 'required' | 'next' | 'blocked'

function Select({label, value, onChange, options, compact = false}: {label: string; value: string; onChange: (value: string) => void; options: Array<[string, string]>; compact?: boolean}) {
  return <label className={compact ? styles.compactSelect : styles.select}><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map(([id, text]) => <option value={id} key={id}>{text}</option>)}</select></label>
}

function CompactSelect({label, value, setValue, lang}: {label: string; value: Readiness; setValue: (value: Readiness) => void; lang: Locale}) {
  return <Select label={label} value={value} onChange={(next) => setValue(next as Readiness)} options={readinessOptions.map(([id, text]) => [id, text[lang]])} compact />
}

function diagnosisText(value: string, lang: Locale) {
  const labels: Record<string, Localized> = {
    'commercial-foundation': {tr: 'Ölçeklemeden önce ticari ve finansal temel doğrulanmalı.', en: 'Commercial and financial foundations must be verified before scaling.'},
    'offer-before-acquisition': {tr: 'Yeni talep yaratmadan önce teklif netleştirilmeli.', en: 'The offer must be clear before creating new demand.'},
    'measurement-before-scale': {tr: 'Bütçe büyütülmeden önce ölçüm boşluğu kapatılmalı.', en: 'Measurement gaps must be closed before increasing spend.'},
    'capacity-before-scale': {tr: 'Operasyon kapasitesi büyüme hızını taşıyacak hâle gelmeli.', en: 'Operational capacity must be able to support growth.'},
    'acquisition-after-foundation': {tr: 'Edinim operasyonu temel sorunlar çözüldükten sonra başlamalı.', en: 'Acquisition should begin after foundational issues are resolved.'},
  }
  return labels[value]?.[lang] || value
}
