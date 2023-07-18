import { createRouter, createWebHistory } from "vue-router"

import Landing from "../pages/Landing.vue"
import Home from "../pages/home.vue"
import Group from "../pages/group.vue"
import Invite from "../pages/Invite.vue"

export const router = createRouter({
    routes: [
        { path: "/", name: "Landing", component: Landing },
        { path: "/app", name: "Home", component: Home },
        { path: "/group", name: "Home", component: Home },
        { path: "/group/:groupID", name: "Group", component: Group },
        { path: "/invite/:groupID/:inviteID", name: "Invite", component: Invite }
    ],
    history: createWebHistory()
})