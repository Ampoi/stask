// skl-blog/src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import app from "../pages/app.vue"
import home from "../pages/welcome.vue"
import login from "../pages/login.vue"
import updating from "../pages/nowUpdating.vue"
import contact from "../pages/contact.vue"

import { AuthRepository } from "../infra/AuthRepository";

const routes = [
  {
    path: "/",
    name: "App",
    component: app,
    meta: { requiresAuth: true }
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: home
  },
  {
    path: "/contact",
    name: "Contact",
    component: contact
  },
  {
    path: "/login",
    name: "Login",
    component: login
  },
  {
    path: "/updating",
    name: "Updating",
    component: updating
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _from, next)=>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth && !(await AuthRepository.isLogin())) {
    next({
      path: '/welcome',
      query: { redirect: to.fullPath }
    })
  }else{
    next()
  }
})

export default router;