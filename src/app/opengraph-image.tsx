import { defaultLocale } from '@/constants'

import LocaleOpengraphImage from './[locale]/opengraph-image'
export { alt, runtime, size, contentType } from './[locale]/opengraph-image'

// export * does not work for some reason...

export default async function OpengraphImage() {
  return LocaleOpengraphImage({ params: { locale: defaultLocale } })
}
