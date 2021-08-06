import { CardModel } from "../model/card-model";

const COLLECTION_CARDS = 'cards';

export function getCardsFromLS(): CardModel[] | [] {
  const cards = localStorage.getItem(COLLECTION_CARDS);
  if (cards) return JSON.parse(cards);
  return []
}

export function setCardsToLS(cards: CardModel[]) {
  localStorage.setItem(COLLECTION_CARDS, JSON.stringify(cards));
}