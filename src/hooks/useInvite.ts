import { inviteRepository } from "../infra/inviteRepository"
import { groupSettingRepository } from "../infra/SettingRepository"

import { Member } from "../model/groupSettings"
import useAuth from "./useAuth"

export const useInvite = async (groupID: string) => {
    const usersRepository = groupSettingRepository(groupID).onlyUsers
    const { uid, userName, userImage } = await useAuth()

    async function invitedMemberAdd(inviteID: string){
        if( !groupID ){ throw new Error("groupIDのパラメータが足りません") }
        if( !inviteID ){ throw new Error("inviteIDのパラメータが足りません") }

        const firebaseRepository = await inviteRepository(groupID, inviteID)
        const isInvited = await firebaseRepository.get

        if(isInvited){
            const users = await usersRepository.get()

            if( !users ){ throw new Error("ユーザーのリストが空です！") }

            if(users[uid]){ 
                console.log("すでにグループに追加されています")
                window.location.href = `/?group=${groupID}`
            }else{
                if( !userName ){ throw new Error("ユーザー名が空です") }
                if( !userImage ){ throw new Error("ユーザーの画像が空です") }

                const newUserData = Member.create(userName, userImage)
                
                await usersRepository.update({...users, ...{ [uid]: newUserData }});

                window.location.href= `/?group=${groupID}`//router.push({ path: "", params: { group: groupID } }) //追加されたことを示すダイアログ表示させたい
            }
        }else{
            console.log("そんな招待ないよ");
        }
    }

    return { invitedMemberAdd }
}