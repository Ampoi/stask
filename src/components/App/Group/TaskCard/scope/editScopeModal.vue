<template>
    <Modal
        v-model:open="showEditScopeModal"
        @update:open="updateScope">
		<div class="flex flex-col gap-8 items-center">
			<div class="flex flex-row items-center justify-center gap-12">
				<div class="flex flex-col items-center">
					<p class="font-bold text-black/40">始めの{{ props.cardUnit.name }}</p>
					<input
						type="number"
						class="text-5xl text-center font-bold w-[90px]"
						v-model="editableScope.first">
				</div>
				<div class="flex flex-col items-center">
					<p class="font-bold text-black/40">最後の{{ props.cardUnit.name }}</p>
					<input
						type="number"
						class="text-5xl text-center font-bold w-[90px]"
						v-model="editableScope.last">
				</div>
			</div>
			<div class="flex flex-col items-center">
				<p class="font-bold text-black/40">現在の{{ props.cardUnit.name }}</p>
				<h2 class="text-7xl font-bold">{{ props.cardUnit.symbol(editableScope.now[uid]) }}</h2>
			</div>
			<SwipeEditor
				:min="scope.first"
				:max="scope.last"
				:sensitivity="10"
				v-model:value="editableScope.now[uid]"/>
		</div>
	</Modal>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

import Modal from "../../../modal.vue"
import SwipeEditor from "../../../modal/swipeEditor.vue";

import { Scope } from "../../../../../models/task"
import { computed } from "vue";

import useTasksAnalytics from "../../../../../hooks/useTasksAnalytics";
import useAuth from "../../../../../hooks/useAuth";

const props = defineProps<{
	open: boolean
	scope: Scope
	cardUnit: {
		name: string
		symbol: (scope: number) => string //TODO:Modelか何かでまとめたい
	},
	uid: string
	taskID: string
}>()

const emit = defineEmits<{
    (e: "update:scope", newScope: Scope): void
    (e: "update:open", newOpen: boolean): void
}>()

const editableScope = ref(JSON.parse(JSON.stringify(props.scope)))

watch(() => props.scope, () => {
	editableScope.value = props.scope
})

const showEditScopeModal = computed({
    get(){ return props.open },
    set(newOpen: boolean){ emit("update:open", newOpen) }
})

const { isLogin, getUserData } = await useAuth()
if( !isLogin ){ throw new Error("ログインしていません！") }
const { uid } = await getUserData()

const { logTasksAnalytics } = await useTasksAnalytics()

const oldScope = props.scope.now[uid]
function updateScope(){
	const newScope = editableScope.value.now[uid]
	logTasksAnalytics({
		name: "editScope",
		old: oldScope,
		new: newScope,
		kadai_id: props.taskID,
		scope_id:  props.scope.id
	})
	emit("update:scope", { ...editableScope.value })
}
</script>