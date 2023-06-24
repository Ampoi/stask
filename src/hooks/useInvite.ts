import { Router } from "vue-router"

import { inviteRepository } from "../infra/inviteRepository"
import { groupSettingRepository } from "../infra/SettingRepository"

import { Member } from "../model/groupSettings"
import useAuth from "./useAuth"

export const useInvite = async (groupID: string, router: Router) => {
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
                window.location.href = `/?group=${groupID}`
            }else{
                if( !userName.value ){ throw new Error("ユーザー名が空です！！") }
                const newUserData = Member.create(userName.value)
                
                await usersRepository.update({...users, ...{ [uid.value]: newUserData }});

                window.location.href = `/?group=${groupID}` //追加されたことを示すダイアログ表示させたい
            }
        }else{
            console.log("そんな招待ないよ");
        }
    }

    return { invitedMemberAdd }
}