import { initializeApp } from "firebase-admin/app"
import { onCall } from "firebase-functions/v2/https"

import { createRealtimeDatabaseRepository } from "./infra/firebase/realtimeDatabaseRepository.js";

initializeApp()

const checkInvited = async (groupID: string, inviteID: string) => {
  const inviteData = await createRealtimeDatabaseRepository(`/groups/${groupID}/settings/invites/${inviteID}`).get() as { expires: string } | undefined
  
  return !!inviteData
}

const corForStask = /stask(\_(develop|release))?\.ampoi\.net|localhost/

export const getInviteGroupData = onCall(
  { cors: [corForStask] },
  async (request) => {
    const isInvited = await checkInvited(request.data.groupID, request.data.inviteID)
    if( !isInvited ){ return undefined }

    const groupName = await createRealtimeDatabaseRepository(`/groups/${request.data.groupID}/settings/name`).get() as string
    return {
        name: groupName
    }
  }
);

export const joinInviteGroup = onCall(
  { cors: [corForStask] },
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