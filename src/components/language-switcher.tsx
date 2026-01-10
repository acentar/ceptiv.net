'use client'

import { useLanguage } from '@/hooks/use-language'
import { LANGUAGES } from '@/lib/languages'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const { currentLanguage, switchLanguage, languageConfig } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{languageConfig?.nativeName}</span>
          <span className="sm:hidden">{languageConfig?.flag}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {Object.entries(LANGUAGES).map(([code, config]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => switchLanguage(code as any)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLanguage === code ? 'bg-neutral-100' : ''
            }`}
          >
            <span>{config.flag}</span>
            <span>{config.nativeName}</span>
            {currentLanguage === code && (
              <span className="ml-auto text-neutral-500">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}