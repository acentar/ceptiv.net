import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('services/mobile', 'en')

export default function MobileServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
