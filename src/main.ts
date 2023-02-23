import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import "./index.css"
import router from "./router"
import { registerSW } from "virtual:pwa-register"

loadFonts()

registerSW()

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
