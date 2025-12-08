import { availableLocales, defaultLocale } from './constants'

export function asLocale(locale?: string): string {
  if (locale) {
    // Exact match first
    if ((availableLocales as readonly string[]).includes(locale)) {
      return locale
    }
    // Fallback to same language code (e.g., "fr" for "fr-BE")
    for (const key of availableLocales) {
      if (key.split('-', 1)[0] === locale.split('-', 1)[0]) return key
    }
  }
  return defaultLocale
}
