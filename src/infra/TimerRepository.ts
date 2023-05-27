import { Timer } from "../model/timers"
import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const personalTimerRepository = createRealTimeDatabaseRepository<Timer[]>("timers")