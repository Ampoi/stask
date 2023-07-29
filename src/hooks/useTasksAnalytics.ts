import useAnalytics from "./useAnalytics";

type CheckButtonData = {
  name: "checkButton",
  old: boolean,
  new: boolean
}

type BasicTaskData = {
  kadai_id: string
}

export default async () => {
  const { createAnalytics } = await useAnalytics()

  const logTasksAnalytics = createAnalytics<CheckButtonData & BasicTaskData>("task")

  return { logTasksAnalytics }
}