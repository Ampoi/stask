<template>
    <div class="h-screen">
        <component :is="pages[nowPage]"/>
    </div>
    <LoginModal :showLoginModal="showLoginModal"/>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import LoginModal from '../components/loginModal.vue';

import CheckInvite from '../components/invite/checkInvite.vue';
import NotLogin from '../components/notLogin.vue';

import useAuth from '../hooks/useAuth';

const pages = { CheckInvite, NotLogin }
const nowPage = ref<keyof typeof pages>("NotLogin")
const showLoginModal = ref(false)

const { isLogin } = await useAuth()
if( isLogin ){
    nowPage.value = "CheckInvite"
}else{
    showLoginModal.value = true
}
</script>