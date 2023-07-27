import { GroupSettings } from "./groupSettings"
import { Task } from "./task"

export type Group = {
    tasks: Task[],
    settings: GroupSettings
}

export const Group = {
    create(uid: string, name: string, iconURL: string): Group {
        return {
            tasks: [],
            settings: GroupSettings.create(uid, name, iconURL)
        }
    }
}