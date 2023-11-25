<template>
    <button class="rounded-xl p-4 flex flex-row bg-white/80" @click="emits('click')">
        <i class="bi bi-calendar-plus text-2xl"/>
        カウントダウンを追加する
    </button>
</template>
<script setup lang="ts">
const emits = defineEmits<{
    (e: "click"): void
}>()
</script>