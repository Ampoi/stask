<template>
    <button
        class="basis-16 min-h-[64px] w-full rounded-full grid place-content-center"
        :class="{
            'bg-white text-orange-300 border-orange-300 border-[1px]': props.sub,
            'bg-orange-300 text-white': !props.sub
        }"
        @click="emit('buttonClicked')">
        <div class="flex flex-row gap-2 items-center">
            <i :class="`bi bi-${props.icon} text-2xl`" />
            <span class="text-xl">{{ props.value }}</span>
        </div>
    </button>
</template>
<script setup lang="ts">
const props = defineProps<{
    value: string
    icon: string
    sub?: boolean
}>()

const emit = defineEmits<{
    (e: "buttonClicked"): void
}>()
</script>