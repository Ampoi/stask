<template>
    <div class="bg-gray-100 w-screen h-screen px-6 py-12 box-border flex flex-col gap-4 items-stretch">
        <div class="overflow-y-auto max-h-[calc(100%-64px)] grow">
            <component
                :is="pages[nowPage]"/>
        </div>
        <NavBar/>
    </div>
    <LoginModal
        :showLoginModal="showLoginModal"/>
</template>
<script setup lang="ts">
import { ref } from "vue";

import useAuth from "../hooks/useAuth"

import NavBar from "../components/App/NavBar.vue"
import LoginModal from "../components/loginModal.vue";

import Home from "../components/App/home.vue"
import NotLogin from "../components/notLogin.vue"

const pages = { Home, NotLogin }

const nowPage = ref<keyof typeof pages>("NotLogin")

const showLoginModal = ref(false)

const { isLogin } = await useAuth()
if( !isLogin ){
    nowPage.value = "NotLogin"
    showLoginModal.value = true
}else{
    nowPage.value = "Home"
}
</script>