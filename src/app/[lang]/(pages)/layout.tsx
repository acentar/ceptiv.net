import { RootLayoutClient } from '@/app/root-layout-client'
import { LanguageLayout } from '@/components/language-layout'

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootLayoutClient>
      <LanguageLayout>
        {children}
      </LanguageLayout>
    </RootLayoutClient>
  )
}