<template lang="pug">

.sticker.shadow-xl.rounded-2xl.join(class="w-[48em] min-h-[16rem]")
  .sticker-label.join-item.p-8.flex.flex-col.justify-end.transition-colors
    p.text-4xl.text-white
      | NO
      br
      | ADS
  .sticker-text.join-item.p-8.flex.flex-col.justify-end.flex-1.bg-white
    p.text-4xl.transition-colors.whitespace-pre-wrap {{ text }}
  .sticker-share.join-item.p-8.flex.flex-col.justify-end.bg-white
    .space-y-2(class="min-w-[6rem]" :class="{ 'opacity-0': !qrCode }")
      p.text-center.text-sm.text-primary-content(v-if="linkText") {{ linkText }}
      img.m-auto.rounded-lg.overflow-hidden.border-2.border-black(:src="qrCode ?? undefined" :alt="linkHref")

</template>

<script setup lang="ts">
interface Link {
  readonly href: string
  readonly text?: Nullable<string>
}

const props = defineProps({
  text: {
    type: String as PropType<Nullable<string>>,
    default: null,
  },
  link: {
    type: Object as PropType<Nullable<Link>>,
    required: false,
  },
  primaryColor: {
    type: String as PropType<Nullable<string>>,
    required: false,
    default: "unset"
  },
})
const linkHref = computed(() => props.link?.href)
const linkText = computed(() => props.link?.text)
const qrCode = useQrCode(linkHref)

const primaryColor = computed(() => props.primaryColor)

</script>

<style scoped lang="sass">
.sticker-label
  background-color: v-bind(primaryColor)

.sticker-text p
  color: v-bind(primaryColor)
</style>
