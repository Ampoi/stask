import { ref as vueData, onBeforeMount } from "vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import firebaseConfig from "../../data/firebaseConfig.js"

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export default (router)=>{
  const uid = vueData("")
  const userName = vueData("")
  const userImage = vueData("")

  onBeforeMount(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
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