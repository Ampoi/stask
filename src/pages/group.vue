<template>
    <div class="bg-gray-100 w-screen h-screen px-6 py-12 box-border flex flex-col gap-4 items-stretch">
        <div class="overflow-y-auto max-h-[calc(100%-64px)] grow">
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
        </div>
        <NavBar>
            <button
                class="grow rounded-full bg-orange-300 text-white grid place-content-center"
                @click="startAddTask">
                <div class="flex flex-row gap-2 items-center">
                    <i class="bi bi-journal-plus text-3xl"/>
                    <span class="text-xl">課題を追加する</span>
                </div>
            </button>
        </NavBar>
    </div>
    <LoginModal
        :showLoginModal="showLoginModal"/>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import NavBar from "../components/App/NavBar.vue";
import LoginModal from "../components/loginModal.vue";
import Section from "../components/App/Group/Section.vue";
import TaskCard from "../components/App/Group/TaskCard.vue";
import AddTaskFromSharedTaskModal from "../components/App/Group/addTaskFromSharedTaskModal.vue";
import AllTaskProgressBar from "../components/App/Group/allTaskProgressBar.vue";
import GroupSettingsModal from "../components/App/Group/groupSettingsModal.vue";
import IntroducePwaModal from "../components/App/introducePwaModal.vue";

import useGroupSettings from "../hooks/useGroupSettings";
import useGroups from "../hooks/useGroups";
import useMember from "../hooks/useMember";
import useTasks from "../hooks/useTasks";
import useAuth from "../hooks/useAuth";
import { Task } from "../models/task";
import { router } from "../router";

import { getTaskYabasa } from "../utils/getYabasa";

const showLoginModal = ref(false)

const route = useRoute()
const groupID = ref<string>(route.params.groupID as string)

const { isLogin } = await useAuth()
if( !isLogin ) router.push({ path: "/login", query: { from: `/group/${groupID.value}` } })

const { isMember } = await useMember(groupID.value)
if( isMember ){
    const { groups, addGroupToList } = await useGroups()
    if( !groups.value.includes( groupID.value ) ){
        addGroupToList( groupID.value )
    }
}else{
    await router.push({ path:"/app" })
    window.location.reload()
}

const { tasks, unPinTask } = await useTasks(groupID.value)
const { groupSettings } = await useGroupSettings(groupID.value)
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
</script>