import { Settings } from "../model/settings"
import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const personalSettingRepository = createRealTimeDatabaseRepository<Settings>("settings")