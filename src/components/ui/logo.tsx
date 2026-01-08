'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface LogoProps {
  className?: string
  width?: number
  height?: number
  variant?: 'dark' | 'light' | 'auto'
  textFallback?: string
}

export function Logo({
  className = '',
  width = 120,
  height = 40,
  variant = 'auto',
  textFallback = 'Ceptiv'
}: LogoProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogoFromSettings = async () => {
      try {
        // Determine which logo setting to fetch based on variant
        let settingKey = ''
        if (variant === 'dark') {
          settingKey = 'logo_url'
        } else if (variant === 'light') {
          settingKey = 'light_logo_url'
        } else {
          // Auto mode - prefer dark logo, fallback to light
          settingKey = 'logo_url'
        }

        console.log('Fetching logo for variant:', variant, 'using setting key:', settingKey)

        // Fetch logo URL from settings table
        const { data, error } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', settingKey)
          .single()

        if (error) {
          console.warn('Error fetching logo setting:', error, 'for key:', settingKey)
        } else if (data?.value) {
          console.log('Found logo URL in database:', data.value)
          // Verify the logo URL is accessible
          const response = await fetch(data.value, { method: 'HEAD' })
          if (response.ok) {
            console.log('Logo URL is accessible, setting logoUrl')
            setLogoUrl(data.value)
          } else {
            console.warn('Logo URL not accessible:', data.value, 'status:', response.status)
          }
        } else {
          console.log('No logo URL found in database for key:', settingKey)
        }
      } catch (error) {
        console.warn('Error fetching logo:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogoFromSettings()
  }, [variant])

  if (loading) {
    // Show a placeholder while loading
    return (
      <div
        className={`bg-neutral-200 animate-pulse rounded ${className}`}
        style={{ width, height }}
      />
    )
  }

  if (!logoUrl) {
    // Fallback text logo if no image is available
    return (
      <div
        className={`flex items-center font-bold text-lg ${className}`}
        style={{ fontSize: height * 0.6 }}
      >
        {textFallback}
      </div>
    )
  }

  return (
    <img
      src={logoUrl}
      alt={`${textFallback} Logo`}
      width={width}
      height={height}
      className={className}
      onError={() => {
        // Fallback to text logo if image fails to load
        setLogoUrl(null)
      }}
    />
  )
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