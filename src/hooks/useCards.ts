import { ref as vueData, onBeforeMount, watch } from "vue";

import { getDatabase, ref, set } from "firebase/database"

import { Card } from "../model/cards"

import { cardRepository } from "../infra/CardRepository";

const db = getDatabase()

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
        cardRepository.set(cards.value)
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