import {NextResponse} from 'next/server'
import {auditSurface} from '@/tools/sellf-surface/engine'
import {scanAsset} from '@/tools/sellf-surface/scanner'
import type {AssetInput, AssetKind, BusinessModel, Locale, PrimaryGoal, SurfaceAuditRequest} from '@/tools/sellf-surface/types'

export const runtime = 'nodejs'
export const maxDuration = 45

const assetKinds = new Set<AssetKind>(['website', 'landing', 'social', 'youtube', 'google-business', 'email'])
const businessModels = new Set<BusinessModel>(['ecommerce', 'b2b', 'service', 'retail', 'saas', 'other'])
const primaryGoals = new Set<PrimaryGoal>(['lead', 'sale', 'trust', 'awareness'])
const rateBuckets = new Map<string, number[]>()

function exceedsRateLimit(request: Request) {
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const recent = (rateBuckets.get(key) || []).filter((value) => now - value < 10 * 60 * 1000)
  if (recent.length >= 5) return true
  recent.push(now)
  rateBuckets.set(key, recent)
  if (rateBuckets.size > 2_000) {
    for (const [bucketKey, values] of rateBuckets) if (!values.some((value) => now - value < 10 * 60 * 1000)) rateBuckets.delete(bucketKey)
  }
  return false
}

function cleanAssets(value: unknown): AssetInput[] {
  if (!Array.isArray(value)) return []
  return value.slice(0, 6).flatMap((item, index) => {
    if (!item || typeof item !== 'object') return []
    const candidate = item as Record<string, unknown>
    const kind = typeof candidate.kind === 'string' && assetKinds.has(candidate.kind as AssetKind) ? candidate.kind as AssetKind : null
    const url = typeof candidate.url === 'string' ? candidate.url.trim().slice(0, 2048) : ''
    const evidenceText = typeof candidate.evidenceText === 'string' ? candidate.evidenceText.trim().slice(0, 100_000) : ''
    if (!kind || (kind === 'email' ? !evidenceText : !url)) return []
    return [{id: typeof candidate.id === 'string' ? candidate.id.slice(0, 80) : `asset-${index + 1}`, kind, url, evidenceText}]
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<SurfaceAuditRequest>
    const locale: Locale = body.locale === 'en' ? 'en' : 'tr'
    if (exceedsRateLimit(request)) return NextResponse.json({error: locale === 'tr' ? 'Tarama limiti aşıldı. Lütfen birkaç dakika sonra tekrar deneyin.' : 'Scan limit reached. Please try again in a few minutes.'}, {status: 429})
    const businessModel = businessModels.has(body.businessModel as BusinessModel) ? body.businessModel as BusinessModel : 'other'
    const primaryGoal = primaryGoals.has(body.primaryGoal as PrimaryGoal) ? body.primaryGoal as PrimaryGoal : 'lead'
    const assets = cleanAssets(body.assets)
    if (!assets.length) return NextResponse.json({error: locale === 'tr' ? 'En az bir geçerli dijital varlık gerekli.' : 'At least one valid digital asset is required.'}, {status: 400})

    const scannedAssets = await Promise.all(assets.map(scanAsset))
    const result = auditSurface(scannedAssets, locale, businessModel, primaryGoal, assets.length)
    return NextResponse.json({assets: scannedAssets, result}, {headers: {'cache-control': 'no-store'}})
  } catch {
    return NextResponse.json({error: 'Audit request could not be processed.'}, {status: 400})
  }
}
