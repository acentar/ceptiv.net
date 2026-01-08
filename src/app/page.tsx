'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ArrowRight, 
  Zap, 
  Code, 
  Smartphone, 
  Brain, 
  CreditCard,
  Palette,
  Check,
  ArrowDown,
  Workflow,
  Rocket,
  HeartHandshake
} from 'lucide-react'

const services = [
  {
    icon: Zap,
    title: 'System Automation',
    tagline: 'Kill manual processes. Forever.',
    description: 'We build custom applications that transform repetitive manual tasks into seamless automated workflows.'
  },
  {
    icon: Code,
    title: 'Web Solutions',
    tagline: 'Clean code. Zero bloat. Maximum speed.',
    description: 'High-performance websites with clean backends. No WordPress, no plugins—just fast, custom code.'
  },
  {
    icon: Brain,
    title: 'AI Integrations',
    tagline: 'Intelligent systems that learn and adapt.',
    description: 'Leverage OpenAI, Claude, Gemini, and more to build AI-powered features into your applications.'
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    tagline: 'iOS & Android. One codebase. Full power.',
    description: 'Cross-platform mobile applications built with Expo for efficient development and native performance.'
  },
  {
    icon: CreditCard,
    title: 'Payment Systems',
    tagline: 'Stripe, MobilePay, Dinero. Ready to go.',
    description: 'Seamless payment integrations with our pre-built modules. Subscriptions, invoicing, and more.'
  },
  {
    icon: Palette,
    title: 'UX Design',
    tagline: 'Interfaces that users love.',
    description: 'Custom designs created together with you. High-end user experiences backed by years of expertise.'
  }
]

const aiIntegrations = [
  'OpenAI GPT-4', 'Claude 3', 'Google Gemini', 'Mistral AI', 
  'LLaMA 2', 'DALL-E 3', 'Stable Diffusion', 'ElevenLabs',
  'Whisper', 'AssemblyAI', 'Pinecone', 'LangChain'
]

const paymentIntegrations = [
  'Stripe', 'MobilePay', 'Dinero', 'PayPal', 'Apple Pay', 'Google Pay'
]

const processSteps = [
  { step: '01', title: 'Discover', description: 'You tell us the problem' },
  { step: '02', title: 'Design', description: 'We design it together' },
  { step: '03', title: 'Develop', description: 'We build it custom' },
  { step: '04', title: 'Deploy', description: 'We launch it seamlessly' },
  { step: '05', title: 'Evolve', description: 'We maintain & improve' }
]

const includedFeatures = [
  'Development', 'Hosting', 'Maintenance', 'Support',
  'Updates', 'Security', 'Backups', 'Monitoring'
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-neutral-900 text-white overflow-hidden flex items-center">
        {/* Animated mesh background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neutral-700/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-neutral-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-neutral-400 text-lg mb-6 font-medium tracking-wide"
            >
              CUSTOM DEVELOPMENT STUDIO
            </motion.p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              We don't build websites.
              <br />
              <span className="text-neutral-400">
                We build systems that transform how you work.
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-neutral-300 mb-10 max-w-2xl"
            >
              Automate manual processes. Integrate with any system. 
              Deploy AI that actually works. All custom. All yours.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 text-lg font-semibold"
              >
                <Link href="/start">
                  Get a Fixed Price in 24h
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-neutral-600 text-white hover:bg-neutral-800 px-8 py-6 text-lg"
              >
                <Link href="/portfolio">
                  See Our Work
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-neutral-500"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* What We Actually Do Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              What We Actually Do
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We build custom digital solutions. No templates. No shortcuts. 
              Just clean, powerful systems tailored to your exact needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-neutral-200 hover:border-neutral-900 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-8">
                    <div className="text-neutral-900 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-neutral-500 text-sm font-medium mb-3">
                      {service.tagline}
                    </p>
                    <p className="text-neutral-600">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Ceptiv Difference */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-8">
                The Ceptiv Difference
              </h2>
              <div className="space-y-6">
                {[
                  { text: 'No WordPress', desc: 'Custom code, not plugins' },
                  { text: 'No Bloat', desc: 'Only what you need' },
                  { text: 'No Templates', desc: 'Designed with you' },
                  { text: 'No Surprises', desc: 'Fixed pricing' }
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900 text-lg">{item.text}</p>
                      <p className="text-neutral-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-neutral-900 rounded-2xl p-8 lg:p-12 text-white"
            >
              <p className="text-neutral-400 text-sm font-medium mb-4">BY THE NUMBERS</p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: '50+', label: 'Systems Built' },
                  { number: '12+', label: 'Countries Served' },
                  { number: '100%', label: 'Custom Solutions' },
                  { number: '0', label: 'Template Websites' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</p>
                    <p className="text-neutral-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Integration Ecosystem
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We connect your new system with anything that has an API. 
              AI, payments, ERPs, CRMs—if it's got an API, we can integrate it.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* AI Integrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-3" />
                AI Capabilities
              </h3>
              <div className="flex flex-wrap gap-3">
                {aiIntegrations.map((integration, index) => (
                  <motion.span
                    key={integration}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium hover:bg-neutral-900 hover:text-white transition-colors cursor-default"
                  >
                    {integration}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Payment Integrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-3" />
                Payment Systems
              </h3>
              <div className="flex flex-wrap gap-3">
                {paymentIntegrations.map((integration, index) => (
                  <motion.span
                    key={integration}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium hover:bg-neutral-900 hover:text-white transition-colors cursor-default"
                  >
                    {integration}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Custom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-neutral-50 rounded-2xl p-8 text-center"
            >
              <Workflow className="w-12 h-12 text-neutral-900 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                + Any System With an API
              </h3>
              <p className="text-neutral-600 max-w-xl mx-auto">
                Microsoft 365, Google Workspace, Salesforce, HubSpot, custom ERPs, 
                legacy systems—if it has an API, we can make it talk to your new system.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Philosophy */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              One Price. Everything Included.
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Low starting fee + predictable monthly subscription. 
              No hidden fees. No surprise invoices. No scope creep.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {includedFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2"
                >
                  <Check className="w-5 h-5 text-neutral-400" />
                  <span className="text-neutral-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 text-lg font-semibold"
            >
              <Link href="/start">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              How We Work
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              A proven process that delivers results, on time, every time.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  <div className="relative z-10 w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
                  <p className="text-neutral-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-16 h-16 text-neutral-900 mx-auto mb-8" />
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Ready to automate your business?
            </h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
              Tell us what you need. Get a fixed-price proposal in 24 hours. 
              No obligations, just honest conversation about your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-10 py-6 text-lg font-semibold"
              >
                <Link href="/start">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-neutral-300 text-neutral-900 hover:bg-neutral-100 px-10 py-6 text-lg"
              >
                <Link href="/contact">
                  <HeartHandshake className="mr-2 w-5 h-5" />
                  Talk to Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
