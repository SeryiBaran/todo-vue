import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';
import PrimeVue from 'primevue/config';
import { useDark, useToggle } from '@vueuse/core'

import 'gardevoir';
// import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '@/assets/main.css';

import { persist } from '@/store';
import App from './App.vue';

const isDark = useDark()

const pinia = createPinia();

pinia.use(persist);

createApp(App).use(pinia).use(PrimeVue, { ripple: true }).mount('#app');

(async () => {
  if (isDark) {
    await import('primevue/resources/themes/lara-dark-blue/theme.css');
  } else {
    await import('primevue/resources/themes/lara-light-blue/theme.css');
  }
})();
