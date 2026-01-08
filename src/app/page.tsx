'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Zap, Code, Smartphone, Brain, Shield, Star } from 'lucide-react'

const services = [
  {
    icon: Zap,
    title: 'System Applications & Automation',
    description: 'Custom apps that automate manual processes into seamless workflows.',
    color: 'text-yellow-500'
  },
  {
    icon: Code,
    title: 'Website Solutions',
    description: 'High-performance sites with clean backends—no WordPress bloat.',
    color: 'text-blue-500'
  },
  {
    icon: Brain,
    title: 'AI Integrations',
    description: 'Leverage cutting-edge AI APIs for chatbots, analytics, and more.',
    color: 'text-purple-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Custom iOS/Android apps built with Expo for cross-platform efficiency.',
    color: 'text-green-500'
  },
  {
    icon: Shield,
    title: 'Payment Systems',
    description: 'Seamless integration with Stripe, MobilePay, Dinero, and more.',
    color: 'text-indigo-500'
  }
]

const stats = [
  { number: '50+', label: 'Projects Completed' },
  { number: '99%', label: 'Client Satisfaction' },
  { number: '24h', label: 'Average Response Time' },
  { number: '100%', label: 'Custom Solutions' }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Automate, Integrate,
              <br />
              <span className="text-orange-400">Innovate</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Ceptiv builds your digital future with custom automation, AI integrations,
              and high-performance solutions. No bloat, no compromises—just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
              >
                <Link href="/start-project">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg"
              >
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
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
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              What We Build
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From automated systems to AI-powered apps, we create custom solutions
              that transform your business operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-6">
                    <div className={`${service.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <Link
                      href="/services"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Learn more
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              No Surprises, Everything Included
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Low starting fee + subscription model = One price for everything.
              Unlimited support, scalable growth, and zero hidden costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-green-600">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">Fixed Price Quotes</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Lightning Fast Delivery</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and provide a fixed-price quote within 24 hours.
              No commitments, just honest conversation about your goals.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
            >
              <Link href="/start-project">
                Get Your Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
