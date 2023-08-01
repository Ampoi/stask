import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import "bootstrap-icons/font/bootstrap-icons.css"
import "./style.css"
import { loadFonts } from "./plugins/webfontloader"
import { registerSW } from 'virtual:pwa-register'

loadFonts()
registerSW();

createApp(App)
    .use(router)
    .mount('#app')