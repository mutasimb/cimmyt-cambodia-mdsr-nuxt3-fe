// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com"
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
        }
      ]
    }
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "vue-custom-scrollbar/dist/vueScrollbar.css",
    "vue3-carousel/dist/carousel.css",
    "@/assets/css/main.scss"
  ],
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "nuxt3-leaflet"
  ],
  build: {
    transpile: ["vuetify"]
  },
  runtimeConfig: {
    public: {
      SERVER: process.env.SERVER,
      FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
      FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
      FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
      FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
      FIREBASE_APPID: process.env.FIREBASE_APPID
    }
  },
  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "no_prefix",
    locales: [
      { code: "en-US", iso: "en-US", name: "English (US)", file: "en_US.json" },
      { code: "km-KH", iso: "km-KH", name: "Khmer", file: "km_KH.json" },
    ]
  }
})
