import { createRouter, createWebHistory } from "vue-router"

import Landing from "../pages/Landing.vue"
import Home from "../pages/Home.vue"
import Group from "../pages/Group.vue"
import Invite from "../pages/Invite.vue"

export const router = createRouter({
    routes: [
        { path: "/", name: "Landing", component: Landing },
        { path: "/home", name: "Home", component: Home },
        { path: "/group/", name: "Group", component: Group },
        { path: "/invite/", name: "Invite", component: Invite }
    ],
    history: createWebHistory()
})