<template>
  <button
    class="h-10 w-full rounded-lg border-[1px] border-gray-299 text-lg text-center bg-transparent"
    @click="showEditMinuteModal = true">
    1<span class="text-sm">ページあたり</span>{{ props.value }}分
  </button>
  <Modal v-model:open="showEditMinuteModal">
    <div class="flex flex-col gap-8 items-center">
			
		</div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '../../modal.vue';
import { ref } from 'vue';

const props = defineProps<{
  value: number
}>()

const emit = defineEmits<{
  (e: "update:value", newValue: number): void
}>()

const showEditMinuteModal = ref(false)
</script>