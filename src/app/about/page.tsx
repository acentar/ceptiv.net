'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Target,
  Lightbulb,
  Award,
  TrendingUp,
  Heart,
  Calendar,
  MapPin,
  Code,
  Palette,
  Zap
} from 'lucide-react'

const team = [
  {
    name: 'Alex Chen',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack developer with 8+ years building scalable web applications. Expert in React, Node.js, and cloud architecture.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Sarah Johnson',
    role: 'UX/UI Designer',
    bio: 'Creative designer focused on user-centered design with deep expertise in accessibility and mobile-first development.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'AI Integration Specialist',
    bio: 'AI enthusiast bridging the gap between cutting-edge AI research and practical business applications.',
    skills: ['Python', 'OpenAI', 'TensorFlow', 'NLP'],
    image: '/api/placeholder/300/300'
  },
  {
    name: 'Emma Thompson',
    role: 'Project Manager',
    bio: 'Agile project manager ensuring seamless delivery of complex software projects with focus on client satisfaction.',
    skills: ['Agile', 'Scrum', 'Jira', 'Risk Management'],
    image: '/api/placeholder/300/300'
  }
]

const milestones = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'Ceptiv was established with a vision to revolutionize digital solutions through automation and innovation.',
    icon: Calendar
  },
  {
    year: '2021',
    title: 'First AI Integration',
    description: 'Successfully integrated OpenAI APIs into client projects, marking our entry into AI-powered solutions.',
    icon: Brain
  },
  {
    year: '2022',
    title: '50+ Projects Completed',
    description: 'Reached milestone of 50+ successful project deliveries across various industries.',
    icon: Award
  },
  {
    year: '2023',
    title: 'Mobile App Launch',
    description: 'Expanded services to include custom mobile applications using Expo for cross-platform development.',
    icon: Smartphone
  },
  {
    year: '2024',
    title: 'Advanced AI Capabilities',
    description: 'Integrated multiple AI providers including Google AI, Anthropic Claude, and AWS Bedrock.',
    icon: Zap
  }
]

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for perfection in every line of code and pixel of design, delivering solutions that exceed expectations.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay at the forefront of technology, constantly exploring new ways to solve complex problems.'
  },
  {
    icon: Heart,
    title: 'Client-Centric',
    description: 'Your success is our success. We build long-term partnerships based on trust and mutual growth.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe the best solutions come from working together, combining our expertise with your vision.'
  }
]

export default function AboutPage() {
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
              About Ceptiv
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We're more than developers—we're digital innovators who believe in building
              solutions that truly make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
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
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              To revolutionize digital solutions by combining cutting-edge technology with human-centered design,
              empowering businesses to achieve more through intelligent automation and innovative applications.
            </p>
          </motion.div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="text-blue-600 mb-4 flex justify-center">
                      <value.icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '4+', label: 'Years Experience' },
              { number: '50+', label: 'Projects Delivered' },
              { number: '99%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
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

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate experts dedicated to turning your digital vision into reality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to industry leaders in digital innovation.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="text-blue-600 mr-3">
                            <milestone.icon className="w-8 h-8" />
                          </div>
                          <div className="text-3xl font-bold text-blue-600">
                            {milestone.year}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                </motion.div>
              ))}
            </div>
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
              Let's combine our expertise with your vision to create digital solutions that drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/start-project"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Your Project
              </a>
              <a
                href="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}