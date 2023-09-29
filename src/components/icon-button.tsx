import Icon from '@mdi/react'
import { forwardRef } from '@/utils/with-as'
import Button from './button'

type Props = {
  path: string
  size?: number | string | null
  color?: string | null
  horizontal?: boolean
  vertical?: boolean
  rotate?: number
  spin?: boolean | number
  inStack?: boolean
}

const IconButton = forwardRef<Props, typeof Button>(
  (
    {
      as: Component = Button,
      className,
      path,
      size,
      color,
      horizontal,
      vertical,
      rotate,
      spin,
      inStack,
      children,
      ...props
    },
    ref
  ) => (
    <Component ref={ref} className={className} {...props}>
      <Icon
        path={path}
        size={size}
        color={color}
        horizontal={horizontal}
        vertical={vertical}
        rotate={rotate}
        spin={spin}
        inStack={inStack}
        style={{ width: '1em', height: '1em' }}
      />
      {children}
    </Component>
  )
)

IconButton.displayName = 'IconButton'

export default IconButton
