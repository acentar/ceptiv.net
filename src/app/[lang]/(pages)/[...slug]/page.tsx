/**
 * Dynamic Catch-All Page for Language Routes
 * 
 * URL Structure:
 * - English: /about, /services (handled by root pages in /app/about, /app/services)
 * - Danish: /da/om-os, /da/tjenester (handled here with Danish slugs)
 * - /en/* redirects to clean English URLs without prefix
 * 
 * This page renders the same components as English pages but can pass 
 * the language prop for future translation support.
 */

import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo'
import { Language, isSupportedLanguage, DANISH_URL_MAPPINGS, DEFAULT_LANGUAGE } from '@/lib/languages'

// Import page components (same as English root pages)
import AboutPage from '@/app/about/page'
import ServicesPage from '@/app/services/page'
import PortfolioPage from '@/app/portfolio/page'
import PricingPage from '@/app/pricing/page'
import ContactPage from '@/app/contact/page'
import PrivacyPage from '@/app/privacy/page'
import TermsPage from '@/app/terms/page'
import StartPage from '@/app/start/page'
import WebServicePage from '@/app/services/web/page'
import MobileServicePage from '@/app/services/mobile/page'
import AiServicePage from '@/app/services/ai/page'
import AutomationServicePage from '@/app/services/automation/page'
import PaymentsServicePage from '@/app/services/payments/page'

interface PageProps {
  params: Promise<{
    lang: string
    slug: string[]
  }>
}

// Reverse mapping: Danish slug → English page key
const DANISH_TO_ENGLISH: Record<string, string> = {}
for (const [en, da] of Object.entries(DANISH_URL_MAPPINGS)) {
  DANISH_TO_ENGLISH[da] = en
}

// Map page keys to components
const PAGE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'about': AboutPage,
  'services': ServicesPage,
  'services/web': WebServicePage,
  'services/mobile': MobileServicePage,
  'services/ai': AiServicePage,
  'services/automation': AutomationServicePage,
  'services/payments': PaymentsServicePage,
  'portfolio': PortfolioPage,
  'pricing': PricingPage,
  'contact': ContactPage,
  'privacy': PrivacyPage,
  'terms': TermsPage,
  'start': StartPage,
}

// Generate static params for Danish routes only
// English routes are handled by root-level pages
export async function generateStaticParams() {
  const params: { lang: string; slug: string[] }[] = []
  
  // Generate Danish routes with localized slugs
  for (const [, danishSlug] of Object.entries(DANISH_URL_MAPPINGS)) {
    params.push({ lang: 'da', slug: danishSlug.split('/') })
  }
  
  return params
}

// Resolve slug to page key based on language
function resolveSlugToPageKey(slug: string[], lang: Language): string | null {
  const fullSlug = slug.join('/')
  
  if (lang === 'da') {
    // For Danish, convert localized slug to English page key
    const englishPageKey = DANISH_TO_ENGLISH[fullSlug]
    if (englishPageKey !== undefined) {
      return englishPageKey
    }
    // Fallback: check if English slug was used (still works but not SEO optimal)
    if (fullSlug in PAGE_COMPONENTS) {
      return fullSlug
    }
  } else if (lang === 'en') {
    // For /en/ prefix, just return the slug if it's a valid page
    if (fullSlug in PAGE_COMPONENTS) {
      return fullSlug
    }
  }
  
  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const lang = resolvedParams.lang as Language
  const slug = resolvedParams.slug

  if (!isSupportedLanguage(lang)) {
    return {}
  }

  const pageKey = resolveSlugToPageKey(slug, lang)
  if (!pageKey) {
    return {}
  }

  return generatePageMetadata(pageKey, lang)
}

export default async function CatchAllPage({ params }: PageProps) {
  const resolvedParams = await params
  const lang = resolvedParams.lang as Language
  const slug = resolvedParams.slug

  // Validate language
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  // For /en/* URLs, redirect to clean English URLs (no prefix)
  // e.g., /en/about → /about
  if (lang === DEFAULT_LANGUAGE) {
    const fullSlug = slug.join('/')
    redirect(`/${fullSlug}`)
  }

  // Resolve the slug to a page key
  const pageKey = resolveSlugToPageKey(slug, lang)
  
  if (!pageKey) {
    notFound()
  }

  // Get the component
  const PageComponent = PAGE_COMPONENTS[pageKey]
  
  if (!PageComponent) {
    notFound()
  }

  // Render the page component
  // In future, pass lang prop: <PageComponent lang={lang} />
  return <PageComponent />
}
