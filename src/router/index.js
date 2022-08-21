// skl-blog/src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import app from "../pages/app.vue"

const routes = [
  {
    path: "/",
    name: "App",
    component: app,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;