'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  Plus,
  PartyPopper,
  Key,
  Copy,
  Check,
  X
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const [welcomePin, setWelcomePin] = useState('')
  const [pinCopied, setPinCopied] = useState(false)

  // Check for welcome flow
  useEffect(() => {
    const isWelcome = searchParams.get('welcome')
    const pin = searchParams.get('pin')
    if (isWelcome === 'true' && pin) {
      setWelcomePin(pin)
      setShowWelcome(true)
      // Clean up URL
      router.replace('/client/dashboard', { scroll: false })
    }
  }, [searchParams, router])

  const copyPin = () => {
    navigator.clipboard.writeText(welcomePin)
    setPinCopied(true)
    setTimeout(() => setPinCopied(false), 2000)
  }

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
      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-md w-full p-8 text-center relative"
            >
              <button
                onClick={() => setShowWelcome(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <PartyPopper className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Welcome to Ceptiv!
              </h2>
              <p className="text-neutral-500 mb-6">
                Your project has been submitted. Save your login PIN for future access.
              </p>

              {/* PIN Display */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Key className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm text-neutral-500">Your PIN</span>
                </div>
                <div className="flex justify-center gap-2 mb-4">
                  {welcomePin.split('').map((digit, index) => (
                    <div
                      key={index}
                      className="w-12 h-14 bg-white border-2 border-neutral-200 rounded-lg flex items-center justify-center text-2xl font-bold text-neutral-900"
                    >
                      {digit}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyPin}
                  className="mx-auto"
                >
                  {pinCopied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy PIN
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-neutral-400 mb-6">
                Use this PIN with your email to sign in next time
              </p>

              <Button
                onClick={() => setShowWelcome(false)}
                className="w-full"
              >
                Got it
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
