import { Router } from "vue-router";
import { AuthRepository } from "../infra/firebase/authRepository";
import { createCloudStorageRepository } from "../infra/firebase/cloudStorageRepository";

export default async () => {
    const isLogin = await AuthRepository.isLogin()

    async function getUserData(){
        return await (async () => {
            const user = await AuthRepository.getUser()

            if( user ){
                const userIconURL = await (async () => {
                    if(!user.photoURL){
                        const defaultIconRepository = createCloudStorageRepository("staskLogo.png")
                        return await defaultIconRepository.get()
                    }else{
                        return user.photoURL
                    }
                })()
                return {
                    uid: user.uid,
                    userName: user.displayName ?? "unknown",
                    userIcon: userIconURL
                }
            }else{
                throw new Error("ログインしていません！")
            }
        })()
    }

    function login(){
        AuthRepository.Login(()=>{
            window.location.reload()
        })
    }

    function logout(router: Router){
        AuthRepository.Logout()
            .then(()=>{
                router.push("/")
            })
            .catch((err: string) => {
                throw new Error(err)
            })
    }

    return { isLogin, getUserData, login, logout }
}