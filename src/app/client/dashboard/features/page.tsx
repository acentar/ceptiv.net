'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Sparkles,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Lightbulb,
  Target,
  ArrowRight
} from 'lucide-react'
import { useClientAuth } from '@/lib/client-auth'
import { supabase } from '@/lib/supabase'

interface Feature {
  id: string
  title: string
  description: string | null
  user_story: string | null
  priority: string | null
  status: string
  is_additional: boolean
  additional_fee: number | null
  created_at: string
}

interface Project {
  id: string
  project_name: string
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  requested: { label: 'Requested', color: 'text-amber-700', bgColor: 'bg-amber-50' },
  pending_review: { label: 'Under Review', color: 'text-blue-700', bgColor: 'bg-blue-50' },
  approved: { label: 'Approved', color: 'text-green-700', bgColor: 'bg-green-50' },
  in_progress: { label: 'In Progress', color: 'text-purple-700', bgColor: 'bg-purple-50' },
  completed: { label: 'Completed', color: 'text-green-700', bgColor: 'bg-green-50' },
  rejected: { label: 'Not Approved', color: 'text-red-700', bgColor: 'bg-red-50' },
}

const priorityOptions = [
  { value: 'low', label: 'Low', description: 'Nice to have' },
  { value: 'medium', label: 'Medium', description: 'Important but not urgent' },
  { value: 'high', label: 'High', description: 'Needed soon' },
  { value: 'critical', label: 'Critical', description: 'Blocking other work' },
]

export default function ClientFeaturesPage() {
  const { client } = useClientAuth()
  const [features, setFeatures] = useState<Feature[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showNewRequest, setShowNewRequest] = useState(false)
  
  // Form state
  const [selectedProject, setSelectedProject] = useState('')
  const [featureTitle, setFeatureTitle] = useState('')
  const [featureDescription, setFeatureDescription] = useState('')
  const [userStory, setUserStory] = useState('')
  const [priority, setPriority] = useState('medium')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (client) fetchData()
  }, [client])

  const fetchData = async () => {
    if (!client) return
    
    try {
      // Fetch projects
      const { data: projectsData } = await supabase
        .from('cap_projects')
        .select('id, project_name')
        .eq('client_id', client.id)
        .in('status', ['proposal_accepted', 'in_progress'])
      
      if (projectsData) setProjects(projectsData)

      // Fetch features
      const { data: featuresData } = await supabase
        .from('cap_features')
        .select('*')
        .eq('requested_by', client.id)
        .order('created_at', { ascending: false })
      
      if (featuresData) setFeatures(featuresData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!selectedProject || !featureTitle) return
    
    setIsSubmitting(true)
    
    try {
      await supabase
        .from('cap_features')
        .insert({
          project_id: selectedProject,
          title: featureTitle,
          description: featureDescription,
          user_story: userStory,
          priority,
          status: 'requested',
          requested_by: client?.id
        })
      
      // Reset form
      setFeatureTitle('')
      setFeatureDescription('')
      setUserStory('')
      setPriority('medium')
      setShowNewRequest(false)
      
      // Refresh features
      fetchData()
    } catch (error) {
      console.error('Error submitting feature:', error)
      alert('Failed to submit feature request')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Feature Requests</h1>
          <p className="text-neutral-500 mt-1">Request new features for your projects</p>
        </div>
        <Button onClick={() => setShowNewRequest(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New request
        </Button>
      </div>

      {/* New Feature Request Modal */}
      <AnimatePresence>
        {showNewRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewRequest(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-neutral-900">Request a Feature</h2>
                      <p className="text-sm text-neutral-500">Describe what you need</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowNewRequest(false)}
                    className="p-2 hover:bg-neutral-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Project Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Select Project</Label>
                  {projects.length === 0 ? (
                    <p className="text-sm text-neutral-500 p-4 bg-neutral-50 rounded-xl">
                      No active projects. You need an accepted project to request features.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {projects.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => setSelectedProject(project.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            selectedProject === project.id
                              ? 'border-neutral-900 bg-neutral-50'
                              : 'border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <p className="font-medium text-neutral-900">{project.project_name}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Feature Title */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Feature Title</Label>
                  <Input
                    value={featureTitle}
                    onChange={(e) => setFeatureTitle(e.target.value)}
                    placeholder="e.g., Export data to CSV"
                    className="h-12"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Description</Label>
                  <Textarea
                    value={featureDescription}
                    onChange={(e) => setFeatureDescription(e.target.value)}
                    placeholder="Describe what this feature should do..."
                    rows={3}
                  />
                </div>

                {/* User Story - Helpful Prompt */}
                <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <p className="text-sm font-medium text-neutral-700">Tip: Write a user story</p>
                  </div>
                  <p className="text-xs text-neutral-500 mb-3">
                    This helps us understand exactly what you need
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">As a</span> [type of user]
                    </p>
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">I want to</span> [perform an action]
                    </p>
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">So that</span> [I can achieve a goal]
                    </p>
                  </div>
                  <Textarea
                    value={userStory}
                    onChange={(e) => setUserStory(e.target.value)}
                    placeholder="As a manager, I want to export sales data to CSV, so that I can analyze it in Excel"
                    rows={2}
                    className="mt-4"
                  />
                </div>

                {/* Priority */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Priority</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {priorityOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPriority(option.value)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          priority === option.value
                            ? 'border-neutral-900 bg-neutral-50'
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        <p className="font-medium text-neutral-900">{option.label}</p>
                        <p className="text-xs text-neutral-500">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-200 flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewRequest(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!selectedProject || !featureTitle || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-neutral-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : features.length === 0 ? (
        <div className="bg-neutral-50 rounded-2xl p-12 border border-neutral-200 text-center">
          <Sparkles className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-900 font-medium mb-2">No feature requests yet</p>
          <p className="text-neutral-500 text-sm mb-4">
            Request new features to enhance your project
          </p>
          <Button onClick={() => setShowNewRequest(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New request
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {features.map((feature, index) => {
            const status = statusConfig[feature.status] || statusConfig.requested
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-neutral-200 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-neutral-900">{feature.title}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                        {status.label}
                      </span>
                      {feature.is_additional && feature.additional_fee && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                          +{feature.additional_fee.toLocaleString()} DKK
                        </span>
                      )}
                    </div>
                    {feature.description && (
                      <p className="text-sm text-neutral-600 mb-2">{feature.description}</p>
                    )}
                    <p className="text-xs text-neutral-400">
                      Requested {new Date(feature.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
