'use client'

import type { ReactNode } from 'react'

import { ThemeProvider } from '@/features/theme/provider'

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
