<template>
    <ModalSection class="mx-4 grow w-full flex flex-col gap-4 overflow-y-auto">
        <div class="flex flex-col gap-2 items-start p-2">
            <p class="text-lg">課題に関する情報</p>
            <p class="text-sm text-black/40">「漢字1~15、8/31まで」などの文章からタスクを生成できます</p>
            <input
                type="text"
                class="p-2 rounded-md border-white border-[1px] bg-transparent grow w-full"
                v-model="newTaskText"
                placeholder="漢字1~15、8/31まで">
        </div>
        <div
            v-if="taskTextIsEmpty">
            課題に関する情報が空欄です！
        </div>
    </ModalSection>
    <button
        class="basis-16 min-h-[64px] w-full rounded-full bg-orange-300 text-white grid place-content-center"
        @click="addTask()">
        <div class="flex flex-row gap-2 items-center">
            <i class="bi bi-journal-plus text-3xl"/>
            <span class="text-xl">課題を追加する</span>
        </div>
    </button>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Task } from "../../../../models/task";
import ModalSection from "../../modal/section.vue"
import useTasks from "../../../../hooks/useTasks"

const props = defineProps<{
    groupID: string
}>()

const emit = defineEmits<{
    (e: "addTask", newTask: Task): void
}>()

const newTaskText = ref("")
const taskTextIsEmpty = ref(false)

const { createTaskFromText } = await useTasks(props.groupID)

async function addTask(){
    const newTask = await createTaskFromText(newTaskText.value)
    console.log(newTask)
    if( newTask == "taskTextが空です！" ){
        taskTextIsEmpty.value = true
    }else{
        emit("addTask", newTask)
        taskTextIsEmpty.value = false
    }
}
</script>