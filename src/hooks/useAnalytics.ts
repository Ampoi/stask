import { createAnalyticsRepository } from "../infra/firebase/analyticsRepository";
import useAuth from "./useAuth";

type BasicData = {
  timestamp: number
}

export default async () => {
  const { isLogin, getUserData } = await useAuth()
  if( !isLogin ){ throw new Error("ログインしていないためログを取ることができません！") }
  const { uid } = await getUserData()

  const createAnalytics  = <T extends { [key: string]: any }>(name: string) => {
    return (data: T) => {
      const basicData: BasicData = {
        timestamp: Date.now()
      }
      const sendData = { ...data, ...basicData }
      
      createAnalyticsRepository<T & BasicData>(uid, name).log(sendData)
    }
  }

  return { createAnalytics }
}