import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['tr', 'en']
const defaultLocale = 'tr'

// Eski (Wix dönemi) locale'siz URL'ler için sabit harita.
// Generic locale-prepend mantığı hedefin var olup olmadığını kontrol etmiyor
// (örn. /hakkimizda -> /tr/hakkimizda, ki böyle bir sayfa yok), bu yüzden
// bilinen eski path'leri o mantıktan ÖNCE, doğru hedefe yönlendiriyoruz.
const legacyRedirectMap: Record<string, string> = {
  '/home': '/tr',
  '/hakkimizda': '/tr/about',
  '/neleryapiyoruz': '/tr/services',
  '/neler-yapiyoruz': '/tr/services',
  '/kimlerle-çalışıyoruz': '/tr/portfolio',
  '/produksiyon': '/tr/services',
  '/influencer-pazarlama': '/tr/services',
  '/e-ticaret-danismanligi': '/tr/services',
  '/seo-danismanligi': '/tr/services',
  '/sosyal-medya-yonetimi': '/tr/services',
  '/service-page/service-3': '/tr/services',
  '/gizlilik-politikasi': '/tr/privacy-policy',
  '/cerez-politikasi': '/tr/cookie-policy',
  '/blogsayfası': '/tr/blog',
  '/blog/categories/seo': '/tr/blog',
  '/blog/categories/haberler': '/tr/blog',
  '/blog/categories/dijital-pazarlama': '/tr/blog',
  '/portfolio/fundora-entegre-pazarlama-kurgusu': '/tr/portfolio',
  '/portfolio/blackbörg-pr-kurgusu': '/tr/portfolio',
  '/portfolio/kervan-gıda-pr-kurgusu': '/tr/portfolio',
  '/portfolio/project-name-one': '/tr/portfolio',
  '/portfolio/project-name-two': '/tr/portfolio',
  '/portfolio/project-name-three': '/tr/portfolio',
  '/portfolio/project-name-four': '/tr/portfolio',
  '/portfolio/project-name-five': '/tr/portfolio',
  '/portfolio/project-name-six': '/tr/portfolio',
  '/portfolio/project-name-seven': '/tr/portfolio',
  '/portfolio/project-name-eight': '/tr/portfolio',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (legacyRedirectMap[pathname]) {
    request.nextUrl.pathname = legacyRedirectMap[pathname]
    return NextResponse.redirect(request.nextUrl, 308)
  }

  if (pathname.startsWith('/members-area/')) {
    request.nextUrl.pathname = '/tr'
    return NextResponse.redirect(request.nextUrl, 308)
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const acceptLanguage = request.headers.get('accept-language') || ''
  let locale = defaultLocale 

  if (acceptLanguage.toLowerCase().includes('en')) {
    locale = 'en'
  }

  request.nextUrl.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|llms\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico)$).*)',
  ],
}