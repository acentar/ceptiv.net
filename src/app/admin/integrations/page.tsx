'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, Settings, CheckCircle, XCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminIntegrationsPage() {
  const [grokEnabled, setGrokEnabled] = useState(false)
  const [grokConnected, setGrokConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        // Fetch Grok integration settings
        const { data: grokEnabledData } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', 'grok_enabled')
          .single()

        const { data: grokApiKeyData } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', 'grok_api_key')
          .single()

        setGrokEnabled(grokEnabledData?.value === 'true')
        setGrokConnected(!!grokApiKeyData?.value)
      } catch (error) {
        console.error('Error fetching integrations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchIntegrations()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Integrations</h1>
        <p className="text-neutral-600 mt-2">
          Manage third-party integrations and API connections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Grok Integration Card */}
        <Card className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-neutral-100 rounded-lg">
                  <Zap className="w-6 h-6 text-neutral-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Grok AI</CardTitle>
                  <CardDescription>x.ai Integration</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {grokConnected && grokEnabled ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-neutral-400" />
                )}
                <Badge variant={grokEnabled ? "default" : "secondary"}>
                  {grokEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Connect with x.ai's Grok AI for advanced AI-powered features and automation.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-xs text-neutral-500">
                {grokConnected ? 'Connected' : 'Not connected'}
              </div>
              <Button asChild size="sm">
                <Link href="/admin/integrations/grok">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder cards for future integrations */}
        <Card className="relative opacity-50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-neutral-100 rounded-lg">
                <div className="w-6 h-6 bg-neutral-300 rounded" />
              </div>
              <div>
                <CardTitle className="text-lg">Coming Soon</CardTitle>
                <CardDescription>Future Integration</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Additional integrations will be available soon.
            </p>
          </CardContent>
        </Card>

        <Card className="relative opacity-50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-neutral-100 rounded-lg">
                <div className="w-6 h-6 bg-neutral-300 rounded" />
              </div>
              <div>
                <CardTitle className="text-lg">Coming Soon</CardTitle>
                <CardDescription>Future Integration</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 mb-4">
              Additional integrations will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}