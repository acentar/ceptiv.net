'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Language,
  LanguageConfig,
  extractLanguageFromPath,
  getLanguageConfig,
  getAlternativeLanguage,
  addLanguagePrefix,
  removeLanguagePrefix,
  DEFAULT_LANGUAGE
} from '@/lib/languages'

export function useLanguage() {
  const pathname = usePathname()
  const router = useRouter()
  const [currentLanguage, setCurrentLanguage] = useState<Language>(DEFAULT_LANGUAGE)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const detectedLang = extractLanguageFromPath(pathname)
    setCurrentLanguage(detectedLang)
    setIsLoading(false)
  }, [pathname])

  const languageConfig = getLanguageConfig(currentLanguage)
  const alternativeLanguage = getAlternativeLanguage(currentLanguage)
  const alternativeConfig = getLanguageConfig(alternativeLanguage)

  const switchLanguage = (newLang: Language) => {
    if (newLang === currentLanguage) return

    const cleanPath = removeLanguagePrefix(pathname)
    const newPath = addLanguagePrefix(cleanPath, newLang)
    router.push(newPath)
  }

  const getLocalizedPath = (path: string, lang?: Language) => {
    const targetLang = lang || currentLanguage
    return addLanguagePrefix(path, targetLang)
  }

  return {
    currentLanguage,
    languageConfig,
    alternativeLanguage,
    alternativeConfig,
    switchLanguage,
    getLocalizedPath,
    isLoading
  }
}

// Hook for getting language-specific content
export function useTranslations() {
  const { currentLanguage } = useLanguage()

  // This would typically load from a translation file
  // For now, return the language code for testing
  return {
    lang: currentLanguage,
    // Placeholder for translation function
    t: (key: string) => `${currentLanguage}:${key}`
  }
}