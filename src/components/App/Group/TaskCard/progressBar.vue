<template>
	<div
		class="w-full h-1 rounded-full overflow-hidden"
		:style="{
			backgroundColor: subColor
		}">
		<div
			class="h-full"
			:style="{
				width: `${props.percent}%`,
				background: `${props.mainColor}70`
			}"/>
	</div>
</template>
<script setup lang="ts">
const props = defineProps<{
	percent: number
	mainColor: string
	subColor: string
}>()
</script>