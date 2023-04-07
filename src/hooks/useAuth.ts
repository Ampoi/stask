import { ref as vueData } from "vue";

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
  
  return {uid, userName, userImage}
}