import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('services/web', 'en')

export default function WebServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
