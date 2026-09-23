import {getArea, reportAreas, type Locale, type MetricDefinition, type ReportAreaId, type ReportPurposeId} from './config.ts'
import {buildAuditNarrative, type AuditNarrative} from './narrative.ts'

export type AuditContext = {
  periodDefined: boolean
  sourceDefined: boolean
  comparisonIncluded: boolean
  targetIncluded: boolean
  segmented: boolean
  actionsIncluded: boolean
  ownersIncluded: boolean
  visualHierarchy: boolean
  labelsClear: boolean
}

export type AuditInput = {
  locale: Locale
  primaryArea: ReportAreaId
  secondaryAreas: ReportAreaId[]
  purpose: ReportPurposeId
  reportText: string
  confirmedMetricIds: string[]
  excludedMetricIds: string[]
  readable: boolean
  reviewComplete: boolean
  context: AuditContext
}

export type MetricAssessment = {
  key: string
  areaId: ReportAreaId
  metric: MetricDefinition
  status: 'found' | 'missing' | 'unverified'
  source: 'detected' | 'confirmed' | 'none'
  required: boolean
}

export type AuditFinding = {
  code: string
  severity: 'critical' | 'important' | 'improvement' | 'positive' | 'verification'
  title: string
  detail: string
}

export type AuditResult = {
  score: number | null
  dimensions: {
    dataReliability: number | null
    context: number | null
    domainCompleteness: number | null
    decisionUsefulness: number | null
    presentation: number | null
  }
  confidence: 'high' | 'medium' | 'needs-review'
  metrics: MetricAssessment[]
  findings: AuditFinding[]
  narrative: AuditNarrative
  detectedCount: number
  requiredCount: number
  missingRequiredCount: number
}

const trMap: Record<string, string> = {ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u'}

export function normalizeReportText(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .replace(/[çğıöşü]/g, (character) => trMap[character] ?? character)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9%₺$€£]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function includesAlias(text: string, alias: string) {
  const normalizedAlias = normalizeReportText(alias)
  if (!normalizedAlias) return false
  return ` ${text} `.includes(` ${normalizedAlias} `)
}

function hasAny(text: string, aliases: string[]) {
  return aliases.some((alias) => includesAlias(text, alias))
}

function metricKey(areaId: ReportAreaId, metricId: string) {
  return `${areaId}:${metricId}`
}

const universalSignals = {
  period: ['donem', 'tarih araligi', 'rapor tarihi', 'aylik', 'haftalik', 'ceyrek', 'month', 'period', 'date range', 'weekly', 'quarter'],
  source: ['veri kaynagi', 'kaynak', 'data source', 'source', 'crm', 'erp', 'ga4'],
  comparison: ['onceki donem', 'gecen ay', 'gecen yil', 'degisim', 'vs', 'versus', 'previous period', 'last month', 'last year', 'change'],
  target: ['hedef', 'butce', 'plan', 'target', 'budget', 'plan'],
  segmentation: ['kanal bazinda', 'bolge bazinda', 'sube bazinda', 'urun bazinda', 'segment', 'by channel', 'by region', 'by store', 'by product'],
  action: ['aksiyon', 'onerilen adim', 'sonraki adim', 'action', 'next step', 'recommendation'],
  owner: ['sorumlu', 'aksiyon sahibi', 'owner', 'responsible'],
  definition: ['tanim', 'metodoloji', 'hesaplama', 'definition', 'methodology', 'calculation'],
  unit: ['%', '₺', '$', '€', '£', 'oran', 'tutar', 'adet', 'rate', 'amount', 'count'],
}

function relevantMetrics(primaryArea: ReportAreaId, secondaryAreas: ReportAreaId[], purpose: ReportPurposeId) {
  const areaIds = [primaryArea, ...secondaryAreas.filter((areaId) => areaId !== primaryArea).slice(0, 2)]
  return areaIds.flatMap((areaId, areaIndex) => getArea(areaId).metrics
    .filter((metric) => metric.priority === 'required' || !metric.purposes || metric.purposes.includes(purpose))
    .map((metric) => ({areaId, metric, required: areaIndex === 0 && metric.priority === 'required'})))
}

const copy = {
  tr: {
    unreadableTitle: 'İçerik doğrulaması gerekli',
    unreadableDetail: 'Dosyanın içeriği güvenle okunamadığı için metrikler eksik olarak işaretlenmedi. Tespitleri manuel doğrulayın veya metni ekleyin.',
    missingMetric: (label: string) => `${label} eksik`,
    missingMetricDetail: (rationale: string) => `Bu rapor alanı ve amacı için gerekli. ${rationale}`,
    contextualMetric: (label: string) => `${label} değerlendirmeyi güçlendirir`,
    contextualMetricDetail: (rationale: string) => `Bu rapor amacı için bağlamsal olarak önerilir. ${rationale}`,
    comparisonTitle: 'Karşılaştırma zemini eksik',
    comparisonDetail: 'Sonucun iyi veya kötü olduğunu söylemek için önceki dönem, hedef, bütçe veya benchmark gerekir.',
    sourceTitle: 'Veri kaynağı belirsiz',
    sourceDetail: 'Kaynak ve güncellik belirtilmeden rapor sonuçlarının güvenilirliği doğrulanamaz.',
    actionTitle: 'Rapor aksiyona bağlanmıyor',
    actionDetail: 'En az bir öncelikli aksiyon ve mümkünse sorumlu kişi veya ekip belirtilmeli.',
    positiveTitle: 'Temel metrik kapsamı güçlü',
    positiveDetail: 'Seçilen ana alanın zorunlu metrikleri raporda bulunuyor.',
  },
  en: {
    unreadableTitle: 'Content verification required',
    unreadableDetail: 'The file could not be read reliably, so metrics were not marked as missing. Confirm the detections manually or add the report text.',
    missingMetric: (label: string) => `${label} is missing`,
    missingMetricDetail: (rationale: string) => `It is required for this report area and purpose. ${rationale}`,
    contextualMetric: (label: string) => `${label} would strengthen the analysis`,
    contextualMetricDetail: (rationale: string) => `It is contextually recommended for this report purpose. ${rationale}`,
    comparisonTitle: 'No basis for comparison',
    comparisonDetail: 'A previous period, target, budget or benchmark is needed to judge whether the result is good or bad.',
    sourceTitle: 'Data source is unclear',
    sourceDetail: 'The reliability of results cannot be verified without a source and freshness statement.',
    actionTitle: 'The report does not lead to action',
    actionDetail: 'Include at least one priority action and, where possible, a responsible person or team.',
    positiveTitle: 'Strong core metric coverage',
    positiveDetail: 'All required metrics for the selected primary area are present.',
  },
} as const

export function detectMetrics(reportText: string, areaIds: ReportAreaId[] = reportAreas.map((area) => area.id)) {
  const text = normalizeReportText(reportText)
  return reportAreas
    .filter((area) => areaIds.includes(area.id))
    .flatMap((area) => area.metrics
      .filter((metric) => metric.aliases.some((alias) => includesAlias(text, alias)))
      .map((metric) => metricKey(area.id, metric.id)))
}

export function auditReport(input: AuditInput): AuditResult {
  const t = copy[input.locale]
  const text = normalizeReportText(input.reportText)
  const detected = new Set(detectMetrics(input.reportText, [input.primaryArea, ...input.secondaryAreas]))
  const confirmed = new Set(input.confirmedMetricIds)
  const excluded = new Set(input.excludedMetricIds)
  const evidenceUsable = input.readable || input.reviewComplete
  const selectedMetrics = relevantMetrics(input.primaryArea, input.secondaryAreas, input.purpose)

  const metrics: MetricAssessment[] = selectedMetrics.map(({areaId, metric, required}) => {
    const key = metricKey(areaId, metric.id)
    const source = confirmed.has(key) ? 'confirmed' : detected.has(key) && !excluded.has(key) ? 'detected' : 'none'
    return {key, areaId, metric, required, source, status: source !== 'none' ? 'found' : evidenceUsable ? 'missing' : 'unverified'}
  })

  const signal = (key: keyof typeof universalSignals, manual: boolean) => manual || hasAny(text, universalSignals[key])
  const contextState = {
    period: signal('period', input.context.periodDefined),
    source: signal('source', input.context.sourceDefined),
    comparison: signal('comparison', input.context.comparisonIncluded),
    target: signal('target', input.context.targetIncluded),
    segmentation: signal('segmentation', input.context.segmented),
    action: signal('action', input.context.actionsIncluded),
    owner: signal('owner', input.context.ownersIncluded),
    definition: hasAny(text, universalSignals.definition),
    unit: hasAny(text, universalSignals.unit),
  }

  const requiredMetrics = metrics.filter((item) => item.required)
  const contextualMetrics = metrics.filter((item) => !item.required)
  const foundRequired = requiredMetrics.filter((item) => item.status === 'found').length
  const foundContextual = contextualMetrics.filter((item) => item.status === 'found').length

  const dimensions = evidenceUsable ? {
    dataReliability: Math.round((contextState.source ? 8 : 0) + (contextState.period ? 6 : 0) + (contextState.definition ? 5 : 0) + (contextState.unit ? 6 : 0)),
    context: Math.round((contextState.comparison ? 8 : 0) + (contextState.target ? 6 : 0) + (contextState.segmentation ? 6 : 0)),
    domainCompleteness: Math.round((requiredMetrics.length ? foundRequired / requiredMetrics.length * 22 : 22) + (contextualMetrics.length ? foundContextual / contextualMetrics.length * 8 : 8)),
    decisionUsefulness: Math.round((contextState.action ? 8 : 0) + (contextState.owner ? 3 : 0) + (contextState.target || contextState.comparison ? 4 : 0)),
    presentation: Math.round((input.context.visualHierarchy ? 5 : 0) + (input.context.labelsClear ? 5 : 0)),
  } : {dataReliability: null, context: null, domainCompleteness: null, decisionUsefulness: null, presentation: null}

  const score = evidenceUsable
    ? Object.values(dimensions).reduce<number>((sum, value) => sum + (value ?? 0), 0)
    : null

  const findings: AuditFinding[] = []
  if (!evidenceUsable) findings.push({code: 'verification-required', severity: 'verification', title: t.unreadableTitle, detail: t.unreadableDetail})

  metrics.filter((item) => item.status === 'missing' && item.required).forEach((item) => findings.push({
    code: `missing:${item.key}`,
    severity: 'critical',
    title: t.missingMetric(item.metric.label[input.locale]),
    detail: t.missingMetricDetail(item.metric.rationale[input.locale]),
  }))

  metrics.filter((item) => item.status === 'missing' && !item.required).forEach((item) => findings.push({
    code: `contextual:${item.key}`,
    severity: 'improvement',
    title: t.contextualMetric(item.metric.label[input.locale]),
    detail: t.contextualMetricDetail(item.metric.rationale[input.locale]),
  }))

  if (evidenceUsable && !contextState.comparison && !contextState.target) findings.push({code: 'comparison', severity: 'important', title: t.comparisonTitle, detail: t.comparisonDetail})
  if (evidenceUsable && !contextState.source) findings.push({code: 'source', severity: 'important', title: t.sourceTitle, detail: t.sourceDetail})
  if (evidenceUsable && !contextState.action) findings.push({code: 'action', severity: 'important', title: t.actionTitle, detail: t.actionDetail})
  if (evidenceUsable && requiredMetrics.length > 0 && foundRequired === requiredMetrics.length) findings.unshift({code: 'coverage-positive', severity: 'positive', title: t.positiveTitle, detail: t.positiveDetail})

  const confirmedShare = metrics.length ? metrics.filter((item) => item.source === 'confirmed').length / metrics.length : 0
  const confidence = !evidenceUsable ? 'needs-review' : confirmedShare >= .5 || (input.readable && text.length >= 400) ? 'high' : 'medium'
  const narrative = buildAuditNarrative({
    locale: input.locale,
    primaryArea: input.primaryArea,
    purpose: input.purpose,
    evidenceUsable,
    metrics,
    signals: contextState,
  })

  return {
    score,
    dimensions,
    confidence,
    metrics,
    findings,
    narrative,
    detectedCount: metrics.filter((item) => item.status === 'found').length,
    requiredCount: requiredMetrics.length,
    missingRequiredCount: requiredMetrics.filter((item) => item.status === 'missing').length,
  }
}
