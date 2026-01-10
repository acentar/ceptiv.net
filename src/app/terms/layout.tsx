import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('terms', 'en')

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
