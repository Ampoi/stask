import { ref, watch } from "vue";
import { groupSettingsRepository as firebaseRepository } from "../infra/groupSettingsRepository";
import { GroupSettings } from "../models/groupSettings";

import useAuth from "./useAuth";

export default async (groupID: string) => {
    const groupSettingsRepository = firebaseRepository(groupID)

    const { isLogin, getUserData } = await useAuth()
    if( !isLogin ){ throw new Error("ログインしてません！") }
    const { uid, userName, userIcon } = await getUserData()

    function returnPerfectSettings(newSettings: Partial<GroupSettings>){ return { ...GroupSettings.create(uid, userName, userIcon), ...newSettings } }

    const groupSettingsData = await (async () => {
        const newGroupSettings = await groupSettingsRepository.get()
        return newGroupSettings ?? {}
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