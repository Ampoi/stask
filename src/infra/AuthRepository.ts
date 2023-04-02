import {firebaseAuth} from "./firebase/firebase";
import {GoogleAuthProvider, signInWithPopup, signOut, TwitterAuthProvider, User} from "firebase/auth";

const provider = {
    "google": new GoogleAuthProvider(),
    "twitter": new TwitterAuthProvider()
}
export const AuthRepository = {
    isLogin(): boolean {
        return !!firebaseAuth.currentUser
    },
    signIn(loginProvider: "google" | "twitter"): Promise<User | undefined> {
        return new Promise((resolve) => {
            const provider = loginProvider === 'google' ? new GoogleAuthProvider() : new TwitterAuthProvider()
            signInWithPopup(firebaseAuth, provider).then((data) => {
                resolve(data.user)
            })
        })

    },
    signOut(): Promise<void> {
        return signOut(firebaseAuth)
    },
    getUser(): Promise<User | undefined> {
        return new Promise((resolve) => {
            firebaseAuth.onAuthStateChanged((user) => {
                resolve(user ?? undefined)
            })
        })
    }
}
