<template lang="pug">

NuxtLayout
  .h-screen.flex.flex-col.justify-center
    .container.mx-auto
      .px-4.space-y-16
        .space-y-4
          p(v-if="error").text-8xl {{ error?.statusCode }}
          p.text-2xl Something went wrong
        div
          button.btn.btn-neutral(@click="handleError")
            Icon.text-2xl(name="material-symbols:home-rounded")
            span Back to home

</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
