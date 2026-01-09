'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  FileText,
  Search,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Send
} from 'lucide-react'
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
  billing_period_start: string | null
  billing_period_end: string | null
  created_at: string
  cap_clients: {
    contact_name: string
    company_name: string | null
    email: string
  }
  cap_projects: {
    project_name: string
  } | null
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  draft: { label: 'Draft', color: 'bg-neutral-100 text-neutral-700', icon: FileText },
  sent: { label: 'Sent', color: 'bg-amber-100 text-amber-700', icon: Clock },
  paid: { label: 'Paid', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  cancelled: { label: 'Cancelled', color: 'bg-neutral-100 text-neutral-500', icon: AlertCircle },
}

const typeLabels: Record<string, string> = {
  one_time: 'One-time Fee',
  monthly: 'Monthly Subscription',
  additional_feature: 'Additional Feature',
  cancellation_penalty: 'Cancellation Penalty',
}

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const { data } = await supabase
        .from('cap_invoices')
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

      if (data) setInvoices(data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsPaid = async (invoiceId: string) => {
    try {
      await supabase
        .from('cap_invoices')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString()
        })
        .eq('id', invoiceId)

      fetchInvoices()
    } catch (error) {
      console.error('Error marking invoice as paid:', error)
    }
  }

  const sendInvoice = async (invoiceId: string) => {
    try {
      await supabase
        .from('cap_invoices')
        .update({
          status: 'sent',
          issued_at: new Date().toISOString(),
          due_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days
        })
        .eq('id', invoiceId)

      fetchInvoices()
      alert('Invoice sent!')
    } catch (error) {
      console.error('Error sending invoice:', error)
    }
  }

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.invoice_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.cap_clients?.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.cap_clients?.company_name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Stats
  const totalPending = invoices
    .filter(inv => inv.status === 'sent')
    .reduce((sum, inv) => sum + inv.amount, 0)
  const totalOverdue = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0)
  const totalPaidThisMonth = invoices
    .filter(inv => {
      if (inv.status !== 'paid' || !inv.paid_at) return false
      const paidDate = new Date(inv.paid_at)
      const now = new Date()
      return paidDate.getMonth() === now.getMonth() && paidDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Invoices</h1>
          <p className="text-neutral-500">Manage all client invoices</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500 mb-1">Total Invoices</p>
          <p className="text-2xl font-bold text-neutral-900">{invoices.length}</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500 mb-1">Pending Payment</p>
          <p className="text-2xl font-bold text-amber-600">{totalPending.toLocaleString()} DKK</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500 mb-1">Overdue</p>
          <p className="text-2xl font-bold text-red-600">{totalOverdue.toLocaleString()} DKK</p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl p-5">
          <p className="text-sm text-neutral-500 mb-1">Paid This Month</p>
          <p className="text-2xl font-bold text-green-600">{totalPaidThisMonth.toLocaleString()} DKK</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Search invoices..."
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
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Invoices Table */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-neutral-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="bg-neutral-50 rounded-xl p-12 text-center border border-neutral-200">
          <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500">No invoices found</p>
        </div>
      ) : (
        <div className="border border-neutral-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Invoice</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Client</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Type</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Amount</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Due Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredInvoices.map((invoice) => {
                const status = statusConfig[invoice.status] || statusConfig.draft
                const StatusIcon = status.icon
                const isOverdue = invoice.status === 'sent' && invoice.due_at && new Date(invoice.due_at) < new Date()
                
                return (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-neutral-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900">{invoice.invoice_number}</p>
                      {invoice.cap_projects && (
                        <p className="text-sm text-neutral-500">{invoice.cap_projects.project_name}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-neutral-900">
                        {invoice.cap_clients?.company_name || invoice.cap_clients?.contact_name}
                      </p>
                      <p className="text-xs text-neutral-500">{invoice.cap_clients?.email}</p>
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
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        isOverdue ? 'bg-red-100 text-red-700' : status.color
                      }`}>
                        <StatusIcon className="w-3 h-3" />
                        {isOverdue ? 'Overdue' : status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {invoice.due_at ? new Date(invoice.due_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {invoice.status === 'draft' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => sendInvoice(invoice.id)}
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Send
                          </Button>
                        )}
                        {invoice.status === 'sent' && (
                          <Button
                            size="sm"
                            onClick={() => markAsPaid(invoice.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Mark Paid
                          </Button>
                        )}
                        <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
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
