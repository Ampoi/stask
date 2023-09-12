<template>
    <div class="flex flex-col">
        <div class="flex flex-row justify-between text-gray-400">
            <h2 class="text-xl font-bold">{{ props.title }}</h2>
            <button
                v-if="props.showButton"
                class="text-xl"
                @click="emit('click')">
                <i class="bi bi-calendar-plus"/>
            </button>
        </div>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string
    showButton?: boolean
}>()
const emit = defineEmits<{
    (e: "click"): void
}>()
</script>