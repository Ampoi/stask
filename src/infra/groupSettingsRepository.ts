import { GroupSettings } from "../models/groupSettings"
import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository"

export const groupSettingsRepository = (groupID: string)=>{
    return createRealtimeDatabaseRepository<GroupSettings>(`/groups/${groupID}/settings`)
}