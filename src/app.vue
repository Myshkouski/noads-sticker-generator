<template lang="pug">

NuxtLayout
  NuxtPage

</template>

<script setup lang="ts">
import { provideClient as provideAppwriteClient } from '~/api/appwrite/client';

provideAppwriteClient()

useHead({
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  ]
})

</script>
