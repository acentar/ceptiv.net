// Language configuration for multi-language SEO setup
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
    hreflang: 'en',
    default: true
  },
  da: {
    code: 'da',
    name: 'Danish',
    nativeName: 'Dansk',
    flag: '🇩🇰',
    dir: 'ltr',
    hreflang: 'da',
    default: false
  }
} as const

export type Language = keyof typeof LANGUAGES
export type LanguageConfig = typeof LANGUAGES[Language]

// Default language
export const DEFAULT_LANGUAGE: Language = 'en'

// Supported languages array
export const SUPPORTED_LANGUAGES: Language[] = Object.keys(LANGUAGES) as Language[]

// Get language config by code
export const getLanguageConfig = (code: string): LanguageConfig | null => {
  return LANGUAGES[code as Language] || null
}

// Check if language is supported
export const isSupportedLanguage = (code: string): code is Language => {
  return code in LANGUAGES
}

// Get default language config
export const getDefaultLanguage = (): LanguageConfig => {
  return LANGUAGES[DEFAULT_LANGUAGE]
}

// Get alternative language (for hreflang)
export const getAlternativeLanguage = (currentLang: Language): Language => {
  return currentLang === 'en' ? 'da' : 'en'
}

// URL path patterns
export const LANGUAGE_PREFIX = '/:lang(en|da)'

// Page routes that need translation
export const TRANSLATABLE_ROUTES = [
  '',
  'about',
  'services',
  'services/web',
  'services/mobile',
  'services/ai',
  'services/automation',
  'services/payments',
  'portfolio',
  'pricing',
  'contact',
  'privacy',
  'terms',
  'start'
] as const

export type TranslatableRoute = typeof TRANSLATABLE_ROUTES[number]

// Danish URL mappings for SEO-friendly URLs
export const DANISH_URL_MAPPINGS: Record<string, string> = {
  'about': 'om-os',
  'services': 'tjenester',
  'services/web': 'tjenester/web',
  'services/mobile': 'tjenester/mobil',
  'services/ai': 'tjenester/ai',
  'services/automation': 'tjenester/automatisering',
  'services/payments': 'tjenester/betalinger',
  'portfolio': 'portefolio',
  'pricing': 'priser',
  'contact': 'kontakt',
  'privacy': 'privatliv',
  'terms': 'vilkar',
  'start': 'start'
}

/**
 * Get URL for specific language
 * 
 * URL Structure:
 * - English: /about, /services (no prefix, clean URLs)
 * - Danish: /da/om-os, /da/tjenester (with /da/ prefix and Danish slugs)
 * 
 * @param route - English route key (e.g., 'about', 'services')
 * @param lang - Target language
 * @returns Localized URL path
 */
export const getLocalizedUrl = (route: string, lang: Language): string => {
  // Clean the route (remove leading/trailing slashes)
  const cleanRoute = route.replace(/^\/+|\/+$/g, '')
  
  if (lang === 'en') {
    // English uses clean URLs without language prefix
    return cleanRoute ? `/${cleanRoute}` : '/'
  }

  // Danish uses /da/ prefix with localized slugs
  const danishSlug = DANISH_URL_MAPPINGS[cleanRoute] || cleanRoute
  return danishSlug ? `/da/${danishSlug}` : '/da'
}

// Extract language from URL path
export const extractLanguageFromPath = (path: string): Language => {
  const segments = path.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (isSupportedLanguage(firstSegment)) {
    return firstSegment
  }

  return DEFAULT_LANGUAGE
}

// Remove language prefix from path
export const removeLanguagePrefix = (path: string): string => {
  const segments = path.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (isSupportedLanguage(firstSegment)) {
    return '/' + segments.slice(1).join('/')
  }

  return path
}

// Add language prefix to path
export const addLanguagePrefix = (path: string, lang: Language): string => {
  if (lang === DEFAULT_LANGUAGE) {
    return path
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `/${lang}${cleanPath}`
}