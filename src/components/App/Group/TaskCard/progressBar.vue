<template>
	<div class="p-3 w-full relative">
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
		<div
			class="absolute top-0 rounded-full h-full"
			v-for="memberUid in Object.keys(props.scope.now)"
			:key="memberUid"
			:style="{
				aspectRatio: 1/1,
				left: `calc((100% - 32px) * ${getPercent(memberUid)} / 100)`
			}">
			<div class="relative w-full h-full">
				<div
					class="absolute top-0 left-0 w-full h-full border-2 border-white bg-cover bg-center rounded-full"
					:style="{
						backgroundImage: `url(${members[memberUid].icon})`
					}"/>
				<div
					class="absolute top-0 left-0 w-full h-full border-2 rounded-full"
					:style="{
						borderColor: `${props.mainColor}70`,
					}"/>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import useAuth from '../../../../hooks/useAuth';
import useGroupSettings from '../../../../hooks/useGroupSettings';
import { Uid } from '../../../../models/groupSettings';

const props = defineProps<{
	mainColor: string
	subColor: string
	scope: {
		first: number
		last: number
		now: { [key: Uid]: number }
	}
	groupID: string
}>()

const { getUserData } = await useAuth()
const { uid } = await getUserData()

const { groupSettings } = await useGroupSettings(props.groupID)
const members = groupSettings.value.members

function getPercent(uid: string): number{
	const all = props.scope.last - props.scope.first
	const done = (props.scope.now[uid] ?? props.scope.first) - props.scope.first

	return Math.floor(all == 0 ? 0 : done / all * 100)
}
</script>