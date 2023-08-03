import { Task } from "../models/task"
import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository"

export const createTaskRepository = (groupID: string)=>{
    return createRealtimeDatabaseRepository<Partial<Task>[]>(`/groups/${groupID}/tasks`)
}