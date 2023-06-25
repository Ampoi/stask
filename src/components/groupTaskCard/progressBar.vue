<template>
    <div class="relative py-3.5 h-8">
        <v-progress-linear
            :model-value="uid ? usersPagePercent[uid] : 0"
            class="rounded-full top-3.5 absolute w-[calc(100%-32px)]"
            :color="`${subjectColor}6F`"
        />
        <div
            v-for="(value, uid) in members"
            :key="uid"
            class="w-8 h-8 rounded-full absolute top-0 border-2 border-solid transition-all duration-100"
            :style="`
                border-color: ${subjectColor}6F;
                left: calc((100% - 32px) * ${uid ? usersPagePercent[uid] : 0} / 100);`">
            <div class="w-full h-full bg-cover bg-center rounded-full" :style="`background: url(${ value.icon });`"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import useAuth from '../../hooks/useAuth';

import { GroupSharedPage } from '../../model/groupCards';
import { Members } from '../../model/groupSettings';

const props = defineProps<{
    members: Members
    pages: GroupSharedPage[],
    subjectColor: string
}>()

const { uid, userImage } = await useAuth()

const isPageDone = (pageIndex: number, uid: string) => {
    return {
        get() {
            if (!props.pages[pageIndex].done) { props.pages[pageIndex].done = [] }

            return props.pages[pageIndex].done.includes(uid)
        },
        turnDone() {
            if (isPageDone(pageIndex, uid).get()) { //達成 -> 普通
                const index = props.pages[pageIndex].done.indexOf(uid)
                props.pages[pageIndex].done.splice(index, 1)
            } else { //普通 -> 達成
                props.pages[pageIndex].done.push(uid)
            }
        }
    }
}

const pagePercent = (uid: string): number => {
    const sharedPages = props.pages
    let allPagesAmount = 0
    let donePagesAmount = 0

    let counter = 0
    sharedPages?.forEach((page) => {
        const pageAmount = page.lastPage - page.startPage + 1

        allPagesAmount += pageAmount

        if (isPageDone(counter, uid).get()) { donePagesAmount += pageAmount }

        counter++;
    })
    const percent = allPagesAmount != 0 ? Math.ceil(donePagesAmount / allPagesAmount * 100) : 0

    return percent
}

const usersPagePercent: { [key:string]: number } = (() => {
    let newUsersPagePercent: { [key:string]: number } = {}
    new Map(Object.entries(props.members)).forEach((_value, uid) => {
        newUsersPagePercent[uid] = pagePercent(uid)
    })
    return newUsersPagePercent
})()

console.log(uid.value ? usersPagePercent[uid.value] : 0);


</script>