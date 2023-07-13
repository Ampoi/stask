<template>
    <MenuItem>
        <RouterLink
            v-if="typeof props.action === 'string'"
            :to="props.action"
            class="font-bold text-black/60 flex flex-row gap-2">
            <i :class="`bi ${icon}`"/>
            <p>{{ name }}</p>
        </RouterLink>

        <button
            v-else
            @click="props.action"
            class="font-bold text-black/60 flex flex-row gap-2">
            <i :class="`bi ${icon}`"/>
            <p>{{ name }}</p>
        </button>
    </MenuItem>
</template>
<script setup lang="ts">
import { MenuItem } from '@headlessui/vue';

const props = defineProps<{
    name: string
    icon: string
    action: string | (( payload?: MouseEvent ) => void)
}>()
</script>