import {Card} from "../models/Card";
import {createRealtimeDBCollectionRepository} from "./firebase/firebaseRepository";

export const CardRepository = createRealtimeDBCollectionRepository<Card>("cards")