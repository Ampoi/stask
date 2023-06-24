import { GroupSettings, Members } from "../model/groupSettings"
import { PersonalSettings } from "../model/personalSettings"
import { createRealTimeDatabaseRepository, RealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const personalSettingRepository = createRealTimeDatabaseRepository<PersonalSettings>("users/settings")
export const groupSettingRepository = (group_id: string)=>{
  return {
    settings: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings`),
    onlyUsers: createRealTimeDatabaseRepository<Members>(`groups/${group_id}/settings/users`),
    onlyInvites: createRealTimeDatabaseRepository<string[]>(`groups/${group_id}/settings/invites`)
  }
}