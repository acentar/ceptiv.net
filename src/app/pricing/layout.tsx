import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('pricing', 'en')

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
