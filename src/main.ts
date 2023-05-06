import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useDark } from '@vueuse/core'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

import '@/assets/main.css'
import App from './App.vue'

const isDark = useDark()

const pinia = createPinia()
const persist = createPersistedStatePlugin()
pinia.use(persist)

createApp(App).use(pinia).mount('#app')
