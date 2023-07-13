import { ref, watch } from "vue";
import { taskRepository as firebaseRepository } from "../infra/taskRepository";
import { Task } from "vitest";

export default async (groupID: string) => {
    const taskRepository = firebaseRepository(groupID)
    const tasksData = await (async () => {
        const newTasks = await taskRepository.get()
        return newTasks ?? []
    })()
    
    let changedByDatabase = true
    taskRepository.onChange((snapshot)=>{
        changedByDatabase = true
        tasks.value = snapshot.val()
    })
    
    const tasks = ref(tasksData)
    
    watch(tasks, async () => {
        if(changedByDatabase){
            changedByDatabase = false
        }else{
            await taskRepository.update(tasks.value)
        }
    }, { deep: true })

    function deleteTask(index: number){
        tasks.value.splice(index-1, 1)
    }

    return { tasks, deleteTask }
}