import type {PartnerCampaign} from './partners-types'

export function isCampaignActive(campaign: PartnerCampaign, now = Date.now()): boolean {
  if (campaign.active === false) return false
  const start = campaign.startAt ? Date.parse(campaign.startAt) : -Infinity
  const end = campaign.endAt ? Date.parse(campaign.endAt) : Infinity
  return start <= now && now < end
}

export function safePartnerUrl(value?: string): string | undefined {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined
  } catch {
    return undefined
  }
}

export function normalizePartnerSearch(value: string): string {
  return value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i').trim()
}
