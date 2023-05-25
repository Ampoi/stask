import { Group } from "../model/groups"
import { createRealTimeDatabaseRepository } from "./firebase/firebaseRepository"

export const groupRepository = createRealTimeDatabaseRepository<Group[]>("groups")