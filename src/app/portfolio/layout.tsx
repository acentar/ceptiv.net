import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('portfolio', 'en')

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
