<template>
    <ModalSection>
        <div class="flex flex-col gap-2 p-2">
            <p class="text-lg">グループの注意書き</p>
            <textarea
                class="p-2 rounded-md border-white border-[1px] bg-transparent grow resize-none"
                v-model="editableNote"
                placeholder="共有されているタスクで編集できるものは編集して大丈夫です"/>
        </div>
    </ModalSection>
</template>
<script setup lang="ts">
import { computed } from "vue";

import ModalSection from "../../modal/section.vue"

const props = defineProps<{ note: string }>()
const emit = defineEmits<{ (e: "update:note", newNote: string): void }>()

const editableNote = computed({
    get(){ return props.note },
    set(newNote: string){ emit("update:note", newNote) }
})
</script>