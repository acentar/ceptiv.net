'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { 
  LogOut, 
  FolderKanban, 
  CreditCard, 
  FileText, 
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Mail,
  Phone,
  Sparkles,
  Bell,
  ChevronRight,
  Package
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
  contact_person_name: string | null
  contact_person_email: string | null
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

interface Notification {
  id: string
  title: string
  message: string
  type: string
  is_read: boolean
  created_at: string
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Pending Review', color: 'text-yellow-500 bg-yellow-500/10', icon: Clock },
  proposal_sent: { label: 'Proposal Ready', color: 'text-blue-500 bg-blue-500/10', icon: FileText },
  proposal_accepted: { label: 'Accepted', color: 'text-green-500 bg-green-500/10', icon: CheckCircle2 },
  in_progress: { label: 'In Progress', color: 'text-purple-500 bg-purple-500/10', icon: Sparkles },
  completed: { label: 'Completed', color: 'text-green-500 bg-green-500/10', icon: CheckCircle2 },
  on_hold: { label: 'On Hold', color: 'text-orange-500 bg-orange-500/10', icon: AlertCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-500 bg-red-500/10', icon: AlertCircle },
}

export default function ClientDashboard() {
  const router = useRouter()
  const { client, isAuthenticated, isLoading: authLoading, logout } = useClientAuth()
  
  const [projects, setProjects] = useState<Project[]>([])
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/client/login')
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    if (client) {
      fetchData()
    }
  }, [client])

  const fetchData = async () => {
    if (!client) return
    
    try {
      // Fetch projects
      const { data: projectsData } = await supabase
        .from('cap_projects')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false })
      
      if (projectsData) setProjects(projectsData)

      // Fetch subscriptions
      const { data: subsData } = await supabase
        .from('cap_subscriptions')
        .select('*')
        .eq('client_id', client.id)
        .eq('status', 'active')
      
      if (subsData) setSubscriptions(subsData)

      // Fetch notifications
      const { data: notifData } = await supabase
        .from('cap_notifications')
        .select('*')
        .eq('client_id', client.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (notifData) setNotifications(notifData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/client/login')
  }

  if (authLoading || !client) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-neutral-900"></div>
      </div>
    )
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/client/dashboard">
                <Logo width={100} height={28} variant="dark" textFallback="Ceptiv" />
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link 
                  href="/client/dashboard" 
                  className="text-neutral-900 font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/client/dashboard/projects" 
                  className="text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Projects
                </Link>
                <Link 
                  href="/client/dashboard/invoices" 
                  className="text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Invoices
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-neutral-900">{client.contact_name}</p>
                  <p className="text-xs text-neutral-500">{client.company_name || client.email}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-neutral-500"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Welcome back, {client.contact_name.split(' ')[0]}!
          </h1>
          <p className="text-neutral-500">
            Here&apos;s what&apos;s happening with your projects.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-neutral-900">Your Projects</h2>
                <Link 
                  href="/start" 
                  className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </Link>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-32 bg-neutral-200 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : projects.length === 0 ? (
                <Card className="border-2 border-dashed border-neutral-300">
                  <CardContent className="p-8 text-center">
                    <FolderKanban className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-900 mb-2">No projects yet</h3>
                    <p className="text-neutral-500 mb-4">Start your first project and we&apos;ll get back to you within 24 hours.</p>
                    <Button asChild>
                      <Link href="/start">
                        Start a Project
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => {
                    const status = statusConfig[project.status] || statusConfig.pending
                    const StatusIcon = status.icon
                    
                    return (
                      <Card key={project.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-bold text-neutral-900">{project.project_name}</h3>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                  <StatusIcon className="w-3 h-3" />
                                  {status.label}
                                </span>
                              </div>
                              <p className="text-sm text-neutral-500 mb-3">
                                {project.project_type.replace('_', ' ')} • Started {new Date(project.created_at).toLocaleDateString()}
                              </p>
                              
                              {project.status === 'proposal_sent' && project.proposed_package && (
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-3">
                                  <p className="text-sm font-medium text-blue-900 mb-2">
                                    📋 Proposal Ready
                                  </p>
                                  <p className="text-sm text-blue-700 mb-3">
                                    {project.proposed_package.charAt(0).toUpperCase() + project.proposed_package.slice(1)} package: 
                                    {' '}{project.proposed_one_time_fee?.toLocaleString()} DKK + {project.proposed_monthly_fee?.toLocaleString()} kr/mo
                                  </p>
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    Review & Accept
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            <ChevronRight className="w-5 h-5 text-neutral-300" />
                          </div>
                        </CardContent>
                      </Card>
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
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-lg font-bold text-neutral-900 mb-4">Active Subscriptions</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {subscriptions.map((sub) => (
                    <Card key={sub.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-neutral-900">
                              {sub.package_name.charAt(0).toUpperCase() + sub.package_name.slice(1)}
                            </p>
                            <p className="text-xs text-neutral-500">{sub.package_type}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-500">Monthly fee</span>
                            <span className="font-medium text-neutral-900">{sub.monthly_fee} kr/mo</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-500">Features remaining</span>
                            <span className="font-medium text-neutral-900">{sub.remaining_features} of {sub.total_features}</span>
                          </div>
                          <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div 
                              className="bg-neutral-900 rounded-full h-2 transition-all"
                              style={{ width: `${(sub.used_features / sub.total_features) * 100}%` }}
                            />
                          </div>
                        </div>

                        <Button variant="outline" className="w-full mt-4" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Request Feature
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Person Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-neutral-700 rounded-full flex items-center justify-center text-xl font-bold">
                      DV
                    </div>
                    <div>
                      <p className="font-bold">Daniel Vestergaard</p>
                      <p className="text-neutral-400 text-sm">Your Contact Person</p>
                    </div>
                  </div>
                  
                  <p className="text-neutral-300 text-sm mb-4 leading-relaxed">
                    Hi {client.contact_name.split(' ')[0]}! I&apos;m your dedicated contact person. 
                    I&apos;ll be taking care of your projects and making sure everything runs smoothly. 
                    Don&apos;t hesitate to reach out!
                  </p>

                  <div className="space-y-2">
                    <a 
                      href="mailto:dv@ceptiv.net"
                      className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      dv@ceptiv.net
                    </a>
                    <a 
                      href="tel:+4581983271"
                      className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      +45 81 98 32 71
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/start">
                      <Plus className="w-4 h-4 mr-2" />
                      Start New Project
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Request Feature
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    View Invoices
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications */}
            {notifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className="p-3 bg-neutral-50 rounded-lg border border-neutral-100"
                      >
                        <p className="text-sm font-medium text-neutral-900">{notif.title}</p>
                        <p className="text-xs text-neutral-500 mt-1">{notif.message}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
