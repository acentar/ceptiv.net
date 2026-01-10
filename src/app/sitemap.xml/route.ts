/**
 * Dynamic XML Sitemap with Hreflang Annotations
 * 
 * This sitemap follows SEO best practices for multi-language sites:
 * - Includes all language versions of each page
 * - Proper hreflang annotations for language targeting
 * - x-default fallback for unmatched regions
 * - Localized Danish URLs (e.g., /da/om-os instead of /da/about)
 * - Priority and change frequency hints for crawlers
 * 
 * Submit this sitemap to Google Search Console for both language versions.
 */

import { NextRequest } from 'next/server'
import { LANGUAGES, TRANSLATABLE_ROUTES, DANISH_URL_MAPPINGS } from '@/lib/languages'

const SITE_URL = 'https://ceptiv.net'

// Page priority configuration
const PAGE_PRIORITIES: Record<string, number> = {
  '': 1.0,           // Home page - highest priority
  'services': 0.9,
  'pricing': 0.9,
  'contact': 0.8,
  'start': 0.8,
  'about': 0.7,
  'portfolio': 0.7,
  'services/web': 0.7,
  'services/mobile': 0.7,
  'services/ai': 0.7,
  'services/automation': 0.7,
  'services/payments': 0.7,
  'privacy': 0.3,
  'terms': 0.3,
}

// Change frequency configuration
const PAGE_CHANGE_FREQ: Record<string, string> = {
  '': 'weekly',
  'services': 'monthly',
  'pricing': 'weekly',      // Pricing may change
  'contact': 'monthly',
  'start': 'monthly',
  'about': 'monthly',
  'portfolio': 'weekly',    // New projects added
  'privacy': 'yearly',
  'terms': 'yearly',
}

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: string
  priority: number
  alternates: { hreflang: string; href: string }[]
}

export async function GET(request: NextRequest) {
  const now = new Date().toISOString()
  const urls: SitemapUrl[] = []
  
  // Generate URLs for each translatable route
  for (const route of TRANSLATABLE_ROUTES) {
    // Build alternates for hreflang
    const alternates: { hreflang: string; href: string }[] = []
    
    for (const [langCode, langConfig] of Object.entries(LANGUAGES)) {
      let url: string
      
      if (langCode === 'en') {
        // English (default): no language prefix
        url = route ? `${SITE_URL}/${route}` : SITE_URL
      } else {
        // Danish: use language prefix and localized slug
        const localizedSlug = DANISH_URL_MAPPINGS[route] || route
        url = localizedSlug ? `${SITE_URL}/${langCode}/${localizedSlug}` : `${SITE_URL}/${langCode}`
      }
      
      alternates.push({
        hreflang: langConfig.hreflang,
        href: url,
      })
    }
    
    // Add x-default (English version)
    const xDefaultUrl = route ? `${SITE_URL}/${route}` : SITE_URL
    alternates.push({
      hreflang: 'x-default',
      href: xDefaultUrl,
    })
    
    // Add English version
    urls.push({
      loc: xDefaultUrl,
      lastmod: now,
      changefreq: PAGE_CHANGE_FREQ[route] || 'monthly',
      priority: PAGE_PRIORITIES[route] ?? 0.5,
      alternates,
    })
    
    // Add Danish version
    const danishSlug = DANISH_URL_MAPPINGS[route] || route
    const danishUrl = danishSlug ? `${SITE_URL}/da/${danishSlug}` : `${SITE_URL}/da`
    urls.push({
      loc: danishUrl,
      lastmod: now,
      changefreq: PAGE_CHANGE_FREQ[route] || 'monthly',
      priority: PAGE_PRIORITIES[route] ?? 0.5,
      alternates,
    })
  }
  
  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
${url.alternates.map(alt => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(alt.href)}" />`).join('\n')}
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'noindex', // Sitemap should not be indexed itself
    },
  })
}

// Escape special XML characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
