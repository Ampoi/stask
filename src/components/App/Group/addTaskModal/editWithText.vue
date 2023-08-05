<template>
    <ModalSection class="mx-4 grow w-full flex flex-col gap-4 overflow-y-auto">
        <div class="flex flex-col gap-2 items-start p-2">
            <p class="text-lg">課題に関する情報</p>
            <p class="text-sm text-black/40">「漢字1~15、8/31まで」などの文章からタスクを生成できます</p>
            <input
                type="text"
                class="p-2 rounded-md border-white border-[1px] bg-transparent grow w-full"
                v-model="newTaskText"
                placeholder="漢字1~15、8/31まで">
        </div>
    </ModalSection>
    <button
        class="basis-16 min-h-[64px] w-full rounded-full bg-orange-300 text-white grid place-content-center"
        @click="addTask()">
        <div class="flex flex-row gap-2 items-center">
            <i class="bi bi-journal-plus text-3xl"/>
            <span class="text-xl">課題を追加する</span>
        </div>
    </button>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Task } from "../../../../models/task";
import ModalSection from "../../modal/section.vue"
import useGroupSettings from "../../../../hooks/useGroupSettings";

const props = defineProps<{
    groupID: string
}>()

const emit = defineEmits<{
    (e: "addTask", newTask: Task): void
}>()

const newTaskText = ref("")

const { groupSettings } = await useGroupSettings(props.groupID)
const subjects = groupSettings.value.subjects
const subjectNames = subjects.map(subject => subject.name)

async function getFromGPT(subjectNames: string[]){
    const subjectTypes = (() => {
        let newTypes = ""
        subjectNames.forEach((name, index) => {
            newTypes += `'${name}'`
            if( index < subjectNames.length - 1 ){ newTypes += "|" }
        })
        return newTypes
    })()

    const OpenAIapiKey = import.meta.env.VITE_OPENAI_API_KEY

    const APIoptions = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "User send an information about homework, and you must get a information about it and compile them in a JSON, then you must response the JSON data.\nThis is a type of a JSON you response\n\n```ts\n{\"title\": string\"term\": `${number}-${number}-${number}`,\"scopes\": {\"start\": number, \"end\": number}[],\"subjects\": " + subjectTypes + "\n}\n```\n\nYou must reponse strictly according to these information.\n\n- \"term\" is following in this format: \"yyyy-mm-dd\".If there are no information about term, use today'\''s data instead (today is 2023/6/21).\n- \"title\" is homework name.\n- Response only JSON data."
            },
            {
                "role": "user",
                "content": newTaskText.value
            }
        ],
        "temperature": 1,
        "max_tokens": 256,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
    };

    const request = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OpenAIapiKey}`
        },
        body: JSON.stringify(APIoptions)
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', request)
        .then(response => response.json())
        .then(data => data)
        .catch(err => { throw new err });
    
    return response
}

const newTask = ref(Task.create(subjects))

async function addTask(){
    //emit("addTask", newTask.value)
    const data = JSON.parse((await getFromGPT(subjectNames)).choices[0].message.content as string)
    console.log(data)
    newTask.value = Task.create(subjects)
}
</script>