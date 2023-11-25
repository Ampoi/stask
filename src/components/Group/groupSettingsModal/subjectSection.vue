<template>
    <ModalSection class="flex flex-col gap-2">
        <SubjectItem
            v-for="(_subject, index) in subjects"
            :key="index"
            v-model:subject="subjects[index]"
            @deleteSubject="deleteSubject(index)"/>
        <button
            class="w-full p-2 rounded-lg bg-white"
            @click="addSubject()">
            <i class="bi bi-bookmark-plus"></i>
        </button>
    </ModalSection>
</template>
<script setup lang="ts">
import ModalSection from "../../modal/section.vue"
import SubjectItem from "./subjectSection/subjectItem.vue"

import { Subject } from "../../../models/task";

const props = defineProps<{
    subjects: Subject[]
}>()

function addSubject(){
    const newSubject = { ...Subject.create() }
    props.subjects.push(newSubject)
}

function deleteSubject(index: number){
    props.subjects.splice(index, 1)
}
</script>