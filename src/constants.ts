export const origin =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://matthieusieben.com'

export const fullName = 'Matthieu Sieben'

export const defaultLocale = 'en'
export const availableLocales = ['en', 'fr'] as const
