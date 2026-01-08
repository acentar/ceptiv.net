'use client'

import { useState } from 'react'
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
  PartyPopper,
  Plus,
  Layers,
  AlertCircle,
  Link2,
  Key,
  Copy,
  LogIn
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { generatePin, hashPin } from '@/lib/client-auth'

type ProjectApproach = 'new' | 'existing' | null
type ProjectType = 'system' | 'website' | 'mobile' | 'ai' | 'integration'

interface ProjectTypeOption {
  id: ProjectType
  icon: React.ElementType
  title: string
  description: string
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

const integrationOptions = [
  'Payment gateways (Stripe, QuickPay, etc.)',
  'Accounting (Dinero, e-conomic, Billy)',
  'Shipping (Shipmondo, PostNord, GLS)',
  'Payroll (DataLøn, Zenegy)',
  'CRM (HubSpot, Pipedrive)',
  'E-signature (Penneo, GetAccept)',
  'Other API integration'
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

const budgetRanges = {
  starting: ['€2k-5k', '€5k-15k', '€15k-30k', '€30k+'],
  monthly: ['€200-500', '€500-1k', '€1k-2k', '€2k+']
}

export default function StartProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [projectApproach, setProjectApproach] = useState<ProjectApproach>(null)
  const [understandsApproach, setUnderstandsApproach] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([])
  const [projectDescription, setProjectDescription] = useState('')
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])
  const [selectedAiCapabilities, setSelectedAiCapabilities] = useState<string[]>([])
  const [selectedIntegrationTypes, setSelectedIntegrationTypes] = useState<string[]>([])
  const [teamSize, setTeamSize] = useState('')
  const [timeline, setTimeline] = useState('')
  const [startingBudget, setStartingBudget] = useState('')
  const [monthlyBudget, setMonthlyBudget] = useState('')
  const [flexibleBudget, setFlexibleBudget] = useState(false)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [generatedPin, setGeneratedPin] = useState('')
  const [pinCopied, setPinCopied] = useState(false)

  const totalSteps = 6

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

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return projectApproach !== null
      case 2:
        if (projectApproach === 'existing') {
          return understandsApproach
        }
        return selectedTypes.length > 0
      case 3:
        return projectDescription.length > 10
      case 4:
        return timeline !== ''
      case 5:
        return name !== '' && email !== ''
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Generate a 4-digit PIN for the client
      const pin = generatePin()
      const hashedPin = hashPin(pin)
      
      // Check if client already exists
      const { data: existingClient } = await supabase
        .from('cap_clients')
        .select('id')
        .eq('email', email.toLowerCase())
        .single()
      
      let clientId: string
      
      if (existingClient) {
        // Use existing client
        clientId = existingClient.id
      } else {
        // Create new client
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
      
      // Map project type to database enum
      const projectTypeMap: Record<ProjectType, string> = {
        system: 'backend_application',
        website: 'website',
        mobile: 'mobile_app',
        ai: 'ai_integration',
        integration: 'integration'
      }
      
      // Create the project
      const projectName = company 
        ? `${company} - ${selectedTypes.map(t => projectTypes.find(pt => pt.id === t)?.title).join(' & ')}`
        : `${name}'s Project`
      
      const { error: projectError } = await supabase
        .from('cap_projects')
        .insert({
          client_id: clientId,
          project_name: projectName,
          project_type: projectTypeMap[selectedTypes[0]] || 'backend_application',
          description: projectDescription + (additionalInfo ? `\n\nAdditional info: ${additionalInfo}` : ''),
          is_new_build: projectApproach === 'new',
          timeline: timelineOptions.find(t => t.id === timeline)?.label || timeline,
          budget_range: `Starting: ${startingBudget || 'Flexible'}, Monthly: ${monthlyBudget || 'Flexible'}`,
          status: 'pending',
          contact_person_name: 'Daniel Vestergaard',
          contact_person_email: 'dv@ceptiv.net'
        })
      
      if (projectError) {
        console.error('Error creating project:', projectError)
        throw new Error('Failed to create project')
      }
      
      // Auto-login the client by storing their data in localStorage
      const clientData = {
        id: clientId,
        email: email.toLowerCase(),
        company_name: company || null,
        contact_name: name,
        phone: phone || null,
        created_at: new Date().toISOString()
      }
      localStorage.setItem('ceptiv_client', JSON.stringify(clientData))
      
      // Store the generated PIN to show to user
      setGeneratedPin(pin)
      setIsSubmitted(true)
      
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

  const copyPin = () => {
    navigator.clipboard.writeText(generatedPin)
    setPinCopied(true)
    setTimeout(() => setPinCopied(false), 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <PartyPopper className="w-12 h-12 text-neutral-900" />
          </motion.div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Welcome to Ceptiv!
          </h1>
          
          <p className="text-lg text-neutral-300 mb-8">
            Your project request has been submitted. Save your login PIN below.
          </p>

          {/* PIN Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-6 bg-gradient-to-br from-neutral-800 to-neutral-900 border-neutral-700">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Key className="w-6 h-6 text-neutral-400" />
                  <p className="text-neutral-400 font-medium">Your Login PIN</p>
                </div>
                
                <div className="flex justify-center gap-3 mb-6">
                  {generatedPin.split('').map((digit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="w-16 h-20 bg-white rounded-xl flex items-center justify-center text-3xl font-bold text-neutral-900"
                    >
                      {digit}
                    </motion.div>
                  ))}
                </div>

                <Button 
                  onClick={copyPin}
                  variant="outline"
                  className="border-neutral-600 text-white hover:bg-neutral-800"
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

                <p className="text-sm text-neutral-500 mt-4">
                  Use this PIN with your email ({email}) to log in to your client portal.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <Card className="mb-8 bg-neutral-800 border-neutral-700">
            <CardContent className="p-6">
              <h3 className="font-bold text-white mb-4 text-left">What happens next?</h3>
              <ul className="text-left space-y-3 text-neutral-300">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                  <span>We review your project and prepare a proposal within 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                  <span>You&apos;ll receive a notification when your proposal is ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                  <span>Log in to your portal to review and accept the proposal</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-neutral-900 hover:bg-neutral-100"
            >
              <Link href="/client/dashboard">
                <ArrowRight className="w-5 h-5 mr-2" />
                Continue to Dashboard
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link href="/">
                Back to Homepage
              </Link>
            </Button>
          </div>

          <p className="text-neutral-500 text-sm mt-6">
            You&apos;re now signed in. Save your PIN for future logins.
          </p>
        </motion.div>
      </div>
    )
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

          {/* Step 2: Explanation for existing OR Project Types for new */}
          {currentStep === 2 && projectApproach === 'existing' && (
            <motion.div
              key="step2-existing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
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
                    and navigating undocumented quirks. This makes projects take longer and cost more.
                  </p>
                  <p className="text-neutral-600 mb-6">
                    By building everything from scratch, we leverage our pre-built modules, proven patterns, 
                    and deep expertise. This is how we deliver high-quality solutions at competitive prices.
                  </p>
                  
                  <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                    <div className="flex items-center mb-4">
                      <Link2 className="w-6 h-6 text-neutral-900 mr-3" />
                      <h3 className="font-bold text-neutral-900">What we CAN do for you:</h3>
                    </div>
                    <p className="text-neutral-600 mb-4">
                      We can build what you need as a <strong>separate, standalone system</strong> that connects 
                      to your existing solution via API. We'll create a fully documented API that your 
                      current system can integrate with.
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
                        Your existing system connects to our API
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-neutral-900" />
                        Same great pricing as our other projects
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div className="mb-8">
                <button
                  type="button"
                  onClick={() => setUnderstandsApproach(!understandsApproach)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-lg transition-colors ${
                    understandsApproach
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    understandsApproach ? 'border-white' : 'border-neutral-400'
                  }`}>
                    {understandsApproach && <Check className="w-3 h-3" />}
                  </div>
                  <span className="font-medium">
                    I understand. Let's build a separate system with API connectivity.
                  </span>
                </button>
              </div>

              {understandsApproach && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">
                    What are we building?
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Select all that apply for your new standalone system.
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
                </motion.div>
              )}
            </motion.div>
          )}

          {currentStep === 2 && projectApproach === 'new' && (
            <motion.div
              key="step2-new"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          )}

          {/* Step 3: Project Details */}
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
                The more details you share, the more accurate our proposal will be.
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
                    {projectApproach === 'existing' 
                      ? 'What systems does this need to integrate with?'
                      : 'Any existing systems this needs to connect to?'
                    }
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

                {selectedTypes.includes('integration') && (
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      What do you need to integrate?
                    </Label>
                    <div className="flex flex-wrap gap-3">
                      {integrationOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleArrayItem(option, selectedIntegrationTypes, setSelectedIntegrationTypes)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedIntegrationTypes.includes(option)
                              ? 'bg-neutral-900 text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {option}
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

          {/* Step 4: Timeline & Budget */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Timeline & Budget
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                Help us understand your constraints so we can provide the best solution.
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
                  <Label className="text-base font-medium mb-4 block">
                    Starting fee budget
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {budgetRanges.starting.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setStartingBudget(budget)}
                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                          startingBudget === budget
                            ? 'bg-neutral-900 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Monthly subscription budget
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {budgetRanges.monthly.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setMonthlyBudget(budget)}
                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                          monthlyBudget === budget
                            ? 'bg-neutral-900 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setFlexibleBudget(!flexibleBudget)}
                    className={`flex items-center space-x-3 px-6 py-4 rounded-lg transition-colors ${
                      flexibleBudget
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      flexibleBudget ? 'border-white' : 'border-neutral-400'
                    }`}>
                      {flexibleBudget && <Check className="w-3 h-3" />}
                    </div>
                    <span className="font-medium">I'm flexible - give me options</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Contact Information */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Almost there! Let's get acquainted.
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                We'll use this information to send you your personalized proposal.
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
                    Email (for your proposal) *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@acme.com"
                    className="mt-2"
                  />
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

          {/* Step 6: Review & Submit */}
          {currentStep === 6 && (
            <motion.div
              key="step6"
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
                    <h3 className="font-bold text-neutral-900 mb-4">Project Approach</h3>
                    <p className="text-neutral-600">
                      {projectApproach === 'new' 
                        ? '✓ Building from scratch'
                        : '✓ Separate system with API connectivity to existing solution'
                      }
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-neutral-900 mb-4">Project Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTypes.map(type => (
                        <span key={type} className="px-3 py-1 bg-neutral-100 rounded-full text-sm">
                          {projectTypes.find(pt => pt.id === type)?.title}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-neutral-900 mb-4">Project Description</h3>
                    <p className="text-neutral-600">{projectDescription}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-neutral-900 mb-4">Timeline & Budget</h3>
                    <div className="space-y-2 text-neutral-600">
                      <p><strong>Timeline:</strong> {timelineOptions.find(t => t.id === timeline)?.label}</p>
                      {startingBudget && <p><strong>Starting fee:</strong> {startingBudget}</p>}
                      {monthlyBudget && <p><strong>Monthly budget:</strong> {monthlyBudget}</p>}
                      {flexibleBudget && <p className="text-neutral-500 italic">Flexible on budget - looking for options</p>}
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
            disabled={!canProceed() || isSubmitting}
            className="bg-neutral-900 hover:bg-neutral-800 text-white px-8"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Submitting...
              </>
            ) : currentStep === totalSteps ? (
              <>
                Submit Request
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
