import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import "./index.css"
import router from "./router"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
console.log(import.meta);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "tobe-ampoi.firebaseapp.com",
  projectId: "tobe-ampoi",
  storageBucket: "tobe-ampoi.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASURE
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(firebaseConfig).use(app).use(analytics)
  .mount('#app')
