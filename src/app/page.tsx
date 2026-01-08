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
  Check,
  ArrowDown,
  Workflow,
  Rocket,
  HeartHandshake
} from 'lucide-react'

const services = [
  {
    icon: Zap,
    title: 'Web Applications',
    tagline: 'Custom apps for any purpose.',
    description: 'From automation systems to business tools—we build custom web applications that solve your specific problems.'
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
    title: 'Integrations',
    tagline: 'We\'ve done it before. So it costs you less.',
    description: 'Payments, accounting, shipping, payroll—we\'ve integrated them all. Pre-built modules mean lower costs for you.'
  }
]

// Integration platforms we've worked with - organized by category
const integrationPlatforms = {
  payments: [
    { name: 'Stripe', category: 'Payments' },
    { name: 'QuickPay', category: 'Payments' },
    { name: 'PensoPay', category: 'Payments' },
    { name: 'Paylike', category: 'Payments' },
    { name: 'Clearhaus', category: 'Payments' },
    { name: 'ePay', category: 'Payments' },
    { name: 'OnPay', category: 'Payments' },
    { name: 'MobilePay', category: 'Payments' },
    { name: 'Apple Pay', category: 'Payments' },
    { name: 'Google Pay', category: 'Payments' },
    { name: 'PayPal', category: 'Payments' },
    { name: 'Klarna', category: 'Payments' },
  ],
  accounting: [
    { name: 'Dinero', category: 'Accounting' },
    { name: 'e-conomic', category: 'Accounting' },
    { name: 'Billy', category: 'Accounting' },
    { name: 'Uniconta', category: 'Accounting' },
    { name: 'Visma', category: 'Accounting' },
    { name: 'DynAccount', category: 'Accounting' },
  ],
  shipping: [
    { name: 'Shipmondo', category: 'Shipping' },
    { name: 'PostNord', category: 'Shipping' },
    { name: 'GLS', category: 'Shipping' },
    { name: 'Unifaun', category: 'Shipping' },
    { name: 'Webshipper', category: 'Shipping' },
    { name: 'DAO', category: 'Shipping' },
    { name: 'Bring', category: 'Shipping' },
  ],
  payroll: [
    { name: 'DataLøn', category: 'Payroll' },
    { name: 'Zenegy', category: 'Payroll' },
    { name: 'Salary', category: 'Payroll' },
    { name: 'Danløn', category: 'Payroll' },
  ],
  ai: [
    { name: 'OpenAI', category: 'AI' },
    { name: 'Claude', category: 'AI' },
    { name: 'Gemini', category: 'AI' },
    { name: 'Mistral', category: 'AI' },
    { name: 'ElevenLabs', category: 'AI' },
    { name: 'Whisper', category: 'AI' },
    { name: 'DALL-E', category: 'AI' },
    { name: 'Stable Diffusion', category: 'AI' },
  ],
  business: [
    { name: 'Trustpilot', category: 'Business' },
    { name: 'Penneo', category: 'E-Sign' },
    { name: 'GetAccept', category: 'E-Sign' },
    { name: 'HubSpot', category: 'CRM' },
    { name: 'Pipedrive', category: 'CRM' },
    { name: 'Heyloyalty', category: 'Marketing' },
    { name: 'cvr.dev', category: 'Data' },
  ],
  sms: [
    { name: 'Twilio', category: 'SMS' },
    { name: 'MessageBird', category: 'SMS' },
    { name: 'Vonage', category: 'SMS' },
    { name: 'Plivo', category: 'SMS' },
    { name: 'GatewayAPI', category: 'SMS' },
  ],
  workspace: [
    { name: 'Microsoft 365', category: 'Workspace' },
    { name: 'Google Workspace', category: 'Workspace' },
    { name: 'Outlook', category: 'Email' },
    { name: 'SharePoint', category: 'Workspace' },
    { name: 'OneDrive', category: 'Storage' },
    { name: 'Teams', category: 'Workspace' },
  ],
  designSystems: [
    { name: 'Microsoft Fluent', category: 'Design System' },
    { name: 'Material Design', category: 'Design System' },
    { name: 'Apple HIG', category: 'Design System' },
    { name: 'Ant Design', category: 'Design System' },
    { name: 'Tailwind', category: 'Design System' },
  ],
}

// Flatten for marquee rows
const marqueeRow1 = [
  ...integrationPlatforms.payments,
  ...integrationPlatforms.accounting,
  ...integrationPlatforms.ai.slice(0, 4),
  ...integrationPlatforms.sms,
  ...integrationPlatforms.designSystems,
]

const marqueeRow2 = [
  ...integrationPlatforms.shipping,
  ...integrationPlatforms.payroll,
  ...integrationPlatforms.business,
  ...integrationPlatforms.ai.slice(4),
  ...integrationPlatforms.workspace,
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
              Everything built from scratch. Zero templates. Zero plugins.
              That's how we deliver great solutions at competitive prices.
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
              We design with end-users in mind. Tell us about your project and 
              we'll create a solution that works—using proven design systems for consistency.
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
                  { text: 'Custom Design', desc: 'Designed with end-users in mind' },
                  { text: 'Design Systems', desc: 'Microsoft Fluent, Material, and more' },
                  { text: 'No Bloat', desc: 'Only what you need' },
                  { text: 'Fixed Pricing', desc: 'No hourly billing surprises' }
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

      {/* Who We Work With */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
              Who we work with
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Your dev team—without the overhead
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We partner with companies that need professional digital solutions 
              but don&apos;t want the cost and complexity of in-house development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl bg-neutral-50"
            >
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Startups</h3>
              <p className="text-neutral-600">
                Launch fast with enterprise-quality tech. No need to hire a CTO or build a team—we&apos;re your tech partner from day one.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl bg-neutral-50"
            >
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Growing SMBs</h3>
              <p className="text-neutral-600">
                Scale without the hiring headaches. Get custom systems that automate your operations and fuel growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl bg-neutral-50"
            >
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Established Companies</h3>
              <p className="text-neutral-600">
                Digital isn&apos;t your core business—it&apos;s ours. Focus on what you do best while we handle the technology.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-neutral-700 font-medium">
              You focus on your business. We handle the tech.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Integration Marquee */}
      <section className="py-24 bg-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              We&apos;ve Done It Before
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              40+ platforms we&apos;ve integrated. Pre-built modules mean 
              <span className="text-neutral-900 font-semibold"> faster delivery </span> 
              and 
              <span className="text-neutral-900 font-semibold"> lower costs </span> 
              for you.
            </p>
          </motion.div>
        </div>

        {/* Marquee Row 1 - Left to Right */}
        <div className="relative mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10" />
          
          <motion.div
            className="flex gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: 'linear',
            }}
          >
            {[...marqueeRow1, ...marqueeRow1].map((platform, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all duration-300 cursor-default min-w-[160px]">
                  <div className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                    {platform.name}
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wide mt-1">
                    {platform.category}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Marquee Row 2 - Right to Left */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10" />
          
          <motion.div
            className="flex gap-4"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ 
              duration: 35, 
              repeat: Infinity, 
              ease: 'linear',
            }}
          >
            {[...marqueeRow2, ...marqueeRow2].map((platform, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all duration-300 cursor-default min-w-[160px]">
                  <div className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors">
                    {platform.name}
                  </div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wide mt-1">
                    {platform.category}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom message */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-full">
                <Workflow className="w-5 h-5" />
                <span className="font-medium">+ Any system with an API</span>
              </div>
            </div>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Don&apos;t see your platform? We can integrate with anything that has an API.
            </p>
            <p className="text-neutral-500 mt-3 text-sm max-w-2xl mx-auto">
              <strong className="text-neutral-700">Need email?</strong> We don&apos;t host email ourselves—we help you 
              set up Microsoft 365 or Google Workspace and integrate it seamlessly into your solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Example */}
      <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-800/50 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neutral-800/30 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
                Real example
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                What does a project
                <br />
                <span className="text-neutral-500">actually cost?</span>
              </h2>
              <p className="text-xl text-neutral-400 mb-8">
                No vague estimates. Here&apos;s a real example of what you get and what it costs. 
                Every project is different, but this gives you an idea.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {includedFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="flex items-center gap-2 text-sm text-neutral-400"
                  >
                    <Check className="w-4 h-4 text-neutral-500" />
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right side - Pricing Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white text-neutral-900 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
                {/* Card accent */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900" />
                
                <div className="mb-8">
                  <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">
                    Example Project
                  </p>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    Custom Business Platform
                  </h3>
                </div>

                {/* What's included */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Custom website designed with you</p>
                      <p className="text-sm text-neutral-500">Designed by our UX specialist, using proven UI kits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Custom backend with 12 features</p>
                      <p className="text-sm text-neutral-500">A medium-sized system—yours might be smaller or larger</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">1 third-party integration</p>
                      <p className="text-sm text-neutral-500">Payment, accounting, or any API</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Auto-scaling infrastructure</p>
                      <p className="text-sm text-neutral-500">Database & storage that grows with you</p>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t border-neutral-200 pt-8 mb-8">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">One-time</p>
                      <p className="text-4xl font-bold text-neutral-900">24.000 <span className="text-xl font-normal text-neutral-500">DKK</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-500 mb-1">Monthly</p>
                      <p className="text-2xl font-bold text-neutral-900">900 <span className="text-base font-normal text-neutral-500">kr/mo</span></p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Monthly includes hosting, maintenance, support, security updates, and backups
                  </p>
                </div>

                {/* Note */}
                <div className="bg-neutral-50 rounded-xl p-4 mb-8">
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium text-neutral-900">Note:</span> Email not included—we help you set up 
                    Microsoft 365, which you pay directly to Microsoft.
                  </p>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-6 text-lg font-semibold"
                >
                  <Link href="/start">
                    Get Your Custom Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
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
