<template lang="pug">

header

main
  slot

footer.footer.p-12.bg-base-300.text-neutral-content
  .container.m-auto.flex.justify-between
    aside.space-y-4
      header.footer-title DEVELOPED BY
      .flex.items-center.space-x-4
        .avatar
          .w-12.rounded-full.ring.ring-primary.ring-offset-base-100.ring-offset-2
            img(:src="avatarUrl")

        p.font-bold
          | Alexei
          br
          | Myshkouski
    nav.space-y-4
      header.footer-title Links
      .grid.grid-flow-col.gap-4.text-xl
        NuxtLink(v-for="link in socialLinks" :to="link.url" target="_blank" rel="external")
          Icon(:name="link.icon" size="1.75rem")

</template>

<script setup lang="ts">

interface SocialLink {
  url: string
  icon: string
}

const avatarUrl = ref("https://avatars.githubusercontent.com/myshkouski")

const socialLinks: SocialLink[] = [
  {
    url: "https://github.com/Myshkouski/noads-sticker-generator",
    icon: "cib:github"
  },
  {
    url: "https://t.me/alexeimyshkouski",
    icon: "akar-icons:telegram-fill"
  }
]

</script>
