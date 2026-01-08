'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Link2,
  ArrowRight,
  ArrowDown,
  Check,
  CreditCard,
  FileText,
  Truck,
  Users,
  BarChart3,
  Zap,
  Clock,
  Wallet
} from 'lucide-react'

const integrationCategories = [
  {
    icon: CreditCard,
    title: 'Payment Gateways',
    description: 'Accept payments securely with gateways we\'ve integrated dozens of times.',
    platforms: ['Stripe', 'QuickPay', 'PensoPay', 'Paylike', 'Clearhaus', 'ePay', 'OnPay', 'Scanpay', 'AltaPay', 'MobilePay', 'Apple Pay', 'Google Pay', 'PayPal', 'Klarna']
  },
  {
    icon: FileText,
    title: 'Accounting & Bookkeeping',
    description: 'Automate invoices, bookkeeping, and financial reporting with seamless syncs.',
    platforms: ['Dinero', 'e-conomic', 'Billy', 'Uniconta', 'DynAccount', 'Visma']
  },
  {
    icon: Truck,
    title: 'Shipping & Logistics',
    description: 'Automate parcel booking, tracking, and label generation across carriers.',
    platforms: ['Shipmondo', 'GLS', 'PostNord', 'Unifaun', 'Webshipper', 'DAO', 'Bring']
  },
  {
    icon: Users,
    title: 'Payroll & HR',
    description: 'Connect your payroll systems for automated salary processing and reporting.',
    platforms: ['DataLøn', 'Zenegy', 'Salary', 'Danløn']
  },
  {
    icon: BarChart3,
    title: 'Business Tools',
    description: 'Integrate with the tools you already use to streamline operations.',
    platforms: ['Trustpilot', 'Penneo', 'GetAccept', 'Heyloyalty', 'cvr.dev', 'HubSpot', 'Pipedrive']
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Faster Delivery',
    description: 'We\'ve built these integrations before. No learning curve means faster implementation.'
  },
  {
    icon: Wallet,
    title: 'Lower Costs',
    description: 'Pre-built modules and experience mean we can offer competitive pricing you won\'t find elsewhere.'
  },
  {
    icon: Zap,
    title: 'Reliable & Tested',
    description: 'Battle-tested code that\'s been running in production for real businesses.'
  },
  {
    icon: Check,
    title: 'Full Documentation',
    description: 'Every integration comes with complete documentation for your team.'
  }
]

const allPlatforms = [
  // Payments
  'Stripe', 'QuickPay', 'PensoPay', 'Paylike', 'Clearhaus', 'ePay', 'OnPay', 
  'Scanpay', 'AltaPay', 'MobilePay', 'Apple Pay', 'Google Pay', 'PayPal', 'Klarna',
  // Accounting
  'Dinero', 'e-conomic', 'Billy', 'Uniconta', 'DynAccount', 'Visma',
  // Shipping
  'Shipmondo', 'GLS', 'PostNord', 'Unifaun', 'Webshipper', 'DAO', 'Bring',
  // Payroll
  'DataLøn', 'Zenegy', 'Salary', 'Danløn',
  // Other
  'Trustpilot', 'Penneo', 'GetAccept', 'Heyloyalty', 'cvr.dev', 'HubSpot', 'Pipedrive'
]

export default function IntegrationsServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-neutral-900 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Link 
              href="/services" 
              className="inline-flex items-center text-neutral-400 hover:text-white mb-8 transition-colors"
            >
              ← Back to Services
            </Link>

            <div className="flex items-center mb-6">
              <Link2 className="w-12 h-12 mr-4" strokeWidth={1.5} />
              <span className="text-neutral-400 text-lg font-medium tracking-wide">SERVICE</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Integrations
            </h1>

            <p className="text-2xl text-neutral-300 mb-4 font-medium">
              We&apos;ve done it before. So it costs you less.
            </p>

            <p className="text-xl text-neutral-400 mb-10 max-w-2xl">
              Payments, accounting, shipping, payroll—we&apos;ve integrated with all the major Danish 
              and Nordic platforms. Our pre-built modules mean faster delivery and significantly 
              lower costs for you.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 text-lg font-semibold"
            >
              <Link href="/start">
                Get Integration Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-neutral-500"
          >
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Why It's Cheaper Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Why Our Integrations Cost Less
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We&apos;ve already built integrations with these platforms for other clients. 
              That means we know exactly how they work, what the pitfalls are, and how to 
              get them running fast.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-neutral-200 hover:border-neutral-400 transition-colors text-center">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Categories */}
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
              What We Integrate
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From payments to payroll, we connect your systems so they work together seamlessly.
            </p>
          </motion.div>

          <div className="space-y-12">
            {integrationCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-neutral-100 rounded-lg flex items-center justify-center">
                          <category.icon className="w-7 h-7 text-neutral-900" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                          {category.title}
                        </h3>
                        <p className="text-neutral-600 mb-6">
                          {category.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {category.platforms.map((platform) => (
                            <span
                              key={platform}
                              className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Platforms */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              40+ Platforms We&apos;ve Integrated
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Don&apos;t see what you need? We can integrate with any platform that has an API. 
              These are just the ones we&apos;ve done before—and can do faster and cheaper for you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {allPlatforms.map((platform) => (
              <span
                key={platform}
                className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-full text-sm font-medium hover:border-neutral-400 transition-colors"
              >
                {platform}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
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
              How Integration Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-neutral-200 mb-4">01</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Tell Us What You Need</h3>
              <p className="text-neutral-600">
                Which platforms need to talk to each other? What data needs to flow where?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-neutral-200 mb-4">02</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">We Build the Bridge</h3>
              <p className="text-neutral-600">
                Using our pre-built modules, we connect your systems with custom logic for your needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-neutral-200 mb-4">03</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">It Just Works</h3>
              <p className="text-neutral-600">
                Automated, reliable, and monitored. Your systems work together without you thinking about it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link2 className="w-16 h-16 mx-auto mb-8 text-neutral-400" strokeWidth={1.5} />
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Need an integration?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Tell us which platforms you need connected. If we&apos;ve done it before, 
              you&apos;ll get a quote that&apos;s hard to beat.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-10 py-6 text-lg font-semibold"
            >
              <Link href="/start">
                Get Integration Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
