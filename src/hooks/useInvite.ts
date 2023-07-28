import { Router } from "vue-router";
import { createMemberRepository } from "../infra/memberRepository";
import { createGroupsRepository } from "../infra/groups";
import { Member } from "../models/groupSettings";
import useAuth from "./useAuth";
import { inviteRepository } from "../infra/inviteRepository";

export default async (groupID: string, inviteID: string) => {
    const { getInviteGroupData } = inviteRepository

    const inviteGroupResult = await getInviteGroupData({ groupID, inviteID })
    const inviteGroupData = inviteGroupResult.data

    console.log(inviteGroupData);

    const isInvited = false/*await (async () => {
        return !!(await getInviteGroupData())
    })()*/

    async function joinInvitedGroup(router: Router){
        /*if( !isInvited ){ throw new Error("招待されていません！") }
        
        const { isLogin, getUserData } = await useAuth()
        if( !isLogin ){ throw new Error("ログインしていません！") }

        const { uid, userName, userIcon } = await getUserData()

        const memberRepository = createMemberRepository(groupID, uid)
        memberRepository.set(Member.create(userIcon, userName, "member"))
        
        const groupsRepository = createGroupsRepository(uid)
        const oldGroup = await groupsRepository.get() ?? []
        const newGroup = [ ...oldGroup, ...[ groupID ] ]
        groupsRepository.update( newGroup )


        router.push({ name: "Group", query: { groupID } })*/
    }

    return { isInvited, joinInvitedGroup }
}