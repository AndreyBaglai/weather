import { CardModel } from "./card-model";

export type StoreModel = {
  lang: string;
  cards: CardModel[];
  isCelsius: boolean;
};
