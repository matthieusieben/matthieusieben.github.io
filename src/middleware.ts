import Accept from '@hapi/accept'
import { NextRequest, NextResponse } from 'next/server'
// import buildCsp from 'content-security-policy-builder'

import { defaultLocale, availableLocales } from '@/constants'
import { arrayIncludes } from '@/utils/array'

function negotiateRequestLocale(
  request: NextRequest,
  allowedLocales: readonly [string, ...string[]]
): string {
  const acceptLanguage = request.headers.get('Accept-Language')
  if (!acceptLanguage) return allowedLocales[0]

  // https://github.com/hapijs/accept/pull/73/files
  const acceptedLocale = Accept.language(acceptLanguage, [...allowedLocales])
  if (!acceptedLocale) return allowedLocales[0]

  return acceptedLocale
}

function getRedirectUrl(request: NextRequest): URL | null {
  const firstSegment = request.nextUrl.pathname.split('/', 2)[1]
  if (arrayIncludes(availableLocales, firstSegment)) return null

  const locale = negotiateRequestLocale(request, availableLocales)
  if (locale === defaultLocale) return null

  return new URL(`/${locale}${request.nextUrl.pathname}`, request.url)
}

export const middleware = function (request: NextRequest) {
  const redirectUrl = getRedirectUrl(request)
  if (redirectUrl) return NextResponse.redirect(redirectUrl)

  const headers = new Headers()

  // // https://nextjs.org/docs/pages/building-your-application/configuring/content-security-policy
  // if (process.env.NODE_ENV !== 'development') {
  //   const nonce = crypto.randomUUID()
  //   const cspHeader = buildCsp({
  //     directives: {
  //       'default-src': [`'self'`],
  //       'script-src': [`'self'`, `'nonce-${nonce}'`, `'strict-dynamic'`],
  //       'style-src': [`'self'`, `'unsafe-inline'`],
  //       'connect-src': ['https://vitals.vercel-insights.com'],
  //       'img-src': [`'self'`, `data:`],
  //       'font-src': [`'self'`],
  //       'object-src': [`'none'`],
  //       'base-uri': [`'self'`],
  //       'form-action': [`'self'`],
  //       'frame-ancestors': [`'none'`],
  //       'block-all-mixed-content': true,
  //       'upgrade-insecure-requests': true,
  //     },
  //   })
  //   headers.set('Content-Security-Policy', cspHeader)
  // }

  return NextResponse.next({ headers })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js files)
     * - favicon.ico (favicon file)
     */
    {
      source:
        '/((?!api|_next|robots.txt|sitemap.xml|favicon.ico|apple-icon|icon).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
