import { inviteRepository } from "../infra/inviteRepository";
import { router } from "../router";

export default async (groupID: string, inviteID: string) => {
    const { getInviteGroupData, joinInviteGroup } = inviteRepository

    const inviteGroupResult = await getInviteGroupData({ groupID, inviteID })
    const inviteGroupData = inviteGroupResult.data

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