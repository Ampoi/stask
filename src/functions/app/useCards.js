import { ref as vueData, onBeforeMount, watch } from "vue";

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

const defaultCard = {
  title: "",
  time: 60,
  startPage: 0,
  lastPage: 12,
  nowPage: 0,
  done: false,  
  subject: 1
}

class Cards {
  constructor(newCards){
    if(newCards != undefined){
      this.data = newCards
    }else{
      this.data = [welcomeCard]
    }
  }
  
  get value(){
    return this.data
  }

  addCard(){
    const newCard = Object.create(defaultCard)
    this.data.push(newCard)
  }

  deleteCard(cardIndex){
    this.data.splice(cardIndex, 1)
  }

  deleteDoneCard(){
    for (let i = 0; i < this.data.length;){
      if(this.data[i].done == true){
        this.data.splice(i, 1)
      }else{
        i++
      }
    }
  }
}

export default ()=>{
  const cards = vueData([])

  let uid

  onBeforeMount(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid

        get(child(dbRef, `data/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newData = snapshot.val()
            
            const newCards = new Cards(newData.cards)
            cards.value = newCards.value

          } else {
            cards.value = [welcomeCard]
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  })
  
  //データが変更されているかどうか
  const updated = vueData(true)
  const firstUpdate = vueData(true)

  const showBanner = vueData(false)

  var timer = setTimeout(()=>{}, 0)

  watch(cards, ()=>{
    if(firstUpdate.value == true){
      firstUpdate.value = false
    }else{
      clearTimeout(timer)
      updated.value = false
      showBanner.value = false
      timer = setTimeout(function(){
        set(ref(db, `data/${uid}/cards`), cards.value).then(()=>{
          updated.value = true
        })
      }.bind(this), 8000)
    }
  }, {deep: true})

  const addCard = ()=>{
    const newCards = new Cards(cards.value)
    newCards.addCard()
    cards.value = newCards.value
  }

  const deleteCard = (cardIndex)=>{
    const newCards = new Cards(cards.value)
    newCards.deleteCard(cardIndex)
    cards.value = newCards.value
  }

  const deleteDoneCard = ()=>{
    const newCards = new Cards(cards.value)
    newCards.deleteDoneCard()
    cards.value = newCards.value
  }

  return { cards, addCard, deleteCard, deleteDoneCard, updated, firstUpdate, showBanner }
}