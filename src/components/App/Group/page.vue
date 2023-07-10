<template>
	<button
		class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg"
		@click="showEditPageModal.turn()">
		<span>{{ props.cardUnit.symbol(startPage) }}</span>
		<ProgressBar :percent="getLevelOfAchivement" sub-color="white"/>
		<span>{{ props.cardUnit.symbol(endPage) }}</span>
	</button>

	<Modal v-model:open="showEditPageModal">
		<div class="flex flex-col gap-8 items-center">
			<div class="flex flex-row items-center justify-center gap-12">
				<div>
					<p class="font-bold text-black/40">始めの{{ props.cardUnit.name }}</p>
					<h2 class="text-5xl font-bold">{{ props.cardUnit.symbol(startPage) }}</h2>
				</div>
				<div>
					<p class="font-bold text-black/40">最後の{{ props.cardUnit.name }}</p>
					<h2 class="text-5xl font-bold">{{ props.cardUnit.symbol(endPage) }}</h2>
				</div>
			</div>
			<div>
				<p class="font-bold text-black/40">現在の{{ props.cardUnit.name }}</p>
				<h2 class="text-7xl font-bold">{{ props.cardUnit.symbol(nowPage) }}</h2>
			</div>
		</div>
	</Modal>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

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
const startPage = ref(30)
const endPage = ref(60)
const nowPage = ref(40)

const getLevelOfAchivement = computed(()=>{
	const allPageAmount = endPage.value - startPage.value + 1
	const achivedPageAmount = nowPage.value - startPage.value + 1

	return achivedPageAmount / allPageAmount * 100
})
</script>