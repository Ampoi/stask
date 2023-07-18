import { Member } from "../models/groupSettings"
import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository"

export const createMemberRepository = (groupID: string, uid: string)=>{
    return createRealtimeDatabaseRepository<Member>(`/groups/${groupID}/settings/members/${uid}`)
}