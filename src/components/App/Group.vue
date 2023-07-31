<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-2 items-center">
            <h1 class="text-5xl font-bold">{{ groupSettings.name }}</h1>
            <button
                class="text-2xl text-gray-400 h-12 w-12 rounded-full grid place-content-center"
                @click="openGroupSettings">
                <i class="bi bi-sliders"></i>
            </button>
        </div>
        <p
            v-if="!!groupSettings.note"
            class="flex flex-row gap-2 items-center text-gray-400">
            <i class="bi bi-info-circle"/>
            <p class="text-sm">{{ groupSettings.note }}</p>
        </p>
        <!--<Section title="カウントダウン一覧">
            <div class="h-40 flex flex-row items-stretch gap-4 overflow-x-auto">
                <AddCountdownButton @click=""/>
                <Countdown :daysLeft="80"/>
            </div>
        </Section>-->
        <Section title="課題一覧">
            <TaskCard
                v-for="(_task, index) in tasks"
                :key="index"
                v-model:task="tasks[index]"
                :groupID="groupID"
                @deleteThisTask="deleteTask(index)"/>
        </Section>
    </div>

    <AddTaskModal
        v-model:open="showAddTaskModal"
        :groupID="groupID"
        @addTask="addTask"/>

    <GroupSettingsModal
        v-model:open="showGroupSettings"
        :groupID="groupID"/>
</template>
<script setup lang="ts">
import Section from "./Group/Section.vue"
//import AddCountdownButton from "./Group/AddCountdownButton.vue"
//import Countdown from "./Group/Countdown.vue"
import TaskCard from "./Group/TaskCard.vue"
import AddTaskModal from "./Group/addTaskModal.vue"
import GroupSettingsModal from "./Group/groupSettingsModal.vue"

import useTasks from "../../hooks/useTasks";
import { ref } from "vue"
import { Task } from "../../models/task"
import useGroupSettings from "../../hooks/useGroupSettings"
import useMember from "../../hooks/useMember"
import { router } from "../../router"

const props = defineProps<{
    groupID: string
}>()

const { isMember } = await useMember(props.groupID)
if( !isMember ){
    await router.push({ path:"/app" })
    window.location.reload()
}

const { tasks, deleteTask } = await useTasks(props.groupID)
const { groupSettings } = await useGroupSettings(props.groupID)

const showAddTaskModal = ref(false)
function startAddTask(){ showAddTaskModal.value = true }
function addTask(newTask: Task){
    if( !tasks.value ){ tasks.value = [] }
    tasks.value.push(newTask)
    showAddTaskModal.value = false
}

const showGroupSettings = ref(false)
function openGroupSettings(){
    showGroupSettings.value = true
}

defineExpose({ addTask: startAddTask })
</script>