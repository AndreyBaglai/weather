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

export function getLangFromLS(): string {
  const lang = localStorage.getItem(CURRENT_LANG);
  if (lang) return JSON.parse(lang);
  return '';
}

export function setLangToLS(lang: string): void {
  localStorage.setItem(CURRENT_LANG, JSON.stringify(lang));
}

