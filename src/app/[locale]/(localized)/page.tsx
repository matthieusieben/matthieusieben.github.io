import { locales } from '@/constants'

import HomePage, { generateMetadata } from '../../(default)/page'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export { generateMetadata }

export default async function HomePageLocalized(props: {
  params: { locale: string }
}) {
  return <HomePage {...props} />
}
