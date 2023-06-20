import { GroupSettings } from "../model/groupSettings"
import { PersonalSettings } from "../model/personalSettings"
import { createRealTimeDatabaseRepository, RealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const personalSettingRepository = createRealTimeDatabaseRepository<PersonalSettings>("users/settings")
export const groupSettingRepository = (group_id: string)=>{
  const firebaseRepositorys: {
    [key in (keyof GroupSettings | "member_permissions")]: RealTimeDatabaseRepository<any>  //TODO:Partial<GroupSettings>←これが何故かできないけど最終的にこれと同じ意味のやつをやりたい
  } = {
    name: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/name`),
    timer: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/timer`),
    subjects: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/subjects`),
    permissions: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/permissions`),
    users: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/users`),
    member_permissions: createRealTimeDatabaseRepository<GroupSettings>(`groups/${group_id}/settings/permissions/member`) //TODO:仮置きなのでちゃんとしたやつにしたい
  }

  return firebaseRepositorys
}