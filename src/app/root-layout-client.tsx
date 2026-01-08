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

  return (
    <AuthProvider>
      <FaviconManager />
      {!isAdminPage && <Navigation />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </AuthProvider>
  );
}