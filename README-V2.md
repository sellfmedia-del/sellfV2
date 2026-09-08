# Sellf Website V2 — Visual Redesign Branch

This project is a visual redesign of the supplied `sellfwebsite-main` source.

## Parity rule

The V2 build intentionally keeps the production site's non-visual implementation intact:

- Same Next.js / App Router project
- Same locale structure (`/tr`, `/en`)
- Same routes and redirects
- Same middleware
- Same sitemap and robots logic
- Same Sanity client, schemas and blog queries
- Same blog list and blog article page source files
- Same service, portfolio and growth-simulator data files
- Same contact API route / Nodemailer behavior
- Same Google Analytics ID and event names
- Same Cal.com booking integration
- Same Tally Growth Audit URL
- Same external URLs / social links / contact details

The modified files are the presentation layer: shared styling, header/footer, homepage sections and visual page components.

## Vercel environment variables

The original code expects these variables for the contact form:

```bash
GMAIL_USER=
GMAIL_PASS=
```

Sanity has production fallbacks in `sanity/env.ts`, but these variables can also be explicitly set in Vercel if desired:

```bash
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-05
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=qozgfxrm
```

Do not commit real `GMAIL_PASS` values into the repository.

## Local commands

```bash
npm ci
npm run dev
npm run build
```

## Preview deployment

Create this as a separate Vercel project (for example `sellfwebsitev2`). Do not attach `sellfmedia.com` to the V2 project while reviewing it. Keep the existing production Vercel project untouched.
