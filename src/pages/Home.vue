<template>
    <div class="bg-gray-100 w-screen h-screen px-6 py-12 box-border relative">
        <component :is="pages[nowPage]"/>
        <NavBar
            class="absolute"
            :now-page="nowPage"/>
        {{ isLogin }}
    </div>
</template>
<script setup lang="ts">
import useAuth from "../hooks/useAuth"

import NavBar from "../components/App/NavBar.vue"

import Group from "../components/App/Group.vue"

const pages = {
    group: Group
}

const nowPage: keyof typeof pages = "group"

const { isLogin } = await useAuth()
</script>