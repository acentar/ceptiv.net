import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useFavicon() {
  useEffect(() => {
    const setFavicon = async () => {
      try {
        // Try to get the favicon URL from settings table
        const { data, error } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', 'favicon_url')
          .single()

        if (error) {
          console.warn('Error fetching favicon setting:', error)
          return
        }

        if (data?.value) {
          // Verify the favicon URL is accessible
          const response = await fetch(data.value, { method: 'HEAD' })
          if (response.ok) {
            // Update the favicon
            const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
            if (favicon) {
              favicon.href = data.value
            } else {
              // Create favicon link if it doesn't exist
              const newFavicon = document.createElement('link')
              newFavicon.rel = 'icon'
              newFavicon.href = data.value
              newFavicon.type = 'image/svg+xml'
              newFavicon.sizes = 'any'
              document.head.appendChild(newFavicon)
            }
          }
        }
      } catch (error) {
        console.warn('Favicon not found:', error)
      }
    }

    setFavicon()
  }, [])
}