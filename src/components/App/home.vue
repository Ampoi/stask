<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-4xl font-bold">グループ一覧</h1>
        <p class="text-sm text-black/60">グループの一覧のページです</p>
        <div
            v-for="(group, groupID) in groupsData"
            :key="groupID"
            class="p-4 bg-white/60 border-white/20 border-2 rounded-md">
            <div
                v-if="group"
                class="flex flex-col">
                <h2 class="text-2xl font-semibold">{{  }}</h2>
                <div class="flex flex-col p-2 gap-2">
                    <div class="flex flex-row gap-2">
                        <i class="bi bi-people-fill text-emerald-400"/>
                        <p>メンバー数：32</p>
                    </div>
                    <div class="flex flex-row gap-2">
                        <i class="bi bi-journal-bookmark-fill text-orange-400"/>
                        <p>課題の達成度：32/60</p>
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
                <button class="text-red-400 bg-red-100 p-2 rounded-md flex flex-row gap-2 justify-center items-center">
                    <i class="bi bi-trash3" />
                    <p>グループをリストから削除する</p>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import useGroupSettings from '../../hooks/useGroupSettings';
import useGroups from '../../hooks/useGroups';
import useMember from '../../hooks/useMember';

const { groups } = await useGroups()

type Group = {
    name: string
    memberAmount: number
} | false


async function getGroupData(groupID: string): Promise<Group> {
    const { isMember } = await useMember(groupID)
    if( !isMember ){ return false }
    const { groupSettings } = await useGroupSettings(groupID)
    const memberAmount = Object.entries(groupSettings.value.members).length
    return {
        name: groupSettings.value.name,
        memberAmount: memberAmount
    }
}
const groupsData = await (async () => {
    let newGroupsData: { [key: string]: Group } = {}
    await Promise.all(groups.value.map(async (groupID: string) => newGroupsData[groupID] = await getGroupData(groupID) ))
    return newGroupsData
})()
console.log(groupsData)
</script>