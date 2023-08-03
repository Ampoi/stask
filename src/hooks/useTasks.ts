import { ref, watch } from "vue";
import { createTaskRepository } from "../infra/taskRepository";
import useTasksAnalytics from "./useTasksAnalytics";
import { Task } from "../models/task";
import useGroupSettings from "./useGroupSettings";

export default async (groupID: string) => {
    const taskRepository = createTaskRepository(groupID)
    const tasksData: Task[] = await (async () => {
        const newPartialTasks = await taskRepository.get() ?? []
        const { groupSettings } = await useGroupSettings(groupID)
        const newTasks = newPartialTasks.map((newPartialTask) => {
            return { ...Task.create(groupSettings.value.subjects), ...newPartialTask }
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