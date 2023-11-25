<template>
    <h1 class="text-3xl font-semibold text-center">{{ props.value }}</h1>
</template>
<script setup lang="ts">
const props = defineProps<{
    value: string
}>()
</script>