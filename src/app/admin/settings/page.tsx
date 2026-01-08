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

export default function AdminSettingsPage() {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [lightLogoFile, setLightLogoFile] = useState<File | null>(null)
  const [faviconFile, setFaviconFile] = useState<File | null>(null)
  const [lightFaviconFile, setLightFaviconFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')

  useEffect(() => {
    // Check Supabase connection
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('cap_settings').select('count').limit(1)
        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          setConnectionStatus('error')
        } else {
          setConnectionStatus('connected')
        }
      } catch (err) {
        setConnectionStatus('error')
      }
    }

    checkConnection()
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

  const handleLightFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'image/svg+xml') {
      setLightFaviconFile(file)
    } else if (file) {
      alert('Please select an SVG file for the light favicon.')
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

  const removeLightFavicon = () => {
    setLightFaviconFile(null)
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      // Upload dark logo if selected
      if (logoFile) {
        const logoPath = `branding/logo-dark-${Date.now()}.svg`
        console.log('Attempting to upload dark logo:', logoPath)

        const { url: logoUrl, error: logoError } = await uploadFile(logoFile, 'cap_file_bucket', logoPath)

        if (logoError) {
          console.error('Dark logo upload error:', logoError)
          alert(`Failed to upload dark logo: ${logoError}\n\nTroubleshooting:\n1. Make sure the 'cap_file_bucket' bucket exists in Supabase Storage\n2. Ensure the bucket is set to 'Public'\n3. Check that you're logged in as an authenticated user`)
          setSaving(false)
          return
        }

        console.log('Dark logo uploaded successfully:', logoUrl)
      }

      // Upload light logo if selected
      if (lightLogoFile) {
        const lightLogoPath = `branding/logo-light-${Date.now()}.svg`
        console.log('Attempting to upload light logo:', lightLogoPath)

        const { url: lightLogoUrl, error: lightLogoError } = await uploadFile(lightLogoFile, 'cap_file_bucket', lightLogoPath)

        if (lightLogoError) {
          console.error('Light logo upload error:', lightLogoError)
          alert(`Failed to upload light logo: ${lightLogoError}\n\nTroubleshooting:\n1. Make sure the 'cap_file_bucket' bucket exists in Supabase Storage\n2. Ensure the bucket is set to 'Public'\n3. Check that you're logged in as an authenticated user`)
          setSaving(false)
          return
        }

        console.log('Light logo uploaded successfully:', lightLogoUrl)
      }

      // Upload dark favicon if selected
      if (faviconFile) {
        const faviconPath = `branding/favicon-dark-${Date.now()}.svg`
        console.log('Attempting to upload dark favicon:', faviconPath)

        const { url: faviconUrl, error: faviconError } = await uploadFile(faviconFile, 'cap_file_bucket', faviconPath)

        if (faviconError) {
          console.error('Dark favicon upload error:', faviconError)
          alert(`Failed to upload dark favicon: ${faviconError}\n\nTroubleshooting:\n1. Make sure the 'cap_file_bucket' bucket exists in Supabase Storage\n2. Ensure the bucket is set to 'Public'\n3. Check that you're logged in as an authenticated user`)
          setSaving(false)
          return
        }

        console.log('Dark favicon uploaded successfully:', faviconUrl)
      }

      // Upload light favicon if selected
      if (lightFaviconFile) {
        const lightFaviconPath = `branding/favicon-light-${Date.now()}.svg`
        console.log('Attempting to upload light favicon:', lightFaviconPath)

        const { url: lightFaviconUrl, error: lightFaviconError } = await uploadFile(lightFaviconFile, 'cap_file_bucket', lightFaviconPath)

        if (lightFaviconError) {
          console.error('Light favicon upload error:', lightFaviconError)
          alert(`Failed to upload light favicon: ${lightFaviconError}\n\nTroubleshooting:\n1. Make sure the 'cap_file_bucket' bucket exists in Supabase Storage\n2. Ensure the bucket is set to 'Public'\n3. Check that you're logged in as an authenticated user`)
          setSaving(false)
          return
        }

        console.log('Light favicon uploaded successfully:', lightFaviconUrl)
      }

      const uploadedFiles = [logoFile, lightLogoFile, faviconFile, lightFaviconFile].filter(Boolean)
      if (uploadedFiles.length === 0) {
        alert('No files selected for upload.')
      } else {
        alert(`Settings saved successfully! ${uploadedFiles.length} file(s) uploaded.`)
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

              {/* Favicon Upload - Dark/Light variants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dark Favicon */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Dark Favicon</Label>
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
                </div>

                {/* Light Favicon */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Light Favicon</Label>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept=".svg"
                      onChange={handleLightFaviconUpload}
                    />
                    {lightFaviconFile && (
                      <div className="flex items-center justify-between p-2 bg-neutral-50 rounded">
                        <span className="text-sm text-neutral-600">{lightFaviconFile.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeLightFavicon}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
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