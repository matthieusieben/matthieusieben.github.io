import { availableLocales, defaultLocale } from './constants'

export function asLocale(locale?: string): string {
  if (locale) {
    for (const key of availableLocales) {
      if (key === locale) return key
      if (key.split('-', 1)[0] === locale.split('-', 1)[0]) return key
    }
  }
  return defaultLocale
}
