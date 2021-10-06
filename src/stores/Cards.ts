import { action, makeObservable, observable } from 'mobx';
import { CardModel } from '../types/Card';

class Store {
  constructor() {
    makeObservable(this);
  }

  @observable cards: CardModel[] = [];

  @action
  addCard(card: CardModel) {
    if (this.isRepeatCard(card)) return;
    this.cards.unshift(card);
  }

  @action
  isRepeatCard(card: CardModel) {
    return this.cards.some((item: CardModel) => {
      return (
        item.city.toLowerCase() === card.city.toLowerCase() &&
        item.description?.toLowerCase() === card.description?.toLowerCase()
      );
    });
  }

  @action
  getCardById(id: string) {
    return this.cards.find((card: CardModel) => card.id === id);
  }

  @action
  removeCardById(id: string) {
    this.cards = this.cards.filter((card: CardModel) => card.id !== id);
  }

  @action
  updateCardTemperature(newTemperature: number, id: string) {
    this.cards = this.cards.map((card: CardModel) => {
      if (card.id === id) {
        card.temperature = newTemperature;
      }
      return card;
    });
  }

  @action
  getAllNamesCity() {
    return this.cards.map((card: CardModel) => card.city);
  }
  
  @action
  updateCards(cards: CardModel[]) {
    this.cards = [...cards];
  }

  @action
  removeAllCards() {
    this.cards = [];
  }
}

export default new Store();
