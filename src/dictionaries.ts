import { notFound } from 'next/navigation'
import 'server-only'

export async function getDictionary(locale: string) {
  try {
    const m = (await import(`./dictionaries/${locale}.json`)) as {
      default: typeof import('./dictionaries/en.json')
    }
    return m.default
  } catch {
    notFound()
  }
}
