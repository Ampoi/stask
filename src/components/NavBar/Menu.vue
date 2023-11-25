<template>
    <TransitionRoot
        enter-from="opacity-0 ease-out translate-y-10"
        enter="duration-300"
        enter-to="opacity-100 translate-y-0"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 ease-in translate-y-10"
        leave="duration-300">
        <MenuItems class="absolute bottom-[72px] bg-white rounded-md p-3 w-[calc(100vw-48px)] flex flex-col gap-2">
            <MenuLink name="Staskについて" icon="bi-question-lg" to="/"/>
            <MenuLink name="グループ一覧" icon="bi-house-fill" to="/app" />
            <div class="pl-2 flex flex-col gap-2">
                <div
                    v-for="(group, groupID) in groupsData"
                    :key="groupID">
                    <MenuButton
                        v-if="group"
                        icon="bi-people-fill"
                        :name="group.name"
                        :action="() => goToAnotherGroup(groupID)"/>
                </div>
            </div>
            <MenuButton name="ログアウト" icon="bi-box-arrow-right" :action="logout"/>
        </MenuItems>
    </TransitionRoot>
</template>
<script setup lang="ts">
import { MenuItems, TransitionRoot } from "@headlessui/vue"

import MenuLink from "./MenuLink.vue";
import MenuButton from "./MenuButton.vue";
import useAuth from "../../hooks/useAuth";
import useGroups from "../../hooks/useGroups";
import { router } from "../../router";

const { logout } = await useAuth()
const { groupsData } = await useGroups()

const goToAnotherGroup = async (groupID: string | number) => {
    await router.push({name: "Group", params: { groupID }})
    window.location.reload()
}
</script>