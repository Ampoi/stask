<template>
    <div
        class="flex flex-row gap-2 items-center p-2">
        <div
            class="w-8 h-8 rounded-full border-4 border-solid min-w-[32px]"
            :style="{
                background: `${props.subject.color}50`,
                borderColor: `${props.subject.color}20`
            }"/>
        <input
            type="text"
            class="p-2 rounded-md border-white border-[1px] bg-transparent grow max-w-[calc(100%-80px)]"
            v-model="subject.name"
            placeholder="教科の名前">
        <button
            class="min-w-8 w-8 h-8 rounded-full grid place-content-center text-red-400 bg-red-200/80"
            @click="emit('deleteSubject')">
            <i class="bi bi-trash3 text-md"/>
        </button>
    </div>
</template>
<script setup lang="ts">
import { Subject } from "../../../../../models/task"

const props = defineProps<{ subject: Subject }>()

const emit = defineEmits<{
    (e: "deleteSubject"): void
}>()
</script>