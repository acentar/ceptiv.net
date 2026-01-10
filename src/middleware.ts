import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SUPPORTED_LANGUAGES } from '@/lib/languages'

/**
 * Middleware for Multi-Language Routing
 * 
 * URL Structure:
 * - English (default): /about, /services, /pricing (no /en/ prefix)
 * - Danish: /da/om-os, /da/tjenester, /da/priser (with /da/ prefix and Danish slugs)
 * 
 * The middleware only handles /da/* routes and lets everything else pass through
 * to be handled by the existing page files in the /app directory.
 */

// Paths that should never go through language routing
const EXCLUDED_PATHS = [
  '/api',
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/admin',
  '/client'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for excluded paths
  if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Skip middleware for static files
  if (pathname.includes('.') && !pathname.includes('/api/')) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  // If first segment is a supported language (da or en), let it through to [lang] routes
  if (SUPPORTED_LANGUAGES.includes(firstSegment as any)) {
    return NextResponse.next()
  }

  // For all other paths (English pages), let them through to root-level pages
  // e.g., /about → src/app/about/page.tsx
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}