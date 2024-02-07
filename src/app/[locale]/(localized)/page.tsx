import { locales } from '@/constants'

import HomePage, { generateMetadata } from '../../(default)/page'

type Props = {
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export { generateMetadata }

export default async function HomePageLocalized(props: Props) {
  return <HomePage {...props} />
}
