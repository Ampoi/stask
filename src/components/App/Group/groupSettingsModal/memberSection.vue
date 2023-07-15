<template>
    <ModalSection class="flex flex-col gap-2">
        <MemberItem
            v-for="(_member, key) in members"
            :key="key"
            v-model:member="members[key]"
            @deleteMember="deleteMember(key)"/>
    </ModalSection>
</template>
<script setup lang="ts">
import ModalSection from "../../modal/section.vue"
import MemberItem from "./memberSection/member.vue";

import { Member } from "../../../../models/groupSettings";

const props = defineProps<{
    members: { [key: string]: Member }
}>()

function deleteMember(key: string | number){
    delete props.members[key]
}
</script>