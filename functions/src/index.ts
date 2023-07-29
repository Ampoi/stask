import { initializeApp } from "firebase-admin/app"
import { onCall } from "firebase-functions/v2/https"

import { createRealtimeDatabaseRepository } from "./infra/firebase/realtimeDatabaseRepository.js";

initializeApp()

const checkInvited = async (groupID: string, inviteID: string) => {
  const inviteData = await createRealtimeDatabaseRepository(`/groups/${groupID}/settings/invites/${inviteID}`).get() as { expires: string } | undefined
  
  return !!inviteData
}

export const getInviteGroupData = onCall(
  { cors: [/stask(\_(develop|release))?\.ampoi\.net|localhost/] },
  async (request) => {
    const isInvited = await checkInvited(request.data.groupID, request.data.inviteID)

    if( !isInvited ){
      return undefined
    }else{
      const groupName = await createRealtimeDatabaseRepository(`/groups/${request.data.groupID}/settings/name`).get() as string
      return {
          name: groupName
      }
    }
  }
);