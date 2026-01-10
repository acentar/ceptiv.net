import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('about', 'en')

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
