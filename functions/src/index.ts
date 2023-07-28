import { initializeApp } from "firebase-admin/app"
import { onCall } from "firebase-functions/v2/https"

import { createRealtimeDatabaseRepository } from "./infra/firebase/realtimeDatabaseRepository.js";

initializeApp()

export const getInviteGroupData = onCall(
  { cors: [/stask(\_(develop|release))?\.ampoi\.net|localhost/] },
  async (request) => {
    const groupID: string = request.data.groupID
    const inviteID: string = request.data.inviteID

    const inviteData = await createRealtimeDatabaseRepository(`/groups/${groupID}/settings/invites/${inviteID}`).get() as { expires: string } | undefined
    
    if( !inviteData ){
        return false
    }else{
        const groupName = await createRealtimeDatabaseRepository(`/groups/${groupID}/settings/name`).get() as string

        return {
            name: groupName
        }
    }
  }
);