import { ref as vueData, onBeforeMount, watch } from "vue";

import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref, get, set, child } from "firebase/database"

import firebaseConfig from "../data/firebaseConfig"
import { Card } from "../model/cards"

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)

const db = getDatabase()
const dbRef = ref(db)

function saveCards(cards: Card[], uid: string){
  return new Promise<void>((resolve)=>{
    const savePath = `data/${uid}/cards`
    set(ref(db, savePath), cards)
      .then(()=>{
        resolve()
      })
      .catch((err)=>{
        console.error(err);
      })
  })
}

export default ()=>{
  const cards = vueData<Card[]>([])

  let uid: string

  onBeforeMount(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid

        get(child(dbRef, `data/${uid}/cards`)).then((snapshot) => {
          if (snapshot.exists()) {
            const newData = snapshot.val()
            
            if(newData != undefined){
              cards.value = newData
            }else{
              cards.value = [Card.welcomeCard]
            }
          } else {
            cards.value = [Card.welcomeCard]
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

  let timer: number

  watch(cards, ()=>{
    if(firstUpdate.value == true){
      firstUpdate.value = false
    }else{
      clearTimeout(timer)
      updated.value = false
      showBanner.value = false
      timer = setTimeout(()=>{
        saveCards(cards.value, uid)
          .then(()=>{
            updated.value = true
          })
      }, 8000)
    }
  }, {deep: true})

  const addCard = ()=>{
    cards.value.push(Card.create())
  }

  const deleteCard = (cardIndex:number)=>{
    cards.value.splice(cardIndex, 1)
  }

  const deleteDoneCard = ()=>{
    let newCards = cards.value
    for (let i = 0; i < newCards.length;){
      if(newCards[i].done == true){
        newCards.splice(i, 1)
      }else{
        i++
      }
    }
    cards.value = newCards
  }

  return {
    cards,
    addCard, deleteCard, deleteDoneCard,
    updated, showBanner
  }
}