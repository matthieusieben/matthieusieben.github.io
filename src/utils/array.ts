export function nextArrayItem<A extends readonly unknown[]>(
  arr: A,
  item: unknown,
  def: A[number] | undefined = arr.length > 0 ? arr[arr.length - 1] : undefined
): A[number] | undefined {
  return arr[(arr.indexOf(item) + 1) % arr.length] ?? def
}

export function arrayIncludes<A extends readonly unknown[], I>(
  arr: A,
  item: I
): item is I & A[number] {
  return arr.includes(item)
}
