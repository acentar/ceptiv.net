'use client'

import { useState } from 'react'
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
  Palette,
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
  PartyPopper
} from 'lucide-react'

type ProjectType = 'system' | 'website' | 'mobile' | 'ai' | 'payments' | 'ux'

interface ProjectTypeOption {
  id: ProjectType
  icon: React.ElementType
  title: string
  description: string
}

const projectTypes: ProjectTypeOption[] = [
  { id: 'system', icon: Zap, title: 'System Application', description: 'Automate manual processes' },
  { id: 'website', icon: Code, title: 'Website Solution', description: 'Custom, fast, clean' },
  { id: 'mobile', icon: Smartphone, title: 'Mobile App', description: 'iOS & Android' },
  { id: 'ai', icon: Brain, title: 'AI Integration', description: 'Intelligent automation' },
  { id: 'payments', icon: CreditCard, title: 'Payment System', description: 'Stripe, MobilePay, etc.' },
  { id: 'ux', icon: Palette, title: 'UX Design', description: 'Interface design only' }
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

const paymentMethods = [
  'Credit/Debit Cards (Stripe)',
  'MobilePay (Denmark)',
  'Dinero Invoicing',
  'Subscription billing',
  'One-time payments',
  'Marketplace payments'
]

const existingSystems = [
  'Microsoft 365',
  'Google Workspace',
  'Salesforce',
  'HubSpot',
  'Custom ERP',
  'Excel/Sheets',
  'Other'
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
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([])
  const [projectDescription, setProjectDescription] = useState('')
  const [selectedSystems, setSelectedSystems] = useState<string[]>([])
  const [selectedAiCapabilities, setSelectedAiCapabilities] = useState<string[]>([])
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([])
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

  const totalSteps = 5

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
        return selectedTypes.length > 0
      case 2:
        return projectDescription.length > 10
      case 3:
        return timeline !== ''
      case 4:
        return name !== '' && email !== ''
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In production, you would send this data to your backend
    const formData = {
      projectTypes: selectedTypes,
      description: projectDescription,
      existingSystems: selectedSystems,
      aiCapabilities: selectedAiCapabilities,
      paymentMethods: selectedPaymentMethods,
      teamSize,
      timeline,
      budget: { starting: startingBudget, monthly: monthlyBudget, flexible: flexibleBudget },
      contact: { name, company, email, phone },
      additionalInfo
    }
    
    console.log('Form submitted:', formData)
    
    setIsSubmitting(false)
    setIsSubmitted(true)
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
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
            className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <PartyPopper className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Your project request is on its way!
          </h1>
          
          <p className="text-lg text-neutral-600 mb-8">
            We've received your project details and will get back to you within 24 hours.
          </p>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 text-left">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-neutral-700" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Within 24 hours</p>
                  <p className="text-neutral-600">You'll receive a fixed-price proposal via email at {email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-bold text-neutral-900 mb-4 text-left">Your request summary:</h3>
              <ul className="text-left space-y-2 text-neutral-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-neutral-900" />
                  {selectedTypes.map(t => projectTypes.find(pt => pt.id === t)?.title).join(' + ')}
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-neutral-900" />
                  Timeline: {timelineOptions.find(t => t.id === timeline)?.label}
                </li>
                {startingBudget && (
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-neutral-900" />
                    Budget: {startingBudget} starting + {monthlyBudget}/month
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Button asChild size="lg" variant="outline">
            <Link href="/">
              Back to Homepage
            </Link>
          </Button>
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
          {/* Step 1: Project Type */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                What are we building together?
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                Select all that apply. We often combine multiple solutions.
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

          {/* Step 2: Project Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
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

                {selectedTypes.includes('system') && (
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      What systems do you currently use?
                    </Label>
                    <div className="flex flex-wrap gap-3">
                      {existingSystems.map((system) => (
                        <button
                          key={system}
                          type="button"
                          onClick={() => toggleArrayItem(system, selectedSystems, setSelectedSystems)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedSystems.includes(system)
                              ? 'bg-neutral-900 text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {system}
                        </button>
                      ))}
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

                {selectedTypes.includes('payments') && (
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      What payment methods do you need?
                    </Label>
                    <div className="flex flex-wrap gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => toggleArrayItem(method, selectedPaymentMethods, setSelectedPaymentMethods)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedPaymentMethods.includes(method)
                              ? 'bg-neutral-900 text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {method}
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

          {/* Step 3: Timeline & Budget */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
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

          {/* Step 4: Contact Information */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
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

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
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
