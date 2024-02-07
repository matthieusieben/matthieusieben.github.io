import { locales } from '@/constants'

import ContactPage, { generateMetadata } from '../../../(default)/contact/page'

type Props = {
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export { generateMetadata }

export default async function ContactPageLocalized(props: Props) {
  return <ContactPage {...props} />
}
