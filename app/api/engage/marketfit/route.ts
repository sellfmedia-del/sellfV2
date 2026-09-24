import {NextResponse} from 'next/server'
import {scanMarket} from '@/tools/sellf-marketfit/scanner'
import type {Currency, Marketplace, MarketScanRequest, SalesChannel} from '@/tools/sellf-marketfit/types'

export const runtime = 'nodejs'
export const maxDuration = 45

const channels = new Set<SalesChannel>(['marketplace', 'own-site', 'store', 'wholesale', 'distributor'])
const marketplaces = new Set<Marketplace>(['trendyol', 'hepsiburada', 'amazon-tr', 'n11', 'other'])
const currencies = new Set<Currency>(['TRY', 'USD', 'EUR', 'GBP'])
const rateBuckets = new Map<string, number[]>()

function rateLimited(request: Request) {
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const recent = (rateBuckets.get(key) || []).filter((stamp) => now - stamp < 10 * 60 * 1000)
  if (recent.length >= 8) return true
  recent.push(now)
  rateBuckets.set(key, recent)
  return false
}

function cleanUrl(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 2048) : ''
}

export async function POST(request: Request) {
  try {
    if (rateLimited(request)) return NextResponse.json({error: 'Tarama limiti aşıldı. Lütfen birkaç dakika sonra tekrar deneyin.'}, {status: 429})
    const body = await request.json() as Partial<MarketScanRequest>
    const category = typeof body.category === 'string' ? body.category.trim().slice(0, 120) : ''
    const productType = typeof body.productType === 'string' ? body.productType.trim().slice(0, 160) : ''
    if (!category || !productType) return NextResponse.json({error: 'Kategori ve ürün tipi gereklidir.'}, {status: 400})
    const payload: MarketScanRequest = {
      category, productType, productUrl: cleanUrl(body.productUrl),
      competitorUrls: Array.isArray(body.competitorUrls) ? body.competitorUrls.map(cleanUrl).filter(Boolean).slice(0, 8) : [],
      channel: channels.has(body.channel as SalesChannel) ? body.channel as SalesChannel : 'own-site',
      marketplace: marketplaces.has(body.marketplace as Marketplace) ? body.marketplace as Marketplace : undefined,
      currency: currencies.has(body.currency as Currency) ? body.currency as Currency : 'TRY',
      manualEvidence: typeof body.manualEvidence === 'string' ? body.manualEvidence.slice(0, 50_000) : '',
    }
    return NextResponse.json(await scanMarket(payload), {headers: {'cache-control': 'no-store'}})
  } catch {
    return NextResponse.json({error: 'Pazar analizi isteği işlenemedi.'}, {status: 400})
  }
}
