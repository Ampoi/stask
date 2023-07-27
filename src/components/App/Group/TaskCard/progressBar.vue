<template>
	<div
		class="w-full h-1 rounded-full overflow-hidden"
		:style="{
			backgroundColor: subColor
		}">
		<div
			class="h-full"
			:style="{
				width: `${getPercent(uid)}%`,
				background: `${props.mainColor}70`
			}"/>
	</div>
</template>
<script setup lang="ts">
import useAuth from '../../../../hooks/useAuth';
import { Uid } from '../../../../models/groupSettings';

const props = defineProps<{
	mainColor: string
	subColor: string
	scope: {
		first: number
		last: number
		now: { [key: Uid]: number }
	}
}>()

const { getUserData } = await useAuth()
const { uid } = await getUserData()

function getPercent(uid: string): number{
	const all = props.scope.last - props.scope.first
	const done = (props.scope.now[uid] ?? props.scope.first) - props.scope.first
	console.log(all, done);

	return Math.floor(all == 0 ? 0 : done / all * 100)
}
</script>