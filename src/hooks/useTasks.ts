import { ref } from "vue";
import { taskRepository } from "../infra/taskRepository";

export default async () => {
    const tasks = ref(await taskRepository("school").get())

    return { tasks }
}