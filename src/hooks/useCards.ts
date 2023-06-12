import { ref, onBeforeMount, watch, computed } from "vue";

import { Card } from "../model/cards"
import { personalCardRepository } from "../infra/CardRepository";

import { GroupSharedCard } from "../model/groupCards";
import { groupSharedCardRepository } from "../infra/CardRepository";

export const usePersonalCards = ()=>{
  const cards = ref<Card[]>([])

  onBeforeMount(()=>{
    personalCardRepository.get
      .then((newData)=>{
        if(!newData){
          cards.value = [Card.welcomeCard]
        }else{
          cards.value = newData
        }
      })
  })

  watch(cards, ()=>{
    personalCardRepository.set(cards.value)
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

  return { cards, addCard, deleteCard, deleteDoneCard }
}

export const useGroupSharedCards = async (groupId: string)=>{
  const firebaseRepository = groupSharedCardRepository(groupId)

  const groupSharedCardsData: Promise<GroupSharedCard[]> = (async ()=>{
    const newSharedCardDBdata = await firebaseRepository.get
      .catch((err: Error) => {
        throw err
      })
    
    const newSharedCard = (()=>{
      if(!newSharedCardDBdata){
        return [{ ...Card.welcomeCard }]
      }else{
        return newSharedCardDBdata
      }
    })()

    return newSharedCard
  })()

  const groupSharedCards = ref<GroupSharedCard[]>(await groupSharedCardsData)

  watch(groupSharedCards, ()=>{
    firebaseRepository.set(groupSharedCards.value)
  }, {deep: true})

  const addGroupSharedCard = ()=>{
    groupSharedCards.value.push(Card.create())
  }

  const deleteGroupSharedCard = (cardIndex:number)=>{
    groupSharedCards.value.splice(cardIndex, 1)
  }

  return { groupSharedCards, addGroupSharedCard, deleteGroupSharedCard }
}