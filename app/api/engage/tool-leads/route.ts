import {NextResponse} from 'next/server'
import type {EngageToolKey} from '@/tools/analytics'

export const runtime = 'nodejs'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://gxngmqewskhrbxqmnpps.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_kx_Ctdj_XmKGuCc7ae3I1w_6E-Mdeh4'
const toolKeys = new Set<EngageToolKey>(['growth-simulator', 'report-audit', 'sellf-surface', 'sellf-marketfit', 'sellf-route'])
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const sourcePattern = /^\/(tr|en)\/engage\/tools\/(growth-simulator|report-audit|sellf-surface|sellf-marketfit|sellf-route)$/
const rateBuckets = new Map<string, number[]>()

function clean(value: unknown, maximum: number) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, maximum) : ''
}

function rateLimited(request: Request) {
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const recent = (rateBuckets.get(key) || []).filter((value) => now - value < 10 * 60 * 1000)
  if (recent.length >= 10) return true
  recent.push(now)
  rateBuckets.set(key, recent)
  if (rateBuckets.size > 2_000) for (const [bucket, values] of rateBuckets) if (!values.some((value) => now - value < 10 * 60 * 1000)) rateBuckets.delete(bucket)
  return false
}

export async function POST(request: Request) {
  try {
    if (Number(request.headers.get('content-length') || 0) > 16_000) return NextResponse.json({error: 'payload_too_large'}, {status: 413})
    if (rateLimited(request)) return NextResponse.json({error: 'rate_limited'}, {status: 429})
    const body = await request.json() as Record<string, unknown>
    const clientRunId = typeof body.clientRunId === 'string' && uuidPattern.test(body.clientRunId) ? body.clientRunId : ''
    const tool = typeof body.tool === 'string' && toolKeys.has(body.tool as EngageToolKey) ? body.tool as EngageToolKey : null
    const language = body.language === 'tr' || body.language === 'en' ? body.language : null
    const sourcePath = typeof body.sourcePath === 'string' && sourcePattern.test(body.sourcePath) ? body.sourcePath : ''
    const fullName = clean(body.fullName, 120)
    const companyName = clean(body.companyName, 160)
    const email = clean(body.email, 254).toLocaleLowerCase('en-US')
    const marketingConsent = body.marketingConsent === true

    if (!clientRunId || !tool || !language || !sourcePath.endsWith(`/${tool}`) || fullName.length < 2 || companyName.length < 2 || !emailPattern.test(email) || body.privacyAccepted !== true) {
      return NextResponse.json({error: 'invalid_payload'}, {status: 400})
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/engage_tool_leads`, {
      method: 'POST',
      headers: {apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal'},
      body: JSON.stringify({client_run_id: clientRunId, tool_key: tool, language, full_name: fullName, company_name: companyName, email, privacy_accepted: true, marketing_consent: marketingConsent, source_path: sourcePath}),
      cache: 'no-store',
    })

    if (!response.ok) {
      const duplicate = response.status === 409
      if (!duplicate) console.error('Engage tool lead persistence failed', response.status)
      return NextResponse.json({error: duplicate ? 'duplicate' : 'persistence_failed'}, {status: duplicate ? 409 : 502})
    }
    return NextResponse.json({ok: true}, {status: 201, headers: {'cache-control': 'no-store'}})
  } catch {
    return NextResponse.json({error: 'invalid_request'}, {status: 400})
  }
}
