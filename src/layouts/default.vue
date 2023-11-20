<template lang="pug">

.flex.flex-col.min-h-screen
  header

  main
    slot

  .flex-1.bg-base-200
    footer.footer.text-neutral-content
      .px-12.py-12.container.m-auto(class="md:px-4")
        //- .w-full.flex.justify-between.px-4
        .w-full.grid(class="md:gap-x-8 md:gap-y-4md:grid-cols-[100%_min-content_min-content]")
          //- DevOnly
            p githubProfileState: {{ githubProfileState }}
            p githubRepoState: {{ githubRepoState }}
          .row-span-2(class="md:row-start-1")
            LocaleSwitcher
          header.footer-title.self-start(class="md:row-start-1 max-md:mt-8 max-md:mb-4")
            h3 Social
          .self-center
            SocialLinkIcons(:links="socialLinks")
          header.footer-title.self-start(class="md:row-start-1 max-md:mt-8 max-md:mb-4")
            h3 Developer
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
