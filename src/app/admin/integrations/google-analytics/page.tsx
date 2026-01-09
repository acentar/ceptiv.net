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

export default function ConfigureGoogleAnalyticsPage() {
  const [enabled, setEnabled] = useState(false)
  const [trackingId, setTrackingId] = useState('')
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGaSettings = async () => {
      try {
        const { data: enabledData } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', 'ga_enabled')
          .single()

        const { data: trackingIdData } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', 'ga_tracking_id')
          .single()

        setEnabled(enabledData?.value === 'true')
        setTrackingId(trackingIdData?.value || '')

        if (trackingIdData?.value) {
          setConnectionStatus('connected')
        }
      } catch (error) {
        console.error('Error fetching GA settings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGaSettings()
  }, [])

  const validateTrackingId = (id: string): boolean => {
    // Google Analytics 4 tracking ID format: G-XXXXXXXXXX or UA-XXXXXXXXX-X
    const ga4Pattern = /^G-[A-Z0-9]{10}$/
    const uaPattern = /^UA-\d{4,9}-\d{1,2}$/

    return ga4Pattern.test(id) || uaPattern.test(id)
  }

  const validateGaConnection = async () => {
    if (!trackingId.trim()) {
      setConnectionStatus('error')
      return false
    }

    if (!validateTrackingId(trackingId.trim())) {
      setConnectionStatus('error')
      return false
    }

    setConnectionStatus('connecting')

    try {
      // For Google Analytics, we can only validate the format
      // Actual validation would require server-side testing with GA API
      // For now, we'll consider it valid if the format is correct
      setConnectionStatus('connected')
      return true
    } catch (error) {
      console.error('Error validating GA tracking ID:', error)
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
        .upsert({ key: 'ga_enabled', value: enabled.toString() }, { onConflict: 'key' })

      // Save tracking ID if enabled
      if (enabled && trackingId.trim()) {
        await supabase
          .from('cap_settings')
          .upsert({ key: 'ga_tracking_id', value: trackingId.trim() }, { onConflict: 'key' })

        // Validate tracking ID format
        const isValid = await validateGaConnection()
        if (isValid) {
          alert('Google Analytics integration configured successfully!')
        } else {
          alert('Tracking ID saved but format validation failed. Please check your tracking ID.')
        }
      } else if (enabled && !trackingId.trim()) {
        alert('Google Analytics integration enabled but no tracking ID provided. Please add a tracking ID and validate.')
        setConnectionStatus('disconnected')
      } else {
        // Disabled, clear tracking ID
        await supabase
          .from('cap_settings')
          .delete()
          .eq('key', 'ga_tracking_id')
        setConnectionStatus('disconnected')
        alert('Google Analytics integration disabled.')
      }
    } catch (error) {
      console.error('Error saving GA settings:', error)
      alert('Failed to save Google Analytics settings.')
    } finally {
      setSaving(false)
    }
  }

  const handleValidate = async () => {
    if (!trackingId.trim()) {
      alert('Please enter a tracking ID first.')
      return
    }

    const isValid = await validateGaConnection()
    if (isValid) {
      alert('Tracking ID format is valid!')
    } else {
      alert('Invalid tracking ID format. Please check your Google Analytics tracking ID.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-neutral-600" />
          <p className="text-neutral-600">Loading Google Analytics configuration...</p>
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
        <h1 className="text-3xl font-bold text-neutral-900">Configure Google Analytics</h1>
        <p className="text-neutral-600 mt-2">
          Connect your website with Google Analytics 4 for comprehensive tracking and insights.
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
                <span>Google Analytics Configuration</span>
              </CardTitle>
              <CardDescription>
                Configure your Google Analytics 4 integration settings. You'll need a tracking ID from Google Analytics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enable/Disable Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  id="enable-ga"
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="mt-1 h-4 w-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-500 focus:ring-2"
                />
                <div className="space-y-0.5">
                  <Label htmlFor="enable-ga" className="text-base font-medium">
                    Enable Google Analytics
                  </Label>
                  <p className="text-sm text-neutral-600">
                    Track website traffic, user behavior, and conversion metrics
                  </p>
                </div>
              </div>

              {/* Tracking ID Input */}
              <div className="space-y-2">
                <Label htmlFor="tracking-id">Tracking ID</Label>
                <div className="flex space-x-2">
                  <Input
                    id="tracking-id"
                    type="text"
                    placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    disabled={!enabled}
                  />
                  <Button
                    onClick={handleValidate}
                    disabled={!enabled || !trackingId.trim() || connectionStatus === 'connecting'}
                    variant="outline"
                  >
                    {connectionStatus === 'connecting' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Validate'
                    )}
                  </Button>
                </div>
                <p className="text-sm text-neutral-500">
                  Enter your Google Analytics tracking ID.{' '}
                  <a
                    href="https://analytics.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 hover:underline inline-flex items-center"
                  >
                    Get your tracking ID from Google Analytics
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </p>
              </div>

              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                {connectionStatus === 'connected' && (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-700">Valid tracking ID</span>
                    <Badge variant="secondary" className="text-green-700 bg-green-50">
                      Ready to track
                    </Badge>
                  </>
                )}
                {connectionStatus === 'connecting' && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-neutral-500" />
                    <span className="text-sm text-neutral-600">Validating...</span>
                  </>
                )}
                {connectionStatus === 'error' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-red-700">Invalid tracking ID</span>
                    <Badge variant="destructive">Check format</Badge>
                  </>
                )}
                {connectionStatus === 'disconnected' && enabled && (
                  <>
                    <AlertCircle className="w-5 h-5 text-neutral-400" />
                    <span className="text-sm text-neutral-600">Not configured</span>
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
                <h4 className="font-medium">1. Create GA4 Property</h4>
                <p className="text-sm text-neutral-600">
                  Go to Google Analytics and create a new GA4 property for your website.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">2. Get Tracking ID</h4>
                <p className="text-sm text-neutral-600">
                  Copy the Measurement ID (G-XXXXXXXXXX) from your GA4 property.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">3. Configure Integration</h4>
                <p className="text-sm text-neutral-600">
                  Enable the integration and enter your tracking ID to start tracking.
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
                <li>• Real-time user tracking</li>
                <li>• Event and conversion tracking</li>
                <li>• Audience segmentation</li>
                <li>• E-commerce tracking</li>
                <li>• Custom dimensions and metrics</li>
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