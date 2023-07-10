import { initializeApp } from "firebase/app"
import { User, getAuth, onAuthStateChanged, signOut, signInWithRedirect, GoogleAuthProvider } from "firebase/auth"

import firebaseConfig from "./config"

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export const AuthRepository = {
    isLogin(): Promise<boolean> {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                resolve(!!user)
            })
        })
    },
    getUser(): Promise<User | undefined> {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if( user ){
                    resolve(user)
                }else{
                    resolve(undefined)
                }
            })
        })
    },
    Login(loginSuccessFunc: Function){
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
            .then((value) => loginSuccessFunc(value))
            .catch((err) => { throw new Error(err) })
    },
    async Logout(){
        signOut(auth)
            .then(() => {
                console.log("サインアウトしました！");
            })
            .catch((error: string) => {
                throw new Error(error)
            });
    }
}