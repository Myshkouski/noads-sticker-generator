<template lang="pug">

.flex.items-center.space-x-4
  NuxtLink(:to="profile?.html_url" rel="external" target="_blank" class="hover:underline")
    .avatar
      .w-12.rounded-full.ring.ring-neutral.ring-offset-base-100.ring-offset-2(class="hover:ring-offset-4 transition-all")
        img(:src="avatarUrl")
  NuxtLink(:to="profile?.html_url" rel="external" target="_blank" class="hover:underline")
    p.font-bold
      | {{ profile?.name }}
      br
      | {{ profile?.login }}

</template>

<script setup lang="ts">
import type { GithubProfile } from '~/api/github';


const props = defineProps({
  profile: {
    type: Object as PropType<GithubProfile | null>,
  }
})

const avatarUrl = computed(() => {
  const profile = unref(props.profile)
  return profile ? profile.avatar_url : null
})

</script>
