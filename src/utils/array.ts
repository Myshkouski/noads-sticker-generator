export const ensureIsArray = <T>(value: T | T[]) => {
  return Array.isArray(value) ? value : [value]
}
