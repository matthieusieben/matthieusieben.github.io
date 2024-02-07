import { notFound } from 'next/navigation'
import 'server-only'

import { arrayIncludes } from '@/utils/array'
import { defaultLocale, locales } from '@/constants'

const dictionaries = new Map([
  ['en', () => import('./dictionaries/en.json').then((m) => m.default)],
  ['fr', () => import('./dictionaries/fr.json').then((m) => m.default)],
])

export async function getDictionary(locale: string) {
  const dictionary = dictionaries.get(locale)
  if (!dictionary) notFound()
  return await dictionary()
}

export function asLocale(locale?: string) {
  return arrayIncludes(locales, locale) ? locale : defaultLocale
}
