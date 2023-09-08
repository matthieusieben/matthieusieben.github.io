import { defaultLocale } from '@/constants'

import LocaleHome from './[locale]/page'
export { metadata } from './[locale]/page'

export default async function RootPage() {
  return <LocaleHome params={{ locale: defaultLocale }} />
}
