<template>
    <div
        class="flex flex-row gap-2 items-center p-2">
        <div
            class="w-8 h-8 rounded-full !bg-cover !bg-center"
            :style="{
                background: `url(${member.icon})`,
            }"/>
        <p class="grow p-2">{{ member.name }}</p>
        <button
            class="w-8 h-8 rounded-full grid place-content-center text-red-400 bg-red-200/80">
            <i class="bi bi-trash3 text-md"/>
        </button>
    </div>
</template>
<script setup lang="ts">
import { Member } from "../../../../models/groupSettings"

const props = defineProps<{
    member: Member
}>()
</script>