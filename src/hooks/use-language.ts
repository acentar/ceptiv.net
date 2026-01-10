'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback, useMemo } from 'react'
import {
  Language,
  extractLanguageFromPath,
  getLanguageConfig,
  getAlternativeLanguage,
  addLanguagePrefix,
  removeLanguagePrefix,
  DEFAULT_LANGUAGE,
  DANISH_URL_MAPPINGS
} from '@/lib/languages'
import { getTranslations, t as translate, tWithVars, Translations } from '@/lib/translations'

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

  const switchLanguage = useCallback((newLang: Language) => {
    if (newLang === currentLanguage) return

    const cleanPath = removeLanguagePrefix(pathname)
    
    // For Danish, use localized URL slugs
    if (newLang === 'da') {
      // Find if the current path matches a translatable route
      const pathWithoutSlash = cleanPath.replace(/^\//, '')
      const danishSlug = DANISH_URL_MAPPINGS[pathWithoutSlash]
      
      if (danishSlug) {
        router.push(`/da/${danishSlug}`)
        return
      } else if (pathWithoutSlash === '') {
        router.push('/da')
        return
      }
    }
    
    // For English, use clean paths without language prefix
    if (newLang === 'en') {
      router.push(cleanPath || '/')
      return
    }
    
    const newPath = addLanguagePrefix(cleanPath, newLang)
    router.push(newPath)
  }, [currentLanguage, pathname, router])

  const getLocalizedPath = useCallback((path: string, lang?: Language) => {
    const targetLang = lang || currentLanguage
    
    // For Danish, use localized URL slugs
    if (targetLang === 'da') {
      const pathWithoutSlash = path.replace(/^\//, '')
      const danishSlug = DANISH_URL_MAPPINGS[pathWithoutSlash]
      
      if (danishSlug) {
        return `/da/${danishSlug}`
      } else if (pathWithoutSlash === '') {
        return '/da'
      }
    }
    
    return addLanguagePrefix(path, targetLang)
  }, [currentLanguage])

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

/**
 * Hook for getting language-specific translations
 * 
 * Usage:
 *   const { t, translations } = useTranslations()
 *   
 *   // Access nested translations
 *   t('home.hero.title') // Returns localized title
 *   
 *   // Or access directly
 *   translations.nav.home // Returns localized "Home" or "Hjem"
 */
export function useTranslations() {
  const { currentLanguage } = useLanguage()
  
  // Get the full translations object for the current language
  const translations = useMemo(() => 
    getTranslations(currentLanguage), 
    [currentLanguage]
  )
  
  // Translation function with dot notation support
  const t = useCallback((key: string): string => {
    return translate(currentLanguage, key)
  }, [currentLanguage])
  
  // Translation function with variable replacement
  const tVars = useCallback((key: string, vars: Record<string, string | number>): string => {
    return tWithVars(currentLanguage, key, vars)
  }, [currentLanguage])

  return {
    lang: currentLanguage,
    t,
    tVars,
    translations,
  }
}