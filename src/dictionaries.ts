import { notFound } from 'next/navigation'
import 'server-only'

const dictionaries = new Map([
  ['en', () => import('./dictionaries/en.json').then((m) => m.default)],
  ['fr', () => import('./dictionaries/fr.json').then((m) => m.default)],
])

export async function getDictionary(locale: string) {
  const dictionary = dictionaries.get(locale)
  if (!dictionary) notFound()
  return await dictionary()
}
