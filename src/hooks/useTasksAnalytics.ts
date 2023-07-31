import useAnalytics from "./useAnalytics";

type CheckButtonData = {
  name: "checkButton",
  old: boolean,
  new: boolean
}

type EditScopeData = {
  name: "editPage"
  old: number
  new: number
  scope_id: string
}

type BasicTaskData = {
  kadai_id: string
}

export default async () => {
  const { createAnalytics } = await useAnalytics()

  const logTasksAnalytics = createAnalytics<(CheckButtonData | EditScopeData) & BasicTaskData>("task")

  return { logTasksAnalytics }
}