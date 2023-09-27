<template>
  <button
    class="h-10 w-full rounded-lg border-[1px] border-gray-299 text-lg text-center bg-transparent"
    @click="showEditMinuteModal = true">
    1<span class="text-sm">ページあたり</span>{{ props.value }}分
  </button>
  <Modal v-model:open="showEditMinuteModal">
    <div class="flex flex-col gap-8 items-center">
      <h1 class="text-2xl font-semibold">
        <span class="text-5xl">{{ value }}</span>分 / <span class="text-4xl">1</span>ページ
      </h1>
			<SwipeEditor
        :min="1"
        :max="Infinity"
        :sensitivity="3"
        :value="value"
        @update:value="(newValue) => emit('update:value', newValue)"/>
		</div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '../../modal.vue';
import SwipeEditor from '../../modal/swipeEditor.vue';

import { ref } from 'vue';

const props = defineProps<{
  value: number
}>()

const emit = defineEmits<{
  (e: "update:value", newValue: number): void
}>()

const showEditMinuteModal = ref(false)
</script>