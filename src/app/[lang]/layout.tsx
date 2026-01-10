/**
 * Language-Specific Layout
 * 
 * This layout handles:
 * - Language-specific base metadata
 * - Validation of supported languages
 * - Dynamic HTML lang attribute via client component
 * 
 * Note: Does NOT render <html> or <body> tags - those are in root layout.
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateBaseMetadata } from '@/lib/seo'
import { Language, isSupportedLanguage, LANGUAGES } from '@/lib/languages'
import { HtmlLangSetter } from '@/components/seo/html-lang-setter'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{
    lang: string
  }>
}

// Generate static params for all supported languages
export async function generateStaticParams() {
  return Object.keys(LANGUAGES).map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const resolvedParams = await params
  const lang = resolvedParams.lang as Language

  if (!isSupportedLanguage(lang)) {
    return {}
  }

  return generateBaseMetadata(lang)
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const resolvedParams = await params
  const lang = resolvedParams.lang as Language

  // Validate language - return 404 for unsupported languages
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  return (
    <>
      <HtmlLangSetter lang={lang} />
      {children}
    </>
  )
}
