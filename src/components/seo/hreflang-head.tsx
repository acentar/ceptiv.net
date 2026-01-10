/**
 * HreflangHead Component
 * 
 * Injects hreflang link tags into the document head for multi-language SEO.
 * These tags tell search engines about alternate language versions of a page,
 * helping them serve the correct version to users based on their language/location.
 * 
 * Usage:
 *   <HreflangHead page="about" currentLang="en" />
 * 
 * Output:
 *   <link rel="alternate" hreflang="en" href="https://ceptiv.net/about" />
 *   <link rel="alternate" hreflang="da" href="https://ceptiv.net/da/om-os" />
 *   <link rel="alternate" hreflang="x-default" href="https://ceptiv.net/about" />
 */

import { LANGUAGES, DANISH_URL_MAPPINGS, Language } from '@/lib/languages'

const SITE_URL = 'https://ceptiv.net'

interface HreflangHeadProps {
  page: string
  currentLang: Language
}

export function HreflangHead({ page, currentLang }: HreflangHeadProps) {
  // Generate URLs for each language
  const links = Object.entries(LANGUAGES).map(([langCode, langConfig]) => {
    let path: string
    
    if (langCode === 'en') {
      // English (default): no language prefix
      path = page === 'home' ? '' : `/${page}`
    } else {
      // Other languages: use language prefix and localized slug
      const localizedSlug = DANISH_URL_MAPPINGS[page] || page
      path = page === 'home' ? `/${langCode}` : `/${langCode}/${localizedSlug}`
    }
    
    const href = `${SITE_URL}${path}`.replace(/\/$/, '') || SITE_URL
    
    return {
      hreflang: langConfig.hreflang,
      href,
    }
  })
  
  // Add x-default (typically the English version)
  const xDefaultPath = page === 'home' ? '' : `/${page}`
  const xDefaultHref = `${SITE_URL}${xDefaultPath}`.replace(/\/$/, '') || SITE_URL
  
  return (
    <>
      {links.map(({ hreflang, href }) => (
        <link
          key={hreflang}
          rel="alternate"
          hrefLang={hreflang}
          href={href}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={xDefaultHref}
      />
    </>
  )
}

/**
 * Generate hreflang data for use in metadata alternates
 * For use with Next.js generateMetadata function
 */
export function getHreflangAlternates(page: string): Record<string, string> {
  const alternates: Record<string, string> = {}
  
  for (const langCode of Object.keys(LANGUAGES) as Language[]) {
    let path: string
    
    if (langCode === 'en') {
      path = page === 'home' ? '' : `/${page}`
    } else {
      const localizedSlug = DANISH_URL_MAPPINGS[page] || page
      path = page === 'home' ? `/${langCode}` : `/${langCode}/${localizedSlug}`
    }
    
    alternates[langCode] = `${SITE_URL}${path}`.replace(/\/$/, '') || SITE_URL
  }
  
  return alternates
}

/**
 * Generate canonical URL for a page
 */
export function getCanonicalUrl(page: string, lang: Language): string {
  let path: string
  
  if (lang === 'en') {
    path = page === 'home' ? '' : `/${page}`
  } else {
    const localizedSlug = DANISH_URL_MAPPINGS[page] || page
    path = page === 'home' ? `/${lang}` : `/${lang}/${localizedSlug}`
  }
  
  return `${SITE_URL}${path}`.replace(/\/$/, '') || SITE_URL
}
