'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Sparkles,
  ChevronRight,
  FileText,
  Plus
} from 'lucide-react'
import { useClientAuth } from '@/lib/client-auth'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  project_name: string
  project_type: string
  status: string
  proposed_package: string | null
  proposed_one_time_fee: number | null
  proposed_monthly_fee: number | null
  created_at: string
}

interface Subscription {
  id: string
  package_name: string
  package_type: string
  monthly_fee: number
  total_features: number
  used_features: number
  remaining_features: number
  status: string
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Pending Review', color: 'text-amber-600', icon: Clock },
  proposal_sent: { label: 'Proposal Ready', color: 'text-blue-600', icon: FileText },
  proposal_accepted: { label: 'Accepted', color: 'text-green-600', icon: CheckCircle2 },
  in_progress: { label: 'In Progress', color: 'text-purple-600', icon: Sparkles },
  completed: { label: 'Completed', color: 'text-green-600', icon: CheckCircle2 },
  on_hold: { label: 'On Hold', color: 'text-orange-600', icon: AlertCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-600', icon: AlertCircle },
}

export default function ClientDashboard() {
  const { client } = useClientAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (client) {
      fetchData()
    }
  }, [client])

  const fetchData = async () => {
    if (!client) return
    
    try {
      const { data: projectsData } = await supabase
        .from('cap_projects')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false })
      
      if (projectsData) setProjects(projectsData)

      const { data: subsData } = await supabase
        .from('cap_subscriptions')
        .select('*')
        .eq('client_id', client.id)
        .eq('status', 'active')
      
      if (subsData) setSubscriptions(subsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!client) return null

  const firstName = client.contact_name.split(' ')[0]

  return (
    <div>
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-neutral-900 mb-2 tracking-tight">
          Welcome, {firstName}.
        </h1>
        <p className="text-lg text-neutral-500">
          Manage your projects and subscriptions.
        </p>
      </motion.div>

      {/* Contact Person */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Your contact</h2>
        <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center text-white text-lg font-semibold">
              DV
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-neutral-900">Daniel Vestergaard</p>
              <p className="text-neutral-500 mb-4">Your dedicated contact person</p>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
                Hi {firstName}! I&apos;m here to help with your projects. 
                Don&apos;t hesitate to reach out if you have questions or need anything.
              </p>
              <div className="flex gap-6 mt-4">
                <a 
                  href="mailto:dv@ceptiv.net"
                  className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  dv@ceptiv.net
                </a>
                <a 
                  href="tel:+4581983271"
                  className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +45 81 98 32 71
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Your Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Your projects</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/start">
              <Plus className="w-4 h-4 mr-2" />
              New project
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 bg-neutral-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 text-center">
            <p className="text-neutral-500 mb-4">No projects yet</p>
            <Button asChild>
              <Link href="/start">
                Start a project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="border border-neutral-200 rounded-2xl divide-y divide-neutral-200 overflow-hidden">
            {projects.map((project) => {
              const status = statusConfig[project.status] || statusConfig.pending
              const StatusIcon = status.icon
              
              return (
                <Link
                  key={project.id}
                  href={`/client/dashboard/projects/${project.id}`}
                  className="flex items-center justify-between p-5 hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium text-neutral-900">{project.project_name}</p>
                      <span className={`flex items-center gap-1.5 text-sm ${status.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500">
                      {project.project_type.replace('_', ' ')} • {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {project.status === 'proposal_sent' && (
                    <span className="text-sm font-medium text-blue-600 mr-4">
                      Review proposal →
                    </span>
                  )}
                  
                  <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
                </Link>
              )
            })}
          </div>
        )}
      </motion.div>

      {/* Active Subscriptions */}
      {subscriptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Subscription</h2>
          <div className="border border-neutral-200 rounded-2xl divide-y divide-neutral-200 overflow-hidden">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-neutral-900">
                      {sub.package_name.charAt(0).toUpperCase() + sub.package_name.slice(1)} Package
                    </p>
                    <p className="text-sm text-neutral-500">{sub.package_type}</p>
                  </div>
                  <p className="text-lg font-semibold text-neutral-900">
                    {sub.monthly_fee.toLocaleString()} kr<span className="text-sm font-normal text-neutral-500">/mo</span>
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral-500">Features used</span>
                  <span className="font-medium text-neutral-900">
                    {sub.used_features} of {sub.total_features}
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-neutral-900 rounded-full h-2 transition-all"
                    style={{ width: `${(sub.used_features / sub.total_features) * 100}%` }}
                  />
                </div>
                
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/client/dashboard/features">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Request feature
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/client/dashboard/subscription">
                      Manage
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link 
            href="/start"
            className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-neutral-400 transition-colors group"
          >
            <Plus className="w-5 h-5 text-neutral-400 mb-3 group-hover:text-neutral-600" />
            <p className="font-medium text-neutral-900">Start new project</p>
            <p className="text-sm text-neutral-500">Begin a new development project</p>
          </Link>
          <Link 
            href="/client/dashboard/features"
            className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-neutral-400 transition-colors group"
          >
            <Sparkles className="w-5 h-5 text-neutral-400 mb-3 group-hover:text-neutral-600" />
            <p className="font-medium text-neutral-900">Request feature</p>
            <p className="text-sm text-neutral-500">Add functionality to your project</p>
          </Link>
          <Link 
            href="/client/dashboard/invoices"
            className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-neutral-400 transition-colors group"
          >
            <FileText className="w-5 h-5 text-neutral-400 mb-3 group-hover:text-neutral-600" />
            <p className="font-medium text-neutral-900">View invoices</p>
            <p className="text-sm text-neutral-500">See your billing history</p>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
