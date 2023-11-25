<template>
    <MenuItem>
        <RouterLink
            :to="props.to"
            class="font-bold text-black/60 flex flex-row gap-2">
            <i :class="`bi ${icon}`"/>
            <p>{{ name }}</p>
        </RouterLink>
    </MenuItem>
</template>
<script setup lang="ts">
import { MenuItem } from '@headlessui/vue';

const props = defineProps<{
    name: string
    icon: string
    to: string
}>()
</script>