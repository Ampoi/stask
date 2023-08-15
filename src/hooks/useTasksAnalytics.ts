import useAnalytics from "./useAnalytics";

type SwitchDone = {
  name: "switchDone",
  old: boolean,
  new: boolean
}

type CreateScope = {
  name: "createScope"
  scope_id: string
}

type EditScope = {
  name: "editScope"
  old: number
  new: number
  scope_id: string
}

type DeleteScope = {
  name: "deleteScope"
  scope_id: string
}

type CreateTask = {
  name: "createTask"
}

type DeleteTask = {
  name: "deleteTask"
}

type BasicTaskData = {
  kadai_id: string
}

export default async () => {
  const { createAnalytics } = await useAnalytics()

  const logTasksAnalytics = createAnalytics<(
    SwitchDone |
    CreateScope |
    EditScope |
    DeleteScope |
    CreateTask |
    DeleteTask) & BasicTaskData>("task")

  return { logTasksAnalytics }
}