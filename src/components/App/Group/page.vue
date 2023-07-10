<template>
	<button
		class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg"
		@click="showEditPageModal.turn()">
		<span>{{ props.symbolFunction(30) }}</span>
		<ProgressBar :percent="80" sub-color="white"/>
		<span>{{ props.symbolFunction(30) }}</span>
	</button>
	<Modal v-model:open="showEditPageModal">
		aaa
	</Modal>
</template>
<script setup lang="ts">
import { ref } from "vue";

import ProgressBar from "./progressBar.vue";
import Modal from "../modal.vue";

import { Switch } from "../../../functions/switch"

const props = defineProps<{
	symbolFunction: (page: number) => string
}>()

const showEditPageModal = ref(new Switch(false))
</script>