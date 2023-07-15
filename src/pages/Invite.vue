<template>
    <main class="w-screen h-screen grid place-content-center bg-gray-100">
        <div class="w-[calc(100vw-32px)] bg-white border-gray-200 border-[1px] mx-auto rounded-xl flex flex-col gap-4 items-center px-4 py-6">
            <p class="text-black/60">グループ</p>
            <h1 class="text-5xl font-bold">{{ "学校" }}</h1>
            <p class="text-black/60">に招待されています</p>
            <button
                class="py-2 px-3 rounded-md border-gray-100 border-[1px]"
                @click="joinInvitedGroup">
                グループに参加する
            </button>
        </div>
    </main>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
const { groupID, inviteID } = route.params
if( typeof groupID != "string" ){ throw new Error("GroupIDが正しくありません") }
if( typeof inviteID != "string" ){ throw new Error("InviteIDが正しくありません") }

function joinInvitedGroup(){

}
</script>