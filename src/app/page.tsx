import { defaultLocale } from '@/constants'

import LocaleHome from './[locale]/page'
import LocaleLayout from './[locale]/layout'
export { metadata } from './[locale]/page'

export default async function RootPage() {
  const params = { locale: defaultLocale }
  return (
    <LocaleLayout params={params}>
      <LocaleHome params={params} />
    </LocaleLayout>
  )
}
