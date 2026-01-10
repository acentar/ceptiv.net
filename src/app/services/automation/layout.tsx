import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('services/automation', 'en')

export default function AutomationServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
