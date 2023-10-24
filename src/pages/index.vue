<template lang="pug">

.py-24(class="md:container md:m-auto md:px-4")
  //- div
  .grid.gap-8(class="max-xl:auto-cols-fr xl:grid-cols-[min-content_min-content] xl:justify-between")
    .hero.justify-start.py-12(class="xl:col-span-full")
      .hero-content
        .space-y-16
          .space-y-8
            h1.text-4xl NO ADS STICKER
            p.text-lg A way to ask not to spam with advertisements

    div(class="xl:order-2")
      .py-12.space-y-8(class="xl:py-0")
        //- h3.px-4.text-2xl Preview
        .w-full.relative.carousel-wrapper.overflow-hidden
          .space-x-4.max-w-full(class="max-md:carousel")
            .px-4(class="xl:px-0")
              div(ref="sticker")
                StickerPreview(:text="text" :link="qrCodeLink" :primary-color="primaryColor")
              
    .space-y-16(class="xl:order-1 md:max-w-xl")
        .space-y-8
          //- h3.px-4.text-2xl Customize
          .space-y-4.w-full
            .flex.justify-between.items-center.px-4
              h3.text-xl Color
              span.text-xl.text-slate-500 {{ activeColor }}
            .w-full.relative.carousel-wrapper.overflow-hidden
              .max-w-full.space-x-4.px-4(class="max-md:carousel md:flex")
                .my-2(v-for="color in colors" :key="color")
                  button.btn-circle.shadow-xl(
                    :class="' ring ring-offset-2 ring-offset-base-100 hover:ring-neutral hover:ring-offset-4 transition-all ' + getColorClass('bg', color, activeColorVariant) + (activeColor == color ? ' ring-neutral ' : ' ring-transparent ')"
                    @click="activeColor = color"
                  )
          .space-y-4.px-4
            .flex.justify-between.items-center
              h3.text-xl Color variant
              span.text-xl.text-slate-500 {{ activeColorVariant }}
            div
              input.range(
                class="max-md:range-lg"
                type="range" 
                name="colorVariant" 
                :min="min" :step="step" :max="max" 
                v-model="activeColorVariant"
              )
              .flex.justify-between.text-xs.px-2
                span(v-for="i in steps + 1" class="px-0.5") |
        ClientOnly
          .px-4.space-y-4(class="sm:space-x-4 sm:space-y-0")
            button.btn.btn-neutral.px-8.w-full(
              v-if="isShareSupported"
              @click.prevent="onShare" 
              class="sm:w-auto"
              :class="getColorClass('bg', activeColor, 600)"
            ) Share
            button.btn.px-8.w-full(
              @click.prevent="onDownload" 
              class="sm:w-auto" 
              :class="{ 'btn-outline': isShareSupported, [borderColorClass]: isShareSupported, [getColorClass('bg', activeColor, 600)]: !isShareSupported }"
            ) Download

  DevOnly
    ClientOnly
      .px-4.my-24
        .card.bg-base-300.shadow-xl
          .card-body
            h3.text-lg Supported APIs:
            p WebShare API: {{ isShareSupported }}
            p Vibrate API: {{ isVibrateSupported }}

</template>

<script setup lang="ts">
import tailwindColors from 'tailwindcss/colors'
import html2canvas from 'html2canvas'

const { data: qrCodeLinkPost } = usePost('65340d948887efee6cd0')

const qrCodeHref = computed(() => {
  const post = unref(qrCodeLinkPost)
  const link = post?.content
  return link
})

const qrCodeLink = computed(() => {
  const href = unref(qrCodeHref)
  if (!href) return null
  return { href, text: "создать свой" }
})

const sticker = ref<HTMLElement>()

const renderCanvas = async (el: HTMLElement) => {
  return await html2canvas(el, { backgroundColor: 'transparent', logging: process.dev })
}

const renderImage = (canvas: HTMLCanvasElement) => canvas.toDataURL("image/png")

const downloadAsync = async () => {
  const stickerHtmlElement = unref(sticker)
  if (!stickerHtmlElement) return
  const canvas = await renderCanvas(stickerHtmlElement)
  const imageUri = renderImage(canvas)

  const linkSource = imageUri;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = 'sticker.png';
  downloadLink.click();
}

const onDownload = () => downloadAsync().catch(console.error)

const colors = ['rose', 'yellow', 'lime', 'emerald', 'indigo', 'purple', 'gray']
const colorVariants = [400, 500, 600, 700, 800]

const activeColor = ref(colors[0])
const activeColorVariant = ref(600)

const { vibrate, stop: stopVibrate, isSupported: isVibrateSupported } = useVibrate()

onMounted(() => {
  watch([activeColor, activeColorVariant], () => {
    if (isVibrateSupported) {
      stopVibrate()
      vibrate(100)
    }
  })
})

const { share, isSupported: isShareSupported } = useShare()

const onShare = async () => {
  if (!isShareSupported) return

  const stickerHtmlElement = unref(sticker)
  if (!stickerHtmlElement) return
  const canvas = await renderCanvas(stickerHtmlElement)
  const imageUri = renderImage(canvas)
  
  const file = dataURLtoFile(imageUri, 'noads-sticker.jpg')

  share({
    title: 'No Ads Sticker',
    files: [file],
  })
}

const step = ref(100)
const steps = ref(colorVariants.length - 1)
const min = ref(300)
const max = computed(() => unref(steps) * unref(step) + unref(min))

type ColorType = 'bg' | 'text' | 'border'

const getColorClass = (
  type: ColorType,
  color: string,
  colorVariant: number,
) => [type, color, colorVariant].join('-')

const useColorClass = (
  type: MaybeRef<ColorType>, 
  color: MaybeRef<string>, 
  colorVariant: MaybeRef<number>,
) => computed(() => getColorClass(unref(type), unref(color), unref(colorVariant)))

const text = ref("ПОЖАЛУЙСТА,\nНЕ КЛАДИТЕ РЕКЛАМНЫЕ ГАЗЕТЫ И ЛИСТОВКИ")

const textColorClass = useColorClass('text', activeColor, activeColorVariant)
const secondaryTextColorClass = computed(() => {
  return unref(activeColorVariant) < 500
    ? 'text-gray-900'
    : 'text-gray-100'
})

const primaryColor = useTailwindColor(activeColor, activeColorVariant)
const bgColorClass = useColorClass('bg', activeColor, activeColorVariant)
const borderColorClass = useColorClass('border', activeColor, activeColorVariant)

const hexActiveColorGradientFrom = useTailwindColor(activeColor, colorVariants.at(0))

const hexActiveColorGradientTo = computed(() => {
  const activeColorValue = unref(activeColor)
  const color = { ...tailwindColors }[activeColorValue];
  if(!color) return null
  if (typeof color == 'string') return color
  const colorVariant = colorVariants.at(-1)
  if (!colorVariant) return null
  const twColorVariants = ({ ...color } as { [key: number]: string })
  return twColorVariants[colorVariant];
})

const hexActiveColor = computed(() => {
  const activeColorValue = unref(activeColor)
  const activeColorVariantValue = unref(activeColorVariant)
  const color = { ...tailwindColors }[activeColorValue];
  if (!color) return null
  if (typeof color == 'string') return color
  const colorVariants = ({ ...color } as { [key: number]: string })
  const colorVariant = colorVariants[activeColorVariantValue] || null
  return colorVariant
})

const hslActiveColor = computed(() => {
  const hexActiveColorValue = unref(hexActiveColor)
  if (!hexActiveColorValue) return null
  const { h, s, l } = hexToHSL(hexActiveColorValue)
  return [
    h * 360, 
    s * 100 + '%',
    l * 100 + '%', 
  ].join(' ')
})

const dataURLtoFile = (dataUrl: string, filename: string) => {
  const arr = dataUrl.split(',')
  const mime = arr[0]?.match(/:(.*?);/)?.[1]
  const bstr = atob(arr[arr.length - 1])
  let n = bstr.length
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

</script>

<style>

body > div:last-child > span + img {
  display: inline !important;
}

</style>

<style scoped lang="sass">
@mixin carousel-shadow
  content: ""
  display: block
  position: absolute
  top: 0
  width: 0
  height: 100%
  box-shadow: 0rem 0px theme('padding.2') theme('padding.2') hsl(var(--b1))

.carousel-wrapper::before
  @include carousel-shadow
  left: 0
.carousel-wrapper::after
  @include carousel-shadow
  right: 0

@screen md
  .carousel-wrapper
    &::before, &::after
      visibility: hidden

</style>

<style scoped>

input[type=range]::-webkit-slider-runnable-track {
  appearance: none;
  background: linear-gradient(to right, v-bind(hexActiveColorGradientFrom), v-bind(hexActiveColorGradientTo));
  /* --range-shdw: v-bind(hslActiveColor); */
  transition: all .5s;
}

input[type='range']::-webkit-slider-thumb {
  appearance: none;
  background-color: v-bind(hexActiveColor);
  transition: all .5s;
}

</style>
