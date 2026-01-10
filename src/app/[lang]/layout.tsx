import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateBaseMetadata } from '@/lib/seo'
import { Language, isSupportedLanguage } from '@/lib/languages'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{
    lang: string
  }>
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

  // Validate language
  if (!isSupportedLanguage(lang)) {
    notFound()
  }

  return (
    <html lang={lang === 'da' ? 'da' : 'en'}>
      <body>
        {children}
      </body>
    </html>
  )
}