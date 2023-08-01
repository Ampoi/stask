import { CallableRequest, onCall } from "firebase-functions/v2/https"

const corForStask = [
  /localhost/,
  /stask\.ampoi\.net/,
  /stask\-develop\.ampoi\.net/,
  /stask\-release\.ampoi\.net/
]

export const createCallableFunc = (func: (request: CallableRequest<any>) => any) => {
  return onCall({ cors: corForStask }, func);
}