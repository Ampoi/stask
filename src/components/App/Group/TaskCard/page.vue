<template>
	<button
		class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg"
		@click="showEditPageModal = !showEditPageModal">
		<span>{{ props.cardUnit.symbol(editableScope.first) }}</span>
		<ProgressBar
			:percent="getLevelOfAchivement"
			:main-color="color"
			sub-color="white"/>
		<span>{{ props.cardUnit.symbol(editableScope.last) }}</span>
	</button>

	<Modal v-model:open="showEditPageModal">
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
				<h2 class="text-7xl font-bold">{{ props.cardUnit.symbol(nowPage) }}</h2>
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
					@touchmove="(event) => moveChangeNowPage(event)"
					@touchend="endChangeNowPage()"/>
			</ModalSection>
		</div>
	</Modal>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";

import ProgressBar from "./progressBar.vue";
import Modal from "../../modal.vue";
import ModalSection from "../../modal/section.vue"

import { Scope } from "../../../../models/task";
import useAuth from "../../../../hooks/useAuth";

const props = defineProps<{
	cardUnit: {
		name: string
		symbol: (page: number) => string //TODO:Modelか何かでまとめたい
	},
	scope: Partial<Scope>,
	color: string
}>()

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
	const achivedPageAmount = nowPage.value - editableScope.value.first + 1	

	return achivedPageAmount / allPageAmount * 100
})

function returnPerfectScope(){ return { ...Scope.create(), ...props.scope } }

const editableScope = ref(returnPerfectScope())
const changedByProp = ref(false)

watch(() => props.scope, () => {
	editableScope.value = returnPerfectScope()
	changedByProp.value = true
})

watch(editableScope, () => {
	if( changedByProp.value ){
		changedByProp.value = false
	}else{
		emit("update:scope", editableScope.value)
	}
})

const firstTouchX = ref(0)
const firstTouchNowPage = ref(0)
const firstTouch = ref(true)

function moveChangeNowPage(touchEvent: TouchEvent){
	touchEvent.preventDefault()
	const touch = touchEvent.touches.item(0)
	if(touch){
		const touchClientX = touch.clientX

		if(firstTouch.value){
			firstTouchX.value = touchClientX
			firstTouchNowPage.value = editableScope.value.now[uid] ?? editableScope.value.first
			firstTouch.value = false
		}else{
			const newPage = Math.floor((touchClientX - firstTouchX.value) / 10) + firstTouchNowPage.value
			
			if(newPage < editableScope.value.first){
				editableScope.value.now[uid] = editableScope.value.first
			}else if(newPage > editableScope.value.last){
				editableScope.value.now[uid] = editableScope.value.last
			}else{
				editableScope.value.now[uid] = newPage
			}
		}
	}
}

function endChangeNowPage(){ firstTouch.value = true }
</script>