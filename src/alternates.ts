import { Metadata } from 'next'

import { defaultLocale, locales, origin } from './constants'

export const buildUrl = (locale: string, path: `/${string}` = '/') => {
  const suffix = path === '/' ? '' : path
  return locale === defaultLocale
    ? `${origin}${suffix}`
    : `${origin}/${locale}${suffix}`
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
