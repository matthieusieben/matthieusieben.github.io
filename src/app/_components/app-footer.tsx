import NextLink from 'next/link'

import { getDictionary } from '@/dictionaries'
import { Footer } from '@/features/ui/footer'
import { PolymorphicProps } from '@/utils/polymorphic-component'
import { buildUrl } from '@/alternates'
import { localesNames } from '@/constants'

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

      <ul className="flex gap-4">
        {Object.entries(localesNames).map(([locale, name]) => (
          <li key={locale}>
            <NextLink key={locale} href={buildUrl(locale, '/')}>
              {name}
            </NextLink>
          </li>
        ))}
      </ul>
    </Footer>
  )
}
