import { Member } from "../models/groupSettings"
import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository"

export const createMembersRepository = (groupID: string)=>{
    return createRealtimeDatabaseRepository<{[key:string]: Member}>(`/groups/${groupID}/settings/members`)
}