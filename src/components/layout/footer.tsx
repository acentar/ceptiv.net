import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react'

const footerNavigation = {
  services: [
    { name: 'System Applications & Automation', href: '/services#automation' },
    { name: 'Website Solutions', href: '/services#websites' },
    { name: 'AI Integrations', href: '/services#ai' },
    { name: 'Mobile Apps', href: '/services#mobile' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo width={120} height={32} variant="light" />
            <p className="text-neutral-400 text-sm">
              Revolutionizing Digital Solutions with Custom Automation and Innovation.
              We build anything from automated systems to AI-powered apps.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact & Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@ceptiv.net"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  hello@ceptiv.net
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  +1 (234) 567-8900
                </a>
              </li>
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} Ceptiv. All rights reserved.
          </p>
          <p className="text-neutral-400 text-sm mt-2 md:mt-0">
            Built with ❤️ for digital innovation
          </p>
        </div>
      </div>
    </footer>
  )
}