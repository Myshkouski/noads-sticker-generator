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

const i18nHead = useLocaleHead({
  // seo: {}
})

useHead(() => {
  return {
    htmlAttrs: {
      ...i18nHead.value.htmlAttrs
    },
    meta: [
      ...i18nHead.value.meta,
    ],
    link: [
      ...i18nHead.value.link,
      {
        rel: "icon",
        href: faviconHref
      }
    ]
  }
})

useSeoMeta({
  googleSiteVerification: useGoogleSiteVerificationToken(),
  viewport: {
    width: "device-width",
    initialScale: 1
  },
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
