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
  const [faviconFile, setFaviconFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null)
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

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
  }

  const removeFavicon = () => {
    setFaviconFile(null)
    setFaviconPreview(null)
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      // Upload logo if selected
      if (logoFile) {
        const logoPath = `branding/logo-${Date.now()}.svg`
        console.log('Attempting to upload logo:', logoPath)

        const { url: logoUrl, error: logoError } = await uploadFile(logoFile, 'assets', logoPath)

        if (logoError) {
          console.error('Logo upload error:', logoError)
          alert(`Failed to upload logo: ${logoError}\n\nTroubleshooting:\n1. Make sure the 'assets' bucket exists in Supabase Storage\n2. Ensure the bucket is set to 'Public'\n3. Check that you're logged in as an authenticated user`)
          setSaving(false)
          return
        }

        console.log('Logo uploaded successfully:', logoUrl)
        alert(`Logo uploaded successfully!\nURL: ${logoUrl}`)
      }

      // Upload favicon if selected
      if (faviconFile) {
        const faviconPath = `branding/favicon-${Date.now()}.svg`
        console.log('Attempting to upload favicon:', faviconPath)

        const { url: faviconUrl, error: faviconError } = await uploadFile(faviconFile, 'assets', faviconPath)

        if (faviconError) {
          console.error('Favicon upload error:', faviconError)
          alert(`Failed to upload favicon: ${faviconError}\n\nTroubleshooting:\n1. Make sure the 'assets' bucket exists in Supabase Storage\n2. Ensure the bucket is set to 'Public'\n3. Check that you're logged in as an authenticated user`)
          setSaving(false)
          return
        }

        console.log('Favicon uploaded successfully:', faviconUrl)
        alert(`Favicon uploaded successfully!\nURL: ${faviconUrl}`)
      }

      if (!logoFile && !faviconFile) {
        alert('No files selected for upload.')
      } else {
        alert('Settings saved successfully!')
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
              <CardTitle>Logo & Favicon</CardTitle>
              <CardDescription>
                Upload your brand logo and favicon. SVG files are recommended for scalability.
                {connectionStatus === 'connected' && (
                  <span className="text-green-600 text-sm"> ✓ Storage ready</span>
                )}
                {connectionStatus === 'checking' && (
                  <span className="text-gray-500 text-sm"> Checking storage...</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Upload */}
              <div className="space-y-4">
                <Label htmlFor="logo-upload" className="text-base font-medium">
                  Logo
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
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-neutral-400 transition-colors"
                    >
                      {logoPreview ? (
                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className="w-16 h-16 bg-neutral-100 rounded flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: logoPreview }}
                          />
                          <span className="text-sm text-neutral-600">Click to change logo</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <Upload className="w-8 h-8 text-neutral-400" />
                          <span className="text-sm text-neutral-600">Click to upload logo (SVG)</span>
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

              {/* Favicon Upload */}
              <div className="space-y-4">
                <Label htmlFor="favicon-upload" className="text-base font-medium">
                  Favicon
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
                      className="flex items-center justify-center w-full h-24 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-neutral-400 transition-colors"
                    >
                      {faviconPreview ? (
                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className="w-8 h-8 bg-neutral-100 rounded flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: faviconPreview }}
                          />
                          <span className="text-sm text-neutral-600">Click to change favicon</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <Upload className="w-6 h-6 text-neutral-400" />
                          <span className="text-sm text-neutral-600">Click to upload favicon (SVG)</span>
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