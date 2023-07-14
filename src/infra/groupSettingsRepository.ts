import { GroupSettings } from "../models/GroupSettings"
import { createRealtimeDatabaseRepository } from "./firebase/realtimeDatabaseRepository"

export const groupSettingsRepository = (groupID: string)=>{
    return createRealtimeDatabaseRepository<GroupSettings>(`/groups/${groupID}/settings`)
}