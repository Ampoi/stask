import {onBeforeMount, ref} from "vue";

import {Timer} from "../../models/Timer"
import {TimerRepository} from "../../infra/TimerRepository";


export const useTimer = () => {
    const timers = ref<Timer[]>([])
    onBeforeMount(async () => {
        timers.value = await TimerRepository.getAll()
    })

    function addTimer() {
        timers.value.push(Timer.create(""))
        TimerRepository.set(timers.value)
    }

    function deleteTimer(index: number) {
        timers.value.splice(index, 1)
        TimerRepository.set(timers.value)
    }

    return {
        timers,
        addTimer,
        deleteTimer
    }
}