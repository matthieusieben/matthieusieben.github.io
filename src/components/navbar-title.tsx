'use client'

import type { ReactNode } from 'react'
import type { HtmlComponent } from '@/utils/with-as'

import { clsx } from '@/utils/clsx'

type Props = {
  subtitle?: ReactNode
}

export const NavbarTitle: HtmlComponent<Props, 'a'> = ({
  as: Component = 'a' as const,
  children,
  subtitle,
  className,
  ...props
}) => {
  return (
    <div className="shrink grow w-px flex">
      <Component
        className={clsx(
          'shrink flex-col items-start justify-center max-w-full',
          className
        )}
        {...props}
      >
        <h1 className="max-w-full text-sm md:text-base font-bold uppercase tracking-widest text-gray-800 dark:text-gray-200 truncate">
          {children}
        </h1>

        {subtitle && (
          <p className="max-w-full text-xs md:text-base font-light md:mt-1 truncate">
            {subtitle}
          </p>
        )}
      </Component>
    </div>
  )
}
