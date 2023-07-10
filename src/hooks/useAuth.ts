import { Router } from "vue-router";
import { AuthRepository } from "../infra/firebase/authRepository";

export default async () => {
    const isLogin = await AuthRepository.isLogin()

    async function getUserData(){
        return await (async () => {
            const user = await AuthRepository.getUser()
            if( user ){
                return {
                    uid: user.uid,
                    userName: user.displayName,
                    userIcon: user.photoURL
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