'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  Settings,
  FileImage,
  Users,
  BarChart3,
  FolderKanban,
  CreditCard,
  FileText,
  Sparkles,
  Zap,
  FileSignature
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Projects',
    href: '/admin/projects',
    icon: FolderKanban,
  },
  {
    name: 'Features',
    href: '/admin/features',
    icon: Sparkles,
  },
  {
    name: 'Clients',
    href: '/admin/clients',
    icon: Users,
  },
  {
    name: 'Subscriptions',
    href: '/admin/subscriptions',
    icon: CreditCard,
  },
  {
    name: 'Invoices',
    href: '/admin/invoices',
    icon: FileText,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    name: 'Integrations',
    href: '/admin/integrations',
    icon: Zap,
  },
  {
    name: 'Agreement',
    href: '/admin/agreement',
    icon: FileSignature,
  },
]

const settingsNavigation = [
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-neutral-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-neutral-100 text-neutral-900"
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        <Separator className="my-6" />

        <div>
          <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Settings
          </h3>
          <nav className="space-y-2">
            {settingsNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-neutral-100 text-neutral-900"
                    )}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}