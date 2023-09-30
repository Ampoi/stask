<template>
    <button
        class="border-2 rounded-full basis-60 grid place-content-center"
        :style="buttonStyle"
        @click="turnDone()">
        <i class="bi bi-check text-3xl"/>
    </button>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import useTasksAnalytics from '../../../../hooks/useTasksAnalytics';

const props = defineProps<{
    isDone: boolean
    color: `#${string}`
    taskID: string
}>()

const emit = defineEmits<{ (e: "update:isDone", newIsDone: boolean): void }>()

async function turnDone(){
    const { logTasksAnalytics  } = await useTasksAnalytics()
    logTasksAnalytics({
        name: "switchDone",
        old: props.isDone,
        new: !props.isDone,
        kadai_id: props.taskID
    })

    const newDone = !props.isDone
    emit("update:isDone", newDone)
}

const doneStyle = computed(() => {
    return {
        borderColor: `${props.color}20`,
        backgroundColor: `${props.color}50`,
        color: "white"
    }
})

const notDoneStyle = computed(() => {
    return {
        borderColor: 'transparent',
        color: `${props.color}70`
    }
})

const buttonStyle = computed(() => props.isDone ? doneStyle.value : notDoneStyle.value)
</script>