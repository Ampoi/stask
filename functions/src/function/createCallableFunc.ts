import { CallableRequest, onCall } from "firebase-functions/v2/https"

const corForStask = /stask(\_(develop|release))?\.ampoi\.net|localhost/

export const createCallableFunc = (func: (request: CallableRequest<any>) => any) => {
  return onCall({ cors: [corForStask] }, func);
}