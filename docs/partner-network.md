# Sellf Partner Network

Approved design: the full-page Partner Network and Atlas Commerce detail mockups reviewed on 5 November 2026. The Partners CSS module implements their warm ivory, blue, Montserrat, logo-card and two-column detail layouts. Existing website integrations remain in the shared layout.

## Routes and content

- `/{tr|en}/partners`: network landing page, featured campaigns and searchable directory.
- `/{tr|en}/partners/[slug]`: the common partner detail template.
- `/partners-studio`: independent embedded Sanity Studio, with the existing project/dataset settings. No new dataset or subscription is required.
- `/api/partners/request`: introduction and partnership applications, using the existing Gmail SMTP helper and environment variable names.

The Studio contains `networkPartner`, `partnerCampaign` and the singleton `partnersSettings`. Required partner and campaign copy is bilingual. Campaigns have strong partner references, optional start/end timestamps and an active toggle. Inactive, future and expired campaigns are excluded from the public site. Empty optional detail sections are hidden. Only published, active partners appear; unknown slugs return 404.

The page settings use approved bilingual defaults until editors replace them. Hero logos use featured partners (up to six). Featured campaigns fill the three-card offer section; all active campaigns are visible on their partner’s detail page.

## Preview fixtures

When the CMS directory is empty, development and Vercel Preview use six explicitly labelled illustrative partners and three example offers. Fixtures are never written to Sanity and are disabled in Vercel Production. Example pages are noindex, and the request API rejects demo partners and campaigns. Without published real partners, production shows the designed empty state and a general introduction CTA.

## Editor activation

The embedded Studio route and schema are built. Sanity requires the preview origin to be registered, or added as an exact allowed CORS origin, before editor sign-in. Browser verification reached Sanity’s “Connect this Studio to your project” screen; registration was not completed. Prefer registering the stable, approved editor URL rather than allowing wildcard preview origins. The separate `partners-studio` configuration also supports Sanity-hosted deployment later.

## Form verification

Requests include kind, locale, contact details, consent and optionally partner/campaign IDs. The server resolves names and campaign relationships against current published CMS data, validates input and origin, and escapes all user-provided HTML. Honeypot input returns without sending. API failures do not report success. No visitor data is sent directly to a partner.

The existing `GMAIL_USER` and `GMAIL_PASS` variables are currently scoped to Vercel Production only. Preview delivery is therefore not configured. Before production release, verify actual delivery through the existing SMTP configuration. No production secret was copied to preview.

## Checks completed

- TypeScript compilation and full Next.js production build.
- Sanity schema extraction for the independent Studio.
- Campaign start/end boundaries, invalid dates, URL validation, Turkish search normalization and bilingual fixture relationships.
- Twelve request-handler scenarios using local mail interception: validation, consent, origin checks, unknown/demo partners, mismatched campaigns, honeypot, valid general/targeted/join requests, HTML escaping and SMTP failure.
- Deployed preview: directory and detail render; category/search/reset behavior; correct partner/campaign selection in the dialog; general request form; Escape-to-close; TR/EN detail switching; no horizontal overflow at the inspected desktop width; unknown partner 404.

Mobile styles are implemented; a mobile browser viewport was not available for visual verification. Review mobile layout before production release. Production remains on `main`; this feature is prepared on a separate preview branch.
