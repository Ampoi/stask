import { ref, watch } from "vue";
import { createGroupSettingsRepository } from "../infra/groupSettingsRepository";
import { GroupSettings, Permissions } from "../models/groupSettings";

import useAuth from "./useAuth";

export default async (groupID: string) => {
    const groupSettingsRepository = createGroupSettingsRepository(groupID)

    const { isLogin, getUserData } = await useAuth()
    if( !isLogin ){ throw new Error("ログインしてません！") }
    const { uid, userName, userIcon } = await getUserData()

    function returnPerfectSettings(newSettings: Partial<GroupSettings>){ return { ...GroupSettings.create(uid, userName, userIcon), ...newSettings } }

    const groupSettingsData: GroupSettings = await (async () => {
        const newPartialGroupSettings = await groupSettingsRepository.get() ?? {}
        let newGroupSettings = { ...GroupSettings.create(uid, userName, userIcon), ...newPartialGroupSettings }
        newGroupSettings.permissions = { ...Permissions.create(), ...newGroupSettings.permissions }

        return newGroupSettings
    })()
    
    const groupSettings = ref(returnPerfectSettings(groupSettingsData))

    let changedByDatabase = true
    groupSettingsRepository.onChange((snapshot)=>{
        changedByDatabase = true
        groupSettings.value = returnPerfectSettings(snapshot.val())
    })
    
    watch(groupSettings, async () => {
        if(changedByDatabase){
            changedByDatabase = false
        }else{
            await groupSettingsRepository.update(groupSettings.value)
        }
    }, { deep: true })

    return { groupSettings }
}