import { Router } from "vue-router";
import { AuthRepository } from "../infra/firebase/authRepository";

export default async () => {
    const isLogin = await AuthRepository.isLogin()
    
    const { uid, userName, userIcon } = await (async () => {
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

    function logout(router: Router){
        AuthRepository.signOut()
            .then(()=>{
                router.push("/")
            })
            .catch((err: string) => {
                throw new Error(err)
            })
    }

    return { isLogin, uid, userName, userIcon, logout }
}