import React from 'react';
import { observer } from 'mobx-react-lite';

import { CardModel } from '../../model/card-model';
import Card from '../Card/Card';
import cardsStore from '../../store/cards';
import { removeCardFromLS, updateCardByIdInLS } from '../../services/localStorage';
import { convertToCelsius, convertToFahrenheit } from '../../shared/convert-temperature';

import './Main.scss';

const Main = observer(() => {
  const onChangeTemperature = (e: React.MouseEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;
    const target = e.target as HTMLElement;

    const id = Number(currentTarget.closest('.card')?.id);
    const currentCard = cardsStore.getCardById(id);

    if (currentCard) {
      if (currentCard.isCelsius && target.classList.contains('fahrenheit')) {
        currentCard.isCelsius = false;
        currentCard.temperature = convertToCelsius(currentCard.temperature);
      }

      if (!currentCard.isCelsius && target.classList.contains('celsius')) {
        currentCard.isCelsius = true;
        currentCard.temperature = convertToFahrenheit(currentCard.temperature);
      }

      cardsStore.updateCardTemperature(currentCard.temperature, id);
      updateCardByIdInLS(currentCard, id);
    }
  };

  const onRemoveCard = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.closest('.card')?.id);

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
