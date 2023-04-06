import { ref as vueData, onBeforeMount, watch } from "vue";

import { Card } from "../model/cards"

import { cardRepository } from "../infra/CardRepository";

export default ()=>{
  const cards = vueData<Card[]>([])

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

  watch(cards, ()=>{
    cardRepository.set(cards.value)
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
    addCard, deleteCard, deleteDoneCard
  }
}