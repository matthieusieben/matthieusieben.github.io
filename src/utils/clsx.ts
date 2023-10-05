export type ClsxArg =
  | null
  | undefined
  | boolean
  | string
  | Record<string, boolean>

export function clsx(...args: [ClsxArg, ClsxArg, ...ClsxArg[]]): string
export function clsx(arg1: ClsxArg, arg2: ClsxArg): string {
  // Hot path: optimize for the most common case

  // Unroll the 2 first loop iterations
  const arg1Class = arg1 ? stringify(arg1) : ''
  const arg2Class = arg2 ? stringify(arg2) : ''

  let className = arg1Class
    ? arg2Class
      ? arg1Class + ' ' + arg2Class
      : arg1Class
    : arg2Class

  // eslint-disable-next-line prefer-rest-params
  const args = arguments as unknown as readonly ClsxArg[]
  let arg: (typeof args)[number]
  for (let i = 2; i < args.length; i++) {
    if ((arg = args[i])) {
      const argClass = stringify(arg)
      if (argClass) {
        className = className ? className + ' ' + argClass : argClass
      }
    }
  }

  return className
}

function stringify(value: NonNullable<ClsxArg>): string {
  switch (typeof value) {
    case 'string':
      return value
    case 'object':
      return Object.keys(value).filter(trueInThis, value).join(' ')
  }
  return ''
}

function trueInThis(this: Record<string, unknown>, key: string): boolean {
  return this[key] === true
}
