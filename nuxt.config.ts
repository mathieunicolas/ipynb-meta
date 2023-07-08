// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', '@vueuse/nuxt'],
    ui: {
      safelistColors: ['orange', 'green', 'red', 'teal'],
      icons: 'all'
  },
  app: {
    head: {
      title: "IPYNB - meta",
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      noscript: [
        { children: 'JavaScript is required' }
      ]
    }
}

})
