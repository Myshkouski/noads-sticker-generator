<template lang="pug">

.sticker.shadow-xl.rounded-2xl.join(class="w-[44em]")
  .sticker-label.join-item.p-8.flex.flex-col.justify-end.transition-colors
    p.text-4xl.text-white
      | NO
      br
      | ADS
  .sticker-text.join-item.p-8.bg-white
    p.text-4xl.transition-colors {{ text }}
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
    type: String,
    required: true,
  },
  link: {
    type: Object as PropType<Link>,
    required: false,
  },
  primaryColor: {
    type: String,
    required: true,
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
  white-space: pre-wrap
</style>
