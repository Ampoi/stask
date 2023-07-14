<template>
    <div class="flex flex-col">
        <div class="flex flex-row justify-between items-center">
            <p class="text-lg">{{ title }}</p>
            <Switch
                v-model="enabled"
                :class="enabled ? 'bg-orange-300' : 'bg-gray-200'"
                class="inline-flex h-4 w-9 p-1 items-center rounded-full box-content">
                <span class="sr-only">{{ title }}</span>
                <span
                    :class="{ 'translate-x-5' : enabled }"
                    class="h-4 w-4 transform rounded-full bg-white transition"
                />
            </Switch>
        </div>
        <p class="text-sm text-gray-400">{{ description }}</p>
    </div>
</template>
<script setup lang="ts">
import { Switch } from "@headlessui/vue";
import { computed } from "vue";

const props = defineProps<{
    title: string
    description: string
    isAllowed: boolean | undefined
}>()

const emit = defineEmits<{
    (e: "update:isAllowed", newIsAllowed: boolean): void
}>()

const enabled = computed({
    get(){ return !!props.isAllowed },
    set(newIsAllowed: boolean){ emit("update:isAllowed", newIsAllowed) }
})
</script>