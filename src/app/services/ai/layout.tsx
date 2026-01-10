import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('services/ai', 'en')

export default function AiServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
