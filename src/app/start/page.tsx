'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  ArrowLeft,
  Zap,
  Code,
  Smartphone,
  Brain,
  CreditCard,
  Check,
  Clock,
  Rocket,
  Calendar,
  Sparkles,
  Mail,
  Phone,
  Building2,
  User,
  CheckCircle2,
  Plus,
  Layers,
  AlertCircle,
  Link2,
  MessageSquare,
  Send,
  Loader2,
  Bot,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Globe,
  Package
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { generatePin, hashPin } from '@/lib/client-auth'

type ProjectApproach = 'new' | 'existing' | null
type ProjectType = 'system' | 'website' | 'mobile' | 'ai' | 'integration'
type PackageSize = 'small' | 'medium' | 'large' | 'custom' | null

interface ProjectTypeOption {
  id: ProjectType
  icon: React.ElementType
  title: string
  description: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const projectTypes: ProjectTypeOption[] = [
  { id: 'system', icon: Zap, title: 'Backend Application', description: 'Admin panels & internal tools' },
  { id: 'website', icon: Code, title: 'Website', description: 'Public-facing site' },
  { id: 'mobile', icon: Smartphone, title: 'Mobile App', description: 'iOS & Android' },
  { id: 'ai', icon: Brain, title: 'AI Integration', description: 'Intelligent automation' },
  { id: 'integration', icon: CreditCard, title: 'Integration', description: 'Connect systems & APIs' }
]

const aiCapabilities = [
  'Generate content (text, images)',
  'Analyze data and provide insights',
  'Automate customer support',
  'Process documents',
  'Voice/speech processing',
  'Custom AI solution',
  'Not sure - advise me'
]

// Enhanced integration options with categories
const integrationCategories = [
  {
    name: 'Payment',
    options: ['Stripe', 'QuickPay', 'MobilePay', 'Nets Easy', 'PayPal']
  },
  {
    name: 'Accounting',
    options: ['Dinero', 'e-conomic', 'Billy', 'Xero', 'QuickBooks']
  },
  {
    name: 'Shipping',
    options: ['Shipmondo', 'PostNord', 'GLS', 'DAO', 'Bring']
  },
  {
    name: 'Payroll & HR',
    options: ['DataLøn', 'Zenegy', 'Salary', 'Planday']
  },
  {
    name: 'CRM & Marketing',
    options: ['HubSpot', 'Pipedrive', 'Mailchimp', 'ActiveCampaign', 'Klaviyo']
  },
  {
    name: 'E-signature',
    options: ['Penneo', 'GetAccept', 'DocuSign', 'Signaturit']
  },
  {
    name: 'SMS & Communication',
    options: ['Twilio', 'GatewayAPI', 'MessageBird', 'Sinch']
  },
  {
    name: 'Workspace',
    options: ['Microsoft 365', 'Google Workspace', 'Slack', 'Teams']
  },
  {
    name: 'AI Services',
    options: ['OpenAI/GPT', 'x.ai Grok', 'Claude', 'Gemini']
  }
]

const integrationsNeeded = [
  'Microsoft 365',
  'Google Workspace',
  'Salesforce',
  'HubSpot',
  'Custom ERP',
  'Excel/Sheets',
  'Existing Database',
  'Other API'
]

const timelineOptions = [
  { id: 'asap', icon: Rocket, label: 'ASAP', description: 'Urgent need' },
  { id: '1-2months', icon: Sparkles, label: '1-2 Months', description: 'Standard timeline' },
  { id: '3-4months', icon: Calendar, label: '3-4 Months', description: 'Relaxed pace' },
  { id: 'flexible', icon: Clock, label: 'Flexible', description: 'No rush' }
]

// Pricing packages based on current pricing model
const webPackages = [
  {
    id: 'small',
    name: 'Small',
    features: 12,
    integrations: 1,
    oneTime: '18.000',
    monthly: '600',
    description: 'Perfect for MVPs and simple applications'
  },
  {
    id: 'medium',
    name: 'Medium',
    features: 24,
    integrations: 2,
    oneTime: '36.000',
    monthly: '900',
    description: 'Great for growing businesses'
  },
  {
    id: 'large',
    name: 'Large',
    features: 36,
    integrations: 3,
    oneTime: '54.000',
    monthly: '1.200',
    description: 'Full-featured enterprise solutions'
  }
]

const mobilePackages = [
  {
    id: 'small',
    name: 'Small',
    features: 12,
    integrations: 1,
    oneTime: '28.000',
    monthly: '1.200',
    description: 'Simple mobile app'
  },
  {
    id: 'medium',
    name: 'Medium',
    features: 24,
    integrations: 2,
    oneTime: '48.000',
    monthly: '1.800',
    description: 'Feature-rich app'
  },
  {
    id: 'large',
    name: 'Large',
    features: 36,
    integrations: 3,
    oneTime: '72.000',
    monthly: '2.400',
    description: 'Complex mobile solution'
  }
]

export default function StartProjectPage() {
  const router = useRouter()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  // Grok integration status
  const [isGrokEnabled, setIsGrokEnabled] = useState<boolean | null>(null)
  
  // Step state - dynamically calculated based on Grok status
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = isGrokEnabled === false ? 6 : 7 // 6 steps without AI review, 7 with
  
  // Step 1: Project approach
  const [projectApproach, setProjectApproach] = useState<ProjectApproach>(null)
  const [understandsApproach, setUnderstandsApproach] = useState(false)
  
  // Step 2: Project types
  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([])
  
  // Step 3: Project details
  const [projectDescription, setProjectDescription] = useState('')
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])
  const [selectedAiCapabilities, setSelectedAiCapabilities] = useState<string[]>([])
  const [selectedIntegrationTypes, setSelectedIntegrationTypes] = useState<string[]>([])
  const [otherApiDetails, setOtherApiDetails] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  
  // Step 4: Timeline & Package
  const [timeline, setTimeline] = useState('')
  const [packageSize, setPackageSize] = useState<PackageSize>(null)
  
  // Step 5: AI Review (only if Grok is enabled)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [hasStartedAiReview, setHasStartedAiReview] = useState(false)
  
  // Step 5/6: Contact info (step 5 if no AI, step 6 if AI enabled)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  
  // Step 6/7: Review
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get appropriate packages based on project type
  const isMobileProject = selectedTypes.includes('mobile')
  const packages = isMobileProject ? mobilePackages : webPackages

  // Check if Grok is enabled on mount
  useEffect(() => {
    const checkGrokStatus = async () => {
      try {
        const { data } = await supabase
          .from('cap_settings')
          .select('value')
          .eq('key', 'grok_enabled')
          .single()
        
        setIsGrokEnabled(data?.value === 'true')
      } catch {
        // If we can't read the setting, assume Grok is disabled
        setIsGrokEnabled(false)
      }
    }
    checkGrokStatus()
  }, [])

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  // Start AI analysis when entering step 5 (only if Grok is enabled)
  useEffect(() => {
    if (isGrokEnabled && currentStep === 5 && !hasStartedAiReview) {
      startAiAnalysis()
    }
  }, [currentStep, hasStartedAiReview, isGrokEnabled])

  const toggleProjectType = (type: ProjectType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const toggleArrayItem = (
    item: string, 
    array: string[], 
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setArray(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    )
  }

  // Get the actual step number accounting for Grok being disabled
  const getActualStep = (step: number) => {
    if (isGrokEnabled === false && step >= 5) {
      // If Grok is disabled, steps 5+ shift down by 1 (no AI review step)
      return step + 1
    }
    return step
  }

  // Get the display step for a given actual step
  const getDisplayStep = (actualStep: number) => {
    if (isGrokEnabled === false && actualStep >= 6) {
      // If Grok is disabled, actual steps 6+ display as one less
      return actualStep - 1
    }
    return actualStep
  }

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return projectApproach !== null
      case 2:
        if (projectApproach === 'existing') {
          return understandsApproach && selectedTypes.length > 0
        }
        return selectedTypes.length > 0
      case 3:
        return projectDescription.length > 10
      case 4:
        return timeline !== '' && packageSize !== null
      case 5:
        // If Grok is disabled, step 5 is Contact Info
        if (isGrokEnabled === false) {
          return name !== '' && email !== ''
        }
        // If Grok is enabled, step 5 is AI Review
        return aiAnalysis !== null
      case 6:
        // If Grok is disabled, step 6 is Review (always can proceed)
        if (isGrokEnabled === false) {
          return true
        }
        // If Grok is enabled, step 6 is Contact Info
        return name !== '' && email !== ''
      case 7:
        // Only reached if Grok is enabled - this is Review
        return true
      default:
        return true
    }
  }

  const startAiAnalysis = async () => {
    setHasStartedAiReview(true)
    setIsAiLoading(true)

    const projectContext = {
      projectType: selectedTypes,
      description: projectDescription,
      integrations: selectedIntegrations,
      aiCapabilities: selectedAiCapabilities,
      integrationTypes: selectedIntegrationTypes,
      otherApiDetails,
      teamSize,
      packageSize: packageSize || 'medium'
    }

    const initialMessage = `Please analyze this project and provide your recommendations:

**Project Description:**
${projectDescription}

**Project Types:** ${selectedTypes.map(t => projectTypes.find(pt => pt.id === t)?.title).join(', ')}

${selectedIntegrations.length > 0 ? `**Systems to Connect:** ${selectedIntegrations.join(', ')}` : ''}
${selectedIntegrationTypes.length > 0 ? `**Integrations Needed:** ${selectedIntegrationTypes.join(', ')}` : ''}
${otherApiDetails ? `**Custom API Details:** ${otherApiDetails}` : ''}
${selectedAiCapabilities.length > 0 ? `**AI Requirements:** ${selectedAiCapabilities.join(', ')}` : ''}
${teamSize ? `**Expected Users:** ${teamSize}` : ''}

I'm thinking this is a **${packageSize?.toUpperCase() || 'Medium'}** sized project. What do you think?`

    try {
      const response = await fetch('/api/grok/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: initialMessage }],
          projectContext
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        // Use the error message from the API if available
        throw new Error(data.error || 'Failed to get AI response')
      }

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }
      
      setChatMessages([aiMessage])
      setAiAnalysis(data.message)
    } catch (error) {
      console.error('AI analysis error:', error)
      // Provide a helpful fallback analysis
      const selectedPackage = packages.find(p => p.id === packageSize)
      const fallbackMessage = `### Project Summary

Thank you for sharing your project details! Here's a summary of what you're looking to build:

**What you need:**
${projectDescription}

**Project Type:** ${selectedTypes.map(t => projectTypes.find(pt => pt.id === t)?.title).join(', ')}
${selectedIntegrationTypes.length > 0 ? `\n**Integrations:** ${selectedIntegrationTypes.join(', ')}` : ''}
${selectedAiCapabilities.length > 0 ? `\n**AI Features:** ${selectedAiCapabilities.join(', ')}` : ''}
${teamSize ? `\n**Users:** ${teamSize}` : ''}

**Your Selected Package:** ${selectedPackage?.name || 'Custom'}
${selectedPackage ? `- ${selectedPackage.features} features included
- ${selectedPackage.integrations} integration${selectedPackage.integrations > 1 ? 's' : ''}
- One-time: ${selectedPackage.oneTime} DKK
- Monthly: ${selectedPackage.monthly} DKK/month` : '- We\'ll create a custom quote for you'}

### Next Steps
Our team will review your project in detail and prepare a personalized proposal. You can continue to submit your request, or add any additional notes below.

*💡 Tip: The more details you provide, the more accurate our proposal will be!*`

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: fallbackMessage,
        timestamp: new Date()
      }
      setChatMessages([aiMessage])
      setAiAnalysis(fallbackMessage)
    } finally {
      setIsAiLoading(false)
    }
  }

  const sendChatMessage = async () => {
    if (!chatInput.trim() || isAiLoading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    const userInput = chatInput
    setChatInput('')
    setIsAiLoading(true)

    const projectContext = {
      projectType: selectedTypes,
      description: projectDescription,
      integrations: selectedIntegrations,
      aiCapabilities: selectedAiCapabilities,
      integrationTypes: selectedIntegrationTypes,
      otherApiDetails,
      teamSize,
      packageSize: packageSize || 'medium'
    }

    try {
      // Build conversation history
      const apiMessages = chatMessages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      }))
      apiMessages.push({ role: 'user', content: userInput })

      const response = await fetch('/api/grok/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          projectContext
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI response')
      }

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, aiMessage])
      setAiAnalysis(data.message) // Update analysis with latest
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `Thanks for the additional information! I've noted: "${userInput}"

This will be included in your project request. Our team will take this into account when preparing your proposal.

Is there anything else you'd like to add?`,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, errorMessage])
      // Update the project description to include user notes
      setAdditionalInfo(prev => prev ? `${prev}\n\nUser note: ${userInput}` : `User note: ${userInput}`)
    } finally {
      setIsAiLoading(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const pin = generatePin()
      const hashedPin = hashPin(pin)
      
      const { data: existingClient } = await supabase
        .from('cap_clients')
        .select('id')
        .eq('email', email.toLowerCase())
        .single()
      
      let clientId: string
      
      if (existingClient) {
        clientId = existingClient.id
      } else {
        const { data: newClient, error: clientError } = await supabase
          .from('cap_clients')
          .insert({
            email: email.toLowerCase(),
            pin_code: hashedPin,
            company_name: company || null,
            contact_name: name,
            phone: phone || null
          })
          .select('id')
          .single()
        
        if (clientError) {
          console.error('Error creating client:', clientError)
          throw new Error('Failed to create account')
        }
        
        clientId = newClient.id
      }
      
      const projectTypeMap: Record<ProjectType, string> = {
        system: 'backend_application',
        website: 'website',
        mobile: 'mobile_app',
        ai: 'ai_integration',
        integration: 'integration'
      }
      
      const projectName = company 
        ? `${company} - ${selectedTypes.map(t => projectTypes.find(pt => pt.id === t)?.title).join(' & ')}`
        : `${name}'s Project`

      // Build comprehensive description including AI analysis
      const fullDescription = [
        projectDescription,
        '',
        '--- AI Analysis ---',
        aiAnalysis || 'No AI analysis available',
        '',
        additionalInfo ? `--- Additional Info ---\n${additionalInfo}` : ''
      ].filter(Boolean).join('\n')

      const selectedPackage = packages.find(p => p.id === packageSize)
      
      const { error: projectError } = await supabase
        .from('cap_projects')
        .insert({
          client_id: clientId,
          project_name: projectName,
          project_type: projectTypeMap[selectedTypes[0]] || 'backend_application',
          description: fullDescription,
          is_new_build: projectApproach === 'new',
          timeline: timelineOptions.find(t => t.id === timeline)?.label || timeline,
          budget_range: selectedPackage 
            ? `Package: ${selectedPackage.name} (${selectedPackage.oneTime} DKK + ${selectedPackage.monthly} DKK/mo)`
            : 'Custom quote requested',
          status: 'pending',
          contact_person_name: 'Daniel Vestergaard',
          contact_person_email: 'dv@ceptiv.net'
        })
      
      if (projectError) {
        console.error('Error creating project:', projectError)
        throw new Error('Failed to create project')
      }
      
      const clientData = {
        id: clientId,
        email: email.toLowerCase(),
        company_name: company || null,
        contact_name: name,
        phone: phone || null,
        created_at: new Date().toISOString()
      }
      localStorage.setItem('ceptiv_client', JSON.stringify(clientData))
      
      router.push(`/client/dashboard?welcome=true&pin=${pin}`)
      
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your project. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Progress Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              ← Back to Ceptiv
            </Link>
            <span className="text-neutral-600">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neutral-900 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: New or Existing */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                What's the situation?
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                This helps us understand how we can best help you.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                  className={`cursor-pointer transition-all duration-200 ${
                    projectApproach === 'new'
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                  onClick={() => setProjectApproach('new')}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        projectApproach === 'new' ? 'bg-white/20' : 'bg-neutral-100'
                      }`}>
                        <Plus className={`w-7 h-7 ${projectApproach === 'new' ? 'text-white' : 'text-neutral-900'}`} />
                      </div>
                      {projectApproach === 'new' && (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <h3 className="font-bold text-xl mb-2">Build from scratch</h3>
                    <p className={projectApproach === 'new' ? 'text-neutral-300' : 'text-neutral-600'}>
                      I need a completely new digital solution built from the ground up.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all duration-200 ${
                    projectApproach === 'existing'
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                  onClick={() => setProjectApproach('existing')}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        projectApproach === 'existing' ? 'bg-white/20' : 'bg-neutral-100'
                      }`}>
                        <Layers className={`w-7 h-7 ${projectApproach === 'existing' ? 'text-white' : 'text-neutral-900'}`} />
                      </div>
                      {projectApproach === 'existing' && (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <h3 className="font-bold text-xl mb-2">Add to existing system</h3>
                    <p className={projectApproach === 'existing' ? 'text-neutral-300' : 'text-neutral-600'}>
                      I have an existing system and need new features or functionality.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Step 2: Project Types (with existing system explanation) */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {projectApproach === 'existing' && !understandsApproach && (
                <>
                  <div className="flex items-center mb-6">
                    <AlertCircle className="w-8 h-8 text-neutral-600 mr-3" />
                    <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900">
                      Important: How we work
                    </h1>
                  </div>
                  
                  <Card className="mb-8 border-neutral-300">
                    <CardContent className="p-8">
                      <h2 className="text-xl font-bold text-neutral-900 mb-4">
                        We don't work on existing codebases.
                      </h2>
                      <p className="text-neutral-600 mb-6">
                        Here's why: Working with code we didn't build is expensive and unpredictable. 
                        Every project involves understanding unfamiliar structures, dealing with legacy decisions, 
                        and navigating undocumented quirks.
                      </p>
                      
                      <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                        <div className="flex items-center mb-4">
                          <Link2 className="w-6 h-6 text-neutral-900 mr-3" />
                          <h3 className="font-bold text-neutral-900">What we CAN do:</h3>
                        </div>
                        <p className="text-neutral-600 mb-4">
                          We build a <strong>separate, standalone system</strong> with a fully documented API 
                          that your existing solution can integrate with.
                        </p>
                        <ul className="space-y-2 text-neutral-600">
                          <li className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-neutral-900" />
                            Clean, new codebase that we maintain
                          </li>
                          <li className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-neutral-900" />
                            Fully documented REST or GraphQL API
                          </li>
                          <li className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-neutral-900" />
                            Same great pricing as our other projects
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <button
                    type="button"
                    onClick={() => setUnderstandsApproach(true)}
                    className="flex items-center space-x-3 px-6 py-4 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                    <span className="font-medium">
                      I understand. Let's build a separate system with API connectivity.
                    </span>
                  </button>
                </>
              )}

              {(projectApproach === 'new' || understandsApproach) && (
                <>
                  <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                    What are we building together?
                  </h1>
                  <p className="text-lg text-neutral-600 mb-8">
                    Select all that apply. We often combine multiple solutions into one system.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectTypes.map((type) => (
                      <Card
                        key={type.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedTypes.includes(type.id)
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                        onClick={() => toggleProjectType(type.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <type.icon className={`w-8 h-8 ${selectedTypes.includes(type.id) ? 'text-white' : 'text-neutral-900'}`} />
                            {selectedTypes.includes(type.id) && (
                              <CheckCircle2 className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <h3 className="font-bold text-lg mb-1">{type.title}</h3>
                          <p className={selectedTypes.includes(type.id) ? 'text-neutral-300' : 'text-neutral-600'}>
                            {type.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Step 3: Project Details with Enhanced Integrations */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Tell us about your project
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                The more details you share, the better our AI can help you refine your project.
              </p>

              <div className="space-y-8">
                <div>
                  <Label htmlFor="description" className="text-base font-medium">
                    Describe what you want to build
                  </Label>
                  <Textarea
                    id="description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Tell us about the problem you're trying to solve, what manual processes you want to automate, or what kind of system you need..."
                    className="mt-2 min-h-[150px]"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Any existing systems this needs to connect to?
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {integrationsNeeded.map((system) => (
                      <button
                        key={system}
                        type="button"
                        onClick={() => toggleArrayItem(system, selectedIntegrations, setSelectedIntegrations)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedIntegrations.includes(system)
                            ? 'bg-neutral-900 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {system}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Integration Categories - Expandable */}
                {selectedTypes.includes('integration') && (
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      What integrations do you need?
                    </Label>
                    <div className="space-y-3">
                      {integrationCategories.map((category) => (
                        <div key={category.name} className="border border-neutral-200 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                            className="w-full px-4 py-3 flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 transition-colors"
                          >
                            <span className="font-medium text-neutral-900">{category.name}</span>
                            <div className="flex items-center gap-2">
                              {selectedIntegrationTypes.filter(i => category.options.includes(i)).length > 0 && (
                                <span className="text-xs bg-neutral-900 text-white px-2 py-1 rounded-full">
                                  {selectedIntegrationTypes.filter(i => category.options.includes(i)).length} selected
                                </span>
                              )}
                              {expandedCategory === category.name ? (
                                <ChevronUp className="w-5 h-5 text-neutral-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-neutral-500" />
                              )}
                            </div>
                          </button>
                          <AnimatePresence>
                            {expandedCategory === category.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 flex flex-wrap gap-2 bg-white">
                                  {category.options.map((option) => (
                                    <button
                                      key={option}
                                      type="button"
                                      onClick={() => toggleArrayItem(option, selectedIntegrationTypes, setSelectedIntegrationTypes)}
                                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                        selectedIntegrationTypes.includes(option)
                                          ? 'bg-neutral-900 text-white'
                                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                      
                      {/* Other API option */}
                      <div className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => toggleArrayItem('Other API', selectedIntegrationTypes, setSelectedIntegrationTypes)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                              selectedIntegrationTypes.includes('Other API')
                                ? 'bg-neutral-900 text-white'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                          >
                            Other API
                          </button>
                          <span className="text-sm text-neutral-500">Not in the list?</span>
                        </div>
                        {selectedIntegrationTypes.includes('Other API') && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <Textarea
                              value={otherApiDetails}
                              onChange={(e) => setOtherApiDetails(e.target.value)}
                              placeholder="Describe the API or service you need to integrate with..."
                              className="min-h-[80px]"
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTypes.includes('ai') && (
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      What would you like AI to do?
                    </Label>
                    <div className="flex flex-wrap gap-3">
                      {aiCapabilities.map((capability) => (
                        <button
                          key={capability}
                          type="button"
                          onClick={() => toggleArrayItem(capability, selectedAiCapabilities, setSelectedAiCapabilities)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedAiCapabilities.includes(capability)
                              ? 'bg-neutral-900 text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {capability}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-base font-medium mb-4 block">
                    How many people will use this system?
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {['1-5', '6-20', '21-50', '50+'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setTeamSize(size)}
                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                          teamSize === size
                            ? 'bg-neutral-900 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {size} users
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Timeline & Package Selection */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Timeline & Project Size
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                Select your timeline and estimated project size. Our AI will help refine this in the next step.
              </p>

              <div className="space-y-12">
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    When do you need this ready?
                  </Label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {timelineOptions.map((option) => (
                      <Card
                        key={option.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          timeline === option.id
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                        onClick={() => setTimeline(option.id)}
                      >
                        <CardContent className="p-6 text-center">
                          <option.icon className={`w-8 h-8 mx-auto mb-3 ${timeline === option.id ? 'text-white' : 'text-neutral-900'}`} />
                          <h3 className="font-bold mb-1">{option.label}</h3>
                          <p className={`text-sm ${timeline === option.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            {option.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-2 block">
                    How big do you think your project is?
                  </Label>
                  <p className="text-sm text-neutral-500 mb-4">
                    {isMobileProject ? 'Native mobile app pricing' : 'Web project pricing'} • Don't worry, our AI will help you refine this
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {packages.map((pkg) => (
                      <Card
                        key={pkg.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          packageSize === pkg.id
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                        onClick={() => setPackageSize(pkg.id as PackageSize)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <Package className={`w-6 h-6 ${packageSize === pkg.id ? 'text-white' : 'text-neutral-900'}`} />
                            {packageSize === pkg.id && (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <h3 className="font-bold text-xl mb-1">{pkg.name}</h3>
                          <p className={`text-sm mb-4 ${packageSize === pkg.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            {pkg.description}
                          </p>
                          <div className={`space-y-1 text-sm ${packageSize === pkg.id ? 'text-neutral-300' : 'text-neutral-600'}`}>
                            <p>✓ {pkg.features} features included</p>
                            <p>✓ {pkg.integrations} integration{pkg.integrations > 1 ? 's' : ''}</p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-neutral-200/20">
                            <p className={`font-bold ${packageSize === pkg.id ? 'text-white' : 'text-neutral-900'}`}>
                              {pkg.oneTime} DKK
                            </p>
                            <p className={`text-sm ${packageSize === pkg.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                              + {pkg.monthly} DKK/month
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Custom option */}
                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      packageSize === 'custom'
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                    onClick={() => setPackageSize('custom')}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Building2 className={`w-6 h-6 ${packageSize === 'custom' ? 'text-white' : 'text-neutral-900'}`} />
                          <div>
                            <h3 className="font-bold text-lg">Bigger Project?</h3>
                            <p className={`text-sm ${packageSize === 'custom' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                              Need more than 36 features or 3 integrations? We'll create a custom quote.
                            </p>
                          </div>
                        </div>
                        {packageSize === 'custom' && (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: AI Project Review (only if Grok is enabled) */}
          {currentStep === 5 && isGrokEnabled && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
                    AI Project Review
                  </h1>
                  <p className="text-neutral-600">
                    Let's refine your project together
                  </p>
                </div>
              </div>

              {/* Chat Container */}
              <Card className="mb-4 overflow-hidden">
                <div 
                  ref={chatContainerRef}
                  className="h-[400px] overflow-y-auto p-4 space-y-4 bg-neutral-50"
                >
                  {isAiLoading && chatMessages.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto mb-4" />
                        <p className="text-neutral-600">Analyzing your project...</p>
                        <p className="text-sm text-neutral-400 mt-1">This may take a few seconds</p>
                      </div>
                    </div>
                  )}

                  {chatMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-neutral-900 text-white'
                            : 'bg-white border border-neutral-200 text-neutral-900'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-neutral-100">
                            <Bot className="w-4 h-4 text-neutral-500" />
                            <span className="text-xs text-neutral-500 font-medium">Ceptiv AI</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isAiLoading && chatMessages.length > 0 && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                          <span className="text-sm text-neutral-500">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="border-t border-neutral-200 p-4 bg-white">
                  <div className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendChatMessage()}
                      placeholder="Type to refine your project... (e.g., 'I also need user authentication')"
                      className="flex-1"
                      disabled={isAiLoading}
                    />
                    <Button
                      onClick={sendChatMessage}
                      disabled={!chatInput.trim() || isAiLoading}
                      className="bg-neutral-900 hover:bg-neutral-800"
                    >
                      {isAiLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    💡 Disagree with something? Just tell the AI and it will adjust the analysis.
                  </p>
                </div>
              </Card>

              {/* Restart Analysis */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setChatMessages([])
                    setAiAnalysis(null)
                    setHasStartedAiReview(false)
                    startAiAnalysis()
                  }}
                  className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center gap-1"
                  disabled={isAiLoading}
                >
                  <RefreshCw className="w-3 h-3" />
                  Restart analysis
                </button>
              </div>
            </motion.div>
          )}

          {/* Contact Information (Step 5 if no Grok, Step 6 if Grok enabled) */}
          {((isGrokEnabled === false && currentStep === 5) || (isGrokEnabled && currentStep === 6)) && (
            <motion.div
              key="contact-info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Almost there! Let's get acquainted.
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                We'll use this information to create your account and send your proposal.
              </p>

              <div className="space-y-6 max-w-xl">
                <div>
                  <Label htmlFor="name" className="text-base font-medium flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Your name *
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-base font-medium flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    Company name
                  </Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corporation"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email (for your account) *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@acme.com"
                    className="mt-2"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    You'll receive a 4-digit PIN to access your client portal
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone (optional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+45 12 34 56 78"
                    className="mt-2"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Review & Submit (Step 6 if no Grok, Step 7 if Grok enabled) */}
          {((isGrokEnabled === false && currentStep === 6) || (isGrokEnabled && currentStep === 7)) && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Review your project request
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                Make sure everything looks good before we start working on your proposal.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-neutral-900 mb-4">Project Overview</h3>
                    <div className="space-y-3 text-neutral-600">
                      <p>
                        <strong>Approach:</strong>{' '}
                        {projectApproach === 'new' 
                          ? 'Building from scratch'
                          : 'Separate system with API connectivity'
                        }
                      </p>
                      <div>
                        <strong>Project Types:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedTypes.map(type => (
                            <span key={type} className="px-3 py-1 bg-neutral-100 rounded-full text-sm">
                              {projectTypes.find(pt => pt.id === type)?.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-neutral-900 mb-4">Project Description</h3>
                    <p className="text-neutral-600">{projectDescription}</p>
                    {selectedIntegrationTypes.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-neutral-100">
                        <strong className="text-sm text-neutral-700">Integrations:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedIntegrationTypes.map(i => (
                            <span key={i} className="px-2 py-1 bg-neutral-100 rounded text-xs">
                              {i}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-neutral-900 mb-4">Timeline & Package</h3>
                    <div className="space-y-2 text-neutral-600">
                      <p><strong>Timeline:</strong> {timelineOptions.find(t => t.id === timeline)?.label}</p>
                      <p>
                        <strong>Package:</strong>{' '}
                        {packageSize === 'custom' 
                          ? 'Custom quote requested'
                          : `${packages.find(p => p.id === packageSize)?.name} (${packages.find(p => p.id === packageSize)?.oneTime} DKK + ${packages.find(p => p.id === packageSize)?.monthly} DKK/mo)`
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-neutral-900 mb-4">Contact Information</h3>
                    <div className="space-y-2 text-neutral-600">
                      <p><strong>Name:</strong> {name}</p>
                      {company && <p><strong>Company:</strong> {company}</p>}
                      <p><strong>Email:</strong> {email}</p>
                      {phone && <p><strong>Phone:</strong> {phone}</p>}
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <Label htmlFor="additional" className="text-base font-medium">
                    Anything else we should know? (optional)
                  </Label>
                  <Textarea
                    id="additional"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Any additional context, requirements, or questions..."
                    className="mt-2"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={nextStep}
            disabled={!canProceed() || isSubmitting || (isGrokEnabled === true && currentStep === 5 && isAiLoading)}
            className="bg-neutral-900 hover:bg-neutral-800 text-white px-8"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : currentStep === totalSteps ? (
              <>
                Submit Request
                <Check className="w-4 h-4 ml-2" />
              </>
            ) : (isGrokEnabled && currentStep === 5) ? (
              <>
                I'm Happy with This
                <Check className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
