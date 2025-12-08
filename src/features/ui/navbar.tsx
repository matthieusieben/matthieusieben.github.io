'use client'

import { clsx } from '@/utils/clsx'
import { HTMLAttributes } from 'react'

type Props = {
  id?: string
}

export function Navbar({
  className,
  children,
  ...props
}: Props & HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={clsx(
        'bg-white dark:bg-gray-800 border-solid border-1 border-gray-200 p-2 md:p-4',
        className
      )}
      {...props}
    >
      <div className="mx-auto container px-3 md:px-6 flex flex-wrap items-center justify-stretch">
        {children}
      </div>
    </nav>
  )
}
