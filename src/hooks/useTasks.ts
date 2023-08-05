import { ref, watch } from "vue";
import { createTaskRepository } from "../infra/taskRepository";
import useTasksAnalytics from "./useTasksAnalytics";
import { Task, Scope } from "../models/task";
import useGroupSettings from "./useGroupSettings";

export default async (groupID: string) => {
    const taskRepository = createTaskRepository(groupID)
    const tasksData: Task[] = await (async () => {
        const newPartialTasks = await taskRepository.get() ?? []
        const { groupSettings } = await useGroupSettings(groupID)

        const newTasks: Task[] = newPartialTasks.map((newPartialTask) => {
            const newTask = { ...Task.create(groupSettings.value.subjects), ...newPartialTask }

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
            console.log({ ...newTask, ...{ scopes: newScopes } })
            return { ...newTask, ...{ scopes: newScopes } }
        })

        return newTasks ?? []
    })()
    
    const tasks = ref(tasksData)

    let changedByDatabase = true
    taskRepository.onChange((snapshot)=>{
        changedByDatabase = true
        tasks.value = snapshot.val()
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

    return { tasks, deleteTask }
}