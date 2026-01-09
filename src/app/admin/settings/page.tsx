'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { X, Save, AlertCircle, FileText } from 'lucide-react'
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
  
  // Invoice settings
  const [invoiceSettings, setInvoiceSettings] = useState({
    company_name: '',
    street: '',
    postal: '',
    city: '',
    country: '',
    cvr: '',
    policy: '',
    bank_name: '',
    bank_account: '',
    bank_iban: ''
  })
  const [savingInvoice, setSavingInvoice] = useState(false)

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
          console.log('Fetching logo URLs from database...')
          const [logoResult, lightLogoResult, faviconResult] = await Promise.all([
            supabase.from('cap_settings').select('value').eq('key', 'logo_url').single(),
            supabase.from('cap_settings').select('value').eq('key', 'light_logo_url').single(),
            supabase.from('cap_settings').select('value').eq('key', 'favicon_url').single()
          ])

          console.log('Logo fetch results:', {
            logo: logoResult.data,
            logoError: logoResult.error,
            lightLogo: lightLogoResult.data,
            lightLogoError: lightLogoResult.error,
            favicon: faviconResult.data,
            faviconError: faviconResult.error
          })

          if (logoResult.data?.value) {
            console.log('Setting logo URL:', logoResult.data.value)
            setCurrentLogoUrl(logoResult.data.value)
          }
          if (lightLogoResult.data?.value) {
            console.log('Setting light logo URL:', lightLogoResult.data.value)
            setCurrentLightLogoUrl(lightLogoResult.data.value)
          }
          if (faviconResult.data?.value) {
            console.log('Setting favicon URL:', faviconResult.data.value)
            setCurrentFaviconUrl(faviconResult.data.value)
          }
          
          // Fetch invoice settings
          const { data: invoiceData } = await supabase
            .from('cap_settings')
            .select('key, value')
            .like('key', 'invoice_%')
          
          if (invoiceData) {
            const settings: Record<string, string> = {}
            invoiceData.forEach(item => {
              const key = item.key.replace('invoice_', '')
              settings[key] = item.value || ''
            })
            setInvoiceSettings(prev => ({ ...prev, ...settings }))
          }
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

    try {
      console.log('Starting save operation...')

      // First, let's check if we can access the settings table
      const { error: testError } = await supabase
        .from('cap_settings')
        .select('count')
        .limit(1)

      if (testError) {
        console.error('Cannot access cap_settings table:', testError)
        alert(`Database access error: ${testError.message}\n\nPlease ensure:\n1. The cap_settings table exists\n2. You have proper database permissions\n3. RLS policies allow your user to access the table`)
        setSaving(false)
        return
      }

      console.log('Database access confirmed')

      let uploadedCount = 0

      // Upload dark logo if selected
      if (logoFile) {
        console.log('Uploading dark logo...')
        const logoPath = `branding/logo-dark-${Date.now()}.svg`
        const { url, error: logoError } = await uploadFile(logoFile, 'cap_file_bucket', logoPath)

        if (logoError) {
          console.error('Upload failed:', logoError)
          alert(`Upload failed: ${logoError}`)
          setSaving(false)
          return
        }

        console.log('Upload successful, URL:', url)
        console.log('Saving logo URL to database...')
        
        // Use UPDATE instead of UPSERT since row already exists with NULL value
        const { data: updateData, error: dbError } = await supabase
          .from('cap_settings')
          .update({ value: url })
          .eq('key', 'logo_url')
          .select()

        console.log('Database update result:', { updateData, dbError })

        if (dbError) {
          console.error('Database save failed:', dbError)
          alert(`Database save failed: ${dbError.message}`)
          setSaving(false)
          return
        }

        console.log('Database save successful! URL saved:', url)
        setCurrentLogoUrl(url)
        setLogoFile(null) // Clear the file input
        uploadedCount++
      }

      // Upload light logo if selected
      if (lightLogoFile) {
        console.log('Uploading light logo...')
        const lightLogoPath = `branding/logo-light-${Date.now()}.svg`
        const { url, error: lightLogoError } = await uploadFile(lightLogoFile, 'cap_file_bucket', lightLogoPath)

        if (lightLogoError) {
          console.error('Upload failed:', lightLogoError)
          alert(`Upload failed: ${lightLogoError}`)
          setSaving(false)
          return
        }

        console.log('Saving light logo URL to database...')
        const { data: updateData, error: dbError } = await supabase
          .from('cap_settings')
          .update({ value: url })
          .eq('key', 'light_logo_url')
          .select()

        console.log('Database update result:', { updateData, dbError })

        if (dbError) {
          console.error('Database save failed:', dbError)
          alert(`Database save failed: ${dbError.message}`)
          setSaving(false)
          return
        }

        setCurrentLightLogoUrl(url)
        setLightLogoFile(null)
        uploadedCount++
      }

      // Upload favicon if selected
      if (faviconFile) {
        console.log('Uploading favicon...')
        const faviconPath = `branding/favicon-dark-${Date.now()}.svg`
        const { url, error: faviconError } = await uploadFile(faviconFile, 'cap_file_bucket', faviconPath)

        if (faviconError) {
          console.error('Upload failed:', faviconError)
          alert(`Upload failed: ${faviconError}`)
          setSaving(false)
          return
        }

        console.log('Saving favicon URL to database...')
        const { data: updateData, error: dbError } = await supabase
          .from('cap_settings')
          .update({ value: url })
          .eq('key', 'favicon_url')
          .select()

        console.log('Database update result:', { updateData, dbError })

        if (dbError) {
          console.error('Database save failed:', dbError)
          alert(`Database save failed: ${dbError.message}`)
          setSaving(false)
          return
        }

        setCurrentFaviconUrl(url)
        setFaviconFile(null)
        uploadedCount++
      }

      if (uploadedCount === 0) {
        alert('No files selected for upload.')
      } else {
        alert(`Success! ${uploadedCount} file(s) uploaded and saved.`)
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      alert(`Unexpected error: ${error}`)
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          {connectionStatus === 'error' && (
            <Card className="border-neutral-200 bg-neutral-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-neutral-900">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Database connection issue detected. File uploads may not work.
                  </span>
                </div>
                <p className="text-xs text-neutral-700 mt-1">
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
                  <span className="text-neutral-700 text-sm"> ✓ Storage ready</span>
                )}
                {connectionStatus === 'checking' && (
                  <span className="text-neutral-500 text-sm"> Checking storage...</span>
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

        <TabsContent value="invoice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Invoice Settings
              </CardTitle>
              <CardDescription>
                Configure your company information for invoices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input 
                    value={invoiceSettings.company_name}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, company_name: e.target.value})}
                    placeholder="Acenta Group ApS"
                  />
                </div>
                <div className="space-y-2">
                  <Label>CVR Number</Label>
                  <Input 
                    value={invoiceSettings.cvr}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, cvr: e.target.value})}
                    placeholder="37576476"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Street Address</Label>
                <Input 
                  value={invoiceSettings.street}
                  onChange={(e) => setInvoiceSettings({...invoiceSettings, street: e.target.value})}
                  placeholder="Maglebjergvej 6"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Postal Code</Label>
                  <Input 
                    value={invoiceSettings.postal}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, postal: e.target.value})}
                    placeholder="2800"
                  />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input 
                    value={invoiceSettings.city}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, city: e.target.value})}
                    placeholder="Kongens Lyngby"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input 
                    value={invoiceSettings.country}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, country: e.target.value})}
                    placeholder="Denmark"
                  />
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="font-medium mb-4">Bank Details (Optional)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input 
                      value={invoiceSettings.bank_name}
                      onChange={(e) => setInvoiceSettings({...invoiceSettings, bank_name: e.target.value})}
                      placeholder="Danske Bank"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input 
                      value={invoiceSettings.bank_account}
                      onChange={(e) => setInvoiceSettings({...invoiceSettings, bank_account: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>IBAN</Label>
                    <Input 
                      value={invoiceSettings.bank_iban}
                      onChange={(e) => setInvoiceSettings({...invoiceSettings, bank_iban: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="space-y-2">
                  <Label>Invoice Policy / Payment Terms</Label>
                  <Textarea 
                    value={invoiceSettings.policy}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, policy: e.target.value})}
                    placeholder="Payment is due within 14 days of invoice date..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={async () => {
                    setSavingInvoice(true)
                    try {
                      const updates = Object.entries(invoiceSettings).map(([key, value]) => ({
                        key: `invoice_${key}`,
                        value: value
                      }))
                      
                      for (const update of updates) {
                        await supabase
                          .from('cap_settings')
                          .upsert({ key: update.key, value: update.value }, { onConflict: 'key' })
                      }
                      
                      alert('Invoice settings saved!')
                    } catch (error) {
                      console.error('Error saving invoice settings:', error)
                      alert('Failed to save invoice settings')
                    } finally {
                      setSavingInvoice(false)
                    }
                  }}
                  disabled={savingInvoice}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {savingInvoice ? 'Saving...' : 'Save Invoice Settings'}
                </Button>
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