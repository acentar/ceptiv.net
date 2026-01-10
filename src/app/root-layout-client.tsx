'use client'

import { usePathname } from 'next/navigation'
import { AuthProvider } from "@/lib/auth-context";
import { FaviconManager } from "@/components/ui/favicon-manager";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  // Conditionally render navigation and footer based on current path
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')
  const isClientPage = pathname?.startsWith('/client')
  const isStartPage = pathname?.startsWith('/start') || pathname?.startsWith('/da/start')
  const hideNavAndFooter = isAdminPage || isClientPage || isStartPage

  return (
    <AuthProvider>
      <FaviconManager />
      {!hideNavAndFooter && <Navigation />}
      <main className="min-h-screen">
        {children}
      </main>
      {!hideNavAndFooter && <Footer />}
    </AuthProvider>
  );
}