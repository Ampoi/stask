import { ref as vueData, onBeforeMount } from "vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";

import firebaseConfig from "../../data/firebaseConfig"
import type { Settings as SettingsValue } from "../../types/settings";

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

export default ()=>{
  const settings = vueData<SettingsValue>({
    subjects: []
  })

  onBeforeMount(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid

        get(child(dbRef, `data/${uid}/settings`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newData: SettingsValue = snapshot.val()
            settings.value = newData
          }else{
            set(ref(db, `data/${uid}/settings`), defaultSettings)
              .catch((err)=>{
                console.error(err);
              })
            settings.value = Object.create(defaultSettings)
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  })

  function addSubject(){
    const defaultSubject = {
      index:0,
      title: "新規教科",
      color:"#E7E8E7"
    }
    settings.value.subjects.push(defaultSubject)
    setSubjectIndex()
  }

  function deleteSubject(index: number){
    settings.value.subjects.splice(index, 1)
    setSubjectIndex()
  }

  function setSubjectIndex(){
    let i = 0
    settings.value.subjects.forEach(()=>{
      settings.value.subjects[i].index = i
      i++
    })
  }

  return {
    settings,
    addSubject, deleteSubject,
  }
}