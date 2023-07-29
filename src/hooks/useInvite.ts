import { createMemberRepository } from "../infra/memberRepository";
import { createGroupsRepository } from "../infra/groups";
import { Member } from "../models/groupSettings";
import useAuth from "./useAuth";
import { inviteRepository } from "../infra/inviteRepository";
import { router } from "../router";

export default async (groupID: string, inviteID: string) => {
    const { getInviteGroupData, joinInviteGroup } = inviteRepository

    const inviteGroupResult = await getInviteGroupData({ groupID, inviteID })
    const inviteGroupData = inviteGroupResult.data

    console.log(inviteGroupData);

    const isInvited = !!inviteGroupData

    async function join(){
        const joinResult = await joinInviteGroup({ groupID, inviteID })

        const message = joinResult.data
        if( message == "join success!!" ){
            router.push({ name: "Group", query: { groupID } })
        }else{
            throw new Error(message)
        }
    }

    return { isInvited, inviteGroupData, join }
}