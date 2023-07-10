import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository"

export const taskRepository = (groupID: string)=>{
    return createRealtimeDatabaseRepository(`/groups/${groupID}/tasks`)
}