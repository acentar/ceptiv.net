'use client'

import { useFavicon } from '@/hooks/use-favicon'

export function FaviconManager() {
  useFavicon()
  return null // This component doesn't render anything
}