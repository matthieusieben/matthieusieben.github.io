export function clsx(
  ...args: (null | undefined | boolean | string | Record<string, boolean>)[]
): string {
  let className = ''
  let arg: (typeof args)[number]
  for (let i = 0; i < args.length; i++) {
    arg = args[i]
    if (arg) {
      switch (typeof arg) {
        case 'string':
          className += (className ? ' ' : '') + arg
          break

        case 'object':
          className +=
            (className ? ' ' : '') +
            Object.keys(arg).filter(trueInThis, arg).join(' ')
          break

        default:
          break
      }
    }
  }
  return className
}

function trueInThis(this: Record<string, unknown>, key: string): boolean {
  return this[key] === true
}
