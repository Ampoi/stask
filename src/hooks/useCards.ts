import { ref as vueData, onBeforeMount, watch } from "vue";

import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref, get, set, child } from "firebase/database"

import firebaseConfig from "../infra/firebase/config"
import { Card } from "../model/cards"

import { cardRepository } from "../infra/CardRepository";

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
    cardRepository.get()
      .then((newData)=>{
        if(newData == Object.create([])){
          cards.value = [Card.welcomeCard]
        }else{
          cards.value = newData
        }
      })
  })
  
  //データが変更されているかどうか
  const updated = vueData(true)
  const firstUpdate = vueData(true)

  const showBanner = vueData(false)

  let timer: any

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