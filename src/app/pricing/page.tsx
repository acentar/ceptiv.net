'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowRight,
  ArrowDown,
  Check,
  HelpCircle
} from 'lucide-react'

const includedFeatures = [
  'Custom development',
  'Hosting & infrastructure',
  'Ongoing maintenance',
  'Security updates',
  'Performance monitoring',
  'Bug fixes',
  'Priority support',
  'Regular backups'
]

const faqs = [
  {
    question: 'How does the fixed pricing work?',
    answer: 'After you describe your project, we provide a detailed proposal with a fixed starting fee and monthly subscription. No hourly billing, no surprise invoices. You know exactly what you\'re paying before we start.'
  },
  {
    question: 'What\'s included in the monthly subscription?',
    answer: 'Everything to keep your system running: hosting, maintenance, security updates, bug fixes, monitoring, backups, and priority support. It\'s like having a dedicated team for a fraction of the cost.'
  },
  {
    question: 'Can I cancel the subscription?',
    answer: 'Yes, you can cancel anytime. You own your code and data. We\'ll help you transition to self-hosting or another provider if needed. No lock-in, ever.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'It depends on scope. Simple projects take 2-4 weeks. Complex systems take 2-3 months. We\'ll give you a clear timeline in your proposal, and we stick to it.'
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Absolutely. We work with clients across 12+ countries. We communicate in English and adapt to your timezone for meetings.'
  },
  {
    question: 'What if I need changes after launch?',
    answer: 'Small changes and improvements are included in your subscription. For major new features, we\'ll provide a separate fixed-price quote.'
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-neutral-900 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center_top,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
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
              PRICING
            </motion.p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              One price.
              <br />
              <span className="text-neutral-400">
                Everything included.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto"
            >
              Low starting fee + predictable monthly subscription. 
              No hidden costs. No hourly billing. No surprises.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 text-lg font-semibold"
              >
                <Link href="/start">
                  Get Your Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
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

      {/* How It Works */}
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
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Every project gets a custom quote based on your specific needs. Here's how it works:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-neutral-900">
                <CardHeader>
                  <CardTitle className="text-2xl">Starting Fee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-neutral-900 mb-4">Custom</p>
                  <p className="text-neutral-600 mb-6">
                    A one-time fee that covers design, development, testing, and launch. 
                    You know exactly what you're paying before we start.
                  </p>
                  <p className="text-sm text-neutral-500">
                    Typical range: €2,000 - €50,000+ depending on scope
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-neutral-900">
                <CardHeader>
                  <CardTitle className="text-2xl">Monthly Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-neutral-900 mb-4">Custom</p>
                  <p className="text-neutral-600 mb-6">
                    Covers hosting, maintenance, support, and everything else. 
                    One predictable monthly payment.
                  </p>
                  <p className="text-sm text-neutral-500">
                    Typical range: €200 - €2,000+/month depending on scope
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-neutral-50 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-neutral-900 mb-6 text-center">
              What's Included in Every Subscription
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {includedFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-neutral-900 mr-2 flex-shrink-0" />
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
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
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <HelpCircle className="w-6 h-6 text-neutral-400 mr-4 mt-0.5 flex-shrink-0" />
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
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready for your custom quote?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Tell us about your project and we'll provide a detailed, fixed-price proposal within 24 hours.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-10 py-6 text-lg font-semibold"
            >
              <Link href="/start">
                Get Your Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
