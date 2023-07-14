<template>
    <Modal
        :open="props.open"
        @update:open="(newOpen) => emit('update:open', newOpen)">
        <div class="flex flex-col items-center gap-4 h-full">
            <h1 class="text-3xl font-semibold">グループの設定</h1>
            <div class="mx-4 grow w-full flex flex-col gap-4 overflow-y-auto">
                <div class="bg-gray-100 border-gray-200 border-[1px] rounded-lg p-4 flex flex-col gap-2">
                    <div class="flex flex-row gap-2 items-center p-2">
                        <p class="text-lg">グループ名</p>
                        <input
                            type="text"
                            class="p-2 rounded-md border-white border-[1px] bg-transparent grow"
                            v-model="newGroupSettings.name"
                            placeholder="学校 / 3-Aのグループ / etc...">
                    </div>
                </div>
                <div class="bg-gray-100 border-gray-200 border-[1px] rounded-lg p-4 flex flex-col gap-2">
                    <div
                        v-for="(subject, index) in newGroupSettings.subjects"
                        class="flex flex-row gap-2 items-center p-2">
                        <div
                            class="w-8 h-8 rounded-full border-4 border-solid"
                            :style="{
                                background: `${subject.color}50`,
                                borderColor: `${subject.color}20`
                            }"/>
                        <input
                            type="text"
                            class="p-2 rounded-md border-white border-[1px] bg-transparent grow"
                            v-model="newGroupSettings.subjects[index].name"
                            placeholder="教科の名前">
                        <button
                            class="w-8 h-8 rounded-full grid place-content-center text-red-400 bg-red-200/80">
                            <i class="bi bi-trash3 text-md"/>
                        </button>
                    </div>
                </div>
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
import Modal from "../modal.vue"

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