<template>
    <button
        class="w-full p-4 bg-white/80 border-2 border-l-8 rounded-xl flex flex-col gap-2"
        :style="{ borderColor: `${task.subject.color}70` }"
        @click="emit('selected')">
        <h2 class="text-lg font-semibold">{{ task.name }}</h2>
        <div class="flex flex-row gap-4">
            <div class="flex flex-row">
                <UserIcon
                    v-for="(uid, index) in props.task.workon"
                    :key="index"
                    :iconURL="getMemberIcon(uid)"
                    :color="task.subject.color"/>
            </div>
        </div>
    </button>
</template>
<script setup lang="ts">
import { Task } from "../../../../models/task"
import UserIcon from "../TaskCard/progressBar/userIcon.vue";
import useGroupSettings from "../../../../hooks/useGroupSettings";

const props = defineProps<{
    task: Task
    groupID: string
}>()

const emit = defineEmits<{
    (e: "selected"): void
}>()

const { groupSettings } = await useGroupSettings(props.groupID)
const getMemberIcon = (uid: string) => {
    return groupSettings.value.members[uid].icon
}
</script>