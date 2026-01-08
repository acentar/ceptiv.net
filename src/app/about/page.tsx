'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  ArrowDown,
  Heart,
  Zap,
  Users,
  Target,
  Shield,
  Clock
} from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Craftsmanship',
    description: 'We take pride in clean, maintainable code. Every line matters.'
  },
  {
    icon: Zap,
    title: 'Efficiency',
    description: 'No bloat, no shortcuts. We build exactly what you need.'
  },
  {
    icon: Users,
    title: 'Partnership',
    description: "We're not vendors—we're partners invested in your success."
  },
  {
    icon: Target,
    title: 'Clarity',
    description: 'Clear communication, fixed pricing, no surprises.'
  },
  {
    icon: Shield,
    title: 'Quality',
    description: 'We stand behind our work with ongoing support and maintenance.'
  },
  {
    icon: Clock,
    title: 'Reliability',
    description: 'We deliver on time, every time. Our track record proves it.'
  }
]

const stats = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '12+', label: 'Countries Served' },
  { number: '99%', label: 'Client Satisfaction' },
  { number: '0', label: 'Failed Deadlines' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-neutral-900 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black"></div>
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
              ABOUT CEPTIV
            </motion.p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              We build systems that
              <br />
              <span className="text-neutral-400">
                transform how you work.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-neutral-300 mb-10 max-w-2xl"
            >
              Ceptiv is a custom development studio. We don't do templates. 
              We don't do WordPress. We build exactly what you need, 
              from scratch, with clean code and clear pricing.
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

      {/* Stats */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-2">
                  {stat.number}
                </p>
                <p className="text-neutral-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-8">
              Why We Only Build From Scratch
            </h2>
            <div className="prose prose-lg max-w-none text-neutral-600">
              <p className="text-xl mb-6">
                We've seen what happens when agencies take on projects that involve 
                modifying existing codebases: budgets explode, timelines slip, and 
                everyone ends up frustrated.
              </p>
              <p className="text-xl mb-6">
                Working with code we didn't build is expensive and unpredictable.
                That's why we made a decision: <strong className="text-neutral-900">we only build from scratch</strong>.
              </p>
              <p className="text-xl mb-6">
                This lets us leverage our pre-built integrations, proven patterns, and 
                deep expertise. The result? High-quality solutions delivered faster and 
                at <strong className="text-neutral-900">fixed prices you know upfront</strong>.
              </p>
              <p className="text-xl">
                Every project gets our full attention. Every line of code is written 
                specifically for you. And you always know exactly what you're paying 
                before we write a single line.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
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
              What We Stand For
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              These aren't just words on a website. These are the principles we use to make every decision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-neutral-200">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-6">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600">
                      {value.description}
                    </p>
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
              Let's build something together.
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Whether you have a clear vision or just an idea, we'd love to hear about it. 
              No pressure, no sales pitch—just a conversation.
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
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
