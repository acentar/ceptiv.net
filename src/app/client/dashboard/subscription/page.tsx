'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  CreditCard,
  Package,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Plus,
  ArrowRight
} from 'lucide-react'
import { useClientAuth } from '@/lib/client-auth'
import { supabase } from '@/lib/supabase'

interface Subscription {
  id: string
  package_name: string
  package_type: string
  one_time_fee: number
  one_time_fee_paid: boolean
  monthly_fee: number
  total_features: number
  used_features: number
  remaining_features: number
  total_integrations: number
  used_integrations: number
  status: string
  started_at: string
}

const packageDetails: Record<string, { features: string[] }> = {
  small: {
    features: [
      'UX designer consultation',
      'Custom website design',
      'Custom backend system',
      'Data storage & database',
      'Fast server hosting',
      'Security & SSL',
      'Regular backups',
      'Maintenance & updates',
      'Priority support',
    ]
  },
  medium: {
    features: [
      'UX designer consultation',
      'Custom website design',
      'Custom backend system',
      'Data storage & database',
      'Fast server hosting',
      'Security & SSL',
      'Regular backups',
      'Maintenance & updates',
      'Priority support',
      'Extended integrations',
    ]
  },
  large: {
    features: [
      'UX designer consultation',
      'Custom website design',
      'Custom backend system',
      'Data storage & database',
      'Fast server hosting',
      'Security & SSL',
      'Regular backups',
      'Maintenance & updates',
      'Priority support',
      'Extended integrations',
      'Advanced analytics',
    ]
  }
}

export default function ClientSubscriptionPage() {
  const { client } = useClientAuth()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (client) fetchSubscriptions()
  }, [client])

  const fetchSubscriptions = async () => {
    if (!client) return
    
    try {
      const { data } = await supabase
        .from('cap_subscriptions')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false })
      
      if (data) setSubscriptions(data)
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active')
  const totalMonthly = activeSubscriptions.reduce((sum, s) => sum + s.monthly_fee, 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Subscription</h1>
        <p className="text-neutral-500 mt-1">Manage your subscription and features</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-48 bg-neutral-100 rounded-2xl animate-pulse" />
          <div className="h-32 bg-neutral-100 rounded-2xl animate-pulse" />
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="bg-neutral-50 rounded-2xl p-12 border border-neutral-200 text-center">
          <CreditCard className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-900 font-medium mb-2">No active subscription</p>
          <p className="text-neutral-500 text-sm mb-4">
            Start a project and accept a proposal to begin your subscription
          </p>
          <Button asChild>
            <Link href="/start">
              Start a project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Monthly Summary */}
          <div className="bg-neutral-900 text-white rounded-2xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-400 mb-1">Monthly total</p>
                <p className="text-4xl font-bold">{totalMonthly.toLocaleString()} kr</p>
              </div>
              <div className="text-right">
                <p className="text-neutral-400 mb-1">Active subscriptions</p>
                <p className="text-2xl font-bold">{activeSubscriptions.length}</p>
              </div>
            </div>
          </div>

          {/* Subscriptions */}
          {subscriptions.map((sub, index) => {
            const details = packageDetails[sub.package_name.toLowerCase()] || packageDetails.small
            
            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-neutral-200 rounded-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="bg-neutral-50 p-6 border-b border-neutral-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900">
                          {sub.package_name.charAt(0).toUpperCase() + sub.package_name.slice(1)} Package
                        </h3>
                        <p className="text-sm text-neutral-500">
                          {sub.package_type} • Started {new Date(sub.started_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-neutral-900">{sub.monthly_fee.toLocaleString()} kr</p>
                      <p className="text-sm text-neutral-500">per month</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Features Usage */}
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-4">Feature Usage</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-neutral-500">Features</span>
                            <span className="font-medium text-neutral-900">
                              {sub.used_features} used / {sub.remaining_features} remaining
                            </span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-3">
                            <div 
                              className="bg-neutral-900 rounded-full h-3 transition-all"
                              style={{ width: `${(sub.used_features / sub.total_features) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-neutral-500">Integrations</span>
                            <span className="font-medium text-neutral-900">
                              {sub.used_integrations} / {sub.total_integrations}
                            </span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-3">
                            <div 
                              className="bg-neutral-900 rounded-full h-3 transition-all"
                              style={{ width: `${(sub.used_integrations / sub.total_integrations) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/client/dashboard/features">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Request Feature
                          </Link>
                        </Button>
                        <p className="text-xs text-neutral-500 text-center mt-2">
                          Additional features: 2.500 DKK each
                        </p>
                      </div>
                    </div>

                    {/* What's Included */}
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-4">What&apos;s Included</h4>
                      <ul className="space-y-2">
                        {details.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-neutral-50 p-4 border-t border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    {sub.status === 'active' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-green-700">Active</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span className="text-amber-700">{sub.status}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Cancellation Notice */}
                <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-center">
                  <p className="text-xs text-neutral-500">
                    Need to cancel or modify your subscription?{' '}
                    <a href="mailto:dv@ceptiv.net" className="text-neutral-700 hover:underline">Contact us</a>
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
