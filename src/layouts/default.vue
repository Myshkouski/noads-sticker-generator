<template lang="pug">

.flex.flex-col.min-h-screen
  header

  main
    slot

  .flex-1.bg-base-200
    footer.footer.text-neutral-content
      .px-4.py-12.container.m-auto
        //- .w-full.flex.justify-between.px-4
        .w-full.grid.gap-x-8.gap-y-4(class="grid-cols-[1fr_min-content]")
          header.footer-title.self-start Social
          header.footer-title.self-start DEVELOPED BY
          //- DevOnly
            p githubProfileState: {{ githubProfileState }}
            p githubRepoState: {{ githubRepoState }}
          .self-center
            SocialLinkIcons(:links="socialLinks")
          .self-center
            ClientOnly
              GithubRepoDeveloper(:profile="githubProfile")

</template>

<script setup lang="ts">
import type { SocialLink } from '~/models'

const githubRepoName = computed(() => "Myshkouski/noads-sticker-generator")
const githubRepoState = useGithubRepo(githubRepoName)
const { state: githubRepo } = githubRepoState

const githubRepoOwner = computed(() => {
  return unref(githubRepo)?.owner
})
const githubRepoOwnerLogin = computed(() => {
  const login = unref(githubRepoOwner)?.login
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
