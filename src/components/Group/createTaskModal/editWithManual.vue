<template>
    <ModalSection class="mx-4 grow w-full flex flex-col gap-4 overflow-y-auto">
        <div class="flex flex-row gap-2 items-center p-2">
            <p class="text-lg">課題名</p>
            <input
                type="text"
                class="p-2 rounded-md border-white border-[1px] bg-transparent grow"
                v-model="newTask.name"
                placeholder="漢字 / 数学問題集 / etc...">
        </div>
        <div class="flex flex-row gap-2 items-center p-2">
            <p class="text-lg">期限</p>
            <input
                type="date"
                class="p-2 rounded-md border-white border-[1px] bg-transparent grow"
                v-model="newTask.term">
        </div>
        <SubjectOptions
            :subjects="groupSettings.subjects"
            v-model:card-subject="newTask.subject"/>
        <div class="p-4 rounded-md border-white border-[1px] bg-transparent max-h-[calc(100%-208px)] flex flex-col">
            <div class="flex flex-col gap-4 max-h-[calc(100%-40px)] overflow-y-auto">
                <div
                    class="flex flex-row items-center justify-between border-[1px] border-white p-4"
                    v-for="(_scope, index) in newTask.scopes">
                    <div class="flex flex-col items-center">
                        <p class="text-black/60 text-sm">始めのページ</p>
                        <input
                            type="number"
                            class="text-3xl font-bold bg-transparent w-[65px] text-center"
                            v-model="newTask.scopes[index].first"
                            min="1" :max="newTask.scopes[index].last-1">
                    </div>
                    <button
                        class="p-4 rounded-full"
                        @click="deleteScope(index)">
                        <i class="bi bi-trash3 text-black/60 text-xl"/>
                    </button>
                    <div class="flex flex-col items-center">
                        <p class="text-black/60 text-sm">最後のページ</p>
                        <input
                            type="number"
                            class="text-3xl font-bold bg-transparent w-[65px] text-center"
                            v-model="newTask.scopes[index].last"
                            :min="newTask.scopes[index].first+1" max="999">
                    </div>
                </div>
            </div>
            <button
                class="mt-2 rounded-lg p-2 bg-white w-full"
                @click="addScope()">
                <i class="bi bi-file-earmark-plus"></i>
            </button>
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
import { Task, Scope } from "../../../models/task";
import ModalSection from "../../modal/section.vue"
import SubjectOptions from "../TaskCard/subjectOptions.vue";
import useGroupSettings from "../../../hooks/useGroupSettings";

const props = defineProps<{
    groupID: string
}>()

const emit = defineEmits<{
    (e: "addTask", newTask: Task): void
}>()

const { groupSettings } = await useGroupSettings(props.groupID)
const subjects = groupSettings.value.subjects

const newTask = ref(Task.create(subjects))

function addScope(){ newTask.value.scopes.push(Scope.create()) }
function deleteScope(index: number){ newTask.value.scopes.splice(index, 1) }

function addTask(){
    emit("addTask", newTask.value)
    newTask.value = Task.create(subjects)
}
</script>