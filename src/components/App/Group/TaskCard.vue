<template>
    <div
        class="w-full p-4 border-2 border-l-8 rounded-xl flex flex-col gap-2 relative"
        :class="{ 'opacity-40': isDone }"
        :style="{ borderColor: `${props.task.subject.color}70` }">
        <div
            v-if="isPassedTerm"
            class="absolute top-0 left-0 h-full w-full bg-red-200 overflow-hidden rounded-sm"/>
        <div
            v-else
            class="absolute top-0 left-0 h-full w-full overflow-hidden rounded-sm"
            :class="isYabaiTerm ? 'bg-amber-400/20' : 'bg-white'">
            <div
                class="h-full"
                :class="isYabaiTerm ? 'bg-orange-400/20' : 'bg-black/5'"
                :style="{ width: `${(1 - remainHourPercents) * 100}%` }"/>
        </div>
        
        <div class="flex flex-row items-stretch gap-4 h-8 z-10">
            <DoneButton
                v-model:is-done="isDone"
                :color="props.task.subject.color"
                :taskID="props.task.id"/>
            <input
                type="text"
                class="rounded-lg grow max-w-[calc(100%-88px)] text-xl bg-transparent"
                :value="props.task.name"
                @input="(event: any) => updateTask({ name: event.target.value as string ?? '' })"
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
        <div
            class="flex flex-row gap-4 z-10"
            :class="isYabaiTerm ? 'text-black' : 'text-gray-400'">
            <p>合計ページ数:{{ totalScope }}</p>
            <p>期限まであと{{ remainHours }}時間</p>
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
            enter-to="h-[324px]"
            leave-from="h-[324px]"
            leave="duration-300 ease-in overflow-hidden"
            leave-to="h-0"
            class="flex flex-col gap-2 z-20">
            <input
                type="date"
                class="h-10 w-full rounded-lg border-[1px] border-gray-299 text-lg text-center bg-transparent"
                :value="props.task.term"
                @input="(event: any) => updateTask({ term: event.target.value })">
            <div class="w-full bg-gray-200/50 border-gray-200 border-[1px] h-56 rounded-lg p-4 flex flex-col gap-2 overflow-y-auto">
                <div class="grow overflow-scroll flex flex-col gap-2">
                    <ScopeUnitOptions v-model:scope-unit="cardUnit"/>
                    <ScopeListItem
                        v-for="(scope, index) in props.task.scopes"
                        :key="scope.id"
                        v-model:scope="props.task.scopes[index]"
                        :color="props.task.subject.color"
                        :cardUnit="cardUnit"
                        :groupID="groupID"
                        :taskID="props.task.id"
                        @deleteThisScope="deleteScope(index)"/>
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
                    @click="emit('unPinThisTask')">
                    <i class="bi bi-box-arrow-right"/>
                </button>
            </div>
        </TransitionRoot>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue"
import { TransitionRoot } from "@headlessui/vue"

import DoneButton from "./TaskCard/doneButton.vue";
import ScopeUnitOptions from "./TaskCard/scopeUnitOptions.vue";
import ProgressBar from "./TaskCard/progressBar.vue";
import ScopeListItem from "./TaskCard/scope.vue"
import SubjectOptions from "./TaskCard/subjectOptions.vue";

import { Switch } from "../../../functions/switch"
import { Scope, Task } from "../../../models/task";
import { Uid } from "../../../models/groupSettings";
import useAuth from "../../../hooks/useAuth";
import useGroupSettings from "../../../hooks/useGroupSettings";
import useTasksAnalytics from "../../../hooks/useTasksAnalytics";

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
    (e: "unPinThisTask"): void
}>()

const { logTasksAnalytics } = await useTasksAnalytics()

const { groupSettings } = await useGroupSettings(props.groupID)
const subjects = groupSettings.value.subjects

//自分がどれだけ達成したのか
const doneData = computed((): {
    first: number
    last: number
    now: { [key: string]: number }
} => {
    let allScopesAmount = 0
    let doneScopesAmount: { [key: Uid]: number } = {}
    props.task.scopes.forEach((scope) => {
        allScopesAmount += (scope.last ?? 0) - (scope.first ?? 0)
    })

    Object.keys(groupSettings.value.members).forEach((uid) => {
        props.task.scopes.forEach((scope) => {
            const myNowPaage: number | undefined = scope.now ? scope.now[uid] : 0

            if(!doneScopesAmount[uid]){ doneScopesAmount[uid] = 0 }
            doneScopesAmount[uid] += (myNowPaage ?? (scope.first ?? 0)) - (scope.first ?? 0)
        })
    })

    return {
        first: 0,
        last: allScopesAmount,
        now: doneScopesAmount
    }
})

//タスクの一部を入力するだけでタスクを更新できるようにする関数
function updateTask(updates: Partial<Task>){
    const newTask: Task = { ...props.task, ...updates }
    emit("update:task", newTask)
}

//課題を達成しているかを切り替える・取得する算出プロパティ
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

//新しい範囲を追加する関数
function addScope(){
    const newScopes = props.task.scopes
    const newScope = Scope.create()
    newScopes.push(newScope)

    logTasksAnalytics({
        name: "createScope",
        scope_id: newScope.id,
        kadai_id: props.task.id
    })

    updateTask({ scopes: newScopes })
}

//範囲を削除する関数
function deleteScope(index: number){
    const acceptDelete = window.confirm("範囲を本当に削除してもいいですか?")
    if( acceptDelete ){
        logTasksAnalytics({
            name: "deleteScope",
            scope_id: props.task.scopes[index].id,
            kadai_id: props.task.id
        })
        props.task.scopes.splice(index, 1)
    }
}

//全ての範囲の合計ページを取得する算出プロパティ
const totalScope = computed(() => {
    let totalScope = 0
    props.task.scopes.forEach((scope) => {
        const scopeLength = scope.last - scope.first + 1
        totalScope += scopeLength
    })
    return totalScope
})

//残りの日数を取得する算出プロパティ
const remainHours = computed(() => {
    const termDate = new Date(props.task.term)
    const nowDate = new Date()

    const remainDates = Math.round((termDate.getTime() - nowDate.getTime()) / 1000 / 3600)

    //console.log((1 - remainDates) * 100)

    return remainDates
})

//残りどれだけの日数が残っているのかを取得する算出プロパティ
const remainHourPercents = computed(() => {
    const allDate = 14
    return Math.round(remainHours.value / 24 / allDate * 100) / 100
})

const isPassedTerm = computed(() => { return remainHours.value < 0 })

const isYabaiTerm = computed(() => {
    const yabaiHours = 3 * 24
    return remainHours.value < yabaiHours
})
</script>