<template>
    <Modal
        :open="props.open"
        @update:open="(newOpen) => emit('update:open', newOpen)">
        <div class="flex flex-col items-center gap-4 h-full">
            <h1 class="text-3xl font-semibold">グループの設定</h1>
            <div class="mx-4 grow w-full flex flex-col gap-4 overflow-y-auto">
                <NameSection v-model:name="newGroupSettings.name"/>
                <PermissionSection v-model:permissions="newGroupSettings.permissions"/>
                <SubjectSection v-model:subjects="newGroupSettings.subjects"/>
                <MemberSection v-model:members="newGroupSettings.members"/>
            </div>
            <button
                class="basis-16 min-h-[64px] w-full rounded-full bg-orange-300 text-white grid place-content-center"
                @click="submitNewSettings">
                <div class="flex flex-row gap-2 items-center">
                    <i class="bi bi-save text-2xl"/>
                    <span class="text-xl">設定を保存する</span>
                </div>
            </button>
        </div>
    </Modal>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

import Modal from "../modal.vue";

import NameSection from "./groupSettingsModal/nameSection.vue";
import SubjectSection from "./groupSettingsModal/subjectSection.vue";
import MemberSection from "./groupSettingsModal/memberSection.vue";
import PermissionSection from "./groupSettingsModal/permissionSection.vue";

import useGroupSettings from "../../../hooks/useGroupSettings";

const props = defineProps<{
    open: boolean
    groupID: string
}>()

const emit = defineEmits<{
    (e: "update:open", newOpen: boolean): void
}>()

const { groupSettings } = await useGroupSettings(props.groupID)

const newGroupSettings = ref({ ...groupSettings.value })

watch(() => props.open, () => {
    if( props.open ){
        newGroupSettings.value = { ...groupSettings.value }
    }
})

function submitNewSettings(){
    groupSettings.value = newGroupSettings.value
    emit("update:open", false)
}
</script>