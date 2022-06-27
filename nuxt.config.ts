import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/main.css'],
  vite: {
    plugins: [
      eslintPlugin(),
    ],
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ['lottie-player'].includes(tag),
    },
  },
})
