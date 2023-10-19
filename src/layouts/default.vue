<template lang="pug">

header
  .container.m-auto
    .flex.justify-end.p-4
      NuxtLink(:to="githubUrl" target="_blank" rel="external")
        button.btn.btn-neutral
          Icon(name="mdi:github" size="1.5em")
          span Github
main
  slot

</template>

<script setup lang="ts">

const githubUrl = ref("https://github.com/Myshkouski/noads-sticker-generator")

</script>
