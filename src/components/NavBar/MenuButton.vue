<template>
    <button
        @click="props.action"
        class="font-bold text-black/60 flex flex-row gap-2">
        <i :class="`bi ${icon}`"/>
        <p>{{ name }}</p>
    </button>
</template>
<script setup lang="ts">
const props = defineProps<{
    action: () => void
    icon: string
    name: string
}>()
</script>