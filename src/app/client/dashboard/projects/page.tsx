'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ChevronRight,
  FileText,
  Sparkles
} from 'lucide-react'
import { useClientAuth } from '@/lib/client-auth'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  project_name: string
  project_type: string
  status: string
  description: string | null
  proposed_package: string | null
  proposed_one_time_fee: number | null
  proposed_monthly_fee: number | null
  proposed_features: number | null
  proposal_notes: string | null
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

export default function ClientProjectsPage() {
  const { client } = useClientAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (client) fetchProjects()
  }, [client])

  const fetchProjects = async () => {
    if (!client) return
    
    try {
      const { data } = await supabase
        .from('cap_projects')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: false })
      
      if (data) setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Projects</h1>
          <p className="text-neutral-500 mt-1">View and manage all your projects</p>
        </div>
        <Button asChild>
          <Link href="/start">
            <Plus className="w-4 h-4 mr-2" />
            New project
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-neutral-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-neutral-50 rounded-2xl p-12 border border-neutral-200 text-center">
          <p className="text-neutral-500 mb-4">No projects yet</p>
          <Button asChild>
            <Link href="/start">Start your first project</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => {
            const status = statusConfig[project.status] || statusConfig.pending
            const StatusIcon = status.icon
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/client/dashboard/projects/${project.id}`}>
                  <div className="border border-neutral-200 rounded-2xl p-6 hover:border-neutral-400 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900">{project.project_name}</h3>
                          <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-500 mb-2">
                          {project.project_type.replace('_', ' ')} • Started {new Date(project.created_at).toLocaleDateString()}
                        </p>
                        {project.description && (
                          <p className="text-sm text-neutral-600 line-clamp-2">{project.description}</p>
                        )}
                        
                        {/* Proposal section */}
                        {project.status === 'proposal_sent' && project.proposed_package && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="font-medium text-blue-900 mb-1">Proposal ready for review</p>
                            <p className="text-sm text-blue-700">
                              {project.proposed_package.charAt(0).toUpperCase() + project.proposed_package.slice(1)} package • 
                              {' '}{project.proposed_one_time_fee?.toLocaleString()} DKK + {project.proposed_monthly_fee?.toLocaleString()} kr/mo
                            </p>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-neutral-300 ml-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
