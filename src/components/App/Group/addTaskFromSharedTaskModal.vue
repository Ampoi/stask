<template>
    <Modal
        :open="props.open"
        @update:open="(newOpen) => emit('update:open', newOpen)">
        <div class="flex flex-col gap-4 items-center h-full">
            <h1 class="text-3xl font-semibold">追加する課題を選択</h1>
            <div class="grow flex flex-col w-full">
                <button
                    class="mb-2 border-gray-200 border-2 text-gray-400 p-4 rounded-md flex flex-row gap-2 justify-center items-center"
                    @click="createTask">
                    <i class="bi bi-journal-plus text-2xl"/>
                    <p>課題を新しく作成する</p>
                </button>
                <div
                    v-for="task in tasks"
                    :key="task.id">
                    <SharedTaskButton 
                        v-if="!task.deleted && !task.workon.includes(uid)"   
                        :task="task"
                        :groupID="groupID"
                        :isInQue="que.includes(task.id)"
                        @selected="addTaskToQue(task.id)"
                        class="mb-2"/>
                </div>
            </div>
            <button
                class="basis-16 min-h-[64px] w-full rounded-full bg-orange-300 text-white grid place-content-center"
                @click="addTask">
                <div class="flex flex-row gap-2 items-center">
                    <i class="bi bi-journal-plus text-2xl"/>
                    <span class="text-xl">選択した課題を追加する</span>
                </div>
            </button>
        </div>
    </Modal>
    <CreateTaskModal
        v-model:open="showCreateTaskModal"
        :groupID="groupID"
        @createTask="addCreatedTask"/>
</template>
<script setup lang="ts">
import Modal from "../modal.vue"

import useTasks from "../../../hooks/useTasks";
import SharedTaskButton from "./addTaskFromSharedTaskModal/sharedTaskButton.vue"
import useAuth from "../../../hooks/useAuth";

import CreateTaskModal from "./createTaskModal.vue";
import { ref } from "vue";
import { Task } from "../../../models/task";


//import useTasksAnalytics from "../../../hooks/useTasksAnalytics";

const props = defineProps<{
    open: boolean
    groupID: string
}>()

const emit = defineEmits<{
    (e: "update:open", newOpen: boolean): void
}>()

const que = ref<`${string}-${string}`[]>([])
const addTaskToQue = (taskID: `${string}-${string}`) => {
    if( que.value.includes(taskID) ){
        que.value = que.value.filter((id) => id != taskID)
    }else{
        que.value.push(taskID)
    }
}

const { tasks } = await useTasks(props.groupID)
const { getUserData } = await useAuth()
const { uid } = await getUserData()

const showCreateTaskModal = ref(false)
function createTask(){
    showCreateTaskModal.value = true
}

function addCreatedTask(task: Task){
    tasks.value.push(task)
    showCreateTaskModal.value = false
}

//const { logTasksAnalytics } = await useTasksAnalytics()
function addTask(){
    /*logTasksAnalytics({
        name: "createTask",
        kadai_id: newTask.id
    })*/
    que.value.forEach((taskID: `${string}-${string}`) => {
        if( !tasks.value.find((task) => task.id == taskID) ){
            console.log("タスクが見つかりませんでした")
        }else{
            tasks.value.find((task) => task.id == taskID)?.workon.push(uid)
        }
    })
    emit("update:open", false)
}
</script>