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
  Pencil,
  Trash2,
  X,
  Check,
  Clock,
  AlertCircle,
  Search
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Feature {
  id: string
  project_id: string
  title: string
  description: string | null
  user_story: string | null
  priority: string | null
  status: string
  is_additional: boolean
  additional_fee: number | null
  admin_notes: string | null
  estimated_hours: number | null
  created_at: string
  cap_projects: {
    project_name: string
    cap_clients: {
      contact_name: string
      company_name: string | null
    }
  }
}

interface Project {
  id: string
  project_name: string
}

const statusOptions = [
  { value: 'requested', label: 'Requested', color: 'bg-amber-100 text-amber-700' },
  { value: 'pending_review', label: 'Under Review', color: 'bg-blue-100 text-blue-700' },
  { value: 'approved', label: 'Approved', color: 'bg-green-100 text-green-700' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-purple-100 text-purple-700' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700' },
]

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
]

export default function AdminFeaturesPage() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  // Form state
  const [formData, setFormData] = useState({
    project_id: '',
    title: '',
    description: '',
    user_story: '',
    priority: 'medium',
    status: 'requested',
    is_additional: false,
    additional_fee: '',
    admin_notes: '',
    estimated_hours: ''
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch features with project and client info
      const { data: featuresData } = await supabase
        .from('cap_features')
        .select(`
          *,
          cap_projects (
            project_name,
            cap_clients (
              contact_name,
              company_name
            )
          )
        `)
        .order('created_at', { ascending: false })

      if (featuresData) setFeatures(featuresData)

      // Fetch projects for dropdown
      const { data: projectsData } = await supabase
        .from('cap_projects')
        .select('id, project_name')
        .in('status', ['proposal_accepted', 'in_progress'])
        .order('project_name')

      if (projectsData) setProjects(projectsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const openCreateModal = () => {
    setEditingFeature(null)
    setFormData({
      project_id: '',
      title: '',
      description: '',
      user_story: '',
      priority: 'medium',
      status: 'requested',
      is_additional: false,
      additional_fee: '',
      admin_notes: '',
      estimated_hours: ''
    })
    setShowModal(true)
  }

  const openEditModal = (feature: Feature) => {
    setEditingFeature(feature)
    setFormData({
      project_id: feature.project_id,
      title: feature.title,
      description: feature.description || '',
      user_story: feature.user_story || '',
      priority: feature.priority || 'medium',
      status: feature.status,
      is_additional: feature.is_additional,
      additional_fee: feature.additional_fee?.toString() || '',
      admin_notes: feature.admin_notes || '',
      estimated_hours: feature.estimated_hours?.toString() || ''
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!formData.project_id || !formData.title) return

    setIsSaving(true)

    try {
      const data = {
        project_id: formData.project_id,
        title: formData.title,
        description: formData.description || null,
        user_story: formData.user_story || null,
        priority: formData.priority,
        status: formData.status,
        is_additional: formData.is_additional,
        additional_fee: formData.additional_fee ? parseFloat(formData.additional_fee) : null,
        admin_notes: formData.admin_notes || null,
        estimated_hours: formData.estimated_hours ? parseInt(formData.estimated_hours) : null,
        created_by_admin: true
      }

      if (editingFeature) {
        await supabase
          .from('cap_features')
          .update(data)
          .eq('id', editingFeature.id)
      } else {
        await supabase
          .from('cap_features')
          .insert(data)
      }

      await fetchData()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving feature:', error)
      alert('Failed to save feature')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (featureId: string) => {
    if (!confirm('Are you sure you want to delete this feature?')) return

    try {
      await supabase
        .from('cap_features')
        .delete()
        .eq('id', featureId)

      await fetchData()
    } catch (error) {
      console.error('Error deleting feature:', error)
      alert('Failed to delete feature')
    }
  }

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.cap_projects?.project_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || feature.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Feature Requests</h1>
          <p className="text-neutral-500">Manage all feature requests across projects</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Search features..."
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
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Features List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-neutral-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredFeatures.length === 0 ? (
        <div className="bg-neutral-50 rounded-xl p-12 text-center border border-neutral-200">
          <Sparkles className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500">No feature requests found</p>
        </div>
      ) : (
        <div className="border border-neutral-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Feature</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Project</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Priority</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase px-6 py-4">Fee</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredFeatures.map((feature) => {
                const statusOpt = statusOptions.find(s => s.value === feature.status)
                return (
                  <tr key={feature.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900">{feature.title}</p>
                      {feature.description && (
                        <p className="text-sm text-neutral-500 line-clamp-1">{feature.description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-neutral-900">{feature.cap_projects?.project_name}</p>
                      <p className="text-xs text-neutral-500">
                        {feature.cap_projects?.cap_clients?.company_name || feature.cap_projects?.cap_clients?.contact_name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-neutral-600 capitalize">{feature.priority}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusOpt?.color}`}>
                        {statusOpt?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {feature.is_additional && feature.additional_fee ? (
                        <span className="text-sm font-medium text-neutral-900">
                          {feature.additional_fee.toLocaleString()} DKK
                        </span>
                      ) : (
                        <span className="text-sm text-neutral-400">Included</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(feature)}
                          className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(feature.id)}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {editingFeature ? 'Edit Feature' : 'Add Feature'}
                  </h2>
                  <button onClick={() => setShowModal(false)} className="p-2 hover:bg-neutral-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <Label>Project *</Label>
                  <select
                    value={formData.project_id}
                    onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 border border-neutral-200 rounded-lg"
                  >
                    <option value="">Select project...</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.project_name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Feature title"
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>User Story</Label>
                  <Textarea
                    value={formData.user_story}
                    onChange={(e) => setFormData({ ...formData, user_story: e.target.value })}
                    placeholder="As a [user], I want to [action], so that [benefit]"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Priority</Label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full mt-1.5 px-3 py-2 border border-neutral-200 rounded-lg"
                    >
                      {priorityOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full mt-1.5 px-3 py-2 border border-neutral-200 rounded-lg"
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Estimated Hours</Label>
                    <Input
                      type="number"
                      value={formData.estimated_hours}
                      onChange={(e) => setFormData({ ...formData, estimated_hours: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 mt-6">
                      <input
                        type="checkbox"
                        checked={formData.is_additional}
                        onChange={(e) => setFormData({ ...formData, is_additional: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Additional feature (not in package)</span>
                    </label>
                  </div>
                </div>

                {formData.is_additional && (
                  <div>
                    <Label>Additional Fee (DKK)</Label>
                    <Input
                      type="number"
                      value={formData.additional_fee}
                      onChange={(e) => setFormData({ ...formData, additional_fee: e.target.value })}
                      placeholder="2500"
                    />
                  </div>
                )}

                <div>
                  <Label>Admin Notes</Label>
                  <Textarea
                    value={formData.admin_notes}
                    onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                    placeholder="Internal notes..."
                    rows={2}
                  />
                </div>
              </div>

              <div className="p-6 border-t border-neutral-200 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving || !formData.project_id || !formData.title}>
                  {isSaving ? 'Saving...' : editingFeature ? 'Update Feature' : 'Create Feature'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
