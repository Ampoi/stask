<template>
    <TransitionRoot
        enter-from="opacity-0 ease-out translate-y-10"
        enter="duration-300"
        enter-to="opacity-100 translate-y-0"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 ease-in translate-y-10"
        leave="duration-300">
        <MenuItems class="absolute bottom-[72px] bg-white rounded-md p-3 w-[calc(100vw-48px)] flex flex-col gap-2">
            <MenuItem name="About" icon="bi-question-lg" action="/"/>
            <MenuItem name="グループ一覧" icon="bi-people-fill" action="/home" />
            <MenuItem name="ログアウト" icon="bi-box-arrow-right" :action="() => { logout(router) }"/>
        </MenuItems>
    </TransitionRoot>
</template>
<script setup lang="ts">
import { MenuItems, TransitionRoot } from "@headlessui/vue"

import MenuItem from "./MenuItem.vue";
import useAuth from "../../../hooks/useAuth";
import { router } from "../../../router";

const { logout } = await useAuth()
</script>