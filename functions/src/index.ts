import { initializeApp } from "firebase-admin/app"
import { onCall } from "firebase-functions/v2/https"

initializeApp()

exports.hey = onCall(
  { cors: [/stask(\_(develop|release))?\.ampoi\.net|localhost/] },
  (request) => {
    console.log("hey!");
  }
);