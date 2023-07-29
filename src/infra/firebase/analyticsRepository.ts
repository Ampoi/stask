import { getAnalytics, logEvent, setUserId } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";

export const createAnalyticsRepository = <T extends { [key: string]: any }>(uid: string, name: string) => {
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app);
  setUserId(analytics, uid);
  
  function log(data: T){
    logEvent(analytics, `${name}`, data);
  }

  return { log }
}