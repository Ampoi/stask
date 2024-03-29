import { GroupSettings } from "../models/groupSettings"
import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository"

export const createGroupSettingsRepository = (groupID: string)=>{
    return createRealtimeDatabaseRepository<Partial<GroupSettings>>(`/groups/${groupID}/settings`)
}