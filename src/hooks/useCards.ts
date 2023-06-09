import { ref, onBeforeMount, watch, computed } from "vue";

import { Card, Page } from "../model/cards"
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

export const useGroupSharedCards = (groupId: string)=>{
  const groupSharedCards = ref<GroupSharedCard[]>([])
  const firebaseRepository = groupSharedCardRepository(groupId)

  onBeforeMount(()=>{
    firebaseRepository.get
      .then((newData)=>{
        if(!newData){
          groupSharedCards.value = [Card.welcomeCard]
        }else{
          groupSharedCards.value = newData
        }
      })
  })

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

export const useGroupCards = (groupId: string)=>{
  const { groupSharedCards, addGroupSharedCard, deleteGroupSharedCard } = useGroupSharedCards(groupId)
  
  const cards = computed({
    get(): Card[]{
      const groupSharedCardKeys = Object.keys(groupSharedCards.value)
      
      let newCards: Card[] = []
      groupSharedCardKeys.forEach((cardKey)=>{
        let newCard: Card
  
        //共有カードと個人ごとのデータの合成
        const groupSharedCard = groupSharedCards.value[Number(cardKey)]
        const cardWithDoneAndConcentrate = {...groupSharedCard, ...{done: false, concentrate: false}}

        //ページごとの達成の合成
        const cardWithDoneAndConcentratePages = ((pages: {startPage: number, lastPage: number}[])=>{
          if(pages){
            return pages
          }else{
            return []
          }
        })(cardWithDoneAndConcentrate.pages)
  
        const cardsWithPagesDonePageKeys = Object.keys(cardWithDoneAndConcentratePages)
        const newCardPages:Page[] = []
        
        cardsWithPagesDonePageKeys.forEach((cardsWithPagesDonePageKey) => {
          const pageInfo = cardWithDoneAndConcentrate.pages[Number(cardsWithPagesDonePageKey)]
          const newCardPage = {...pageInfo, ...{done: false}}
          newCardPages.push(newCardPage)
        })
        
        newCard = {...cardWithDoneAndConcentrate, ...{pages: newCardPages}}
        newCards.push(newCard)
      })
      return newCards
    },
    set(){
      console.log("yeah");
    }
  })

  return { cards }
}