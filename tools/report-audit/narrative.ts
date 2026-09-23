import {getArea, getPurpose, type Locale, type MetricDefinition, type ReportAreaId, type ReportPurposeId} from './config.ts'

type NarrativeMetric = {
  key: string
  metric: MetricDefinition
  status: 'found' | 'missing' | 'unverified'
  required: boolean
}

export type NarrativeSignals = {
  period: boolean
  source: boolean
  comparison: boolean
  target: boolean
  segmentation: boolean
  action: boolean
  owner: boolean
  definition: boolean
  unit: boolean
}

export type NarrativeItem = {
  code: string
  title: string
  detail: string
}

export type NarrativeAction = NarrativeItem & {
  priority: 'now' | 'next' | 'monitor'
}

export type AuditNarrative = {
  verdict: {
    status: 'ready' | 'conditional' | 'not-ready' | 'review'
    title: string
    detail: string
  }
  strengths: NarrativeItem[]
  risks: NarrativeItem[]
  questions: NarrativeItem[]
  actions: NarrativeAction[]
}

type SignalKey = keyof NarrativeSignals

const purposeNeeds: Record<ReportPurposeId, {all: SignalKey[]; any?: SignalKey[]}> = {
  monitoring: {all: ['source', 'period'], any: ['comparison', 'target']},
  diagnosis: {all: ['comparison', 'segmentation', 'source']},
  allocation: {all: ['target', 'segmentation', 'source']},
  forecast: {all: ['period', 'comparison', 'target', 'source']},
  investment: {all: ['target', 'source']},
  executive: {all: ['source', 'action'], any: ['comparison', 'target']},
}

const purposeLens = {
  tr: {
    monitoring: 'dönemsel performansı güvenilir biçimde izlemek', diagnosis: 'sapmanın nedenini teşhis etmek', allocation: 'kaynakları doğru birimlere dağıtmak',
    forecast: 'gelecek dönem sonucunu öngörmek', investment: 'yatırımın ekonomik değerini değerlendirmek', executive: 'yönetimin net bir karar almasını sağlamak',
  },
  en: {
    monitoring: 'monitor periodic performance reliably', diagnosis: 'diagnose the cause of variance', allocation: 'allocate resources to the right units',
    forecast: 'forecast future outcomes', investment: 'evaluate the economics of an investment', executive: 'enable a clear management decision',
  },
} as const

const signalCopy = {
  tr: {
    period: ['Dönem tanımı net değil', 'Raporun hangi zaman aralığını temsil ettiği açık olmadığı için değişimin hızı ve güncelliği doğrulanamıyor.'],
    source: ['Veri izi doğrulanamıyor', 'Kaynak sistem ve veri güncelliği belirtilmediği için sonucun güvenilirliği bağımsız olarak kontrol edilemiyor.'],
    comparison: ['Değişimin yönü görünmüyor', 'Önceki dönem veya benchmark olmadan sonucun iyileşme mi bozulma mı olduğu söylenemez.'],
    target: ['Başarı eşiği tanımsız', 'Hedef veya bütçe bulunmadığı için gerçekleşen sonucun kabul edilebilir seviyesi bilinmiyor.'],
    segmentation: ['Toplam sonuç nedeni gizliyor', 'Kanal, bölge, ürün veya birim kırılımı olmadan performans farkının nereden geldiği ayrıştırılamıyor.'],
    action: ['Rapor uygulamaya bağlanmıyor', 'Bulgular öncelikli bir aksiyona dönüşmediği için rapor bilgi veriyor ancak yürütmeyi yönlendirmiyor.'],
    owner: ['Aksiyon sahipliği belirsiz', 'Sorumlu kişi veya ekip tanımlanmadığı için önerilerin takibi ve hesap verebilirliği zayıf kalıyor.'],
    definition: ['Metrik tanımları doğrulanmalı', 'Hesaplama yöntemi açık değilse aynı isimli metrikler farklı ekiplerde farklı sonuçlar üretebilir.'],
    unit: ['Ölçüm birimi belirsiz', 'Oran, tutar veya adet birimi belirtilmeyen değerler doğru yorumlanamaz.'],
  },
  en: {
    period: ['The reporting period is unclear', 'Without a defined date range, the pace and freshness of change cannot be verified.'],
    source: ['The data trail cannot be verified', 'Without a source system and freshness statement, the result cannot be independently validated.'],
    comparison: ['The direction of change is hidden', 'Without a prior period or benchmark, it is impossible to tell whether performance improved or deteriorated.'],
    target: ['The success threshold is undefined', 'Without a target or budget, the acceptable level of performance is unknown.'],
    segmentation: ['The total hides the cause', 'Without channel, region, product or unit breakdowns, the source of performance differences cannot be isolated.'],
    action: ['The report is not connected to execution', 'Findings do not translate into a priority action, so the report informs but does not direct execution.'],
    owner: ['Action ownership is unclear', 'Without a responsible person or team, follow-through and accountability remain weak.'],
    definition: ['Metric definitions need validation', 'If calculation methods are unclear, identically named metrics may produce different results across teams.'],
    unit: ['The measurement unit is unclear', 'Values without a rate, currency or count unit cannot be interpreted reliably.'],
  },
} as const

const purposeQuestions = {
  tr: {
    monitoring: 'Hangi sapma geçici, hangisi kalıcı bir performans değişimine işaret ediyor?',
    diagnosis: 'Sonuçtaki değişimin en büyük kısmını hangi kırılım ve hangi neden açıklıyor?',
    allocation: 'İlave bir birim kaynağın en yüksek marjinal katkıyı üreteceği alan hangisi?',
    forecast: 'Tahmini en fazla değiştiren varsayım nedir ve aşağı yönlü senaryoda ne olur?',
    investment: 'Beklenen geri dönüş hangi varsayıma en duyarlı ve kabul edilebilir geri ödeme eşiği nedir?',
    executive: 'Bu rapora dayanarak yönetimin şimdi onaylaması, durdurması veya değiştirmesi gereken karar nedir?',
  },
  en: {
    monitoring: 'Which variance is temporary, and which signals a persistent performance change?',
    diagnosis: 'Which breakdown and root cause explain the largest share of the change?',
    allocation: 'Where would one additional unit of resource create the highest marginal contribution?',
    forecast: 'Which assumption changes the forecast most, and what happens in the downside scenario?',
    investment: 'Which assumption drives the return most, and what is the acceptable payback threshold?',
    executive: 'Based on this report, what should management approve, stop or change now?',
  },
} as const

const areaQuestions: Record<ReportAreaId, {tr: string[]; en: string[]}> = {
  marketing: {
    tr: ['Hangi kanal gelir değil, katkı kârı ve yeni müşteri kalitesi üretiyor?', 'Edinme maliyeti ile müşteri yaşam boyu değeri birlikte nasıl değişiyor?'],
    en: ['Which channel creates contribution profit and customer quality, not just revenue?', 'How are acquisition cost and customer lifetime value moving together?'],
  },
  sales: {
    tr: ['Pipeline kaybı hangi aşamada yoğunlaşıyor ve temel kayıp nedeni nedir?', 'Mevcut pipeline hedefi karşılamak için yeterli kapsama ve kapanış hızına sahip mi?'],
    en: ['At which stage is pipeline leakage concentrated, and what is the primary loss reason?', 'Does the current pipeline have enough coverage and closing speed to reach target?'],
  },
  commerce: {
    tr: ['Net büyüme sipariş hacminden mi, sepet değerinden mi, yoksa fiyat etkisinden mi geliyor?', 'İade, stok yokluğu ve karşılama maliyeti brüt marjın ne kadarını tüketiyor?'],
    en: ['Is net growth driven by order volume, basket value or pricing?', 'How much gross margin is consumed by returns, stock-outs and fulfillment cost?'],
  },
  finance: {
    tr: ['Kârlılık neden aynı hızda nakde dönüşmüyor?', 'Bütçe sapmasının ne kadarı hacim, fiyat, maliyet veya zamanlama etkisinden geliyor?'],
    en: ['Why is profit not converting into cash at the same pace?', 'How much of the budget variance comes from volume, price, cost or timing?'],
  },
  operations: {
    tr: ['Teslimat performansı hangi bölge, rota veya operasyon biriminde bozuluyor?', 'Hız veya hacim artışı hasar, iade ya da birim maliyet pahasına mı elde ediliyor?'],
    en: ['Which region, route or operating unit is driving delivery deterioration?', 'Is higher speed or volume being achieved at the expense of damage, returns or unit cost?'],
  },
  project: {
    tr: ['Fiziksel ilerleme ile nakit çıkışı ve satış tahsilatı aynı hızda mı ilerliyor?', 'Takvim veya satış sapması finansman ihtiyacını ne kadar büyütüyor?'],
    en: ['Are physical progress, cash outflow and sales collections moving at the same pace?', 'How much are schedule or sales variances increasing the funding requirement?'],
  },
}

const actionCopy = {
  tr: {
    metric: (label: string) => [`${label} verisini tamamlayın`, `Bir sonraki raporda ${label.toLocaleLowerCase('tr-TR')} değerini dönem, hedef ve ilgili kırılımla birlikte gösterin.`],
    signal: (key: SignalKey) => {
      const map: Record<SignalKey, [string, string]> = {
        period: ['Rapor dönemini sabitleyin', 'Başlangıç-bitiş tarihini ve veri güncellik zamanını rapor başında belirtin.'],
        source: ['Veri kaynağını görünür kılın', 'Her ana metriğin kaynak sistemini, son güncelleme zamanını ve mümkünse hesaplama tanımını ekleyin.'],
        comparison: ['Karşılaştırma katmanı ekleyin', 'Ana metrikleri önceki dönem ve uygun bir benchmark ile yan yana gösterin.'],
        target: ['Hedef sapmasını gösterin', 'Gerçekleşen, hedef ve sapma değerlerini aynı görünümde sunun.'],
        segmentation: ['Sonucu anlamlı kırılımlara ayırın', 'Toplam sonucu kanal, bölge, ürün veya operasyon birimi düzeyinde ayrıştırın.'],
        action: ['Bulguyu karara dönüştürün', 'En fazla üç öncelikli aksiyonu beklenen etki ve zaman ufkuyla yazın.'],
        owner: ['Her aksiyona sahip atayın', 'Aksiyonların sorumlu ekip veya kişisini ve takip tarihini belirtin.'],
        definition: ['Metrik sözlüğü ekleyin', 'Kritik metriklerin formülünü, dahil edilen kalemleri ve veri sahibini tanımlayın.'],
        unit: ['Birimleri standartlaştırın', 'Tüm değerlerde para birimi, oran, adet ve dönem birimini açıkça kullanın.'],
      }
      return map[key]
    },
    maintain: ['Karar standardını koruyun', 'Aynı metrik tanımlarını ve karşılaştırma yapısını sonraki dönemlerde koruyarak trend sürekliliği sağlayın.'],
  },
  en: {
    metric: (label: string) => [`Complete ${label.toLowerCase()} data`, `In the next report, show ${label.toLowerCase()} together with its period, target and relevant breakdown.`],
    signal: (key: SignalKey) => {
      const map: Record<SignalKey, [string, string]> = {
        period: ['Fix the reporting period', 'State the start and end dates and the data refresh time at the beginning of the report.'],
        source: ['Make the data source visible', 'Add the source system, last refresh time and, where possible, the calculation definition for each core metric.'],
        comparison: ['Add a comparison layer', 'Show core metrics beside the previous period and a relevant benchmark.'],
        target: ['Show variance to target', 'Present actual, target and variance in the same view.'],
        segmentation: ['Break the result into meaningful segments', 'Separate the total by channel, region, product or operating unit.'],
        action: ['Turn findings into decisions', 'State no more than three priority actions with expected impact and time horizon.'],
        owner: ['Assign an owner to every action', 'State the responsible team or person and the follow-up date.'],
        definition: ['Add a metric dictionary', 'Define the formula, included items and data owner for critical metrics.'],
        unit: ['Standardize measurement units', 'Use currency, rate, count and period units consistently for all values.'],
      }
      return map[key]
    },
    maintain: ['Preserve the decision standard', 'Keep the same metric definitions and comparison structure in future periods to maintain trend continuity.'],
  },
} as const

function missingPurposeSignals(purpose: ReportPurposeId, signals: NarrativeSignals) {
  const need = purposeNeeds[purpose]
  const missing = need.all.filter((key) => !signals[key])
  if (need.any?.length && !need.any.some((key) => signals[key])) missing.push(need.any[0])
  return [...new Set(missing)]
}

export function buildAuditNarrative(input: {
  locale: Locale
  primaryArea: ReportAreaId
  purpose: ReportPurposeId
  evidenceUsable: boolean
  metrics: NarrativeMetric[]
  signals: NarrativeSignals
}): AuditNarrative {
  const {locale, primaryArea, purpose, evidenceUsable, metrics, signals} = input
  const area = getArea(primaryArea)
  const purposeDefinition = getPurpose(purpose)
  const required = metrics.filter((item) => item.required)
  const foundRequired = required.filter((item) => item.status === 'found')
  const missingRequired = required.filter((item) => item.status === 'missing')
  const foundContextual = metrics.filter((item) => !item.required && item.status === 'found')
  const missingContextual = metrics.filter((item) => !item.required && item.status === 'missing')
  const missingSignals = missingPurposeSignals(purpose, signals)
  const economicsMissing = purpose === 'investment' && missingContextual.length > 0
  const readinessGapCount = missingRequired.length + missingSignals.length + (economicsMissing ? 1 : 0)

  if (!evidenceUsable) {
    return {
      verdict: {
        status: 'review',
        title: locale === 'tr' ? 'Karar vermeden önce içerik doğrulanmalı.' : 'The content must be verified before making a decision.',
        detail: locale === 'tr'
          ? `${area.label.tr} raporu okunamadığı için metrikler eksik kabul edilmedi. Manuel kontrol tamamlandığında ${purposeLens.tr[purpose]} açısından değerlendirme üretilecek.`
          : `The ${area.label.en} report could not be read, so metrics were not treated as missing. Once manual review is complete, it will be assessed for its ability to ${purposeLens.en[purpose]}.`,
      },
      strengths: [], risks: [], questions: [], actions: [],
    }
  }

  const status = missingRequired.length >= Math.max(2, Math.ceil(required.length / 2))
    ? 'not-ready'
    : readinessGapCount > 0 ? 'conditional' : 'ready'

  const verdictTitle = locale === 'tr'
    ? status === 'ready' ? `Rapor ${purposeDefinition.label.tr.toLocaleLowerCase('tr-TR')} için karar vermeye hazır.`
      : status === 'conditional' ? 'Rapor kullanılabilir; ancak karar kapsamı sınırlı.'
        : 'Rapor henüz güvenli bir karar zemini oluşturmuyor.'
    : status === 'ready' ? `The report is decision-ready for ${purposeDefinition.label.en.toLowerCase()}.`
      : status === 'conditional' ? 'The report is usable, but its decision scope is limited.'
        : 'The report does not yet provide a safe basis for decision-making.'

  const verdictDetail = locale === 'tr'
    ? `${required.length} zorunlu metriğin ${foundRequired.length} tanesi doğrulandı. ${missingRequired.length
      ? `${missingRequired.map((item) => item.metric.label.tr).join(', ')} tamamlanmadan ${purposeLens.tr[purpose]} riskli kalır.`
      : missingSignals.length ? `${missingSignals.map((key) => signalCopy.tr[key][0].toLocaleLowerCase('tr-TR')).join(' ve ')} nedeniyle ${purposeLens.tr[purpose]} sınırlı kalıyor.`
        : economicsMissing ? `Temel kapsam tamam; ancak ${missingContextual.slice(0, 3).map((item) => item.metric.label.tr).join(', ')} olmadan ${purposeLens.tr[purpose]} sınırlı kalıyor.`
        : `Metrik kapsamı ve karar bağlamı ${purposeLens.tr[purpose]} için yeterli.`}`
    : `${foundRequired.length} of ${required.length} required metrics were verified. ${missingRequired.length
      ? `${missingRequired.map((item) => item.metric.label.en).join(', ')} must be completed before it is safe to ${purposeLens.en[purpose]}.`
      : missingSignals.length ? `${missingSignals.map((key) => signalCopy.en[key][0].toLowerCase()).join(' and ')} limit the ability to ${purposeLens.en[purpose]}.`
        : economicsMissing ? `Core coverage is complete, but without ${missingContextual.slice(0, 3).map((item) => item.metric.label.en).join(', ')}, the ability to ${purposeLens.en[purpose]} remains limited.`
        : `Metric coverage and decision context are sufficient to ${purposeLens.en[purpose]}.`}`

  const strengths: NarrativeItem[] = []
  if (foundRequired.length === required.length && required.length) strengths.push({
    code: 'core-coverage',
    title: locale === 'tr' ? 'Temel kanıt seti eksiksiz' : 'The core evidence set is complete',
    detail: locale === 'tr' ? `${area.label.tr} alanındaki zorunlu metriklerin tamamı raporda bulunuyor.` : `All required ${area.label.en} metrics are present in the report.`,
  })
  if (signals.comparison && signals.target) strengths.push({
    code: 'reference-strength',
    title: locale === 'tr' ? 'Performansın referans noktası var' : 'Performance has a clear reference point',
    detail: locale === 'tr' ? 'Önceki dönem ve hedef birlikte görüldüğü için sapmanın yönü ve büyüklüğü yorumlanabilir.' : 'Both prior-period and target comparisons make the direction and size of variance interpretable.',
  })
  if (signals.segmentation) strengths.push({
    code: 'segmentation-strength',
    title: locale === 'tr' ? 'Sonucun kaynağı ayrıştırılabilir' : 'The source of the result can be isolated',
    detail: locale === 'tr' ? 'Kırılımlar toplam performansın hangi kanal, bölge, ürün veya birimden geldiğini görünür kılıyor.' : 'Breakdowns reveal which channel, region, product or unit drives total performance.',
  })
  if (signals.action && signals.owner) strengths.push({
    code: 'execution-strength',
    title: locale === 'tr' ? 'Rapor yürütmeye bağlanıyor' : 'The report connects to execution',
    detail: locale === 'tr' ? 'Aksiyon ve sahiplik birlikte tanımlandığı için bulgular takip edilebilir.' : 'Actions and ownership are both defined, making findings traceable.',
  })
  if (foundContextual.length) strengths.push({
    code: 'decision-depth',
    title: locale === 'tr' ? 'Karar derinliği destekleniyor' : 'Decision depth is supported',
    detail: locale === 'tr' ? `${foundContextual.slice(0, 3).map((item) => item.metric.label.tr).join(', ')} temel sonuçların ötesinde ek karar bağlamı sağlıyor.` : `${foundContextual.slice(0, 3).map((item) => item.metric.label.en).join(', ')} add decision context beyond the core results.`,
  })

  const risks: NarrativeItem[] = missingRequired.slice(0, 3).map((item) => ({
    code: `metric-risk:${item.key}`,
    title: locale === 'tr' ? `${item.metric.label.tr} olmadan karar kör noktası oluşuyor` : `${item.metric.label.en} creates a decision blind spot`,
    detail: item.metric.rationale[locale],
  }))
  missingSignals.slice(0, Math.max(1, 4 - risks.length)).forEach((key) => risks.push({
    code: `signal-risk:${key}`,
    title: signalCopy[locale][key][0],
    detail: signalCopy[locale][key][1],
  }))
  if (economicsMissing && risks.length < 4) risks.push({
    code: 'investment-economics-risk',
    title: locale === 'tr' ? 'Yatırımın ekonomik sonucu tamamlanmamış' : 'The investment economics are incomplete',
    detail: locale === 'tr'
      ? `${missingContextual.slice(0, 3).map((item) => item.metric.label.tr).join(', ')} olmadan yatırımın geri dönüşü, zaman ufku veya artımsal etkisi doğrulanamıyor.`
      : `Without ${missingContextual.slice(0, 3).map((item) => item.metric.label.en).join(', ')}, return, time horizon or incremental impact cannot be validated.`,
  })
  if (!risks.length && !signals.definition) risks.push({
    code: 'definition-risk', title: signalCopy[locale].definition[0], detail: signalCopy[locale].definition[1],
  })
  if (!risks.length) risks.push({
    code: 'residual-risk',
    title: locale === 'tr' ? 'Ana risk metrik tutarlılığı' : 'The main residual risk is metric consistency',
    detail: locale === 'tr' ? 'Sonuç güçlü olsa da aynı tanım, kaynak ve dönem yapısının sonraki raporlarda korunması gerekir.' : 'The result is strong, but future reports must preserve the same definitions, sources and periods.',
  })

  const questions: NarrativeItem[] = [
    {code: `purpose-question:${purpose}`, title: purposeQuestions[locale][purpose], detail: locale === 'tr' ? `${purposeDefinition.label.tr} açısından ilk yönetim sorusu.` : `The first management question for ${purposeDefinition.label.en.toLowerCase()}.`},
    ...areaQuestions[primaryArea][locale].map((question, index) => ({code: `area-question:${index}`, title: question, detail: area.description[locale]})),
  ]
  if (missingRequired[0]) questions.push({
    code: `missing-question:${missingRequired[0].key}`,
    title: locale === 'tr' ? `${missingRequired[0].metric.label.tr} eklendiğinde mevcut yorum değişir mi?` : `Would the current interpretation change if ${missingRequired[0].metric.label.en.toLowerCase()} were added?`,
    detail: missingRequired[0].metric.rationale[locale],
  })

  const actions: NarrativeAction[] = []
  missingRequired.slice(0, 2).forEach((item) => {
    const [title, detail] = actionCopy[locale].metric(item.metric.label[locale])
    actions.push({code: `metric-action:${item.key}`, priority: 'now', title, detail})
  })
  missingSignals.slice(0, Math.max(1, 3 - actions.length)).forEach((key, index) => {
    const [title, detail] = actionCopy[locale].signal(key)
    actions.push({code: `signal-action:${key}`, priority: index === 0 && !actions.length ? 'now' : 'next', title, detail})
  })
  if (economicsMissing && actions.length < 4) actions.push({
    code: 'investment-economics-action',
    priority: 'next',
    title: locale === 'tr' ? 'Yatırım ekonomisi katmanını tamamlayın' : 'Complete the investment economics layer',
    detail: locale === 'tr'
      ? `${missingContextual.slice(0, 3).map((item) => item.metric.label.tr).join(', ')} değerlerini hedef ve aşağı yönlü senaryoyla birlikte gösterin.`
      : `Show ${missingContextual.slice(0, 3).map((item) => item.metric.label.en).join(', ')} together with the target and downside scenario.`,
  })
  if (!signals.owner && signals.action && actions.length < 4) {
    const [title, detail] = actionCopy[locale].signal('owner')
    actions.push({code: 'owner-action', priority: 'next', title, detail})
  }
  if (actions.length < 3) {
    const [title, detail] = actionCopy[locale].maintain
    actions.push({code: 'maintain-action', priority: 'monitor', title, detail})
  }

  return {verdict: {status, title: verdictTitle, detail: verdictDetail}, strengths: strengths.slice(0, 4), risks: risks.slice(0, 4), questions: questions.slice(0, 4), actions: actions.slice(0, 4)}
}
