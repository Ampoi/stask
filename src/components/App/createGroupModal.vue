<template>
    <Modal
        :open="props.open"
        @update:open="(newOpen) => emit('update:open', newOpen)">
        <div class="flex flex-col items-center gap-4 h-full">
            <h1 class="text-3xl font-semibold">グループを作成する</h1>
            <div class="mx-4 grow w-full flex flex-col gap-4 overflow-y-auto">
                <NameSection v-model:name="newGroup.settings.name"/>
                <NoteSection v-model:note="newGroup.settings.note"/>
            </div>
            <button
                class="basis-16 min-h-[64px] w-full rounded-full bg-orange-300 text-white grid place-content-center"
                @click="createGroup()">
                <div class="flex flex-row gap-2 items-center">
                    <i class="bi bi-plus text-3xl"/>
                    <span class="text-xl">グループを作成</span>
                </div>
            </button>
        </div>
    </Modal>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import Modal from './modal.vue';

import NameSection from './Group/groupSettingsModal/nameSection.vue';
import NoteSection from './Group/groupSettingsModal/noteSection.vue';

import { Group } from "../../models/group"
import useAuth from '../../hooks/useAuth';

const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    (e: "update:open", newOpen: boolean): void
}>()

const { isLogin, getUserData } = await useAuth()
if( !isLogin ){ throw new Error("ログインしていません！") }
const { uid, userName, userIcon } = await getUserData()

const newGroup = ref(Group.create(uid, userName, userIcon))

function createGroup(){
    console.log("createGroup!");
    console.log(newGroup.value) //TODO:グループを作成するときの処理の追加
}
</script>