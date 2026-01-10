'use client'

import { useLanguage } from '@/hooks/use-language'
import { generateHreflangLinks } from '@/lib/seo'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface LanguageLayoutProps {
  children: React.ReactNode
}

export function LanguageLayout({ children }: LanguageLayoutProps) {
  const { currentLanguage, languageConfig } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && languageConfig) {
      // Update html lang attribute
      document.documentElement.lang = languageConfig.hreflang

      // Add hreflang links to head
      const hreflangLinks = generateHreflangLinks(pathname)

      // Remove existing hreflang links
      const existingLinks = document.querySelectorAll('link[rel="alternate"][hreflang]')
      existingLinks.forEach(link => link.remove())

      // Add new hreflang links
      hreflangLinks.forEach(link => {
        const linkElement = document.createElement('link')
        linkElement.rel = link.rel
        linkElement.hreflang = link.hreflang
        linkElement.href = link.href
        document.head.appendChild(linkElement)
      })
    }
  }, [currentLanguage, pathname, languageConfig])

  return <>{children}</>
}