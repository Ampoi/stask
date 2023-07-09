<template>
    <div class="bottom-10 w-[calc(100%-48px)] h-16 flex flex-row gap-4">
        <Menu as="div" class="relative">
            <MenuButton class="w-16 h-16 bg-orange-300 rounded-full">
                <i class="bi bi-list text-3xl text-white"/>
            </MenuButton>
            <TransitionRoot
                enter-from="opacity-0 ease-out translate-y-10"
                enter="duration-300"
                enter-to="opacity-100 translate-y-0">
                <NavBarMenu/>
            </TransitionRoot>
        </Menu>
    </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton, TransitionRoot } from "@headlessui/vue"

import NavBarMenu from "./NavBar/Menu.vue"
</script>