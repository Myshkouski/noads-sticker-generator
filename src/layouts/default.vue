<template lang="pug">

.flex.flex-col.min-h-screen
  header

  main
    slot

  .flex-1.bg-base-200
    footer.footer.p-12.text-neutral-content
      .container.m-auto.flex.justify-between.px-4
        aside.space-y-4
          header.footer-title DEVELOPED BY
          ClientOnly
            GithubRepoDeveloper(:profile="githubProfile")
          DevOnly
            p githubProfileState: {{ githubProfileState }}
            p githubRepoState: {{ githubRepoState }}
        nav.space-y-4
          header.footer-title Social
          .grid.grid-flow-col.gap-4.text-xl
            NuxtLink(v-for="link in socialLinks" :to="link.url" target="_blank" rel="external")
              Icon(:name="link.icon" size="1.75rem")

</template>

<script setup lang="ts">

interface SocialLink {
  url: string
  icon: string
}

const githubRepoName = computed(() => "Myshkouski/noads-sticker-generator")
const githubRepoState = useGithubRepo(githubRepoName)
const { state: githubRepo } = githubRepoState

const githubRepoOwner = computed(() => {
  return unref(githubRepo)?.owner
})
const githubRepoOwnerLogin = computed(() => {
  const login = unref(githubRepoOwner)?.login
  console.debug( "login: " + login)
  return login
})

const githubProfileState = useGithubProfile(githubRepoOwnerLogin)
const { state: githubProfile } = githubProfileState

const githubProjectHtmlUrl = computed(() => {
  const githubProjectValue = unref(githubRepo)
  if (!githubProjectValue) return null
  const value: SocialLink = {
    url: githubProjectValue.html_url,
    icon: "cib:github"
  }
  return value
})

const telegramLink = ref<SocialLink>({
  url: "https://t.me/alexeimyshkouski",
  icon: "akar-icons:telegram-fill"
})

const socialLinks = computed(() => {
  const links = [
    unref(githubProjectHtmlUrl),
    unref(telegramLink)
  ].filter(link => !!link) as SocialLink[]

  return links
})

</script>
