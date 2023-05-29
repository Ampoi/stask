import { GroupSettings } from "../model/groupSettings"
import { PersonalSettings } from "../model/personalSettings"
import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const personalSettingRepository = createRealTimeDatabaseRepository<PersonalSettings>("users/settings")
export const groupSettingRepository = (group_id: string)=>{
  return createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings`)
}