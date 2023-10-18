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
        <AllTaskProgressBar :groupID="groupID"/>
        <!--<Section
            title="カウントダウン一覧"
            :showButton="true"
            @click="console.log('aaaa')">
            <div class="flex flex-col items-stretch gap-2 overflow-x-auto mt-2">
                <Countdown
                    :countdown="{
                        name: '文化祭',
                        term: '2023-09-16'
                    }"/>
            </div>
        </Section>-->
        <Section title="課題一覧">
            <div
                v-for="(task, index) in sortedTask"
                :key="index">
                <TaskCard
                    v-if="!task.deleted && task.workon.includes(uid)"
                    v-model:task="tasks[index]"
                    :groupID="groupID"
                    @unPinThisTask="unPinTask(index)"
                    class="mt-2"/>
            </div>
        </Section>
    </div>

    <AddTaskFromSharedTaskModal
        v-model:open="showAddTaskModal"
        :groupID="groupID"
        @addTask="addTask"/>

    <GroupSettingsModal
        v-model:open="showGroupSettings"
        :groupID="groupID"/>
    <IntroducePwaModal/>
</template>
<script setup lang="ts">
import Section from "./Group/Section.vue"
//import Countdown from "./Group/countdown.vue"
import TaskCard from "./Group/TaskCard.vue"
import AddTaskFromSharedTaskModal from "./Group/addTaskFromSharedTaskModal.vue"
import GroupSettingsModal from "./Group/groupSettingsModal.vue"
import IntroducePwaModal from "./introducePwaModal.vue"
import AllTaskProgressBar from "./Group/allTaskProgressBar.vue"

import useTasks from "../../hooks/useTasks";
import { computed, ref } from "vue"
import { Task } from "../../models/task"
import useGroupSettings from "../../hooks/useGroupSettings"
import useMember from "../../hooks/useMember"
import useAuth from "../../hooks/useAuth";
import { router } from "../../router"
import useGroups from "../../hooks/useGroups";

import { getTaskYabasa } from "../../utils/getYabasa"

const props = defineProps<{
    groupID: string
}>()

const { isMember } = await useMember(props.groupID)
if( isMember ){
    const { groups, addGroupToList } = await useGroups()
    if( !groups.value.includes( props.groupID ) ){
        addGroupToList( props.groupID )
    }
}else{
    await router.push({ path:"/app" })
    window.location.reload()
}

const { tasks, unPinTask } = await useTasks(props.groupID)
const { groupSettings } = await useGroupSettings(props.groupID)
const { getUserData } = await useAuth()
const { uid } = await getUserData()

const sortedTask = computed(() => {
    const sorted = tasks.value
        .sort((a, b) => {
            const aYabasa = getTaskYabasa(a, uid) < 0 ? Infinity : getTaskYabasa(a, uid)
            const bYabasa = getTaskYabasa(b, uid) < 0 ? Infinity : getTaskYabasa(b, uid)

            return aYabasa > bYabasa ? -1 : aYabasa == bYabasa ? 0 : 1
        })

    return sorted
})

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