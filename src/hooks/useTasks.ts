import { ref, watch } from "vue";
import { taskRepository as firebaseRepository } from "../infra/taskRepository";
import useTasksAnalytics from "./useTasksAnalytics";

export default async (groupID: string) => {
    const taskRepository = firebaseRepository(groupID)
    const tasksData = await (async () => {
        const newTasks = await taskRepository.get()
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
            kadai_id: "aaa"
        })
        tasks.value.splice(index, 1)
    }

    return { tasks, deleteTask }
}