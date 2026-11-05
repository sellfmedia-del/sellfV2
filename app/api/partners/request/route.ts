import {NextResponse} from 'next/server'
import {field, mailer, table, validEmail} from '@/lib/contact-mail'
import {getPartnersData} from '@/sanity/lib/partners'
import {safePartnerUrl} from '@/lib/partners-utils'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin')
    if (origin && origin !== new URL(request.url).origin) return NextResponse.json({error: 'Invalid origin'}, {status: 403})
    if (Number(request.headers.get('content-length')) > 24000) return NextResponse.json({error: 'Request too large'}, {status: 413})
    const data = await request.formData()
    if (field(data, 'company_website')) return NextResponse.json({ok: true})
    const kind = field(data, 'kind', 10), lang = field(data, 'lang', 2)
    const name = field(data, 'name', 120), email = field(data, 'email', 320), company = field(data, 'company', 180)
    const brief = field(data, 'brief', 3000), website = field(data, 'website', 500)
    const partnerId = field(data, 'partnerId', 128), campaignId = field(data, 'campaignId', 128)
    if (!['intro', 'join'].includes(kind) || !['tr', 'en'].includes(lang) || !name || !validEmail(email) || !company || !brief || field(data, 'consent', 10) !== 'yes' || (kind === 'join' && !safePartnerUrl(website))) {
      return NextResponse.json({error: 'Invalid fields'}, {status: 400})
    }
    if (kind === 'join' && (partnerId || campaignId)) return NextResponse.json({error: 'Invalid selection'}, {status: 400})
    const network = partnerId || campaignId ? await getPartnersData(lang as 'tr' | 'en') : null
    const partner = network?.partners.find((item) => item._id === partnerId)
    const campaign = network?.campaigns.find((item) => item._id === campaignId && item.partnerId === partnerId)
    if ((partnerId && (!partner || partner.demo)) || (campaignId && (!campaign || campaign.demo))) return NextResponse.json({error: 'Invalid partner or campaign'}, {status: 400})
    const type = kind === 'join' ? 'Partner Başvurusu' : 'Partner Tanışma Talebi'
    await mailer().sendMail({
      from: `"Sellf Partner Network" <${process.env.GMAIL_USER}>`, to: process.env.GMAIL_USER, replyTo: email,
      subject: `${type} — ${name.replace(/[\r\n]/g, ' ')}`,
      html: `<div style="font-family:Arial,sans-serif;padding:24px;background:#f1f0ec"><h2>${type}</h2>${table([
        ['Ad Soyad', name], ['İş E-postası', email], ['Şirket / Marka', company], ['Telefon', field(data, 'phone', 80)], ['Website', website],
        ['Partner', partner?.name || 'Birlikte eşleştirilecek'], ['Partner ID', partner?._id || ''], ['Kampanya', campaign?.title || ''], ['Kampanya ID', campaign?._id || ''],
        ['İhtiyaç / İş Birliği Önerisi', brief], ['Dil', lang], ['Kaynak', 'Sellf Partner Network'], ['Gizlilik Onayı', 'Evet'],
      ])}</div>`,
    })
    return NextResponse.json({ok: true})
  } catch (error) {
    console.error('Partner Network request failed', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({error: 'Send failed'}, {status: 500})
  }
}
