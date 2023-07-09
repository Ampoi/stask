<template>
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
</template>
<script setup lang="ts">
import { MenuItems, MenuItem } from "@headlessui/vue"

const links = [
    { name: "About", icon: "bi-question-lg", to: "/" },
    { name: "グループ一覧", icon: "bi-people-fill", to: "/home" },
]
</script>