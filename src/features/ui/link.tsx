import { clsx } from '@/utils/clsx'
import NextLink from 'next/link'
import type { ComponentProps } from 'react'
import { classes, classesOutlined } from './button'

type Props = {
  title?: string
  outlined?: boolean
}

export function Link({
  outlined,
  className,
  children,
  ...props
}: Props & ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      className={clsx(classes, className, outlined && classesOutlined)}
      {...props}
    >
      {children == null ? props.title : children}
    </NextLink>
  )
}
