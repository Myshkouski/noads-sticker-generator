<template lang="pug">

.py-24(class="md:container md:m-auto")
  .hero.justify-start.py-12
    .hero-content
      .space-y-16
        .space-y-8
          h1.text-4xl NO ADS STICKER
          p.text-lg A way to ask not to spam with advertisements

  .space-y-8.text-base-content.m-auto
    div 
      .py-12.space-y-8
        //- h3.px-4.text-2xl Preview
        .carousel.space-x-4.max-w-full
          .px-4
            .shadow-xl.rounded-2xl.join(ref="sticker" class="w-[44em]")
              .join-item.p-8.flex.flex-col.justify-end.transition-colors(:class="bgColorClass")
                p.text-4xl.text-white
                  | NO
                  br
                  | ADS
              .join-item.p-8.bg-white
                p.text-4xl.transition-colors(:class="textColorClass" style="white-space: pre-wrap")  {{ text }}
              .join-item.p-8.flex.flex-col.justify-end.bg-white
                .space-y-2(class="min-w-[6rem]")
                  p.text-center.text-sm.text-primary-content
                    | создать
                    br
                    | стикер
                  img.m-auto.rounded-lg.overflow-hidden.border-2.border-black(:src="qrCode" alt="QR Code")
              
    div
      .space-y-16
        .space-y-8
          //- h3.px-4.text-2xl Customize
          .space-y-4.w-full
            .flex.justify-between.items-center.px-4
              h3.text-xl Color
              span.text-xl {{ activeColor }}
            .max-w-full.carousel.space-x-4.px-4
              div(v-for="color in colors" :key="color")
                //- input.hidden(type="radio" :value="color" v-model="activeColor" :id="color")
                button.btn.btn-circle.block(
                  :class="getColorClass('bg', color, activeColorVariant) + (activeColor == color ? ' border-2 border-slate-100' : '')"
                  @click="activeColor = color"
                )
          .space-y-4.px-4
            .flex.justify-between.items-center
              h3.text-xl Color variant
              span.text-xl {{ activeColorVariant }}
            div.max-w-none(class="md:max-w-lg")
              input.range(type="range" name="colorVariant" :min="min" :step="step" :max="max" v-model="activeColorVariant")
              .flex.justify-between.text-xs(class="px-2.5")
                span(v-for="i in steps + 1") |
        ClientOnly
          .px-4.space-y-4(class="sm:space-x-4 sm:space-y-0")
            button.btn.px-8.w-full(
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

import { useQRCode } from '@vueuse/integrations/useQRCode'
import html2canvas from 'html2canvas'

const link = ref("https://bit.ly/3Rz9F1S")
const qrCode = useQRCode(link)

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
const bgColorClass = useColorClass('bg', activeColor, activeColorVariant)
const borderColorClass = useColorClass('border', activeColor, activeColorVariant)

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