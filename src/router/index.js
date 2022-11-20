// skl-blog/src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import app from "../pages/app.vue"
import home from "../pages/welcome.vue"
import login from "../pages/login.vue"

const routes = [
  {
    path: "/",
    name: "App",
    component: app,
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: home
  },
  {
    path: "/login",
    name: "Login",
    component: login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;