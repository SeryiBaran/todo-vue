import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/700.css'

import '@/assets/main.css'
import App from './App.vue'
import { config as i18nConfig } from './i18n'

const pinia = createPinia()
pinia.use(createPersistedStatePlugin())

const i18n = createI18n(i18nConfig)

const app = createApp(App)
app.use(i18n)
app.use(pinia)
app.mount('#app')
