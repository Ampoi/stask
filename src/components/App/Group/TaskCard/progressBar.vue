<template>
	<div
		class="w-full h-1 rounded-full overflow-hidden"
		:style="{
			backgroundColor: subColor
		}">
		<div class="h-full bg-blue-400/40" :style="{width: `${props.percent}%`}"/>
	</div>
</template>
<script setup lang="ts">
const props = defineProps<{
	percent: number
	subColor: string
}>()
</script>