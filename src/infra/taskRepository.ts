import { Task } from "../models/task"
import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository"

export const taskRepository = (groupID: string)=>{
    return createRealtimeDatabaseRepository<Task[]>(`/groups/${groupID}/tasks`)
}