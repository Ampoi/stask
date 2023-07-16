<template>
    <main class="w-screen h-screen grid place-content-center bg-gray-100">
        <div class="w-[calc(100vw-32px)] bg-white border-gray-200 border-[1px] mx-auto rounded-xl px-4 py-6">
            <IsInvited
                v-if="isInvited"
                :groupID="groupID"
                @clickJoinButton="joinInvitedGroup"/>
            <NotInvited
                v-else/>
        </div>
    </main>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

import IsInvited from "../components/invite/isInvited.vue"
import NotInvited from "../components/invite/notInvited.vue"

import useInvite from "../hooks/useInvite"

const route = useRoute()
const { groupID, inviteID } = route.params
if( typeof groupID != "string" ){ throw new Error("GroupIDが正しくありません") }
if( typeof inviteID != "string" ){ throw new Error("InviteIDが正しくありません") }

const { isInvited } = await useInvite(groupID, inviteID)

function joinInvitedGroup(){

}
</script>