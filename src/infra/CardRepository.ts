import { Card } from "../model/cards"
import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const cardRepository = createRealTimeDatabaseRepository<Card[]>("cards")