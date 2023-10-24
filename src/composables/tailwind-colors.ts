import tailwindColors from 'tailwindcss/colors'

type TailwindColors = {
  [color: string]: { [variant: string | number]: string } | string
}

export const getTailwindColor = (color: string, colorVariant?: Nullable<string | number>) => {
  const twColorVariantsOrColor = (tailwindColors as unknown as TailwindColors)[color];
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

const primaryColors = ['rose', 'yellow', 'lime', 'emerald', 'indigo', 'purple', 'gray']
const primaryColorVariants = [400, 500, 600, 700, 800]

export const useTailwindPrimaryColors = createGlobalState(() => primaryColors)
export const useTailwindPrimaryColorVariants = createGlobalState(() => primaryColorVariants)
