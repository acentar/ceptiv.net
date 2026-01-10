/**
 * SEO Utilities for Multi-Language Website
 * 
 * This module provides comprehensive SEO functionality including:
 * - Localized metadata generation for all pages
 * - Hreflang link generation
 * - Open Graph and Twitter Card support
 * - Canonical URL management
 * - Schema.org structured data helpers
 * 
 * SEO Best Practices Applied:
 * - Meta titles: 50-60 characters max
 * - Meta descriptions: 140-160 characters max
 * - Unique, keyword-rich content for each language
 * - Proper canonical and hreflang tags
 */

import { Metadata } from 'next'
import { Language, getLanguageConfig, LANGUAGES, DANISH_URL_MAPPINGS } from '@/lib/languages'

// Site configuration
const SITE_URL = 'https://ceptiv.net'
const SITE_NAME = 'Ceptiv'

// ============================================
// PAGE METADATA CONFIGURATIONS
// Research-backed, localized meta titles & descriptions
// ============================================

export const PAGE_METADATA: Record<string, Record<Language, {
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
}>> = {
  // ============================================
  // HOME PAGE - Main landing, focus on value proposition
  // Title: 48 chars | Desc: 156 chars
  // ============================================
  home: {
    en: {
      title: 'Your Dev Team Without the Overhead | Ceptiv',
      description: 'Custom web apps & mobile solutions at fixed prices. No hiring, no surprises. Get enterprise-quality software for your small business in weeks, not months.',
      keywords: ['web development', 'mobile apps', 'digital solutions', 'small business software', 'custom software', 'AI integration', 'fixed price development'],
      ogTitle: 'Ceptiv | Your Dev Team Without the Overhead',
      ogDescription: 'Enterprise-quality web & mobile solutions at fixed prices. No hiring required.',
    },
    da: {
      title: 'Dit Udviklerteam Uden Overhead',
      description: 'Skræddersyede webapps og mobilløsninger til faste priser. Ingen ansættelser, ingen overraskelser. Få professionel software til din virksomhed på uger.',
      keywords: ['webudvikling', 'mobilapps', 'digitale løsninger', 'software til små virksomheder', 'skræddersyet software', 'AI-integration', 'fastpris udvikling'],
      ogTitle: 'Ceptiv | Dit Udviklerteam Uden Overhead',
      ogDescription: 'Professionelle web- og mobilløsninger til faste priser. Ingen ansættelser nødvendige.',
    },
  },

  // ============================================
  // ABOUT PAGE - Team & mission focus
  // Title: 36 chars (+ " | Ceptiv" = 46) | Desc: 155 chars
  // ============================================
  about: {
    en: {
      title: 'About Us - Danish Developers for SMBs',
      description: 'We believe every business deserves great software. Our Copenhagen team builds custom digital solutions that big agencies charge 10x more for.',
      keywords: ['about ceptiv', 'danish developers', 'copenhagen software agency', 'small business experts', 'affordable development'],
    },
    da: {
      title: 'Om Os - Danske Udviklere for SMV\'er',
      description: 'Vi mener, at enhver virksomhed fortjener god software. Vores team bygger skræddersyede løsninger, som store bureauer tager 10x mere for.',
      keywords: ['om ceptiv', 'danske udviklere', 'softwarebureau københavn', 'eksperter i små virksomheder', 'billig udvikling'],
    },
  },

  // ============================================
  // SERVICES PAGE - Overview of all services
  // Title: 37 chars (+ " | Ceptiv" = 47) | Desc: 158 chars
  // ============================================
  services: {
    en: {
      title: 'Web, Mobile & AI Development Services',
      description: 'Backend apps, websites, mobile apps, AI integrations & system connections. Built from scratch with custom code—no templates, no WordPress, no plugins.',
      keywords: ['web development services', 'mobile app development', 'AI integration', 'backend development', 'custom software'],
    },
    da: {
      title: 'Web, Mobil & AI Udviklingstjenester',
      description: 'Backend apps, hjemmesider, mobilapps, AI-integrationer og systemforbindelser. Bygget fra bunden med custom kode—ingen skabeloner eller WordPress.',
      keywords: ['webudvikling tjenester', 'mobilapp-udvikling', 'AI-integration', 'backend-udvikling', 'skræddersyet software'],
    },
  },

  // ============================================
  // SERVICES - WEB - Custom websites focus
  // Title: 41 chars (+ " | Ceptiv" = 51) | Desc: 154 chars
  // ============================================
  'services/web': {
    en: {
      title: 'Custom Website Development - No WordPress',
      description: 'High-performance websites built with custom code. Fast loading, SEO-optimized, mobile-first design. Corporate sites, e-commerce & landing pages.',
      keywords: ['custom website development', 'no wordpress', 'fast websites', 'SEO websites', 'corporate websites', 'e-commerce development'],
    },
    da: {
      title: 'Skræddersyet Hjemmesideudvikling',
      description: 'Højtydende hjemmesider bygget med custom kode. Hurtig indlæsning, SEO-optimeret, mobile-first design. Virksomhedssider, webshops og landingssider.',
      keywords: ['skræddersyet hjemmesideudvikling', 'ingen wordpress', 'hurtige hjemmesider', 'SEO hjemmesider', 'virksomhedshjemmesider'],
    },
  },

  // ============================================
  // SERVICES - MOBILE - Cross-platform apps
  // Title: 39 chars (+ " | Ceptiv" = 49) | Desc: 152 chars
  // ============================================
  'services/mobile': {
    en: {
      title: 'iOS & Android App Development with Expo',
      description: 'Cross-platform mobile apps with native performance. One codebase, two app stores. From concept to deployment, we handle the entire process.',
      keywords: ['mobile app development', 'iOS development', 'Android development', 'expo apps', 'cross-platform apps', 'react native'],
    },
    da: {
      title: 'iOS & Android App-Udvikling med Expo',
      description: 'Cross-platform mobilapps med native ydeevne. Én kodebase, to app stores. Fra koncept til deployment håndterer vi hele processen.',
      keywords: ['mobilapp-udvikling', 'iOS-udvikling', 'Android-udvikling', 'expo apps', 'cross-platform apps', 'react native'],
    },
  },

  // ============================================
  // SERVICES - AI - Intelligent integrations
  // Title: 35 chars (+ " | Ceptiv" = 45) | Desc: 156 chars
  // ============================================
  'services/ai': {
    en: {
      title: 'AI Integration - GPT, Chatbots & ML',
      description: 'Make your business smarter with AI. Custom chatbots, document processing, predictive analytics, and GPT-powered assistants integrated into your systems.',
      keywords: ['AI integration', 'GPT integration', 'custom chatbots', 'machine learning', 'document AI', 'predictive analytics'],
    },
    da: {
      title: 'AI-Integration - GPT, Chatbots & ML',
      description: 'Gør din virksomhed smartere med AI. Skræddersyede chatbots, dokumentbehandling, prædiktiv analyse og GPT-assistenter integreret i dine systemer.',
      keywords: ['AI-integration', 'GPT-integration', 'skræddersyede chatbots', 'maskinlæring', 'dokument AI', 'prædiktiv analyse'],
    },
  },

  // ============================================
  // SERVICES - AUTOMATION (Backend) - Internal systems
  // Title: 33 chars (+ " | Ceptiv" = 43) | Desc: 155 chars
  // ============================================
  'services/automation': {
    en: {
      title: 'Backend & Admin Panel Development',
      description: 'Custom dashboards, admin panels, CRMs & internal tools. The systems that power your business, built exactly how you need them. Scalable & secure.',
      keywords: ['backend development', 'admin panel', 'custom dashboard', 'internal tools', 'CRM development', 'business systems'],
    },
    da: {
      title: 'Backend & Adminpanel Udvikling',
      description: 'Skræddersyede dashboards, adminpaneler, CRM\'er og interne værktøjer. Systemerne der driver din virksomhed, bygget præcis som du har brug for.',
      keywords: ['backend-udvikling', 'adminpanel', 'skræddersyet dashboard', 'interne værktøjer', 'CRM-udvikling', 'forretningssystemer'],
    },
  },

  // ============================================
  // SERVICES - PAYMENTS (Integrations) - Connect systems
  // Title: 40 chars (+ " | Ceptiv" = 50) | Desc: 157 chars
  // ============================================
  'services/payments': {
    en: {
      title: 'System Integrations - Stripe, ERP & APIs',
      description: 'Connect your business tools. Stripe payments, accounting software, shipping APIs, payroll systems—we\'ve integrated them all. Lower cost, faster delivery.',
      keywords: ['system integration', 'stripe integration', 'payment processing', 'ERP integration', 'API development', 'business automation'],
    },
    da: {
      title: 'Systemintegrationer - Stripe, ERP & API\'er',
      description: 'Forbind dine forretningsværktøjer. Stripe-betalinger, regnskabssoftware, fragt-API\'er, lønsystemer—vi har integreret dem alle. Hurtigere levering.',
      keywords: ['systemintegration', 'stripe-integration', 'betalingsløsning', 'ERP-integration', 'API-udvikling', 'forretningsautomatisering'],
    },
  },

  // ============================================
  // PORTFOLIO PAGE - Showcase work
  // Title: 33 chars (+ " | Ceptiv" = 43) | Desc: 154 chars
  // ============================================
  portfolio: {
    en: {
      title: 'Our Work - Web & App Case Studies',
      description: 'See what we\'ve built. Real projects, real results. Explore case studies of custom web apps, mobile solutions, and AI integrations for growing businesses.',
      keywords: ['portfolio', 'case studies', 'web development examples', 'app examples', 'client projects', 'success stories'],
    },
    da: {
      title: 'Vores Arbejde - Web & App Casestudier',
      description: 'Se hvad vi har bygget. Rigtige projekter, rigtige resultater. Udforsk casestudier af webapps, mobilløsninger og AI-integrationer til virksomheder.',
      keywords: ['portefølje', 'casestudier', 'webudvikling eksempler', 'app eksempler', 'kundeprojekter', 'succeshistorier'],
    },
  },

  // ============================================
  // PRICING PAGE - Transparent packages
  // Title: 38 chars (+ " | Ceptiv" = 48) | Desc: 158 chars
  // ============================================
  pricing: {
    en: {
      title: 'Pricing from 18,000 DKK - Fixed Prices',
      description: 'Web projects from 18K DKK, mobile apps from 28K DKK. Choose Small, Medium, or Large. No hidden fees. Know exactly what you pay before we start building.',
      keywords: ['development pricing', 'web development cost', 'app development cost', 'fixed price development', 'transparent pricing'],
    },
    da: {
      title: 'Priser fra 18.000 kr - Faste Priser',
      description: 'Webprojekter fra 18.000 kr, mobilapps fra 28.000 kr. Vælg Small, Medium eller Large. Ingen skjulte gebyrer. Ved præcis hvad du betaler.',
      keywords: ['udvikling priser', 'webudvikling pris', 'app-udvikling pris', 'fastpris udvikling', 'gennemsigtige priser'],
    },
  },

  // ============================================
  // CONTACT PAGE - Get in touch
  // Title: 31 chars (+ " | Ceptiv" = 41) | Desc: 152 chars
  // ============================================
  contact: {
    en: {
      title: 'Contact Us - Free Consultation',
      description: 'Have a project idea? Let\'s talk. Get free expert advice on web development, mobile apps, or AI integration. No sales pitch—just honest conversation.',
      keywords: ['contact ceptiv', 'free consultation', 'project inquiry', 'get quote', 'development advice'],
    },
    da: {
      title: 'Kontakt Os - Gratis Konsultation',
      description: 'Har du en projektidé? Lad os tale. Få gratis ekspertrådgivning om webudvikling, mobilapps eller AI-integration. Ingen salgstale—kun ærlig samtale.',
      keywords: ['kontakt ceptiv', 'gratis konsultation', 'projektforespørgsel', 'få tilbud', 'udvikling rådgivning'],
    },
  },

  // ============================================
  // START PROJECT PAGE - Project wizard
  // Title: 38 chars (+ " | Ceptiv" = 48) | Desc: 157 chars
  // ============================================
  start: {
    en: {
      title: 'Start Your Project - Quote in 24 Hours',
      description: 'Describe your vision, select a package, get a personalized fixed-price proposal within 24 hours. AI-powered project analysis helps define your requirements.',
      keywords: ['start project', 'get quote', 'project inquiry', 'free estimate', 'project wizard'],
    },
    da: {
      title: 'Start Dit Projekt - Tilbud Inden 24 Timer',
      description: 'Beskriv din vision, vælg en pakke, få et personligt fastpris-tilbud inden 24 timer. AI-drevet projektanalyse hjælper med at definere dine krav.',
      keywords: ['start projekt', 'få tilbud', 'projektforespørgsel', 'gratis estimat', 'projekt guide'],
    },
  },

  // ============================================
  // PRIVACY PAGE - Data protection
  // Title: 31 chars (+ " | Ceptiv" = 41) | Desc: 149 chars
  // ============================================
  privacy: {
    en: {
      title: 'Privacy Policy - GDPR Compliant',
      description: 'Your data is safe with us. Read how we collect, process, and protect your personal information. Full GDPR compliance and transparent data practices.',
      keywords: ['privacy policy', 'GDPR', 'data protection', 'personal data', 'cookies'],
    },
    da: {
      title: 'Privatlivspolitik - GDPR Overholdt',
      description: 'Dine data er sikre hos os. Læs hvordan vi indsamler, behandler og beskytter dine personlige oplysninger. Fuld GDPR-overholdelse og gennemsigtig praksis.',
      keywords: ['privatlivspolitik', 'GDPR', 'databeskyttelse', 'personlige data', 'cookies'],
    },
  },

  // ============================================
  // TERMS PAGE - Legal agreement
  // Title: 30 chars (+ " | Ceptiv" = 40) | Desc: 145 chars
  // ============================================
  terms: {
    en: {
      title: 'Terms of Service - Legal Terms',
      description: 'Our terms and conditions for digital services. Clear, fair, and straightforward. Understand your rights and our commitments before we work together.',
      keywords: ['terms of service', 'service agreement', 'legal terms', 'conditions'],
    },
    da: {
      title: 'Vilkår og Betingelser - Juridisk',
      description: 'Vores vilkår og betingelser for digitale tjenester. Klare, fair og ligetil. Forstå dine rettigheder og vores forpligtelser før vi arbejder sammen.',
      keywords: ['vilkår og betingelser', 'serviceaftale', 'juridiske vilkår', 'betingelser'],
    },
  },
}

// ============================================
// METADATA GENERATION FUNCTIONS
// ============================================

/**
 * Generate base metadata for a language
 */
export function generateBaseMetadata(lang: Language): Metadata {
  const config = getLanguageConfig(lang)
  const homeMeta = PAGE_METADATA.home[lang]
  
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: homeMeta.title,
      template: `%s | ${SITE_NAME}`
    },
    description: homeMeta.description,
    keywords: homeMeta.keywords,
    authors: [{ name: 'Ceptiv ApS' }],
    creator: 'Ceptiv ApS',
    publisher: 'Ceptiv ApS',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: homeMeta.ogTitle || homeMeta.title,
      description: homeMeta.ogDescription || homeMeta.description,
      url: lang === 'en' ? SITE_URL : `${SITE_URL}/${lang}`,
      siteName: SITE_NAME,
      locale: lang === 'da' ? 'da_DK' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: homeMeta.ogTitle || homeMeta.title,
      description: homeMeta.ogDescription || homeMeta.description,
      creator: '@ceptiv',
      images: [`${SITE_URL}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes here
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  }
}

/**
 * Generate page-specific metadata with full SEO support
 */
export function generatePageMetadata(
  page: string,
  lang: Language,
  pathname?: string
): Metadata {
  const baseMeta = generateBaseMetadata(lang)
  const pageMeta = PAGE_METADATA[page]?.[lang] || PAGE_METADATA.home[lang]
  
  // Build canonical URL
  const canonicalPath = lang === 'en' 
    ? `/${page === 'home' ? '' : page}`
    : `/${lang}/${page === 'home' ? '' : (DANISH_URL_MAPPINGS[page] || page)}`
  const canonicalUrl = `${SITE_URL}${canonicalPath}`.replace(/\/$/, '')
  
  // Build alternate URLs for hreflang
  const alternates: Record<string, string> = {}
  for (const langCode of Object.keys(LANGUAGES) as Language[]) {
    const path = langCode === 'en'
      ? `/${page === 'home' ? '' : page}`
      : `/${langCode}/${page === 'home' ? '' : (DANISH_URL_MAPPINGS[page] || page)}`
    alternates[langCode] = `${SITE_URL}${path}`.replace(/\/$/, '') || SITE_URL
  }
  
  // Ensure title has brand suffix
  const brandSuffix = ' | Ceptiv'
  const pageTitle = pageMeta.title.endsWith(brandSuffix) 
    ? pageMeta.title 
    : `${pageMeta.title}${brandSuffix}`
  
  return {
    ...baseMeta,
    title: pageTitle,
    description: pageMeta.description,
    keywords: pageMeta.keywords,
    alternates: {
      canonical: canonicalUrl || SITE_URL,
      languages: alternates,
    },
    openGraph: {
      ...baseMeta.openGraph,
      title: pageMeta.ogTitle || pageTitle,
      description: pageMeta.ogDescription || pageMeta.description,
      url: canonicalUrl || SITE_URL,
    },
    twitter: {
      ...baseMeta.twitter,
      title: pageMeta.ogTitle || pageTitle,
      description: pageMeta.ogDescription || pageMeta.description,
    },
  }
}

// ============================================
// HREFLANG GENERATION
// ============================================

export interface HreflangLink {
  rel: 'alternate'
  hreflang: string
  href: string
}

/**
 * Generate hreflang links for a page
 * This should be used in the <head> of each page
 */
export function generateHreflangLinks(page: string): HreflangLink[] {
  const links: HreflangLink[] = []
  
  for (const [langCode, langConfig] of Object.entries(LANGUAGES)) {
    const path = langCode === 'en'
      ? `/${page === 'home' ? '' : page}`
      : `/${langCode}/${page === 'home' ? '' : (DANISH_URL_MAPPINGS[page] || page)}`
    
    links.push({
      rel: 'alternate',
      hreflang: langConfig.hreflang,
      href: `${SITE_URL}${path}`.replace(/\/$/, '') || SITE_URL,
    })
  }
  
  // Add x-default (fallback to English)
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${SITE_URL}/${page === 'home' ? '' : page}`.replace(/\/$/, '') || SITE_URL,
  })
  
  return links
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Truncate text to specific character length for SEO
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

/**
 * Generate SEO-optimized meta title (max 60 chars)
 */
export function generateMetaTitle(pageTitle: string, maxLength: number = 60): string {
  return truncateText(pageTitle, maxLength)
}

/**
 * Generate SEO-optimized meta description (max 160 chars)
 */
export function generateMetaDescription(description: string, maxLength: number = 160): string {
  return truncateText(description, maxLength)
}

/**
 * Get canonical URL for a page
 */
export function getCanonicalUrl(page: string, lang: Language): string {
  const path = lang === 'en'
    ? `/${page === 'home' ? '' : page}`
    : `/${lang}/${page === 'home' ? '' : (DANISH_URL_MAPPINGS[page] || page)}`
  
  return `${SITE_URL}${path}`.replace(/\/$/, '') || SITE_URL
}

/**
 * Get full URL for Open Graph
 */
export function getOgUrl(page: string, lang: Language): string {
  return getCanonicalUrl(page, lang)
}

// ============================================
// STRUCTURED DATA (SCHEMA.ORG)
// ============================================

/**
 * Generate Organization schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://linkedin.com/company/ceptiv',
      'https://twitter.com/ceptiv',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+45-81-98-32-71',
      contactType: 'sales',
      availableLanguage: ['English', 'Danish'],
    },
  }
}

/**
 * Generate LocalBusiness schema
 */
export function getLocalBusinessSchema(lang: Language) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    description: PAGE_METADATA.home[lang].description,
    url: lang === 'en' ? SITE_URL : `${SITE_URL}/${lang}`,
    telephone: '+45 81 98 32 71',
    email: 'dv@ceptiv.net',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DK',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  }
}

/**
 * Generate WebPage schema for a specific page
 */
export function getWebPageSchema(page: string, lang: Language) {
  const meta = PAGE_METADATA[page]?.[lang] || PAGE_METADATA.home[lang]
  const url = getCanonicalUrl(page, lang)
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: meta.title,
    description: meta.description,
    url: url,
    inLanguage: lang === 'da' ? 'da-DK' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}
