<template>
    <Modal
        :open="props.open"
        @update:open="(newOpen) => emit('update:open', newOpen)">
        <div class="flex flex-col gap-4 items-center h-full">
            <h1 class="text-3xl font-semibold">追加する課題を選択</h1>
            <div class="flex flex-col w-full">
                <div
                    v-for="task in tasks"
                    :key="task.id">
                    <SharedTaskButton 
                        v-if="!task.deleted && !task.workon.includes(uid)"   
                        :task="task"
                        :groupID="groupID"
                        @selected="addTask(task.id)"
                        class="mb-2"/>
                </div>
            </div>
        </div>
    </Modal>
</template>
<script setup lang="ts">
import Modal from "../modal.vue"

import useTasks from "../../../hooks/useTasks";
import SharedTaskButton from "./addTaskFromSharedTaskModal/sharedTaskButton.vue"
import useAuth from "../../../hooks/useAuth";

//import useTasksAnalytics from "../../../hooks/useTasksAnalytics";

const props = defineProps<{
    open: boolean
    groupID: string
}>()

const emit = defineEmits<{
    (e: "update:open", newOpen: boolean): void
}>()

const { tasks } = await useTasks(props.groupID)
const { getUserData } = await useAuth()
const { uid } = await getUserData()

//const { logTasksAnalytics } = await useTasksAnalytics()
function addTask(newTaskID: `${string}-${string}`){
    /*logTasksAnalytics({
        name: "createTask",
        kadai_id: newTask.id
    })*/
    if( !tasks.value.find((task) => task.id == newTaskID) ){
        console.log("タスクが見つかりませんでした")
    }else{
        tasks.value.find((task) => task.id == newTaskID)?.workon.push(uid)
    }
    emit("update:open", false)
}
</script>