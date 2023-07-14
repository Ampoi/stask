<template>
    <div
        class="flex flex-row gap-2 items-center p-2">
        <div
            class="w-8 h-8 rounded-full !bg-cover !bg-center"
            :style="{
                background: `url(${member.icon})`,
            }"/>
        <p class="grow p-2">{{ member.name }}</p>
        <MemberRoleOption
            v-model:member-role="member.role"/>
        <button
            class="w-8 h-8 rounded-full grid place-content-center text-red-400 bg-red-200/80"
            @click="emit('deleteMember')">
            <i class="bi bi-trash3 text-md"/>
        </button>
    </div>
</template>
<script setup lang="ts">
import MemberRoleOption from "./memberRoleOption.vue";

import { Member } from "../../../../models/groupSettings"

const props = defineProps<{
    member: Member
}>()//TODO:Propsだけでv-modelみたいなことするのをやめたい

const emit = defineEmits<{
    (e: "deleteMember"): void
}>()
</script>