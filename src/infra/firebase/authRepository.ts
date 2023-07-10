import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

import firebaseConfig from "./config"

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export const AuthRepository = {
    async isLogin(){
        onAuthStateChanged(auth, (user) => {
            return !!user
        })
    },
    async getUser(){
        onAuthStateChanged(auth, (user) => {
            if( user ){
                return user
            }else{
                return undefined
            }
        })
    },
    async signOut(){
        signOut(auth).then(() => {
            console.log("サインアウトしました！");
        }).catch((error: string) => {
            throw new Error(error)
        });
    }
}