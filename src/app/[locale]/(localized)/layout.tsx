import type { ReactNode } from 'react'

import { locales } from '@/constants'

import DefaultLayout from '../../(default)/layout'

type Props = {
  params: { locale: string }
  children: ReactNode
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayout(props: Props) {
  return <DefaultLayout {...props} />
}
