<template>
    <v-progress-linear
        :model-value="pagePercent"
        class="mt-2 rounded-full"
        :color="`${subjectColor}6F`"
    />
</template>
<script setup lang="ts">
import { computed } from 'vue';

import useAuth from '../../hooks/useAuth';

import { GroupSharedPage } from '../../model/groupCards';

const props = defineProps<{
    pages: GroupSharedPage[],
    subjectColor: string
}>()

const { uid } = await useAuth()

const isPageDone = (pageIndex: number) => {
    return {
        get() {
            if (uid.value == undefined) { throw new Error("uidが空です！") }
            if (!props.pages[pageIndex].done) { props.pages[pageIndex].done = [] }

            return props.pages[pageIndex].done.includes(uid.value)
        },
        turnDone() {
            if (uid.value == undefined) { throw new Error("uidが空です！") }

            if (isPageDone(pageIndex).get()) { //達成 -> 普通
                const index = props.pages[pageIndex].done.indexOf(uid.value)
                props.pages[pageIndex].done.splice(index, 1)
            } else { //普通 -> 達成
                props.pages[pageIndex].done.push(uid.value)
            }
        }
    }
}

const pagePercent = computed((): number => {
    const sharedPages = props.pages
    let allPagesAmount = 0
    let donePagesAmount = 0

    let counter = 0
    sharedPages?.forEach((page) => {
        const pageAmount = page.lastPage - page.startPage + 1

        allPagesAmount += pageAmount
        if (isPageDone(counter).get()) { donePagesAmount += pageAmount }

        counter++;
    })
    const percent = allPagesAmount != 0 ? Math.ceil(donePagesAmount / allPagesAmount * 100) : 0

    return percent
})
</script>