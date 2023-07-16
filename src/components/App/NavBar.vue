<template>
    <div class="bottom-12 h-16 flex flex-row gap-4">
        <Menu as="div" class="relative">
            <MenuButton class="w-16 h-16 bg-orange-300 text-white rounded-full grid place-content-center">
                <i class="bi bi-list text-3xl"/>
            </MenuButton>
            <NavBarMenu/>
        </Menu>
        <button
            v-if="isGroupPage"
            class="grow rounded-full bg-orange-300 text-white grid place-content-center"
            @click="emit('addTask')">
            <div class="flex flex-row gap-2 items-center">
                <i class="bi bi-journal-plus text-3xl"/>
                <span class="text-xl">課題を追加する</span>
            </div>
        </button>
    </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton } from "@headlessui/vue"

import NavBarMenu from "./NavBar/Menu.vue"

const props = defineProps<{
    nowPage: string
}>()

const emit = defineEmits<{
    (e: "addTask"): void
}>()

const isGroupPage = props.nowPage == "Group"
</script>