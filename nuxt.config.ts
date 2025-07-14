import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      frontendUrl: process.env.NUXT_PUBLIC_FRONTEND_URL,
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
    },
  },
  nitro: {
    compressPublicAssets: true,
    preset: "aws-lambda",
    serveStatic: false,
  },
  modules: ["@nuxtjs/tailwindcss", "vuetify-nuxt-module"],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
});
