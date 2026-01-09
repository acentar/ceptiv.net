'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/ui/logo'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Sparkles, 
  FileText, 
  CreditCard,
  LogOut,
  Settings,
  ChevronDown
} from 'lucide-react'
import { useClientAuth } from '@/lib/client-auth'

const navigation = [
  { name: 'Account', href: '/client/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/client/dashboard/projects', icon: FolderKanban },
  { name: 'Features', href: '/client/dashboard/features', icon: Sparkles },
  { name: 'Invoices', href: '/client/dashboard/invoices', icon: FileText },
  { name: 'Subscription', href: '/client/dashboard/subscription', icon: CreditCard },
]

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { client, isAuthenticated, isLoading, logout } = useClientAuth()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/client/login')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-neutral-900"></div>
      </div>
    )
  }

  if (!client) {
    return null
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <aside className="w-64 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-8">
          <Link href="/">
            <Logo width={120} height={34} variant="dark" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-0.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/client/dashboard' && pathname.startsWith(item.href))
              
              return (
                <li key={item.name}>
                  <Link href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] transition-colors ${
                        isActive 
                          ? 'font-medium text-neutral-900' 
                          : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      {isActive && (
                        <span className="w-1 h-1 bg-neutral-900 rounded-full" />
                      )}
                      {item.name}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar with Avatar */}
        <div className="sticky top-0 bg-white z-40">
          <div className="max-w-4xl mx-auto px-8 py-6 flex justify-end">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-9 h-9 bg-neutral-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {client.contact_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="p-4 border-b border-neutral-100">
                      <p className="font-medium text-neutral-900">{client.contact_name}</p>
                      <p className="text-sm text-neutral-500">{client.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link
                        href="/client/dashboard/settings"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="max-w-4xl mx-auto px-8 pb-16">
          {children}
        </div>
      </main>
    </div>
  )
}
