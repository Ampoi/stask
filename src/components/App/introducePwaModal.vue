<template>
    <Modal v-model:open="open">
        <div class="flex flex-col gap-4 items-center h-full">
            <ModalTitle value="アプリ版の紹介"/>
            <p class="grow">
                「共有」ボタンを押して「ホーム画面に追加」を押すことでホーム画面にアプリとして追加することができます。
                アプリとして追加することでStaskをより快適に利用できるほか、課題を進めることを促す通知を出すことができます。
            </p>
            <ModalButton
                value="次回以降表示しない"
                icon="x-circle-fill"
                sub
                @button-clicked="doNotShow"/>
            <ModalButton
                value="閉じる"
                icon="x"
                @button-clicked="closeModal"/>
        </div>
    </Modal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Modal from './modal.vue';
import ModalTitle from "./modal/title.vue"
import ModalButton from "./modal/submitButton.vue"

import { useRoute } from 'vue-router';

//import ModalSection from "./modal/section.vue"

const open = ref(false)

const route = useRoute()
const { usingPWA } = route.query
if( usingPWA ) localStorage.setItem("noIntroduce", "true")
const noIntroduce = localStorage.getItem("noIntroduce")
if( !noIntroduce ){
    open.value = true
}

function closeModal(){
    open.value = false
}

function doNotShow(){
    localStorage.setItem("noIntroduce", "true")
    closeModal()
}
</script>