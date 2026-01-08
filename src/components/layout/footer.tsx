'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

const footerNavigation = {
  services: [
    { name: 'Backend Applications', href: '/services/automation' },
    { name: 'Websites', href: '/services/web' },
    { name: 'Mobile Apps', href: '/services/mobile' },
    { name: 'AI Integrations', href: '/services/ai' },
    { name: 'Integrations', href: '/services/payments' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-800/30 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-neutral-800/20 rounded-full blur-3xl translate-y-1/2" />
      
      {/* Big CTA Section */}
      <div className="relative border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
                For smaller businesses without in-house dev teams
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Your dev team.
                <br />
                <span className="text-neutral-500">Without the overhead.</span>
              </h2>
              <p className="text-xl text-neutral-400 mb-8 max-w-lg">
                You focus on your business. We handle the tech. No need to hire developers—get 
                enterprise-quality solutions at a fraction of the cost.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 text-lg font-semibold group"
              >
                <Link href="/start">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-neutral-800/50 rounded-xl p-5">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">40+</div>
                  <div className="text-neutral-500 text-xs">Integrations</div>
                </div>
                <div className="bg-neutral-800/50 rounded-xl p-5">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">24h</div>
                  <div className="text-neutral-500 text-xs">Quote Delivery</div>
                </div>
                <div className="bg-neutral-800/50 rounded-xl p-5">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">100%</div>
                  <div className="text-neutral-500 text-xs">Fixed Pricing</div>
                </div>
              </div>
              <div className="bg-neutral-800/30 rounded-xl p-6 border border-neutral-700/50">
                <p className="text-neutral-400 text-sm leading-relaxed">
                  <span className="text-white font-medium">Perfect for:</span> Smaller businesses who need professional 
                  digital solutions but don&apos;t have in-house developers. Get enterprise-quality 
                  without the enterprise overhead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-2 space-y-8">
            <p className="text-lg text-neutral-300 font-medium max-w-sm">
              Fixed prices. Fast delivery.
              <br />
              <span className="text-neutral-500">Danish craftsmanship.</span>
            </p>
            
            <div className="space-y-4">
              <a
                href="mailto:dv@ceptiv.net"
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg">dv@ceptiv.net</span>
              </a>
              <a
                href="tel:+4581983271"
                className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg">+45 81 98 32 71</span>
              </a>
              <div className="flex items-center gap-3 text-neutral-500">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Kongens Lyngby, Denmark</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-6">
              Legal
            </h3>
            <ul className="space-y-4">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-8 border-t border-neutral-800">
              <Logo width={80} height={24} variant="light" className="mb-3 opacity-60" />
              <p className="text-xs text-neutral-500 font-medium mb-2">Part of</p>
              <p className="text-sm text-neutral-400">Acenta Group ApS</p>
              <p className="text-xs text-neutral-500 mt-1">CVR: 37576476</p>
              <div className="mt-3 text-xs text-neutral-500 leading-relaxed">
                <p>Maglebjergvej 6</p>
                <p>2800 Kongens Lyngby</p>
                <p>Denmark</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center">
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} Ceptiv. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
