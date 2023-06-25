import { Router } from "vue-router";

import { AuthRepository } from "../infra/AuthRepository";

export default async ()=>{
  const { uid, userName, userImage } = await (async () => {
    const user = await AuthRepository.getUser()
    if( user ){
      return {
        uid: user.uid,
        userName: user.displayName,
        userImage: user.photoURL
      }
    }else{
      throw new Error("User is not loggined")
    }
  })()

  function logout(router: Router){
    AuthRepository.signOut().then(() => {
      console.log("logout success!");
      router.push("/welcome")
    }).catch((error: string) => {
      throw new Error(error)
    });
  }
  
  return {uid, userName, userImage, logout}
}