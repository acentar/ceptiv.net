'use client'

import { ClientAuthProvider } from '@/lib/client-auth'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientAuthProvider>
      {children}
    </ClientAuthProvider>
  )
}
