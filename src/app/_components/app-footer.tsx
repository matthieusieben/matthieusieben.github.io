import NextLink from 'next/link'

import { getDictionary } from '@/dictionaries'
import { Footer } from '@/features/ui/footer'
import { PolymorphicProps } from '@/utils/polymorphic-component'
import { AppLocaleSelector } from './app-locale-selector'

export async function AppFooter({
  locale,
  children,
  ...props
}: PolymorphicProps<'footer'> & { locale: string }) {
  const d = await getDictionary(locale)
  return (
    <Footer {...props}>
      <span className="text-sm sm:text-center">
        {'© 2023 '}
        <NextLink href={'/'} className="hover:underline">
          {d.name}
        </NextLink>{' '}
        - {d.rightsReserved}
      </span>

      <div className="flex-1" />

      {children}

      <div className="flex-1" />

      <AppLocaleSelector locale={locale} />
    </Footer>
  )
}
