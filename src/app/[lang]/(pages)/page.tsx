/**
 * Language-Specific Home Page
 * 
 * URL Structure:
 * - /    → English homepage (root page.tsx)
 * - /da  → Danish homepage (this page)
 * - /en  → Redirects to / (clean English URL)
 */

import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo'
import { Language, isSupportedLanguage, DEFAULT_LANGUAGE } from '@/lib/languages'
import HomePage from '@/app/page'

interface PageProps {
  params: Promise<{
    lang: string
  }>
}

// Generate static params for Danish only (English homepage is at root)
export async function generateStaticParams() {
  return [{ lang: 'da' }]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const lang = resolvedParams.lang as Language

  if (!isSupportedLanguage(lang)) {
    return {}
  }

  return generatePageMetadata('home', lang)
}

export default async function LangPage({ params }: PageProps) {
  const resolvedParams = await params
  const lang = resolvedParams.lang as Language

  // Validate language
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  // Redirect /en to / (clean English URL)
  if (lang === DEFAULT_LANGUAGE) {
    redirect('/')
  }

  // For Danish, render the homepage
  // In future, pass lang prop: <HomePage lang={lang} />
  return <HomePage />
}
