import { ref as vueData } from "vue";
import { Router } from "vue-router";

import { AuthRepository } from "../infra/AuthRepository";

export default async ()=>{
  const uid = vueData<string>()
  const userName = vueData<string|null>()
  const userImage = vueData<string|null>()

  const user = await AuthRepository.getUser()

  if(user != null){
    uid.value = user.uid;
    userName.value = user.displayName
    userImage.value = user.photoURL
  }else{
    throw new Error("User is not loggined")
  }

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