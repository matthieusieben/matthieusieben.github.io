export function nextArrayItem<T>(
  arr: T[],
  item: T,
  def: T | undefined = arr[arr.length - 1]
) {
  return arr[(arr.indexOf(item) + 1) % arr.length] ?? def
}
