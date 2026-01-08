'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, X, Save, AlertCircle } from 'lucide-react'
import { uploadFile } from '@/lib/storage'
import { supabase } from '@/lib/supabase'

export default function AdminSettingsPage() {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [lightLogoFile, setLightLogoFile] = useState<File | null>(null)
  const [faviconFile, setFaviconFile] = useState<File | null>(null)
  const [lightFaviconFile, setLightFaviconFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [lightLogoPreview, setLightLogoPreview] = useState<string | null>(null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null)
  const [lightFaviconPreview, setLightFaviconPreview] = useState<string | null>(null)
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
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select an SVG file for the logo.')
    }
  }

  const handleLightLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'image/svg+xml') {
      setLightLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLightLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select an SVG file for the light logo.')
    }
  }

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'image/svg+xml') {
      setFaviconFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setFaviconPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select an SVG file for the favicon.')
    }
  }

  const handleLightFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'image/svg+xml') {
      setLightFaviconFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLightFaviconPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select an SVG file for the light favicon.')
    }
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
  }

  const removeLightLogo = () => {
    setLightLogoFile(null)
    setLightLogoPreview(null)
  }

  const removeFavicon = () => {
    setFaviconFile(null)
    setFaviconPreview(null)
  }

  const removeLightFavicon = () => {
    setLightFaviconFile(null)
    setLightFaviconPreview(null)
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
                  <Label htmlFor="logo-upload" className="text-base font-medium flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-900 rounded"></div>
                    <span>Dark Logo (for light backgrounds)</span>
                  </Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Input
                        id="logo-upload"
                        type="file"
                        accept=".svg"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Label
                        htmlFor="logo-upload"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-neutral-400 transition-colors bg-white"
                      >
                        {logoPreview ? (
                          <div className="flex flex-col items-center space-y-2">
                            <div
                              className="w-16 h-16 bg-neutral-100 rounded flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: logoPreview }}
                            />
                            <span className="text-sm text-neutral-600">Click to change</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-8 h-8 text-neutral-400" />
                            <span className="text-sm text-neutral-600">Upload dark logo (SVG)</span>
                          </div>
                        )}
                      </Label>
                    </div>
                    {logoPreview && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removeLogo}
                        className="flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                  {logoFile && (
                    <p className="text-sm text-neutral-600">
                      Selected: {logoFile.name}
                    </p>
                  )}
                </div>

                {/* Light Logo */}
                <div className="space-y-4">
                  <Label htmlFor="light-logo-upload" className="text-base font-medium flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                    <span>Light Logo (for dark backgrounds)</span>
                  </Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Input
                        id="light-logo-upload"
                        type="file"
                        accept=".svg"
                        onChange={handleLightLogoUpload}
                        className="hidden"
                      />
                      <Label
                        htmlFor="light-logo-upload"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-neutral-400 transition-colors bg-gray-100"
                      >
                        {lightLogoPreview ? (
                          <div className="flex flex-col items-center space-y-2">
                            <div
                              className="w-16 h-16 bg-neutral-800 rounded flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: lightLogoPreview }}
                            />
                            <span className="text-sm text-neutral-600">Click to change</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-8 h-8 text-neutral-400" />
                            <span className="text-sm text-neutral-600">Upload light logo (SVG)</span>
                          </div>
                        )}
                      </Label>
                    </div>
                    {lightLogoPreview && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removeLightLogo}
                        className="flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                  {lightLogoFile && (
                    <p className="text-sm text-neutral-600">
                      Selected: {lightLogoFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Favicon Upload - Dark/Light variants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dark Favicon */}
                <div className="space-y-4">
                  <Label htmlFor="favicon-upload" className="text-base font-medium flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-900 rounded"></div>
                    <span>Dark Favicon (for light backgrounds)</span>
                  </Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Input
                        id="favicon-upload"
                        type="file"
                        accept=".svg"
                        onChange={handleFaviconUpload}
                        className="hidden"
                      />
                      <Label
                        htmlFor="favicon-upload"
                        className="flex items-center justify-center w-full h-24 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-neutral-400 transition-colors bg-white"
                      >
                        {faviconPreview ? (
                          <div className="flex flex-col items-center space-y-2">
                            <div
                              className="w-8 h-8 bg-neutral-100 rounded flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: faviconPreview }}
                            />
                            <span className="text-sm text-neutral-600">Click to change</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-6 h-6 text-neutral-400" />
                            <span className="text-sm text-neutral-600">Upload dark favicon (SVG)</span>
                          </div>
                        )}
                      </Label>
                    </div>
                    {faviconPreview && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removeFavicon}
                        className="flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                  {faviconFile && (
                    <p className="text-sm text-neutral-600">
                      Selected: {faviconFile.name}
                    </p>
                  )}
                </div>

                {/* Light Favicon */}
                <div className="space-y-4">
                  <Label htmlFor="light-favicon-upload" className="text-base font-medium flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                    <span>Light Favicon (for dark backgrounds)</span>
                  </Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Input
                        id="light-favicon-upload"
                        type="file"
                        accept=".svg"
                        onChange={handleLightFaviconUpload}
                        className="hidden"
                      />
                      <Label
                        htmlFor="light-favicon-upload"
                        className="flex items-center justify-center w-full h-24 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-neutral-400 transition-colors bg-gray-100"
                      >
                        {lightFaviconPreview ? (
                          <div className="flex flex-col items-center space-y-2">
                            <div
                              className="w-8 h-8 bg-neutral-800 rounded flex items-center justify-center"
                              dangerouslySetInnerHTML={{ __html: lightFaviconPreview }}
                            />
                            <span className="text-sm text-neutral-600">Click to change</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-6 h-6 text-neutral-400" />
                            <span className="text-sm text-neutral-600">Upload light favicon (SVG)</span>
                          </div>
                        )}
                      </Label>
                    </div>
                    {lightFaviconPreview && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={removeLightFavicon}
                        className="flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                  {lightFaviconFile && (
                    <p className="text-sm text-neutral-600">
                      Selected: {lightFaviconFile.name}
                    </p>
                  )}
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