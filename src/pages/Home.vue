<template>
    <div class="bg-gray-100 w-screen h-screen px-6 py-12 box-border relative flex flex-col gap-4">
        <component
            :is="pages[nowPage]"
            ref="groupPage"
            class="overflow-y-auto"/>
        <NavBar
            class="absolute"
            :now-page="nowPage"
            @addTask="addTask()"/>
    </div>
    <Modal
        :open="showLoginModal"
        class="text-center">
        <h2 class="text-4xl font-bold">ログイン</h2>
        <p class="mt-2">Staskを利用するにはログインしてください</p>
        <div class="max-w-[240px] flex flex-col items-stretch mx-auto mt-4 gap-2">
            <button @click="login()">
                <img src="../assets/sign_in_with_google.png">
            </button>
            <RouterLink
                to="/"
                class="px-4 py-3 border-gray-100 border-2 rounded-md flex flex-row gap-2 items-baseline justify-center">
                <i class="bi bi-door-closed"/>
                <p>紹介ページにいく</p>
            </RouterLink>
        </div>
    </Modal>
</template>
<script setup lang="ts">
import { ref } from "vue";

import useAuth from "../hooks/useAuth"

import NavBar from "../components/App/NavBar.vue"
import Modal from "../components/App/modal.vue";

import Group from "../components/App/Group.vue"
import NotLogin from "../components/App/notLogin.vue"

const pages = {
    group: Group,
    notLogin: NotLogin
}

const nowPage = ref<keyof typeof pages>("notLogin")

const showLoginModal = ref(false)

const { isLogin, login } = await useAuth()
if( !isLogin ){
    nowPage.value = "notLogin"
    showLoginModal.value = true
}else{
    nowPage.value = "group"
}

const groupPage = ref()
function addTask(){
    groupPage.value.$.exposed.addTask()
}
</script>