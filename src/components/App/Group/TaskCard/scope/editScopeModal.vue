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
			<ModalSection
				class="w-full h-40 relative overflow-hidden">
				<div
					class="absolute h-full bg-gray-500/5 top-0 left-0"
					:style="{width: `${getLevelOfAchivement}%`}"/>
				<div class="w-full h-full grid place-content-center pointer-events-none">
					<div class="flex flex-row gap-4 items-center text-gray-400">
						<i class="text-lg bi bi-chevron-compact-left"/>
						<p>左右にスワイプして<br>現在のページを変更</p>
						<i class="text-lg bi bi-chevron-compact-right"/>
					</div>
				</div>
				<div
					class="absolute w-full h-full left-0 top-0 right-0 bg-transparent"
					@touchmove="(event) => moveChangeNowScope(event)"
					@touchend="endChangeNowScope()"/>
			</ModalSection>
		</div>
	</Modal>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

import Modal from "../../../modal.vue"
import ModalSection from "../../../modal/section.vue"

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

const editableScope = ref({ ...props.scope })

const getLevelOfAchivement = computed(()=>{
	const allScopeAmount = editableScope.value.last - editableScope.value.first + 1
	const achivedScopeAmount = editableScope.value.now[props.uid] - editableScope.value.first + 1	

	return achivedScopeAmount / allScopeAmount * 100
})

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

const firstTouchX = ref(0)
const firstTouchNowScope = ref(0)
const firstTouch = ref(true)

function moveChangeNowScope(touchEvent: TouchEvent){
	touchEvent.preventDefault()
	const touch = touchEvent.touches.item(0)
	if(touch){
		const touchClientX = touch.clientX

		if(firstTouch.value){
			firstTouchX.value = touchClientX
			firstTouchNowScope.value = editableScope.value.now[props.uid] ?? editableScope.value.first
			firstTouch.value = false
		}else{
			const newScope = Math.floor((touchClientX - firstTouchX.value) / 10) + firstTouchNowScope.value
			
			if(newScope < editableScope.value.first){
				editableScope.value.now[props.uid] = editableScope.value.first
			}else if(newScope > editableScope.value.last){
				editableScope.value.now[props.uid] = editableScope.value.last
			}else{
				editableScope.value.now[props.uid] = newScope
			}
		}
	}
}

function endChangeNowScope(){ firstTouch.value = true }
</script>