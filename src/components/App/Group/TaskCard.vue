<template>
    <div
        class="w-full p-4 border-2 border-l-8 rounded-xl flex flex-col gap-2 relative"
        :class="{ 'opacity-40': isDone }"
        :style="{ borderColor: `${props.task.subject.color}70` }">
        <RemainDate
            :task="task"
            :uid="uid"/>
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
            <ToggleButton
                v-model:showCardMenu="showCardMenu"/>
        </div>
        <div
            class="flex flex-row gap-4 z-10 text-gray-400"
            :class="((remainHours > 0) && !(getTaskYabasa(props.task, uid) > 10)) || isDone ? 'text-gray-400' : (remainHours > 0) ? 'text-orange-400' : 'text-red-400'">
            <p>残り{{ totalRemainScope }}ページ</p>
            <p v-if="remainHours > 0">期限まで{{ remainHours }}時間</p>
            <p v-else>期限を過ぎてます</p>
        </div>
        <div>
            <ProgressBar
                :scope="doneData"
                :main-color="props.task.subject.color"
                :groupID="groupID"
                sub-color="#F3F4F6"/>
        </div>
        <DetailMenu
            :show="showCardMenu">
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
        </DetailMenu>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

import DoneButton from "./TaskCard/doneButton.vue";
import ProgressBar from "./TaskCard/progressBar.vue";
import ScopeListItem from "./TaskCard/scope.vue";
import ScopeUnitOptions from "./TaskCard/scopeUnitOptions.vue";
import SubjectOptions from "./TaskCard/subjectOptions.vue";
import RemainDate from "./TaskCard/remainDate.vue";
import ToggleButton from "./TaskCard/toggleButton.vue";
import DetailMenu from "./TaskCard/detailMenu/transition.vue";

import useAuth from "../../../hooks/useAuth";
import useGroupSettings from "../../../hooks/useGroupSettings";
import useTasksAnalytics from "../../../hooks/useTasksAnalytics";

import { Uid } from "../../../models/groupSettings";
import { Scope, Task } from "../../../models/task";
import { getScopeTotalRemainLength, getTaskYabasa } from "../../../utils/getYabasa";
import { getRemainHours } from "../../../utils/getRemainHours"

const showCardMenu = ref(false)
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

const totalRemainScope = computed(() => {
    return getScopeTotalRemainLength(props.task.scopes, uid)
})

const remainHours = computed(() => {
    return getRemainHours(props.task.term)
})
</script>