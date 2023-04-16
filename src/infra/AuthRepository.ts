import { initializeApp } from "firebase/app"
import { User, getAuth, signOut } from "firebase/auth"

import firebaseConfig from "./firebase/config"

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export const AuthRepository = {
  isLogin(): Promise<boolean> {
    return new Promise((resolve)=>{
      auth.onAuthStateChanged((user)=>{
        resolve(!!user)
      })
    })
  },
  getUser(): Promise<User | undefined>{
    return new Promise((resolve)=>{
      auth.onAuthStateChanged((user)=>{
        if(user){
          resolve(user)
        }else{
          resolve(undefined)
        }
      })
    })
  },
  signOut(): Promise<string | undefined>{
    return new Promise((resolve, reject)=>{
      signOut(auth).then(() => {
        resolve(undefined)
      }).catch((error: string) => {
        reject(error)
      });
    })
  }
}