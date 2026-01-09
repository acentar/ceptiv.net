'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  Calendar,
  DollarSign,
  Package,
  Check,
  Mail,
  Phone
} from 'lucide-react'
import { useClientAuth } from '@/lib/client-auth'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  project_name: string
  project_type: string
  description: string | null
  is_new_build: boolean
  timeline: string | null
  budget_range: string | null
  status: string
  proposed_package: string | null
  proposed_one_time_fee: number | null
  proposed_monthly_fee: number | null
  proposed_features: number | null
  proposed_integrations: number | null
  proposal_notes: string | null
  proposal_sent_at: string | null
  proposal_accepted_at: string | null
  contact_person_name: string | null
  contact_person_email: string | null
  created_at: string
  updated_at: string
}

interface Feature {
  id: string
  title: string
  status: string
  created_at: string
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: typeof Clock }> = {
  pending: { label: 'Pending Review', color: 'text-amber-700', bgColor: 'bg-amber-50', icon: Clock },
  proposal_sent: { label: 'Proposal Ready', color: 'text-blue-700', bgColor: 'bg-blue-50', icon: FileText },
  proposal_accepted: { label: 'Accepted', color: 'text-green-700', bgColor: 'bg-green-50', icon: CheckCircle2 },
  in_progress: { label: 'In Progress', color: 'text-purple-700', bgColor: 'bg-purple-50', icon: Sparkles },
  completed: { label: 'Completed', color: 'text-green-700', bgColor: 'bg-green-50', icon: CheckCircle2 },
  on_hold: { label: 'On Hold', color: 'text-orange-700', bgColor: 'bg-orange-50', icon: AlertCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-50', icon: AlertCircle },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { client } = useClientAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [features, setFeatures] = useState<Feature[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAccepting, setIsAccepting] = useState(false)

  const projectId = params.id as string

  useEffect(() => {
    if (client && projectId) {
      fetchProject()
    }
  }, [client, projectId])

  const fetchProject = async () => {
    if (!client) return

    try {
      // Fetch project
      const { data: projectData, error } = await supabase
        .from('cap_projects')
        .select('*')
        .eq('id', projectId)
        .eq('client_id', client.id)
        .single()

      if (error || !projectData) {
        router.push('/client/dashboard/projects')
        return
      }

      setProject(projectData)

      // Fetch features for this project
      const { data: featuresData } = await supabase
        .from('cap_features')
        .select('id, title, status, created_at')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (featuresData) setFeatures(featuresData)
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAcceptProposal = async () => {
    if (!project || !client) return

    setIsAccepting(true)

    try {
      const now = new Date()
      const billingCycle = (project as unknown as { proposed_billing_cycle?: string }).proposed_billing_cycle || 'monthly'
      
      // Calculate next billing date based on cycle
      const getNextBillingDate = (cycle: string) => {
        const date = new Date()
        switch (cycle) {
          case 'quarterly': date.setMonth(date.getMonth() + 3); break
          case 'biannual': date.setMonth(date.getMonth() + 6); break
          case 'annual': date.setFullYear(date.getFullYear() + 1); break
          default: date.setMonth(date.getMonth() + 1)
        }
        return date.toISOString()
      }

      // Update project status
      await supabase
        .from('cap_projects')
        .update({
          status: 'proposal_accepted',
          proposal_accepted_at: now.toISOString()
        })
        .eq('id', project.id)

      // Create subscription
      const { data: subscription } = await supabase
        .from('cap_subscriptions')
        .insert({
          client_id: client.id,
          project_id: project.id,
          package_name: project.proposed_package || 'custom',
          package_type: project.project_type === 'mobile_app' ? 'mobile' : 'web',
          one_time_fee: project.proposed_one_time_fee || 0,
          monthly_fee: project.proposed_monthly_fee || 0,
          total_features: project.proposed_features || 12,
          total_integrations: project.proposed_integrations || 1,
          billing_cycle: billingCycle,
          next_billing_date: getNextBillingDate(billingCycle),
          last_billing_date: now.toISOString(),
          status: 'active'
        })
        .select('id')
        .single()

      // Generate invoice number (simple format for now)
      const invoiceNumber = `INV-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`

      // Create one-time fee invoice
      if (project.proposed_one_time_fee && project.proposed_one_time_fee > 0) {
        await supabase
          .from('cap_invoices')
          .insert({
            client_id: client.id,
            project_id: project.id,
            subscription_id: subscription?.id,
            invoice_number: invoiceNumber,
            invoice_type: 'one_time',
            amount: project.proposed_one_time_fee,
            currency: 'DKK',
            description: `${project.proposed_package?.charAt(0).toUpperCase()}${project.proposed_package?.slice(1)} Package - One-time setup fee for ${project.project_name}`,
            status: 'sent',
            issued_at: now.toISOString(),
            due_at: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
            line_items: JSON.stringify([
              {
                description: `${project.proposed_package?.charAt(0).toUpperCase()}${project.proposed_package?.slice(1)} Package Setup`,
                quantity: 1,
                unit_price: project.proposed_one_time_fee,
                amount: project.proposed_one_time_fee
              }
            ]),
            subtotal: project.proposed_one_time_fee,
            tax_rate: 0,
            tax_amount: 0
          })
      }

      // Create notification
      await supabase
        .from('cap_notifications')
        .insert({
          client_id: client.id,
          title: 'Proposal Accepted!',
          message: `You've accepted the proposal for "${project.project_name}". We'll start working on it right away! Your invoice has been sent.`,
          type: 'project_update',
          related_project_id: project.id
        })

      // Refresh project data
      await fetchProject()
    } catch (error) {
      console.error('Error accepting proposal:', error)
      alert('Failed to accept proposal. Please try again.')
    } finally {
      setIsAccepting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-neutral-100 rounded animate-pulse" />
        <div className="h-64 bg-neutral-100 rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">Project not found</p>
        <Button asChild className="mt-4">
          <Link href="/client/dashboard/projects">Back to Projects</Link>
        </Button>
      </div>
    )
  }

  const status = statusConfig[project.status] || statusConfig.pending
  const StatusIcon = status.icon

  return (
    <div>
      {/* Back Link */}
      <Link
        href="/client/dashboard/projects"
        className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 tracking-tight mb-2">
              {project.project_name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                <StatusIcon className="w-3 h-3" />
                {status.label}
              </span>
              <span>{project.project_type.replace('_', ' ')}</span>
              <span>•</span>
              <span>Created {new Date(project.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Proposal Section */}
          {project.status === 'proposal_sent' && project.proposed_package && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-blue-900">Proposal Ready</h2>
                  <p className="text-sm text-blue-700">Review and accept to get started</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 mb-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Package</p>
                    <p className="text-lg font-bold text-neutral-900">
                      {project.proposed_package.charAt(0).toUpperCase() + project.proposed_package.slice(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Features</p>
                    <p className="text-lg font-bold text-neutral-900">{project.proposed_features}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">One-time Fee</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {project.proposed_one_time_fee?.toLocaleString()} <span className="text-sm font-normal">DKK</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Monthly Fee</p>
                    <p className="text-2xl font-bold text-neutral-900">
                      {project.proposed_monthly_fee?.toLocaleString()} <span className="text-sm font-normal">kr/mo</span>
                    </p>
                  </div>
                </div>

                {project.proposal_notes && (
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Notes</p>
                    <p className="text-sm text-neutral-700">{project.proposal_notes}</p>
                  </div>
                )}
              </div>

              <Button
                onClick={handleAcceptProposal}
                disabled={isAccepting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
              >
                {isAccepting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2" />
                    Accepting...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Accept Proposal
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* Accepted Confirmation */}
          {project.status === 'proposal_accepted' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-green-900">Proposal Accepted</h2>
                  <p className="text-sm text-green-700">
                    Accepted on {project.proposal_accepted_at && new Date(project.proposal_accepted_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Project Details</h2>
            <div className="border border-neutral-200 rounded-2xl divide-y divide-neutral-200 overflow-hidden">
              {project.description && (
                <div className="p-5">
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Description</p>
                  <p className="text-neutral-700 whitespace-pre-wrap">{project.description}</p>
                </div>
              )}

              <div className="p-5 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Build Type</p>
                  <p className="font-medium text-neutral-900">
                    {project.is_new_build ? 'New Build (From Scratch)' : 'API Integration'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Timeline</p>
                  <p className="font-medium text-neutral-900">{project.timeline || 'Flexible'}</p>
                </div>
              </div>

              {project.budget_range && (
                <div className="p-5">
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Budget Range</p>
                  <p className="font-medium text-neutral-900">{project.budget_range}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Features */}
          {features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-900">Features</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/client/dashboard/features">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Request Feature
                  </Link>
                </Button>
              </div>
              <div className="border border-neutral-200 rounded-2xl divide-y divide-neutral-200 overflow-hidden">
                {features.map((feature) => (
                  <div key={feature.id} className="p-4 flex items-center justify-between">
                    <p className="font-medium text-neutral-900">{feature.title}</p>
                    <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                      {feature.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Person */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200"
          >
            <p className="text-xs text-neutral-500 uppercase tracking-wide mb-4">Your Contact</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white font-medium">
                DV
              </div>
              <div>
                <p className="font-medium text-neutral-900">{project.contact_person_name || 'Daniel Vestergaard'}</p>
                <p className="text-sm text-neutral-500">Contact Person</p>
              </div>
            </div>
            <div className="space-y-2">
              <a
                href={`mailto:${project.contact_person_email || 'dv@ceptiv.net'}`}
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {project.contact_person_email || 'dv@ceptiv.net'}
              </a>
              <a
                href="tel:+4581983271"
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +45 81 98 32 71
              </a>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-neutral-200 rounded-2xl p-5"
          >
            <p className="text-xs text-neutral-500 uppercase tracking-wide mb-4">Timeline</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">Project Created</p>
                  <p className="text-xs text-neutral-500">{new Date(project.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              {project.proposal_sent_at && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">Proposal Sent</p>
                    <p className="text-xs text-neutral-500">{new Date(project.proposal_sent_at).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {project.proposal_accepted_at && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">Proposal Accepted</p>
                    <p className="text-xs text-neutral-500">{new Date(project.proposal_accepted_at).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {project.status === 'pending' && (
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-neutral-300 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-400">Awaiting Proposal</p>
                    <p className="text-xs text-neutral-400">Usually within 24 hours</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
