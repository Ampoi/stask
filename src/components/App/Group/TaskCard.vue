<template>
    <div class="w-full p-4 bg-white/80 border-2 border-l-8 border-blue-400/40 rounded-xl flex flex-col gap-2">
        <div class="flex flex-row items-stretch gap-4 h-8">
            <button
                class="border-2 rounded-full basis-8 grid place-content-center"
                :class="{ 'border-blue-400/40 bg-blue-400/30 text-white': isDone, 'border-transparent text-blue-400/40': !isDone }"
                @click="isDone = !isDone">
                <i class="bi bi-check text-3xl"/>
            </button>
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
            <ProgressBar :percent="80" sub-color="#F3F4F6"/>
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
                    <Page :cardUnit="cardUnit"/>
                </div>
                <button
                    class="rounded-lg p-2 bg-white w-full">
                    <i class="bi bi-file-earmark-plus"></i>
                </button>
            </div>
            <div class="flex flex-row items-stretch gap-2 h-10">
                <SubjectOptions
                    v-model:card-subject="cardSubject"
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

const props = defineProps<{
    task: Task,
}>()

const subjects: Subject[] = [
    { name: "国語", color: "#F44335" },
    { name: "数学", color: "#2196F3" },
    { name: "理科", color: "#4BAF51" },
    { name: "社会", color: "#FFC105" },
    { name: "英語", color: "#E040FB" }
]
const cardSubject = ref(subjects[0])

const isDone = computed({
    get(){
        let isDone = true
        
        props.task.scopes.forEach((scope) => {
            const myNowPaage: number | undefined = scope.now[uid]
            
            if( !myNowPaage || myNowPaage < scope.last ){ isDone = false }
        })

        return isDone
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