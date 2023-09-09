<template>
  <Modal
    :open="props.open"
    @update:open="(newOpen) => emit('update:open', newOpen)"
  >
    <div class="flex flex-col gap-4 items-center h-full">
      <ModalTitle value="課題を追加する"/>
      <div class="grow flex flex-col w-full overflow-y-auto">
        <button
          class="mb-2 border-gray-200 border-2 text-gray-400 p-4 rounded-md flex flex-row gap-2 justify-center items-center"
          @click="createTask"
        >
          <i class="bi bi-journal-plus text-2xl" />
          <p>課題を新しく作成する</p>
        </button>
        <div
          v-for="task in tasks" :key="task.id">
          <SharedTaskButton
            v-if="!task.deleted && !task.workon.includes(uid)"
            :task="task"
            :groupID="groupID"
            :isInAddQue="addQue.includes(task.id)"
            @selected="addTaskToQue(task.id)"
            @promoteThisTask="promoteTask(task.id)"
            class="mb-2"
          />
        </div>
      </div>
      <ModalButton
        value="選択した課題を追加する"
        icon="journal-plus"
        @buttonClicked="addTask"/>
    </div>
  </Modal>
  <CreateTaskModal
    v-model:open="showCreateTaskModal"
    :groupID="groupID"
    @createTask="addCreatedTask"
  />
</template>
<script setup lang="ts">
import Modal from "../modal.vue";
import ModalTitle from "../modal/title.vue"
import ModalButton from "../modal/submitButton.vue"

import useTasks from "../../../hooks/useTasks";
import SharedTaskButton from "./addTaskFromSharedTaskModal/sharedTaskButton.vue";
import useAuth from "../../../hooks/useAuth";

import CreateTaskModal from "./createTaskModal.vue";
import { ref } from "vue";
import { Task } from "../../../models/task";
import useGroupSettings from "../../../hooks/useGroupSettings";

//import useTasksAnalytics from "../../../hooks/useTasksAnalytics";

const props = defineProps<{
  open: boolean;
  groupID: string;
}>();

const emit = defineEmits<{
  (e: "update:open", newOpen: boolean): void;
}>();

type TaskID = `${string}-${string}`;

const addQue = ref<TaskID[]>([]);
const addTaskToQue = (taskID: TaskID) => {
  if (addQue.value.includes(taskID)) {
    addQue.value = addQue.value.filter((id) => id != taskID);
  } else {
    addQue.value.push(taskID);
  }
};

const { groupSettings } = await useGroupSettings(props.groupID);
const members = groupSettings.value.members;

async function promoteTask(taskID: TaskID) {
  if (!tasks.value.find((task) => task.id == taskID)) {
    console.log("タスクが見つかりませんでした");
  } else {
    Object.entries(members).forEach((data) => {
      const [memberUid, _userData] = data;
      tasks.value.find((task) => task.id == taskID)?.workon.push(memberUid);
    });
  }
}

const { tasks } = await useTasks(props.groupID);
const { getUserData } = await useAuth();
const { uid } = await getUserData();

const showCreateTaskModal = ref(false);
function createTask() {
  showCreateTaskModal.value = true;
}

function addCreatedTask(task: Task) {
  tasks.value.push(task);
  showCreateTaskModal.value = false;
}

//const { logTasksAnalytics } = await useTasksAnalytics()
function addTask() {
  /*logTasksAnalytics({
        name: "createTask",
        kadai_id: newTask.id
    })*/
  addQue.value.forEach((taskID: `${string}-${string}`) => {
    if (!tasks.value.find((task) => task.id == taskID)) {
      console.log("タスクが見つかりませんでした");
    } else {
      tasks.value.find((task) => task.id == taskID)?.workon.push(uid);
    }
  });
  emit("update:open", false);
}
</script>
