import Icon from '@mdi/react'
import { ComponentProps, ElementType } from 'react'

import { forwardRef } from '@/utils/polymorphic-component'

import { Button } from './button'

type Props = Pick<
  ComponentProps<typeof Icon>,
  | 'path'
  | 'color'
  | 'description'
  | 'horizontal'
  | 'vertical'
  | 'rotate'
  | 'spin'
>

export const ButtonIcon = forwardRef<Props, 'button'>(
  (
    {
      as = 'button' as ElementType,
      path,
      color,
      description,
      horizontal,
      vertical,
      rotate,
      spin,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Button as={as} ref={ref} {...props}>
        <Icon
          path={path}
          color={color}
          description={description}
          horizontal={horizontal}
          vertical={vertical}
          rotate={rotate}
          spin={spin}
          size="1.2em"
          style={{
            margin: '-0.1em',
            marginRight: children ? '0.5em' : undefined,
          }}
        />
        {children}
      </Button>
    )
  }
)
ButtonIcon.displayName = 'ButtonIcon'
