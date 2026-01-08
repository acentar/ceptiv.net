'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Zap,
  Code,
  Smartphone,
  Brain,
  CreditCard,
  ArrowRight,
  ArrowDown,
  Check,
  Palette
} from 'lucide-react'

const services = [
  {
    id: 'automation',
    icon: Zap,
    title: 'System Automation',
    tagline: 'Kill manual processes. Forever.',
    description: 'We build custom applications that transform repetitive manual tasks into seamless automated workflows. From data entry to complex business logic.',
    examples: ['Inventory management', 'Customer onboarding', 'Reporting dashboards', 'Workflow orchestration'],
    href: '/services/automation'
  },
  {
    id: 'web',
    icon: Code,
    title: 'Web Solutions',
    tagline: 'Clean code. Zero bloat. Maximum speed.',
    description: 'High-performance websites with custom backends. No WordPress, no plugins, no compromise. Just fast, secure, scalable web applications.',
    examples: ['Corporate websites', 'E-commerce platforms', 'SaaS applications', 'Web portals'],
    href: '/services/web'
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    tagline: 'iOS & Android. One codebase. Full power.',
    description: 'Cross-platform mobile applications built with Expo. Native performance, unified development, seamless deployment to both app stores.',
    examples: ['Customer-facing apps', 'Internal tools', 'Field service apps', 'Social platforms'],
    href: '/services/mobile'
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Integrations',
    tagline: 'Intelligent systems that learn and adapt.',
    description: 'We integrate cutting-edge AI into your applications. From GPT-powered assistants to custom machine learning models.',
    examples: ['AI chatbots', 'Document processing', 'Predictive analytics', 'Content generation'],
    href: '/services/ai'
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Payment Systems',
    tagline: 'Stripe, MobilePay, Dinero. Ready to go.',
    description: 'Seamless payment integrations with our pre-built modules. Subscriptions, one-time payments, invoicing, and more.',
    examples: ['Subscription billing', 'Marketplace payments', 'Invoice automation', 'Multi-currency'],
    href: '/services/payments'
  }
]

const differentiators = [
  { title: 'From Scratch Only', desc: 'We build new systems, not modify existing code' },
  { title: 'No Templates', desc: 'Everything is designed and built specifically for you' },
  { title: 'Pre-built Modules', desc: 'Years of integrations ready to deploy instantly' },
  { title: 'Fixed Pricing', desc: 'Know exactly what you pay before we start' }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-neutral-900 text-white overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-700/20 rounded-full blur-3xl animate-pulse"></div>
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
              WHAT WE BUILD
            </motion.p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Built from scratch.
              <br />
              <span className="text-neutral-400">
                Exactly as you need it.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-neutral-300 mb-10 max-w-2xl"
            >
              We don't use templates. We don't modify existing systems. 
              We build custom solutions from the ground up—that's how we deliver 
              exceptional quality at competitive prices.
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
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
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
            <span className="text-sm mb-2">Explore services</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
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
              Five Core Capabilities
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Each service area represents deep expertise we've developed across hundreds of projects.
              Every solution includes custom UX design as part of the build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.href}>
                  <Card className="h-full border-neutral-200 hover:border-neutral-900 transition-all duration-300 group cursor-pointer hover:shadow-xl">
                    <CardContent className="p-8">
                      <div className="text-neutral-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-12 h-12" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-neutral-500 text-sm font-medium mb-4">
                        {service.tagline}
                      </p>
                      <p className="text-neutral-600 mb-6">
                        {service.description}
                      </p>
                      <div className="space-y-2 mb-6">
                        {service.examples.map((example, i) => (
                          <div key={i} className="flex items-center text-sm text-neutral-500">
                            <Check className="w-4 h-4 mr-2 text-neutral-400" />
                            {example}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center text-neutral-900 font-medium group-hover:underline">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
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
                Why Ceptiv?
              </h2>
              <p className="text-xl text-neutral-600 mb-8">
                We're not a typical agency. We don't sell hours. 
                We sell results—and we guarantee them with fixed pricing.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white"
              >
                <Link href="/about">
                  Learn About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentiators.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to build something great?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Tell us about your project and we'll provide a fixed-price proposal within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-neutral-600 text-white hover:bg-neutral-800 px-10 py-6 text-lg"
              >
                <Link href="/portfolio">
                  See Our Work
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
