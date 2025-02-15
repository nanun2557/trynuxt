// https://nuxt.com/docs/api/configuration/nuxt-config
// import {resolve} from "path"
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  alias: {
    // "@": resolve(__dirname,"/"),
    assets: "/<rootDir>/assets"
  },
  css: ["~/assets/css/main.css"],
  ssr: false,
  modules: [
    '@pinia/nuxt',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
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