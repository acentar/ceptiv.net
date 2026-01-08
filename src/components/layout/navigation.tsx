'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Menu, X, ArrowRight, Zap, Code, Smartphone, Brain, CreditCard, Mail, Phone } from 'lucide-react'

// Pages with dark hero sections that need transparent nav
const darkHeroPages = ['/', '/services', '/about', '/portfolio', '/pricing']

const menuLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
]

const serviceLinks = [
  { name: 'Backend Applications', href: '/services/automation', icon: Zap },
  { name: 'Websites', href: '/services/web', icon: Code },
  { name: 'Mobile Apps', href: '/services/mobile', icon: Smartphone },
  { name: 'AI Integrations', href: '/services/ai', icon: Brain },
  { name: 'Integrations', href: '/services/payments', icon: CreditCard },
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const pathname = usePathname()

  // Check if current page has a dark hero
  const hasDarkHero = darkHeroPages.includes(pathname)

  // Handle scroll for sticky nav transformation
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Determine nav styles based on scroll and page type
  // When menu is open, always use transparent/dark mode styling
  const isTransparent = isMenuOpen || (hasDarkHero && !hasScrolled)
  const navBg = isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md'
  const navBorder = isTransparent ? 'border-transparent' : 'border-neutral-200'
  const textColor = isTransparent ? 'text-white' : 'text-neutral-900'
  const logoVariant = isTransparent ? 'light' : 'dark'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} border-b ${navBorder}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative z-50">
              <Logo width={100} height={28} variant={logoVariant} textFallback="Ceptiv" />
            </Link>

            {/* Right side: Start Project + Menu */}
            <div className="flex items-center space-x-4">
              {/* Start Project Button - Desktop */}
              <div className="hidden sm:block">
                <Button
                  asChild
                  className={`transition-all duration-300 ${
                    isTransparent
                      ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  <Link href="/start">
                    Start Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`relative z-50 p-2 rounded-lg transition-colors ${
                  isMenuOpen
                    ? 'text-white hover:bg-white/10'
                    : isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-neutral-900 hover:bg-neutral-100'
                }`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-neutral-900"
          >
            <div className="h-full overflow-y-auto pt-20 lg:pt-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                  {/* Main Navigation Links */}
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-neutral-500 text-sm font-medium mb-6"
                    >
                      NAVIGATION
                    </motion.p>
                    <nav className="space-y-2">
                      {menuLinks.map((link, index) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + index * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            className={`group flex items-center justify-between py-3 border-b border-neutral-800 transition-colors ${
                              pathname === link.href
                                ? 'text-white'
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            <span className="text-2xl lg:text-4xl font-bold">{link.name}</span>
                            <ArrowRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </div>

                  {/* Services & Contact */}
                  <div className="space-y-12">
                    {/* Services */}
                    <div>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-neutral-500 text-sm font-medium mb-6"
                      >
                        SERVICES
                      </motion.p>
                      <div className="grid grid-cols-2 gap-4">
                        {serviceLinks.map((service, index) => (
                          <motion.div
                            key={service.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 + index * 0.05 }}
                          >
                            <Link
                              href={service.href}
                              className="flex items-center space-x-3 p-3 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors group"
                            >
                              <service.icon className="w-5 h-5" />
                              <span className="text-sm font-medium">{service.name}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Contact */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-neutral-500 text-sm font-medium mb-6">
                        GET IN TOUCH
                      </p>
                      <div className="space-y-4">
                        <a
                          href="mailto:dv@ceptiv.net"
                          className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                          <span>dv@ceptiv.net</span>
                        </a>
                        <a
                          href="tel:+4581983271"
                          className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-colors"
                        >
                          <Phone className="w-5 h-5" />
                          <span>+45 81 98 32 71</span>
                        </a>
                      </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto bg-white text-neutral-900 hover:bg-neutral-100"
                      >
                        <Link href="/start">
                          Start Your Project
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-16 pt-8 border-t border-neutral-800"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 text-neutral-500 text-sm">
                    <p>© {new Date().getFullYear()} Ceptiv. All rights reserved.</p>
                    <div className="flex space-x-6">
                      <Link href="/privacy" className="hover:text-white transition-colors">
                        Privacy
                      </Link>
                      <Link href="/terms" className="hover:text-white transition-colors">
                        Terms
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
