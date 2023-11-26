<template lang="pug">

NuxtLayout
  NuxtLoadingIndicator 
    span.loading-lg
  NuxtPage

</template>

<script setup lang="ts">
const { href: faviconHref } = useLink({
  to: "/favicon.svg"
})

useHead({
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  ],
  link: [
    {
      rel: "icon",
      href: faviconHref
    }
  ]
})

</script>

<style>
.page-enter-active, .page-leave-active {
  transition: all 0.4s;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
  filter: blur(.2rem);
}
</style>
