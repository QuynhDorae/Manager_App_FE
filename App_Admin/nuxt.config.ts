// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-primevue'
  ],
  css: [
    'primevue/resources/themes/aura-light-green/theme.css',
    '@unocss/reset/tailwind.css',
  ]
})
