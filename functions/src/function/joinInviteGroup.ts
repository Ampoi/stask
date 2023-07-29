import { createCallableFunc } from "../createCallableFunc.js";
import { checkInvited } from "../checkInvited.js";

import { createRealtimeDatabaseRepository } from "../infra/firebase/realtimeDatabaseRepository.js";

export const joinInviteGroup = createCallableFunc(
  async (request): Promise<string> => {
    if( !request.auth ){ return "authentication required" }
    
    const isInvited = await checkInvited(request.data.groupID, request.data.inviteID)
    if( !isInvited ){ return "invitation required" }

    const [uid, userName, userIcon] = [
      request.auth.token.uid,
      request.auth.token.name as string,
      request.auth.token.picture
    ]

    const invitedGroupMemberMeRepository = createRealtimeDatabaseRepository(`/groups/${request.data.groupID}/settings/members/${uid}`)
    await invitedGroupMemberMeRepository.set({
      icon: userIcon,
      name: userName,
      role: "member"
    })

    return "join success!!"
  }
)