<template>
    <div
        class="w-full p-4 bg-white/80 border-2 border-l-8 rounded-xl flex flex-col gap-2"
        :style="{ borderColor: `${editableTask.subject.color}70` }">
        <div class="flex flex-row items-stretch gap-4 h-8">
            <DoneButton
                v-model:is-done="isDone"
                :color="editableTask.subject.color"/>
            <input
                type="text"
                class="rounded-lg grow text-xl"
                v-model="card.name"
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
                :percent="donePercent"
                :main-color="editableTask.subject.color"
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
                        v-for="(_scope, index) in editableTask.scopes"
                        :key="index"
                        v-model:scope="editableTask.scopes[index]"
                        :color="editableTask.subject.color"
                        :cardUnit="cardUnit"/>
                </div>
                <button
                    class="rounded-lg p-2 bg-white w-full">
                    <i class="bi bi-file-earmark-plus"></i>
                </button>
            </div>
            <div class="flex flex-row items-stretch gap-2 h-10">
                <SubjectOptions
                    v-model:card-subject="editableTask.subject"
                    :subjects="subjects"
                    />
                <button class="rounded-lg border-[1px] border-red-400 text-red-400 text-lg w-10 grid place-content-center">
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
import { Scope, Subject, Task } from "../../../models/task";
import useAuth from "../../../hooks/useAuth";

const showCardMenu = ref(new Switch(false))
const cardUnit = ref({ name: "ページ", symbol: (page: number): string => {return `p.${page}`} })

const card = {
    done: true,
    name: "数学A"
}

const { getUserData } = await useAuth()
const { uid } = await getUserData()

const props = defineProps<{ task: Task }>()
const editableTask = computed({
    get(){
        console.log(props.task)
        return props.task
    },
    set(newTask: Task){
        console.log(newTask);
    }
})

const subjects: Subject[] = [
    { name: "国語", color: "#F44335" },
    { name: "数学", color: "#2196F3" },
    { name: "理科", color: "#4BAF51" },
    { name: "社会", color: "#FFC105" },
    { name: "英語", color: "#E040FB" }
]

const donePercent = computed(() => {
    let allPagesAmount = 0
    let donePagesAmount = 0
        
    props.task.scopes.forEach((scope) => {
        const myNowPaage: number | undefined = scope.now[uid]

        allPagesAmount += scope.last - scope.first
        donePagesAmount += (myNowPaage ?? scope.first) - scope.first
    })

    return (donePagesAmount / allPagesAmount) * 100
})

const isDone = computed({
    get(){
        return donePercent.value == 100
    },
    set(done: boolean){
        const newScopes = props.task.scopes.map((scope: Scope): Scope  => {
            let oldScope = { ...scope }
            oldScope.now[uid] = done ? scope.last : scope.first
            
            return oldScope
        })

        console.log(newScopes);
    }
})
</script>