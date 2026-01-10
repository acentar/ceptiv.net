import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('contact', 'en')

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
