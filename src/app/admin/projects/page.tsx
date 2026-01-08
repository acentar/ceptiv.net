'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  FolderKanban, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Send,
  User,
  Mail,
  Building2,
  FileText,
  X,
  Sparkles
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  client_id: string
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
  created_at: string
  cap_clients: {
    email: string
    contact_name: string
    company_name: string | null
    phone: string | null
  }
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending Review', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  proposal_sent: { label: 'Proposal Sent', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  proposal_accepted: { label: 'Accepted', color: 'text-green-700', bgColor: 'bg-green-100' },
  in_progress: { label: 'In Progress', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  completed: { label: 'Completed', color: 'text-green-700', bgColor: 'bg-green-100' },
  on_hold: { label: 'On Hold', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-100' },
}

const packageOptions = [
  { value: 'small', label: 'Small', features: 12, integrations: 1, oneTime: 18000, monthly: 600 },
  { value: 'medium', label: 'Medium', features: 24, integrations: 2, oneTime: 36000, monthly: 900 },
  { value: 'large', label: 'Large', features: 36, integrations: 3, oneTime: 54000, monthly: 1200 },
]

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showProposalModal, setShowProposalModal] = useState(false)
  
  // Proposal form state
  const [selectedPackage, setSelectedPackage] = useState('')
  const [customOneTime, setCustomOneTime] = useState('')
  const [customMonthly, setCustomMonthly] = useState('')
  const [customFeatures, setCustomFeatures] = useState('')
  const [customIntegrations, setCustomIntegrations] = useState('')
  const [proposalNotes, setProposalNotes] = useState('')
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('cap_projects')
        .select(`
          *,
          cap_clients (
            email,
            contact_name,
            company_name,
            phone
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openProposalModal = (project: Project) => {
    setSelectedProject(project)
    setSelectedPackage('')
    setCustomOneTime('')
    setCustomMonthly('')
    setCustomFeatures('')
    setCustomIntegrations('')
    setProposalNotes('')
    setShowProposalModal(true)
  }

  const handlePackageSelect = (packageValue: string) => {
    setSelectedPackage(packageValue)
    const pkg = packageOptions.find(p => p.value === packageValue)
    if (pkg) {
      setCustomOneTime(pkg.oneTime.toString())
      setCustomMonthly(pkg.monthly.toString())
      setCustomFeatures(pkg.features.toString())
      setCustomIntegrations(pkg.integrations.toString())
    }
  }

  const sendProposal = async () => {
    if (!selectedProject) return
    
    setIsSending(true)
    
    try {
      // Update project with proposal
      const { error: projectError } = await supabase
        .from('cap_projects')
        .update({
          proposed_package: selectedPackage || 'custom',
          proposed_one_time_fee: parseFloat(customOneTime),
          proposed_monthly_fee: parseFloat(customMonthly),
          proposed_features: parseInt(customFeatures),
          proposed_integrations: parseInt(customIntegrations),
          proposal_notes: proposalNotes,
          proposal_sent_at: new Date().toISOString(),
          status: 'proposal_sent'
        })
        .eq('id', selectedProject.id)

      if (projectError) throw projectError

      // Create notification for client
      await supabase
        .from('cap_notifications')
        .insert({
          client_id: selectedProject.client_id,
          title: 'Proposal Ready!',
          message: `Your proposal for "${selectedProject.project_name}" is ready for review.`,
          type: 'proposal',
          related_project_id: selectedProject.id
        })

      // Refresh projects
      await fetchProjects()
      setShowProposalModal(false)
      
    } catch (error) {
      console.error('Error sending proposal:', error)
      alert('Failed to send proposal. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const pendingCount = projects.filter(p => p.status === 'pending').length

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Client Projects</h1>
          <p className="text-neutral-500">Manage project requests and proposals</p>
        </div>
        {pendingCount > 0 && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium">
            {pendingCount} pending review
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = projects.filter(p => p.status === key).length
          if (count === 0) return null
          return (
            <span 
              key={key}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}
            >
              {config.label} ({count})
            </span>
          )
        })}
      </div>

      {/* Projects List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-neutral-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="p-12 text-center">
            <FolderKanban className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-500">No projects yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => {
            const status = statusConfig[project.status] || statusConfig.pending
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-neutral-900">{project.project_name}</h3>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                            {status.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {project.cap_clients?.contact_name}
                          </span>
                          {project.cap_clients?.company_name && (
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {project.cap_clients.company_name}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {project.cap_clients?.email}
                          </span>
                        </div>

                        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-neutral-400">
                          <span>{project.project_type.replace('_', ' ')}</span>
                          <span>•</span>
                          <span>{project.is_new_build ? 'New build' : 'Existing system'}</span>
                          <span>•</span>
                          <span>Timeline: {project.timeline || 'Not specified'}</span>
                          <span>•</span>
                          <span>{new Date(project.created_at).toLocaleDateString()}</span>
                        </div>

                        {project.status === 'proposal_sent' && project.proposed_package && (
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                            <span className="font-medium text-blue-900">Proposal sent: </span>
                            <span className="text-blue-700">
                              {project.proposed_package} package - {project.proposed_one_time_fee?.toLocaleString()} DKK + {project.proposed_monthly_fee?.toLocaleString()} kr/mo
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {project.status === 'pending' && (
                          <Button 
                            onClick={() => openProposalModal(project)}
                            className="bg-neutral-900 hover:bg-neutral-800"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send Proposal
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Proposal Modal */}
      {showProposalModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Send Proposal</h2>
                  <p className="text-neutral-500">{selectedProject.project_name}</p>
                </div>
                <button 
                  onClick={() => setShowProposalModal(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Client Info */}
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-500 mb-1">Client</p>
                <p className="font-medium text-neutral-900">
                  {selectedProject.cap_clients?.contact_name}
                  {selectedProject.cap_clients?.company_name && ` (${selectedProject.cap_clients.company_name})`}
                </p>
                <p className="text-sm text-neutral-600">{selectedProject.cap_clients?.email}</p>
              </div>

              {/* Package Selection */}
              <div>
                <Label className="text-base font-medium mb-3 block">Select Package</Label>
                <div className="grid grid-cols-3 gap-3">
                  {packageOptions.map((pkg) => (
                    <button
                      key={pkg.value}
                      onClick={() => handlePackageSelect(pkg.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedPackage === pkg.value
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <p className="font-bold text-neutral-900">{pkg.label}</p>
                      <p className="text-sm text-neutral-500">{pkg.features} features</p>
                      <p className="text-sm font-medium text-neutral-700 mt-2">
                        {pkg.oneTime.toLocaleString()} DKK
                      </p>
                      <p className="text-xs text-neutral-500">+ {pkg.monthly} kr/mo</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>One-time Fee (DKK)</Label>
                  <Input
                    type="number"
                    value={customOneTime}
                    onChange={(e) => setCustomOneTime(e.target.value)}
                    placeholder="18000"
                  />
                </div>
                <div>
                  <Label>Monthly Fee (DKK)</Label>
                  <Input
                    type="number"
                    value={customMonthly}
                    onChange={(e) => setCustomMonthly(e.target.value)}
                    placeholder="600"
                  />
                </div>
                <div>
                  <Label>Features Included</Label>
                  <Input
                    type="number"
                    value={customFeatures}
                    onChange={(e) => setCustomFeatures(e.target.value)}
                    placeholder="12"
                  />
                </div>
                <div>
                  <Label>Integrations Included</Label>
                  <Input
                    type="number"
                    value={customIntegrations}
                    onChange={(e) => setCustomIntegrations(e.target.value)}
                    placeholder="1"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label>Proposal Notes (visible to client)</Label>
                <Textarea
                  value={proposalNotes}
                  onChange={(e) => setProposalNotes(e.target.value)}
                  placeholder="Add any notes about the proposal..."
                  rows={3}
                />
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowProposalModal(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={sendProposal}
                disabled={!customOneTime || !customMonthly || !customFeatures || isSending}
                className="bg-neutral-900 hover:bg-neutral-800"
              >
                {isSending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Proposal
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
