import { createRouter, createWebHistory } from "vue-router"

import Landing from "../pages/Landing.vue"
import Home from "../pages/home.vue"
import Group from "../pages/group.vue"
import Invite from "../pages/Invite.vue"
import NotFound from "../pages/notFound.vue"
import Login from "../pages/login.vue"

export const router = createRouter({
    routes: [
        { path: "/", name: "Landing", component: Landing },
        { path: "/:home(app|group)", name: "Home", component: Home },
        { path: "/group/:groupID", name: "Group", component: Group },
        { path: "/invite/:groupID/:inviteID", name: "Invite", component: Invite },
        { path: "/login", name: "Login", component: Login }, 
        { path: "/:catchAll(.*)", name: "NotFound", component: NotFound }
    ],
    history: createWebHistory()
})