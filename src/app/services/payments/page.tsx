'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  CreditCard,
  ArrowRight,
  ArrowDown,
  Check,
  RefreshCw,
  FileText,
  Globe,
  Shield,
  Zap,
  Building2
} from 'lucide-react'

const features = [
  {
    icon: RefreshCw,
    title: 'Subscription Billing',
    description: 'Recurring payments, trials, upgrades, and downgrades handled automatically.'
  },
  {
    icon: FileText,
    title: 'Invoice Automation',
    description: 'Generate, send, and track invoices with automatic payment matching.'
  },
  {
    icon: Globe,
    title: 'Multi-Currency',
    description: 'Accept payments in any currency with automatic conversion and routing.'
  },
  {
    icon: Shield,
    title: 'PCI Compliant',
    description: 'Enterprise-grade security that keeps payment data safe and compliant.'
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    description: 'Get your money faster with accelerated payout schedules.'
  },
  {
    icon: Building2,
    title: 'Marketplace Ready',
    description: 'Split payments, escrow, and multi-party transactions for platforms.'
  }
]

const paymentMethods = [
  'Credit/Debit Cards',
  'Bank Transfers',
  'MobilePay',
  'Apple Pay',
  'Google Pay',
  'PayPal',
  'Direct Debit',
  'Klarna'
]

const integrations = [
  'Stripe', 'MobilePay', 'Dinero', 'PayPal', 
  'Revolut', 'Wise', 'E-conomic', 'Billy'
]

export default function PaymentsServicePage() {
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
              <CreditCard className="w-12 h-12 mr-4" strokeWidth={1.5} />
              <span className="text-neutral-400 text-lg font-medium tracking-wide">SERVICE</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Payment Systems
            </h1>

            <p className="text-2xl text-neutral-300 mb-4 font-medium">
              Stripe, MobilePay, Dinero. Ready to go.
            </p>

            <p className="text-xl text-neutral-400 mb-10 max-w-2xl">
              Seamless payment integrations with our pre-built modules. 
              Subscriptions, one-time payments, invoicing, and more—all production-ready.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 text-lg font-semibold"
            >
              <Link href="/start">
                Add Payments
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

      {/* Features Grid */}
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
              Payment Capabilities
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Everything you need to accept and manage payments at scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-neutral-200 hover:border-neutral-400 transition-colors">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-6">
                      <feature.icon className="w-6 h-6 text-neutral-900" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
                Accept Any Payment
              </h2>
              <p className="text-xl text-neutral-600 mb-8">
                Give your customers the flexibility to pay however they want.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-neutral-700">{method}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Platforms We Integrate
            </h2>
            <p className="text-neutral-600">
              Pre-built connectors to get you running fast.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {integrations.map((integration) => (
              <span
                key={integration}
                className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium"
              >
                {integration}
              </span>
            ))}
          </motion.div>
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
            <CreditCard className="w-16 h-16 mx-auto mb-8 text-neutral-400" strokeWidth={1.5} />
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to accept payments?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Tell us what payment flows you need and we'll build them. 
              Fast, secure, and fully integrated.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-10 py-6 text-lg font-semibold"
            >
              <Link href="/start">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
