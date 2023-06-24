<template>
  {{ inviteID }}
</template>
<script setup lang="ts">
import router from '../router'

import { useInvite } from '../hooks/useInvite'

//URLから招待リンクを取得
const url = new URL(window.location.href)
const params = url.searchParams
const groupID = params.get("group")
const inviteID = params.get("id")

if(inviteID && groupID){  
  const { invitedMemberAdd } = await useInvite(groupID)
  await invitedMemberAdd(inviteID)
}else{
  router.push("/")
}
</script>