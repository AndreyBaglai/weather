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

  updateCards(cards: CardModel[]) {
    this.cards = [...cards];
  }

  removeAllCards() {
    this.cards = [];
  }
}

export default new Cards();