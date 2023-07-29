import { Router } from "vue-router";
import { createMemberRepository } from "../infra/memberRepository";
import { createGroupsRepository } from "../infra/groups";
import { Member } from "../models/groupSettings";
import useAuth from "./useAuth";
import { inviteRepository } from "../infra/inviteRepository";

export default async (groupID: string, inviteID: string) => {
    const { getInviteGroupData, joinInviteGroup } = inviteRepository

    const { isLogin, getUserData } = await useAuth()
    if( !isLogin ){ throw new Error("ログインしていません！") }

    const inviteGroupResult = await getInviteGroupData({ groupID, inviteID })
    const inviteGroupData = inviteGroupResult.data

    console.log(inviteGroupData);

    const isInvited = !!inviteGroupData

    async function join(router: Router){
        const { uid, userName, userIcon } = await getUserData()

        await joinInviteGroup({
            groupID,
            inviteID,
            userData: {
                uid: uid,
                name: userName,
                icon: userIcon
            }
        })

        router.push({ name: "Group", query: { groupID } })
    }

    return { isInvited, inviteGroupData, join }
}