import { Timer } from "../model/timers"
import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const timerRepository = createRealTimeDatabaseRepository<Timer[]>("timers")