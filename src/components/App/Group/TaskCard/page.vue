<template>
	<button
		class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg"
		@click="showEditPageModal = !showEditPageModal">
		<span>{{ props.cardUnit.symbol(editableScope.first) }}</span>
		<ProgressBar
			:scope="editableScope"
			:main-color="color"
			sub-color="white"/>
		<span>{{ props.cardUnit.symbol(editableScope.last) }}</span>
	</button>

	<EditPageModal
		v-model:scope="editableScope"
		v-model:open="showEditPageModal"
		:cardUnit="cardUnit"
		:uid="uid"/>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

import EditPageModal from "./page/editPageModal.vue"
import ProgressBar from "./progressBar.vue";

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

function returnPerfectScope(){ return { ...Scope.create(), ...props.scope } }

const editableScope = ref(returnPerfectScope())
const changedByProp = ref(false)

editableScope.value.now[uid] =  editableScope.value.now[uid] ?? editableScope.value.first

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
}, { deep: true })
</script>