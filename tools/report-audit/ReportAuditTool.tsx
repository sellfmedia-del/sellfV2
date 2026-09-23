'use client'

import {useDeferredValue, useMemo, useRef, useState, type CSSProperties} from 'react'
import {auditReport, detectMetrics, type AuditContext} from './engine'
import {getArea, getPurpose, reportAreas, reportPurposes, type Locale, type ReportAreaId, type ReportPurposeId} from './config'
import styles from './report-audit.module.css'

const copy = {
  tr: {
    back: 'Tüm tool’lara dön', eyebrow: 'SELLF ENGAGE / REPORT AUDIT',
    title: 'Raporun ne gösterdiğini değil, hangi kararı gerçekten desteklediğini görün.',
    intro: 'Rapor alanını ve amacını seçin. Tool yalnızca ilgili metrikleri değerlendirir; uygulanamaz metrikleri eksik olarak işaretlemez.',
    areaTitle: 'Rapor alanı', areaIntro: 'Ana değerlendirme çerçevesini seçin.',
    secondaryTitle: 'Destekleyici alanlar', secondaryIntro: 'Karma yönetim raporları için en fazla iki ek alan seçebilirsiniz.',
    purposeTitle: 'Raporun amacı', purposeIntro: 'Aynı metrik, farklı kararlar için farklı önem taşıyabilir.',
    uploadTitle: 'Raporu ekleyin', upload: 'Dosya seçin veya buraya bırakın',
    uploadNote: 'CSV, TSV, TXT, JSON, Markdown ve HTML doğrudan okunur. PDF, Excel ve PowerPoint dosyalarında metrikleri aşağıdan doğrulayabilirsiniz.',
    selectedFile: 'Seçilen dosya', readable: 'Metin başarıyla okundu', manualReview: 'Manuel doğrulama gerekli', readError: 'Dosya okunamadı; metrikleri manuel doğrulayın',
    pasteLabel: 'Rapor metni veya kolon başlıkları', pastePlaceholder: 'Rapor metnini, KPI listesini ya da tablo başlıklarını buraya yapıştırabilirsiniz…',
    metricTitle: 'Metrik doğrulaması', metricIntro: 'Otomatik bulunan metrikleri kontrol edin; raporda bulunan diğer metrikleri işaretleyin.',
    reviewComplete: 'Manuel metrik kontrolünü tamamladım',
    required: 'Zorunlu', contextual: 'Bağlamsal', supporting: 'Destekleyici alan', detected: 'Otomatik bulundu',
    contextTitle: 'Rapor bağlamı', contextIntro: 'Dosyada açıkça bulunan veya sizin doğrulayabildiğiniz maddeleri işaretleyin.',
    resultTitle: 'Audit sonucu', waiting: 'Dosya ekleyin, metin yapıştırın veya metrikleri doğrulayın.',
    score: 'Rapor sağlığı', confidence: 'Analiz güveni', high: 'Yüksek', medium: 'Orta', needsReview: 'Doğrulama gerekli',
    detectedCount: 'Bulunan metrik', requiredCount: 'Zorunlu metrik', missingCount: 'Kritik eksik', findings: 'Öncelikli bulgular',
    verdict: 'Genel hüküm', strengths: 'Güçlü yönler', risks: 'Kritik riskler ve eksikler', questions: 'Yönetimin sorması gerekenler', actions: 'Öncelikli aksiyon planı',
    now: 'Şimdi', next: 'Sonraki adım', monitor: 'İzle',
    noFindings: 'Kritik bir eksik tespit edilmedi.', critical: 'Kritik', important: 'Önemli', improvement: 'İyileştirme', positive: 'Güçlü', verification: 'Doğrulama',
    dimensions: {dataReliability: 'Veri güvenilirliği', context: 'Bağlam ve karşılaştırma', domainCompleteness: 'Alan metrikleri', decisionUsefulness: 'Karar üretme gücü', presentation: 'Sunum netliği'},
    contextLabels: {
      periodDefined: 'Dönem ve kapsam açık', sourceDefined: 'Veri kaynağı ve güncellik belirtilmiş', comparisonIncluded: 'Önceki dönem veya benchmark var',
      targetIncluded: 'Hedef veya bütçe karşılaştırması var', segmented: 'Kanal, bölge, ürün veya birim kırılımı var', actionsIncluded: 'Öncelikli aksiyonlar belirtilmiş',
      ownersIncluded: 'Aksiyon sahipleri belirtilmiş', visualHierarchy: 'Görsel hiyerarşi anlaşılır', labelsClear: 'Grafik ve tablo etiketleri açık',
    },
  },
  en: {
    back: 'Back to all tools', eyebrow: 'SELLF ENGAGE / REPORT AUDIT',
    title: 'See not only what the report shows, but which decision it can actually support.',
    intro: 'Choose the report area and purpose. The tool evaluates only relevant metrics and never marks inapplicable metrics as missing.',
    areaTitle: 'Report area', areaIntro: 'Choose the primary evaluation framework.',
    secondaryTitle: 'Supporting areas', secondaryIntro: 'Select up to two additional areas for mixed management reports.',
    purposeTitle: 'Report purpose', purposeIntro: 'The same metric can carry different weight for different decisions.',
    uploadTitle: 'Add the report', upload: 'Choose a file or drop it here',
    uploadNote: 'CSV, TSV, TXT, JSON, Markdown and HTML are read directly. For PDF, Excel and PowerPoint files, confirm the metrics below.',
    selectedFile: 'Selected file', readable: 'Text read successfully', manualReview: 'Manual verification required', readError: 'The file could not be read; verify the metrics manually',
    pasteLabel: 'Report text or column headers', pastePlaceholder: 'Paste report text, KPI lists or table headers here…',
    metricTitle: 'Metric verification', metricIntro: 'Review automatically detected metrics and select any others present in the report.',
    reviewComplete: 'I completed the manual metric review',
    required: 'Required', contextual: 'Contextual', supporting: 'Supporting area', detected: 'Auto-detected',
    contextTitle: 'Report context', contextIntro: 'Select items clearly present in the file or that you can verify.',
    resultTitle: 'Audit result', waiting: 'Add a file, paste text or confirm metrics.',
    score: 'Report health', confidence: 'Analysis confidence', high: 'High', medium: 'Medium', needsReview: 'Review required',
    detectedCount: 'Metrics found', requiredCount: 'Required metrics', missingCount: 'Critical gaps', findings: 'Priority findings',
    verdict: 'Overall verdict', strengths: 'Strengths', risks: 'Critical risks and gaps', questions: 'Questions management should ask', actions: 'Priority action plan',
    now: 'Now', next: 'Next', monitor: 'Monitor',
    noFindings: 'No critical gap was detected.', critical: 'Critical', important: 'Important', improvement: 'Improvement', positive: 'Strong', verification: 'Verification',
    dimensions: {dataReliability: 'Data reliability', context: 'Context and comparison', domainCompleteness: 'Domain metrics', decisionUsefulness: 'Decision usefulness', presentation: 'Presentation clarity'},
    contextLabels: {
      periodDefined: 'Period and scope are clear', sourceDefined: 'Data source and freshness are stated', comparisonIncluded: 'Previous period or benchmark is included',
      targetIncluded: 'Target or budget comparison is included', segmented: 'Channel, region, product or unit breakdown exists', actionsIncluded: 'Priority actions are stated',
      ownersIncluded: 'Action owners are stated', visualHierarchy: 'Visual hierarchy is clear', labelsClear: 'Chart and table labels are clear',
    },
  },
} as const

const emptyContext: AuditContext = {
  periodDefined: false, sourceDefined: false, comparisonIncluded: false, targetIncluded: false, segmented: false,
  actionsIncluded: false, ownersIncluded: false, visualHierarchy: false, labelsClear: false,
}

const directTextExtensions = ['csv', 'tsv', 'txt', 'json', 'md', 'html', 'htm']
const dimensionMaximums = {dataReliability: 25, context: 20, domainCompleteness: 30, decisionUsefulness: 15, presentation: 10} as const

export default function ReportAuditTool({lang}: {lang: Locale}) {
  const t = copy[lang]
  const fileInput = useRef<HTMLInputElement>(null)
  const [primaryArea, setPrimaryArea] = useState<ReportAreaId>('marketing')
  const [secondaryAreas, setSecondaryAreas] = useState<ReportAreaId[]>([])
  const [purpose, setPurpose] = useState<ReportPurposeId>('monitoring')
  const [reportText, setReportText] = useState('')
  const [fileName, setFileName] = useState('')
  const [readable, setReadable] = useState(false)
  const [fileReadFailed, setFileReadFailed] = useState(false)
  const [reviewComplete, setReviewComplete] = useState(false)
  const [confirmedMetrics, setConfirmedMetrics] = useState<string[]>([])
  const [excludedMetrics, setExcludedMetrics] = useState<string[]>([])
  const [context, setContext] = useState<AuditContext>(emptyContext)
  const deferredReportText = useDeferredValue(reportText)

  const selectedAreaIds = useMemo(() => [primaryArea, ...secondaryAreas], [primaryArea, secondaryAreas])
  const detectedMetrics = useMemo(() => new Set(detectMetrics(deferredReportText, selectedAreaIds)), [deferredReportText, selectedAreaIds])
  const result = useMemo(() => auditReport({
    locale: lang, primaryArea, secondaryAreas, purpose, reportText: deferredReportText, confirmedMetricIds: confirmedMetrics,
    excludedMetricIds: excludedMetrics, readable, reviewComplete, context,
  }), [lang, primaryArea, secondaryAreas, purpose, deferredReportText, confirmedMetrics, excludedMetrics, readable, reviewComplete, context])

  const resetEvidence = () => {
    setConfirmedMetrics([])
    setExcludedMetrics([])
    setReviewComplete(false)
  }

  const selectPrimaryArea = (areaId: ReportAreaId) => {
    setPrimaryArea(areaId)
    setSecondaryAreas((current) => current.filter((id) => id !== areaId))
    resetEvidence()
  }

  const toggleSecondaryArea = (areaId: ReportAreaId) => {
    setSecondaryAreas((current) => current.includes(areaId) ? current.filter((id) => id !== areaId) : current.length < 2 ? [...current, areaId] : current)
    resetEvidence()
  }

  const changePurpose = (nextPurpose: ReportPurposeId) => {
    setPurpose(nextPurpose)
    resetEvidence()
  }

  const loadFile = async (file?: File) => {
    if (!file) return
    setFileName(file.name)
    setFileReadFailed(false)
    setReportText('')
    setReadable(false)
    resetEvidence()
    const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
    if (!directTextExtensions.includes(extension)) {
      return
    }
    try {
      const raw = await file.text()
      const parsed = extension === 'html' || extension === 'htm' ? new DOMParser().parseFromString(raw, 'text/html').body.textContent ?? '' : raw
      setReportText(parsed)
      setReadable(parsed.trim().length > 0)
    } catch {
      setFileReadFailed(true)
    }
  }

  const toggleMetric = (key: string, checked: boolean) => {
    if (checked) {
      setConfirmedMetrics((current) => current.includes(key) ? current : [...current, key])
      setExcludedMetrics((current) => current.filter((item) => item !== key))
    } else {
      setConfirmedMetrics((current) => current.filter((item) => item !== key))
      setExcludedMetrics((current) => current.includes(key) ? current : [...current, key])
    }
  }

  const hasEvidence = readable || reviewComplete
  const confidenceLabel = result.confidence === 'high' ? t.high : result.confidence === 'medium' ? t.medium : t.needsReview

  return <main className={styles.page}>
    <section className={styles.hero}><div className={styles.heroGlow} /><div className="sellf-container">
      <a href={`/${lang}/engage/tools`} className={styles.back}>← {t.back}</a>
      <span className={styles.eyebrow}>{t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p>
    </div></section>

    <div className={`sellf-container ${styles.workspace}`}>
      <section className={styles.setupPanel}>
        <header className={styles.sectionHeading}><span>01</span><div><h2>{t.areaTitle}</h2><p>{t.areaIntro}</p></div></header>
        <div className={styles.areaGrid}>{reportAreas.map((area) => <button key={area.id} type="button" className={primaryArea === area.id ? styles.selectedCard : ''} onClick={() => selectPrimaryArea(area.id)}><strong>{area.label[lang]}</strong><small>{area.description[lang]}</small></button>)}</div>

        <div className={styles.supportingBlock}><h3>{t.secondaryTitle}</h3><p>{t.secondaryIntro}</p><div className={styles.chipRow}>{reportAreas.filter((area) => area.id !== primaryArea).map((area) => <button key={area.id} type="button" className={secondaryAreas.includes(area.id) ? styles.selectedChip : ''} onClick={() => toggleSecondaryArea(area.id)}>{area.label[lang]}</button>)}</div></div>

        <header className={styles.sectionHeading}><span>02</span><div><h2>{t.purposeTitle}</h2><p>{t.purposeIntro}</p></div></header>
        <div className={styles.purposeGrid}>{reportPurposes.map((item) => <button key={item.id} type="button" className={purpose === item.id ? styles.selectedPurpose : ''} onClick={() => changePurpose(item.id)}><strong>{item.label[lang]}</strong><small>{item.description[lang]}</small></button>)}</div>
      </section>

      <section className={styles.inputPanel}>
        <header className={styles.sectionHeading}><span>03</span><div><h2>{t.uploadTitle}</h2></div></header>
        <button type="button" className={styles.dropzone} onClick={() => fileInput.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => {event.preventDefault(); void loadFile(event.dataTransfer.files[0])}}>
          <i>↑</i><strong>{t.upload}</strong><small>{t.uploadNote}</small>
        </button>
        <input ref={fileInput} className={styles.fileInput} type="file" accept=".csv,.tsv,.txt,.json,.md,.html,.htm,.pdf,.xlsx,.xls,.pptx" onChange={(event) => void loadFile(event.target.files?.[0])} />
        {fileName && <div className={styles.fileStatus}><span>{t.selectedFile}: <b>{fileName}</b></span><strong className={readable ? styles.statusGood : styles.statusReview}>{fileReadFailed ? t.readError : readable ? t.readable : t.manualReview}</strong></div>}
        <label className={styles.textLabel}>{t.pasteLabel}<textarea value={reportText} placeholder={t.pastePlaceholder} onChange={(event) => {setReportText(event.target.value); setReadable(event.target.value.trim().length > 0); setFileReadFailed(false); resetEvidence()}} /></label>

        <header className={styles.sectionHeading}><span>04</span><div><h2>{t.metricTitle}</h2><p>{t.metricIntro}</p></div></header>
        <div className={styles.metricGroups}>{selectedAreaIds.map((areaId, areaIndex) => {
          const area = getArea(areaId)
          const metrics = area.metrics.filter((item) => item.priority === 'required' || !item.purposes || item.purposes.includes(purpose))
          return <div className={styles.metricGroup} key={area.id}><h3>{area.label[lang]} {areaIndex > 0 && <span>{t.supporting}</span>}</h3><div>{metrics.map((item) => {
            const key = `${area.id}:${item.id}`
            const automaticallyDetected = detectedMetrics.has(key) && !excludedMetrics.includes(key)
            const checked = confirmedMetrics.includes(key) || automaticallyDetected
            const isRequired = areaIndex === 0 && item.priority === 'required'
            return <label key={key} className={checked ? styles.metricChecked : ''}><input type="checkbox" checked={checked} onChange={(event) => toggleMetric(key, event.target.checked)} /><span><strong>{item.label[lang]}</strong><small>{isRequired ? t.required : t.contextual}{automaticallyDetected ? ` · ${t.detected}` : ''}</small></span></label>
          })}</div></div>
        })}</div>
        {!readable && <label className={`${styles.reviewComplete} ${reviewComplete ? styles.contextChecked : ''}`}><input type="checkbox" checked={reviewComplete} onChange={(event) => setReviewComplete(event.target.checked)} /><span>{t.reviewComplete}</span></label>}

        <header className={styles.sectionHeading}><span>05</span><div><h2>{t.contextTitle}</h2><p>{t.contextIntro}</p></div></header>
        <div className={styles.contextGrid}>{(Object.keys(context) as Array<keyof AuditContext>).map((key) => <label key={key} className={context[key] ? styles.contextChecked : ''}><input type="checkbox" checked={context[key]} onChange={(event) => setContext((current) => ({...current, [key]: event.target.checked}))} /><span>{t.contextLabels[key]}</span></label>)}</div>
      </section>

      <aside className={styles.resultPanel}>
        <header className={styles.resultHeading}><span>06</span><h2>{t.resultTitle}</h2></header>
        {!hasEvidence ? <div className={styles.waiting}><i>◎</i><p>{t.waiting}</p></div> : <>
          <div className={styles.scoreRow}><div className={styles.scoreRing} style={{'--score': `${result.score ?? 0}%`} as CSSProperties}><strong>{result.score ?? '—'}</strong><span>/100</span></div><div><span>{t.score}</span><strong>{getArea(primaryArea).label[lang]}</strong><small>{getPurpose(purpose).label[lang]}</small></div></div>
          <div className={styles.summaryGrid}><div><span>{t.detectedCount}</span><strong>{result.detectedCount}</strong></div><div><span>{t.requiredCount}</span><strong>{result.requiredCount}</strong></div><div><span>{t.missingCount}</span><strong>{result.missingRequiredCount}</strong></div><div><span>{t.confidence}</span><strong>{confidenceLabel}</strong></div></div>
          <div className={styles.dimensionList}>{(Object.keys(result.dimensions) as Array<keyof typeof result.dimensions>).map((key) => <div key={key}><div><span>{t.dimensions[key]}</span><strong>{result.dimensions[key] ?? 0}/{dimensionMaximums[key]}</strong></div><i><b style={{width: `${((result.dimensions[key] ?? 0) / dimensionMaximums[key]) * 100}%`}} /></i></div>)}</div>
          <div className={styles.narrative}>
            <section className={`${styles.verdict} ${styles[result.narrative.verdict.status]}`}><span>{t.verdict}</span><strong>{result.narrative.verdict.title}</strong><p>{result.narrative.verdict.detail}</p></section>
            <section className={styles.narrativeSection}><h3>{t.strengths}</h3>{result.narrative.strengths.length ? result.narrative.strengths.map((item) => <article key={item.code} className={styles.strengthItem}><strong>{item.title}</strong><p>{item.detail}</p></article>) : <p className={styles.noFindings}>{t.noFindings}</p>}</section>
            <section className={styles.narrativeSection}><h3>{t.risks}</h3>{result.narrative.risks.map((item) => <article key={item.code} className={styles.riskItem}><strong>{item.title}</strong><p>{item.detail}</p></article>)}</section>
            <section className={styles.narrativeSection}><h3>{t.questions}</h3><ol className={styles.questionList}>{result.narrative.questions.map((item) => <li key={item.code}>{item.title}</li>)}</ol></section>
            <section className={styles.narrativeSection}><h3>{t.actions}</h3><div className={styles.actionList}>{result.narrative.actions.map((item) => <article key={item.code}><span className={styles[item.priority]}>{t[item.priority]}</span><div><strong>{item.title}</strong><p>{item.detail}</p></div></article>)}</div></section>
          </div>
        </>}
      </aside>
    </div>
  </main>
}
