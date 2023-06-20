<template>
	<div>
		<h2 class="text-xl"><slot name="title"/></h2>
		<p><slot name="description"/></p>
		<div class="p-4 my-2 bg-orange-100 border-orange-200 border-[1px] border-solid rounded-md flex flex-row items-center gap-4">
			<slot name="warning"/>
		</div>
		<div class="bg-gray-100 border-[1px] p-4 rounded-md relative" :class="{'pointer-events-none': disabled}">
			<div class="bg-white/60 w-full h-full absolute top-0 left-0" :hidden="!disabled"/>
			<slot name="main" ref="main"/>
		</div>
	</div>
</template>
<script setup lang="ts">
const props = defineProps<{
	disabled?: boolean
}>()
</script>