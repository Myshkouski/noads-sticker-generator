<template lang="pug">

.w-full.relative.carousel-wrapper.overflow-hidden
  .max-w-full.space-x-4.px-4(class="max-md:carousel md:flex")
    .my-2(v-for="button in buttons" :key="button.color")
      button.btn-circle.shadow-xl(
        :style="`background-color: ${ button.bgColor }`"
        :class="' ring ring-offset-2 ring-offset-base-100 hover:ring-neutral-content hover:ring-offset-4 transition-all ' + (activeColor == button.color ? ' ring-neutral-content ' : ' ring-transparent ')"
        @click="updateActiveColor(button.color)"
      )

</template>

<script setup lang="ts">

const props = defineProps({
  colors: {
    type: Array as PropType<string[]>,
    default: []
  },
  activeColor: {
    type: String as PropType<Nullable<string>>,
    default: null
  },
  activeColorVariant: {
    type: Number as PropType<Nullable<number>>,
    default: null
  },
})

const colors = computed(() => props.colors)

interface Button {
  color: string
  bgColor?: Nullable<string>
}

const activeColorVariant = computed(() => props.activeColorVariant)

const buttons = computed(() => {
  const colorVariant = activeColorVariant.value
  return colors.value.map(color => {
    const button: Button = { color, bgColor: getTailwindColor(color, colorVariant) }
    return button
  })
})

const emit = defineEmits<{
  (event: "update:activeColor", color: string): void
}>()

const updateActiveColor = (color: string) => emit("update:activeColor", color)
</script>
