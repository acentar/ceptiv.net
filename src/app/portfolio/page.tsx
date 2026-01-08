'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  ArrowDown,
  Zap,
  Code,
  Smartphone,
  Brain,
  CreditCard,
  ExternalLink
} from 'lucide-react'

const projects = [
  {
    title: 'Automated Inventory System',
    client: 'Retail Company',
    description: 'Complete inventory management automation that reduced manual work by 80% and eliminated stock discrepancies.',
    tags: ['Web Application', 'Integration', 'Dashboard'],
    icon: Zap,
    results: ['80% less manual work', '99.9% accuracy', '24/7 operation']
  },
  {
    title: 'E-commerce Platform',
    client: 'Fashion Brand',
    description: 'High-performance e-commerce site with custom product configurator and seamless checkout experience.',
    tags: ['Web Solution', 'E-commerce', 'Payments'],
    icon: Code,
    results: ['Sub-1s load time', '150% conversion increase', 'Fully mobile optimized']
  },
  {
    title: 'Field Service App',
    client: 'Maintenance Company',
    description: 'Cross-platform mobile app for field technicians with offline capability and real-time sync.',
    tags: ['Mobile App', 'Offline-First', 'Real-time'],
    icon: Smartphone,
    results: ['50% faster job completion', 'Works offline', 'GPS tracking']
  },
  {
    title: 'AI Customer Support',
    client: 'SaaS Platform',
    description: 'GPT-powered support chatbot that handles 70% of tickets automatically with human escalation.',
    tags: ['AI Integration', 'Chatbot', 'Support'],
    icon: Brain,
    results: ['70% auto-resolution', '24/7 availability', '90% satisfaction']
  },
  {
    title: 'Subscription Billing Platform',
    client: 'Media Company',
    description: 'Complete subscription management with Stripe, automated invoicing, and revenue analytics.',
    tags: ['Payments', 'Subscriptions', 'Analytics'],
    icon: CreditCard,
    results: ['Automated billing', 'Churn reduction', 'Revenue insights']
  },
  {
    title: 'Healthcare Portal',
    client: 'Medical Practice',
    description: 'Patient portal with appointment scheduling, telehealth integration, and secure messaging.',
    tags: ['Web Solution', 'HIPAA Compliant', 'Telehealth'],
    icon: Code,
    results: ['60% fewer no-shows', 'Secure messaging', 'Online booking']
  }
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-neutral-900 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
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
              OUR WORK
            </motion.p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Real projects.
              <br />
              <span className="text-neutral-400">
                Real results.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-neutral-300 mb-10 max-w-2xl"
            >
              Every project here was built from scratch, custom-designed for the client's 
              specific needs. No templates. No shortcuts.
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

      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-neutral-200 hover:border-neutral-400 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center group-hover:bg-neutral-900 transition-colors">
                        <project.icon className="w-7 h-7 text-neutral-900 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm text-neutral-500">{project.client}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                      {project.title}
                    </h3>

                    <p className="text-neutral-600 mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-neutral-100 pt-6">
                      <p className="text-sm font-medium text-neutral-500 mb-3">KEY RESULTS</p>
                      <div className="flex flex-wrap gap-4">
                        {project.results.map((result, i) => (
                          <span key={i} className="text-sm text-neutral-700 font-medium">
                            ✓ {result}
                          </span>
                        ))}
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
              Your project could be next.
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Tell us what you're trying to build and we'll show you how we can help. 
              Fixed price, no surprises.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-10 py-6 text-lg font-semibold"
            >
              <Link href="/start">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
