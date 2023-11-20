<template lang="pug">

.join.items-center
  .join-item
    Icon.text-3xl(:name="'circle-flags:' + currenLocale")
  select.font-semibold.join-item.select.bg-transparent(class="focus:outline-none" @change="onCurrentLocaleChange($event)")
    //- option(v-if="currentLanguageRef" selected disabled :value="currentLanguageRef.code")
      span {{ currentLanguageRef.displayName || getLocaleCodeOrIso(currentLanguageRef) }}
    option.bg-base-300(
      v-for="locale in availableLocales" 
      :value="locale" 
      :selected="!!currenLocale ? locale == currenLocale : false"
    )
      span {{ getLanguageName(locale) || locale }}

</template>

<script setup lang="ts">

const { locale: currenLocale, locales: availableLocales } = useI18n();

const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
const route = useRoute();

const onCurrentLocaleChange = (event: Event) => {
  const target = event?.target;
  if (!(target instanceof HTMLSelectElement)) return;
  const newRoute = {
    query: route.query,
    hash: route.hash,
    path: switchLocalePath(target.value),
  };
  router.push(newRoute);
};

const capitalize = (value: Nullable<string>) => {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const intlDisplayNames = computed(() => {
  const locales = unref(availableLocales) as string[]
  return new Intl.DisplayNames(locales, { type: "language" })
})

const getLanguageName = (locale: string) => {
  const displayName = unref(intlDisplayNames).of(locale)
  return capitalize(displayName)
}

</script>