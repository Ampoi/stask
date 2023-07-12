<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-5xl font-bold">学校</h1>
        <Section title="カウントダウン一覧">
            <div class="h-40 flex flex-row items-stretch gap-4 overflow-x-auto">
                <AddCountdownButton @click=""/>
                <Countdown :daysLeft="80"/>
            </div>
        </Section>
        <Section title="課題一覧">
            <TaskCard
                v-for="(_task, index) in tasks"
                :key="index"
                v-model:task="tasks[index]"/>
        </Section>
    </div>
    <AddTaskModal
        v-model:open="showAddTaskModal"
        @addTask="addTask"/>
</template>
<script setup lang="ts">
import Section from "./Group/Section.vue"
import AddCountdownButton from "./Group/AddCountdownButton.vue"
import Countdown from "./Group/Countdown.vue"
import TaskCard from "./Group/TaskCard.vue"
import AddTaskModal from "./Group/addTaskModal.vue"

import useTasks from "../../hooks/useTasks";
import { ref } from "vue"
import { Task } from "../../models/task"

const { tasks } = await useTasks("school")

const showAddTaskModal = ref(true)
function startAddTask(){ showAddTaskModal.value = true }
function addTask(newTask: Task){
    console.log(newTask);
    
    tasks.value.push(newTask)
    showAddTaskModal.value = false
}

defineExpose({ addTask: startAddTask })
</script>