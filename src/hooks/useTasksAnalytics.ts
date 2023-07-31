import useAnalytics from "./useAnalytics";

type SwitchDone = {
  name: "switchDone",
  old: boolean,
  new: boolean
}

type EditScope = {
  name: "editScope"
  old: number
  new: number
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

  const logTasksAnalytics = createAnalytics<(SwitchDone | EditScope | CreateTask | DeleteTask) & BasicTaskData>("task")

  return { logTasksAnalytics }
}