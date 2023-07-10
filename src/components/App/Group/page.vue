<template>
	<button
		class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg"
		@click="showEditPageModal.turn()">
		<span>{{ props.cardUnit.symbol(30) }}</span>
		<ProgressBar :percent="80" sub-color="white"/>
		<span>{{ props.cardUnit.symbol(30) }}</span>
	</button>

	<Modal v-model:open="showEditPageModal">
		<div class="flex flex-row gap-4">
			<div>
				<p class="font-bold text-black/40">始めの{{ props.cardUnit.name }}</p>
				<h2 class="text-5xl font-bold">{{ props.cardUnit.symbol(30) }}</h2>
			</div>
		</div>
	</Modal>
</template>
<script setup lang="ts">
import { ref } from "vue";

import ProgressBar from "./progressBar.vue";
import Modal from "../modal.vue";

import { Switch } from "../../../functions/switch"

const props = defineProps<{
	cardUnit: {
		name: string
		symbol: (page: number) => string //Modelか何かでまとめたい
	}
}>()

const showEditPageModal = ref(new Switch(false))
</script>