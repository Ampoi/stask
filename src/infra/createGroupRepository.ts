import { Group } from "../models/group";
import { createCloudFunctionsRepository } from "./firebase/cloudFunctionsRepository";

export const createGroupRepository = createCloudFunctionsRepository<{
    groupID: string
    groupData: Group
}, string | undefined>("createGroup")