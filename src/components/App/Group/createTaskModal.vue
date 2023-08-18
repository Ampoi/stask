<template>
    <Modal
        :open="props.open"
        @update:open="(newOpen) => emit('update:open', newOpen)">
        <div class="flex flex-col gap-4 items-center h-full">
            <h1 class="text-3xl font-semibold">課題を追加する</h1>
            <ModalSection class="flex flex-row gap-4 w-full">
                <button
                    class="p-2 bg-white rounded-md text-center transition duration-150 basis-1/2"
                    :class="(editWith == 'EditWithText') ? 'text-black' : 'text-black/40'"
                    @click="editWith = 'EditWithText'">
                    テキスト
                </button>
                <button
                    class="p-2 bg-white rounded-md text-center transition duration-150 basis-1/2"
                    :class="(editWith == 'EditWithManual') ? 'text-black' : 'text-black/40'"
                    @click="editWith = 'EditWithManual'">
                    手動
                </button>
            </ModalSection>
            <component
                :is="edits[editWith]"
                :groupID="groupID"
                @addTask="(newTask: Task) => addTask(newTask)"/>
        </div>
    </Modal>
</template>
<script setup lang="ts">
import Modal from "../modal.vue"
import ModalSection from "../modal/section.vue"

import { Task } from "../../../models/task";

import useTasksAnalytics from "../../../hooks/useTasksAnalytics";

import EditWithManual from "./addTaskModal/editWithManual.vue"
import EditWithText from "./addTaskModal/editWithText.vue"
import { ref } from "vue";

const props = defineProps<{
    open: boolean
    groupID: string
}>()

const emit = defineEmits<{
    (e: "update:open", newOpen: boolean): void
    (e: "addTask", newTask: Task): void
}>()

const edits = { EditWithManual, EditWithText }
type EditComponent = keyof typeof edits

const editWith = ref<EditComponent>("EditWithText")

const { logTasksAnalytics } = await useTasksAnalytics()
function addTask(newTask: Task){
    logTasksAnalytics({
        name: "createTask",
        kadai_id: newTask.id
    })
    emit("addTask", newTask)
}
</script>