import {ref, watch} from "vue";
import {CardRepository} from "../infra/CardRepository";
import {Card} from "../models/Card";


export const useCards = () => {
    const cards = ref<Card[]>([])

    const load = async () => {
        const result = await CardRepository.getAll()
        cards.value = result ?? [Card.WELCOME_CARD]
    }

    //データが変更されているかどうか
    const updated = ref(true)
    const firstUpdate = ref(true)
    const isProgress = ref(false)

    let timer: number

    watch(cards, () => {
        if (firstUpdate.value == true) {
            firstUpdate.value = false
        } else {
            clearTimeout(timer)
        }
    }, {deep: true})

    const setCards = async (cards: Card[]) => {
        isProgress.value = true
        await CardRepository.set(cards)
        isProgress.value = false
    }

    const replaceCards = async (card: Card) => {
        const index = cards.value.findIndex((c) => c.id === card.id)
        if (index === -1) {
            return
        }
        cards.value = cards.value.map((c) => {
            if (c === card) {
                return cards.value[index]
            } else if (c === cards.value[index]) {
                return card
            } else {
                return c
            }
        })
    }

    const addCard = async () => {
        const newCards = Card.create()
        cards.value.push(newCards)
        isProgress.value = true
        await CardRepository.add(newCards)
        isProgress.value = false
    }

    const removeCard = async (cardIndex: number) => {
        cards.value.splice(cardIndex, 1)
        isProgress.value = true
        await CardRepository.set(cards.value)
        isProgress.value = false
    }


    const deleteDoneCard = async () => {
        cards.value = cards.value.filter((card) => card.done === false)
        isProgress.value = true
        await CardRepository.set(cards.value)
        isProgress.value = false
    }

    return {
        cards,
        addCard,
        setCards,
        removeCard,
        deleteDoneCard,
        replaceCards,
        updated,
        isProgress,
    }
}
