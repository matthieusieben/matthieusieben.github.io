import Icon from '@mdi/react'
import NextLink from 'next/link'

import { clsx } from '@/utils/clsx'
import { ComponentProps, HTMLAttributes } from 'react'

type IconProps = ComponentProps<typeof Icon>

export type Props = {
  type?: 'button' | 'submit' | 'reset'
  title?: string
  outlined?: boolean
  icon?: IconProps['path']
  color?: IconProps['color']
  description?: IconProps['description']
  spin?: IconProps['spin']
  rotate?: IconProps['rotate']
}

export const classes = clsx(
  'inline-flex items-center justify-items-center justify-center',
  'rounded-md leading-none p-2.5',
  'font-sans font-semibold font-medium text-sm text-center',
  'text-gray-500',
  'focus:outline-none focus:ring-4 focus:ring-gray-200',
  'disabled:opacity-50 disabled:pointer-events-none',
  'dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
)

export const classesOutlined = clsx(
  'border border-gray-300',
  'shadow-sm',
  'bg-white',
  'dark:bg-gray-800 dark:border-gray-700'
)

export function Button({
  // Props
  type = 'button',
  outlined = false,
  title,
  // Icon
  icon: path,
  color,
  description,
  rotate,
  spin,
  //
  className,
  children,
  ...props
}:
  | (Props & HTMLAttributes<HTMLButtonElement>)
  | (Props & ComponentProps<typeof NextLink>)) {
  if ('href' in props) {
    return (
      <NextLink
        className={clsx(classes, className, outlined && classesOutlined)}
        type="button"
        title={title}
        {...props}
      >
        {path ? (
          <Icon
            key="icon"
            path={path}
            color={color}
            description={description}
            rotate={rotate}
            spin={spin}
            size="1.2em"
            style={{ margin: '-0.1em' }}
          />
        ) : children == null ? (
          title
        ) : null}
        {children}
      </NextLink>
    )
  }

  return (
    <button
      className={clsx(classes, className, outlined && classesOutlined)}
      type={type}
      title={title}
      {...props}
    >
      {path ? (
        <Icon
          key="icon"
          path={path}
          color={color}
          description={description}
          rotate={rotate}
          spin={spin}
          size="1.2em"
          style={{ margin: '-0.1em' }}
        />
      ) : children == null ? (
        title
      ) : null}
      {children}
    </button>
  )
}
