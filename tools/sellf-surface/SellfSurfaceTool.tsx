'use client'

import Link from 'next/link'
import {useMemo, useState, type CSSProperties} from 'react'
import type {AssetInput, AssetKind, BusinessModel, Locale, PrimaryGoal, SurfaceAuditResponse} from './types'
import styles from './sellf-surface.module.css'

type DraftAsset = AssetInput & {label: string}

const copy = {
  tr: {
    back: 'Tüm tool’lara dön', eyebrow: 'SELLF ENGAGE / SELLF SURFACE',
    title: 'Dijital varlıklarınızı tek tek değil, birlikte denetleyin.',
    intro: 'Website, landing page ve sosyal profillerinizdeki büyüme sızıntılarını; gözlemlenebilir sinyaller, açık kurallar ve doğrulanabilir kanıtlarla bulun.',
    principles: ['AI kullanmaz', 'Ücretli API kullanmaz', 'Görülemeyeni eksik saymaz'],
    context: 'Audit bağlamı', contextText: 'Kuralların yalnızca işinize ve hedefinize uygun olanları çalışır.',
    model: 'İş modeli', goal: 'Ana hedef', assetsTitle: 'Dijital varlıklar', assetsText: 'En fazla dört varlığı birlikte tarayın. Website taraması ana sayfayla birlikte öncelikli iç sayfaları da inceler.',
    add: 'Varlık ekle', remove: 'Kaldır', assetType: 'Varlık türü', url: 'Herkese açık URL', label: 'Kısa ad',
    evidence: 'Profil kanıtı (önerilir)', evidenceHint: 'Sosyal platform taramayı sınırlandırırsa bio, profil linki, iletişim bilgisi ve son içerik özetini buraya yapıştırın. Göremediğimiz veri skora ceza olarak yansımaz.',
    scan: 'Surface’i tara', scanning: 'Dijital yüzey taranıyor…', scanNote: 'Yalnızca herkese açık sayfalar okunur. Şifre veya hesap erişimi istenmez.',
    emptyError: 'Taramayı başlatmak için en az bir URL girin.', genericError: 'Audit tamamlanamadı. URL’leri kontrol edip tekrar deneyin.',
    result: 'Surface sonucu', score: 'Dijital yüzey sağlığı', confidence: 'Analiz güveni', assets: 'Taranan varlık', pages: 'Taranan sayfa', critical: 'Kritik bulgu',
    high: 'Yüksek', medium: 'Orta', limited: 'Sınırlı', priorities: 'Öncelikli sızıntılar', strengths: 'Doğrulanmış güçlü sinyaller', verify: 'Doğrulama gerekenler',
    evidenceLabel: 'Kanıt', actionLabel: 'Önerilen aksiyon', noCritical: 'Kritik veya önemli bir büyüme sızıntısı bulunmadı.',
    sources: 'Tarama kapsamı', source: {crawl: 'Otomatik tarama', 'public-page': 'Herkese açık profil', 'manual-evidence': 'Manuel kanıt', mixed: 'Profil + manuel kanıt', unavailable: 'Doğrulanamadı'},
    kinds: {website: 'Website', landing: 'Landing page', social: 'Sosyal profil'},
    models: {ecommerce: 'E-ticaret', b2b: 'B2B', service: 'Hizmet', retail: 'Perakende', saas: 'SaaS / Yazılım', other: 'Diğer'},
    goals: {lead: 'Lead / Talep', sale: 'Satış', trust: 'Güven ve değerlendirme', awareness: 'Bilinirlik'},
    dimensions: {discoverability: 'Bulunabilirlik', conversion: 'Dönüşüm', trust: 'Güven', measurement: 'Ölçüm', technical: 'Teknik yapı', consistency: 'Tutarlılık'},
    severity: {critical: 'Kritik', important: 'Önemli', improvement: 'İyileştirme', positive: 'Güçlü', verification: 'Doğrulama'},
  },
  en: {
    back: 'Back to all tools', eyebrow: 'SELLF ENGAGE / SELLF SURFACE',
    title: 'Audit your digital assets together, not in isolation.',
    intro: 'Find growth leaks across websites, landing pages and social profiles using observable signals, explicit rules and verifiable evidence.',
    principles: ['No AI', 'No paid APIs', 'Unseen data is never marked missing'],
    context: 'Audit context', contextText: 'Only rules relevant to your business and primary goal are applied.',
    model: 'Business model', goal: 'Primary goal', assetsTitle: 'Digital assets', assetsText: 'Scan up to four assets together. Website scans also review a set of priority internal pages.',
    add: 'Add asset', remove: 'Remove', assetType: 'Asset type', url: 'Public URL', label: 'Short name',
    evidence: 'Profile evidence (recommended)', evidenceHint: 'If a social platform limits public scanning, paste the bio, profile link, contact information and a recent-content summary. Data we cannot observe never reduces the score.',
    scan: 'Scan the surface', scanning: 'Scanning the digital surface…', scanNote: 'Only public pages are read. No passwords or account access are requested.',
    emptyError: 'Add at least one URL to start the scan.', genericError: 'The audit could not be completed. Review the URLs and try again.',
    result: 'Surface result', score: 'Digital surface health', confidence: 'Analysis confidence', assets: 'Assets scanned', pages: 'Pages scanned', critical: 'Critical findings',
    high: 'High', medium: 'Medium', limited: 'Limited', priorities: 'Priority leaks', strengths: 'Verified strong signals', verify: 'Requires verification',
    evidenceLabel: 'Evidence', actionLabel: 'Recommended action', noCritical: 'No critical or important growth leak was found.',
    sources: 'Scan coverage', source: {crawl: 'Automated crawl', 'public-page': 'Public profile', 'manual-evidence': 'Manual evidence', mixed: 'Profile + manual evidence', unavailable: 'Unverified'},
    kinds: {website: 'Website', landing: 'Landing page', social: 'Social profile'},
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

  const validAssets = useMemo(() => assets.filter((asset) => asset.url.trim()), [assets])
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
      setResult(payload as SurfaceAuditResponse)
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
          <div className={styles.assetFields}><label><span>{t.label}</span><input value={asset.label} maxLength={80} placeholder={asset.kind === 'social' ? 'Instagram' : asset.kind === 'landing' ? 'Campaign landing' : 'Main website'} onChange={(event) => updateAsset(asset.id, {label: event.target.value})} /></label><label className={styles.urlField}><span>{t.url}</span><input value={asset.url} inputMode="url" placeholder={asset.kind === 'social' ? 'https://instagram.com/brand' : 'https://example.com'} onChange={(event) => updateAsset(asset.id, {url: event.target.value})} /></label></div>
          {asset.kind === 'social' && <label className={styles.evidenceField}><span>{t.evidence}</span><textarea value={asset.evidenceText} maxLength={20000} placeholder={t.evidenceHint} onChange={(event) => updateAsset(asset.id, {evidenceText: event.target.value})} /></label>}
        </article>)}</div>
        {assets.length < 4 && <button type="button" className={styles.addAsset} onClick={() => setAssets((current) => [...current, newAsset(current.length, current.length === 1 ? 'social' : 'landing')])}>＋ {t.add}</button>}
        <button type="button" className={styles.scanButton} disabled={loading} onClick={() => void runAudit()}>{loading ? <><i />{t.scanning}</> : <>{t.scan}<span>→</span></>}</button>
        <p className={styles.scanNote}>{t.scanNote}</p>{error && <p className={styles.error}>{error}</p>}
      </section>

      <aside className={styles.resultPanel}>
        <header className={styles.resultHeader}><span>03</span><h2>{t.result}</h2></header>
        {!result ? <div className={styles.waiting}><div className={styles.radar}><i /><b /><span /></div><p>{loading ? t.scanning : t.scanNote}</p></div> : <>
          <section className={`${styles.verdict} ${styles[result.result.verdict.status]}`}><span>{t.score}</span><div className={styles.scoreLine}><strong>{result.result.score ?? '—'}</strong><small>/100</small></div><h3>{result.result.verdict.title}</h3><p>{result.result.verdict.detail}</p></section>
          <div className={styles.stats}><div><span>{t.confidence}</span><strong>{t[result.result.confidence]}</strong></div><div><span>{t.assets}</span><strong>{result.result.scannedAssets}/{result.result.requestedAssets}</strong></div><div><span>{t.pages}</span><strong>{result.result.scannedPages}</strong></div><div><span>{t.critical}</span><strong>{criticalCount}</strong></div></div>
          <div className={styles.dimensionList}>{Object.entries(result.result.dimensions).map(([key, value]) => <div key={key}><div><span>{t.dimensions[key as keyof typeof t.dimensions]}</span><strong>{value.score ?? '—'}</strong></div><i><b style={{width: `${value.score ?? 0}%`} as CSSProperties} /></i><small>{value.verifiedChecks}/{value.totalChecks}</small></div>)}</div>
          <section className={styles.coverage}><h3>{t.sources}</h3>{result.assets.map((asset) => <article key={asset.id}><i className={asset.source === 'unavailable' ? styles.sourceBad : styles.sourceGood} /><div><strong>{asset.finalUrl}</strong><span>{t.kinds[asset.kind]} · {t.source[asset.source]} · {asset.pages.length} {t.pages.toLocaleLowerCase()}</span></div></article>)}</section>
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
