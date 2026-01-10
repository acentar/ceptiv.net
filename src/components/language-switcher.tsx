'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/use-language'
import { ArrowRight } from 'lucide-react'

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark'
}

export function LanguageSwitcher({ variant = 'light' }: LanguageSwitcherProps) {
  const { currentLanguage } = useLanguage()

  const isDark = variant === 'dark'

  // Show link to the other language's homepage
  const isEnglish = currentLanguage === 'en'
  const targetHref = isEnglish ? '/da' : '/'
  const linkText = isEnglish ? 'Vores danske website' : 'Our english website'

  return (
    <Link 
      href={targetHref}
      className={`inline-flex items-center gap-2 text-sm font-medium transition-colors group ${
        isDark 
          ? 'text-neutral-400 hover:text-white' 
          : 'text-neutral-600 hover:text-neutral-900'
      }`}
    >
      <span>{linkText}</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
