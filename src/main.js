import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// Тема Bootswatch Lumen для Bootstrap (https://bootswatch.com/lumen/)
import "@/bootstrap/bootstrap-lumen.min.css";

import App from "./App.vue";

const pinia = createPinia();

const installPersistedStatePlugin = createPersistedStatePlugin();
pinia.use((context) => installPersistedStatePlugin(context));

createApp(App).use(pinia).mount("#app");
