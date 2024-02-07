export function throttle<T, A extends unknown[]>(
  fn: (this: T, ...args: A) => undefined,
  delay: number = 500
) {
  let timer: undefined | ReturnType<typeof setTimeout>
  let pending: undefined | { this: T; args: A }

  const onTimeout = () => {
    timer = undefined
    if (pending) {
      fn.apply(pending.this, pending.args)
      pending = undefined
      timer = setTimeout(onTimeout, delay)
    }
  }

  throttled.cancel = () => {
    if (timer) clearTimeout(timer)
    timer = undefined
    pending = undefined
  }

  return throttled

  function throttled(this: T, ...args: A) {
    if (timer) {
      pending = { this: this, args }
    } else {
      fn.apply(this, args)
      timer = setTimeout(onTimeout, delay)
    }
  }
}
