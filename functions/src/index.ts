import { initializeApp } from "firebase-admin/app"
import { onCall } from "firebase-functions/v2/https"

initializeApp()

export const hey = onCall(
  { cors: [/stask(\_(develop|release))?\.ampoi\.net|localhost/] },
  (request) => {
    console.log("hey!");
  }
);