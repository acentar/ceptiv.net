'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface LogoProps {
  className?: string
  width?: number
  height?: number
  variant?: 'dark' | 'light' | 'auto'
}

export function Logo({ className = '', width = 120, height = 40, variant = 'auto' }: LogoProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        // Determine which logo variant to use
        let logoPath = ''
        if (variant === 'dark') {
          logoPath = 'branding/logo-dark.svg'
        } else if (variant === 'light') {
          logoPath = 'branding/logo-light.svg'
        } else {
          // Auto mode - could be enhanced to detect theme
          // For now, default to dark logo
          logoPath = 'branding/logo-dark.svg'
        }

        // Try to get the logo from Supabase storage
        const { data } = supabase.storage
          .from('cap_file_bucket')
          .getPublicUrl(logoPath)

        if (data?.publicUrl) {
          // Verify the file exists by making a HEAD request
          const response = await fetch(data.publicUrl, { method: 'HEAD' })
          if (response.ok) {
            setLogoUrl(data.publicUrl)
          }
        }
      } catch (error) {
        console.warn('Logo not found:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogo()
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
      <div className={`flex items-center font-bold text-lg ${className}`}>
        Ceptiv.net
      </div>
    )
  }

  return (
    <img
      src={logoUrl}
      alt="Ceptiv.net Logo"
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