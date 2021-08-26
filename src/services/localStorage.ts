import { CardModel } from "../model/card-model";

const COLLECTION_CARDS = 'cards';
const CURRENT_LANG = 'lang';

export function getCardsFromLS(): CardModel[] | [] {
  const cards = localStorage.getItem(COLLECTION_CARDS);
  if (cards) return JSON.parse(cards);
  return []
}

export function setCardsToLS(cards: CardModel[]): void {
  localStorage.setItem(COLLECTION_CARDS, JSON.stringify(cards));
}

export function removeAllCardsFromLS() {
  localStorage.removeItem(COLLECTION_CARDS);
}

export function removeCardFromLS(id: number) {
  const cards = getCardsFromLS();
  if (cards.length) {
    const updateCards = cards.filter((card: CardModel) => card.id !== id);
    setCardsToLS(updateCards);
  }
}

export function updateCardByIdInLS(card: CardModel, id: number) {
  removeCardFromLS(id);
  const cards = getCardsFromLS();
  setCardsToLS([card, ...cards]);
}

export function getLangFromLS(): string {
  const lang = localStorage.getItem(CURRENT_LANG);
  if (lang) return JSON.parse(lang);
  return '';
}

export function setLangToLS(lang: string): void {
  localStorage.setItem(CURRENT_LANG, JSON.stringify(lang));
}

