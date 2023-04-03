import { ref as vueData, onBeforeMount } from "vue";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";

import firebaseConfig from "../data/firebaseConfig"
import { Settings } from "../model/settings";

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = getDatabase()
const dbRef = ref(db);

export default ()=>{
  const settings = vueData<Settings>({
    subjects: []
  })

  onBeforeMount(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid

        get(child(dbRef, `data/${uid}/settings`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newData: Settings = snapshot.val()
            settings.value = newData
          }else{
            set(ref(db, `data/${uid}/settings`), Settings.defaultSettings)
              .catch((err)=>{
                console.error(err);
              })
            settings.value = Object.create(Settings.defaultSettings)
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  })

  function addSubject(){
    settings.value.subjects.push(Settings.defaultSubject)
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