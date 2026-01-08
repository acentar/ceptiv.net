'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react'
import { useClientAuth } from '@/lib/client-auth'
import { supabase } from '@/lib/supabase'

interface Invoice {
  id: string
  invoice_number: string
  invoice_type: string
  amount: number
  currency: string
  description: string | null
  status: string
  issued_at: string | null
  due_at: string | null
  paid_at: string | null
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: typeof CheckCircle2 }> = {
  draft: { label: 'Draft', color: 'text-neutral-700', bgColor: 'bg-neutral-50', icon: FileText },
  sent: { label: 'Pending', color: 'text-amber-700', bgColor: 'bg-amber-50', icon: Clock },
  paid: { label: 'Paid', color: 'text-green-700', bgColor: 'bg-green-50', icon: CheckCircle2 },
  overdue: { label: 'Overdue', color: 'text-red-700', bgColor: 'bg-red-50', icon: AlertCircle },
  cancelled: { label: 'Cancelled', color: 'text-neutral-500', bgColor: 'bg-neutral-50', icon: AlertCircle },
}

const typeLabels: Record<string, string> = {
  one_time: 'One-time fee',
  monthly: 'Monthly subscription',
  additional_feature: 'Additional feature',
  cancellation_penalty: 'Cancellation penalty',
}

export default function ClientInvoicesPage() {
  const { client } = useClientAuth()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (client) fetchInvoices()
  }, [client])

  const fetchInvoices = async () => {
    if (!client) return
    
    try {
      const { data } = await supabase
        .from('cap_invoices')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false })
      
      if (data) setInvoices(data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const totalPending = invoices
    .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Invoices</h1>
        <p className="text-neutral-500 mt-1">View your billing history</p>
      </div>

      {/* Summary */}
      {invoices.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200">
            <p className="text-sm text-neutral-500 mb-1">Total invoices</p>
            <p className="text-2xl font-bold text-neutral-900">{invoices.length}</p>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200">
            <p className="text-sm text-neutral-500 mb-1">Pending payment</p>
            <p className="text-2xl font-bold text-neutral-900">{totalPending.toLocaleString()} DKK</p>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200">
            <p className="text-sm text-neutral-500 mb-1">Paid this year</p>
            <p className="text-2xl font-bold text-neutral-900">
              {invoices
                .filter(inv => inv.status === 'paid' && new Date(inv.paid_at || '').getFullYear() === new Date().getFullYear())
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toLocaleString()} DKK
            </p>
          </div>
        </div>
      )}

      {/* Invoices List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-neutral-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : invoices.length === 0 ? (
        <div className="bg-neutral-50 rounded-2xl p-12 border border-neutral-200 text-center">
          <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-900 font-medium mb-2">No invoices yet</p>
          <p className="text-neutral-500 text-sm">
            Invoices will appear here once you have an active subscription
          </p>
        </div>
      ) : (
        <div className="border border-neutral-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-4">Invoice</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-4">Type</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-4">Amount</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-4">Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {invoices.map((invoice, index) => {
                const status = statusConfig[invoice.status] || statusConfig.draft
                const StatusIcon = status.icon
                
                return (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-neutral-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900">{invoice.invoice_number}</p>
                      {invoice.description && (
                        <p className="text-sm text-neutral-500">{invoice.description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {typeLabels[invoice.invoice_type] || invoice.invoice_type}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900">
                        {invoice.amount.toLocaleString()} {invoice.currency}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {invoice.issued_at ? new Date(invoice.issued_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
