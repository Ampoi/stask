<template>
    <div
        class="w-full p-4 bg-white/80 border-2 border-l-8 rounded-xl flex flex-row items-stretch"
        :class="{ '!bg-gray-100': isInAddQue }"
        :style="{ borderColor: `${task.subject.color}70` }">
        <button
            class="grow flex flex-col gap-2"
            @click="addTaskToQue">
            <h2 class="text-lg font-semibold text-left">{{ task.name }}</h2>
            <div class="flex flex-row gap-4 w-full">
                <div class="flex flex-row h-8 basis-40">
                    <div
                        v-for="(uid, index) in props.task.workon"
                        :key="index"
                        class="-ml-4 first:m-0">
                        <UserIcon
                            :iconURL="getMemberIcon(uid)"
                            :color="task.subject.color"/>
                    </div>
                </div>
            </div>
        </button>
        <button
            class="basis-12 grid place-content-center border-gray-200 border-2 rounded-md"
            @click="promoteTaskToEveryone">
            <i class="bi bi-megaphone-fill"/>
        </button>
    </div>
</template>
<script setup lang="ts">
import { Task } from "../../../../models/task"
import UserIcon from "../TaskCard/progressBar/userIcon.vue";
import useGroupSettings from "../../../../hooks/useGroupSettings";

const props = defineProps<{
    task: Task
    groupID: string
    isInAddQue: boolean
}>()

const emit = defineEmits<{
    (e: "selected"): void
    (e: "promoteThisTask"): void
}>()

const { groupSettings } = await useGroupSettings(props.groupID)
const getMemberIcon = (uid: string) => {
    return groupSettings.value.members[uid].icon
}

const addTaskToQue = () => {
    emit("selected")
}

const promoteTaskToEveryone = () => {
    emit("promoteThisTask")
}
</script>