import { clsx } from '@/utils/clsx'
import { HTMLAttributes } from 'react'

export function Footer({
  id = 'footer',
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={clsx(
        'w-full flex flex-col items-center justify-center text-gray-600 dark:text-gray-400',
        className
      )}
      {...props}
    >
      <div className="p-4 w-full mx-auto container flex items-center justify-between">
        {children}
      </div>
    </footer>
  )
}
