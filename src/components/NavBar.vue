<template>
    <div class="bottom-12 h-16 flex flex-row gap-4 z-30">
        <Menu as="div" class="relative">
            <MenuButton class="w-16 h-16 bg-orange-300 text-white rounded-full grid place-content-center">
                <i class="bi bi-list text-3xl"/>
            </MenuButton>
            <NavBarMenu/>
        </Menu>
        <slot/>
    </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton } from "@headlessui/vue"

import NavBarMenu from "./NavBar/Menu.vue"
</script>