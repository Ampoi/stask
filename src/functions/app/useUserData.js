import { ref as vueData, onMounted } from "vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";

import firebaseConfig from "../../data/firebaseConfig.js"

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = getDatabase()
const dbRef = ref(db);

const welcomeCard = {
  "title": "Staskへようこそ",
  "time": 123,
  "startPage": 50,
  "lastPage": 100,
  "nowPage": 75,
  "showSubMenu": false,
  "done": false,
  "subject": 1
}

export default ()=>{
  const uid = vueData("")
  const userName = vueData("")
  const userImage = vueData("")
  const logined = vueData(false)
  const cards = vueData([])
  const settings = vueData({
    subjects: [
      {index:0, title: "国語 (古文/現代文)", color:"#F44335"},
      {index:1, title: "数学 (算数)", color:"#2196F3"},
      {index:2, title: "理科 (物理/地学/生物/化学)", color:"#4BAF51"},
      {index:3, title: "社会 (公民/地理/歴史)", color:"#FFC105"},
      {index:4, title: "英語 (外国語)", color: "#E040FB"}
    ]
  })

  onMounted(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //ユーザー情報の全体への反映
        uid.value = user.uid;
        userName.value = user.displayName
        userImage.value = user.photoURL
        logined.value = true

        //ユーザー情報から設定やタスクの取得
        get(child(dbRef, `data/${uid.value}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newData = snapshot.val()
            if(newData.cards != undefined){
              cards.value = newData.cards
            }else{
              cards.value.push(welcomeCard)
            }
            if(newData.settings == undefined){
              set(ref(db, `data/${uid.value}/settings`), settings.value)
            }else{
              settings.value = newData.settings
            }
          } else {
            cards.value.push(welcomeCard)
          }
        }).catch((error) => {
          console.error(error);
        });
      } else {
        this.$router.push("/welcome")
      }
    });
  })

  return {uid, userName, userImage, logined, cards, settings}
}