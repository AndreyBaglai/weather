import { makeAutoObservable } from "mobx";
import { CardModel } from "../model/card-model";

class Cards {
  cards: CardModel[] = [];

  constructor () {
    makeAutoObservable(this);
  }

  get totalCards() {
    return this.cards;
  }

  addCard(card: CardModel) {
    this.cards.unshift(card);
  }

  removeCardById(id: number) {
    this.cards = this.cards.filter((card: CardModel) => card.id !== id);
  }

  updateCards(cards: CardModel[]) {
    this.cards = [...cards];
  }

  removeAllCards() {
    this.cards = [];
  }
}

export default new Cards();