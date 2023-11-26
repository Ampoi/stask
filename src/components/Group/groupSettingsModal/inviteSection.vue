<template>
    <ModalSection class="flex flex-col gap-2">
        招待コード
        <button
            v-for="[pwd] in Object.entries(invites)"
            @click="copyPwd(pwd)"
            class="relative flex flex-row gap-2 items-center justify-center">
            <div
                class="flex flex-row gap-2 bg-orange-300 text-white rounded-full px-3 py-2 transition duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                :class="{
                    'scale-0': !showCopied,
                    'scale-100': showCopied
                }">
                <i class="bi bi-clipboard-check"/>
                <p>コピーしました！</p>
            </div>
            <i class="bi bi-clipboard"/>
            <p>{{ pwd }}</p>
        </button>
    </ModalSection>
</template>
<script setup lang="ts">
import ModalSection from "../../modal/section.vue"

import { Invite } from "../../../models/groupSettings";
import { ref } from "vue";

const { invites, groupID } = defineProps<{
    invites: { [key: string]: Invite }
    groupID: string
}>()

const showCopied = ref(false)

function copyPwd(pwd: string){
    navigator.clipboard.writeText(`https://stask.ampoi.net/invite/${groupID}/${pwd}`);
    showCopied.value = true
    setTimeout(() => showCopied.value = false, 1000)
}
</script>