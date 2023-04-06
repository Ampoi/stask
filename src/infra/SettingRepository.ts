import { Settings } from "../model/settings"
import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const settingRepository = createRealTimeDatabaseRepository<Settings>("settings")