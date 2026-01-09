'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  CreditCard,
  Search,
  Pencil,
  X,
  CheckCircle2,
  AlertCircle,
  Calendar
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Subscription {
  id: string
  client_id: string
  project_id: string
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
  billing_cycle: string
  next_billing_date: string | null
  status: string
  started_at: string
  created_at: string
  cap_clients: {
    contact_name: string
    company_name: string | null
    email: string
  }
  cap_projects: {
    project_name: string
  }
}

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-green-100 text-green-700' },
  paused: { label: 'Paused', color: 'bg-amber-100 text-amber-700' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  pending_cancellation: { label: 'Pending Cancel', color: 'bg-orange-100 text-orange-700' },
}

const billingCycleLabels: Record<string, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  biannual: 'Biannual',
  annual: 'Annual',
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingSub, setEditingSub] = useState<Subscription | null>(null)
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    monthly_fee: '',
    total_features: '',
    used_features: '',
    total_integrations: '',
    used_integrations: '',
    billing_cycle: 'monthly',
    status: 'active'
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const { data } = await supabase
        .from('cap_subscriptions')
        .select(`
          *,
          cap_clients (
            contact_name,
            company_name,
            email
          ),
          cap_projects (
            project_name
          )
        `)
        .order('created_at', { ascending: false })

      if (data) setSubscriptions(data)
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (sub: Subscription) => {
    setEditingSub(sub)
    setEditForm({
      monthly_fee: sub.monthly_fee.toString(),
      total_features: sub.total_features.toString(),
      used_features: sub.used_features.toString(),
      total_integrations: sub.total_integrations.toString(),
      used_integrations: sub.used_integrations.toString(),
      billing_cycle: sub.billing_cycle || 'monthly',
      status: sub.status
    })
    setShowEditModal(true)
  }

  const handleSave = async () => {
    if (!editingSub) return

    setIsSaving(true)

    try {
      await supabase
        .from('cap_subscriptions')
        .update({
          monthly_fee: parseFloat(editForm.monthly_fee),
          total_features: parseInt(editForm.total_features),
          used_features: parseInt(editForm.used_features),
          total_integrations: parseInt(editForm.total_integrations),
          used_integrations: parseInt(editForm.used_integrations),
          billing_cycle: editForm.billing_cycle,
          status: editForm.status
        })
        .eq('id', editingSub.id)

      await fetchSubscriptions()
      setShowEditModal(false)
    } catch (error) {
      console.error('Error updating subscription:', error)
      alert('Failed to update subscription')
    } finally {
      setIsSaving(false)
    }
  }

  const filteredSubs = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.cap_clients?.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.cap_clients?.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.cap_projects?.project_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Stats
  const totalMRR = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => {
      const multiplier = s.billing_cycle === 'quarterly' ? 3 : s.billing_cycle === 'biannual' ? 6 : s.billing_cycle === 'annual' ? 12 : 1
      return sum + (s.monthly_fee / multiplier)
    }, 0)

  const activeCount = subscriptions.filter(s => s.status === 'active').length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Subscriptions</h1>
          <p className="text-neutral-500">Manage all client subscriptions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500 mb-1">Active Subscriptions</p>
          <p className="text-2xl font-bold text-neutral-900">{activeCount}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500 mb-1">Monthly Recurring Revenue</p>
          <p className="text-2xl font-bold text-green-600">{totalMRR.toLocaleString()} DKK</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500 mb-1">Total Subscriptions</p>
          <p className="text-2xl font-bold text-neutral-900">{subscriptions.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Search subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-neutral-200 rounded-lg text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Subscriptions Table */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-neutral-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredSubs.length === 0 ? (
        <div className="bg-neutral-50 rounded-xl p-12 text-center border border-neutral-200">
          <CreditCard className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500">No subscriptions found</p>
        </div>
      ) : (
        <div className="border border-neutral-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Client</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Project</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Package</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Features</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Billing</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredSubs.map((sub) => {
                const status = statusConfig[sub.status] || statusConfig.active
                return (
                  <motion.tr
                    key={sub.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-neutral-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900">
                        {sub.cap_clients?.company_name || sub.cap_clients?.contact_name}
                      </p>
                      <p className="text-xs text-neutral-500">{sub.cap_clients?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900">
                      {sub.cap_projects?.project_name}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900 capitalize">{sub.package_name}</p>
                      <p className="text-xs text-neutral-500">{sub.package_type}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-neutral-900">
                        {sub.used_features} / {sub.total_features} used
                      </p>
                      <div className="w-24 bg-neutral-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-neutral-900 rounded-full h-1.5"
                          style={{ width: `${(sub.used_features / sub.total_features) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900">
                        {sub.monthly_fee.toLocaleString()} kr
                      </p>
                      <p className="text-xs text-neutral-500">
                        {billingCycleLabels[sub.billing_cycle] || 'Monthly'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openEditModal(sub)}
                        className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingSub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full"
            >
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Edit Subscription</h2>
                  <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-neutral-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Monthly Fee (DKK)</Label>
                    <Input
                      type="number"
                      value={editForm.monthly_fee}
                      onChange={(e) => setEditForm({...editForm, monthly_fee: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Billing Cycle</Label>
                    <select
                      value={editForm.billing_cycle}
                      onChange={(e) => setEditForm({...editForm, billing_cycle: e.target.value})}
                      className="w-full mt-1.5 px-3 py-2 border border-neutral-200 rounded-lg"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="biannual">Biannual</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Total Features</Label>
                    <Input
                      type="number"
                      value={editForm.total_features}
                      onChange={(e) => setEditForm({...editForm, total_features: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Used Features</Label>
                    <Input
                      type="number"
                      value={editForm.used_features}
                      onChange={(e) => setEditForm({...editForm, used_features: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Total Integrations</Label>
                    <Input
                      type="number"
                      value={editForm.total_integrations}
                      onChange={(e) => setEditForm({...editForm, total_integrations: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Used Integrations</Label>
                    <Input
                      type="number"
                      value={editForm.used_integrations}
                      onChange={(e) => setEditForm({...editForm, used_integrations: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label>Status</Label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                    className="w-full mt-1.5 px-3 py-2 border border-neutral-200 rounded-lg"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="pending_cancellation">Pending Cancellation</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-200 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
