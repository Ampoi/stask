<template>
    <TransitionRoot
        enter-from="opacity-0 ease-out translate-y-10"
        enter="duration-300"
        enter-to="opacity-100 translate-y-0"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 ease-in translate-y-10"
        leave="duration-300">
        <MenuItems class="absolute bottom-[72px] bg-white rounded-md p-3 w-[calc(100vw-48px)] flex flex-col gap-2">
            <MenuItem
                v-for="(link, index) in links"
                :key="index">
                <RouterLink
                    :to="link.to"
                    class="font-bold text-black/60 flex flex-row gap-2">
                    <i :class="`bi ${link.icon}`"/>
                    <p>{{ link.name }}</p>
                </RouterLink>
            </MenuItem>
        </MenuItems>
    </TransitionRoot>
</template>
<script setup lang="ts">
import { MenuItems, MenuItem, TransitionRoot } from "@headlessui/vue"

const links = [
    { name: "About", icon: "bi-question-lg", to: "/" },
    { name: "グループ一覧", icon: "bi-people-fill", to: "/home" },
]
</script>