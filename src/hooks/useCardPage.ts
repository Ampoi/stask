import {Ref} from "vue";
import {Card, Page} from "../models/Card";
import {useCards} from "./useCards";

export const useCardPage = (card: Ref<Card>) => {
    const {replaceCards} = useCards()
    const addPage = async (page: Page) => {
        await replaceCards(Card.addPage(card.value, page))
    }
    const removePage = async (index: number) => {
        await replaceCards(Card.removePage(card.value, index))
    }

    const replacePage = async (page: Page, index: number) => {
        await replaceCards(Card.clone(card.value, {
            pages: card.value.pages.map((p, i) => {
                if (i === index) {
                    return page
                } else {
                    return p
                }
            })
        }))
    }

    return {
        addPage,
        removePage,
        replacePage
    }
}