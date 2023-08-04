<template>
    <ModalSection>
        <div class="flex flex-row gap-2 items-center p-2">
            <p class="text-lg">グループ名</p>
            <input
                type="text"
                class="p-2 rounded-md border-white border-[1px] bg-transparent grow"
                :value="props.name"
                @input="
                    //@ts-ignore
                    (event) => emit('update:name', event.target.value)"
                placeholder="学校 / 3-Aのグループ / etc...">
        </div>
    </ModalSection>
</template>
<script setup lang="ts">
import ModalSection from "../../modal/section.vue"

const props = defineProps<{ name: string }>()
const emit = defineEmits<{ (e: "update:name", newName: string): void }>()
</script>