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
        'mx-auto container min-h-screen flex flex-col items-center justify-center',
        className
      )}
      {...props}
    />
  )
}
