<template>
	<div class="flex flex-row gap-2 items-center text-xl py-3 px-4 border-white border-[1px] rounded-lg">
		<span>{{ props.symbolFunction(30) }}</span>
		<ProgressBar :percent="80" sub-color="white"/>
		<span>{{ props.symbolFunction(30) }}</span>
	</div>
</template>
<script setup lang="ts">
import ProgressBar from "./progressBar.vue";

const props = defineProps<{
	symbolFunction: (page: number) => string
}>()
</script>