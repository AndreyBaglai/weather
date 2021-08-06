import React from 'react';
import { CardModel } from '../../model/card-model';
import Card from '../Card/Card';

import './Main.scss';

type MainPropsType = {
  onChangeTemperature: (e: React.MouseEvent) => void;
  cards: CardModel[];
};

export default function Main({ onChangeTemperature, cards }: MainPropsType) {
  return (
    <main className="main">
      {cards.map((card) => (
        <Card
          key={card.time + card.city}
          onChangeTemperature={onChangeTemperature}
          info={card}
        />
      ))}
    </main>
  );
}
