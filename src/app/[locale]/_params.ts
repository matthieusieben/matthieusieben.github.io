import { locales } from '@/constants'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
