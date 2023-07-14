import { ref, watch } from "vue";
import { groupSettingsRepository as firebaseRepository } from "../infra/groupSettingsRepository";
import { GroupSettings } from "../models/GroupSettings";

import useAuth from "./useAuth";

export default async (groupID: string) => {
    const groupSettingsRepository = firebaseRepository(groupID)

    const { isLogin, getUserData } = await useAuth()
    if( !isLogin ){ throw new Error("ログインしてません！") }
    const { uid, userName, userIcon } = await getUserData()

    const groupSettingsData = await (async () => {
        const newGroupSettings = await groupSettingsRepository.get()
        return newGroupSettings ?? GroupSettings.create(uid, userName ?? "unknown", userIcon)
    })()
    
    const groupSettings = ref(groupSettingsData)

    let changedByDatabase = true
    groupSettingsRepository.onChange((snapshot)=>{
        changedByDatabase = true
        groupSettings.value = snapshot.val()
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