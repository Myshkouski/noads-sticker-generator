import tailwindColors from 'tailwindcss/colors'

const getTailwindColor = (color: string, colorVariant?: Nullable<string | number>) => {
  const twColorVariantsOrColor = { ...tailwindColors }[color];
  if (!twColorVariantsOrColor) return null
  if (typeof twColorVariantsOrColor === "string") return twColorVariantsOrColor
  // if (!colorVariant) throw new ReferenceError(`color variant should be specified for color '${color}'`)
  if (!colorVariant) return null
  const twColorVariant = twColorVariantsOrColor[colorVariant]
  if (!twColorVariant) return null
  return twColorVariant
}

export const useTailwindColor = (color: MaybeRef<string>, colorVariant?: MaybeRef<Nullable<string | number>>) => computed(() => {
  return getTailwindColor(unref(color), unref(colorVariant))
})
