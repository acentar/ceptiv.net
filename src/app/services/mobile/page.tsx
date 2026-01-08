'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Smartphone,
  ArrowRight,
  ArrowDown,
  Check,
  Zap,
  Bell,
  CloudOff,
  Fingerprint,
  Store,
  RefreshCw
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Native Performance',
    description: 'React Native + Expo delivers true native performance, not a sluggish webview.'
  },
  {
    icon: Bell,
    title: 'Push Notifications',
    description: 'Real-time notifications to keep your users engaged and informed.'
  },
  {
    icon: CloudOff,
    title: 'Offline Mode',
    description: 'Full functionality even without internet connection, with smart syncing.'
  },
  {
    icon: Fingerprint,
    title: 'Biometric Auth',
    description: 'Face ID, Touch ID, and fingerprint authentication built in.'
  },
  {
    icon: Store,
    title: 'App Store Ready',
    description: 'We handle the entire submission process for both iOS and Android.'
  },
  {
    icon: RefreshCw,
    title: 'OTA Updates',
    description: 'Push updates instantly without going through app store review.'
  }
]

const appTypes = [
  'Customer-facing apps',
  'Internal business tools',
  'Field service apps',
  'E-commerce apps',
  'Social platforms',
  'Fitness & health apps',
  'Booking systems',
  'Delivery apps'
]

const technologies = [
  'React Native', 'Expo', 'TypeScript', 'Supabase', 
  'RevenueCat', 'OneSignal', 'Stripe', 'Firebase'
]

export default function MobileServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-neutral-900 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black"></div>
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
              <Smartphone className="w-12 h-12 mr-4" strokeWidth={1.5} />
              <span className="text-neutral-400 text-lg font-medium tracking-wide">SERVICE</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Mobile Apps
            </h1>

            <p className="text-2xl text-neutral-300 mb-4 font-medium">
              iOS & Android. One codebase. Full power.
            </p>

            <p className="text-xl text-neutral-400 mb-10 max-w-2xl">
              Cross-platform mobile applications built with Expo. 
              Native performance, unified development, seamless deployment to both app stores.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 text-lg font-semibold"
            >
              <Link href="/start">
                Build Your App
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
              Built-In Capabilities
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Every app comes with enterprise-grade features out of the box.
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

      {/* App Types */}
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
                Apps We've Built
              </h2>
              <p className="text-xl text-neutral-600 mb-8">
                From consumer apps to enterprise tools, we've built them all.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {appTypes.map((type, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-neutral-700">{type}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies */}
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
              Our Mobile Stack
            </h2>
            <p className="text-neutral-600">
              Best-in-class tools for building world-class apps.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium"
              >
                {tech}
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
            <Smartphone className="w-16 h-16 mx-auto mb-8 text-neutral-400" strokeWidth={1.5} />
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to go mobile?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Tell us your app idea and we'll provide a detailed proposal. 
              Fixed pricing, clear timeline.
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
