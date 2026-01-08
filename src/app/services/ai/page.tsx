'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Brain,
  ArrowRight,
  ArrowDown,
  Check,
  MessageSquare,
  FileText,
  BarChart3,
  Image,
  Mic,
  Sparkles
} from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    description: 'Intelligent conversational agents that understand context and provide helpful responses.'
  },
  {
    icon: FileText,
    title: 'Document Processing',
    description: 'Extract, summarize, and analyze documents automatically with high accuracy.'
  },
  {
    icon: BarChart3,
    title: 'Predictive Analytics',
    description: 'Make data-driven decisions with AI-powered forecasting and insights.'
  },
  {
    icon: Image,
    title: 'Image Generation',
    description: 'Create custom images, graphics, and visual content on demand.'
  },
  {
    icon: Mic,
    title: 'Voice AI',
    description: 'Speech-to-text, text-to-speech, and voice-powered interfaces.'
  },
  {
    icon: Sparkles,
    title: 'Custom Models',
    description: 'Fine-tuned AI models trained specifically for your use case and data.'
  }
]

const useCases = [
  'Customer support automation',
  'Content generation at scale',
  'Data extraction and analysis',
  'Personalized recommendations',
  'Automated email responses',
  'Search and knowledge bases',
  'Translation and localization',
  'Quality assurance and review'
]

const aiPlatforms = [
  'OpenAI GPT-4', 'Claude 3', 'Google Gemini', 'Mistral AI', 
  'LLaMA 2', 'DALL-E 3', 'Stable Diffusion', 'ElevenLabs',
  'Whisper', 'LangChain', 'Pinecone', 'Hugging Face'
]

export default function AIServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-neutral-900 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black"></div>
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neutral-700/10 rounded-full blur-3xl animate-pulse"></div>
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
              <Brain className="w-12 h-12 mr-4" strokeWidth={1.5} />
              <span className="text-neutral-400 text-lg font-medium tracking-wide">SERVICE</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              AI Integrations
            </h1>

            <p className="text-2xl text-neutral-300 mb-4 font-medium">
              Intelligent systems that learn and adapt.
            </p>

            <p className="text-xl text-neutral-400 mb-10 max-w-2xl">
              We integrate cutting-edge AI into your applications. From GPT-powered assistants 
              to custom machine learning models—practical AI that solves real problems.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 text-lg font-semibold"
            >
              <Link href="/start">
                Add AI to Your Product
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
              AI Capabilities
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We work with the latest AI models and can integrate any capability you need.
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

      {/* Use Cases */}
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
                What Can AI Do For You?
              </h2>
              <p className="text-xl text-neutral-600 mb-8">
                AI isn't magic—it's a tool. We help you identify where it adds real value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-neutral-700">{useCase}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Platforms */}
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
              AI Platforms We Integrate
            </h2>
            <p className="text-neutral-600">
              Access to the world's most powerful AI through our integrations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {aiPlatforms.map((platform) => (
              <span
                key={platform}
                className="px-6 py-3 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium hover:bg-neutral-900 hover:text-white transition-colors cursor-default"
              >
                {platform}
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
            <Brain className="w-16 h-16 mx-auto mb-8 text-neutral-400" strokeWidth={1.5} />
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to leverage AI?
            </h2>
            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
              Tell us what you want to achieve and we'll design the right AI solution. 
              No hype—just practical, working AI.
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
