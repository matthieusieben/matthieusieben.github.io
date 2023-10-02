type Arg = null | undefined | boolean | string | Record<string, boolean>

export function clsx(...args: [Arg, Arg, ...Arg[]]): string
export function clsx(arg1: Arg, arg2: Arg): string {
  // Unwrap the first two arguments
  const arg1Class = stringify(arg1)
  const arg2Class = stringify(arg2)

  let className =
    arg1Class && arg2Class
      ? `${arg1Class} ${arg2Class}`
      : arg1Class || arg2Class || ''

  // eslint-disable-next-line prefer-rest-params
  const args = arguments as unknown as readonly Arg[]
  for (let i = 2; i < args.length; i++) {
    className += (className ? ' ' : '') + stringify(args[i])
  }

  return className
}

function stringify(value: Arg): string {
  if (value) {
    switch (typeof value) {
      case 'string':
        return value
      case 'object':
        return Object.keys(value).filter(trueInThis, value).join(' ')
    }
  }
  return ''
}

function trueInThis(this: Record<string, unknown>, key: string): boolean {
  return this[key] === true
}
