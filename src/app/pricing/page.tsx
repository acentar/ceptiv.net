'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Check,
  ArrowRight,
  DollarSign,
  Clock,
  Shield,
  Zap,
  Users,
  Star
} from 'lucide-react'

const pricingTiers = [
  {
    name: 'Starter',
    price: '2,500',
    description: 'Perfect for small projects and MVPs',
    features: [
      'Project planning & requirements',
      'Basic web application',
      'Mobile responsive design',
      '3 months support',
      'Source code delivery'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '7,500',
    description: 'Most popular choice for growing businesses',
    features: [
      'Everything in Starter',
      'Advanced features & integrations',
      'Database design & setup',
      'API development',
      '6 months support',
      'Performance optimization',
      'Security implementation'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '15,000+',
    description: 'Comprehensive solutions for large projects',
    features: [
      'Everything in Professional',
      'Custom architecture design',
      'Advanced AI integrations',
      'Multi-platform deployment',
      '12 months support',
      'Team training',
      'Priority response',
      'Custom SLAs'
    ],
    popular: false
  }
]

const comparisonData = [
  {
    feature: 'Traditional Agencies',
    ceptiv: 'Low starting fee + transparent subscription',
    traditional: 'High upfront costs, hidden fees, complex contracts'
  },
  {
    feature: 'Project Timeline',
    ceptiv: '2-12 weeks delivery',
    traditional: '3-12+ months'
  },
  {
    feature: 'Support & Maintenance',
    ceptiv: 'Included in subscription',
    traditional: 'Separate monthly fees'
  },
  {
    feature: 'Technology Stack',
    ceptiv: 'Modern, scalable technologies',
    traditional: 'Often outdated or overcomplicated'
  },
  {
    feature: 'Communication',
    ceptiv: 'Direct access to developers',
    traditional: 'Through account managers'
  },
  {
    feature: 'Scalability',
    ceptiv: 'Built for growth',
    traditional: 'Often requires complete rebuild'
  }
]

const faqs = [
  {
    question: 'What\'s included in the starting fee?',
    answer: 'The starting fee covers project planning, design, development, testing, and deployment. It\'s a one-time payment that gets your project built and launched.'
  },
  {
    question: 'What does the subscription cover?',
    answer: 'The subscription includes ongoing support, maintenance, updates, bug fixes, and feature enhancements. It ensures your application continues to work perfectly and stays up-to-date.'
  },
  {
    question: 'Can I cancel the subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. We believe in building long-term relationships, not trapping clients with contracts.'
  },
  {
    question: 'What if my project grows beyond the initial scope?',
    answer: 'That\'s great! We design all our solutions to be scalable. Additional features can be added through the subscription or additional projects.'
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes, we offer flexible payment arrangements. Contact us to discuss payment plans that work for your budget.'
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transparent Pricing,
              <br />
              <span className="text-orange-300">No Surprises</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Low starting fee + subscription model = One price for everything.
              No hidden costs, unlimited support, and scalable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-white">
                <DollarSign className="w-6 h-6" />
                <span className="text-lg font-semibold">Fixed Starting Fee</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Shield className="w-6 h-6" />
                <span className="text-lg font-semibold">Everything Included</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Zap className="w-6 h-6" />
                <span className="text-lg font-semibold">No Hidden Costs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
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
              Choose Your Starting Point
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fixed prices for complete solutions. No hourly rates, no surprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full ${tier.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
                  <CardHeader className="text-center pb-8">
                    {tier.popular && (
                      <Badge className="mb-4 bg-blue-500 hover:bg-blue-600">
                        Most Popular
                      </Badge>
                    )}
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="text-gray-600 ml-1">starting fee</span>
                    </div>
                    <p className="text-gray-600 mt-2">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={`w-full ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    >
                      <Link href="/start-project">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
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
            <p className="text-gray-600 mb-4">
              All packages include ongoing subscription for support and updates
            </p>
            <p className="text-sm text-gray-500">
              Need a custom solution? <Link href="/start-project" className="text-blue-600 hover:underline">Contact us</Link> for a personalized quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subscription Model */}
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
              Subscription Model Explained
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              One payment covers everything - development, hosting, support, and updates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Ongoing Support</h4>
                    <p className="text-gray-600">24/7 technical support and bug fixes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Feature Updates</h4>
                    <p className="text-gray-600">Regular updates and new features</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Security Updates</h4>
                    <p className="text-gray-600">Latest security patches and improvements</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Performance Monitoring</h4>
                    <p className="text-gray-600">Uptime monitoring and optimization</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Hosting & Maintenance</h4>
                    <p className="text-gray-600">Server costs and infrastructure maintenance</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fixed Starting Fee</h4>
                    <p className="text-gray-600">One-time payment gets your project built and deployed</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ongoing Subscription</h4>
                    <p className="text-gray-600">Monthly fee covers all maintenance, support, and updates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Scale as You Grow</h4>
                    <p className="text-gray-600">Add features or increase limits anytime</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
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
              Ceptiv vs Traditional Agencies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See why businesses choose our transparent model
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden bg-white shadow-lg rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-semibold text-gray-900">Feature</div>
                  <div className="font-semibold text-blue-600">Ceptiv</div>
                  <div className="font-semibold text-gray-600">Traditional Agencies</div>
                </div>
              </div>
              <div className="border-t border-gray-200">
                {comparisonData.map((item, index) => (
                  <div key={index} className="px-4 py-4 sm:px-6 even:bg-gray-50">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-sm font-medium text-gray-900">{item.feature}</div>
                      <div className="text-sm text-green-600 font-medium">{item.ceptiv}</div>
                      <div className="text-sm text-red-600">{item.traditional}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing model
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get your fixed-price quote within 24 hours. No commitments, just honest conversation about your project.
            </p>
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
          </motion.div>
        </div>
      </section>
    </div>
  )
}