import { notFound } from 'next/navigation'

import { locales } from '@/constants'
export { defaultLocale } from '@/constants'

export type Locale = (typeof locales)[number]
export function isLocale(value: unknown): value is Locale {
  return (locales as readonly unknown[]).includes(value)
}

export function assertLocale(value: unknown) {
  if (!isLocale(value)) notFound()
  return value
}
