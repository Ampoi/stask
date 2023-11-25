<template>
    <main class="w-screen h-screen grid place-content-center bg-gray-100">
        <div class="w-[calc(100vw-32px)] bg-white border-gray-200 border-[1px] mx-auto rounded-xl px-4 py-6">
            <IsInvited
                v-if="isInvited"
                :inviteGroupData="(inviteGroupData as InviteGroupData)"
                @clickJoinButton="join()"/>
            <NotInvited
                v-else/>
        </div>
    </main>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

import useAuth from '../hooks/useAuth';
import { router } from '../router';

import IsInvited from "../components/invite/isInvited.vue";
import NotInvited from "../components/invite/notInvited.vue";

import { InviteGroupData } from "../../functions/src/model/invites";
import useInvite from "../hooks/useInvite";
import useMember from "../hooks/useMember";

const route = useRoute()
const { groupID, inviteID } = route.params

const { isLogin } = await useAuth()
if( !isLogin ) router.push({ path: "/login", query: { from: `/invite/${groupID}/${inviteID}` } })

if( typeof groupID != "string" ){ throw new Error("GroupIDが正しくありません") }
if( typeof inviteID != "string" ){ throw new Error("InviteIDが正しくありません") }

const { isMember } = await useMember(groupID)
if( isMember ){ router.push(`/group/${groupID}`) }

const { isInvited, inviteGroupData, join } = await useInvite(groupID, inviteID)
</script>