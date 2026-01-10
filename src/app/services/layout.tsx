import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('services', 'en')

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
