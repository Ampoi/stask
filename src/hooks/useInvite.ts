import { Router } from "vue-router";
import { createInviteRepository } from "../infra/inviteRepository";
import { createMemberRepository } from "../infra/memberRepository";
import { createGroupsRepository } from "../infra/groups";
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

        const memberRepository = createMemberRepository(groupID, uid)
        memberRepository.set(Member.create(userIcon, userName, "member"))
        
        const groupsRepository = createGroupsRepository(uid)
        const oldGroup = await groupsRepository.get() ?? []
        const newGroup = [ ...oldGroup, ...[ groupID ] ]
        groupsRepository.update( newGroup )


        router.push(`/app/${groupID}`)
    }

    return { isInvited, joinInvitedGroup }
}