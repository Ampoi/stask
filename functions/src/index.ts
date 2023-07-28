import { initializeApp } from "firebase-admin/app"
import { onCall } from "firebase-functions/v2/https"

initializeApp()

export const getInviteGroupData = onCall(
  { cors: [/stask(\_(develop|release))?\.ampoi\.net|localhost/] },
  (request) => {
    const groupID: string = request.data.groupID
    const inviteID: string = request.data.inviteID

    console.log("hey!",groupID,inviteID);
  }
);