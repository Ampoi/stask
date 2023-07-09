<template>
    <button class="basis-20 rounded-xl grid place-content-center bg-white/80" @click="emits('click')">
        <i class="bi bi-calendar-plus text-2xl"/>
    </button>
</template>
<script setup lang="ts">
const emits = defineEmits<{
    (e: "click"): void
}>()
</script>