import { NextRequest, NextResponse } from 'next/server'
import buildCsp from 'content-security-policy-builder'

// https://nextjs.org/docs/pages/building-your-application/configuring/content-security-policy

export function middleware(request: NextRequest) {
  const headers = new Headers()

  if (process.env.NODE_ENV !== 'development') {
    const nonce = crypto.randomUUID()
    const cspHeader = buildCsp({
      directives: {
        'default-src': [`'self'`],
        'script-src': [`'self'`, `'nonce-${nonce}'`, `'strict-dynamic'`],
        'style-src': [`'self'`, `'unsafe-inline'`],
        'connect-src': ['https://vitals.vercel-insights.com'],
        'img-src': [`'self'`, `blob:`, `data:`],
        'font-src': [`'self'`],
        'object-src': [`'none'`],
        'base-uri': [`'self'`],
        'form-action': [`'self'`],
        'frame-ancestors': [`'none'`],
        'block-all-mixed-content': true,
        'upgrade-insecure-requests': true,
      },
    })
    headers.set('Content-Security-Policy', cspHeader)
  }

  return NextResponse.next({ headers })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
