import { createCloudFunctionsRepository } from "./firebase/cloudFunctionsRepository";

export const inviteRepository = {
    getInviteGroupData: createCloudFunctionsRepository<{
        groupID: string
        inviteID: string
    }, unknown>("getInviteGroupData")
}