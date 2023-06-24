<template>
    <div class="relative py-3.5 h-8">
        <v-progress-linear
            :model-value="pagePercent"
            class="rounded-full top-3.5 absolute w-[calc(100%-32px)]"
            :color="`${subjectColor}6F`"
        />
        <div
            class="w-8 h-8 rounded-full absolute top-0 border-2 border-solid transition-all duration-100"
            :style="`border-color: ${subjectColor}6F; left: calc((100% - 32px) * ${pagePercent} / 100);`">
            <div class="w-full h-full bg-cover bg-center rounded-full" :style="`background: url(${ userImage });`"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

import useAuth from '../../hooks/useAuth';

import { GroupSharedPage } from '../../model/groupCards';

const props = defineProps<{
    pages: GroupSharedPage[],
    subjectColor: string
}>()

const { uid, userImage } = await useAuth()

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