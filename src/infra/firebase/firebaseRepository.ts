import {child, get, set, push} from "firebase/database";
import {dbRef, firebaseAuth} from "./firebase";


export type RealtimeDBCollectionRepository<T> = {
    getAll(): Promise<T[]>
    add(data: T): Promise<void>
    set: (data: T[]) => Promise<void>
}

export type RealtimeDBSingleRepository<T> = {
    get(): Promise<T | undefined>
    set(data: T): Promise<void>
}

export const createRealtimeDBCollectionRepository = <T>(path: string): RealtimeDBCollectionRepository<T> => {
    return {
        async getAll(): Promise<T[]> {
            if(!firebaseAuth.currentUser?.uid) {
                throw new Error("login is needed")
            }
            const snapshot = await get(child(dbRef, `data/${firebaseAuth.currentUser?.uid}/${path}`))
            if (snapshot.exists()) {
                const newData = snapshot.val()
                return newData
            } else {
                return []
            }
        },
        async add(data: T): Promise<void> {
            if(!firebaseAuth.currentUser?.uid) {
                throw new Error("login is needed")
            }
            await push(child(dbRef, `data/${firebaseAuth.currentUser?.uid}/${path}`), data)
        },
        async set(data: T[]): Promise<void> {
            if(!firebaseAuth.currentUser?.uid) {
                throw new Error("login is needed")
            }
            await set(child(dbRef, `data/${firebaseAuth.currentUser?.uid}/${path}`), data)
        }
    }
}

export const createRealtimeDBSingleRepository = <T>(path: string): RealtimeDBSingleRepository<T> => {
    return {
        async get(): Promise<T | undefined> {
            if(!firebaseAuth.currentUser?.uid) {
                throw new Error("login is needed")
            }
            const snapshot = await get(child(dbRef, `data/${firebaseAuth.currentUser?.uid}/${path}`))
            if (snapshot.exists()) {
                const newData = snapshot.val()
                return newData
            } else {
                return undefined
            }
        },
        async set(data: T): Promise<void> {
            if(!firebaseAuth.currentUser?.uid) {
                throw new Error("login is needed")
            }
            await set(child(dbRef, `data/${firebaseAuth.currentUser?.uid}/${path}`), data)
        }
    }
}
