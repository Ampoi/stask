import { ref as vueData, onBeforeMount } from "vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import firebaseConfig from "../data/firebaseConfig"

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

type Router = {push: Function}
export default (router: Router)=>{
  const uid = vueData<string>()
  const userName = vueData<string|null>()
  const userImage = vueData<string|null>()

  onBeforeMount(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        uid.value = user.uid;
        userName.value = user.displayName
        userImage.value = user.photoURL
      } else {
        router.push("/welcome")
      }
    });
  })

  return {uid, userName, userImage}
}