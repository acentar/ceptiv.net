import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata('privacy', 'en')

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
