import { ref, watch } from "vue";
import { createTaskRepository } from "../infra/taskRepository";
import { createTaskFromTextRepository } from "../infra/taskFromTextRepository"

import useTasksAnalytics from "./useTasksAnalytics";
import useGroupSettings from "./useGroupSettings";
import { Task, Scope, Subject } from "../models/task";
import useAuth from "./useAuth";

export default async (groupID: string) => {
    const taskRepository = createTaskRepository(groupID)

    type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };

    const getTask = async (dbTasks: DeepPartial<Task>[] | undefined) => {
        const newPartialTasks = dbTasks ?? []
        const { groupSettings } = await useGroupSettings(groupID)
        const defaultTask: Readonly<Task> = Task.create(groupSettings.value.subjects)

        const newTasks: Task[] = newPartialTasks.map((newPartialTask) => {
            const newTask = { ...defaultTask, ...newPartialTask }
            const newScopes: Scope[] = newTask.scopes.map((newTaskScope) => {
                const newScope = { ...Scope.create(), ...newTaskScope }
                const members = groupSettings.value.members
                const newScopeNows: { [key: string]: number } = {}
                Object.entries(members).forEach(member => {
                    const [ uid ] = member
                    const oldScopeNow: number | undefined = newScope.now[uid]
                    newScopeNows[uid] = oldScopeNow ?? newScope.first
                });

                //自分の進捗が範囲外なら揃える
                Object.entries(newScopeNows).forEach(([uid, progress]) => {
                    if( progress < newScope.first ){
                        newScopeNows[uid] = newScope.first
                    }else if( newScope.last < progress ){
                        newScopeNows[uid] = newScope.last
                    }
                })

                const newNewScope: Scope = {
                    first: newScope.first,
                    last: newScope.last,
                    now: newScopeNows,
                    id: newScope.id
                }

                return newNewScope
            })

            const newSubject: Subject = {
                color: newTask.subject.color ?? defaultTask.subject.color,
                name: newTask.subject.name ?? defaultTask.subject.name
            }
            const newWorkon = newTask.workon as string[]

            return { ...newTask, ...{ scopes: newScopes, subject: newSubject, workon: newWorkon } }
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
        const newTasks = await getTask([{
            name: taskFromText.name,
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

    const { getUserData } = await useAuth()
    const { uid } = await getUserData()

    function unPinTask(index: number){
        logTasksAnalytics({
            name: "deleteTask",
            kadai_id: tasks.value[index].id
        })
        tasks.value[index].workon = tasks.value[index].workon.filter(userUid => userUid != uid)
    }

    return { tasks, unPinTask, createTaskFromText }
}