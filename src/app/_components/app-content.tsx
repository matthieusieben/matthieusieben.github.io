import type { ComponentProps } from 'react'

import { clsx } from '@/utils/clsx'

export async function AppContent({
  locale,
  className,
  ...props
}: ComponentProps<'div'> & { locale: string }) {
  return (
    <main
      className={clsx(
        'mx-auto container flex-grow flex flex-col items-center justify-center',
        className
      )}
      {...props}
    />
  )
}
