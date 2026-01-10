import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('services/payments', 'en')

export default function PaymentsServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
