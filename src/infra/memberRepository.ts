import { createCloudFunctionsRepository } from "./firebase/cloudFunctionsRepository"

export const memberRepository = {
    checkMember: createCloudFunctionsRepository<{
        groupID: string
    }, boolean>("checkMember")
}