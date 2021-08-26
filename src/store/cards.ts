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

  getCardById(id: number) {
    return this.cards.find((card: CardModel) => card.id === id);
  }

  removeCardById(id: number) {
    this.cards = this.cards.filter((card: CardModel) => card.id !== id);
  }

  updateCardTemperature(newTemperature: number, id: number) {
    this.cards = this.cards.map((card: CardModel) => {
      if (card.id === id) {
        card.temperature = newTemperature;
      }
      return card;
    });
  }

  updateCards(cards: CardModel[]) {
    this.cards = [...cards];
  }

  removeAllCards() {
    this.cards = [];
  }
}

export default new Cards();