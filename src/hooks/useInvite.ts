import { Router } from "vue-router";
import { createInviteRepository } from "../infra/inviteRepository";
import { createMembersRepository } from "../infra/membersRepository";
import { Member } from "../models/groupSettings";
import useAuth from "./useAuth";

export default async (groupID: string, inviteID: string) => {
    const inviteRepository = createInviteRepository(groupID, inviteID)

    const isInvited = await (async () => {
        const invite = await inviteRepository.get()        
        return !!invite
    })()

    async function joinInvitedGroup(router: Router){
        if( !isInvited ){ throw new Error("招待されていません！") }
        
        const { isLogin, getUserData } = await useAuth()
        if( !isLogin ){ throw new Error("ログインしていません！") }

        const { uid, userName, userIcon } = await getUserData()

        const membersRepository = createMembersRepository(groupID)
        const members = await membersRepository.get() ?? {}
        
        const newMembers = { ...members, ...{ [uid]: Member.create(userName, userIcon, "member") } }
        membersRepository.update(newMembers)

        router.push(`/app/${groupID}`)
    }

    return { isInvited, joinInvitedGroup }
}