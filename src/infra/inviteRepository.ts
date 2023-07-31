import { InviteGroupData } from "../../model/invites";
import { createCloudFunctionsRepository } from "./firebase/cloudFunctionsRepository";

export const inviteRepository = {
    getInviteGroupData: createCloudFunctionsRepository<{
        groupID: string
        inviteID: string
    }, InviteGroupData | undefined>("getInviteGroupData"),
    joinInviteGroup: createCloudFunctionsRepository<{
        groupID: string
        inviteID: string
    }, string>("joinInviteGroup")
}