'use client'

import { useEffect } from 'react'
import { Language } from '@/lib/languages'

interface HtmlLangSetterProps {
  lang: Language
}

/**
 * Client component that sets the HTML lang attribute dynamically.
 * This is needed because nested layouts in Next.js can't render <html> tags.
 */
export function HtmlLangSetter({ lang }: HtmlLangSetterProps) {
  useEffect(() => {
    // Update the html lang attribute on the client
    document.documentElement.lang = lang
    document.documentElement.dir = 'ltr'
  }, [lang])

  return null
}
