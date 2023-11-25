<template>
	<div
		class="flex flex-row gap-4 z-10 text-gray-400"
		:class="{
			'text-gray-600': yabasaLevel == 'daijobu',
			'text-orange-600': yabasaLevel == 'yabai',
			'text-orange-700': yabasaLevel == 'girigiri',
			'text-white': yabasaLevel == 'passed'
		}">
		<p>残り{{ totalRemainScope }}ページ</p>
		<p v-if="props.remainHours < 100">期限まで{{ remainHours }}時間</p>
		<p v-else>期限まで{{ Math.round(remainHours / 24) }}日</p>
	</div>
</template>
<script setup lang="ts">
const props = defineProps<{
	yabasaLevel: string
	remainHours: number
	totalRemainScope: number
}>()
</script>