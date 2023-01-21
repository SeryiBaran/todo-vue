import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";

import '@/assets/water.css'
import '@/assets/main.css'

import App from "./App.vue";

const pinia = createPinia();

const installPersistedStatePlugin = createPersistedStatePlugin();
pinia.use((context) => installPersistedStatePlugin(context));

createApp(App).use(pinia).mount("#app");
