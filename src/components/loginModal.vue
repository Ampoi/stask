<template>
    <Modal
        :open="props.showLoginModal"
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
import Modal from './App/modal.vue';

import useAuth from '../hooks/useAuth';

const props = defineProps<{
    showLoginModal: boolean
}>()

const { login } = await useAuth()
</script>