import { Card } from "../model/cards"
import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const personalCardRepository = createRealTimeDatabaseRepository<Card[]>("cards")