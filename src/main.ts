import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';

import '@/assets/main.css';

import { persist } from '@/store';

import App from './App.vue';

const pinia = createPinia();

pinia.use(persist);

createApp(App).use(pinia).mount('#app');
