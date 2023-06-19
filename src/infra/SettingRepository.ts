import { GroupSettings } from "../model/groupSettings"
import { PersonalSettings } from "../model/personalSettings"
import { createRealTimeDatabaseRepository, RealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const personalSettingRepository = createRealTimeDatabaseRepository<PersonalSettings>("users/settings")
export const groupSettingRepository = (group_id: string)=>{
  const firebaseRepositorys: {
    [key in keyof GroupSettings]: RealTimeDatabaseRepository
  } = {
    name: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/name`),
    timer: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/name`),
    subjects: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/name`),
    permissions: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/name`),
    users: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/name`)
  }

  return firebaseRepositorys
}