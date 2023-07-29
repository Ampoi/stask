import { createCallableFunc } from "../createCallableFunc.js";
import { checkInvited } from "../checkInvited.js";

import { createRealtimeDatabaseRepository } from "../infra/firebase/realtimeDatabaseRepository.js";

export const getInviteGroupData = createCallableFunc(
  async (request) => {
    const isInvited = await checkInvited(request.data.groupID, request.data.inviteID)
    if( !isInvited ){ return undefined }

    const groupNameRepository = createRealtimeDatabaseRepository(`/groups/${request.data.groupID}/settings/name`)
    const groupName = await groupNameRepository.get() as string
    return {
        name: groupName
    }
  }
);