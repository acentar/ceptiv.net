/**
 * Structured Data (Schema.org) Components
 * 
 * These components inject JSON-LD structured data into the page,
 * helping search engines understand the content and potentially
 * display rich snippets in search results.
 * 
 * Types of structured data:
 * - Organization: Company information
 * - LocalBusiness: Local business details
 * - WebPage: Page-specific information
 * - Service: Service offerings
 * - FAQPage: Frequently asked questions
 * - BreadcrumbList: Navigation breadcrumbs
 */

import Script from 'next/script'
import { Language } from '@/lib/languages'
import { PAGE_METADATA } from '@/lib/seo'

const SITE_URL = 'https://ceptiv.net'
const SITE_NAME = 'Ceptiv'

/**
 * Organization Schema
 * Describes the company/organization
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 200,
      height: 60,
    },
    image: `${SITE_URL}/og-image.jpg`,
    description: 'Professional web development, mobile apps, and digital solutions for small to mid-size businesses.',
    email: 'dv@ceptiv.net',
    telephone: '+45 81 98 32 71',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DK',
      addressLocality: 'Denmark',
    },
    sameAs: [
      'https://linkedin.com/company/ceptiv',
      'https://twitter.com/ceptiv',
      'https://github.com/ceptiv',
    ],
    foundingDate: '2024',
    knowsLanguage: ['en', 'da'],
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Local Business Schema
 * For local SEO optimization
 */
export function LocalBusinessSchema({ lang }: { lang: Language }) {
  const meta = PAGE_METADATA.home[lang]
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    description: meta.description,
    url: lang === 'en' ? SITE_URL : `${SITE_URL}/${lang}`,
    telephone: '+45 81 98 32 71',
    email: 'dv@ceptiv.net',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.6761,
      longitude: 12.5683,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Denmark',
      },
      {
        '@type': 'Country',
        name: 'Global',
      },
    ],
    serviceType: [
      'Web Development',
      'Mobile App Development',
      'AI Integration',
      'Business Automation',
      'System Integration',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    parentOrganization: {
      '@id': `${SITE_URL}/#organization`,
    },
  }

  return (
    <Script
      id="localbusiness-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * WebSite Schema
 * Describes the website itself
 */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: 'Professional web development, mobile apps, and digital solutions',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: ['en', 'da'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * WebPage Schema
 * For individual pages
 */
interface WebPageSchemaProps {
  page: string
  lang: Language
  url: string
}

export function WebPageSchema({ page, lang, url }: WebPageSchemaProps) {
  const meta = PAGE_METADATA[page]?.[lang] || PAGE_METADATA.home[lang]
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url: url,
    name: meta.title,
    description: meta.description,
    inLanguage: lang === 'da' ? 'da-DK' : 'en-US',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#organization`,
    },
    dateModified: new Date().toISOString(),
  }

  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Service Schema
 * For service pages
 */
interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  lang: Language
}

export function ServiceSchema({ name, description, url, lang }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: name,
    description: description,
    url: url,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: lang === 'da' ? 'Denmark' : 'Worldwide',
    },
    serviceType: name,
  }

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Breadcrumb Schema
 * For navigation breadcrumbs
 */
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * FAQ Schema
 * For FAQ sections
 */
interface FAQItem {
  question: string
  answer: string
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Combined Schema for common pages
 * Includes Organization, WebSite, and WebPage schemas
 */
interface PageSchemaProps {
  page: string
  lang: Language
  url: string
}

export function PageSchema({ page, lang, url }: PageSchemaProps) {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <WebPageSchema page={page} lang={lang} url={url} />
    </>
  )
}
