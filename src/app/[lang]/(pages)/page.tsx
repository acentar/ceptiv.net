import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/seo'
import { Language, isSupportedLanguage } from '@/lib/languages'
import HomePage from '@/app/page'

interface PageProps {
  params: Promise<{
    lang: string
  }>
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

  // For now, return the original homepage
  // In a full implementation, this would render translated content
  return <HomePage />
}