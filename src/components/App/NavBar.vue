<template>
    <div class="bottom-12 w-[calc(100%-48px)] h-16 flex flex-row gap-4">
        <Menu as="div" class="relative">
            <MenuButton class="w-16 h-16 bg-orange-300 rounded-full">
                <i class="bi bi-list text-3xl text-white"/>
            </MenuButton>
            <NavBarMenu/>
        </Menu>
    </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton } from "@headlessui/vue"

import NavBarMenu from "./NavBar/Menu.vue"
</script>