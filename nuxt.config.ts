// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: 'My application',
      titleTemplate: '%s | by Jom'
    }
  },
  compatibilityDate: '2025-02-12',
  devtools: { enabled: true },
  $development: {
    app: {
      head: {
        title: 'DEV',
      }
    },    
  },
  $production: {
    app: {
      head: {
        title: 'PRD',
      }
    }, 
  }
})