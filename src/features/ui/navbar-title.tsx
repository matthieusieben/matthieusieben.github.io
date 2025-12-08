import NextLink from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

import { clsx } from '@/utils/clsx'

type Props = {
  subtitle?: ReactNode
}

export function NavbarTitle({
  children,
  subtitle,
  className,
  ...props
}: Props & ComponentProps<typeof NextLink>) {
  return (
    <div className="shrink grow w-px flex">
      <NextLink
        className={clsx(
          'shrink flex flex-col items-start justify-center max-w-full',
          className
        )}
        {...props}
      >
        <h1 className="max-w-full text-sm md:text-base font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 truncate">
          {children || props.title}
        </h1>

        {subtitle && (
          <p className="max-w-full text-xs md:text-base font-light md:mt-1 truncate">
            {subtitle}
          </p>
        )}
      </NextLink>
    </div>
  )
}
