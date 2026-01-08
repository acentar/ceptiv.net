import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useFavicon() {
  useEffect(() => {
    const setFavicon = async () => {
      try {
        // Try to get the dark favicon from Supabase storage
        const { data } = supabase.storage
          .from('cap_file_bucket')
          .getPublicUrl('branding/favicon-dark.svg')

        if (data?.publicUrl) {
          // Verify the favicon exists
          const response = await fetch(data.publicUrl, { method: 'HEAD' })
          if (response.ok) {
            // Update the favicon
            const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
            if (favicon) {
              favicon.href = data.publicUrl
            } else {
              // Create favicon link if it doesn't exist
              const newFavicon = document.createElement('link')
              newFavicon.rel = 'icon'
              newFavicon.href = data.publicUrl
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