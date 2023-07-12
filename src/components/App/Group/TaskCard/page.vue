<template>
	<button
		class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg"
		@click="showEditPageModal = !showEditPageModal">
		<span>{{ props.cardUnit.symbol(editableScope.first) }}</span>
		<ProgressBar :percent="getLevelOfAchivement" sub-color="white"/>
		<span>{{ props.cardUnit.symbol(editableScope.last) }}</span>
	</button>

	<Modal v-model:open="showEditPageModal">
		<div class="flex flex-col gap-8 items-center">
			<div class="flex flex-row items-center justify-center gap-12">
				<div>
					<p class="font-bold text-black/40">始めの{{ props.cardUnit.name }}</p>
					<h2 class="text-5xl font-bold">{{ props.cardUnit.symbol(editableScope.first) }}</h2>
				</div>
				<div>
					<p class="font-bold text-black/40">最後の{{ props.cardUnit.name }}</p>
					<h2 class="text-5xl font-bold">{{ props.cardUnit.symbol(editableScope.last) }}</h2>
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
import Modal from "../../modal.vue";

import { Scope } from "../../../../models/task";
import useAuth from "../../../../hooks/useAuth";

const props = defineProps<{
	cardUnit: {
		name: string
		symbol: (page: number) => string //TODO:Modelか何かでまとめたい
	},
	scope: Scope
}>()
console.log(props.scope);

const emit = defineEmits<{
	(e: "update:scope", newScope: Scope): void
}>()

const showEditPageModal = ref(false)

const { getUserData } = await useAuth()
const { uid } = await getUserData()

const nowPage = computed(() => {
	return editableScope.value.now[uid] ?? editableScope.value.first
})

const getLevelOfAchivement = computed(()=>{
	const allPageAmount = editableScope.value.last - editableScope.value.first + 1
	const achivedPageAmount = ( nowPage.value ) - editableScope.value.first + 1

	return achivedPageAmount / allPageAmount * 100
})

const editableScope = computed({
	get(){
		return props.scope
	},
	set(newScope: Scope){
		emit("update:scope", newScope)
	}
})
</script>