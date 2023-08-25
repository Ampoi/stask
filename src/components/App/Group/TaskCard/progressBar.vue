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
			class="absolute top-0 h-full"
			v-for="memberUid in Object.keys(props.scope.now)"
			:key="memberUid"
			:style="{ left: `calc((100% - 32px) * ${getPercent(memberUid)} / 100)` }">
			<UserIcon
				:iconURL="members[memberUid].icon"
				:color="mainColor"/>
		</div>
	</div>
</template>
<script setup lang="ts">
import useAuth from '../../../../hooks/useAuth';
import useGroupSettings from '../../../../hooks/useGroupSettings';
import { Uid } from '../../../../models/groupSettings';

import UserIcon from "./progressBar/userIcon.vue"

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
	const donePercent = Math.floor(all == 0 ? 0 : done / all * 100)
	const percent = (() => {
		if( donePercent < 0 ){ return 0
		}else if( 100 < donePercent){ return 100
		}else{ return donePercent }
	})()

	return percent
}
</script>