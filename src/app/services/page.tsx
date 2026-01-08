'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Zap,
  Code,
  Smartphone,
  Brain,
  Shield,
  Palette,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react'

const services = [
  {
    id: 'automation',
    icon: Zap,
    title: 'System Applications & Automation',
    shortDesc: 'Custom apps that automate manual processes into seamless workflows.',
    fullDesc: 'We develop custom applications that transform manual, repetitive processes into intelligent, automated workflows. From inventory management to customer onboarding, we build solutions that save time and reduce errors.',
    features: [
      'Process analysis and optimization',
      'Custom workflow automation',
      'Integration with existing systems',
      'Real-time monitoring and reporting',
      'Scalable cloud infrastructure'
    ],
    technologies: ['Node.js', 'Python', 'React', 'PostgreSQL', 'Redis'],
    benefits: ['70% reduction in manual tasks', '99% accuracy improvement', '24/7 operation capability']
  },
  {
    id: 'websites',
    icon: Code,
    title: 'Website Solutions',
    shortDesc: 'High-performance sites with clean backends—no WordPress bloat.',
    fullDesc: 'We build lightning-fast, scalable websites using modern technologies. Clean backends, optimized frontends, and exceptional user experiences that convert visitors into customers.',
    features: [
      'Modern React/Next.js frontend',
      'Optimized backend APIs',
      'SEO-friendly architecture',
      'Mobile-first responsive design',
      'Performance monitoring'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    benefits: ['Sub-1-second load times', '100% mobile optimized', 'SEO-ready structure']
  },
  {
    id: 'design',
    icon: Palette,
    title: 'Custom Designs',
    shortDesc: 'Unique, client-tailored designs that stand out.',
    fullDesc: 'Every brand is unique. We collaborate with you to create custom designs that perfectly capture your brand identity and resonate with your target audience.',
    features: [
      'Brand identity development',
      'Custom UI/UX design',
      'Interactive prototypes',
      'Design system creation',
      'User research and testing'
    ],
    technologies: ['Figma', 'Adobe Creative Suite', 'Framer', 'Principle'],
    benefits: ['Unique brand identity', 'Improved user engagement', 'Higher conversion rates']
  },
  {
    id: 'integrations',
    icon: Shield,
    title: 'Integrations & APIs',
    shortDesc: 'Expertly connect your systems; just provide an API, and we\'ll make them talk.',
    fullDesc: 'Seamless system integration is our specialty. Whether you need to connect CRMs, ERPs, payment systems, or custom APIs, we make disparate systems work together flawlessly.',
    features: [
      'API design and development',
      'Third-party service integration',
      'Webhook implementation',
      'Data synchronization',
      'Error handling and monitoring'
    ],
    technologies: ['REST APIs', 'GraphQL', 'Webhooks', 'OAuth', 'JWT'],
    benefits: ['Unified data flow', 'Automated processes', 'Real-time updates']
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Integrations',
    shortDesc: 'Leverage cutting-edge AI APIs for chatbots, analytics, and more.',
    fullDesc: 'Transform your business with artificial intelligence. We integrate the latest AI technologies to add intelligence to your applications, from chatbots to predictive analytics.',
    features: [
      'OpenAI GPT integration',
      'Google AI Gemini',
      'Anthropic Claude',
      'AWS Bedrock',
      'Azure OpenAI',
      'Hugging Face models',
      'Stability AI image generation',
      'ElevenLabs voice AI'
    ],
    technologies: ['Python', 'OpenAI API', 'TensorFlow', 'LangChain', 'Pinecone'],
    benefits: ['Intelligent automation', 'Enhanced user experiences', 'Data-driven insights']
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    shortDesc: 'Custom iOS and Android apps built with Expo for cross-platform efficiency.',
    fullDesc: 'Native-quality mobile experiences without the complexity. We build cross-platform apps using Expo that deliver native performance on both iOS and Android.',
    features: [
      'Cross-platform development',
      'Native performance optimization',
      'App Store deployment',
      'Push notifications',
      'Offline functionality'
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Native modules'],
    benefits: ['50% faster development', 'Unified codebase', 'Native performance']
  },
  {
    id: 'ux',
    icon: Star,
    title: 'High-End UX',
    shortDesc: 'With deep UX expertise, we create intuitive experiences that delight users.',
    fullDesc: 'User experience is at the heart of everything we build. Our deep expertise in UX research, design, and testing ensures your applications are not just functional, but delightful to use.',
    features: [
      'User research and testing',
      'Usability testing',
      'Accessibility compliance',
      'Interaction design',
      'User journey mapping'
    ],
    technologies: ['Figma', 'Maze', 'Hotjar', 'Google Analytics', 'WCAG standards'],
    benefits: ['Improved user satisfaction', 'Higher engagement rates', 'Reduced support requests']
  },
  {
    id: 'payments',
    icon: Shield,
    title: 'Payment Systems',
    shortDesc: 'Seamless integration of any payment gateway.',
    fullDesc: 'Secure, reliable payment processing is critical for modern businesses. We integrate with all major payment providers and have ready-to-use modules for Stripe, MobilePay, and Dinero.',
    features: [
      'Stripe integration',
      'MobilePay setup',
      'Dinero accounting sync',
      'Payment security (PCI compliance)',
      'Subscription management',
      'Multi-currency support'
    ],
    technologies: ['Stripe API', 'MobilePay API', 'Dinero API', 'Webhooks', 'Encryption'],
    benefits: ['Secure transactions', 'Global payment acceptance', 'Automated reconciliation']
  }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    company: 'TechFlow Inc.',
    text: 'Ceptiv automated our entire inventory process, reducing manual work by 80%. Their AI integration for demand forecasting has been game-changing.',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    company: 'RetailPlus',
    text: 'The mobile app they built increased our customer engagement by 150%. Clean code, beautiful design, and excellent performance.',
    rating: 5
  },
  {
    name: 'Emma Davis',
    company: 'FinanceCorp',
    text: 'Their payment integration expertise saved us months of development time. Secure, reliable, and perfectly integrated with our existing systems.',
    rating: 5
  }
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(services[0])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              From automation to AI, we build anything you can imagine.
              Custom solutions tailored to your unique needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
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
              What We Build
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions across the digital spectrum
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedService.id === service.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-blue-600 mb-4 flex justify-center">
                      <service.icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.shortDesc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Detailed Service View */}
          <motion.div
            key={selectedService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  <div className="text-blue-600 mr-4">
                    <selectedService.icon className="w-16 h-16" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {selectedService.title}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {selectedService.shortDesc}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-8">
                  {selectedService.fullDesc}
                </p>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedService.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedService.benefits.map((benefit, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
                        <p className="text-gray-700 font-medium">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Ready to Get Started?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      Let's discuss how {selectedService.title.toLowerCase()} can transform your business.
                    </p>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <Link href="/start-project">
                        Start Your Project
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
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
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss which services align with your goals and create a custom solution that drives real results.
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