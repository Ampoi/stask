<template>
	<button
		class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg"
		@click="showEditScopeModal = !showEditScopeModal">
		<span>{{ props.cardUnit.symbol(props.scope.first) }}</span>
		<ProgressBar
			:scope="props.scope"
			:main-color="color"
			:groupID="groupID"
			sub-color="white"/>
		<span>{{ props.cardUnit.symbol(props.scope.last) }}</span>
	</button>

	<EditScopeModal
		:scope="props.scope"
		@update:scope="(newScope) => emit('update:scope', newScope)"
		v-model:open="showEditScopeModal"
		:cardUnit="cardUnit"
		:uid="uid"
		:taskID="taskID"/>
</template>
<script setup lang="ts">
import { ref } from "vue";

import EditScopeModal from "./scope/editScopeModal.vue"
import ProgressBar from "./progressBar.vue";

import { Scope } from "../../../../models/task";
import useAuth from "../../../../hooks/useAuth";

const props = defineProps<{
	cardUnit: {
		name: string
		symbol: (scope: number) => string //TODO:Modelか何かでまとめたい
	},
	scope: Scope
	taskID: string
	color: string
	groupID: string
}>()

const emit = defineEmits<{
	(e: "update:scope", newScope: Scope): void
}>()

const showEditScopeModal = ref(false)

const { getUserData } = await useAuth()
const { uid } = await getUserData()
</script>