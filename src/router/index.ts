// skl-blog/src/router/index.js
import {createRouter, createWebHistory} from "vue-router";
import app from "../pages/app.vue"
import home from "../pages/welcome.vue"
import login from "../pages/login.vue"
import updating from "../pages/nowUpdating.vue"
import {AuthRepository} from "../infra/AuthRepository";
import {ServerStatusRepository} from "../infra/ServerStatusRepository";

const routes = [
    {
        path: "/",
        name: "App",
        component: app,
        meta: {requiresAuth: true}
    },
    {
        path: "/welcome",
        name: "Welcome",
        component: home,
        meta: {requiresAuth: true}
    },
    {
        path: "/login",
        name: "Login",
        component: login
    },
    {
        path: "/updating",
        name: "Updating",
        component: updating,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (await ServerStatusRepository.nowUpdating()) {
        next({path: "/updating"});
        return
    }
    const requiresAuth = to.matched.some(recode => recode.meta.requiresAuth);
    if (requiresAuth || !AuthRepository.isLogin()) {
        next({path: "/login", query: {redirect: to.fullPath}});
    } else {
        next();
    }
});

export default router;