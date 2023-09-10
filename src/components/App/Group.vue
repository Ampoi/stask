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
            <div
                v-for="(task, index) in sortedTask"
                :key="index">
                <div v-if="!task.deleted && task.workon.includes(uid)">{{ index }}</div>
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
//import AddCountdownButton from "./Group/AddCountdownButton.vue"
//import Countdown from "./Group/Countdown.vue"
import TaskCard from "./Group/TaskCard.vue"
import AddTaskFromSharedTaskModal from "./Group/addTaskFromSharedTaskModal.vue"
import GroupSettingsModal from "./Group/groupSettingsModal.vue"
import IntroducePwaModal from "./introducePwaModal.vue"

import useTasks from "../../hooks/useTasks";
import { computed, ref } from "vue"
import { Scope, Task } from "../../models/task"
import useGroupSettings from "../../hooks/useGroupSettings"
import useMember from "../../hooks/useMember"
import useAuth from "../../hooks/useAuth";
import { router } from "../../router"
import useGroups from "../../hooks/useGroups";

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

const getScopeTotalRemainLength = (scopes: Scope[]) => {
    let total = 0
    scopes.forEach((scope) => {
        total += scope.now[uid] - scope.first
    })
    return total
}

const getDone = (scopes: Scope[]) => {
    const scopeTotalRemainLength = getScopeTotalRemainLength(scopes)
    return scopeTotalRemainLength == 0
}

const getRemainDates = (date: string) => {
    const todayTimeStamp = new Date().getDate()
    const dateTimeStamp = new Date(date).getDate()
    
    return dateTimeStamp - todayTimeStamp
}

const getTaskYabasa = (task:Task) => {
    const remainScope = getScopeTotalRemainLength(task.scopes)
    const remianDates = getRemainDates(task.term)

    const yabasa = remainScope + remianDates * 10

    return yabasa
}

const sortedTask = computed(() => {
    const sorted = tasks.value
        .sort((a, b) => {
            const aYabasa = getTaskYabasa(a)
            const bYabasa = getTaskYabasa(b)

            return aYabasa > bYabasa ? 1 : aYabasa == bYabasa ? 0 : -1
        })
        .sort((a, b) => {
            const aDone = getDone(a.scopes)
            const bDone = getDone(b.scopes)

            return aDone && bDone ? 0 : aDone ? -1 : 1
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