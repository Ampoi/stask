<template>
    <div class="bg-gray-100 w-screen h-screen px-6 py-12 box-border flex flex-col gap-4 items-stretch">
        <div class="overflow-y-auto max-h-[calc(100%-64px)] grow">
            <component
                :is="pages[nowPage]"
                :groupID="groupID"
                ref="groupPage"/>
        </div>
        <NavBar
            :now-page="nowPage"
            @addTask="addTask()"/>
    </div>
    <LoginModal
        :showLoginModal="showLoginModal"/>
</template>
<script setup lang="ts">
import { ref } from "vue";

import useAuth from "../hooks/useAuth"

import NavBar from "../components/App/NavBar.vue"
import LoginModal from "../components/loginModal.vue";

import Group from "../components/App/Group.vue"
import NotLogin from "../components/App/notLogin.vue"

import { useRoute } from "vue-router";

const pages = {
    group: Group,
    notLogin: NotLogin
}

const nowPage = ref<keyof typeof pages>("notLogin")

const showLoginModal = ref(false)

const groupID = ref<string | undefined>()

const { isLogin } = await useAuth()
if( !isLogin ){
    nowPage.value = "notLogin"
    showLoginModal.value = true
}else{
    const route = useRoute()
    if(typeof route.params.groupID == "string"){
        groupID.value = route.params.groupID
        nowPage.value = "group"
    }else{
        console.log("oh,");
    }
}

const groupPage = ref()
function addTask(){
    groupPage.value.$.exposed.addTask()
}
</script>