'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Sparkles, 
  FileText, 
  CreditCard,
  LogOut,
  Settings,
  Bell
} from 'lucide-react'
import { useClientAuth } from '@/lib/client-auth'

const navigation = [
  { name: 'Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/client/dashboard/projects', icon: FolderKanban },
  { name: 'Feature Requests', href: '/client/dashboard/features', icon: Sparkles },
  { name: 'Invoices', href: '/client/dashboard/invoices', icon: FileText },
  { name: 'Subscription', href: '/client/dashboard/subscription', icon: CreditCard },
]

const bottomNavigation = [
  { name: 'Settings', href: '/client/dashboard/settings', icon: Settings },
]

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { client, isAuthenticated, isLoading, logout } = useClientAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/client/login')
    }
  }, [isAuthenticated, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
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
      <aside className="w-72 bg-neutral-50 border-r border-neutral-200 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-8 pb-6">
          <Link href="/">
            <Logo width={120} height={34} variant="dark" textFallback="Ceptiv" />
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/client/dashboard' && pathname.startsWith(item.href))
              
              return (
                <li key={item.name}>
                  <Link href={item.href}>
                    <motion.div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                        isActive 
                          ? 'bg-white text-neutral-900 shadow-sm border border-neutral-200' 
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
                      }`}
                      whileHover={{ x: isActive ? 0 : 4 }}
                      transition={{ duration: 0.15 }}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`} />
                      {item.name}
                      {isActive && (
                        <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full ml-auto" />
                      )}
                    </motion.div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="px-4 pb-4">
          <ul className="space-y-1 border-t border-neutral-200 pt-4">
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href
              
              return (
                <li key={item.name}>
                  <Link href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                        isActive 
                          ? 'bg-white text-neutral-900 shadow-sm border border-neutral-200' 
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`} />
                      {item.name}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-white font-medium text-sm">
              {client.contact_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {client.contact_name}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {client.email}
              </p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        <div className="max-w-5xl mx-auto px-8 py-12">
          {children}
        </div>
      </main>
    </div>
  )
}
