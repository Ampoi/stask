<template>
    <div class="flex flex-col gap-8 items-center">
        <div class="flex flex-col gap-4 items-center">
            <p class="text-black/60">グループ</p>
            <h1 class="text-5xl font-bold">{{ groupName }}</h1>
            <p class="text-black/60">に招待されています</p>
            <button
                class="px-4 py-3 border-gray-100 border-2 rounded-md flex flex-row gap-2 items-baseline justify-center"
                @click="emit('clickJoinButton')">
                グループに参加する
            </button>
        </div>
        <div class="flex flex-col gap-2 items-center">
            <p class="text-black/60">この招待に心当たりがありませんか？</p>
            <RouterLink
                to="/"
                class="px-4 py-3 border-gray-100 border-2 rounded-md flex flex-row gap-2 items-baseline justify-center">
                <i class="bi bi-door-closed"/>
                <p>紹介ページにいく</p>
            </RouterLink>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    groupID: string
}>()

const groupName = `${props.groupID}` //TODO:Cloud Functionsを用いて招待されている時のみグループ名を取得できるようにする

const emit = defineEmits<{
    (e: "clickJoinButton"): void
}>()
</script>