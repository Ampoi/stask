import { Card } from "../model/cards"
import { GroupSharedCard } from "../model/groupCards"
import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const personalCardRepository = createRealTimeDatabaseRepository<Card[]>("users/cards")
export const groupSharedCardRepository = (group_id: string)=>{
  return createRealTimeDatabaseRepository<GroupSharedCard[]>(`groups/${group_id}/cards`)
}