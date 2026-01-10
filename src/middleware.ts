import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  extractLanguageFromPath,
  addLanguagePrefix,
  removeLanguagePrefix
} from '@/lib/languages'

// Paths that should not be prefixed with language
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

  // If no language prefix, redirect to default language
  if (!firstSegment || !SUPPORTED_LANGUAGES.includes(firstSegment as any)) {
    const newPath = addLanguagePrefix(pathname, DEFAULT_LANGUAGE)
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  // If language is supported, continue normally
  if (SUPPORTED_LANGUAGES.includes(firstSegment as any)) {
    return NextResponse.next()
  }

  // Fallback: redirect to default language
  const newPath = addLanguagePrefix(pathname, DEFAULT_LANGUAGE)
  return NextResponse.redirect(new URL(newPath, request.url))
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