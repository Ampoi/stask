<template>
    <TransitionRoot
        enter-from="opacity-0 ease-out translate-y-10"
        enter="duration-300"
        enter-to="opacity-100 translate-y-0"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 ease-in translate-y-10"
        leave="duration-300">
        <MenuItems class="absolute bottom-[72px] bg-white rounded-md p-3 w-[calc(100vw-48px)] flex flex-col gap-2">
            <MenuItem name="Staskについて" icon="bi-question-lg" action="/"/>
            <MenuItem name="グループ一覧" icon="bi-house-fill" action="/app" />
            <div class="pl-2 flex flex-col gap-2">
                <div
                    v-for="(group, groupID) in groupsData"
                    :key="groupID">
                    <MenuItem
                        v-if="group"
                        icon="bi-people-fill"
                        :name="group.name"
                        :action="`/group/${groupID}`"/>
                </div>
            </div>
            <MenuItem name="ログアウト" icon="bi-box-arrow-right" :action="() => { logout(router) }"/>
        </MenuItems>
    </TransitionRoot>
</template>
<script setup lang="ts">
import { MenuItems, TransitionRoot } from "@headlessui/vue"

import MenuItem from "./MenuItem.vue";
import useAuth from "../../../hooks/useAuth";
import { router } from "../../../router";
import useGroups from "../../../hooks/useGroups";

const { logout } = await useAuth()
const { groupsData } = await useGroups()
</script>