'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  ArrowDown,
  Check,
  HelpCircle,
  Building2,
  Plus
} from 'lucide-react'

const packages = [
  {
    name: 'Small',
    features: 12,
    integrations: 1,
    oneTime: '18.000',
    monthly: '600',
    popular: false,
  },
  {
    name: 'Medium',
    features: 24,
    integrations: 2,
    oneTime: '36.000',
    monthly: '900',
    popular: true,
  },
  {
    name: 'Large',
    features: 36,
    integrations: 3,
    oneTime: '54.000',
    monthly: '1.200',
    popular: false,
  },
]

const allIncluded = [
  'UX designer consultation',
  'Custom website design',
  'Custom backend system',
  'Data storage',
  'Auto-scaling database',
  'Fast server hosting',
  'Security & SSL',
  'Regular backups',
  'Maintenance & updates',
  'Priority support',
]

const faqs = [
  {
    question: 'What counts as a "feature"?',
    answer: 'A feature is a distinct piece of functionality—like user authentication, a dashboard, payment processing, email notifications, or a reporting module. We\'ll help you identify exactly how many features your project needs during our consultation.'
  },
  {
    question: 'What if I don\'t use all my features at launch?',
    answer: 'Unused features roll over! If your Small package includes 12 features but you only need 8 at launch, you keep those 4 for later. Use them when you\'re ready to expand—no extra cost.'
  },
  {
    question: 'What if I need more features later?',
    answer: 'Additional features are 2.500 DKK each after your package features are used. Buying a larger package upfront gives you a better per-feature price.'
  },
  {
    question: 'What\'s included in the monthly subscription?',
    answer: 'Everything to keep your system running: hosting, maintenance, security updates, bug fixes, monitoring, backups, and priority support. Think of it as your outsourced tech department.'
  },
  {
    question: 'Can I cancel the subscription?',
    answer: 'Yes, you can cancel anytime with 30 days notice. You own your code and data. We\'ll help you transition if needed. No lock-in contracts.'
  },
  {
    question: 'What about email and Microsoft 365?',
    answer: 'Email hosting is not included—we help you set up Microsoft 365 or Google Workspace, which you pay directly to Microsoft/Google. This gives you enterprise-grade email at the best price.'
  },
  {
    question: 'How long does development take?',
    answer: 'Starter projects: 3-4 weeks. Growth: 6-8 weeks. Scale: 10-12 weeks. Enterprise: 12-16 weeks. We provide exact timelines in your proposal.'
  }
]

export default function PricingPage() {
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-neutral-900 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-neutral-400 text-lg mb-6 font-medium tracking-wide"
            >
              SUBSCRIPTION PACKAGES
            </motion.p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Your tech team.
              <br />
              <span className="text-neutral-400">
                One predictable price.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-neutral-300 mb-6 max-w-2xl mx-auto"
            >
              One-time setup + monthly subscription. We build it, host it, maintain it, 
              and evolve it with you. Pay per feature when you need more.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-neutral-500 text-sm"
            >
              Designed for startups & SMBs who need professional solutions without in-house developers
            </motion.p>
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

      {/* Pricing Cards */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredPackage(pkg.name)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                <Card className={`h-full relative overflow-hidden transition-all duration-300 ${
                  pkg.popular 
                    ? 'border-2 border-neutral-900 shadow-xl scale-105' 
                    : 'border border-neutral-200 hover:border-neutral-400 hover:shadow-lg'
                }`}>
                  {pkg.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-neutral-900 text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardContent className={`p-8 ${pkg.popular ? 'pt-14' : ''}`}>
                    <div className="mb-6">
                      <p className="text-sm text-neutral-500 mb-1">Start your project with</p>
                      <h3 className="text-2xl font-bold text-neutral-900">{pkg.name}</h3>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6 pb-6 border-b border-neutral-200">
                      <div className="mb-4">
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">One-time</p>
                        <p className="text-3xl font-bold text-neutral-900">
                          {pkg.oneTime} <span className="text-base font-normal text-neutral-500">DKK</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Monthly</p>
                        <p className="text-2xl font-bold text-neutral-900">
                          {pkg.monthly} <span className="text-base font-normal text-neutral-500">kr/mo</span>
                        </p>
                      </div>
                    </div>

                    {/* Features count */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">Backend features</span>
                        <span className="font-bold text-neutral-900">{pkg.features}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-600">API integrations</span>
                        <span className="font-bold text-neutral-900">{pkg.integrations === 0 ? 'None' : `Up to ${pkg.integrations}`}</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className={`w-full py-6 ${
                        pkg.popular 
                          ? 'bg-neutral-900 hover:bg-neutral-800 text-white' 
                          : 'bg-white border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      <Link href="/start">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Custom/Enterprise Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-dashed border-neutral-300 hover:border-neutral-400 transition-all duration-300 bg-neutral-50">
                <CardContent className="p-8 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-neutral-200 text-neutral-600">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900">Bigger Project?</h3>
                    </div>
                  </div>

                  <p className="text-neutral-600 text-sm mb-6">
                    Need more than 36 features? Complex integrations? Multiple systems?
                  </p>

                  <div className="bg-white rounded-xl p-4 mb-6 border border-neutral-200">
                    <p className="text-sm text-neutral-700">
                      <span className="font-semibold text-neutral-900">We&apos;ll create a custom quote</span> tailored to your exact needs within 24 hours.
                    </p>
                  </div>

                  <Button
                    asChild
                    className="w-full py-6 bg-neutral-900 hover:bg-neutral-800 text-white"
                  >
                    <Link href="/start">
                      Get Custom Quote
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional features note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="max-w-2xl mx-auto bg-white border border-neutral-200 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Plus className="w-6 h-6 text-neutral-700" />
                <span className="text-lg font-bold text-neutral-900">
                  Additional features: 2.500 DKK each
                </span>
              </div>
              <p className="text-neutral-600 text-sm mb-4">
                Need more features after launch? Add them anytime at a fixed price.
              </p>
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-700">
                  <span className="font-semibold text-neutral-900">💡 Unused features are saved:</span> If you don&apos;t use all your features at launch, 
                  they roll over. Use them later as your business grows—no extra cost.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Everything Included
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Every package includes these essentials. No hidden costs, no add-ons required.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {allIncluded.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-neutral-50 rounded-xl p-6 text-center"
              >
                <Check className="w-8 h-8 text-neutral-900 mx-auto mb-3" />
                <p className="text-sm font-medium text-neutral-700">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              The Subscription Model
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              We don&apos;t just build and leave. We become your tech partner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-neutral-700 mb-4">01</div>
              <h3 className="text-xl font-bold mb-3">We Build</h3>
              <p className="text-neutral-400">
                Pay the one-time fee. We design and build your complete solution with our UX specialist.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-neutral-700 mb-4">02</div>
              <h3 className="text-xl font-bold mb-3">We Run</h3>
              <p className="text-neutral-400">
                Monthly subscription covers hosting, maintenance, support, and security. You focus on business.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-neutral-700 mb-4">03</div>
              <h3 className="text-xl font-bold mb-3">We Evolve</h3>
              <p className="text-neutral-400">
                Need new features? Pay per feature and we add them. Your system grows with your business.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="border-neutral-200">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <HelpCircle className="w-5 h-5 text-neutral-400 mr-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-neutral-900 mb-2">{faq.question}</h3>
                        <p className="text-neutral-600">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Not sure which package?
            </h2>
            <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto">
              Tell us about your project. We&apos;ll recommend the right package and give you a detailed quote within 24 hours.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-neutral-900 hover:bg-neutral-800 text-white px-10 py-6 text-lg font-semibold"
            >
              <Link href="/start">
                Get Your Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
