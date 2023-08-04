<template>
    <ModalSection>
        <div class="flex flex-col gap-2 p-2">
            <p class="text-lg">グループの注意書き</p>
            <textarea
                class="p-2 rounded-md border-white border-[1px] bg-transparent grow resize-none"
                :value="props.note"
                @update="
                    //@ts-ignore
                    (event) => emit('update:note', event.target.value)"
                placeholder="共有されているタスクで編集できるものは編集して大丈夫です"/>
        </div>
    </ModalSection>
</template>
<script setup lang="ts">
import ModalSection from "../../modal/section.vue"

const props = defineProps<{ note: string }>()
const emit = defineEmits<{ (e: "update:note", newNote: string): void }>()
</script>