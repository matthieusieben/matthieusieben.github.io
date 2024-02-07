import { locales } from '@/constants'

import ContactPage, { generateMetadata } from '../../../(default)/contact/page'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export { generateMetadata }

export default async function ContactPageLocalized(props: {
  params: { locale: string }
}) {
  return <ContactPage {...props} />
}
