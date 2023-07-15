import { createRouter, createWebHistory } from "vue-router"

import Landing from "../pages/Landing.vue"
import Home from "../pages/Home.vue"
import Invite from "../pages/Invite.vue"

export const router = createRouter({
    routes: [
        { path: "/", name: "Landing", component: Landing },
        { path: "/app/:groupID", name: "Home", component: Home },
        { path: "/invite/:groupID/:inviteID", name: "Invite", component: Invite }
    ],
    history: createWebHistory()
})