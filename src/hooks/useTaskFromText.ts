import { createTaskFromTextRepository } from "../infra/taskFromTextRepository"
import useGroupSettings from "./useGroupSettings"

export default async (taskText: string, groupID: string) => {
    if( taskText == "" ){ return "taskTextが空です！" }

    const { groupSettings } = await useGroupSettings(groupID)
    const subjects = groupSettings.value.subjects
    const subjectNames = subjects.map(subject => subject.name)

    const result = await createTaskFromTextRepository(subjectNames, taskText)
    const taskData = JSON.parse(result.choices[0].message.content as string)

    return taskData
}