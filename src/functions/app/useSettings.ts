import { ref as vueData, onBeforeMount } from "vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";

import firebaseConfig from "../../data/firebaseConfig"

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = getDatabase()
const dbRef = ref(db);

const defaultSettings = {
  subjects: [
    {index:0, title: "国語 (古文/現代文)", color:"#F44335"},
    {index:1, title: "数学 (算数)", color:"#2196F3"},
    {index:2, title: "理科 (物理/地学/生物/化学)", color:"#4BAF51"},
    {index:3, title: "社会 (公民/地理/歴史)", color:"#FFC105"},
    {index:4, title: "英語 (外国語)", color: "#E040FB"}
  ]
}

interface Subject {
  index: number
  title: string
  color: string
}

interface SettingsValue {
  subjects: Array<Subject>
}

interface Settings {
  data: SettingsValue
}
class Settings {
  constructor(newSettings: SettingsValue | undefined, uid: string){
    if(newSettings != undefined){
      this.data = newSettings
    }else{
      this.data = defaultSettings
      set(ref(db, `data/${uid}/settings`), defaultSettings)
    }
  }

  get value(){
    return this.data
  }
}

export default ()=>{
  const settings = vueData<SettingsValue>({
    subjects: []
  })

  onBeforeMount(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid

        get(child(dbRef, `data/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newData = snapshot.val()

            const newSettings = new Settings(newData.settings, uid)
            settings.value = newSettings.value
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  })
  return { settings }
}