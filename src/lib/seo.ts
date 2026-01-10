import { Metadata } from 'next'
import { Language, getLanguageConfig, getAlternativeLanguage } from '@/lib/languages'

// Base metadata for the site
const SITE_CONFIG = {
  name: 'Ceptiv',
  title: 'Ceptiv - Digital Solutions for Small Businesses',
  description: 'Professional web development, mobile apps, and digital solutions for small to mid-size businesses. Get your project started today.',
  url: 'https://ceptiv.net',
  ogImage: '/og-image.jpg'
}

// Danish translations
const DANISH_CONFIG = {
  name: 'Ceptiv',
  title: 'Ceptiv - Digitale Løsninger til Små Virksomheder',
  description: 'Professionel webudvikling, mobilapps og digitale løsninger til små og mellemstore virksomheder. Start dit projekt i dag.',
}

// Page-specific metadata configurations
const PAGE_METAS = {
  home: {
    en: {
      title: 'Ceptiv - Digital Solutions for Small Businesses | Professional Web & App Development',
      description: 'Transform your business with custom web development, mobile apps, and digital solutions. Trusted by small businesses across industries. Start your project today.',
      keywords: 'web development, mobile apps, digital solutions, small business, custom software'
    },
    da: {
      title: 'Ceptiv - Digitale Løsninger til Små Virksomheder | Professionel Web & App Udvikling',
      description: 'Transformér din virksomhed med skræddersyet webudvikling, mobilapps og digitale løsninger. Betroet af små virksomheder på tværs af brancher. Start dit projekt i dag.',
      keywords: 'webudvikling, mobilapps, digitale løsninger, små virksomheder, skræddersyet software'
    }
  },
  about: {
    en: {
      title: 'About Ceptiv - Our Mission, Team & Digital Expertise | Ceptiv',
      description: 'Learn about Ceptiv\'s mission to empower small businesses with cutting-edge digital solutions. Meet our expert team and discover our approach to web and app development.',
      keywords: 'about us, company mission, digital agency, web development team, app development experts'
    },
    da: {
      title: 'Om Ceptiv - Vores Mission, Team & Digitale Ekspertise | Ceptiv',
      description: 'Lær om Ceptiv\'s mission om at styrke små virksomheder med førsteklasses digitale løsninger. Mød vores ekspertteam og opdag vores tilgang til web- og appudvikling.',
      keywords: 'om os, virksomhedsmission, digitalt bureau, webudviklingsteam, appudviklingseksperter'
    }
  },
  services: {
    en: {
      title: 'Digital Services - Web Development, Mobile Apps & Automation | Ceptiv',
      description: 'Comprehensive digital services including custom web development, mobile applications, AI integration, and business automation. Tailored solutions for your business needs.',
      keywords: 'web development services, mobile app development, AI integration, business automation, digital transformation'
    },
    da: {
      title: 'Digitale Tjenester - Webudvikling, Mobilapps & Automatisering | Ceptiv',
      description: 'Omfattende digitale tjenester inklusive skræddersyet webudvikling, mobilapplikationer, AI-integration og forretningsautomatisering. Tilpassede løsninger til dine forretningsbehov.',
      keywords: 'webudviklingstjenester, mobilappudvikling, AI-integration, forretningsautomatisering, digital transformation'
    }
  },
  contact: {
    en: {
      title: 'Contact Ceptiv - Start Your Digital Project Today | Get Quote',
      description: 'Ready to transform your business? Contact Ceptiv for a free consultation. Get expert advice on web development, mobile apps, and digital solutions.',
      keywords: 'contact us, get quote, free consultation, project inquiry, digital solutions quote'
    },
    da: {
      title: 'Kontakt Ceptiv - Start Dit Digitale Projekt I Dag | Få Tilbud',
      description: 'Klar til at transformere din virksomhed? Kontakt Ceptiv for en gratis konsultation. Få ekspertrådgivning om webudvikling, mobilapps og digitale løsninger.',
      keywords: 'kontakt os, få tilbud, gratis konsultation, projektforespørgsel, digitale løsninger tilbud'
    }
  }
}

// Generate base metadata for a language
export function generateBaseMetadata(lang: Language): Metadata {
  const config = getLanguageConfig(lang)
  const siteConfig = lang === 'da' ? { ...SITE_CONFIG, ...DANISH_CONFIG } : SITE_CONFIG

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    keywords: ['web development', 'mobile apps', 'digital solutions', 'small business'],
    authors: [{ name: 'Ceptiv ApS' }],
    creator: 'Ceptiv ApS',
    publisher: 'Ceptiv ApS',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: `${siteConfig.url}/${lang}`,
    },
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: `${siteConfig.url}/${lang}`,
      siteName: siteConfig.name,
      locale: config?.hreflang === 'da' ? 'da_DK' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.title,
      description: siteConfig.description,
      creator: '@ceptiv',
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
  }
}

// Generate page-specific metadata
export function generatePageMetadata(
  page: keyof typeof PAGE_METAS,
  lang: Language,
  customTitle?: string,
  customDescription?: string
): Metadata {
  const baseMeta = generateBaseMetadata(lang)
  const pageMeta = PAGE_METAS[page]?.[lang]

  if (!pageMeta) {
    return baseMeta
  }

  return {
    ...baseMeta,
    title: customTitle || pageMeta.title,
    description: customDescription || pageMeta.description,
    keywords: pageMeta.keywords,
    openGraph: {
      ...baseMeta.openGraph,
      title: customTitle || pageMeta.title,
      description: customDescription || pageMeta.description,
    },
    twitter: {
      ...baseMeta.twitter,
      title: customTitle || pageMeta.title,
      description: customDescription || pageMeta.description,
    },
  }
}

// Generate hreflang links for a page
export function generateHreflangLinks(pathname: string) {
  const links = []

  for (const lang of ['en', 'da'] as const) {
    const config = getLanguageConfig(lang)
    if (config) {
      const url = lang === 'en'
        ? `https://ceptiv.net${pathname.replace('/da', '') || '/'}`
        : `https://ceptiv.net${pathname.replace(/^\/(?!da)/, '/da/')}`

      links.push({
        rel: 'alternate',
        hreflang: config.hreflang,
        href: url
      })
    }
  }

  // Add x-default
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `https://ceptiv.net${pathname.replace('/da', '') || '/'}`
  })

  return links
}

// Utility to truncate text to specific character lengths
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

// Generate SEO-optimized meta title
export function generateMetaTitle(pageTitle: string, lang: Language, maxLength: number = 60): string {
  const config = getLanguageConfig(lang)
  const baseTitle = config?.default ? pageTitle : `${pageTitle} | Ceptiv`

  return truncateText(baseTitle, maxLength)
}

// Generate SEO-optimized meta description
export function generateMetaDescription(description: string, lang: Language, maxLength: number = 160): string {
  return truncateText(description, maxLength)
}