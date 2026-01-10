import { NextRequest } from 'next/server'
import { LANGUAGES, TRANSLATABLE_ROUTES } from '@/lib/languages'

const SITE_URL = 'https://ceptiv.net'

export async function GET(request: NextRequest) {
  // Generate sitemap URLs for all language-route combinations
  const urls = []

  for (const lang of Object.keys(LANGUAGES)) {
    for (const route of TRANSLATABLE_ROUTES) {
      // For English (default), don't include language prefix in URL
      // For other languages, include the language prefix
      const url = lang === 'en'
        ? `${SITE_URL}${route || '/'}`
        : `${SITE_URL}/${lang}${route || '/'}`

      // Add the URL with lastmod (current date for simplicity)
      urls.push({
        url,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8
      })
    }
  }

  // Generate XML sitemap with hreflang annotations
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${urls.map(({ url, lastModified, changeFrequency, priority }) => {
  // Generate hreflang links for this URL
  let hreflangLinks = Object.entries(LANGUAGES).map(([langCode, langConfig]) => {
    // For English, remove language prefix if present
    const cleanUrl = url.replace('/en', '')
    // For other languages, ensure correct language prefix
    const hreflangUrl = langCode === 'en'
      ? cleanUrl
      : cleanUrl.replace(/https:\/\/ceptiv\.net/, `https://ceptiv.net/${langCode}`)

    return `    <xhtml:link rel="alternate" hreflang="${langConfig.hreflang}" href="${hreflangUrl}" />`
  }).join('\n')

  // Add x-default (usually English)
  const xDefaultUrl = url.replace('/da', '')
  hreflangLinks += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultUrl}" />`

  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks}
  </url>`
}).join('\n')}

</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}