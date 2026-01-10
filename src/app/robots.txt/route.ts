/**
 * Dynamic robots.txt Generation
 * 
 * SEO Best Practices:
 * - Allow all crawlers access to main content
 * - Reference sitemap for efficient crawling
 * - Block admin and client portal areas
 * - Don't block language folders
 */

import { NextRequest } from 'next/server'

const SITE_URL = 'https://ceptiv.net'

export async function GET(request: NextRequest) {
  const robots = `# Ceptiv - robots.txt
# https://ceptiv.net

# Allow all crawlers
User-agent: *
Allow: /

# Block admin and client areas
Disallow: /admin/
Disallow: /client/
Disallow: /api/

# Block login pages
Disallow: /*/login
Disallow: /login

# Block test pages
Disallow: /test-*

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl delay (optional - be nice to servers)
# Crawl-delay: 1
`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
