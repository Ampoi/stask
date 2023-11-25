<template>
    <TransitionRoot
        :show="props.show"
        enter-from="h-0"
        enter="duration-300 ease-out overflow-hidden"
        enter-to="h-[400px]"
        leave-from="h-[400px]"
        leave="duration-300 ease-in overflow-hidden"
        leave-to="h-0"
        class="flex flex-col gap-2 z-20">
        <slot/>
    </TransitionRoot>
</template>
<script setup lang="ts">
import { TransitionRoot } from '@headlessui/vue';

const props = defineProps<{
    show: boolean
}>()
</script>