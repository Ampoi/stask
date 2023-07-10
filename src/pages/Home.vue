<template>
    <div class="bg-gray-100 w-screen h-screen px-6 py-12 box-border relative">
        <component :is="pages[nowPage]"/>
        <NavBar
            class="absolute"
            :now-page="nowPage"/>
        <Modal
            :open="showLoginModal">
            <h2>ログイン</h2>
            <p>Staskを利用するにはログインしてください</p>
            <button @click="login()">Googleでログイン</button>
        </Modal>
    </div>
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

const nowPage = ref<keyof typeof pages>("group")

const showLoginModal = ref(false)

const { isLogin, login } = await useAuth()
if( !isLogin ){
    nowPage.value = "notLogin"
    showLoginModal.value = true
}
</script>