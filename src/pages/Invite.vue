<template>
    <div class="h-screen">
        <CheckInvite/>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import CheckInvite from '../components/invite/checkInvite.vue';

import useAuth from '../hooks/useAuth';
import { router } from '../router';

const route = useRoute()
const { groupID, inviteID } = route.params

const { isLogin } = await useAuth()
if( !isLogin ) router.push({ path: "/login", query: { from: `/invite/${groupID}/${inviteID}` } })
</script>