import { availableLocales } from '@/constants'

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }))
}
