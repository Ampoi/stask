<template>
    <Modal
        :open="props.open"
        @update:open="(newOpen) => emit('update:open', newOpen)">
        <div class="flex flex-col items-center gap-4 h-full">
            <ModalTitle value="グループを作成する"/>
            <div class="mx-4 grow w-full flex flex-col gap-4 overflow-y-auto">
                <ModalSection>
                    <div class="flex flex-row gap-2 items-center p-2">
                        <p class="text-lg">グループID</p>
                        <input
                            type="text"
                            class="p-2 rounded-md border-white border-[1px] bg-transparent grow max-w-[calc(100%-100px)]"
                            pattern="^[0-9a-zA-Z]+$"
                            required
                            :value="newGroupID"
                            @input="(event: any) => newGroupID = event.target.value"
                            placeholder="半角英数字...">
                    </div>
                </ModalSection>
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
import ModalTitle from "./modal/title.vue"
import ModalSection from "./modal/section.vue"

import NameSection from './Group/groupSettingsModal/nameSection.vue';
import NoteSection from './Group/groupSettingsModal/noteSection.vue';

import { Group } from "../models/group"
import useAuth from '../hooks/useAuth';
import { createGroupRepository } from "../infra/createGroupRepository";
import useGroups from '../hooks/useGroups';
import { createUid } from '../utils/createUid';

const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    (e: "update:open", newOpen: boolean): void
}>()

const { isLogin, getUserData } = await useAuth()
if( !isLogin ){ throw new Error("ログインしていません！") }
const { uid, userName, userIcon } = await getUserData()

const newGroupID = ref("")
const newGroup = ref(Group.create(uid, userName, userIcon))

async function createGroup(){
    console.log("createGroup!");
    if( newGroupID.value == "" ){
        console.log("groupIDがないです！！")
    }else if( /[^a-zA-Z]/.test(newGroupID.value) ){
        console.log("半角英字以外の文字が含まれています！")
    }else{
        const groupInviteKey = createUid()
        newGroup.value.settings.invites[groupInviteKey] = { expires: "2023-12-30" }
        
        const result = await createGroupRepository({ groupID: newGroupID.value, groupData: newGroup.value })
        if(result.data){
            console.error(result.data)
        }else{
            const { addGroupToList } = await useGroups()
            addGroupToList(newGroupID.value)
            emit("update:open", false)
        }
    }
}
</script>