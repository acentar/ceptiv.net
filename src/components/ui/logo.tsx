'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

// Global cache for logo URLs to prevent refetching on every page navigation
const logoCache: Record<string, string | null> = {}
const fetchingPromises: Record<string, Promise<string | null>> = {}

interface LogoProps {
  className?: string
  width?: number
  height?: number
  variant?: 'dark' | 'light' | 'auto'
}

export function Logo({
  className = '',
  width = 140,
  height = 40,
  variant = 'auto'
}: LogoProps) {
  // Determine cache key - light variant uses white logo, dark uses black logo
  const settingKey = variant === 'light' ? 'light_logo_url' : 'logo_url'
  
  // Track the current setting key to detect changes
  const [currentKey, setCurrentKey] = useState(settingKey)
  const [logoUrl, setLogoUrl] = useState<string | null>(() => logoCache[settingKey] ?? null)

  const fetchLogo = useCallback(async (key: string) => {
    // Return cached value if available
    if (key in logoCache) {
      setLogoUrl(logoCache[key])
      return
    }

    // If already fetching, wait for that promise
    if (fetchingPromises[key]) {
      const result = await fetchingPromises[key]
      setLogoUrl(result)
      return
    }

    // Start fetching
    fetchingPromises[key] = (async () => {
      try {
        const { data, error } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', key)
          .single()

        if (error || !data?.value) {
          logoCache[key] = null
          return null
        }

        // Verify the logo URL is accessible
        try {
          const response = await fetch(data.value, { method: 'HEAD' })
          if (response.ok) {
            logoCache[key] = data.value
            return data.value
          }
        } catch {
          // Network error, use cached value if any
        }
        
        logoCache[key] = null
        return null
      } catch {
        logoCache[key] = null
        return null
      } finally {
        delete fetchingPromises[key]
      }
    })()

    const result = await fetchingPromises[key]
    setLogoUrl(result)
  }, [])

  // React to variant/settingKey changes
  useEffect(() => {
    if (settingKey !== currentKey) {
      setCurrentKey(settingKey)
      // Immediately set from cache if available, otherwise fetch
      if (settingKey in logoCache) {
        setLogoUrl(logoCache[settingKey])
      } else {
        fetchLogo(settingKey)
      }
    }
  }, [settingKey, currentKey, fetchLogo])

  // Initial fetch
  useEffect(() => {
    if (!(settingKey in logoCache)) {
      fetchLogo(settingKey)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // No fallback - return null if no logo URL available
  if (!logoUrl) {
    return null
  }

  // Use regular img for SVGs to avoid Next.js Image optimization issues
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={logoUrl}
      alt="Ceptiv Logo"
      className={className}
      style={{ width }}
      onError={() => {
        // Clear cache if image fails to load
        logoCache[settingKey] = null
        setLogoUrl(null)
      }}
    />
  )
}

// Function to clear logo cache (useful when logo is updated in admin)
export function clearLogoCache() {
  Object.keys(logoCache).forEach(key => delete logoCache[key])
}

// LogoThumbnail component for displaying logo previews in settings
interface LogoThumbnailProps {
  src?: string
  alt?: string
  size?: number
  className?: string
}

export function LogoThumbnail({
  src,
  alt = "Logo",
  size = 64,
  className = ""
}: LogoThumbnailProps) {
  if (!src) {
    return (
      <div
        className={`bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center text-neutral-400 text-sm ${className}`}
        style={{ width: size, height: size }}
      >
        No Logo
      </div>
    )
  }

  return (
    <Avatar className={className} style={{ width: size, height: size }}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-neutral-100 text-neutral-600">
        Logo
      </AvatarFallback>
    </Avatar>
  )
}
