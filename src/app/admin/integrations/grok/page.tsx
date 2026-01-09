'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ConfigureGrokPage() {
  const [enabled, setEnabled] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGrokSettings = async () => {
      try {
        const { data: enabledData } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', 'grok_enabled')
          .single()

        const { data: apiKeyData } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', 'grok_api_key')
          .single()

        setEnabled(enabledData?.value === 'true')
        setApiKey(apiKeyData?.value || '')

        if (apiKeyData?.value) {
          setConnectionStatus('connected')
        }
      } catch (error) {
        console.error('Error fetching Grok settings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGrokSettings()
  }, [])

  const validateGrokConnection = async () => {
    if (!apiKey.trim()) {
      setConnectionStatus('error')
      return
    }

    setConnectionStatus('connecting')

    try {
      // Test the API key with a simple request to x.ai API
      const response = await fetch('https://api.x.ai/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setConnectionStatus('connected')
        return true
      } else {
        setConnectionStatus('error')
        return false
      }
    } catch (error) {
      console.error('Error validating Grok connection:', error)
      setConnectionStatus('error')
      return false
    }
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      // Save enabled status
      await supabase
        .from('cap_settings')
        .upsert({ key: 'grok_enabled', value: enabled.toString() }, { onConflict: 'key' })

      // Save API key if enabled
      if (enabled && apiKey.trim()) {
        await supabase
          .from('cap_settings')
          .upsert({ key: 'grok_api_key', value: apiKey.trim() }, { onConflict: 'key' })

        // Validate connection if API key is provided
        const isValid = await validateGrokConnection()
        if (isValid) {
          alert('Grok integration configured successfully!')
        } else {
          alert('API key saved but connection validation failed. Please check your API key.')
        }
      } else if (enabled && !apiKey.trim()) {
        alert('Grok integration enabled but no API key provided. Please add an API key and connect.')
        setConnectionStatus('disconnected')
      } else {
        // Disabled, clear API key
        await supabase
          .from('cap_settings')
          .delete()
          .eq('key', 'grok_api_key')
        setConnectionStatus('disconnected')
        alert('Grok integration disabled.')
      }
    } catch (error) {
      console.error('Error saving Grok settings:', error)
      alert('Failed to save Grok settings.')
    } finally {
      setSaving(false)
    }
  }

  const handleConnect = async () => {
    if (!apiKey.trim()) {
      alert('Please enter an API key first.')
      return
    }

    const isValid = await validateGrokConnection()
    if (isValid) {
      // Save the settings when connection is successful
      setSaving(true)
      try {
        // Save enabled status
        const { error: enabledError } = await supabase
          .from('cap_settings')
          .upsert({ key: 'grok_enabled', value: 'true' }, { onConflict: 'key' })
        
        if (enabledError) {
          console.error('Error saving grok_enabled:', enabledError)
          throw enabledError
        }

        // Save API key
        const { error: apiKeyError } = await supabase
          .from('cap_settings')
          .upsert({ key: 'grok_api_key', value: apiKey.trim() }, { onConflict: 'key' })
        
        if (apiKeyError) {
          console.error('Error saving grok_api_key:', apiKeyError)
          throw apiKeyError
        }

        setEnabled(true)
        alert('Successfully connected and saved! Grok AI is now active.')
      } catch (error) {
        console.error('Error saving Grok settings:', error)
        alert('Connected successfully but failed to save settings. Check console for details.')
      } finally {
        setSaving(false)
      }
    } else {
      alert('Failed to connect. Please check your API key.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-neutral-600" />
          <p className="text-neutral-600">Loading Grok configuration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/integrations">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Integrations
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Configure Grok Integration</h1>
        <p className="text-neutral-600 mt-2">
          Connect your application with x.ai's Grok AI for enhanced features and automation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-neutral-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-neutral-600" />
                </div>
                <span>Grok AI Configuration</span>
              </CardTitle>
              <CardDescription>
                Configure your Grok AI integration settings. You'll need an API key from x.ai.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enable/Disable Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  id="enable-grok"
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="mt-1 h-4 w-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-500 focus:ring-2"
                />
                <div className="space-y-0.5">
                  <Label htmlFor="enable-grok" className="text-base font-medium">
                    Enable Grok Integration
                  </Label>
                  <p className="text-sm text-neutral-600">
                    Turn on Grok AI features across your application
                  </p>
                </div>
              </div>

              {/* API Key Input */}
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="xai-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    disabled={!enabled}
                  />
                  <Button
                    onClick={handleConnect}
                    disabled={!enabled || !apiKey.trim() || connectionStatus === 'connecting'}
                    variant="outline"
                  >
                    {connectionStatus === 'connecting' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Connect'
                    )}
                  </Button>
                </div>
                <p className="text-sm text-neutral-500">
                  Get your API key from{' '}
                  <a
                    href="https://x.ai/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 hover:underline inline-flex items-center"
                  >
                    x.ai/api
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              </div>

              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                {connectionStatus === 'connected' && (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-700">Connected</span>
                    <Badge variant="secondary" className="text-green-700 bg-green-50">
                      Ready to use
                    </Badge>
                  </>
                )}
                {connectionStatus === 'connecting' && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-neutral-500" />
                    <span className="text-sm text-neutral-600">Connecting...</span>
                  </>
                )}
                {connectionStatus === 'error' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-red-700">Connection failed</span>
                    <Badge variant="destructive">Check API key</Badge>
                  </>
                )}
                {connectionStatus === 'disconnected' && enabled && (
                  <>
                    <AlertCircle className="w-5 h-5 text-neutral-400" />
                    <span className="text-sm text-neutral-600">Not connected</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">1. Get API Key</h4>
                <p className="text-sm text-neutral-600">
                  Visit x.ai/api to create an account and get your API key.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">2. Enable Integration</h4>
                <p className="text-sm text-neutral-600">
                  Toggle the switch above to enable Grok features.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">3. Connect</h4>
                <p className="text-sm text-neutral-600">
                  Enter your API key and click Connect to validate.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li>• AI-powered content generation</li>
                <li>• Automated responses</li>
                <li>• Smart project suggestions</li>
                <li>• Enhanced analytics</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Configuration'
          )}
        </Button>
      </div>
    </div>
  )
}