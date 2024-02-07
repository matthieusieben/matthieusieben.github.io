import type { ReactNode } from 'react'

import { locales } from '@/constants'

import RootLayoutDefault from '../../(default)/layout'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayoutLocalized(props: {
  params: { locale: string }
  children: ReactNode
}) {
  return <RootLayoutDefault {...props} />
}
