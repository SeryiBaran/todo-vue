import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';
import PrimeVue from 'primevue/config';

import 'gardevoir';
// import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import '@/assets/main.css';

import { persist } from '@/store';

import App from './App.vue';

const pinia = createPinia();

pinia.use(persist);

createApp(App).use(pinia).use(PrimeVue, { ripple: true }).mount('#app');

(async () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    await import('primevue/resources/themes/lara-dark-blue/theme.css');
  } else {
    await import('primevue/resources/themes/lara-light-blue/theme.css');
  }
})();
