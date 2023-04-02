import {createRealtimeDBSingleRepository} from "./firebase/firebaseRepository";
import {ApplicationSetting} from "../models/ApplicationSetting";

export const SettingsRepository = createRealtimeDBSingleRepository<ApplicationSetting>("settings")