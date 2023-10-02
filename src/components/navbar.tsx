'use client'

import type { HtmlComponent } from '@/utils/with-as'
import { clsx } from '@/utils/clsx'

type Props = {
  id?: string
}

export const Navbar: HtmlComponent<Props, 'nav'> = ({
  as: Component = 'nav' as const,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={clsx(
        'bg-white dark:bg-gray-800 border-solid border-1 border-gray-200 p-2 md:p-4',
        className
      )}
      {...props}
    >
      <div className="mx-auto container px-3 md:px-6 flex flex-wrap items-center justify-stretch">
        {children}
      </div>
    </Component>
  )
}
