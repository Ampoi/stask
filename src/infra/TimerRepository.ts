import {createRealtimeDBCollectionRepository} from "./firebase/firebaseRepository";
import {Timer} from "../models/Timer";

export const TimerRepository = createRealtimeDBCollectionRepository<Timer>("timers")