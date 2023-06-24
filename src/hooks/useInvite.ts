import { inviteRepository } from "../infra/inviteRepository"
import { groupSettingRepository } from "../infra/SettingRepository"

import { Member } from "../model/groupSettings"
import useAuth from "./useAuth"

export const useInvite = async (groupID: string) => {
    const usersRepository = groupSettingRepository(groupID).onlyUsers
    const { uid, userName } = await useAuth()

    async function invitedMemberAdd(inviteID: string){
        const firebaseRepository = await inviteRepository(groupID, inviteID)
        const isInvited = await firebaseRepository.get

        if(isInvited){
            const users = await usersRepository.get()

            if( !users ){ throw new Error("ユーザーのリストが空です！") }
            if( !uid.value ){ throw new Error("UIDが空です！") }

            if(users[uid.value]){ 
                console.log("すでにグループに追加されています")
            }else{
                if( !userName.value ){ throw new Error("ユーザー名が空です！！") }
                const newUserData = Member.create(userName.value)
            
                users[uid.value] = newUserData
            }
        }else{
            console.log("そんな招待ないよ");
        }
    }

    return { invitedMemberAdd }
}