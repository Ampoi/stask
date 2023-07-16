import { GroupSettings } from "../models/groupSettings"
import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository"

export const createGroupSettingsRepository = (groupID: string)=>{
    return createRealtimeDatabaseRepository<GroupSettings>(`/groups/${groupID}/settings`)
}