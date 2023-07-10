<template>
    <div class="bg-gray-100 w-screen h-screen px-6 py-12 box-border relative">
        <component :is="pages[nowPage]"/>
        <NavBar
            class="absolute"
            :now-page="nowPage"/>
        {{ isLogin }}
        <Modal
            :open="showLoginModal">
            <h2>ログイン</h2>
            <p>Staskを利用するにはログインしてください</p>
            <button @click="login()">Googleでログイン</button>
        </Modal>
        <button @click="logout(router)">aa</button>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import useAuth from "../hooks/useAuth"

import NavBar from "../components/App/NavBar.vue"
import Modal from "../components/App/modal.vue";

import Group from "../components/App/Group.vue"
import { router } from "../router";

const pages = {
    group: Group
}

const nowPage: keyof typeof pages = "group"

const showLoginModal = ref(false)

const { isLogin, login, logout } = await useAuth()
if( !isLogin ){ showLoginModal.value = true }
</script>