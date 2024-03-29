<template>
    <div
        class="w-full p-4 bg-white/80 border-2 border-l-8 rounded-xl flex flex-row items-stretch"
        :class="{ '!bg-black/10': isInAddQue }"
        :style="{ borderColor: `${task.subject.color}70` }">
        <button
            class="grow flex flex-col gap-2"
            @click="addTaskToQue">
            <h2 class="text-lg font-semibold text-left">{{ task.name }}</h2>
            <div class="flex flex-row gap-4 w-full">
                <p class="flex flex-row gap-2 text-black/50"><i class="bi bi-calendar-event"/>{{ task.term }}</p>
                <div class="flex flex-row h-8 z-0">
                    <div
                        v-for="uid in membersList.members"
                        :key="uid"
                        class="-ml-4 first:m-0">
                        <UserIcon
                            :iconURL="getMemberIcon(uid)"
                            :color="task.subject.color"/>
                    </div>
                    <div
                        class="-ml-4 z-10 h-8 w-8 bg-orange-200 border-orange-300 border-2 rounded-full text-sm text-orange-400 grid place-content-center"
                        v-if="membersList.overs > 0">
                        <span>+{{ membersList.overs }}</span>
                    </div>
                </div>
            </div>
        </button>
        <button
            class="p-2 grid place-content-center"
            @click="promoteTaskToEveryone">
            <i class="bi bi-megaphone-fill"/>
        </button>
        <button
            class="p-2 grid place-content-center text-red-400"
            @click="deleteTask">
            <i class="bi bi-trash3-fill"/>
        </button>
    </div>
</template>
<script setup lang="ts">
import { Task } from "../../../models/task"
import UserIcon from "../TaskCard/progressBar/userIcon.vue";
import useGroupSettings from "../../../hooks/useGroupSettings";
import { computed } from "vue";

const props = defineProps<{
    task: Task
    groupID: string
    isInAddQue: boolean
}>()

const emit = defineEmits<{
    (e: "selected"): void
    (e: "promoteThisTask"): void
    (e: "deleteThisTask"): void
}>()

const { groupSettings } = await useGroupSettings(props.groupID)
const getMemberIcon = (uid: string) => {
    return groupSettings.value.members[uid].icon
}

const membersList = computed(() => {
    const members = props.task.workon
    const membersMaxAmount = 6
    const overMax = members.length - membersMaxAmount
    const membersShowAmount = overMax >= 0 ? membersMaxAmount : members.length
    return {
        members: members.slice(0, membersShowAmount),
        overs: overMax
    }
})

const addTaskToQue = () => {
    emit("selected")
}

const promoteTaskToEveryone = () => {
    const acceptPromote = window.confirm("課題を本当に全体に公開してもいいですか？")
    if( acceptPromote ) emit("promoteThisTask")
}

const deleteTask = () => {
    const acceptDelete = window.confirm("課題を本当に全体から削除してもいいですか？")
    if( acceptDelete ) emit("deleteThisTask")
}
</script>