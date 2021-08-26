import React from 'react';
import { CardModel } from '../../model/card-model';
import Card from '../Card/Card';
import cardsStore from '../../store/cards';
import { observer } from 'mobx-react-lite';
import { removeCardFromLS, updateCardByIdInLS } from '../../services/localStorage';

import './Main.scss';

const Main = observer(() => {
  const onChangeTemperature = (e: React.MouseEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    const id = Number(currentTarget.parentElement?.parentElement?.id);
    const currentCard = cardsStore.getCardById(id);

    if (currentCard) {
      if (currentCard.isCelsius && target.classList.contains('fahrenheit')) {
        currentCard.isCelsius = false;
        currentCard.temperature = Math.floor(currentCard.temperature * (9 / 5) + 32);
      }

      if (!currentCard.isCelsius && target.classList.contains('celsius')) {
        currentCard.isCelsius = true;
        currentCard.temperature = Math.ceil((currentCard.temperature - 32) * (5 / 9));
      }

      cardsStore.updateCardTemperature(currentCard.temperature, id);
      updateCardByIdInLS(currentCard, id);
    }
  };

  const onRemoveCard = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.parentElement?.id);

    cardsStore.removeCardById(id);
    removeCardFromLS(id);
  };

  return (
    <main className="main">
      {cardsStore.totalCards.map((card: CardModel) => (
        <Card
          key={card.id}
          onChangeTemperature={onChangeTemperature}
          onRemoveCard={onRemoveCard}
          info={card}
        />
      ))}
    </main>
  );
});

export default Main;
