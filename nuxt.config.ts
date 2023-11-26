// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  devtools: { enabled: true },
  srcDir: './src',
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    'nuxt-appwrite',
    '@nuxtjs/i18n',
    'nuxt-gtag',
  ],
  appwrite: {
    endpoint: 'https://cloud.appwrite.io/v1',
    project: '649e961c38e05383c23d',
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lang",
      redirectOn: "root",
    },
  },
  runtimeConfig: {
    public: {
      googleSiteVerificationToken: ""
    }
  }
})
