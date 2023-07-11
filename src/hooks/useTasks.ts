import { ref } from "vue";
import { taskRepository as firebaseRepository } from "../infra/taskRepository";

export default async (groupID: string) => {
    const taskRepository = firebaseRepository(groupID)
    const tasksData = await (async () => {
        const newTasks = await taskRepository.get()
        return newTasks ?? []
    })()

    const tasks = ref(tasksData)

    taskRepository.onChange((snapshot)=>{ tasks.value = snapshot.val() })

    return { tasks }
}