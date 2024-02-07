'use client'

import type { ReactNode } from 'react'

import { ThemeProvider } from '@/features/theme/provider'

type Props = {
  locale: string
  children: ReactNode
}

export function Providers({ locale, children }: Props) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
