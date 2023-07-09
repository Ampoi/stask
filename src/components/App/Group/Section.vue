<template>
    <div class="flex flex-col gap-2">
        <h2 class="text-xl font-bold text-gray-400">{{ props.title }}</h2>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string
}>()
</script>