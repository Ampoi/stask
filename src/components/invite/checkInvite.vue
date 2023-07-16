<template>
    <main class="w-screen h-screen grid place-content-center bg-gray-100">
        <div class="w-[calc(100vw-32px)] bg-white border-gray-200 border-[1px] mx-auto rounded-xl px-4 py-6">
            <IsInvited
                v-if="isInvited"
                :groupID="groupID"
                @clickJoinButton="joinInvitedGroup(router)"/>
            <NotInvited
                v-else/>
        </div>
    </main>
</template>
<script setup lang="ts">
import IsInvited from "./isInvited.vue"
import NotInvited from "./notInvited.vue"

import { useRoute } from 'vue-router';
import { router } from "../../router";

import useInvite from "../../hooks/useInvite"
import useMember from "../../hooks/useMember"

const route = useRoute()
const { groupID, inviteID } = route.params
if( typeof groupID != "string" ){ throw new Error("GroupIDが正しくありません") }
if( typeof inviteID != "string" ){ throw new Error("InviteIDが正しくありません") }

const { isMember } = await useMember(groupID)
if( isMember ){ router.push(`/app/${groupID}`) }

const { isInvited, joinInvitedGroup } = await useInvite(groupID, inviteID)
</script>