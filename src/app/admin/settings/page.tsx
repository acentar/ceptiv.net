'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { X, Save, AlertCircle } from 'lucide-react'
import { uploadFile } from '@/lib/storage'
import { supabase } from '@/lib/supabase'
import { LogoThumbnail } from '@/components/ui/logo'

export default function AdminSettingsPage() {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [lightLogoFile, setLightLogoFile] = useState<File | null>(null)
  const [faviconFile, setFaviconFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string | null>(null)
  const [currentLightLogoUrl, setCurrentLightLogoUrl] = useState<string | null>(null)
  const [currentFaviconUrl, setCurrentFaviconUrl] = useState<string | null>(null)

  useEffect(() => {
    // Check Supabase connection and fetch current logo URLs
    const initializeSettings = async () => {
      try {
        const { error } = await supabase.from('cap_settings').select('count').limit(1)
        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          setConnectionStatus('error')
        } else {
          setConnectionStatus('connected')

          // Fetch current logo URLs
          const [logoResult, lightLogoResult, faviconResult] = await Promise.all([
            supabase.from('cap_settings').select('value').eq('key', 'logo_url').single(),
            supabase.from('cap_settings').select('value').eq('key', 'light_logo_url').single(),
            supabase.from('cap_settings').select('value').eq('key', 'favicon_url').single()
          ])

          if (logoResult.data?.value) setCurrentLogoUrl(logoResult.data.value)
          if (lightLogoResult.data?.value) setCurrentLightLogoUrl(lightLogoResult.data.value)
          if (faviconResult.data?.value) setCurrentFaviconUrl(faviconResult.data.value)
        }
      } catch (err) {
        setConnectionStatus('error')
      }
    }

    initializeSettings()
  }, [])

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'image/svg+xml') {
      setLogoFile(file)
    } else if (file) {
      alert('Please select an SVG file for the logo.')
    }
  }

  const handleLightLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'image/svg+xml') {
      setLightLogoFile(file)
    } else if (file) {
      alert('Please select an SVG file for the light logo.')
    }
  }

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'image/svg+xml') {
      setFaviconFile(file)
    } else if (file) {
      alert('Please select an SVG file for the favicon.')
    }
  }


  const removeLogo = () => {
    setLogoFile(null)
  }

  const removeLightLogo = () => {
    setLightLogoFile(null)
  }

  const removeFavicon = () => {
    setFaviconFile(null)
  }


  const handleSave = async () => {
    setSaving(true)

    let logoUrl = null
    let lightLogoUrl = null
    let faviconUrl = null

    try {
      // Upload dark logo if selected
      if (logoFile) {
        const logoPath = `branding/logo-dark-${Date.now()}.svg`
        console.log('Attempting to upload dark logo:', logoPath)

        const { url, error: logoError } = await uploadFile(logoFile, 'cap_file_bucket', logoPath)

        if (logoError) {
          console.error('Dark logo upload error:', logoError)
          alert(`Failed to upload dark logo: ${logoError}\n\nTroubleshooting:\n1. Make sure the 'cap_file_bucket' bucket exists in Supabase Storage\n2. Ensure the bucket is set to 'Public'\n3. Check that you're logged in as an authenticated user`)
          setSaving(false)
          return
        }

        logoUrl = url
        console.log('Dark logo uploaded successfully:', logoUrl)

        // Update the database with the logo URL
        const { error: dbError } = await supabase
          .from('cap_settings')
          .upsert({
            key: 'logo_url',
            value: logoUrl,
            value_type: 'string',
            category: 'branding',
            description: 'URL to the site logo (SVG)',
            is_public: true
          })

        if (dbError) {
          console.error('Database update error for logo:', dbError)
          alert('Logo uploaded but failed to save URL to database. Please try again.')
          setSaving(false)
          return
        }

        // Update local state for immediate UI update
        setCurrentLogoUrl(logoUrl)
      }

      // Upload light logo if selected
      if (lightLogoFile) {
        const lightLogoPath = `branding/logo-light-${Date.now()}.svg`
        console.log('Attempting to upload light logo:', lightLogoPath)

        const { url, error: lightLogoError } = await uploadFile(lightLogoFile, 'cap_file_bucket', lightLogoPath)

        if (lightLogoError) {
          console.error('Light logo upload error:', lightLogoError)
          alert(`Failed to upload light logo: ${lightLogoError}\n\nTroubleshooting:\n1. Make sure the 'cap_file_bucket' bucket exists in Supabase Storage\n2. Ensure the bucket is set to 'Public'\n3. Check that you're logged in as an authenticated user`)
          setSaving(false)
          return
        }

        lightLogoUrl = url
        console.log('Light logo uploaded successfully:', lightLogoUrl)

        // Update the database with the light logo URL
        const { error: dbError } = await supabase
          .from('cap_settings')
          .upsert({
            key: 'light_logo_url',
            value: lightLogoUrl,
            value_type: 'string',
            category: 'branding',
            description: 'URL to the light site logo (SVG)',
            is_public: true
          })

        if (dbError) {
          console.error('Database update error for light logo:', dbError)
          alert('Light logo uploaded but failed to save URL to database. Please try again.')
          setSaving(false)
          return
        }

        // Update local state for immediate UI update
        setCurrentLightLogoUrl(lightLogoUrl)
      }

      // Upload dark favicon if selected
      if (faviconFile) {
        const faviconPath = `branding/favicon-dark-${Date.now()}.svg`
        console.log('Attempting to upload dark favicon:', faviconPath)

        const { url, error: faviconError } = await uploadFile(faviconFile, 'cap_file_bucket', faviconPath)

        if (faviconError) {
          console.error('Dark favicon upload error:', faviconError)
          alert(`Failed to upload dark favicon: ${faviconError}\n\nTroubleshooting:\n1. Make sure the 'cap_file_bucket' bucket exists in Supabase Storage\n2. Ensure the bucket is set to 'Public'\n3. Check that you're logged in as an authenticated user`)
          setSaving(false)
          return
        }

        faviconUrl = url
        console.log('Dark favicon uploaded successfully:', faviconUrl)

        // Update the database with the favicon URL
        const { error: dbError } = await supabase
          .from('cap_settings')
          .upsert({
            key: 'favicon_url',
            value: faviconUrl,
            value_type: 'string',
            category: 'branding',
            description: 'URL to the site favicon (SVG)',
            is_public: true
          })

        if (dbError) {
          console.error('Database update error for favicon:', dbError)
          alert('Favicon uploaded but failed to save URL to database. Please try again.')
          setSaving(false)
          return
        }

        // Update local state for immediate UI update
        setCurrentFaviconUrl(faviconUrl)
      }

      const uploadedFiles = [logoFile, lightLogoFile, faviconFile].filter(Boolean)
      if (uploadedFiles.length === 0) {
        alert('No files selected for upload.')
      } else {
        alert(`Settings saved successfully! ${uploadedFiles.length} file(s) uploaded and saved to database.`)
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('An unexpected error occurred while saving settings. Check the browser console for details.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
        <p className="text-neutral-600 mt-2">
          Manage your application settings and branding.
        </p>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          {connectionStatus === 'error' && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Database connection issue detected. File uploads may not work.
                  </span>
                </div>
                <p className="text-xs text-red-600 mt-1">
                  Make sure you've run the database migrations and created the assets storage bucket.
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Logo & Favicon Variants</CardTitle>
              <CardDescription>
                Upload both dark and light variants of your logo and favicon for optimal display on different backgrounds. SVG files are recommended for scalability.
                {connectionStatus === 'connected' && (
                  <span className="text-green-600 text-sm"> ✓ Storage ready</span>
                )}
                {connectionStatus === 'checking' && (
                  <span className="text-gray-500 text-sm"> Checking storage...</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Upload - Dark/Light variants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dark Logo */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Dark Logo</Label>
                  {currentLogoUrl && (
                    <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                      <LogoThumbnail src={currentLogoUrl} alt="Current Dark Logo" size={48} />
                      <div className="text-sm text-neutral-600">
                        <p className="font-medium">Current Logo</p>
                        <p className="text-xs">This logo is currently displayed on your website</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept=".svg"
                      onChange={handleLogoUpload}
                    />
                    {logoFile && (
                      <div className="flex items-center justify-between p-2 bg-neutral-50 rounded">
                        <span className="text-sm text-neutral-600">{logoFile.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeLogo}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Light Logo */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Light Logo</Label>
                  {currentLightLogoUrl && (
                    <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                      <LogoThumbnail src={currentLightLogoUrl} alt="Current Light Logo" size={48} />
                      <div className="text-sm text-neutral-600">
                        <p className="font-medium">Current Light Logo</p>
                        <p className="text-xs">This logo is used on light backgrounds</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept=".svg"
                      onChange={handleLightLogoUpload}
                    />
                    {lightLogoFile && (
                      <div className="flex items-center justify-between p-2 bg-neutral-50 rounded">
                        <span className="text-sm text-neutral-600">{lightLogoFile.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeLightLogo}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Favicon Upload */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Favicon</Label>
                {currentFaviconUrl && (
                  <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                    <LogoThumbnail src={currentFaviconUrl} alt="Current Favicon" size={32} />
                    <div className="text-sm text-neutral-600">
                      <p className="font-medium">Current Favicon</p>
                      <p className="text-xs">This icon appears in browser tabs</p>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept=".svg"
                    onChange={handleFaviconUpload}
                  />
                  {faviconFile && (
                    <div className="flex items-center justify-between p-2 bg-neutral-50 rounded">
                      <span className="text-sm text-neutral-600">{faviconFile.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFavicon}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-sm text-neutral-500">
                  Upload an SVG favicon that will be used across all pages
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic application settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-title">Site Title</Label>
                <Input id="site-title" placeholder="Ceptiv.net" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Input id="site-description" placeholder="Your application description" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Advanced configuration options. Use with caution.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-url">API Base URL</Label>
                <Input id="api-url" placeholder="https://api.example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                <Input id="cache-ttl" type="number" placeholder="3600" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}