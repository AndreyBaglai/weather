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
      <Card onChangeTemperature={onChangeTemperature} />
      {/* <Card /> */}
      {/* <Card /> */}
    </main>
  );
}
