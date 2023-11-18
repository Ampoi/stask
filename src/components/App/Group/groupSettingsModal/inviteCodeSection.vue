<template>
    <ModalSection class="flex flex-col gap-2">
        
    </ModalSection>
</template>
<script setup lang="ts">
import ModalSection from "../../modal/section.vue"

const props = defineProps<{
    inviteCode: {
        [key: string]: { expire: string }
    }
}>()
</script>