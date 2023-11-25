<template>
    <ProgressBar
        main-color="#FD8100"
        sub-color="#ffffff"
        :scope="allTaskScope"
        :groupID="groupID"/>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import ProgressBar from './TaskCard/progressBar.vue'
import useTasks from '../../hooks/useTasks';
import { Scope } from '../../models/task';
import useAuth from '../../hooks/useAuth';

const props = defineProps<{ groupID: string }>()

const { tasks } = await useTasks(props.groupID)

const { getUserData } = await useAuth()
const { uid } = await getUserData()

const allTaskScope = computed<Scope>(() => {
    let last = 0
    const now: { [key: string]: number } = {}

    tasks.value
        .filter((task) => task.workon.includes(uid) && !task.deleted)
        .forEach((task) => {
            const time = task.minutePerScope
            task.scopes.forEach((scope) => {
                const {
                    first: scopeFirst,
                    last: scopeLast,
                    now: scopeNow
                } = scope
                
                last += (scopeLast - scopeFirst) * time
                Object.entries(scopeNow).forEach(([uid, progress]) => {
                    if( !now[uid] ) now[uid] = 0
                    now[uid] += (progress - scopeFirst) * time
                })
            })
        })

    return { first: 0, last, now, id: "all-all" }
})
</script>