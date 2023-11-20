<template lang="pug">

.space-x-6.flex
  div(v-for="link in links")
    NuxtLink(:to="link.url" target="_blank" rel="external")
      Icon.text-4xl.rounded-full.ring.ring-neutral.ring-offset-base-100.ring-offset-2(:name="link.icon" class="hover:ring-offset-4 transition-all")

</template>

<script setup lang="ts">
import type { SocialLink } from '~/models'

const props = defineProps({
  links: {
    type: Array as PropType<SocialLink[]>,
    required: true
  }
})

const links = computed(() => props.links)

</script>
