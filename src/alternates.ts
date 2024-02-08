import { Metadata } from 'next'

import { availableLocales, defaultLocale, origin } from './constants'
import { asLocale } from './locales'

export const buildPath = (locale: string, path: `/${string}` = '/') => {
  const suffix = path === '/' ? '' : path
  const resolvedLocale = asLocale(locale)

  return resolvedLocale === defaultLocale
    ? suffix
    : `/${resolvedLocale}${suffix}`
}

export const buildUrl = (locale: string, path: `/${string}` = '/') => {
  return `${origin}${buildPath(locale, path)}`
}

export const buildAtlernates = (
  currentLocale: string,
  path: `/${string}` = '/'
): Metadata['alternates'] => {
  return {
    canonical: buildUrl(currentLocale, path),
    languages: Object.fromEntries(
      availableLocales
        .filter((altLocale) => altLocale !== currentLocale)
        .map((locale) => [locale, [{ url: buildUrl(locale, path) }]] as const)
    ),
  }
}
