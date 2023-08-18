import { ref, watch } from "vue";
import { createTaskRepository } from "../infra/taskRepository";
import { createTaskFromTextRepository } from "../infra/taskFromTextRepository"

import useTasksAnalytics from "./useTasksAnalytics";
import useGroupSettings from "./useGroupSettings";
import { Task, Scope } from "../models/task";

export default async (groupID: string) => {
    const taskRepository = createTaskRepository(groupID)

    const getTask = async (dbTasks: Partial<Task>[] | undefined) => {
        const newPartialTasks = dbTasks ?? []
        const { groupSettings } = await useGroupSettings(groupID)

        const newTasks: Task[] = newPartialTasks.map((newPartialTask) => {
            const newTask = { ...Task.create(groupSettings.value.subjects), ...newPartialTask }
            if( !newTask.term ){ newTask.term = Task.create(groupSettings.value.subjects).term }
            if( !newTask.subject ){ newTask.subject = Task.create(groupSettings.value.subjects).subject }
            const newScopes = newTask.scopes.map((newTaskScope) => {
                const newScope = { ...Scope.create(), ...newTaskScope }
                const members = groupSettings.value.members
                let newScopeNows: { [key: string]: number } = {}
                Object.entries(members).forEach(member => {
                    const [ uid ] = member
                    const oldScopeNow: number | undefined = newScope.now[uid]
                    newScopeNows[uid] = oldScopeNow ?? newScope.first
                });

                return { ...newScope, ...{now: newScopeNows} }
            })
            return { ...newTask, ...{ scopes: newScopes } }
        })

        return newTasks ?? []
    }

    const tasksData: Task[] = await (async () => {
        const dbTasks = await taskRepository.get()
        return await getTask(dbTasks)
    })()

    const createTaskFromText = async (taskText: string) => {
        if( taskText == "" ){ return "taskTextが空です！" }
        
        const { groupSettings } = await useGroupSettings(groupID)
        const subjects = groupSettings.value.subjects
        const subjectNames = subjects.map(subject => subject.name)

        const taskFromText = await createTaskFromTextRepository(subjectNames, taskText)
        console.log(taskFromText)
        const newTasks = await getTask([{
            name: taskFromText.name,
            //@ts-ignore
            scopes: taskFromText.scopes,
            subject: subjects.find(subject => subject.name == taskFromText.subject),
            term: taskFromText.term
        }])

        return newTasks[0]
    }
    
    const tasks = ref<Task[]>(tasksData)

    let changedByDatabase = true
    taskRepository.onChange(async (snapshot)=>{
        changedByDatabase = true
        tasks.value = await getTask(snapshot.val())
    })
    
    watch(tasks, async () => {
        if(changedByDatabase){
            changedByDatabase = false
        }else{
            await taskRepository.update(tasks.value)
        }
    }, { deep: true })

    const { logTasksAnalytics } = await useTasksAnalytics()
    function deleteTask(index: number){
        logTasksAnalytics({
            name: "deleteTask",
            kadai_id: tasks.value[index].id
        })
        //tasks.value.splice(index, 1)
        tasks.value[index].deleted = true
    }

    return { tasks, deleteTask, createTaskFromText }
}