import type { ReactNode } from 'react'

import { locales } from '@/constants'

import DefaultLayout from '../../(default)/layout'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayout(props: {
  params: { locale: string }
  children: ReactNode
}) {
  return <DefaultLayout {...props} />
}
