'use client'

import { forwardRef } from '@/utils/polymorphic-component'
import { clsx } from '@/utils/clsx'
import { ElementType } from 'react'

type Props = {
  id?: string
}

export const Navbar = forwardRef<Props>(
  (
    { as: Component = 'nav' as ElementType, className, children, ...props },
    ref
  ) => {
    return (
      <Component
        className={clsx(
          'bg-white dark:bg-gray-800 border-solid border-1 border-gray-200 p-2 md:p-4',
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="mx-auto container px-3 md:px-6 flex flex-wrap items-center justify-stretch">
          {children}
        </div>
      </Component>
    )
  }
)
