'use client'

import Link from 'next/link'
import {useMemo, useState, type CSSProperties} from 'react'
import type {AssetInput, AssetKind, BusinessModel, Locale, PrimaryGoal, SurfaceAuditResponse} from './types'
import {recordToolRun} from '../analytics'
import styles from './sellf-surface.module.css'

type DraftAsset = AssetInput & {label: string}

const copy = {
  tr: {
    back: 'Tüm tool’lara dön', eyebrow: 'SELLF ENGAGE / SELLF SURFACE',
    title: 'Dijital varlıklarınızı tek tek değil, birlikte denetleyin.',
    intro: 'Website, landing page, sosyal profil, YouTube, Google işletme ve e-posta yüzeylerindeki büyüme sızıntılarını açık kurallar ve doğrulanabilir kanıtlarla bulun.',
    principles: ['AI kullanmaz', 'Ücretli API kullanmaz', 'Görülemeyeni eksik saymaz'],
    context: 'Audit bağlamı', contextText: 'Kuralların yalnızca işinize ve hedefinize uygun olanları çalışır.',
    model: 'İş modeli', goal: 'Ana hedef', assetsTitle: 'Dijital varlıklar', assetsText: 'En fazla altı varlığı birlikte denetleyin. Her varlık yalnızca kendisine uygun kurallarla değerlendirilir.',
    add: 'Varlık ekle', remove: 'Kaldır', assetType: 'Varlık türü', url: 'Herkese açık URL', label: 'Kısa ad',
    evidence: 'Doğrulama kanıtı', evidenceHint: 'Platform taramayı sınırlandırırsa bio, profil linki, iletişim bilgisi, kategori ve son içerik tarihlerini yapıştırın. Göremediğimiz veri skora ceza olarak yansımaz.',
    emailEvidence: 'E-posta kaynak HTML’i', emailEvidenceHint: 'Gönderim aracındaki tam e-posta HTML kodunu buraya yapıştırın. Kod çalıştırılmaz; yalnızca yapısal olarak incelenir.',
    scan: 'Surface’i tara', scanning: 'Dijital yüzey taranıyor…', scanNote: 'Herkese açık sayfalar ve sizin eklediğiniz HTML incelenir. Şifre veya hesap erişimi istenmez.',
    emptyError: 'Taramayı başlatmak için en az bir URL veya e-posta HTML’i girin.', genericError: 'Audit tamamlanamadı. Girdileri kontrol edip tekrar deneyin.',
    result: 'Surface sonucu', score: 'Dijital yüzey sağlığı', confidence: 'Audit confidence', assets: 'Taranan varlık', pages: 'Taranan sayfa', critical: 'Kritik bulgu', pillars: 'Karar eksenleri', assetResults: 'Varlık sağlığı', checks: 'kontrol', findingsLabel: 'bulgu',
    high: 'Yüksek', medium: 'Orta', limited: 'Sınırlı', priorities: 'Öncelikli sızıntılar', strengths: 'Doğrulanmış güçlü sinyaller', verify: 'Doğrulama gerekenler',
    evidenceLabel: 'Kanıt', actionLabel: 'Önerilen aksiyon', noCritical: 'Kritik veya önemli bir büyüme sızıntısı bulunmadı.',
    sources: 'Tarama kapsamı', source: {crawl: 'Otomatik tarama', 'public-page': 'Herkese açık profil', 'manual-evidence': 'Manuel kanıt', 'uploaded-html': 'HTML incelemesi', mixed: 'Profil + manuel kanıt', unavailable: 'Doğrulanamadı'},
    kinds: {website: 'Website', landing: 'Landing page', social: 'Sosyal profil', youtube: 'YouTube', 'google-business': 'Google Business', email: 'E-posta HTML'},
    pillarNames: {assetHealth: 'Asset Health', technicalHealth: 'Technical Health', journeyConnectivity: 'Journey Connectivity', brandConsistency: 'Brand Consistency'},
    models: {ecommerce: 'E-ticaret', b2b: 'B2B', service: 'Hizmet', retail: 'Perakende', saas: 'SaaS / Yazılım', other: 'Diğer'},
    goals: {lead: 'Lead / Talep', sale: 'Satış', trust: 'Güven ve değerlendirme', awareness: 'Bilinirlik'},
    dimensions: {discoverability: 'Bulunabilirlik', conversion: 'Dönüşüm', trust: 'Güven', measurement: 'Ölçüm', technical: 'Teknik yapı', consistency: 'Tutarlılık'},
    severity: {critical: 'Kritik', important: 'Önemli', improvement: 'İyileştirme', positive: 'Güçlü', verification: 'Doğrulama'},
  },
  en: {
    back: 'Back to all tools', eyebrow: 'SELLF ENGAGE / SELLF SURFACE',
    title: 'Audit your digital assets together, not in isolation.',
    intro: 'Find growth leaks across websites, landing pages, social profiles, YouTube, Google Business and email surfaces using explicit rules and verifiable evidence.',
    principles: ['No AI', 'No paid APIs', 'Unseen data is never marked missing'],
    context: 'Audit context', contextText: 'Only rules relevant to your business and primary goal are applied.',
    model: 'Business model', goal: 'Primary goal', assetsTitle: 'Digital assets', assetsText: 'Audit up to six assets together. Every asset is evaluated only with rules relevant to its type.',
    add: 'Add asset', remove: 'Remove', assetType: 'Asset type', url: 'Public URL', label: 'Short name',
    evidence: 'Verification evidence', evidenceHint: 'If a platform limits public scanning, paste the bio, profile link, contact information, category and recent-content dates. Data we cannot observe never reduces the score.',
    emailEvidence: 'Email source HTML', emailEvidenceHint: 'Paste the complete email HTML from the sending platform. The code is never executed; only its structure is inspected.',
    scan: 'Scan the surface', scanning: 'Scanning the digital surface…', scanNote: 'Public pages and HTML you provide are inspected. No passwords or account access are requested.',
    emptyError: 'Add at least one URL or email HTML source to start the audit.', genericError: 'The audit could not be completed. Review the inputs and try again.',
    result: 'Surface result', score: 'Digital surface health', confidence: 'Audit confidence', assets: 'Assets scanned', pages: 'Pages scanned', critical: 'Critical findings', pillars: 'Decision axes', assetResults: 'Asset health', checks: 'checks', findingsLabel: 'findings',
    high: 'High', medium: 'Medium', limited: 'Limited', priorities: 'Priority leaks', strengths: 'Verified strong signals', verify: 'Requires verification',
    evidenceLabel: 'Evidence', actionLabel: 'Recommended action', noCritical: 'No critical or important growth leak was found.',
    sources: 'Scan coverage', source: {crawl: 'Automated crawl', 'public-page': 'Public profile', 'manual-evidence': 'Manual evidence', 'uploaded-html': 'HTML inspection', mixed: 'Profile + manual evidence', unavailable: 'Unverified'},
    kinds: {website: 'Website', landing: 'Landing page', social: 'Social profile', youtube: 'YouTube', 'google-business': 'Google Business', email: 'Email HTML'},
    pillarNames: {assetHealth: 'Asset Health', technicalHealth: 'Technical Health', journeyConnectivity: 'Journey Connectivity', brandConsistency: 'Brand Consistency'},
    models: {ecommerce: 'Ecommerce', b2b: 'B2B', service: 'Services', retail: 'Retail', saas: 'SaaS / Software', other: 'Other'},
    goals: {lead: 'Lead generation', sale: 'Sales', trust: 'Trust and evaluation', awareness: 'Awareness'},
    dimensions: {discoverability: 'Discoverability', conversion: 'Conversion', trust: 'Trust', measurement: 'Measurement', technical: 'Technical', consistency: 'Consistency'},
    severity: {critical: 'Critical', important: 'Important', improvement: 'Improvement', positive: 'Strong', verification: 'Verification'},
  },
} as const

const newAsset = (index: number, kind: AssetKind = index ? 'landing' : 'website'): DraftAsset => ({
  id: `asset-${Date.now()}-${index}`, kind, url: '', evidenceText: '', label: '',
})

export default function SellfSurfaceTool({lang}: {lang: Locale}) {
  const t = copy[lang]
  const [businessModel, setBusinessModel] = useState<BusinessModel>('b2b')
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>('lead')
  const [assets, setAssets] = useState<DraftAsset[]>([newAsset(0)])
  const [result, setResult] = useState<SurfaceAuditResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validAssets = useMemo(() => assets.filter((asset) => asset.kind === 'email' ? asset.evidenceText?.trim() : asset.url.trim()), [assets])
  const criticalCount = result?.result.findings.filter((item) => item.severity === 'critical').length ?? 0

  const updateAsset = (id: string, patch: Partial<DraftAsset>) => {
    setAssets((current) => current.map((asset) => asset.id === id ? {...asset, ...patch} : asset))
    setResult(null)
  }

  const runAudit = async () => {
    if (!validAssets.length) {
      setError(t.emptyError)
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const response = await fetch('/api/engage/surface-audit', {
        method: 'POST', headers: {'content-type': 'application/json'},
        body: JSON.stringify({locale: lang, businessModel, primaryGoal, assets: validAssets}),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(typeof payload?.error === 'string' ? payload.error : t.genericError)
      const audit = payload as SurfaceAuditResponse
      setResult(audit)
      recordToolRun({
        tool: 'sellf-surface',
        language: lang,
        input: {
          businessModel,
          primaryGoal,
          assets: validAssets.map((asset) => ({
            kind: asset.kind,
            url: asset.url.slice(0, 2048),
            evidenceProvided: Boolean(asset.evidenceText?.trim()),
            evidenceLength: asset.evidenceText?.length || 0,
          })),
        },
        result: {
          score: audit.result.score,
          confidence: audit.result.confidence,
          scannedAssets: audit.result.scannedAssets,
          requestedAssets: audit.result.requestedAssets,
          scannedPages: audit.result.scannedPages,
          verdict: audit.result.verdict.status,
          dimensions: Object.fromEntries(Object.entries(audit.result.dimensions).map(([key, value]) => [key, value.score])),
          pillars: Object.fromEntries(Object.entries(audit.result.pillars).map(([key, value]) => [key, value.score])),
          assetScores: audit.result.assetScores,
          findingCodes: audit.result.findings.map((item) => item.code),
        },
      })
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t.genericError)
    } finally {
      setLoading(false)
    }
  }

  return <main className={styles.page}>
    <section className={styles.hero}><div className={styles.heroGrid} /><div className="sellf-container">
      <Link href={`/${lang}/engage/tools`} className={styles.back}>← {t.back}</Link>
      <span className={styles.eyebrow}>{t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p>
      <div className={styles.principles}>{t.principles.map((item) => <span key={item}>✓ {item}</span>)}</div>
    </div></section>

    <div className={`sellf-container ${styles.workspace}`}>
      <section className={styles.builder}>
        <header className={styles.sectionHeading}><span>01</span><div><h2>{t.context}</h2><p>{t.contextText}</p></div></header>
        <div className={styles.contextGrid}>
          <label><span>{t.model}</span><select value={businessModel} onChange={(event) => {setBusinessModel(event.target.value as BusinessModel); setResult(null)}}>{Object.entries(t.models).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          <label><span>{t.goal}</span><select value={primaryGoal} onChange={(event) => {setPrimaryGoal(event.target.value as PrimaryGoal); setResult(null)}}>{Object.entries(t.goals).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        </div>

        <header className={styles.sectionHeading}><span>02</span><div><h2>{t.assetsTitle}</h2><p>{t.assetsText}</p></div></header>
        <div className={styles.assetList}>{assets.map((asset, index) => <article className={styles.assetCard} key={asset.id}>
          <div className={styles.assetTop}><strong>{String(index + 1).padStart(2, '0')}</strong><div className={styles.kindTabs}>{(Object.keys(t.kinds) as AssetKind[]).map((kind) => <button type="button" key={kind} className={asset.kind === kind ? styles.kindActive : ''} onClick={() => updateAsset(asset.id, {kind})}>{t.kinds[kind]}</button>)}</div>{assets.length > 1 && <button className={styles.remove} type="button" onClick={() => {setAssets((current) => current.filter((item) => item.id !== asset.id)); setResult(null)}}>{t.remove}</button>}</div>
          <div className={styles.assetFields}><label><span>{t.label}</span><input value={asset.label} maxLength={80} placeholder={asset.kind === 'email' ? 'Newsletter' : asset.kind === 'google-business' ? 'Google profile' : asset.kind === 'youtube' ? 'YouTube channel' : asset.kind === 'social' ? 'Instagram' : asset.kind === 'landing' ? 'Campaign landing' : 'Main website'} onChange={(event) => updateAsset(asset.id, {label: event.target.value})} /></label>{asset.kind !== 'email' && <label className={styles.urlField}><span>{t.url}</span><input value={asset.url} inputMode="url" placeholder={asset.kind === 'youtube' ? 'https://youtube.com/@brand' : asset.kind === 'google-business' ? 'https://maps.google.com/...' : asset.kind === 'social' ? 'https://instagram.com/brand' : 'https://example.com'} onChange={(event) => updateAsset(asset.id, {url: event.target.value})} /></label>}</div>
          {(asset.kind === 'social' || asset.kind === 'youtube' || asset.kind === 'google-business' || asset.kind === 'email') && <label className={styles.evidenceField}><span>{asset.kind === 'email' ? t.emailEvidence : t.evidence}</span><textarea value={asset.evidenceText} maxLength={100000} placeholder={asset.kind === 'email' ? t.emailEvidenceHint : t.evidenceHint} onChange={(event) => updateAsset(asset.id, {evidenceText: event.target.value})} /></label>}
        </article>)}</div>
        {assets.length < 6 && <button type="button" className={styles.addAsset} onClick={() => setAssets((current) => [...current, newAsset(current.length, current.length === 1 ? 'social' : 'landing')])}>＋ {t.add}</button>}
        <button type="button" className={styles.scanButton} disabled={loading} onClick={() => void runAudit()}>{loading ? <><i />{t.scanning}</> : <>{t.scan}<span>→</span></>}</button>
        <p className={styles.scanNote}>{t.scanNote}</p>{error && <p className={styles.error}>{error}</p>}
      </section>

      <aside className={styles.resultPanel}>
        <header className={styles.resultHeader}><span>03</span><h2>{t.result}</h2></header>
        {!result ? <div className={styles.waiting}><div className={styles.radar}><i /><b /><span /></div><p>{loading ? t.scanning : t.scanNote}</p></div> : <>
          <section className={`${styles.verdict} ${styles[result.result.verdict.status]}`}><span>{t.score}</span><div className={styles.scoreLine}><strong>{result.result.score ?? '—'}</strong><small>/100</small></div><h3>{result.result.verdict.title}</h3><p>{result.result.verdict.detail}</p></section>
          <div className={styles.stats}><div><span>{t.confidence}</span><strong>{t[result.result.confidence]}</strong></div><div><span>{t.assets}</span><strong>{result.result.scannedAssets}/{result.result.requestedAssets}</strong></div><div><span>{t.pages}</span><strong>{result.result.scannedPages}</strong></div><div><span>{t.critical}</span><strong>{criticalCount}</strong></div></div>
          <section className={styles.pillars}><h3>{t.pillars}</h3><div>{Object.entries(result.result.pillars).map(([key, value]) => <article key={key}><span>{t.pillarNames[key as keyof typeof t.pillarNames]}</span><strong>{value.score ?? '—'}</strong><i><b style={{width: `${value.score ?? 0}%`} as CSSProperties} /></i><small>{value.verifiedChecks}/{value.totalChecks}</small></article>)}</div></section>
          <div className={styles.dimensionList}>{Object.entries(result.result.dimensions).map(([key, value]) => <div key={key}><div><span>{t.dimensions[key as keyof typeof t.dimensions]}</span><strong>{value.score ?? '—'}</strong></div><i><b style={{width: `${value.score ?? 0}%`} as CSSProperties} /></i><small>{value.verifiedChecks}/{value.totalChecks}</small></div>)}</div>
          <section className={styles.coverage}><h3>{t.assetResults}</h3>{result.assets.map((asset) => {const health = result.result.assetScores.find((item) => item.assetId === asset.id); return <article key={asset.id}><i className={asset.source === 'unavailable' ? styles.sourceBad : styles.sourceGood} /><div><strong>{asset.finalUrl || t.kinds[asset.kind]}</strong><span>{t.kinds[asset.kind]} · {t.source[asset.source]} · {health?.score ?? '—'}/100 · {health?.verifiedChecks ?? 0} {t.checks} · {health?.findings ?? 0} {t.findingsLabel}</span></div></article>})}</section>
          <FindingSection title={t.priorities} findings={result.result.priorities} t={t} empty={t.noCritical} />
          {result.result.verificationNotes.length > 0 && <FindingSection title={t.verify} findings={result.result.verificationNotes} t={t} />}
          {result.result.strengths.length > 0 && <FindingSection title={t.strengths} findings={result.result.strengths} t={t} />}
        </>}
      </aside>
    </div>
  </main>
}

function FindingSection({title, findings, t, empty}: {title: string; findings: SurfaceAuditResponse['result']['findings']; t: typeof copy.tr | typeof copy.en; empty?: string}) {
  return <section className={styles.findings}><h3>{title}</h3>{findings.length ? findings.map((item) => <article key={`${item.code}-${item.assetUrl ?? ''}`} className={styles[item.severity]}><div><span>{t.severity[item.severity]}</span><strong>{item.title}</strong></div><p>{item.detail}</p><dl><dt>{t.evidenceLabel}</dt><dd>{item.evidence}</dd>{item.action && <><dt>{t.actionLabel}</dt><dd>{item.action}</dd></>}</dl>{item.assetUrl && <small>{item.assetUrl}</small>}</article>) : <p className={styles.empty}>{empty}</p>}</section>
}
