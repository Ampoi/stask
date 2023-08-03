<template>
    <div
        class="w-full p-4 bg-white/80 border-2 border-l-8 rounded-xl flex flex-col gap-2"
        :style="{ borderColor: `${props.task.subject.color}70` }"
        v-if="!task.deleted">
        <div class="flex flex-row items-stretch gap-4 h-8">
            <DoneButton
                v-model:is-done="isDone"
                :color="props.task.subject.color"
                :taskID="props.task.id"/>
            <input
                type="text"
                class="rounded-lg grow max-w-[calc(100%-88px)] text-xl"
                :value="props.task.name"
                @input="
                    //@ts-ignore
                    (event: Event) => updateTask({ name: event.target.value as string ?? '' })"
                placeholder="課題名を入力...">
            <button
                class="rounded-full basis-8 grid place-content-center"
                @click="showCardMenu.turn()">
                <i
                    class="bi bi-chevron-up transition-all duration-300"
                    :class="{
                        'scale-y-100': showCardMenu.value,
                        '-scale-y-100': !showCardMenu.value
                    }"/>
            </button>
        </div>
        <div>
            <ProgressBar
                :scope="doneData"
                :main-color="props.task.subject.color"
                :groupID="groupID"
                sub-color="#F3F4F6"/>
        </div>
        <TransitionRoot
            :show="showCardMenu.value"
            enter-from="h-0"
            enter="duration-300 ease-out overflow-hidden"
            enter-to="h-[280px]"
            leave-from="h-[280px]"
            leave="duration-300 ease-in overflow-hidden"
            leave-to="h-0"
            class="flex flex-col gap-2">
            <div class="w-full bg-gray-100 border-gray-200 border-[1px] h-56 rounded-lg p-4 flex flex-col gap-2 overflow-y-auto">
                <div class="grow overflow-scroll flex flex-col gap-2">
                    <PageUnitOptions v-model:page-unit="cardUnit"/>
                    <Page
                        v-for="(_scope, index) in props.task.scopes"
                        :key="index"
                        v-model:scope="props.task.scopes[index]"
                        :color="props.task.subject.color"
                        :cardUnit="cardUnit"
                        :groupID="groupID"
                        :taskID="props.task.id"/>
                </div>
                <button
                    class="rounded-lg p-2 bg-white w-full"
                    @click="addScope">
                    <i class="bi bi-file-earmark-plus"></i>
                </button>
            </div>
            <div class="flex flex-row items-stretch gap-2 h-10">
                <SubjectOptions
                    v-model:card-subject="props.task.subject"
                    :subjects="subjects"
                    class="grow"/>
                <button
                    class="rounded-lg border-[1px] border-red-400 text-red-400 text-lg w-10 grid place-content-center"
                    @click="emit('deleteThisTask')">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        </TransitionRoot>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue"
import { TransitionRoot } from "@headlessui/vue"

import DoneButton from "./TaskCard/doneButton.vue";
import PageUnitOptions from "./TaskCard/pageUnitOptions.vue";
import ProgressBar from "./TaskCard/progressBar.vue";
import Page from "./TaskCard/page.vue"
import SubjectOptions from "./TaskCard/subjectOptions.vue";

import { Switch } from "../../../functions/switch"
import { Scope, Task } from "../../../models/task";
import useAuth from "../../../hooks/useAuth";
import useGroupSettings from "../../../hooks/useGroupSettings";
import { Uid } from "../../../models/groupSettings";

const showCardMenu = ref(new Switch(false))
const cardUnit = ref({ name: "ページ", symbol: (page: number): string => {return `p.${page}`} })

const { getUserData } = await useAuth()
const { uid } = await getUserData()

const props = defineProps<{
    task: Task
    groupID: string
}>()    
const emit = defineEmits<{
    (e: "update:task", newTask: Task): void
    (e: "deleteThisTask"): void
}>()

const { groupSettings } = await useGroupSettings(props.groupID)
const subjects = groupSettings.value.subjects

const doneData = computed((): {
    first: number
    last: number
    now: { [key: string]: number }
} => {
    let allPagesAmount = 0
    let donePagesAmount: { [key: Uid]: number } = {}

    props.task.scopes.forEach((scope) => {
        allPagesAmount += (scope.last ?? 0) - (scope.first ?? 0)
    })

    Object.keys(groupSettings.value.members).forEach((uid) => {
        props.task.scopes.forEach((scope) => {
            const myNowPaage: number | undefined = scope.now ? scope.now[uid] : 0

            if(!donePagesAmount[uid]){ donePagesAmount[uid] = 0 }
            donePagesAmount[uid] += (myNowPaage ?? (scope.first ?? 0)) - (scope.first ?? 0)
        })
    })

    return {
        first: 0,
        last: allPagesAmount,
        now: donePagesAmount
    }
})

function updateTask(updates: Partial<Task>){
    const newTask: Task = { ...props.task, ...updates }
    emit("update:task", newTask)
}

const isDone = computed({
    get(){
        return (doneData.value.now[uid] ?? 0) / (doneData.value.last - doneData.value.first) == 1
    },
    set(done: boolean){
        const newScopes = props.task.scopes.map((scope: Scope): Scope  => {
            let oldScope = { ...scope }
            oldScope.now[uid] = done ? (scope.last ?? 0) : (scope.first ?? 0)
            
            return oldScope
        })

        updateTask({ scopes: newScopes })
    }
})

function addScope(){
    let newScopes = props.task.scopes
    newScopes.push(Scope.create())

    updateTask({ scopes: newScopes })
}
</script>