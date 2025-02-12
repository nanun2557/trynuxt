// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path"
export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname,"/"),
  },
  css: ["~/assets/main.scss"],
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