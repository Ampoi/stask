<template>
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
</template>
<script setup lang="ts">
import IntroducePwaModal from './introducePwaModal.vue';
import useGroups from '../../hooks/useGroups';

const { groupsData, deleteGroupFromList } = await useGroups()
</script>