import { Metadata } from 'next'

import { defaultLocale, locales, origin } from './constants'

export const buildPath = (locale: string, path: `/${string}` = '/') => {
  const suffix = path === '/' ? '' : path
  return locale === defaultLocale ? suffix : `/${locale}${suffix}`
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
      locales
        .filter((altLocale) => altLocale !== currentLocale)
        .map((locale) => [locale, [{ url: buildUrl(locale, path) }]] as const)
    ),
  }
}
