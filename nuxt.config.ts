// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['nuxt-swiper','@pinia/nuxt', '@nuxtjs/i18n'],
    i18n: {
        defaultLocale: 'ru',
        locales: [
            {
                name: 'uz',
                code: 'uz'
            },
            {
                name: 'ru',
                code: 'ru'
            },
        ]
    },
    runtimeConfig:{
        public:{
            baseUrl: 'http://shop/api'
        }
    },
    css: ['~/assets/scss/main.scss',],
    ssr: false
})

