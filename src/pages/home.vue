<template>
    <div class="bg-gray-100 w-screen h-screen px-6 py-12 box-border flex flex-col gap-4 items-stretch">
        <div class="overflow-y-auto max-h-[calc(100%-64px)] grow">
            <div class="flex flex-col gap-4">
                <h1 class="text-4xl font-bold">グループ一覧</h1>
                <p class="text-sm text-black/60">グループの一覧のページです</p>
                <RouterLink
                    v-for="(group, groupID) in groupsData"
                    :key="groupID"
                    :to="`/group/${groupID}`"
                    class="p-4 bg-white/60 border-white/20 border-2 rounded-md">
                    <div
                        v-if="group"
                        class="flex flex-col gap-2">
                        <h2 class="text-2xl font-semibold">{{ group.name }}</h2>
                        <div class="flex flex-col px-2 gap-2">
                            <div class="flex flex-row gap-2 text-gray-400">
                                <i class="bi bi-people-fill"/>
                                <p>メンバー数：{{ group.memberAmount }}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        v-else
                        class="flex flex-col gap-2">
                        <div class="flex flex-row gap-4 items-center">
                            <i class="bi bi-exclamation-triangle-fill text-orange-400"/>
                            <div class="flex flex-col">
                                <p>グループのメンバーではありません</p>
                                <p class="text-sm text-black/60">グループID: {{ groupID }}</p>
                            </div>
                        </div>
                        <button
                            class="text-red-400 bg-red-100 p-2 rounded-md flex flex-row gap-2 justify-center items-center"
                            @click="deleteGroupFromList(groupID as string)">
                            <i class="bi bi-trash3" />
                            <p>グループをリストから削除する</p>
                        </button>
                    </div>
                </RouterLink>
            </div>

            <IntroducePwaModal />
        </div>
        <NavBar>
            <button
                class="grow rounded-full bg-orange-300 text-white grid place-content-center"
                @click="createGroup">
                <div class="flex flex-row gap-2 items-center">
                    <i class="bi bi-plus text-3xl"/>
                    <span class="text-xl">グループを作成する</span>
                </div>
            </button>
        </NavBar>
    </div>
    <CreateGroupModal
        v-model:open="showCreateGroupModal"/>
</template>
<script setup lang="ts">
import { ref } from "vue";

import useAuth from "../hooks/useAuth"
import useGroups from '../hooks/useGroups';

import NavBar from "../components/App/NavBar.vue"
import CreateGroupModal from "../components/App/createGroupModal.vue";
import IntroducePwaModal from '../components/App/introducePwaModal.vue';

import { router } from "../router";

const { groupsData, deleteGroupFromList } = await useGroups()

const { isLogin } = await useAuth()
if( !isLogin ) router.push({ path: "/login", query: { from: `/app` } })

const showCreateGroupModal = ref(false)

function createGroup(){
    showCreateGroupModal.value = true
}
</script>